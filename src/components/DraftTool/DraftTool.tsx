import { Component } from "solid-js";
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
  lcJson,
} from "~/game/game_logic";
const DraftTool: Component<{}> = (props) => {
  return (
    <div>
      <div>Current Player Turn: {playerTurn()}</div>
      <div>Char JSON: {JSON.stringify(charJson())}</div>
      <div>LC JSON: {JSON.stringify(lcJson())}</div>
      <div></div>
    </div>
  );
};

export default DraftTool;
