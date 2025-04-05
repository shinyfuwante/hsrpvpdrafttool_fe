import csv
import json
import sys
from typing import Dict, List, Union

def read_csv_data(filename: str) -> tuple[Dict[str, List[float]], Dict[str, List[float]]]:
    """Read CSV data and return separate dictionaries for characters and light cones."""
    characters_costs: Dict[str, List[float]] = {}
    lightcones_costs: Dict[str, List[float]] = {}
    current_type = None
    
    with open(filename, 'r') as file:
        reader = csv.reader(file)
        
        for row in reader:
            # Skip empty rows
            if not row:
                continue
                
            # Check for header rows to determine type
            if row[0] == "Characters ID":
                current_type = "characters"
                continue
            if row[0] == "Lightcones ID":
                current_type = "lightcones"
                continue
                
            # Skip header row with E0, E1, etc. or S1, S2, etc.
            if row[0] in ["Characters ID", "Lightcones ID"] or row[0] in ["E0", "S1"]:
                continue
            
            if row[0] == "STOP":
                break
            else:
                id_index = 0
                character_id = row[0]
                end_index = -1 if current_type == "characters" else -3
                costs = [float(cost) for cost in row[id_index + 2:end_index] if cost]
            
            # Only process if we have a valid ID and costs
            if character_id and costs:
                # Store in appropriate dictionary
                if current_type == "characters":
                    characters_costs[character_id] = costs
                elif current_type == "lightcones":
                    lightcones_costs[character_id] = costs

    return characters_costs, lightcones_costs

def update_json_file(json_path: str, csv_costs: Dict[str, List[float]], cumulative: bool = False) -> None:
    """Update JSON file with costs from CSV data."""
    try:
        with open(json_path, 'r') as file:
            data = json.load(file)
        
        # Update costs for each character/light cone
        for name, item_data in data.items():
            if 'id' in item_data:
                if item_data['id'] in csv_costs:
                    costs = csv_costs[item_data['id']]
                    if cumulative and json_path == "characters.json":
                        # Convert absolute costs to cumulative costs
                        cumulative_costs = [costs[0]]
                        for i in range(1, len(costs)):
                            cumulative_costs.append(costs[i] - costs[i-1])
                        item_data['point_costs'] = cumulative_costs
                    else:
                        item_data['point_costs'] = costs
        
        # Write updated data back to file
        with open(json_path, 'w') as file:
            json.dump(data, file, indent=2)
            
        print(f"Successfully updated {json_path}")
        
    except FileNotFoundError:
        print(f"Error: JSON file '{json_path}' not found")
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in '{json_path}'")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

def main():
    # Check if CSV file was provided
    if len(sys.argv) != 2:
        print("Usage: python script.py <csv_file>")
        sys.exit(1)
    
    csv_filename = sys.argv[1]
    
    try:
        # Read CSV data
        print(f"Reading CSV data from {csv_filename}...")
        characters_costs, lightcones_costs = read_csv_data(csv_filename)
        
        # Update characters.json with cumulative costs
        print("\nUpdating characters.json with cumulative costs...")
        update_json_file("characters.json", characters_costs, cumulative=True)
        
        # Update lightcones.json with absolute costs
        print("\nUpdating lightcones.json...")
        update_json_file("light_cones.json", lightcones_costs)
        
    except FileNotFoundError:
        print(f"Error: CSV file '{csv_filename}' not found")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()