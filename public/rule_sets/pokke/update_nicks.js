import fs from 'fs';

// Read the JSON files
fs.readFile('characters.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Parse the JSON data
  const characters = JSON.parse(data);

  fs.readFile('../phd_standard/characters.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Parse the JSON data
    const phdCharacters = JSON.parse(data);

    // Replace the nickname field in phdCharacters with the one from characters
    for (const character in characters) {
      if (phdCharacters[character]) {
        phdCharacters[character].nickname = characters[character].nickname;
      }
    }

    // Stringify the updated JSON data
    const updatedData = JSON.stringify(phdCharacters, null, 2);

    // Write the updated data back to the file
    fs.writeFile('../phd_standard/characters.json', updatedData, 'utf8', err => {
      if (err) {
        console.error(err);
        return;
      }

      console.log('Successfully updated ../phd_standard/characters.json');
    });
  });
});