import { Component, createSignal, createEffect, Show } from "solid-js";
import {
  charJson,
  bluePicks,
  blueBans,
  setBlueBans,
  redBans,
  setRedBans,
  redPicks,
  turnOrder,
  turnIndex,
  CharacterPick,
  CharacterBan,
  selectedChars,
  setSelectedChars,
  ownTeam,
  isSinglePlayer,
  isEvent,
  isFFA,
  canDoublePickWithCost,
  turn_order_bb,
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
  const [bannedCharacters, setBannedCharacters] = createSignal<string[]>([]);
  createEffect(() => {
    if (turnIndex() < turnOrder().length && turnIndex() >= 0) {
      setCurrentTurn(turnOrder()[turnIndex()]);
      setIsTurn(ownTeam() == currentTurn().team || isSinglePlayer());
    }
  });
  createEffect(() => {
    const selected = [
      ...bluePicks(),
      ...redPicks(),
    ].map((char) => char.name);
    setSelectedChars(selected);
  });
  createEffect(() => {
    const banned = [
      ...blueBans(),
      ...redBans(),
    ].map((ban) => ban.name);
    setBannedCharacters(banned);
  })
  const selectCharacter = (characterName: string) => {
    if (turnIndex() >= turnOrder().length) {
      return;
    }
    const currentPlayer = currentTurn().team;
    const currentAction = currentTurn().action;
    if (currentAction == "ban") {
      if (currentPlayer == "blue_team") {
          setBlueBans([...blueBans(), { name: characterName }]);
          handleBan({ name: characterName });
      } else {
          setRedBans([...redBans(), { name: characterName }]);
          handleBan({ name: characterName });
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
        num_picked: selectedChars().includes(characterName) ? 2 : 1
      };
      if (currentPlayer == "blue_team") {
        if (bluePicks().length < 8 || (turnOrder() == turn_order_bb && bluePicks().length < 10)) {
          handlePick(pick);
        }
      } else {
        if (redPicks().length < 8 || (turnOrder() == turn_order_bb && redPicks().length < 10)) {
          handlePick(pick);
        }
      }
    }
    // setTurnIndex(turnIndex() + 1);
    setSearchTerm("");
  };
  const endDraftPhase = () => {
    if (turnOrder() == turn_order_bb) {
      return redPicks().length == 10 && blueBans().length == 4; 
    }
    return redPicks().length == 8;
  }
  return (
    <div class={styles.roster_container}>
      <div
        style={{
          display: endDraftPhase() ? "none" : "flex",
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
          { Object.entries(charJson())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([characterName, characterDetails]) => {
              const characterId = (characterDetails as CharacterDetails).id;
              const characterImage = `/character_icons/${characterId}.webp`;
              const isSpecial = characterDetails.special == true && isEvent();
              // if (turnOrder() == turn_order_bb) {
              //   if (turnIndex() == turnOrder().length - 2) {
              //     let match = false;
              //     for (const pick of bluePicks()) {
              //       if (pick.name == characterName) {
              //         match = true;
              //       }
              //     }
              //     if (!match) return;
              //   }
              //   if (turnIndex() == turnOrder().length - 1) {
              //     let match = false;
              //     for (const pick of redPicks()) {
              //       if (pick.name == characterName) {
              //         match = true;
              //       }
              //     }
              //     if (!match) return;
              //   }
              // }
              const isBanned = () => {
                if (isFFA()) {
                  return bannedCharacters().filter(c => c == characterName).length == 3;
                }
                return bannedCharacters().includes(characterName);
              };
              const canSelect = () => {
                if (ownTeam() != "spectator") {
                  if (!isTurn()) {
                    return false;
                  }
                  if (!(turnIndex() < turnOrder().length)) {
                    return false;
                  }
                  // if (turnOrder() == turn_order_bb && turnIndex() > turnOrder().length - 3 && turnIndex() < turnOrder().length) {
                  //   return true;
                  // }
                }

                if (isSpecial || isFFA() || canDoublePickWithCost()) {
                  const pickSignal = currentTurn().team == "blue_team" ? bluePicks : redPicks;
                  return pickSignal().filter((char) => char.name == characterName).length == 0;
                } else {
                  return !selectedChars().includes(characterName);
                }
              };
              const isMatch =
                searchTerm() != "" &&
                (characterDetails as CharacterDetails).nickname
                  .toLowerCase()
                  .includes(searchTerm().toLowerCase());

              const canPick = () => {
                return !isBanned() && canSelect();
              }

              const renderChar = () => {
                return (
                  <div
                    style={{
                      "background-color":
                        characterDetails.rarity == 4 ? "#764585" : "#e6b741",
                      filter: canPick() ? "none" : "grayscale(100%)",
                      display: isMatch || searchTerm() == "" ? "flex" : "none",
                      width: "75px",
                      height: "75px",
                      cursor: canPick() && isTurn() ? "pointer" : "default",
                      "border-radius": "0.3em",
                      "align-items": "center",
                      "justify-content": "center",
                    }}
                    class={`${
                      canPick() ? styles.not_selected : styles.character
                    }`}
                    onClick={
                      canPick() && !(ownTeam() == "spectator") ? () => selectCharacter(characterName) : undefined
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
          display: endDraftPhase() ? "inline-block" : "none",
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
