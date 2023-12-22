import { Component, createEffect, onMount } from "solid-js";
import { w3cwebsocket as WebSocket } from "websocket";
import { useParams } from "solid-start";

const DraftTool: Component<{}> = (props) => {
  const params = useParams();
  const game_id = params.game_id;
  const backendUrl = `ws://localhost:8000/ws/game/${game_id}`;
  const client = new WebSocket(backendUrl);
  const sendTest = () => {
    console.log('Sending test');
    const testObj = {
      game_state: "test",
      type: "testing",
    };
    client.send(JSON.stringify(testObj));
  };
  onMount(async () => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message: any) => {
      console.log(message);
    };
  });
  return (
    <div>
      <div>Connection:</div>
      <button onClick={() => sendTest()}>Send Test</button>
    </div>
  );
};

export default DraftTool;
