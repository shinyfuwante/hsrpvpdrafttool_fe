import {
  Component,
  onMount,
  createSignal,
  Show,
  Match,
  Switch,
} from "solid-js";
import Team from "./Team/Team";
import TeamWith3Bans from "./TeamWith3Bans/TeamWith3Bans";
import TeamForBB from "./TeamForBB/TeamForBB";
import Roster from "./Roster/Roster";
import SoloSettings from "../SoloSettings/SoloSettings";
import {
  blueBans,
  redBans,
  bluePicks,
  redPicks,
  ruleSet,
  setCharJson,
  setLcJson,
  CharacterBan,
  CharacterPick,
  isSinglePlayer,
  ownTeam,
  version,
  blueTimePenalty,
  redTimePenalty,
  turn_order_3_bans,
  turnOrder,
  turn_order_bb,
  turn_order_3_bans_pokke,
} from "~/game/game_logic";
import Timer from "./Timer/Timer";

import styles from "./DraftTool.module.css";
import TimerPenalty from "./Timer/TimerPenalty/TimerPenalty";
import TeamTimer from "./Timer/TeamTimer";
import TeamWith3BansPokke from "./TeamWith3BansPokke/TeamWith3BansPokke";

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
      console.log("failed to fetch characters.json");
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
            {/* <Show when={!isSinglePlayer()}>
              <div class={styles.team_notifier}>
                You are{" "}
                {ownTeam() == "blue_team"
                  ? "on the Blue Team"
                  : ownTeam() == "red_team"
                  ? "on the Red Team"
                  : "spectating"}
              </div>
            </Show> */}
            <div class={styles.timer_container}>
              <div></div>
              <div class={styles.timer_penalties}>
                <TeamTimer team={"blue_team"}></TeamTimer>
                <TimerPenalty penalty_signal={blueTimePenalty}></TimerPenalty>
                <Timer></Timer>
                <TimerPenalty penalty_signal={redTimePenalty}></TimerPenalty>
                <TeamTimer team={"red_team"}></TeamTimer>
              </div>
              <div></div>
            </div>
            <div class={styles.draft_container}>
              <div class={styles.team}>
                <Switch
                  fallback={
                    <Team
                      bansSignal={blueBans}
                      picksSignal={bluePicks}
                      team={"blue_team"}
                      handleSigEid={handleSigEid}
                    />
                  }
                >
                  <Match when={turnOrder() == turn_order_3_bans}>
                    <TeamWith3Bans
                      bansSignal={blueBans}
                      picksSignal={bluePicks}
                      team={"blue_team"}
                      handleSigEid={handleSigEid}
                    />
                  </Match>
                  <Match when={turnOrder() == turn_order_bb}>
                    <TeamForBB
                      bansSignal={blueBans}
                      picksSignal={bluePicks}
                      team={"blue_team"}
                      handleSigEid={handleSigEid}
                    />
                  </Match>
                  <Match when={turnOrder() == turn_order_3_bans_pokke}>
                    <TeamWith3BansPokke
                      bansSignal={blueBans}
                      picksSignal={bluePicks}
                      team={"blue_team"}
                      handleSigEid={handleSigEid}
                    />
                  </Match>
                </Switch>
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
                <Switch
                  fallback={
                    <Team
                      bansSignal={redBans}
                      picksSignal={redPicks}
                      team={"red_team"}
                      handleSigEid={handleSigEid}
                    />
                  }
                >
                  <Match when={turnOrder() == turn_order_3_bans}>
                    <TeamWith3Bans
                      bansSignal={redBans}
                      picksSignal={redPicks}
                      team={"red_team"}
                      handleSigEid={handleSigEid}
                    />
                  </Match>
                  <Match when={turnOrder() == turn_order_bb}>
                    <TeamForBB
                      bansSignal={redBans}
                      picksSignal={redPicks}
                      team={"red_team"}
                      handleSigEid={handleSigEid}
                    />
                  </Match>
                  <Match when={turnOrder() == turn_order_3_bans_pokke}>
                    <TeamWith3BansPokke
                      bansSignal={redBans}
                      picksSignal={redPicks}
                      team={"red_team"}
                      handleSigEid={handleSigEid}
                    />
                  </Match>
                </Switch>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DraftTool;
