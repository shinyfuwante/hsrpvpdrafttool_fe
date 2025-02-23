import json

def copy_code_fields(source_file, target_file):
    """
    Copies the 'code' field from source JSON to target JSON.
    
    Args:
        source_file (str): Path to source JSON file containing 'code' fields
        target_file (str): Path to target JSON file to modify
    """
    try:
        # Read source file
        with open(source_file, 'r', encoding='utf-8') as src:
            source_data = json.load(src)
        
        # Read target file
        with open(target_file, 'r', encoding='utf-8') as tgt:
            target_data = json.load(tgt)
        
        # Copy code fields
        for character in source_data:
            if character in target_data and 'code' in source_data[character]:
                target_data[character]['code'] = source_data[character]['code']
        
        # Write back to target file with pretty formatting
        with open(target_file, 'w', encoding='utf-8') as tgt:
            json.dump(target_data, tgt, indent=2, ensure_ascii=False)
        
        print(f"Successfully copied code fields from {source_file} to {target_file}")
        
    except FileNotFoundError:
        print("Error: One or both files not found")
    except json.JSONDecodeError:
        print("Error: Invalid JSON format in one of the files")
    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}")

# Example usage
if __name__ == "__main__":
    copy_code_fields('characters.json', '../phd_moc_11/characters.json')