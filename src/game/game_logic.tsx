import { createSignal } from "solid-js";
import { CharJsonType, LCJsonType } from "~/types";
import { v4 } from "uuid";

export const version = () => {
  // version of tool.version of game.subversion of game.subversion of rules
  return "3.3.1";
};

const POINTS_PER_SUPERIMPOSITION = 0.5;
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
  num_picked: number;
  char_mod?: number;
  lc_mod?: number;
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
export const formatDecimal = (value: number) => {
  // Check if the value is already a whole number
  if (Number.isInteger(value)) {
    return value;
  }

  // Round to the nearest whole number
  const multiplier = 100; // Adjust this value as needed
  return Math.round(value * multiplier) / multiplier;
};
const calcCost = (character: CharacterPick) => {
  const char = charJson()[character.name];
  const lcs = lcJson();
  const lc = lcs[character.light_cone];
  let cost = 0;
  for (let i = 0; i <= character.eidolon; i++) {
    cost += char.point_costs[i];
  }
  if (ruleSet() == "pokke") {
    return cost;
  }
  if (canDoublePickWithCost() && character.num_picked == 2) {
    cost = Math.ceil(cost * 1.5 * 2) / 2;
  }
  if (lc && character.superimposition > 0) {
    cost += lc.point_costs[0];
    console.log(cost);
    if (lc.free) {
      return cost;
    }
    if (ruleSet() == "mirror_cup") {
      cost += lc.point_costs[character.superimposition - 1] - lc.point_costs[0];
    } else if (ruleSet() == "boulder_league") {
      let i = character.superimposition - 1;
      while (i >= 0) {
        cost += lc.point_costs[i--];
      }
      cost -= lc.point_costs[0];
      return formatDecimal(cost);
    } else {
      if (lc.rarity == 5 || lc.special) {
        cost +=
          lc.point_costs[character.superimposition - 1] - lc.point_costs[0];
      }
      // } else {
      //   cost +=
      //     POINTS_PER_SUPERIMPOSITION *
      //     Math.floor(character.superimposition / 2);
      // }
    }
    // else if (lc.rarity == 5) {
    // cost += (POINTS_PER_SUPERIMPOSITION * (character.superimposition - 1));
    // }
  }
  return cost;
};
const [initiativeWinner, setInitiativeWinner] = createSignal("default");
const [sideSelector, setSideSelector] = createSignal(false);
const [totalCost, setTotalCost] = createSignal(30);
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
const [isEvent, setIsEvent] = createSignal(false);
const [isFFA, setIsFFA] = createSignal(false);
const [isMeme, setIsMeme] = createSignal(false);
const [canDoublePickWithCost, setCanDoublePickWithCost] = createSignal(false);
const [error, setError] = createSignal("");
const [blueCostsMap, setBlueCostsMap] = createSignal(new Map());
const [redCostsMap, setRedCostsMap] = createSignal(new Map());
const [draftOrder, setDraftOrder] = createSignal<
  (CharacterBan | CharacterPick)[]
>([]);
const [blueTimePenalty, setBlueTimePenalty] = createSignal(0);
const [redTimePenalty, setRedTimePenalty] = createSignal(0);
const [blueTeamReserveTime, setBlueTeamReserveTime] = createSignal(570);
const [redTeamReserveTime, setRedTeamReserveTime] = createSignal(570);
const [applyTimerPenalty, setApplyTimerPenalty] = createSignal(true);
export const [turnIndex, setTurnIndex] = createSignal(0);
const [player1Roll, setPlayer1Roll] = createSignal(0);
const [player2Roll, setPlayer2Roll] = createSignal(0);
const [testingTool, setTestingTool] = createSignal(false);
const [isSpectator, setIsSpectator] = createSignal(false);
export const turn_order_2_bans = [
  { team: "blue_team", action: "ban", id: 0 },
  { team: "red_team", action: "ban", id: 0 },
  { team: "blue_team", action: "pick", id: 1 },
  { team: "red_team", action: "pick", id: 1 },
  { team: "red_team", action: "pick", id: 2 },
  { team: "blue_team", action: "pick", id: 2 },
  { team: "red_team", action: "ban", id: 3 },
  { team: "blue_team", action: "ban", id: 3 },
  { team: "red_team", action: "pick", id: 4 },
  { team: "blue_team", action: "pick", id: 4 },
  { team: "blue_team", action: "pick", id: 5 },
  { team: "red_team", action: "pick", id: 5 },
  { team: "red_team", action: "pick", id: 6 },
  { team: "blue_team", action: "pick", id: 6 },
  { team: "blue_team", action: "pick", id: 7 },
  { team: "red_team", action: "pick", id: 7 },
  { team: "red_team", action: "pick", id: 8 },
  { team: "blue_team", action: "pick", id: 8 },
  { team: "blue_team", action: "pick", id: 9 },
  { team: "red_team", action: "pick", id: 9 },
];
export const turn_order_3_bans = [
  { team: "blue_team", action: "ban", id: 0 },
  { team: "red_team", action: "ban", id: 0 },
  { team: "blue_team", action: "ban", id: 1 },
  { team: "red_team", action: "ban", id: 1 },
  { team: "blue_team", action: "pick", id: 2 },
  { team: "red_team", action: "pick", id: 2 },
  { team: "red_team", action: "pick", id: 3 },
  { team: "blue_team", action: "pick", id: 3 },
  { team: "red_team", action: "ban", id: 4 },
  { team: "blue_team", action: "ban", id: 4 },
  { team: "red_team", action: "pick", id: 5 },
  { team: "blue_team", action: "pick", id: 5 },
  { team: "blue_team", action: "pick", id: 6 },
  { team: "red_team", action: "pick", id: 6 },
  { team: "red_team", action: "pick", id: 7 },
  { team: "blue_team", action: "pick", id: 7 },
  { team: "blue_team", action: "pick", id: 8 },
  { team: "red_team", action: "pick", id: 8 },
  { team: "red_team", action: "pick", id: 9 },
  { team: "blue_team", action: "pick", id: 9 },
  { team: "blue_team", action: "pick", id: 10 },
  { team: "red_team", action: "pick", id: 10 },
];
export const turn_order_bb = [
  { team: "blue_team", action: "ban", id: 0 },
  { team: "red_team", action: "ban", id: 0 },
  { team: "blue_team", action: "ban", id: 1 },
  { team: "red_team", action: "ban", id: 1 },
  { team: "blue_team", action: "pick", id: 2 },
  { team: "red_team", action: "pick", id: 2 },
  { team: "red_team", action: "pick", id: 3 },
  { team: "blue_team", action: "pick", id: 3 },
  { team: "blue_team", action: "pick", id: 4 },
  { team: "red_team", action: "pick", id: 4 },
  { team: "red_team", action: "pick", id: 5 },
  { team: "blue_team", action: "pick", id: 5 },
  { team: "red_team", action: "pick", id: 6 },
  { team: "blue_team", action: "pick", id: 6 },
  { team: "red_team", action: "ban", id: 7 },
  { team: "blue_team", action: "ban", id: 7 },
  { team: "blue_team", action: "pick", id: 8 },
  { team: "red_team", action: "pick", id: 8 },
  { team: "red_team", action: "pick", id: 9 },
  { team: "blue_team", action: "pick", id: 9 },
  { team: "blue_team", action: "pick", id: 10 },
  { team: "red_team", action: "pick", id: 10 },
  { team: "blue_team", action: "ban", id: 11 },
  { team: "red_team", action: "ban", id: 11 },
  { team: "red_team", action: "pick", id: 12 },
  { team: "blue_team", action: "pick", id: 12 },
  { team: "blue_team", action: "pick", id: 13 },
  { team: "red_team", action: "pick", id: 13 },
];
const [turnOrder, setTurnOrder] = createSignal(turn_order_2_bans);
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
      setBlueTeamName(msg.message.blue_team_name);
      setRedTeam(msg.message.red_team);
      setRedTeamName(msg.message.red_team_name);
      if (msg.message.blue_team == sessionId()) {
        if (sideSelector()) {
          setInitiativeWinner("blue_team");
        }
        setOwnTeam("blue_team");
      } else if (msg.message.red_team == sessionId()) {
        if (sideSelector()) {
          setInitiativeWinner("red_team");
        }
        setOwnTeam("red_team");
      }
      if (isSpectator()) {
        setOwnTeam("spectator");
      }
      break;
    case MessageEnum.GAME_STATE:
      setGamePhase(game_phases.DRAFTING);
      setBlueBans(msg.message.game_state.bans.blue_team);
      setRedBans(msg.message.game_state.bans.red_team);
      setBluePicks(msg.message.game_state.picks.blue_team);
      setRedPicks(msg.message.game_state.picks.red_team);
      setTurnIndex(msg.message.turn_index);
      if (msg.message.blue_team) {
        setBlueTeam(msg.message.blue_team);
        setBlueTeamName(msg.message.blue_team_name);
        setRedTeam(msg.message.red_team);
        setRedTeamName(msg.message.red_team_name);
      }
      if (isSpectator()) {
        setOwnTeam("spectator");
      }
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
      if (msg.message.turn_index < turnOrder().length) {
        setPlayerTurn(turnOrder()[turnIndex()].team);
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
  setRuleSet,
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
  calcCost,
  isEvent,
  setIsEvent,
  blueCostsMap,
  setBlueCostsMap,
  redCostsMap,
  setRedCostsMap,
  totalCost,
  setTotalCost,
  initiativeWinner,
  setInitiativeWinner,
  draftOrder,
  setDraftOrder,
  player1Roll,
  setPlayer1Roll,
  player2Roll,
  setPlayer2Roll,
  blueTimePenalty,
  setBlueTimePenalty,
  redTimePenalty,
  setRedTimePenalty,
  applyTimerPenalty,
  setApplyTimerPenalty,
  blueTeamReserveTime,
  setBlueTeamReserveTime,
  redTeamReserveTime,
  setRedTeamReserveTime,
  isFFA,
  setIsFFA,
  turnOrder,
  setTurnOrder,
  canDoublePickWithCost,
  setCanDoublePickWithCost,
  testingTool,
  setTestingTool,
  isSpectator,
  setIsSpectator,
  isMeme,
  setIsMeme,
};
