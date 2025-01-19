import { Component, createEffect, createSignal } from "solid-js";
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
  isEvent,
  turnOrder,
  turn_order_bb,
} from "~/game/game_logic";
import styles from "./Results.module.css";
import { blueTeamName, redTeamName } from "~/game/game_logic";

const Results: Component<{}> = (props) => {
  const [blueScore, setBlueScore] = createSignal(0);
  const [redScore, setRedScore] = createSignal(0);
  const [scoreCalced, setScoreCalced] = createSignal(false);
  const [winnerString, setWinnerString] = createSignal("");
  const [copied, setCopied] = createSignal(false);
  const [blueBonus, setBlueBonus] = createSignal(0);
  const [redBonus, setRedBonus] = createSignal(0);

  createEffect(() => {
    setBlueBonus(calculateBonusCycles(blueCost()));
    setRedBonus(calculateBonusCycles(redCost()));
  });
  let [blueOneCycles, blueTwoCycles, blueDeaths] = [0, 0, 0];
  let [redOneCycles, redTwoCycles, redDeaths] = [0, 0, 0];

  const penaltyCounter = () => {
    const diff = blueBonus() - redBonus();
    return (
      <div
        class={`${styles.penalty_counter} ${
          blueBonus() < redBonus()
            ? styles.blue_advantage
            : styles.red_advantage
        }`}
      >
        Cycle difference: {diff.toFixed(3)}
      </div>
    );
  };
  const calculateScores = () => {
    setBlueScore(
      calculateScore(blueCost(), blueDeaths, blueOneCycles, blueTwoCycles) +
        (applyTimerPenalty() ? blueTimePenalty() : 0)
    );
    setRedScore(
      calculateScore(redCost(), redDeaths, redOneCycles, redTwoCycles) +
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
            onChange={(e) => (blueOneCycles = Number(e.target.value))}
            class={styles.results_input}
          ></input>
          <input
            placeholder={"Blue Player 2 Cycles"}
            onChange={(e) => (blueTwoCycles = Number(e.target.value))}
            class={styles.results_input}
          ></input>
          <input
            placeholder={"Blue Team Deaths"}
            onChange={(e) => (blueDeaths = Number(e.target.value))}
            class={styles.results_input}
          >
            Blue Team Deaths:{" "}
          </input>
        </div>
        <div class={styles.team_result}>
          <div class={styles.team_name}>{redTeamName()}</div>
          <input
            type="number"
            placeholder={"Red Player 1 Cycles"}
            onChange={(e) => (redOneCycles = Number(e.target.value))}
            class={styles.results_input}
          >
            Player 1 Cycles:{" "}
          </input>
          <input
            type="number"
            placeholder={"Red Player 2 Cycles"}
            onChange={(e) => (redTwoCycles = Number(e.target.value))}
            class={styles.results_input}
          >
            Player 2 Cycles:{" "}
          </input>
          <input
            type="number"
            placeholder={"Red Team Deaths"}
            onChange={(e) => (redDeaths = Number(e.target.value))}
            class={styles.results_input}
          >
            Red Team Deaths:{" "}
          </input>
        </div>
      </div>
      <Show when={ruleSet() != "pokke" && turnOrder() != turn_order_bb}>
        <div class={styles.penalty_counter}>{penaltyCounter()}</div>
      </Show>
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
        <Show fallback={null} when={ruleSet() == "pokke" && !isEvent()}>
          {" "}
          <button
            class={styles.results_button}
            onClick={() =>
              encodeString(
                blueOneCycles,
                blueTwoCycles,
                redOneCycles,
                redTwoCycles,
                blueDeaths,
                redDeaths,
                setCopied
              )
            }
          >
            Copy Submission String to Clipboard
          </button>
        </Show>
        <div
          class={`${copied() ? styles.show : ""} ${styles.submission_string}`}
        >
          Submission String Copied!
        </div>
      </Show>
    </div>
  );
};

export default Results;
