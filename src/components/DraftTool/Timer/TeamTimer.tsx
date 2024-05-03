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
import { tickRed, tickBlue } from "./Timer";

const TeamTimer: Component<{ team: string }> = (props) => {
  const timer =
    props.team == "blue_team" ? blueTeamReserveTime : redTeamReserveTime;
  const label = props.team == "blue_team" ? "Reserve Time" : "Reserve Time";
  const tickSignal = props.team == "blue_team" ? tickBlue : tickRed;
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
      <div class={`${styles.timer} ${tickSignal() ? timer() < 60 ? styles.timer_urgent : styles.timer_flash : ""}`}>{display_time()}</div>
    </div>
  );
};

export default TeamTimer;
