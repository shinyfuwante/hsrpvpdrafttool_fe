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
    const oldCost = costs.get(id) || 0;
    if (newCost !== oldCost) {
      costs.set(id, newCost);
      const totalCost = Array.from(costs.values()).reduce((a, b) => a + b, 0);
      if (totalCost !== cost()) {
        setCost(totalCost);
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
      }}
    >
      <div class="team-info">
        <div>Points: {cost()}/30</div>
      </div>
      <div style={{ flex: 1 }}>
        <CharacterCard
          id="0"
          isPick={false}
          character={bans[0]}
          light_cone=""
          onCostChange={handleCostChange}
        ></CharacterCard>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ flex: 1 }}>
          <CharacterCard
            id="1"
            isPick={true}
            character={picks[0]}
            light_cone=""
            onCostChange={handleCostChange}
          ></CharacterCard>
        </div>
        <div style={{ flex: 1 }}>
          <CharacterCard
            id="2"
            isPick={true}
            character={picks[1]}
            light_cone=""
            onCostChange={handleCostChange}
          ></CharacterCard>
        </div>
      </div>
      <div>
        <CharacterCard
          id="3"
          isPick={false}
          character={bans[1]}
          light_cone=""
          onCostChange={handleCostChange}
        ></CharacterCard>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ flex: 1 }}>
          <CharacterCard
            id="4"
            isPick={true}
            character={picks[2]}
            light_cone=""
            onCostChange={handleCostChange}
          ></CharacterCard>
        </div>
        <div style={{ flex: 1 }}>
          <CharacterCard
            id="5"
            isPick={true}
            character={picks[3]}
            light_cone=""
            onCostChange={handleCostChange}
          ></CharacterCard>
        </div>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ flex: 1 }}>
          <CharacterCard
            id="6"
            isPick={true}
            character={picks[4]}
            light_cone=""
            onCostChange={handleCostChange}
          ></CharacterCard>
        </div>
        <div style={{ flex: 1 }}>
          <CharacterCard
            id="7"
            isPick={true}
            character={picks[5]}
            light_cone=""
            onCostChange={handleCostChange}
          ></CharacterCard>
        </div>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ flex: 1 }}>
          <CharacterCard
            id="8"
            isPick={true}
            character={picks[6]}
            light_cone=""
            onCostChange={handleCostChange}
          ></CharacterCard>
        </div>
        <div style={{ flex: 1 }}>
          <CharacterCard
            id="9"
            isPick={true}
            character={picks[7]}
            light_cone=""
            onCostChange={handleCostChange}
          ></CharacterCard>
        </div>
      </div>
    </div>
  );
};

export default Team;
