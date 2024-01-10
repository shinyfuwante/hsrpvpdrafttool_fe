import { Component, onMount } from "solid-js";
import DraftTool from "~/components/DraftTool/DraftTool";
import {
  setTurnIndex,
  turnIndex,
  turn_order,
  CharacterPick,
  CharacterBan,
  setPlayerTurn,
  playerTurn,
  setRedPicks,
  setBluePicks,
  redPicks,
  bluePicks,
  setBlueBans,
  blueBans,
  setRedBans,
  redBans,
  setCharJson,
  setLcJson,
  ruleSet,
  setIsSinglePlayer,
} from "~/game/game_logic";

// interface DraftToolProps {
//     handleUndo: () => void;
//     handleReset: () => void;
//   }

const incrementTurn = () => {
  if (turnIndex() < turn_order.length - 1) {
    setTurnIndex(turnIndex() + 1);
    setPlayerTurn(turn_order[turnIndex()].team);
  }
};
const handleSigEid = (character: CharacterPick) => {
  return;
};
const handlePick = (character: CharacterPick) => {
  if (playerTurn() == "blue_team") {
    setBluePicks([...bluePicks(), character]);
  } else {
    setRedPicks([...redPicks(), character]);
  }
  incrementTurn();
};
const handleBan = (character: CharacterBan) => {
  incrementTurn();
};
const handleReset = () => {
  setBlueBans([]);
  setRedBans([]);
  setBluePicks([]);
  setRedPicks([]);
  setTurnIndex(0);
  setPlayerTurn(turn_order[0].team);
};
const handleUndo = () => {
  setTurnIndex(turnIndex() - 1);
  setPlayerTurn(turn_order[turnIndex()].team);
  const currentTurn = turn_order[turnIndex()];
  if (currentTurn.team == "blue_team") {
    if (currentTurn.action == "ban") {
      setBlueBans(blueBans().slice(0, -1));
    } else {
      setBluePicks(bluePicks().slice(0, -1));
    }
  } else {
    if (currentTurn.action == "ban") {
      setRedBans(redBans().slice(0, -1));
    } else {
      setRedPicks(redPicks().slice(0, -1));
    }
  }
  return;
};
const game: Component<{}> = (props) => {
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
    setIsSinglePlayer(true);
  });
  return (
    <DraftTool
      handlePick={handlePick}
      handleBan={handleBan}
      handleSigEid={handleSigEid}
      handleReset={handleReset}
      handleUndo={handleUndo}
    />
  );
};

export default game;
