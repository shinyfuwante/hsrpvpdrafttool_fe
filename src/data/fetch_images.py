import json
import os
from PIL import Image

# Load the JSON file into a dictionary
with open('./StarRailRes/index_min/en/characters.json', 'r') as f:
    characters = json.load(f)

with open('./StarRailRes/index_min/en/light_cones.json', 'r') as f:
    light_cones = json.load(f)
    
def convert_and_move_images(src_dir, dest_dir, file_ext):
    for filename in os.listdir(src_dir):
        if filename.endswith(file_ext):
            # Get the ID of the character
            id = filename.split('.')[0]
            if id == '8000' or id == 'None': 
                continue

            # Check if the destination file already exists
            dest_file = f'{dest_dir}/{id}.webp'
            if os.path.exists(dest_file):
                print(f'Skipping {dest_file}, already exists')
                continue

            # Open the image file
            img = Image.open(f'{src_dir}/{filename}')
            # Convert and save the image to the new directory with the new name
            img.save(dest_file, 'webp')

# Convert and move character preview images
convert_and_move_images('./StarRailRes/image/character_preview', '../../public/character_images', '.png')

print("getting icons")
# Convert and move character icon images
convert_and_move_images('./StarRailRes/icon/character', '../../public/character_icons', '.png')
convert_and_move_images('./StarRailRes/image/light_cone_preview', '../../public/light_cone_images', '.png')