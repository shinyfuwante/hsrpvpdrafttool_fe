import { Component, Show } from "solid-js";
import styles from "./TimerPenalty.module.css";

interface TimerPenaltyProps {
  penalty_signal: () => number;
}

const TimerPenalty: Component<TimerPenaltyProps> = (props) => {
  return (
    <div class={styles.penalty_container}>
      <div class={styles.penalty_label}>Time Penalty</div>
      <div class={styles.penalty}>{props.penalty_signal()}</div>
    </div>
  );
};

export default TimerPenalty;
