import { useParams } from "solid-start";
import { onMount, Show, createSignal, createEffect } from "solid-js";
import {
  ruleSet,
  sideSelector,
  handleMsg,
  CharacterPick,
  CharacterBan,
  ownTeam,
  MessageEnum,
  turnIndex,
  getCID,
  error,
  setBlueCostsMap,
  setRedCostsMap,
  setRuleSetSelection,
  ruleSetSelection,
  handleRuleSetSelection,
} from "~/game/game_logic";
import { w3cwebsocket as WebSocket } from "websocket";
import MainApp from "~/components/MainApp/MainApp";
import styles from "./game.module.css";
export default function GamePage() {
  const params = useParams();
  const game_id = params.game_id;
  const [backendUrl, setBackendUrl] = createSignal(``);
  createEffect( () => {
    setBackendUrl(`wss://${ // TODO: Change back to WSS for prod, ws for testing
    import.meta.env.VITE_BACKEND_URL
  }/ws/game/${game_id}?ruleSet=${ruleSet()}&cid=${getCID()}&ruleSetSelection=${ruleSetSelection()}`)
  })
  console.log(backendUrl());
  let client: WebSocket; 
  const [copied, setCopied] = createSignal(false);
  const [teamName, setTeamName] = createSignal("");
  const [teamNameSet, setTeamNameSet] = createSignal(false);
  const joinGame = async () => {
    client = new WebSocket(backendUrl());
    client.onopen = () => {
      const message = {
        type: MessageEnum.INIT_GAME,
        team_name: teamName(),
      };
      client.send(JSON.stringify(message));
    };
    client.onmessage = (message: any) => {
      handleMsg(message.data);
    };
  };
  createEffect( () => {
    handleRuleSetSelection();
  });
  const initialMenu = () => {
    return (
      <div class={styles.loading_container}>
        <div class={styles.loading_message}>
          <div>Set your team name: </div>
          <input
            type="text"
            placeholder="Team Name Here"
            onInput={(e) => setTeamName(e.currentTarget.value)}
            class={styles.team_names_input}
          />
          <div>Select your rule set (If you were invited, this has no effect): </div>
          <select id="rule_select" onChange={(e) => setRuleSetSelection(e.target.value)} class={styles.bans_dropdown}>
            <option value={"phd_standard"}>PHD 4 Bans (Default)</option>
            {/* <option value={"phd_standard_6_bans"}>PHD 6 Bans</option> */}
            <option value={"pokke"}>Pokke</option>
            {/* <option value={"pokke_6_bans"}>Pokke 6 Bans</option> */}
          </select>
          <button
            onClick={() => {
              setTeamNameSet(true);
              joinGame();
            }}
            class={styles.team_names_button}
          >
            Join Game
          </button>
        </div>
      </div>
    );
  };
  const copiedModal = () => {
    return (
      <div class={styles.copied_modal}>
        <div>Link Copied!</div>
      </div>
    );
  };
  const copyGameToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const copyWatchToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href.replace('game', 'watch'));
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const LoadingMenu = () => {
    return (
      <div class={styles.loading_container}>
        <div class={styles.loading_screen}>
          <div class={styles.loading_message}>
            <Show when={error() != ""}>{error()}</Show>
            <div class={styles.links}>
              Waiting for another player. Click to copy this link to send to
              your friend:
              {/* <a href={window.location.href}>{window.location.href}</a> */}
              <div onClick={copyGameToClipboard} class={styles.link_to_copy}>
                {window.location.href}
              </div>
              <div></div>
              Click to copy the spectator link: 
              <div onClick={copyWatchToClipboard} class={styles.link_to_copy}>
                {window.location.href.replace('game', 'watch')}
              </div>
            </div>
          </div>
        </div>
        <Show when={copied()}>{copiedModal()}</Show>
      </div>
    );
  };
  const ReconnectScreen = () => {
    return (
      <div class={styles.loading_container}>
        <div class={styles.loading_screen}>
          <div class={styles.loading_message}>
            Other player has disconnected. Send this link to your friend to join
            the game:
            {/* <a href={window.location.href}>{window.location.href}</a> */}
            <div onClick={copyGameToClipboard} class={styles.link_to_copy}>
              {window.location.href}
            </div>
          </div>
        </div>
        <Show when={copied()}>{copiedModal()}</Show>
      </div>
    );
  };
  const handlePick = (character: CharacterPick) => {
    const message = {
      type: MessageEnum.PICK,
      character: character,
      team: ownTeam(),
    };

    client.send(JSON.stringify(message));
  };
  const handleBan = (character: CharacterBan) => {
    const message = {
      type: MessageEnum.BAN,
      character: character,
      team: ownTeam(),
    };
    client.send(JSON.stringify(message));
  };
  const handleSigEidChange = (character: CharacterPick) => {
    const message = {
      type: MessageEnum.SIG_EID_CHANGE,
      character: character,
      team: ownTeam(),
    };
    client.send(JSON.stringify(message));
  };
  const handleReset = () => {
    if (turnIndex() <= 0) {
      return;
    }
    const message = {
      type: MessageEnum.RESET_GAME,
    };
    client.send(JSON.stringify(message));
    setBlueCostsMap(new Map());
    setRedCostsMap(new Map());
  };
  const handleUndo = () => {
    if (turnIndex() <= 0) {
      return;
    }
    const message = {
      type: MessageEnum.UNDO,
    };
    client.send(JSON.stringify(message));
  };
  const SideSelection = () => {
    const sendSideMessage = (side: string) => {
      const message = {
        type: "side_select",
        side: side,
      };
      client.send(JSON.stringify(message));
    };
    return (
      <div>
        {sideSelector() && (
          <div class={styles.side_selector}>
            <div class={styles.side_selector_label}>Select a side:</div>
            <div class={styles.side_button_container}>
              <button
                class={styles.blue_team}
                onClick={() => sendSideMessage("blue")}
              >
                Blue Team
              </button>
              <button
                class={styles.red_team}
                onClick={() => sendSideMessage("red")}
              >
                Red Team
              </button>
            </div>
          </div>
        )}
        {!sideSelector() && (
          <div class={styles.loading_screen}>
            <div class={styles.loading_message}>
              Waiting for other player to select side...
            </div>
          </div>
        )}
      </div>
    );
  };
  // onMount(async () => {
  //   client.onopen = () => {
  //     console.log("WebSocket Client Connected");
  //   };
  //   client.onmessage = (message: any) => {
  //     handleMsg(message.data);
  //   };
  // });
  return (
    <div>
      <Show when={!teamNameSet()}>{initialMenu()}</Show>
      <Show when={teamNameSet()}>
        <MainApp
          ReconnectScreen={ReconnectScreen}
          LoadingMenu={LoadingMenu}
          SideSelection={SideSelection}
          handleBan={handleBan}
          handlePick={handlePick}
          handleSigEid={handleSigEidChange}
          handleUndo={handleUndo}
          handleReset={handleReset}
        />
      </Show>
    </div>
  );
}
