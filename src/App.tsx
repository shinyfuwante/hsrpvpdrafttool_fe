import { createWS, createWSState } from "@solid-primitives/websocket";
import "./App.css";
import { createEffect, on } from "solid-js";

function App() {
  const ws = createWS("ws://127.0.0.1:8000/ws/game/");
  const state = createWSState(ws);
  const states = ["Connecting", "Connected", "Disconnecting", "Disconnected"];
  const json = JSON.stringify({ "message": "it works" }); // Convert the JSON object to a string
  ws.send(json);
  // createEffect(on(ws.message, (msg) => console.log(msg), { defer: true }));
  return <p>Connection: {states[state()]}</p>;
}

export default App;
