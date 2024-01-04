import { Component, createSignal, createEffect } from "solid-js";
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
  selectedChars,
  setSelectedChars,
  ownTeam,
} from "~/game/game_logic";
import { CharacterDetails } from "~/types";

export interface RosterProps {
  handlePick: (character: CharacterPick) => void;
  handleBan: (character: CharacterBan) => void;
}
const Roster: Component<RosterProps> = (props) => {
  const { handleBan, handlePick } = props;
  const [searchTerm, setSearchTerm] = createSignal("");
  const [currentTurn, setCurrentTurn] = createSignal(turn_order[turnIndex()]);
  const [isTurn, setIsTurn] = createSignal(false);
  createEffect(() => {
    setCurrentTurn(turn_order[turnIndex()]);
    setIsTurn(ownTeam() == currentTurn().team);
  });
  createEffect(() => {
    const selected = [
      ...blueBans(),
      ...redBans(),
      ...bluePicks(),
      ...redPicks(),
    ].map((char) => char.name);
    setSelectedChars(selected);
  });
  const selectCharacter = (characterName: string) => {
    // determine if ban or pick
    // might have to move further out
    const currentPlayer = currentTurn().team;
    const currentAction = currentTurn().action;
    if (turnIndex() >= turn_order.length) {
      return;
    }
    if (currentAction == "ban") {
      if (currentPlayer == "blue_team") {
        if (blueBans().length < 2) {
          setBlueBans([...blueBans(), { name: characterName }]);
        }
        handleBan({ name: characterName });
      } else {
        if (redBans().length < 2) {
          setRedBans([...redBans(), { name: characterName }]);
          handleBan({ name: characterName });
        }
      }
    } else {
      const pick = {
        name: characterName,
        light_cone: "",
        eidolon: 0,
        superimposition: 0,
        index: bluePicks().length - 1,
      };
      if (currentPlayer == "blue_team") {
        if (bluePicks().length < 10) {
          setBluePicks([...bluePicks(), pick]);
          handlePick(pick);
        }
      } else {
        if (redPicks().length < 10) {
          setRedPicks([...redPicks(), pick]);
          handlePick(pick);
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
          const isSelected = selectedChars().includes(characterName);
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
                cursor: !isSelected && isTurn() ? "pointer" : "default",
              }}
              onClick={
                !isSelected
                  ? isTurn()
                    ? () => selectCharacter(characterName)
                    : undefined
                  : undefined
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
