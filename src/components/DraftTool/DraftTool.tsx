import { Component, createSignal, onMount } from "solid-js";
import { w3cwebsocket as WebSocket } from "websocket";
import { useParams } from "solid-start";
import { draftState, handleMsg, draft_states, sideSelector } from "~/game/game_logic";

const DraftTool: Component<{}> = (props) => {
  const params = useParams();
  const game_id = params.game_id;
  const backendUrl = `ws://localhost:8000/ws/game/${game_id}`;
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
      {draftState() === draft_states.LOADING && <LoadingMenu></LoadingMenu>}
      {draftState() === draft_states.SIDE_SELECTION && <SideSelection></SideSelection>}
    </div>
  );
};

export default DraftTool;
