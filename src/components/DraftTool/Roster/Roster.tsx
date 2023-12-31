import { Component, createSignal } from "solid-js";
import { charJson } from "~/game/game_logic";
import { CharacterDetails } from "~/types";

const Roster: Component<{}> = (props) => {
  const [searchTerm, setSearchTerm] = createSignal("");

  // Given the characters in charJson, display them in a grid
  // the display will use the images in /public/character_icons/ based on their id in charJson()
  return (
    <div>
      <div>Character Roster</div>
      <input
        type="text"
        value={searchTerm()}
        onInput={(e) => setSearchTerm(e.target.value)}
        placeholder="Search characters"
      />
      <div>
        {Object.entries(charJson()).map(([characterName, characterDetails]) => {
          const characterId = (characterDetails as CharacterDetails).id;
          const characterImage = `/character_icons/${characterId}.webp`;
          const isMatch = characterName
            .toLowerCase()
            .includes(searchTerm().toLowerCase());

          return (
            <div
              style={{
                "background-color":
                  characterDetails.rarity == 4 ? "purple" : "gold",
                "display": "inline-block",
                filter: isMatch ? "none" : "grayscale(100%)",

              }}
            >
              <img src={characterImage} alt={characterName} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roster;
