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


    
if __name__ == "__main__":
    #print(nltk.data.path)
    preprocessor = preProcessor()
    preProcessor2 = preProcessor()
    f1_story = """On a bright Sunday morning at the legendary Silverstone Circuit, the roar of engines
                    echoed across the grandstands. The red-liveried Ferrari led the formation lap, closely followed
                    by the reigning champion in his silver Mercedes. As the lights went out, the cars surged forward,
                    tires screeching. A daring overtake at Copse Corner brought the crowd to its feet. In the end,
                    a well-timed pit stop and steady driving secured a thrilling victory for the challenger, marking
                    a new chapter in the fierce battle for the Formula 1 championship title."""

    f1_story_alt = """On a crisp Sunday morning at the historic Silverstone Circuit, the engines roared to life,
                    filling the stands with excitement. A striking red Ferrari dominated the formation lap, trailed closely
                    by the defending champion in a gleaming silver Mercedes. As the race commenced, the cars exploded off the line,
                    their tires screaming through every turn. A bold maneuver at Copse Corner sent shockwaves through the crowd.
                    Ultimately, an expertly timed pit stop and unwavering control propelled the challenger to a stunning victory,
                    ushering in a new era in the fierce battle for the Formula 1 championship."""


    preprocessor.vector_embedding(f1_story)
    preprocessor.vector_embedding(f1_story_alt)

    print(preprocessor.vec_space)
    # testing
    embeddings = preprocessor.vector_embedding(f1_story)
    embeddings2 = preProcessor2.vector_embedding(f1_story_alt)
    
    print(preprocessor)
    print(f"Number of sentences embedded: {len(embeddings)}")
    print(f"Size of each vector: {embeddings[0].shape}")
    print(f"Total vectors in vector space: {len(preprocessor.vec_space)}")
    print(f"\n{np.stack(preprocessor.vec_space[:10])}")
    print('~~~~~~~~~~~~~~~~~~~~~\n')
    print(f"\n{np.stack(preProcessor2.vec_space[:10])}")
    
    print('~~~~~~~~~~~~~~~~~~~~~\n')
    temp = preprocessor.cosine_similarity(preProcessor2.vec_space)
    reg = np.mean(temp) * 100
    print(f'cosine sim between embeddings: \n {temp}\n')
    
    print(f'Percent similarity: \n {reg}')