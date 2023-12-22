import { Component, createEffect, onMount } from "solid-js";
import {w3cwebsocket as WebSocket} from "websocket";
import { useParams } from "solid-start";

const DraftTool: Component<{}> = (props) => {
    const params = useParams();
    const game_id = params.game_id;
  const backendUrl = `ws://localhost:8000/ws/game/${game_id}`;
  const client = new WebSocket(backendUrl);

  onMount(async () => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message: any) => {
      console.log(message);
    };
  });
  return <div>Connection: </div>;
};

export default DraftTool;