import { gamePhase, CharacterPick, game_phases, CharacterBan } from "~/game/game_logic";
import DraftTool from "../DraftTool/DraftTool";
import { Component } from "solid-js";

interface MainAppProps {
  LoadingMenu: Component<{}>;
  SideSelection: Component<{}>;
  HandlePick: (character: CharacterPick) => void; 
  HandleBan: (character: CharacterBan) => void; 
}

const MainApp: Component<MainAppProps> = (props) => {
  const LoadingMenu = props.LoadingMenu;
  const SideSelection = props.SideSelection;
  return (
    <div>
      {gamePhase() === game_phases.LOADING && <LoadingMenu></LoadingMenu>}
      {gamePhase() === game_phases.SIDE_SELECTION && <SideSelection></SideSelection>}
      {gamePhase() == game_phases.DRAFTING && <DraftTool></DraftTool>}
    </div>
  );
};

export default MainApp;
