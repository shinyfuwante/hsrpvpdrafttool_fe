import { Component, createSignal, onMount } from "solid-js";
import { w3cwebsocket as WebSocket } from "websocket";
import { useParams } from "solid-start";
import { gamePhase, handleMsg, game_phases, sideSelector, ruleSet } from "~/game/game_logic";
import DraftTool from "../DraftTool/DraftTool";

const MainApp: Component<{}> = (props) => {
  const params = useParams();
  const game_id = params.game_id;
  const ruleSetString = ruleSet();
  const backendUrl = `ws://localhost:8000/ws/game/${game_id}?ruleSet=${ruleSetString}`;
  console.log(ruleSetString);
  // const client = new WebSocket(backendUrl, [ruleSetString]);
  const client = new WebSocket(backendUrl);
  const LoadingMenu = () => {
    return (
      <div>
        Send this link to your friend to join the game:
        <a href={window.location.href}>{window.location.href}</a>
      </div>
    );
  }
  const SideSelection = () => {
    // returns a modal with a button to select side, which will send a message to the backend to select side
    const sendSideMessage = (side: string) => {
      const message = {
      'type': 'side_select',
      'side': side,
      }
      client.send(JSON.stringify(message));
    }
    return (
      // if side selector, show buttons, else show a message that we're waiting for the other player
      <div>
        {sideSelector() && (
          <div>
            <button onClick={() => sendSideMessage("blue")}>Blue Team</button>
            <button onClick={() => sendSideMessage("red")}>Red Team</button>
          </div>
        )}
        {!sideSelector() && (
          <div>
            Waiting for other player to select side...
          </div>
        )}
      </div>
    )
  }
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
      {gamePhase() === game_phases.LOADING && <LoadingMenu></LoadingMenu>}
      {gamePhase() === game_phases.SIDE_SELECTION && <SideSelection></SideSelection>}
      {gamePhase() == game_phases.DRAFTING && <DraftTool></DraftTool>}
    </div>
  );
};

export default MainApp;
