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
  blueTeamReserveTime,
  setBlueTeamReserveTime,
  redTeamReserveTime,
  setRedTeamReserveTime
} from "~/game/game_logic";

const TeamTimer: Component<{team: string}> = (props) => {
    const [timer, setTimer] = [props.team == "blue_team" ? blueTeamReserveTime : redTeamReserveTime, props.team == "blue_team" ? setBlueTeamReserveTime : setRedTeamReserveTime];
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
      if (playerTurn() == "blue_team") {
        setBlueTimePenalty(blueTimePenalty() + 1);
      } else {
        setRedTimePenalty(redTimePenalty() + 1);
      }
      setSeconds(secondsPerPick);
    }
  })
  createEffect(() => {
    if (turnIndex() == turn_order.length) {
      clearInterval(intervalId);
      setSeconds(90);
    }
  })
  return <div class={seconds() < 30 ? styles.timer_urgent : styles.timer}>{seconds()}</div>;
};

export default TeamTimer;
