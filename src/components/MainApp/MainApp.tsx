import { gamePhase, CharacterPick, game_phases, CharacterBan } from "~/game/game_logic";
import DraftTool from "../DraftTool/DraftTool";
import { Component } from "solid-js";

interface MainAppProps {
  LoadingMenu: Component<{}>;
  SideSelection: Component<{}>;
  HandlePick: (character: CharacterPick) => void; 
  HandleBan: (character: CharacterBan) => void; 
  HandleSigEid: (character: CharacterPick) => void;
}

const MainApp: Component<MainAppProps> = ({LoadingMenu, SideSelection, HandlePick, HandleBan, HandleSigEid}) => {
  return (
    <div>
      {gamePhase() === game_phases.LOADING && <LoadingMenu></LoadingMenu>}
      {gamePhase() === game_phases.SIDE_SELECTION && <SideSelection></SideSelection>}
      {gamePhase() == game_phases.DRAFTING && <DraftTool handlePick={HandlePick} handleBan={HandleBan} HandleSigEid={HandleSigEid}></DraftTool>}
    </div>
  );
};

export default MainApp;
