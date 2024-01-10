import { Component } from "solid-js";
import DraftTool from "~/components/DraftTool/DraftTool";
import { setTurnIndex, turnIndex, turn_order, CharacterPick, CharacterBan, setPlayerTurn } from "~/game/game_logic";

// interface DraftToolProps {
//     handlePick: (character: CharacterPick) => void;
//     handleBan: (character: CharacterBan) => void;
//     handleSigEid: (character: CharacterPick) => void;
//     handleUndo: () => void;
//     handleReset: () => void;
//   }

const incrementTurn = () => {
  if (turnIndex() < turn_order.length) {
    setTurnIndex(turnIndex() + 1);
    setPlayerTurn(turn_order[turnIndex()].team);
  }
};

const handlePick = (character: CharacterPick) => {
    incrementTurn();
};
const handleBan = (character: CharacterBan) => {
    incrementTurn();
}
const game: Component<{}> = (props) => {
  return <DraftTool handlePick={handlePick} handleBan={handleBan} isSinglePlayer={true}/>;
};

export default game;
