import json

def load_json_from_file(filename):
    """Loads JSON data from a file."""
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        raise ValueError(f"The file '{filename}' was not found.")
    except json.JSONDecodeError:
        raise ValueError(f"The file '{filename}' contains invalid JSON.")

def save_json_to_file(data, filename):
    """Saves JSON data to a file."""
    try:
        with open(filename, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2)
    except IOError as e:
        raise ValueError(f"Error writing to file '{filename}': {str(e)}")

def set_all_point_costs_to_zero(data):
    """
    Sets all point costs in the provided JSON-like dictionary to zeros.
    
    Args:
        data (dict): A nested dictionary containing character data with point costs
    
    Returns:
        dict: Modified dictionary with all point costs set to zero
    """
    for character_id, char_data in data.items():
        if 'point_costs' in char_data and isinstance(char_data['point_costs'], list):
            char_data['point_costs'] = [0] * len(char_data['point_costs'])
    
    return data

def main(input_filename='characters.json', output_filename='modified_characters.json'):
    """
    Main function that processes the JSON file.
    
    Args:
        input_filename (str): Name of the input JSON file
        output_filename (str): Name of the output JSON file
    """
    try:
        # Load data from file
        print(f"Loading data from '{input_filename}'...")
        data = load_json_from_file(input_filename)
        
        # Process the data
        print("Setting point costs to zero...")
        modified_data = set_all_point_costs_to_zero(data)
        
        # Save result
        print(f"Saving modified data to '{output_filename}'...")
        save_json_to_file(modified_data, output_filename)
        
        print("Processing complete!")
        
    except ValueError as e:
        print(f"Error: {str(e)}")
        return False
    return True

if __name__ == "__main__":
    main()