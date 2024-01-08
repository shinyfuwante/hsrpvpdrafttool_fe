import { useParams } from "solid-start";
import { onMount } from "solid-js";
import {
  ruleSet,
  sideSelector,
  handleMsg,
  CharacterPick,
  CharacterBan,
  ownTeam,
  MessageEnum,
  turnIndex,
} from "~/game/game_logic";
import { w3cwebsocket as WebSocket } from "websocket";
import MainApp from "~/components/MainApp/MainApp";
export default function GamePage() {
  const params = useParams();
  const game_id = params.game_id;
  const ruleSetString = ruleSet();
  const backendUrl = `ws://localhost:8000/ws/game/${game_id}?ruleSet=${ruleSetString}`;
  const client = new WebSocket(backendUrl);
  const LoadingMenu = () => {
    return (
      <div>
        Send this link to your friend to join the game:
        <a href={window.location.href}>{window.location.href}</a>
      </div>
    );
  };
  const handlePick = (character: CharacterPick) => {
    const message = {
      type: MessageEnum.PICK,
      character: character,
      team: ownTeam(),
    };

    client.send(JSON.stringify(message));
  };
  const handleBan = (character: CharacterBan) => {
    const message = {
      type: MessageEnum.BAN,
      character: character,
      team: ownTeam(),
    };
    client.send(JSON.stringify(message));
  };
  const handleSigEidChange = (character: CharacterPick) => {
    const message = {
      type: MessageEnum.SigEidChange,
      character: character,
      team: ownTeam(),
    };
    client.send(JSON.stringify(message));
  };
  const handleReset = () => {
    if (turnIndex() <= 0) {
        return;
    }
    const message = {
      type: MessageEnum.RESET_GAME,
    };
    client.send(JSON.stringify(message));
  }
  const handleUndo = () => {
    if (turnIndex() <= 0) {
        return;
    }
    const message = {
      type: MessageEnum.UNDO,
    };
    client.send(JSON.stringify(message));
  }
  const SideSelection = () => {
    const sendSideMessage = (side: string) => {
      const message = {
        type: "side_select",
        side: side,
      };
      client.send(JSON.stringify(message));
    };
    return (
      <div>
        {sideSelector() && (
          <div>
            <button onClick={() => sendSideMessage("blue")}>Blue Team</button>
            <button onClick={() => sendSideMessage("red")}>Red Team</button>
          </div>
        )}
        {!sideSelector() && (
          <div>Waiting for other player to select side...</div>
        )}
      </div>
    );
  };
  onMount(async () => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message: any) => {
      handleMsg(message.data);
    };
  });
  return (
    <div>
      <MainApp
        LoadingMenu={LoadingMenu}
        SideSelection={SideSelection}
        handleBan={handleBan}
        handlePick={handlePick}
        handleSigEid={handleSigEidChange}
        handleUndo={handleUndo}
        handleReset={handleReset}
      />
    </div>
  );
}
