import json
import random
from typing import Dict, List, Union

def calculate_max_cost_difference(data: Dict[str, Dict]) -> float:
    """Calculate the maximum cost difference across all point costs."""
    max_diff = 0
    for char_data in data.values():
        costs = char_data['point_costs']
        diff = max(costs) - min(costs)
        max_diff = max(max_diff, diff)
    return max_diff

def generate_random_point_costs(length: int, min_val: float, max_val: float) -> List[float]:
    """Generate a list of random point costs within the specified range in 0.5 increments."""
    # Convert to integers for easier calculation (multiply by 2 to handle 0.5 increments)
    min_int = int(min_val * 2)
    max_int = int(max_val * 2)
    
    # Generate random integers and convert back to floats
    random_ints = [random.randint(min_int, max_int) for _ in range(length)]
    return [x / 2 for x in random_ints]

def modify_json_file(input_path: str, output_path: str) -> None:
    """
    Read a JSON file, modify point costs, and save to a new file.
    
    Args:
        input_path: Path to the input JSON file
        output_path: Path to save the modified JSON file
    """
    try:
        # Load the JSON data
        with open(input_path, 'r') as f:
            data = json.load(f)
        
        # Calculate the maximum cost difference
        max_diff = calculate_max_cost_difference(data)
        
        # Modify each character's point costs
        for char_name, char_data in data.items():
            # Generate new random costs between -3 and max_diff in 0.5 increments
            new_costs = generate_random_point_costs(
                length=len(char_data['point_costs']),
                min_val=-3,
                max_val=max_diff
            )
            char_data['point_costs'] = new_costs
        
        # Save the modified data
        with open(output_path, 'w') as f:
            json.dump(data, f, indent=2)
            
        print(f"Successfully modified {len(data)} characters")
        print(f"New point costs range from -3 to {max_diff} in 0.5 increments")
        
    except FileNotFoundError:
        print(f"Error: Input file '{input_path}' not found")
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in '{input_path}'")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

# Example usage
if __name__ == "__main__":
    modify_json_file('characters.json', 'characters-random.json')