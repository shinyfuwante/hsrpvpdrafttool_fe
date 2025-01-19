import { Component, createSignal, Show } from "solid-js";
import {
  blueTeamName,
  redTeamName,
  setApplyTimerPenalty,
  applyTimerPenalty,
  setBlueTeamName,
  setRedTeamName,
  setInitiativeWinner,
  player1Roll,
  player2Roll,
  setPlayer1Roll,
  setPlayer2Roll,
  ruleSet,
  isMeme
} from "~/game/game_logic";
import styles from "./SoloSettings.module.css";

export const [player1Name, setPlayer1Name] = createSignal("一队");
export const [player2Name, setPlayer2Name] = createSignal("二队");
const SoloSettings: Component<{}> = (props) => {
  setBlueTeamName("蓝方");
  setRedTeamName("红方")
  const roll = () => {
    return Math.floor(Math.random() * 100) + 1;
  };
  const updatePlayer1Name = (name: string) => {
    const old_name = player1Name();
    if (old_name == blueTeamName()) {
      setBlueTeamName(name);
    } else if (old_name == redTeamName()) {
      setRedTeamName(name);
    }
    setPlayer1Name(name);
  };
  const updatePlayer2Name = (name: string) => {
    const old_name = player2Name();
    if (old_name == blueTeamName()) {
      setBlueTeamName(name);
    } else if (old_name == redTeamName()) {
      setRedTeamName(name);
    }
    setPlayer2Name(name);
  };
  const determineBlueTeam = (name: string) => {
    if (player1Name() === name) {
      setBlueTeamName(player1Name());
      setRedTeamName(player2Name());
    } else {
      setBlueTeamName(player2Name());
      setRedTeamName(player1Name());
    }
  };

  return (
    <div class={styles.settings_menu}>
      <img src="/rule_sets/bb_rules/logo.png" class={styles.logo}></img>
      <h3>设置: </h3>
      <div>
        <div class={styles.team_names}>
          <div>
            <input
              type="text"
              placeholder="T一队 队名"
              onChange={(e) => updatePlayer1Name(e.target.value)}
              class={styles.team_names_input}
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="二队 队名"
              onChange={(e) => updatePlayer2Name(e.target.value)}
              class={styles.team_names_input}
            ></input>
          </div>
        </div>
        <div class={styles.initiative}>
          <div
            class={styles.roll_buttons}
            onClick={() => {
              if (isMeme()) {
                setPlayer1Roll(100);
              } else {
                setPlayer1Roll(roll());
              }
            }}
          >
            <div>{player1Roll()}</div>
            摇骰子 {player1Name()}
          </div>
          <div
            class={styles.roll_buttons}
            onClick={() => {
              if (isMeme()) {
                setPlayer2Roll(101);
              } else {
                setPlayer2Roll(roll());
              }
            }}
          >
            <div>{player2Roll()}</div>
            摇骰子 {player2Name()}
          </div>
        </div>
      </div>
      <div>
        <div class={styles.blue_team_selector}>
          蓝方归属：
          <div>
            <input
              type="radio"
              id="player1"
              name="team"
              value={player1Name()}
              onChange={(e) => determineBlueTeam(player1Name())}
            />
            <label for="player1">{player1Name()}</label>
            <input
              type="radio"
              id="player2"
              name="team"
              value={player2Name()}
              onChange={(e) => determineBlueTeam(player2Name())}
            />
            <label for="player2">{player2Name()}</label>
          </div>
        </div>
      </div>
      <Show when={ruleSet() == "pokke"}>
        <div>
          <fieldset>
            <label class={`${styles.toggle_cycle_penalty}`}>
              <input
                name="toggle_cycle_penalty"
                type="checkbox"
                role="switch"
                onChange={() => setApplyTimerPenalty(!applyTimerPenalty())}
                checked={applyTimerPenalty()}
              />
              <div>Apply Timer Penalty (Applied for Ranked)</div>
            </label>
          </fieldset>
        </div>
      </Show>
    </div>
  );
};

export default SoloSettings;
