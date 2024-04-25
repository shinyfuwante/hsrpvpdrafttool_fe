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
  ownTeam,
  version,
  blueTimePenalty,
  redTimePenalty
} from "~/game/game_logic";
import Timer from "./Timer/Timer";

import styles from "./DraftTool.module.css";
import TimerPenalty from "./Timer/TimerPenalty/TimerPenalty";

interface DraftToolProps {
  handlePick: (character: CharacterPick) => void;
  handleBan: (character: CharacterBan) => void;
  handleSigEid: (character: CharacterPick) => void;
  handleUndo: () => void;
  handleReset: () => void;
}
const DraftTool: Component<DraftToolProps> = ({
  handlePick,
  handleBan,
  handleSigEid,
  handleUndo,
  handleReset,
}) => {
  const [ready, setReady] = createSignal(false);
  const fetchData = async () => {
    console.log(ruleSet());
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
            <Show when={isSinglePlayer()}>
              <SoloSettings />
            </Show>
            <Show when={!isSinglePlayer()}>
              <div class={styles.team_notifier}>
                You are on the {ownTeam() == "blue_team" ? "Blue" : "Red"} Team
              </div>
            </Show>
            <Show when={ruleSet() == "pokke"}>
              <div class={styles.timer_container}>
                <div></div>
                <div class={styles.timer_penalties}>
                  <TimerPenalty penalty_signal={blueTimePenalty}></TimerPenalty>
                  <Timer></Timer>
                  <TimerPenalty penalty_signal={redTimePenalty}></TimerPenalty>
                </div>
                <div></div>
              </div>
            </Show>
            <div class={styles.draft_container}>
              <div class={styles.team}>
                <Team
                  bansSignal={blueBans}
                  picksSignal={bluePicks}
                  team={"blue_team"}
                  handleSigEid={handleSigEid}
                />
              </div>
              <div class={styles.roster}>
                <Roster
                  handleBan={handleBan}
                  handlePick={handlePick}
                  handleUndo={handleUndo}
                  handleReset={handleReset}
                />
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
          </div>
        </>
      )}
    </>
  );
};

export default DraftTool;
