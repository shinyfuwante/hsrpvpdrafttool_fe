import json
import os

# Function to process a dictionary of items and write to a file
def process_items(items, new_data_file):
    # Load the new JSON file, if it exists
    new_data = {}
    if os.path.exists(new_data_file):
        with open(new_data_file, 'r') as f:
            new_data = json.load(f)

    # Iterate through all the items
    for id, item in items.items():
        name = item['name']
        rarity = item['rarity']

        # Skip if the key already exists
        if name in new_data or name == '{NICKNAME}':
            continue

        # Add the item to the new dictionary
        new_data[name] = {
            'id': id,
            'rarity': rarity,
            'point_costs': [0, 0, 0, 0, 0, 0, 0],
            'nickname': name
        }

    # Write the new dictionary to a new JSON file
    with open(new_data_file, 'w') as f:
        json.dump(new_data, f, indent=4)

# Load the existing JSON files into dictionaries
with open('./StarRailRes/index_min/en/characters.json', 'r') as f:
    characters = json.load(f)

with open('./StarRailRes/index_min/en/light_cones.json', 'r') as f:
    lightcones = json.load(f)

# Process the characters and lightcones
process_items(characters, './characters.json')
process_items(lightcones, './light_cones.json')