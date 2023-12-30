import { Component, createEffect, createSignal } from "solid-js";
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
    const response1 = await fetch(`/rule_sets/${ruleSet()}/characters.json`);
    setCharJson(await response1.json());

    const response2 = await fetch(`/rule_sets/${ruleSet()}/light_cones.json`);
    setLcJson(await response2.json());
  });
  return (
    <div>
      <div>Current Player Turn: {playerTurn()}</div>
      <div></div>
      <div>Char JSON: {JSON.stringify(charJson())}</div>
      <div>LC JSON: {JSON.stringify(lcJson())}</div>
      <div></div>
    </div>
  );
};

export default DraftTool;
