import { Component, createSignal } from "solid-js";
import {
  charJson,
  bluePicks,
  blueBans,
  redBans,
  redPicks,
} from "~/game/game_logic";
import { CharacterDetails } from "~/types";

const Roster: Component<{}> = (props) => {
  const [searchTerm, setSearchTerm] = createSignal("");

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        gap: "2px",
        "padding-left": "2px",
        "padding-right": "2px",
      }}
    >
      <input
        type="text"
        value={searchTerm()}
        onInput={(e) => setSearchTerm(e.target.value)}
        placeholder="Search characters"
      />
      <div
        style={{
          display: "grid",
          "grid-auto-rows": "100px",
          "grid-template-columns": "repeat(auto-fill, 100px)",
          "max-width": "100%",
          "max-height": "100%",
          border: "2px solid grey",
          "place-content": "center",
          gap: "5px",
        }}
      >
        {Object.entries(charJson()).map(([characterName, characterDetails]) => {
          const characterId = (characterDetails as CharacterDetails).id;
          const characterImage = `/character_icons/${characterId}.webp`;
          const isSelected =
            bluePicks().includes(characterName) ||
            blueBans().includes(characterName) ||
            redBans().includes(characterName) ||
            redPicks().includes(characterName);
          const isMatch =
            searchTerm() != "" &&
            characterName.toLowerCase().includes(searchTerm().toLowerCase());

          return (
            <div
              style={{
                "background-color":
                  characterDetails.rarity == 4 ? "purple" : "orange",
                filter: !isSelected ? "none" : "grayscale(100%)",
                display:
                  isMatch || searchTerm() == "" ? "inline-block" : "none",
                width: "100px",
                height: "100px",
              }}
            >
              <img
                src={characterImage}
                alt={characterName}
                style={{
                  "max-width": "100%",
                  "max-height": "100%",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roster;
