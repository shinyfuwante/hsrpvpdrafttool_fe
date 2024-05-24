import { Component, createSignal, createEffect, Show } from "solid-js";
import {
  charJson,
  bluePicks,
  blueBans,
  setBlueBans,
  redBans,
  setRedBans,
  redPicks,
  playerTurn,
  turnOrder,
  turnIndex,
  setTurnIndex,
  CharacterPick,
  CharacterBan,
  selectedChars,
  setSelectedChars,
  ownTeam,
  isSinglePlayer,
  isEvent,
  isFFA,
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
  const [currentTurn, setCurrentTurn] = createSignal(turnOrder()[turnIndex()]);
  const [isTurn, setIsTurn] = createSignal(false);
  createEffect(() => {
    if (turnIndex() < turnOrder().length && turnIndex() >= 0) {
      setCurrentTurn(turnOrder()[turnIndex()]);
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
    if (turnIndex() >= turnOrder().length) {
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
          {Object.entries(charJson())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([characterName, characterDetails]) => {
              const characterId = (characterDetails as CharacterDetails).id;
              const characterImage = `/character_icons/${characterId}.webp`;
              const isSpecial = characterDetails.special == true && isEvent();
              const isSelected = () => {
                if (isSpecial || isFFA()) {
                  return selectedChars().filter((x) => x == characterName).length == 2;
                } else {
                  return selectedChars().includes(characterName);
                }
              };
              const onceSelected =
                isSpecial &&
                selectedChars().filter((x) => x == characterName).length == 1;
              const isMatch =
                searchTerm() != "" &&
                (characterDetails as CharacterDetails).nickname
                  .toLowerCase()
                  .includes(searchTerm().toLowerCase());

              const canPick =
                !isSelected() && isTurn() && turnIndex() < turnOrder().length;

              const renderChar = () => {
                return (
                  <div
                    style={{
                      "background-color":
                        characterDetails.rarity == 4 ? "#764585" : "#e6b741",
                      filter: !isSelected() ? "none" : "grayscale(100%)",
                      display: isMatch || searchTerm() == "" ? "flex" : "none",
                      width: "75px",
                      height: "75px",
                      cursor: !isSelected() && isTurn() ? "pointer" : "default",
                      "border-radius": "0.3em",
                      "align-items": "center",
                      "justify-content": "center",
                    }}
                    class={`${
                      isSelected() ? styles.character : styles.not_selected
                    } ${
                      onceSelected
                        ? styles.once
                        : isSelected()
                        ? styles.selected
                        : "not-selected"
                    }`}
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
              };
              return <>{renderChar()}</>;
            })}
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
        <button onClick={props.handleUndo} class={`${styles.roster_button}`}>
          Undo
        </button>
        <button onClick={props.handleReset} class={styles.roster_button}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Roster;
