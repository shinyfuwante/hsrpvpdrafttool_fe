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
} from "~/game/game_logic";
const DraftTool: Component<{}> = (props) => {
  return (
    <div>
      <div>Current Player Turn: {playerTurn()}</div>
      <div></div>
    </div>
  );
};

export default DraftTool;