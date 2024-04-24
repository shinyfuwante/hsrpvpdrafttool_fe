import { Component, createSignal } from "solid-js";

const Timer: Component<{}> = (props) => {
  const [seconds, setSeconds] = createSignal(90);
  const intervalId = setInterval(() => {
    setSeconds(seconds() - 1);
  }, 1000);
  return <div>{seconds()}</div>;
};

export default Timer;