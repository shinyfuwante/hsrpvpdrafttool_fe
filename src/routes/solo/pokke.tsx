import { Component, onMount } from "solid-js";
import DraftTool from "~/components/DraftTool/DraftTool";
import {
  setTurnIndex,
  turnIndex,
  turnOrder,
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
  setRuleSet,
  setIsSinglePlayer,
  setTotalCost,
  setBlueCost,
  blueCost,
  setRedCost,
  redCost,
  calcCost,
  setBlueCostsMap,
  setRedCostsMap,
  draftOrder,
  setDraftOrder,
  redCostsMap,
  blueCostsMap,
  setBlueTimePenalty,
  setRedTimePenalty,
  setBlueTeamReserveTime,
  setRedTeamReserveTime,
} from "~/game/game_logic";

// interface DraftToolProps {
//     handleUndo: () => void;
//     handleReset: () => void;
//   }

const incrementTurn = () => {
  if (turnIndex() > turnOrder().length - 1) {
    return;
  }
  setTurnIndex(turnIndex() + 1);
  if (turnIndex() < turnOrder().length) {
    setPlayerTurn(turnOrder()[turnIndex()].team);
  }
};

const decrementTurn = () => {
  if (turnIndex() <= 0) {
    return;
  }
  setTurnIndex(turnIndex() - 1);
  setPlayerTurn(turnOrder()[turnIndex()].team);
};
const handleSigEid = (character: CharacterPick) => {
  const team = character.team;
  const picksSignal = team == "blue_team" ? bluePicks : redPicks;
  const setPicksSignal = team == "blue_team" ? setBluePicks : setRedPicks;
  const picksArray = [...picksSignal()];
  const draftArray = [...draftOrder()];
  let draftIndex = draftArray.findIndex((char) => char.name == character.name);
  if (picksArray[character.index] != character) {
    picksArray[character.index] = character;
    draftArray[draftIndex] = character;
    setPicksSignal(picksArray);
    setDraftOrder(draftArray);
    
  }
  return;
};
const handlePick = (character: CharacterPick) => {
  if (playerTurn() == "blue_team") {
    setBluePicks([...bluePicks(), character]);
  } else {
    setRedPicks([...redPicks(), character]);
  }
  setDraftOrder([...draftOrder(), character]);
  incrementTurn();
};
const handleBan = (character: CharacterBan) => {
  incrementTurn();
  setDraftOrder([...draftOrder(), character]);
};
const handleReset = () => {
  setBlueBans([]);
  setRedBans([]);
  setBluePicks([]);
  setRedPicks([]);
  setTurnIndex(0);
  setBlueCost(0);
  setRedCost(0);
  setPlayerTurn(turnOrder()[0].team);
  setBlueCostsMap(new Map());
  setRedCostsMap(new Map());
  setBlueTimePenalty(0);
  setRedTimePenalty(0);
  setDraftOrder([]);
  setBlueTeamReserveTime(570);
  setRedTeamReserveTime(570);
};
const handleUndo = () => {
  if (turnIndex() <= 0) {
    return;
  }
  decrementTurn();
  const currentTurn = turnOrder()[turnIndex()];
  if (currentTurn.team == "blue_team") {
    if (currentTurn.action == "ban") {
      setBlueBans(blueBans().slice(0, -1));
    } else {
      const char = bluePicks()[bluePicks().length - 1];
      blueCostsMap().set(bluePicks().length - 1, 0);
      setBluePicks(bluePicks().slice(0, -1));
      setBlueCost(Math.max(blueCost() - calcCost(char), 0));
    }
  } else {
    if (currentTurn.action == "ban") {
      setRedBans(redBans().slice(0, -1));
    } else {
      const char = redPicks()[redPicks().length - 1];
      redCostsMap().set(redPicks().length - 1, 0);
      setRedPicks(redPicks().slice(0, -1));
      setRedCost(Math.max(redCost() - calcCost(char), 0));
    }
  }
  const draftArray = [...draftOrder()];
  draftArray.pop();
  setDraftOrder(draftArray);
  return;
};
const game: Component<{}> = (props) => {
  onMount(async () => {
    setIsSinglePlayer(true);
    setRuleSet("pokke");
    setTotalCost(10);
  });
  setIsSinglePlayer(true);
  setRuleSet("pokke");
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
