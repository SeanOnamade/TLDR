import nltk
import os
import hdbscan
import numpy as np
local_punkt_path = os.path.join(os.path.dirname(__file__), 'punkt')
if local_punkt_path not in nltk.data.path:
    nltk.data.path.insert(0, local_punkt_path)
from nltk.tokenize import sent_tokenize
from sentence_transformers import SentenceTransformer
from umap import UMAP
from dataclasses import dataclass, field

'''
1) take in a article ✅
2) Convert it to vector space using sBERT ✅
3) then run a U-MAP on the vector space to make latent space ✅
4) run a HDBSCAN to create clusters in the data based on density
5) Find the means of each cluster, and then take the vector closest to it
6) convert each vector back into a sentence
7) Return the sentences
'''


@dataclass
class cluster:
    label: int
    center: np.ndarray = field(default_factory=lambda: np.array([]))
    contents: list[np.ndarray] = field(default_factory=list)
    indices: list[int] = field(default_factory=list)
    
class preProcessor:
    '''
    @breif: initializer for the preProcess class. This class essentially takes in the data (in the production case,
            the data is text representing a news article coming in a JSON format from the frontend) and then cleans it up
            and remove unecessary words that could mess with the true meaning in the vector representation of that sentence.
            Essentially the first step would be to factor in the idea that there could be possile noise in the data if we dont remove
            the unecessary words. Once the data is cleaned then this class will take each of the sentences and create a vector
            representation of that sentence and add it to the vector space we are using for future clustering algorithms.
    '''
    def __init__(self, fixed_dimension=384):
        self.transformer = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
        self.vec_space = np.empty((0, fixed_dimension))
        self.fixed_dimension = fixed_dimension
        self.sentences = []

    '''
    @breif: This is the function that embbeds the sentence into a vector and adds it to the vector space. This is done
            using sBERT, which that is essentially a pretrained model for embedding sentences in vectors
    
    @params: text -> str, this is the article to be embedded
    '''
    def vector_embedding(self, text: str) -> np.array:
        self.sentences = sent_tokenize(text)
        if not self.sentences:
            raise ValueError("No sentences found in input text.")
        embeddings = self.transformer.encode(self.sentences)
        
        padded_embeddings = np.array([
            np.pad(embedding, (0, max(0, self.fixed_dimension - len(embedding))), 'constant')[:self.fixed_dimension]
            for embedding in embeddings
        ])
        
        self.vec_space = np.vstack((self.vec_space, padded_embeddings)) if self.vec_space.size else padded_embeddings
        print(f"vec_space shape after embedding: {self.vec_space.shape}")
        return padded_embeddings
    
    '''
    @breif: This is the U-Map funciton that will be used to transform the vector space to
            latent space, via U-Map algo
    
    @params: n_components -> int, this is the number of components
    @params: min_distance -> double, this is the min distance between points
    @params: n_neighbors -> int, this is the min number of neighbors needed to be in a cluster
    '''
    def U_MAP(self, n_components=10, min_dist=0.0, n_neighbors=2):
        if self.vec_space.size == 0:
            raise ValueError("vec_space is empty. Ensure data is processed before calling U_MAP.")
        all_vectors = self.vec_space.reshape(-1, self.fixed_dimension)
        
        if all_vectors.shape[0] <= 1:
            raise ValueError("Not enough data points for UMAP transformation.")
        
        n_neighbors = max(2, min(n_neighbors, all_vectors.shape[0] - 1))
        n_components = min(n_components, all_vectors.shape[0] - 1)
        umap_model = UMAP(n_components=n_components, n_neighbors=n_neighbors, min_dist=min_dist, random_state=42)
        transformed_space = umap_model.fit_transform(all_vectors)
        print(f"UMAP output shape: {transformed_space.shape}")
        return transformed_space
    
    '''
    @brief: Applies HDBSCAN to cluster the input space based purely on the density and distribution 
            of points. This method identifies natural clusters in an unsupervised manner, 
            allowing for varying cluster sizes and shapes, and marks low-density points as noise.

    @param: space (np.array): A 2D NumPy array (n_samples, n_features) representing the vector or latent space.
    @returns: tuple (num_clusters, cluster_labels):
              - num_clusters (int): Number of distinct clusters found (excluding noise).
              - cluster_labels (np.array): Array of cluster labels for each point (-1 indicates noise).
    '''
    def HDBSCAN(self, space: np.array) -> tuple:
        clusterList = []
        if space.shape[0] < 2:
            raise ValueError(f"Input space has {space.shape[0]} points. At least 2 points are required for clustering.")
        
        clusterer = hdbscan.HDBSCAN(
            min_cluster_size=2,
            min_samples=1,
            cluster_selection_method='leaf',
            cluster_selection_epsilon=0.05,
            allow_single_cluster=False
        )
        
        labels = clusterer.fit_predict(space)
        num_clusters = len(set(labels)) - (1 if -1 in labels else 0)
        print(f"HDBSCAN identified {num_clusters} clusters")
        
        unique_labels = set(labels) - {-1}
        for label in unique_labels:
            indices = np.where(labels == label)[0]
            cluster_points = space[labels == label]
            cluster_mean = np.mean(cluster_points, axis=0)
            clusterList.append(cluster(
                label=label,
                center=cluster_mean,
                contents=[cluster_points[i] for i in range(cluster_points.shape[0])],
                indices=indices.tolist()
            ))
        return num_clusters, labels, clusterList
    
    '''
    @brief: This function is the one that gets the mean from the
            center of the cluster and then find the closest vector to it in latent space via
            cosine similarity
        
    @params: clusterList -> @datatype: cluster, the cluster in latent space
    @returns: np.ndarray, this is the sentence embedding that is closest to the mean of the cluster
    '''
    def extract_vector(self, clusterList) -> list[np.ndarray]:
        
        extractedFeats = []
        extractedSentences = []
        for cluster in clusterList:
            center = cluster.center
            contents = cluster.contents
            indices = cluster.indices
            
            if not contents or len(contents) == 0:
                continue

            # iter over points and compute cosine distance and save in ds
            cos_sims = []
            for vector in contents:
                norm = np.linalg.norm(vector) * np.linalg.norm(center)
                norm = 1e-10 if norm == 0 else norm
                cos_sim = np.dot(vector, center) / norm
                cos_sims.append(cos_sim)
            
            # after you compute cosine distance for each point find max
            closest_idx = np.argmax(cos_sims)
            extractedFeats.append(contents[closest_idx])
            extractedSentences.append(self.sentences[indices[closest_idx]])
        return extractedFeats, extractedSentences
        
        
        
def main():
    with open("story.txt", 'r', encoding='utf-8') as file:
        input_data = file.read()
    
    encoding = preProcessor()
    encoding.vector_embedding(input_data)
    
    try:
        transformed_space = encoding.U_MAP()
        print("UMAP transformation successful.")
        num_clusters, cluster_labels, cluster_list = encoding.HDBSCAN(transformed_space)
        cluster_vecs, cluster_sentences = encoding.extract_vector(cluster_list)
        print(f"Number of clusters: {num_clusters}")
        print(f"Cluster labels: {cluster_labels}")
        print(f"Cluster Vecs best: {cluster_vecs}")
        
        x = 1
        for sentence in cluster_sentences:
            print(f"Sentence {x}: {sentence}")
            x += 1
        
    except ValueError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()