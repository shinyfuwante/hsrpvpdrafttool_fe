import json
import os
from PIL import Image

# Load the JSON file into a dictionary
with open('./StarRailRes/index_min/en/characters.json', 'r') as f:
    characters = json.load(f)

# Iterate through all the images
for filename in os.listdir('./StarRailRes/image/character_preview'):
    if filename.endswith('.png'):
        # Get the ID and name of the character
        id = filename.split('.')[0]
        name = characters[id]['name']

        # Open the image file
        img = Image.open(f'./StarRailRes/image/character_preview/{filename}')
        # Convert and save the image to the new directory with the new name
        img.save(f'../../public/character_images/{name}.webp', 'webp')