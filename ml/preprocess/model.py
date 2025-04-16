import nltk
import os
import hdbscan
import numpy as np
import logging
from scipy.spatial.distance import cdist
local_punkt_path = os.path.join(os.path.dirname(__file__), 'punkt')
if local_punkt_path not in nltk.data.path:
    nltk.data.path.insert(0, local_punkt_path)
from nltk.tokenize import sent_tokenize
from sentence_transformers import SentenceTransformer
from umap import UMAP
from dataclasses import dataclass, field

# Set up logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@dataclass
class cluster:
    label: int
    center: np.ndarray = field(default_factory=lambda: np.array([]))
    contents: list[np.ndarray] = field(default_factory=list)
    indices: list[int] = field(default_factory=list)
    
class FeatureExtractionModel:
    '''
    @brief: Initializer for the FeatureExtractionModel class. Takes in text data (e.g., a news article in JSON format),
            processes it to remove noise, and creates vector representations for clustering.
    '''
    def __init__(self, fixed_dimension=384):
        self.transformer = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
        self.vec_space = np.empty((0, fixed_dimension))
        self.fixed_dimension = fixed_dimension
        self.sentences = []
        logger.debug("FeatureExtractionModel initialized with fixed_dimension=%d", fixed_dimension)

    '''
    @brief: Embeds sentences into vectors using sBERT and adds them to the vector space.
    
    @params: text -> str, the article text to be embedded
    @returns: np.array, the padded embeddings
    '''
    def vector_embedding(self, text: str) -> np.array:
        logger.debug("Starting vector_embedding with text length=%d", len(text))
        self.sentences = sent_tokenize(text)
        if not self.sentences:
            logger.error("No sentences found in input text")
            raise ValueError("No sentences found in input text.")
        embeddings = self.transformer.encode(self.sentences)
        
        padded_embeddings = np.array([
            np.pad(embedding, (0, max(0, self.fixed_dimension - len(embedding))), 'constant')[:self.fixed_dimension]
            for embedding in embeddings
        ])
        
        self.vec_space = np.vstack((self.vec_space, padded_embeddings)) if self.vec_space.size else padded_embeddings
        logger.debug("Vector space updated, shape=%s", self.vec_space.shape)
        return padded_embeddings
    
    '''
    @brief: Transforms the vector space to latent space using UMAP.
    
    @params: n_components -> int, number of components
    @params: min_dist -> float, minimum distance between points
    @params: n_neighbors -> int, minimum number of neighbors for clustering
    @returns: np.array, the transformed latent space
    '''
    def U_MAP(self, n_components=10, min_dist=0.0, n_neighbors=2):
        logger.debug("Starting U_MAP with n_components=%d, min_dist=%f, n_neighbors=%d", n_components, min_dist, n_neighbors)
        if self.vec_space.size == 0:
            logger.error("vec_space is empty")
            raise ValueError("vec_space is empty. Ensure data is processed before calling U_MAP.")
        all_vectors = self.vec_space.reshape(-1, self.fixed_dimension)
        
        if all_vectors.shape[0] <= 1:
            logger.error("Not enough data points for UMAP transformation: %d points", all_vectors.shape[0])
            raise ValueError("Not enough data points for UMAP transformation.")
        
        n_neighbors = max(2, min(n_neighbors, all_vectors.shape[0] - 1))
        n_components = min(n_components, all_vectors.shape[0] - 1)
        umap_model = UMAP(n_components=n_components, n_neighbors=n_neighbors, min_dist=min_dist, random_state=42)
        transformed_space = umap_model.fit_transform(all_vectors)
        logger.debug("UMAP transformation completed, output shape=%s", transformed_space.shape)
        return transformed_space
    
    '''
    @brief: Clusters the input space using HDBSCAN with a maximum of 6 clusters.
    
    @params: space -> np.array, 2D NumPy array representing the vector or latent space
    @returns: tuple (num_clusters, labels, clusterList)
    '''
    def HDBSCAN(self, space: np.array) -> tuple:
        logger.debug("Starting HDBSCAN with input space shape=%s", space.shape)
        clusterList = []
        if space.shape[0] < 2:
            logger.error("Input space has %d points. At least 2 points required", space.shape[0])
            raise ValueError(f"Input space has {space.shape[0]} points. At least 2 points are required for clustering.")

        try:
            clusterer = hdbscan.HDBSCAN(
                min_cluster_size=2,
                min_samples=1,
                cluster_selection_method='leaf',
                cluster_selection_epsilon=0.05,
                allow_single_cluster=False
            )
            
            # Perform clustering
            labels = clusterer.fit_predict(space)
            unique_labels = set(labels) - {-1}
            num_clusters = len(unique_labels)
            logger.debug("HDBSCAN produced %d clusters", num_clusters)
            
            # Create initial cluster list
            for label in unique_labels:
                indices = np.where(labels == label)[0]
                cluster_points = space[labels == label]
                if cluster_points.size == 0:
                    logger.warning("Empty cluster detected for label %d", label)
                    continue
                cluster_mean = np.mean(cluster_points, axis=0)
                clusterList.append(cluster(
                    label=label,
                    center=cluster_mean,
                    contents=[cluster_points[i] for i in range(cluster_points.shape[0])],
                    indices=indices.tolist()
                ))
            
            # If no clusters formed, return empty results
            if not clusterList:
                logger.warning("No valid clusters formed. Returning empty results.")
                return 0, np.full_like(labels, -1), []
            
            # If more than 6 clusters, merge smallest clusters
            max_clusters = 6
            if num_clusters > max_clusters:
                logger.debug("Merging clusters: initial count=%d, target=%d", num_clusters, max_clusters)
                clusterList.sort(key=lambda x: len(x.indices))
                
                # Merge smallest clusters until we have at most 6
                while len(clusterList) > max_clusters:
                    smallest_cluster = clusterList.pop(0)
                    smallest_center = smallest_cluster.center
                    
                    # Find the closest cluster to merge with
                    other_centers = np.array([c.center for c in clusterList])
                    if other_centers.size == 0:
                        logger.warning("No other clusters to merge with")
                        break
                    distances = cdist([smallest_center], other_centers)[0]
                    closest_cluster_idx = np.argmin(distances)
                    closest_cluster = clusterList[closest_cluster_idx]
                    closest_cluster.indices.extend(smallest_cluster.indices)
                    closest_cluster.contents.extend(smallest_cluster.contents)
                    
                    # Update the closest cluster's center
                    cluster_points = space[closest_cluster.indices]
                    if cluster_points.size == 0:
                        logger.warning("Empty cluster points after merging")
                        continue
                    closest_cluster.center = np.mean(cluster_points, axis=0)
                    
                    # Update labels for merged points
                    for idx in smallest_cluster.indices:
                        labels[idx] = closest_cluster.label
                
                # Update number of clusters
                num_clusters = len(clusterList)
                logger.debug("After merging, num_clusters=%d", num_clusters)
                
                # Reassign labels to ensure consecutive numbering
                new_labels = np.full_like(labels, -1)
                for i, cluster_obj in enumerate(clusterList):
                    for idx in cluster_obj.indices:
                        new_labels[idx] = i
                    cluster_obj.label = i
                labels = new_labels
            
            logger.debug("HDBSCAN completed: num_clusters=%d, labels shape=%s, clusterList length=%d", 
                        num_clusters, labels.shape, len(clusterList))
            return num_clusters, labels, clusterList
        
        except Exception as e:
            logger.error("Error in HDBSCAN: %s", str(e))
            raise
    
    '''
    @brief: Finds the vector closest to the cluster center using cosine similarity.
    
    @params: clusterList -> list[cluster], the clusters in latent space
    @returns: tuple (extractedFeats, extractedSentences), the closest embeddings and their sentences
    '''
    def extract_vector(self, clusterList) -> list[np.ndarray]:
        logger.debug("Starting extract_vector with %d clusters", len(clusterList))
        extractedFeats = []
        extractedSentences = []
        for cluster in clusterList:
            center = cluster.center
            contents = cluster.contents
            indices = cluster.indices
            
            if not contents or len(contents) == 0:
                logger.warning("Empty cluster contents for label %d", cluster.label)
                continue

            # Compute cosine similarity
            cos_sims = []
            for vector in contents:
                norm = np.linalg.norm(vector) * np.linalg.norm(center)
                norm = 1e-10 if norm == 0 else norm
                cos_sim = np.dot(vector, center) / norm
                cos_sims.append(cos_sim)
            closest_idx = np.argmax(cos_sims)
            extractedFeats.append(contents[closest_idx])
            extractedSentences.append(self.sentences[indices[closest_idx]])
        
        logger.debug("Extracted %d features and sentences", len(extractedFeats))
        return extractedFeats, extractedSentences