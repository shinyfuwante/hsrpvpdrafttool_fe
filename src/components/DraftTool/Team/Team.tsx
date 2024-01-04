import { Component, createSignal, Accessor, createEffect } from "solid-js";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { BanCard } from "../BanCard/BanCard";

export type TeamProps = {
  bansSignal: Accessor<any[]>;
  picksSignal: Accessor<any[]>;
  team: string;
};

const EmptyCharacterComponent = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "75%",
        display: "flex",
        "flex-direction": "column",
        "min-height": "150px",
        "background-color": "transparent",
        border: "1px solid grey",
      }}
    >
      <div></div>
      <div></div>
    </div>
  );
};
const Team: Component<TeamProps> = (props) => {
  const { bansSignal, picksSignal, team } = props;
  const [cost, setCost] = createSignal(0);
  const costs = new Map();
  const handleCostChange = (id: number, newCost: number) => {
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
        "background-color": team === "blue_team" ? "#0000FF" : "#FF0000",
      }}
    >
      <div class="team-info">
        <div>Points: {cost()}/30</div>
      </div>
      <div style={{ flex: 1 }}>
        {bansSignal()[0] ? (
          <BanCard character={bansSignal()[0]}/>
        ) : (
          <EmptyCharacterComponent />
        )}
      </div>
      <div
        style={{
          display: "flex",
          "flex-direction": "row",
          border: "solid 2px grey",
        }}
      >
        <div style={{ flex: 1 }}>
          {picksSignal()[0] ? (
            <CharacterCard
              id={0}
              character={picksSignal()[0]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <EmptyCharacterComponent />
          )}
        </div>
        <div style={{ flex: 1 }}>
          {picksSignal()[1] ? (
            <CharacterCard
              id={1}
              character={picksSignal()[1]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <EmptyCharacterComponent />
          )}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        {bansSignal()[1] ? (
          <BanCard character={bansSignal()[1]}/>
        ) : (
          <EmptyCharacterComponent />
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
              id={2}
              character={picksSignal()[2]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <EmptyCharacterComponent />
          )}
        </div>
        <div style={{ flex: 1 }}>
          {picksSignal()[3] ? (
            <CharacterCard
              id={3}
              character={picksSignal()[3]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <EmptyCharacterComponent />
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
              id={4}
              character={picksSignal()[4]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <EmptyCharacterComponent />
          )}
        </div>
        <div style={{ flex: 1 }}>
          {picksSignal()[5] ? (
            <CharacterCard
              id={5}
              character={picksSignal()[5]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <EmptyCharacterComponent />
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
              id={6}
              character={picksSignal()[6]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <EmptyCharacterComponent />
          )}
        </div>
        <div style={{ flex: 1 }}>
          {picksSignal()[7] ? (
            <CharacterCard
              id={7}
              character={picksSignal()[7]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <EmptyCharacterComponent />
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
