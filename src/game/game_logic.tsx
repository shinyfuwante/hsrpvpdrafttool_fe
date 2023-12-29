import { createSignal } from "solid-js";
// Define the states
const draft_states = {
    LOADING: 'loading',
    SIDE_SELECTION: 'sideSelection',
    DRAFTING: 'drafting',
  };
  
  // Create a signal for the current state
const [draftState, setDraftState] = createSignal(draft_states.LOADING);
const [cid, setCID] = createSignal("");
const [sideSelector, setSideSelector] = createSignal(false);
const [playerTurn, setPlayerTurn] = createSignal("blue_team");
const [blueBans, setBlueBans] = createSignal([]);
const [redBans, setRedBans] = createSignal([]);
const [bluePicks, setBluePicks] = createSignal([]);
const [redPicks, setRedPicks] = createSignal([]);
const [blueTeam, setBlueTeam] = createSignal([]);
const [redTeam, setRedTeam] = createSignal([]);
const [selectedChars, setSelectedChars] = createSignal([]);
const [gameSettings, setGameSettings] = createSignal("phd_standard");
export const handleMsg = (data: string) => {
  const messageEnum = {
    INIT_GAME: "init_game",
    GAME_READY: "game_ready",
    GAME_START: "game_start",
    GAME_STATE: "game_state",
    SIDE_SELECT: "side_select",
    SIDE_SELECT_WAITER: "side_select_waiter",
    FRONT_END_MESSAGE: "front_end_message",
    BAN: "draft_ban",
    PICK: "draft_pick",
    RESET_GAME: "reset_game",
    UNDO: "undo",
  };
  const msg = JSON.parse(data);
  console.log(msg);
  switch (msg.message.message_type) {
    case messageEnum.GAME_READY:
      console.log("Game Ready");
      setCID(msg.message.cid);
      setDraftState(draft_states.SIDE_SELECTION);
      setSideSelector(cid() == msg.message.selector);
      break;
  }
};

export {
    draft_states,
    draftState,
    cid,
    playerTurn,
    blueBans,
    redBans,
    bluePicks,
    redPicks,
    blueTeam,
    redTeam,
    selectedChars,
    gameSettings,
    sideSelector
}