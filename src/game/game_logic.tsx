import { createSignal } from "solid-js";
import { CharJsonType, LCJsonType } from "~/types";
import { v4 } from "uuid";

export const version = () => {
  // version of tool.version of game.subversion of game.subversion of rules
  return "1.2.0.0.2";
}
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
const calcCost = (character: CharacterPick) => {
  const char = charJson()[character.name];
  const lcs = lcJson();
  const lc = lcs[character.light_cone];
  let cost = 0;
  if (lc && character.superimposition > 0) {
    cost +=
      char.point_costs[character.eidolon] +
      lc.point_costs[character.superimposition - 1];
  } else {
    cost += char.point_costs[character.eidolon];
  }
  return cost;
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
  { team: "blue_team", action: "ban", id: 0 },
  { team: "red_team", action: "ban", id: 0 },
  { team: "blue_team", action: "pick", id: 0 },
  { team: "red_team", action: "pick", id: 0 },
  { team: "red_team", action: "pick", id: 1 },
  { team: "blue_team", action: "pick", id: 1 },
  { team: "red_team", action: "ban", id: 1 },
  { team: "blue_team", action: "ban", id: 1 },
  { team: "red_team", action: "pick", id: 2 },
  { team: "blue_team", action: "pick", id: 2 },
  { team: "blue_team", action: "pick", id: 3 },
  { team: "red_team", action: "pick", id: 3 },
  { team: "red_team", action: "pick", id: 4 },
  { team: "blue_team", action: "pick", id: 4 },
  { team: "blue_team", action: "pick", id: 5 },
  { team: "red_team", action: "pick", id: 5 },
  { team: "red_team", action: "pick", id: 6 },
  { team: "blue_team", action: "pick", id: 6 },
  { team: "blue_team", action: "pick", id: 7 },
  { team: "red_team", action: "pick", id: 7 },
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
      if (turnIndex() == 0) {
        // reset happened
        console.log("new game");
        setBlueCost(0);
        setRedCost(0);
      } else {
        // calc cost for every character in picks()
        let blueCost = 0;
        let redCost = 0;
        bluePicks().forEach((pick) => {
          blueCost += calcCost(pick);
        });
        redPicks().forEach((pick) => {
          redCost += calcCost(pick);
        });
        setBlueCost(blueCost);
        setRedCost(redCost);
      }
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
  calcCost
};
