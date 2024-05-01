import { Component, createSignal, createEffect } from "solid-js";
import styles from "./TeamTimer.module.css";
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
  setRedTeamReserveTime,
} from "~/game/game_logic";

const TeamTimer: Component<{ team: string }> = (props) => {
  const timer =
    props.team == "blue_team" ? blueTeamReserveTime : redTeamReserveTime;
  const label =
    props.team == "blue_team" ? "Blue Team Reserve" : "Red Team Reserve";
  const display_time = () => {
    let display_minute = Math.floor(timer() / 60);
    let display_seconds = timer() % 60;
    return `${display_minute}:${
      display_seconds < 10 ? `0${display_seconds}` : display_seconds
    }`;
  };
  return (
    <div class={styles.timer_container}>
      <div class={styles.timer_label}>{label}</div>
      <div class={styles.timer}>{display_time()}</div>
    </div>
  );
};

export default TeamTimer;
