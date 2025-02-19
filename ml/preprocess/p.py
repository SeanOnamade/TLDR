import os
import nltk

# Make sure the directory exists
os.makedirs('./punkt', exist_ok=True)

# Set NLTK_DATA to your local "punkt" folder
os.environ['NLTK_DATA'] = os.path.join(os.getcwd(), 'punkt')

# Download both punkt and punkt_tab there
nltk.download('punkt', download_dir=os.environ['NLTK_DATA'])
nltk.download('punkt_tab', download_dir=os.environ['NLTK_DATA'])

# Add that folder to NLTK's data path
if os.environ['NLTK_DATA'] not in nltk.data.path:
    nltk.data.path.append(os.environ['NLTK_DATA'])
