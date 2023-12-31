import { Component } from "solid-js";

const Team: Component<{}> = (props) => {
  return (
    <div>
      <div class="team-info">
        <div>Team Name</div>
        <div>Points: 30/30</div>
      </div>
      <div>
        <div>Ban 1</div>
        <div>Pick 1 Pick 2</div>
        <div>Ban 2</div>
        <div>Pick 3 Pick 4</div>
        <div>Pick 5 Pick 6</div>
        <div>Pick 7 Pick 8</div>
      </div>
    </div>
  );
};

export default Team;
