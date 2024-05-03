import { Component, createSignal } from "solid-js";
import { Show } from "solid-js";
import {
  calculateBonusCycles,
  calculateScore,
  encodeString,
} from "~/game/point_calc";
import {
  applyTimerPenalty,
  blueTimePenalty,
  redTimePenalty,
  blueCost,
  redCost,
  ruleSet,
} from "~/game/game_logic";
import styles from "./Results.module.css";
import { blueTeamName, redTeamName } from "~/game/game_logic";

export const [blueOneCycles, setBlueOneCycles] = createSignal(-1);
export const [blueTwoCycles, setBlueTwoCycles] = createSignal(-1);
export const [redOneCycles, setRedOneCycles] = createSignal(-1);
export const [redTwoCycles, setRedTwoCycles] = createSignal(-1);
export const [blueDeaths, setBlueDeaths] = createSignal(-1);
export const [redDeaths, setRedDeaths] = createSignal(-1);

const Results: Component<{}> = (props) => {
  const [blueScore, setBlueScore] = createSignal(0);
  const [redScore, setRedScore] = createSignal(0);
  const [scoreCalced, setScoreCalced] = createSignal(false);
  const [winnerString, setWinnerString] = createSignal("");
  const [copied, setCopied] = createSignal(false);
  
  const calculateScores = () => {
    setBlueScore(
      calculateScore(blueCost(), blueDeaths(), blueOneCycles(), blueTwoCycles()) +
        (applyTimerPenalty() ? blueTimePenalty() : 0)
    );
    setRedScore(
      calculateScore(redCost(), redDeaths(), redOneCycles(), redTwoCycles()) +
        (applyTimerPenalty() ? redTimePenalty() : 0)
    );
    setScoreCalced(true);
    if (blueScore() == redScore()) {
      if (blueCost() == redCost()) {
        setWinnerString("Tie! Refer to tiebreaker rules!");
      } else if (blueCost() < redCost()) {
        setWinnerString("Blue Team Wins! (By Cost)");
      } else {
        setWinnerString("Red Team Wins! (By Cost)");
      }
    } else if (blueScore() < redScore()) {
      setWinnerString("Blue Team Wins!");
    } else {
      setWinnerString("Red Team Wins!");
    }
  };
  return (
    <div class={styles.results}>
      <div class={styles.results_container}>
        <div class={styles.team_result}>
          <div class={styles.team_name}>{blueTeamName()}</div>
          <input
            placeholder={"Blue Player 1 Cycles"}
            onChange={(e) => (setBlueOneCycles(Number(e.target.value)))}
            value={blueOneCycles() < 0 ? "" : blueOneCycles()}
            class={styles.results_input}
          ></input>
          <input
            placeholder={"Blue Player 2 Cycles"}
            onChange={(e) => (setBlueTwoCycles(Number(e.target.value)))}
            value={blueTwoCycles() < 0 ? "" : blueTwoCycles()}
            class={styles.results_input}
          ></input>
          <input
            placeholder={"Blue Team Deaths"}
            onChange={(e) => (setBlueDeaths(Number(e.target.value)))}
            class={styles.results_input}
            value={blueDeaths() < 0 ? "" : blueDeaths()}
          >
            Blue Team Deaths:{" "}
          </input>
        </div>
        <div class={styles.team_result}>
          <div class={styles.team_name}>{redTeamName()}</div>
          <input
            type="number"
            placeholder={"Red Player 1 Cycles"}
            onChange={(e) => (setRedOneCycles(Number(e.target.value)))}
            class={styles.results_input}
            value={redOneCycles() < 0 ? "" : redOneCycles()}
          >
            Player 1 Cycles:{" "}
          </input>
          <input
            type="number"
            placeholder={"Red Player 2 Cycles"}
            onChange={(e) => (setRedTwoCycles(Number(e.target.value)))}
            class={styles.results_input}
            value={redTwoCycles() < 0 ? "" : redTwoCycles()}
          >
            Player 2 Cycles:{" "}
          </input>
          <input
            type="number"
            placeholder={"Red Team Deaths"}
            onChange={(e) => (setRedDeaths(Number(e.target.value)))}
            class={styles.results_input}
            value={redDeaths() < 0 ? "" : redDeaths()}
          >
            Red Team Deaths:{" "}
          </input>
        </div>
      </div>
      <button
        class={`${styles.results_button}`}
        onClick={() => calculateScores()}
      >
        Calculate Score
      </button>
      <Show fallback={null} when={scoreCalced() == true}>
        <div class={styles.winning_string}>
          {winnerString()}
          <div class={styles.score_display}>
            <div class={styles.blue_team}> {blueScore().toFixed(4)}</div>{" "}
            <div class={styles.red_team}>{redScore().toFixed(4)}</div>
          </div>
        </div>
        <Show fallback={null} when={ruleSet() == "pokke"}>
          {" "}
          <button
            class={styles.results_button}
            onClick={() =>
              encodeString(
                blueOneCycles(),
                blueTwoCycles(),
                redOneCycles(),
                redTwoCycles(),
                blueDeaths(),
                redDeaths(),
                setCopied
              )
            }
          >
            Copy Submission String to Clipboard
          </button>
        </Show>
          <div class={`${copied() ? styles.show : ""} ${styles.submission_string}`}>Submission String Copied!</div>
      </Show>
    </div>
  );
};

export default Results;
