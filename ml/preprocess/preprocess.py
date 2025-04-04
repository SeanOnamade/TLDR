# export PATH="/opt/miniconda3/envs/focus_feed/bin:$PATH"

import requests
import nltk
import os
local_punkt_path = os.path.join(os.path.dirname(__file__), 'punkt')
if local_punkt_path not in nltk.data.path:
    nltk.data.path.insert(0, local_punkt_path)
from nltk.tokenize import sent_tokenize
from sentence_transformers import SentenceTransformer
from umap import UMAP
import numpy as np
import sys

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
    
    '''
        @breif: This function removes unecessary information (noise like random chars or ads) from text. This is based on grouping all relevant
                information (information such as description) based and then removes outiers. This is done by checking to see if there is a consistent flow
                of vectors through latent space via checking each sentence sequentially as it appears in the input data. Essentailly the cleaning algorithm 
                is checking cosie similarity between the previous two sentences and following point, and discard the points that are outside the threshold, 
                which basically means that stories generally tend to follow a pattern when you read them and dont have wild inconsistency, unless it is part
                of a narrative strategy, and if you have an ad or something in the middle of a story then it will interrupt the flow of the story, or in our case be an
                outlier in the pattern that the vectorized sentences go in.
        
    '''
    def clean_data(self, threshold=0.5):
        cleaned_sentences = []
        for i in range(1, len(self.vec_space)):
            # Assuming self.vec_space[i] is a 2D array where each row is a vector
            for j in range(min(len(self.vec_space[i-1]), len(self.vec_space[i]))):
                v1 = self.vec_space[i-1][j]
                v2 = self.vec_space[i][j]
                sim = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))
                if sim >= threshold:
                    cleaned_sentences.append(v2)
        return cleaned_sentences
    
    '''
        @breif: This is the function that embbeds the sentence into a vector and adds it to the vector space. This is done
                using sBERT, which that is essentially a pretrained model for embedding sentences in vectors
    '''
    def vector_embedding(self, text: str) -> np.array:
        BREAK_UP_SENTENCE = sent_tokenize(text)
        EMBEDDINGS = self.transformer.encode(BREAK_UP_SENTENCE)
        
        # Pad or truncate embeddings to match the fixed dimension
        padded_embeddings = np.array([
            np.pad(embedding, (0, max(0, self.fixed_dimension - len(embedding))), 'constant')[:self.fixed_dimension]
            for embedding in EMBEDDINGS
        ])
        
        self.vec_space = np.vstack((self.vec_space, padded_embeddings))
        print(f"vec_space shape after embedding: {self.vec_space.shape}")  # Debugging statement
        return padded_embeddings
    
    def cosine_similarity(self, embeddings2):
        import numpy as np
        n = min(len(self.vec_space), len(embeddings2))
        similarities = []
        for i in range(n):
            v1 = self.vec_space[i]
            v2 = embeddings2[i]
            num_sentences = min(v1.shape[0], v2.shape[0])
            for j in range(num_sentences):
                sentence_v1 = v1[j]
                sentence_v2 = v2[j]
                sim = np.dot(sentence_v1, sentence_v2) / (np.linalg.norm(sentence_v1) * np.linalg.norm(sentence_v2))
                similarities.append(sim)
        return np.array(similarities)
    
    '''
        @breif: This is the U-Map funciton that will be used to transform the vector space to
                latent space, via U-Map algo
    '''
    def U_MAP(self, n_components=2, min_dist=0.1):
        # Check if vec_space is empty
        if self.vec_space.size == 0:
            raise ValueError("vec_space is empty. Ensure data is processed before calling U_MAP.")
        
        # Flatten the 3D vec_space into a 2D array for UMAP
        all_vectors = self.vec_space
        print(f"all_vectors shape before UMAP: {all_vectors.shape}")  # Debugging statement
        
        # Check if the number of data points is sufficient
        num_data_points = all_vectors.shape[0]
        if num_data_points <= 1:
            raise ValueError("Not enough data points for UMAP transformation.")
        
        # Dynamically set n_neighbors based on the number of data points
        n_neighbors = max(2, min(15, num_data_points - 1))
        
        # Ensure n_components is less than the number of data points
        n_components = min(n_components, num_data_points - 1)
        
        # Initialize UMAP with dynamically adjusted parameters
        umap_model = UMAP(n_components=n_components, n_neighbors=n_neighbors, min_dist=min_dist)
        
        # Fit and transform the data
        transformed_space = umap_model.fit_transform(all_vectors)
        
        return transformed_space

def main():
    # Read the input data from the command line
    input_data = sys.argv[1]
    encoding = preProcessor()
    encoding.vector_embedding(input_data)
    try:
        transformed_space = encoding.U_MAP()
        print("UMAP transformation successful.")
        print(transformed_space)
    except ValueError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()