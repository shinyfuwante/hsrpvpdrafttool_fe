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
  const team = character.team;
  const picksSignal = team == "blue_team" ? bluePicks : redPicks;
  const setPicksSignal = team == "blue_team" ? setBluePicks : setRedPicks;
  const picksArray = [...picksSignal()];
  if (picksArray[character.index] != character) {
    picksArray[character.index] = character;
    setPicksSignal(picksArray);
  } 
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
