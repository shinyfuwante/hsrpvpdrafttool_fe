import { createSignal } from "solid-js";
const [loading, setLoading] = createSignal(true);
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
  switch (msg.message.message_type) {
    case messageEnum.GAME_READY:
      console.log("Game Ready");
      setLoading(false);
      break;
  }
};

export {
    loading,
    playerTurn,
    blueBans,
    redBans,
    bluePicks,
    redPicks,
    blueTeam,
    redTeam,
    selectedChars,
    gameSettings,
}