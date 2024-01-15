import { createSignal } from "solid-js";
import { CharJsonType, LCJsonType } from "~/types";
import { v4 } from "uuid";
const game_phases = {
  LOADING: "loading",
  SIDE_SELECTION: "sideSelection",
  DRAFTING: "drafting",
  LOCK_IN: "lock-in",
  SCORING: "scoring",
  ERROR: "error",
  RECONNECT: "reconnect",
};

type CharacterPick = {
  name: string;
  light_cone: string;
  eidolon: number;
  superimposition: number;
  index: number;
  team: string;
};
type CharacterBan = {
  name: string;
};
const [gamePhase, setGamePhase] = createSignal(game_phases.LOADING);
const getCID = () => {
  let cid;
  cid = localStorage.getItem("cid");

  if (cid == null) {
    let gen_cid = v4();
    localStorage.setItem("cid", gen_cid);
    return gen_cid;
  }
  return cid;
};
const [sideSelector, setSideSelector] = createSignal(false);
const [playerTurn, setPlayerTurn] = createSignal("blue_team");
const [ownTeam, setOwnTeam] = createSignal("blue_team");
const [sessionId, setSessionId] = createSignal("");
const [blueBans, setBlueBans] = createSignal<CharacterBan[]>([]);
const [redBans, setRedBans] = createSignal<CharacterBan[]>([]);
const [bluePicks, setBluePicks] = createSignal<CharacterPick[]>([]);
const [redPicks, setRedPicks] = createSignal<CharacterPick[]>([]);
const [blueTeam, setBlueTeam] = createSignal("");
const [redTeam, setRedTeam] = createSignal("");
const [blueTeamName, setBlueTeamName] = createSignal("Blue Team");
const [redTeamName, setRedTeamName] = createSignal("Red Team");
const [selectedChars, setSelectedChars] = createSignal<string[]>([]);
const [ruleSet, setRuleSet] = createSignal("phd_standard");
const [charJson, setCharJson] = createSignal<CharJsonType>({});
const [lcJson, setLcJson] = createSignal<LCJsonType>({});
const [redCost, setRedCost] = createSignal(0);
const [blueCost, setBlueCost] = createSignal(0);
const [isSinglePlayer, setIsSinglePlayer] = createSignal(false);
const [error, setError] = createSignal("");
export const [turnIndex, setTurnIndex] = createSignal(0);
export const turn_order = [
  { team: "blue_team", action: "ban" },
  { team: "red_team", action: "ban" },
  { team: "blue_team", action: "pick" },
  { team: "red_team", action: "pick" },
  { team: "red_team", action: "pick" },
  { team: "blue_team", action: "pick" },
  { team: "red_team", action: "ban" },
  { team: "blue_team", action: "ban" },
  { team: "red_team", action: "pick" },
  { team: "blue_team", action: "pick" },
  { team: "blue_team", action: "pick" },
  { team: "red_team", action: "pick" },
  { team: "red_team", action: "pick" },
  { team: "blue_team", action: "pick" },
  { team: "blue_team", action: "pick" },
  { team: "red_team", action: "pick" },
  { team: "red_team", action: "pick" },
  { team: "blue_team", action: "pick" },
  { team: "blue_team", action: "pick" },
  { team: "red_team", action: "pick" },
];
const MessageEnum = {
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
  SIG_EID_CHANGE: "sig_eid_change",
  ERROR: "error",
  RECONNECT: "reconnect",
};
export const handleMsg = (data: string) => {
  const msg = JSON.parse(data);
  console.log(msg.message);
  setError("");
  switch (msg.message.message_type) {
    case MessageEnum.GAME_READY:
      setSessionId(msg.message.cid);
      setGamePhase(game_phases.SIDE_SELECTION);
      setRuleSet(msg.message.rule_set);
      //   setCharJson(msg.message.characters);
      //   setLcJson(msg.message.light_cones);
      setSideSelector(sessionId() == msg.message.selector);
      break;
    case MessageEnum.GAME_START:
      setGamePhase(game_phases.DRAFTING);
      setPlayerTurn(msg.message.turn_player);
      setBlueTeam(msg.message.blue_team);
      setRedTeam(msg.message.red_team);
      if (msg.message.blue_team == sessionId()) {
        setOwnTeam("blue_team");
      } else {
        setOwnTeam("red_team");
      }
      break;
    case MessageEnum.GAME_STATE:
      setGamePhase(game_phases.DRAFTING);
      setBlueBans(msg.message.game_state.bans.blue_team);
      setRedBans(msg.message.game_state.bans.red_team);
      setBluePicks(msg.message.game_state.picks.blue_team);
      setRedPicks(msg.message.game_state.picks.red_team);
      setTurnIndex(msg.message.turn_index);
      if (msg.message.turn_index < turn_order.length) {
        setPlayerTurn(turn_order[turnIndex()].team);
      }
      if (msg.message.team && msg.message.team != "") {
        setOwnTeam(msg.message.team);
      }
      break;
    case MessageEnum.ERROR:
      //   setGamePhase(game_phases.ERROR);
      setError(msg.message.error);
      break;
    case MessageEnum.RECONNECT:
        setGamePhase(game_phases.RECONNECT);
        break;
  }
};

export {
  game_phases,
  gamePhase,
  setPlayerTurn,
  playerTurn,
  blueBans,
  setBlueBans,
  redBans,
  setRedBans,
  bluePicks,
  setBluePicks,
  redPicks,
  setRedPicks,
  blueTeam,
  redTeam,
  selectedChars,
  setSelectedChars,
  ruleSet,
  sideSelector,
  charJson,
  lcJson,
  setCharJson,
  setLcJson,
  CharacterBan,
  CharacterPick,
  ownTeam,
  MessageEnum,
  redCost,
  setRedCost,
  blueCost,
  setBlueCost,
  isSinglePlayer,
  setIsSinglePlayer,
  blueTeamName,
  setBlueTeamName,
  redTeamName,
  setRedTeamName,
  getCID,
  error,
};
