import {
  gamePhase,
  CharacterPick,
  game_phases,
  CharacterBan,
} from "~/game/game_logic";
import DraftTool from "../DraftTool/DraftTool";
import { Component, splitProps } from "solid-js";

interface MainAppProps {
  LoadingMenu: Component<{}>;
  ReconnectScreen: Component<{}>;
  SideSelection: Component<{}>;
  handlePick: (character: CharacterPick) => void;
  handleBan: (character: CharacterBan) => void;
  handleSigEid: (character: CharacterPick) => void;
  handleUndo: () => void;
  handleReset: () => void;
}

const MainApp: Component<MainAppProps> = (props) => {
  const [components, ...others] = splitProps(props, [
    "LoadingMenu",
    "SideSelection",
    "ReconnectScreen"
  ]);
  return (
    <div>
      {gamePhase() === game_phases.RECONNECT && <components.ReconnectScreen />}
      {gamePhase() === game_phases.LOADING && <components.LoadingMenu />}
      {gamePhase() === game_phases.SIDE_SELECTION && (
        <components.SideSelection />
      )}
      {gamePhase() === game_phases.DRAFTING && <DraftTool {...others[0]}/>}
    </div>
  );
};

export default MainApp;
