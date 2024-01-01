import { Component, createSignal, Accessor, createEffect } from "solid-js";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { charJson } from "~/game/game_logic";

export type TeamProps = {
  bansSignal: Accessor<any[]>;
  picksSignal: Accessor<any[]>;
  color: string;
};

const Team: Component<TeamProps> = (props) => {
  const {bansSignal, picksSignal, color}  = props;
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
        "background-color": color,
      }}
    >
      <div class="team-info">
        <div>Points: {cost()}/30</div>
      </div>
      <div style={{ flex: 1 }}>
        {bansSignal()[0] ? (
          <CharacterCard
            id="0"
            isPick={false}
            character={bansSignal()[0]}
            light_cone=""
            onCostChange={handleCostChange}
          />
        ) : (
          <div style={{ width: "75px", height: "75px" }}></div>
        )}
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ flex: 1 }}>
          {picksSignal()[0] ? (
            <CharacterCard
              id="1"
              isPick={true}
              character={picksSignal()[0]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <div style={{ width: "75px", height: "75px" }}></div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          {picksSignal()[1] ? (
            <CharacterCard
              id="2"
              isPick={true}
              character={picksSignal()[1]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <div style={{ width: "75px", height: "75px" }}></div>
          )}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        {bansSignal()[1] ? (
          <CharacterCard
            id="3"
            isPick={false}
            character={bansSignal()[1]}
            light_cone=""
            onCostChange={handleCostChange}
          />
        ) : (
          <div style={{ width: "75px", height: "75px" }}></div>
        )}
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ flex: 1 }}>
          {picksSignal()[2] ? (
            <CharacterCard
              id="4"
              isPick={true}
              character={picksSignal()[2]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <div style={{ width: "75px", height: "75px" }}></div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          {picksSignal()[3] ? (
            <CharacterCard
              id="5"
              isPick={true}
              character={picksSignal()[3]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <div style={{ width: "75px", height: "75px" }}></div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ flex: 1 }}>
          {picksSignal()[4] ? (
            <CharacterCard
              id="6"
              isPick={true}
              character={picksSignal()[4]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <div style={{ width: "75px", height: "75px" }}></div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          {picksSignal()[5] ? (
            <CharacterCard
              id="7"
              isPick={true}
              character={picksSignal()[5]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <div style={{ width: "75px", height: "75px" }}></div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ flex: 1 }}>
          {picksSignal()[6] ? (
            <CharacterCard
              id="8"
              isPick={true}
              character={picksSignal()[6]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <div style={{ width: "75px", height: "75px" }}></div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          {picksSignal()[7] ? (
            <CharacterCard
              id="9"
              isPick={true}
              character={picksSignal()[7]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <div style={{ width: "75px", height: "75px" }}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
