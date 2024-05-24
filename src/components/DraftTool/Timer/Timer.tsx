import { Component, createSignal, createEffect } from "solid-js";
import styles from "./Timer.module.css";
import {
  blueTimePenalty,
  playerTurn,
  setBlueTimePenalty,
  setRedTimePenalty,
  redTimePenalty,
  turnIndex,
  turnOrder,
  redPicks,
  setBlueTeamReserveTime,
  blueTeamReserveTime,
  setRedTeamReserveTime,
  redTeamReserveTime,
} from "~/game/game_logic";
export const [tickBlue, setTickBlue] = createSignal(false);
export const [tickRed, setTickRed] = createSignal(false);
const Timer: Component<{}> = (props) => {
  const secondsPerPick = 30;
  const [seconds, setSeconds] = createSignal(secondsPerPick);
  let intervalId: NodeJS.Timeout;
  createEffect(() => {
    if (turnIndex() == 0) {
      clearInterval(intervalId);
    }
  })
  createEffect(() => {
    if (turnIndex() > 1 && turnIndex() < turnOrder().length) {
      setTickRed(false);
      setTickBlue(false);
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
        setTickBlue(true);
      } else {
        intervalId = setInterval(() => {
          setRedTeamReserveTime(redTeamReserveTime() - 1);
        }, 1000);
        setTickRed(true);
      }
      // setSeconds(secondsPerPick);
    }
  });
  createEffect(() => {
    if (turnIndex() == turnOrder().length) {
      clearInterval(intervalId);
      setTickBlue(false);
      setTickRed(false);
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
    <div class={seconds() < 10 && seconds() > 0 ? styles.timer_urgent : styles.timer}>
      {seconds()}
    </div>
  );
};

export default Timer;
