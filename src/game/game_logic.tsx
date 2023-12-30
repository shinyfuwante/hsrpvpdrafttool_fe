import { createSignal } from "solid-js";
// Define the states
const game_phases = {
    LOADING: 'loading',
    SIDE_SELECTION: 'sideSelection',
    DRAFTING: 'drafting',
  };
  
  // Create a signal for the current state
const [gamePhase, setGamePhase] = createSignal(game_phases.LOADING);
const [cid, setCID] = createSignal("");
const [sideSelector, setSideSelector] = createSignal(false);
const [playerTurn, setPlayerTurn] = createSignal("blue_team");
const [ownTeam, setOwnTeam] = createSignal("blue_team");
const [blueBans, setBlueBans] = createSignal([]);
const [redBans, setRedBans] = createSignal([]);
const [bluePicks, setBluePicks] = createSignal([]);
const [redPicks, setRedPicks] = createSignal([]);
const [blueTeam, setBlueTeam] = createSignal("");
const [redTeam, setRedTeam] = createSignal("");
const [selectedChars, setSelectedChars] = createSignal([]);
const [ruleSet, setRuleSet] = createSignal("phd_standard");
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
      setGamePhase(game_phases.SIDE_SELECTION);
      setRuleSet(msg.message.rule_set);
      setSideSelector(cid() == msg.message.selector);
      break;
    case messageEnum.GAME_START:
        console.log("Game Start");
        setGamePhase(game_phases.DRAFTING);
        setPlayerTurn(msg.message.player_turn);
        setBlueTeam(msg.message.blue_team);
        setRedTeam(msg.message.red_team);
        if (msg.message.blue_team == cid()) {
            setOwnTeam("blue_team");
        } else {
            setOwnTeam("red_team");
        }
        console.log("You are on the " + ownTeam() + " team");
        break;
  }
};

export {
    game_phases,
    gamePhase,
    cid,
    playerTurn,
    blueBans,
    redBans,
    bluePicks,
    redPicks,
    blueTeam,
    redTeam,
    selectedChars,
    ruleSet,
    sideSelector
}