import json
import os

# Load the existing JSON file into a dictionary
with open('./StarRailRes/index_min/en/characters.json', 'r') as f:
    characters = json.load(f)

# Load the new JSON file, if it exists
new_characters = {}
if os.path.exists('./characters.json'):
    with open('./characters.json', 'r') as f:
        new_characters = json.load(f)

# Iterate through all the characters
for id, character in characters.items():
    name = character['name']
    rarity = character['rarity']

    # Skip if the key already exists
    if name in new_characters:
        continue

    # Add the character to the new dictionary
    new_characters[name] = {
        'id': id,
        'point_costs': [1, 2, 3, 4, 5, 6, 7],
        'rarity': rarity
    }

# Write the new dictionary to a new JSON file
with open('./characters.json', 'w') as f:
    json.dump(new_characters, f, indent=4)