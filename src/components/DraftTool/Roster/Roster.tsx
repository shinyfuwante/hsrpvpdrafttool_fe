import { Component, createSignal } from "solid-js";
import {
  charJson,
  bluePicks,
  setBluePicks,
  blueBans,
  setBlueBans,
  redBans,
  setRedBans,
  redPicks,
  setRedPicks,
  playerTurn,
  turn_order,
  turnIndex,
  setTurnIndex,
  CharacterPick,
  CharacterBan,
} from "~/game/game_logic";
import { CharacterDetails } from "~/types";

export interface RosterProps {
  handlePick: (character: CharacterPick) => {};
  handleBan: (character: CharacterBan) => {};
}
const Roster: Component<RosterProps> = (props) => {
  const {handleBan, handlePick} = props;
  const [searchTerm, setSearchTerm] = createSignal("");

  const selectCharacter = (characterName: string) => {
    // determine if ban or pick
    // might have to move further out
    if (turnIndex() >= turn_order.length) {
      return;
    }
    const currentTurn = turn_order[turnIndex()];
    const currentPlayer = currentTurn.team;
    const currentAction = currentTurn.action;
    if (currentAction == "ban") {
      if (currentPlayer == "blue_team") {
        if (blueBans().length < 2) {
          setBlueBans([...blueBans(), characterName]);
        }
        handleBan({ name: characterName});
      } else {
        if (redBans().length < 2) {
          setRedBans([...redBans(), characterName]);
          handleBan({ name: characterName});
        }
      }
    } else {
      if (currentPlayer == "blue_team") {
        if (bluePicks().length < 10) {
          setBluePicks([...bluePicks(), characterName]);
          handlePick({ name: characterName, light_cone: "", eidolon: 0, superimposition: 0});
        }
      } else {
        if (redPicks().length < 10) {
          setRedPicks([...redPicks(), characterName]);
          handlePick({ name: characterName, light_cone: "", eidolon: 0, superimposition: 0});
        }
      }
    }
    setTurnIndex(turnIndex() + 1);
  };

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
                cursor: isSelected ? "default" : "pointer",
              }}
              onClick={
                isSelected ? undefined : () => selectCharacter(characterName)
              }
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
