import { Component, onMount, createSignal, Show } from "solid-js";
import Team from "./Team/Team";
import TeamWithLCBan from "./TeamWithLCBan/TeamWithLcBan";
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
  ownTeam,
  version,
  lcBanPhase,
} from "~/game/game_logic";

import styles from "./DraftTool.module.css";

interface DraftToolWithLCBanProps {
  handlePick: (character: CharacterPick) => void;
  handleBan: (character: CharacterBan) => void;
  handleSigEid: (character: CharacterPick) => void;
  handleUndo: () => void;
  handleReset: () => void;
}
const DraftToolWithLCBan: Component<DraftToolWithLCBanProps> = ({
  handlePick,
  handleBan,
  handleSigEid,
  handleUndo,
  handleReset,
}) => {
  const [ready, setReady] = createSignal(false);
  const fetchData = async () => {
    let response1 = await fetch(
      `/rule_sets/${ruleSet()}/characters.json?version=${version()}`
    );
    // if response fails, fetch phd_standard characters.json
    if (!response1.ok) {
      try {
        response1 = await fetch(
          `/rule_sets/phd_standard/characters.json?version=${version()}`
        );
      } catch (e) {
        console.log(e);
      }
    }
    setCharJson(await response1.json());

    let response2 = await fetch(
      `/rule_sets/${ruleSet()}/light_cones.json?version=${version()}`
    );
    if (!response2.ok) {
      try {
        response2 = await fetch(
          `/rule_sets/phd_standard/light_cones.json?version=${version()}`
        );
      } catch (e) {
        console.log(e);
      }
    }
    setLcJson(await response2.json());
    setReady(true);
  };
  fetchData();
  return (
    <>
      {ready() && (
        <>
          <div class={styles.overall_container}>
            <SoloSettings />
            <div class={styles.draft_container}>
              <div class={styles.team}>
                <TeamWithLCBan
                  bansSignal={blueBans}
                  picksSignal={bluePicks}
                  team={"blue_team"}
                  handleSigEid={handleSigEid}
                />
              </div>
              <Show when={!lcBanPhase()} fallback ={
                <div>LC Ban Phase</div>
              }>
                <div class={styles.roster}>
                  <Roster
                    handleBan={handleBan}
                    handlePick={handlePick}
                    handleUndo={handleUndo}
                    handleReset={handleReset}
                  />
                </div>
              </Show>
              <div class={styles.team}>
                <TeamWithLCBan
                  bansSignal={redBans}
                  picksSignal={redPicks}
                  team={"red_team"}
                  handleSigEid={handleSigEid}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DraftToolWithLCBan;
