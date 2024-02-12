import { Component, createSignal, createEffect } from "solid-js";
import {
  charJson,
  bluePicks,
  blueBans,
  setBlueBans,
  redBans,
  setRedBans,
  redPicks,
  playerTurn,
  turn_order,
  turnIndex,
  setTurnIndex,
  CharacterPick,
  CharacterBan,
  selectedChars,
  setSelectedChars,
  ownTeam,
  isSinglePlayer,
} from "~/game/game_logic";
import { CharacterDetails } from "~/types";
import Results from "~/components/Results/Results";
import styles from "./Roster.module.css";

export interface RosterProps {
  handlePick: (character: CharacterPick) => void;
  handleBan: (character: CharacterBan) => void;
  handleReset: () => void;
  handleUndo: () => void;
}
const Roster: Component<RosterProps> = (props) => {
  const { handleBan, handlePick } = props;
  const [searchTerm, setSearchTerm] = createSignal("");
  const [currentTurn, setCurrentTurn] = createSignal(turn_order[turnIndex()]);
  const [isTurn, setIsTurn] = createSignal(false);
  createEffect(() => {
    if (turnIndex() < turn_order.length) {
      setCurrentTurn(turn_order[turnIndex()]);
      setIsTurn(ownTeam() == currentTurn().team || isSinglePlayer());
    }
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
    if (turnIndex() >= turn_order.length) {
      return;
    }
    const currentPlayer = currentTurn().team;
    const currentAction = currentTurn().action;
    if (currentAction == "ban") {
      if (currentPlayer == "blue_team") {
        if (blueBans().length < 2) {
          setBlueBans([...blueBans(), { name: characterName }]);
          handleBan({ name: characterName });
        }
      } else {
        if (redBans().length < 2) {
          setRedBans([...redBans(), { name: characterName }]);
          handleBan({ name: characterName });
        }
      }
    } else {
      const pickSignal = currentPlayer == "blue_team" ? bluePicks : redPicks;
      const pick = {
        name: characterName,
        light_cone: "",
        eidolon: 0,
        superimposition: 1,
        index: Math.max(0, pickSignal().length - 1),
        team: currentPlayer,
      };
      if (currentPlayer == "blue_team") {
        if (bluePicks().length < 8) {
          handlePick(pick);
        }
      } else {
        if (redPicks().length < 8) {
          handlePick(pick);
        }
      }
    }
    // setTurnIndex(turnIndex() + 1);
    setSearchTerm("");
    if (turnIndex() == turn_order.length) {
      // draft end probably
    }
  };

  return (
    <div class={styles.roster_container}>
      <div
        style={{
          display: redPicks().length == 8 ? "none" : "flex",
          "flex-direction": "column",
        }}
      >
        <input
          type="text"
          value={searchTerm()}
          onInput={(e) => setSearchTerm(e.target.value)}
          placeholder="Search characters"
          class={styles.search_bar}
        />
        <div class={styles.selector}>
          {Object.entries(charJson()).sort(([a],[b]) => a.localeCompare(b)).map(
            ([characterName, characterDetails]) => {
              const characterId = (characterDetails as CharacterDetails).id;
              const characterImage = `/character_icons/${characterId}.webp`;
              const isSelected = selectedChars().includes(characterName);
              const isMatch =
                searchTerm() != "" &&
                characterName
                  .toLowerCase()
                  .includes(searchTerm().toLowerCase());

              const canPick =
                !isSelected && isTurn() && turnIndex() < turn_order.length;

              return (
                <div
                  style={{
                    "background-color":
                      characterDetails.rarity == 4 ? "#702985" : "#EFAF0B",
                    filter: !isSelected ? "none" : "grayscale(100%)",
                    display:
                      isMatch || searchTerm() == "" ? "inline-block" : "none",
                    width: "75px",
                    height: "75px",
                    cursor: !isSelected && isTurn() ? "pointer" : "default",
                  }}
                  class={`${styles.character} ${isSelected ? "" : "not-selected"}`}
                  onClick={
                    canPick ? () => selectCharacter(characterName) : undefined
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
            }
          )}
        </div>
      </div>
      <div
        style={{
          display: redPicks().length == 8 ? "inline-block" : "none",
        }}
      >
        <Results></Results>
      </div>
      <div
        style={{
          display: "flex",
          "flex-direction": "row",
          "justify-content": "space-between",
        }}
      >
        <button onClick={props.handleUndo} class={styles.roster_button}>Undo</button>
        <button onClick={props.handleReset} class={styles.roster_button}>Reset</button>
      </div>
    </div>
  );
};

export default Roster;
