import { Component, onMount, createSignal } from "solid-js";
import Team from "./Team/Team";
import Roster from "./Roster/Roster";
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
} from "~/game/game_logic";
const DraftTool: Component<{}> = (props) => {
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
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ flex: "25%", "max-width": "30%" }}>
              <Team bansSignal={blueBans} picksSignal={bluePicks} color={"blue"} />
            </div>
            <div
              style={{
                display: "flex",
                flex: "50%",
                "max-width": "40%",
                "flex-direction": "column",
              }}
            >
              <Roster />
              <div style={{ "align-self": "center" }}>
                Current Player Turn: {playerTurn()}
              </div>
            </div>
            <div style={{ flex: "25%", "max-width": "30%" }}>
              <Team bansSignal={redBans} picksSignal={redPicks} color={"red"} />
            </div>
          </div>
          <div></div>
        </>
      )}
    </>
  );
};

export default DraftTool;
