import json
import sys
from preprocess.model import FeatureExtractionModel

'''
@brief: Processes a paragraph of text to extract important sentences.

@params: txt -> str, the text to be processed
@returns: dict, JSON-compatible result with status, cluster count, and sentences
'''
def process_text(txt: str) -> dict:
    try:
        model = FeatureExtractionModel()
        model.vector_embedding(txt)
        latent_space = model.U_MAP()
        n_cluster, c_labels, c_list = model.HDBSCAN(latent_space)  # Fixed typo
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
@brief: Main function to handle input from Node.js and return JSON output.
        Expects input as a JSON string via stdin.
'''
def main():
    try:
        # Read input from stdin
        input_data = sys.stdin.read().strip()
        if not input_data:
            print(json.dumps({"status": "error", "error": "No input provided"}), flush=True)
            sys.exit(1)
        
        # Parse JSON input
        input_json = json.loads(input_data)
        article_text = input_json.get("text", "")
        
        if not article_text:
            print(json.dumps({"status": "error", "error": "Empty article text"}), flush=True)
            sys.exit(1)
        
        # Process the article
        result = process_text(article_text)
        print(json.dumps(result), flush=True)
        
    except json.JSONDecodeError:
        print(json.dumps({"status": "error", "error": "Invalid JSON input"}), flush=True)
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"status": "error", "error": f"Unexpected error: {str(e)}"}), flush=True)
        sys.exit(1)

if __name__ == "__main__":
    main()