import { Component, createSignal } from "solid-js";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { charJson } from "~/game/game_logic";

export type TeamProps = {
  bans: string[];
  picks: string[];
};

const Team: Component<TeamProps> = (props) => {
  const { bans, picks } = props;
  const [cost, setCost] = createSignal(0);
  const costs = new Map();
  const handleCostChange = (id: string, newCost: number) => {
    console.log("called hcc");
    const oldCost = costs.get(id) || 0;
    if (newCost !== oldCost) {
        costs.set(id, newCost);
        const totalCost = Array.from(costs.values()).reduce((a, b) => a + b, 0);
        if (totalCost !== cost()) {
            setCost(totalCost);
        }
};
  };
  return (
    <div>
      <div class="team-info">
        <div>Team Name</div>
        <div>Points: {cost()}/30</div>
      </div>
      <div>
        <CharacterCard
          id="0"
          isPick={false}
          character={bans[0]}
          light_cone=""
          onCostChange={handleCostChange}
        ></CharacterCard>
        <div>
          <CharacterCard
            id="1"
            isPick={true}
            character={picks[0]}
            light_cone=""
            onCostChange={handleCostChange}
          ></CharacterCard>
          <CharacterCard
            id="2"
            isPick={true}
            character={picks[1]}
            light_cone=""
            onCostChange={handleCostChange}
          ></CharacterCard>
        </div>
        <div>Ban 2</div>
        <div>Pick 3 Pick 4</div>
        <div>Pick 5 Pick 6</div>
        <div>Pick 7 Pick 8</div>
      </div>
    </div>
  );
};

export default Team;
