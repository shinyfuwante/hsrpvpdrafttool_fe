import { Component, Show } from "solid-js";
import styles from "./TimerPenalty.module.css";

interface TimerPenaltyProps {
  penalty_signal: () => number;
}

const TimerPenalty: Component<TimerPenaltyProps> = (props) => {
  return (
      <div class={styles.penalty}>{props.penalty_signal()}</div>
  );
};

export default TimerPenalty;
