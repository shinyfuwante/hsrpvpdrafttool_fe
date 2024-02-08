import { Component, createSignal } from "solid-js";
import { Show } from "solid-js";
import { calculateBonusCycles, calculateScore } from "~/game/point_calc";
import { blueCost, redCost } from "~/game/game_logic";
import styles from "./Results.module.css";
import { blueTeamName, redTeamName } from "~/game/game_logic";

const Results: Component<{}> = (props) => {
  const [blueScore, setBlueScore] = createSignal(0);
  const [redScore, setRedScore] = createSignal(0);
  const [scoreCalced, setScoreCalced] = createSignal(false);
  const [winnerString, setWinnerString] = createSignal("");

  let [blueOneCycles, blueTwoCycles, blueDeaths] = [0, 0, 0];
  let [redOneCycles, redTwoCycles, redDeaths] = [0, 0, 0];

  const calculateScores = () => {
    setBlueScore(
      calculateScore(blueCost(), blueDeaths, blueOneCycles, blueTwoCycles)
    );
    setRedScore(
      calculateScore(redCost(), redDeaths, redOneCycles, redTwoCycles)
    );
    setScoreCalced(true);
    if (blueScore() == redScore()) {
      if (blueCost() == redCost()) {
        setWinnerString("Tie! Refer to tiebreaker rules!");
      } else if (blueCost() < redCost()) {
        setWinnerString("Blue Team Wins!");
      } else {
        setWinnerString("Red Team Wins!");
      }
    } else if (blueScore() < redScore()) {
      setWinnerString("Blue Team Wins!");
    } else {
      setWinnerString("Red Team Wins!");
    }
  };
  return (
    <div class={styles.results}>
      <div
        style={{
          display: "flex",
          "flex-direction": "row",
        }}
      >
        <div style={{ display: "flex", "flex-direction": "column" }}>
          {blueTeamName()}
          <input
            type="number"
            placeholder={"Blue Player 1 Cycles"}
            onChange={(e) => (blueOneCycles = Number(e.target.value))}
          ></input>
          <input
            type="number"
            placeholder={"Blue Player 2 Cycles"}
            onChange={(e) => (blueTwoCycles = Number(e.target.value))}
          ></input>
        </div>
        <div
          style={{
            display: "flex",
            "flex-direction": "column",
          }}
        >
          {redTeamName()}
          <input
            type="number"
            placeholder={"Red Player 1 Cycles"}
            onChange={(e) => (redOneCycles = Number(e.target.value))}
          >
            Player 1 Cycles:{" "}
          </input>
          <input
            type="number"
            placeholder={"Red Player 2 Cycles"}
            onChange={(e) => (redTwoCycles = Number(e.target.value))}
          >
            Player 2 Cycles:{" "}
          </input>
        </div>
      </div>
      <button class={styles.results_button} onClick={() => calculateScores()}>Calculate Score</button>
      <Show fallback={null} when={scoreCalced() == true}>
        <div class={styles.winning_string}>
          {winnerString()}
          <div class={styles.score_display}>
            <div class={styles.blue_team}> {blueScore().toFixed(2)}</div>{" "}
            <div class={styles.red_team}>{redScore().toFixed(2)}</div>    
          </div>
        </div>
      </Show>
    </div>
  );
};

export default Results;
