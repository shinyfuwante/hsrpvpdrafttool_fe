import { Component, createEffect, createSignal } from "solid-js";
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
  createEffect(async () => {
    let response1 = await fetch(`/rule_sets/${ruleSet()}/characters.json`);
    // if response fails, fetch phd_standard characters.json
    if (!response1.ok) {
      response1 = await fetch(`/rule_sets/phd_standard/characters.json`);
    }
    setCharJson(await response1.json());

    let response2 = await fetch(`/rule_sets/${ruleSet()}/light_cones.json`);
    if (!response2.ok) {
      response1 = await fetch(`/rule_sets/phd_standard/characters.json`);
    }
    setLcJson(await response2.json());
  });
  return (
    <div>
      <div>Current Player Turn: {playerTurn()}</div>
      <Team></Team>
      <Roster></Roster>
      <Team></Team>
      <button>Undo</button>
      <button>Reset</button>
    </div>
  );
};

export default DraftTool;
