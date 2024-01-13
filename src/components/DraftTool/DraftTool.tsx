import { Component, onMount, createSignal, Show } from "solid-js";
import Team from "./Team/Team";
import Roster from "./Roster/Roster";
import SoloSettings from "../SoloSettings/SoloSettings";
import {
  playerTurn,
  blueBans,
  redBans,
  bluePicks,
  redPicks,
  blueTeam,
  redTeam,
  selectedChars,
  ruleSet,
  charJson,
  setCharJson,
  lcJson,
  setLcJson,
  CharacterBan,
  CharacterPick,
  isSinglePlayer,
} from "~/game/game_logic";

import styles from "./DraftTool.module.css"

interface DraftToolProps {
  handlePick: (character: CharacterPick) => void;
  handleBan: (character: CharacterBan) => void;
  handleSigEid: (character: CharacterPick) => void;
  handleUndo: () => void;
  handleReset: () => void;
}
const DraftTool: Component<DraftToolProps> = ({handlePick, handleBan, handleSigEid, handleUndo, handleReset}) => {
  const [ready, setReady] = createSignal(false);
  onMount(async () => {
    let response1 = await fetch(`/rule_sets/${ruleSet()}/characters.json`);
    // if response fails, fetch phd_standard characters.json
    if (!response1.ok) {
      try {
        response1 = await fetch(`/rule_sets/phd_standard/characters.json`);
      } catch (e) {
        console.log(e);
      }
    }
    setCharJson(await response1.json());

    let response2 = await fetch(`/rule_sets/${ruleSet()}/light_cones.json`);
    if (!response2.ok) {
      try {
        response1 = await fetch(`/rule_sets/phd_standard/characters.json`);
      } catch (e) {
        console.log(e);
      }
    }
    setLcJson(await response2.json());
    setReady(true);
  });
  return (
    <>
      {ready() && (
        <>
        <Show when={isSinglePlayer()}>
            <SoloSettings />
        </Show>
          <div style={{ display: "flex", width: "100%" }}>
            <div class={styles.team}>
              <Team
                bansSignal={blueBans}
                picksSignal={bluePicks}
                team={"blue_team"}
                handleSigEid={handleSigEid}
              />
            </div>
            <div class={styles.roster}>
              <Roster handleBan={handleBan} handlePick={handlePick} handleUndo={handleUndo} handleReset={handleReset} />
              <div style={{ "align-self": "center" }}>
                Current Player Turn: {playerTurn()}
              </div>
            </div>
            <div class={styles.team}>
              <Team
                bansSignal={redBans}
                picksSignal={redPicks}
                team={"red_team"}
                handleSigEid={handleSigEid}
              />
            </div>
          </div>
          <div></div>
        </>
      )}
    </>
  );
};

export default DraftTool;
