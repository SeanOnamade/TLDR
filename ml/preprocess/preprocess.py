import nltk
import os
local_punkt_path = os.path.join(os.path.dirname(__file__), 'punkt')
if local_punkt_path not in nltk.data.path:
    nltk.data.path.insert(0, local_punkt_path)
from nltk.tokenize import sent_tokenize
from sentence_transformers import SentenceTransformer
from umap import UMAP
import numpy as np
import hdbscan
from collections import Counter
import matplotlib.pyplot as plt

'''
1) take in a article ✅
2) Convert it to vector space using sBERT ✅
3) then run a U-MAP on the vector space to make latent space ✅
4) run a HDBSCAN to create clusters in the data based on density
5) Find the means of each cluster, and then take the vector closest to it
6) convert each vector back into a sentence
7) Return the sentences
'''

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
        if space.shape[0] < 2:
            raise ValueError(f"Input space has {space.shape[0]} points. At least 2 points are required for clustering.")
        
        clusterer = hdbscan.HDBSCAN(
            min_cluster_size=2,
            min_samples=1,
            cluster_selection_method='leaf',
            cluster_selection_epsilon=0.05,
            allow_single_cluster=False        # Prevent one big cluster
        )
        
        labels = clusterer.fit_predict(space)
        num_clusters = len(set(labels)) - (1 if -1 in labels else 0)
        print(f"HDBSCAN identified {num_clusters} clusters")
        return num_clusters, labels
    '''
    @brief: This function identifies representative sentences for each cluster by finding the vector closest to the cluster mean in the transformed space.

    @params: space -> np.array, this is the transformed vector space (e.g., from UMAP) with shape (n_samples, n_features)
    @params: labels -> np.array, this is the array of cluster labels assigned by HDBSCAN, where -1 indicates noise
    @returns: list -> list of tuples, each containing (cluster_label, representative_sentence)
    '''
    def get_cluster_representatives(self, space: np.array, labels: np.array) -> list:
        unique_labels = set(labels) - {-1}
        representatives = []
        
        for label in unique_labels:
            cluster_points = space[labels == label]
            cluster_mean = np.mean(cluster_points, axis=0)
            distances = np.linalg.norm(cluster_points - cluster_mean, axis=1)
            closest_idx = np.argmin(distances)
            global_idx = np.where(labels == label)[0][closest_idx]
            representatives.append((label, self.sentences[global_idx]))
        
        return representatives

def main():
    with open("story.txt", 'r', encoding='utf-8') as file:
        input_data = file.read()
    
    encoding = preProcessor()
    encoding.vector_embedding(input_data)
    
    try:
        transformed_space = encoding.U_MAP()
        print("UMAP transformation successful.")
        num_clusters, cluster_labels = encoding.HDBSCAN(transformed_space)
        print(f"Number of clusters: {num_clusters}")
        print(f"Cluster labels: {cluster_labels}")
        
        # Visualize for debugging
        plt.scatter(transformed_space[:, 0], transformed_space[:, 1], c=cluster_labels, cmap='Spectral')
        plt.title("HDBSCAN Clusters")
        plt.show()
        
    except ValueError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()