import { Component, createSignal, createEffect } from "solid-js";
import styles from "./Timer.module.css";
import {
  blueTimePenalty,
  playerTurn,
  setBlueTimePenalty,
  setRedTimePenalty,
  redTimePenalty,
  turnIndex,
  turn_order,
  redPicks,
  setBlueTeamReserveTime,
  blueTeamReserveTime,
  setRedTeamReserveTime,
  redTeamReserveTime,
} from "~/game/game_logic";

const Timer: Component<{}> = (props) => {
  const secondsPerPick = 30;
  const [seconds, setSeconds] = createSignal(secondsPerPick);
  let intervalId: NodeJS.Timeout;
  createEffect(() => {
    if (turnIndex() > 0 && turnIndex() < turn_order.length) {
      clearInterval(intervalId);
      setSeconds(secondsPerPick);
      intervalId = setInterval(() => {
        setSeconds(seconds() - 1);
      }, 1000);
    }
  });
  createEffect(() => {
    if (seconds() == 0) {
      clearInterval(intervalId);
      if (playerTurn() == "blue_team") {
        intervalId = setInterval(() => {
          setBlueTeamReserveTime(blueTeamReserveTime() - 1);
        }, 1000);
      } else {
        intervalId = setInterval(() => {
          setRedTeamReserveTime(redTeamReserveTime() - 1);
        }, 1000);
      }
      // setSeconds(secondsPerPick);
    }
  });
  createEffect(() => {
    if (turnIndex() == turn_order.length) {
      clearInterval(intervalId);
      setSeconds(secondsPerPick);
    }
  });
  createEffect(() => {
    if (blueTeamReserveTime() == 0) {
      clearInterval(intervalId);
      setBlueTimePenalty(blueTimePenalty() + 1);
      setBlueTeamReserveTime(60);
      intervalId = setInterval(() => {
        setBlueTeamReserveTime(blueTeamReserveTime() - 1);
      }, 1000);
    }
    if (redTeamReserveTime() == 0) {
      clearInterval(intervalId);
      setRedTimePenalty(redTimePenalty() + 1);
      setRedTeamReserveTime(60);
      intervalId = setInterval(() => {
        setRedTeamReserveTime(redTeamReserveTime() - 1);
      }, 1000);
    }
  });
  return (
    <div class={seconds() < 10 ? styles.timer_urgent : styles.timer}>
      {seconds()}
    </div>
  );
};

export default Timer;
