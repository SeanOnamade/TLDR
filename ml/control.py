import json
import sys
from preprocess.model import FeatureExtractionModel


'''
@breif: this is the funciton that runs a model instance and takes in a paragrpah
        of text and extracts the important sentences from the text

@params: txt -> srt, this is the text that is being processed
@returns: a list that represents a string of text
'''
def process_text(txt: str) -> list:
    
    try:
        model = FeatureExtractionModel()
        model.vector_embedding(txt)
        latent_space = model.U_MAP()
        n_cluster, c_labels, c_list, = model.HDBSCAN(latent_space)
        _, c_sentences = model.extract_vector(c_list)
        
        # Return JSON
        return {
            "stat": "complete",
            "n_cluster": n_cluster,
            "sentence_list": c_sentences
        }
    except Exception as e:
        return {
            "stat": "error",
            "error": str(e)
        }


'''
@breif: Main function to handle input from Node.js and return JSON output.
        Expects input as a JSON string via stdin or command-line argument.
'''
def main():
    try:
        # Read input from stdin -> sent via sev
        input_data = sys.stdin.read().strip()
        if not input_data:
            print(json.dumps({"status": "error", "error": "No input provided"}))
            sys.exit(1)
        
        # Parse JSON input
        input_json = json.loads(input_data)
        article_text = input_json.get("text", "")
        
        if not article_text:
            print(json.dumps({"status": "error", "error": "Empty article text"}))
            sys.exit(1)
        
        # Process the article
        result = process_text(article_text)
        print(json.dumps(result))
        
    except json.JSONDecodeError:
        print(json.dumps({"status": "error", "error": "Invalid JSON input"}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"status": "error", "error": f"Unexpected error: {str(e)}"}))
        sys.exit(1)
    
if __name__ == "__main__":
    main()
        