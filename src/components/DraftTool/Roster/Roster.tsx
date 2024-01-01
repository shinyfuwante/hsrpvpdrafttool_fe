import { Component, createSignal } from "solid-js";
import { charJson, bluePicks, blueBans, redBans, redPicks } from "~/game/game_logic";
import { CharacterDetails } from "~/types";

const Roster: Component<{}> = (props) => {
  const [searchTerm, setSearchTerm] = createSignal("");

  return (
    <div>
      <div>Character Roster</div>
      <input
        type="text"
        value={searchTerm()}
        onInput={(e) => setSearchTerm(e.target.value)}
        placeholder="Search characters"
      />
      <div style= {{
        "display": "flex",
        "flex-wrap": "wrap",
        "max-width": "100%",
        "max-height": "100%",
        "border": "2px solid grey",
      }}>
        {Object.entries(charJson()).map(([characterName, characterDetails]) => {
          const characterId = (characterDetails as CharacterDetails).id;
          const characterImage = `/character_icons/${characterId}.webp`;
          const isSelected = bluePicks().includes(characterName) || blueBans().includes(characterName) || redBans().includes(characterName) || redPicks().includes(characterName);
          const isMatch = searchTerm() != "" && characterName
            .toLowerCase()
            .includes(searchTerm().toLowerCase());

          return (
            <div
              style={{
                "background-color":
                isMatch ? "green" : characterDetails.rarity == 4 ? "purple" : "orange",
                filter: isMatch || searchTerm() || !isSelected ? "none" : "grayscale(100%)",
                "display": "inline-block",
                "width": "75px",
                "height": "75px",
                "margin": "2px",
                "margin-top": "-1px",
              }}
            >
              <img src={characterImage} alt={characterName} style= {{
                "max-width": "100%",
                "max-height": "100%",
              }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roster;
