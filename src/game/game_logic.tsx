import { createSignal} from "solid-js";
import { CharJsonType, LCJsonType } from "~/types";
const game_phases = {
  LOADING: "loading",
  SIDE_SELECTION: "sideSelection",
  DRAFTING: "drafting",
  LOCK_IN: "lock-in",
  SCORING: "scoring",
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
const [cid, setCID] = createSignal("");
const [sideSelector, setSideSelector] = createSignal(false);
const [playerTurn, setPlayerTurn] = createSignal("blue_team");
const [ownTeam, setOwnTeam] = createSignal("blue_team");
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
  SigEidChange: "sig_eid_change",
};
export const handleMsg = (data: string) => {
  const msg = JSON.parse(data);
  switch (msg.message.message_type) {
    case MessageEnum.GAME_READY:
      setCID(msg.message.cid);
      setGamePhase(game_phases.SIDE_SELECTION);
      setRuleSet(msg.message.rule_set);
      //   setCharJson(msg.message.characters);
      //   setLcJson(msg.message.light_cones);
      setSideSelector(cid() == msg.message.selector);
      break;
    case MessageEnum.GAME_START:
      setGamePhase(game_phases.DRAFTING);
      setPlayerTurn(msg.message.turn_player);
      setBlueTeam(msg.message.blue_team);
      setRedTeam(msg.message.red_team);
      if (msg.message.blue_team == cid()) {
        setOwnTeam("blue_team");
      } else {
        setOwnTeam("red_team");
      }
      break;
    case MessageEnum.GAME_STATE:
      setBlueBans(msg.message.game_state.bans.blue_team);
      setRedBans(msg.message.game_state.bans.red_team);
      setBluePicks(msg.message.game_state.picks.blue_team);
      setRedPicks(msg.message.game_state.picks.red_team);
      setTurnIndex(msg.message.turn_index);
      if (msg.message.turn_index < turn_order.length) {
        setPlayerTurn(turn_order[turnIndex()].team);
      }
      break;
  }
};

export {
  game_phases,
  gamePhase,
  cid,
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
  setIsSinglePlayer
};
