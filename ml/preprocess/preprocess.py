# export PATH="/opt/miniconda3/envs/focus_feed/bin:$PATH"

import requests
import nltk
import os
local_punkt_path = os.path.join(os.path.dirname(__file__), 'punkt')
if local_punkt_path not in nltk.data.path:
    nltk.data.path.insert(0, local_punkt_path)
from nltk.tokenize import sent_tokenize
from nltk.tokenize import sent_tokenize
from sentence_transformers import SentenceTransformer
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
    def __init__(self):
        self.transformer = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
        self.vec_space = []
    
    
    '''
        @breif: This function calls out to the webscraping API and brings in data which is used as input for the 
                data cleaning function. Basically this gets information from webscrape API and extracts text from
                returned JSON and sends that out to cleaning function
    '''
    def obtain_info():
        return
    
    '''
        @breif: This function removes unecessary information (noise like random chars or ads) from text. This is based on grouping all relevant
                information (information such as description) based and then removes outiers. This is done by checking to see if there is a consistent flow
                of vectors through latent space via checking each sentence sequentially as it appears in the input data. Essentailly the cleaning algorithm 
                is checking cosie similarity between the previous two sentences and following point, and discard the points that are outside the threshold, 
                which basically means that stories generally tend to follow a pattern when you read them and dont have wild inconsistency, unless it is part
                of a narrative strategy, and if you have an ad or something in the middle of a story then it will interrupt the flow of the story, or in our case be an
                outlier in the pattern that the vectorized sentences go in.
        
    '''
    def clean_data():
        return
    
    '''
        @breif: This is the function that embbeds the sentence into a vector and adds it to the vector space. This is done
                using sBERT, which that is essentially a pretrained model for embedding sentences in vectors
    '''
    def vector_embedding(self, text: str) -> np.array:
        BREAK_UP_SENTENCE = sent_tokenize(text)
        EMBEDDINGS = self.transformer.encode(BREAK_UP_SENTENCE)
        self.vec_space.append(EMBEDDINGS)
        return EMBEDDINGS
    
    
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


    
def main():
    # Read the input data from the command line
    input_data = sys.argv[1]
    
    # Process the data (this is just a placeholder for your actual processing logic)
    processed_data = input_data.upper()  # Example processing: convert to uppercase
    
    # Output the processed data
    print(processed_data)

if __name__ == "__main__":
    main()