import { Component, Show } from "solid-js";
import styles from "./TimerPenalty.module.css";
import { ruleSet } from "~/game/game_logic";

interface TimerPenaltyProps {
  penalty_signal: () => number;
}

const TimerPenalty: Component<TimerPenaltyProps> = (props) => {
  return (
    ruleSet() == "pokke" ? 
    <div class={styles.penalty_container}>
      <div class={styles.penalty_label}>Time Penalty</div>
      <div class={styles.penalty}>{props.penalty_signal()}</div>
    </div>
    : 
    <div></div>
  );
};

export default TimerPenalty;
