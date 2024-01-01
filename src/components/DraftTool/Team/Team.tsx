import { Component, createSignal } from "solid-js";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { charJson } from "~/game/game_logic";

export type TeamProps = {
  bans: string[];
  picks: string[];
  color: string;
};

const Team: Component<TeamProps> = (props) => {
  const { bans, picks, color } = props;
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
        {bans[0] ? (
          <CharacterCard
            id="0"
            isPick={false}
            character={bans[0]}
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
          {picks[0] ? (
            <CharacterCard
              id="1"
              isPick={true}
              character={picks[0]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <div style={{ width: "75px", height: "75px" }}></div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          {picks[1] ? (
            <CharacterCard
              id="2"
              isPick={true}
              character={picks[1]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <div style={{ width: "75px", height: "75px" }}></div>
          )}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        {bans[1] ? (
          <CharacterCard
            id="3"
            isPick={false}
            character={bans[1]}
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
          {picks[2] ? (
            <CharacterCard
              id="4"
              isPick={true}
              character={picks[2]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <div style={{ width: "75px", height: "75px" }}></div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          {picks[3] ? (
            <CharacterCard
              id="5"
              isPick={true}
              character={picks[3]}
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
          {picks[4] ? (
            <CharacterCard
              id="6"
              isPick={true}
              character={picks[4]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <div style={{ width: "75px", height: "75px" }}></div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          {picks[5] ? (
            <CharacterCard
              id="7"
              isPick={true}
              character={picks[5]}
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
          {picks[6] ? (
            <CharacterCard
              id="8"
              isPick={true}
              character={picks[6]}
              light_cone=""
              onCostChange={handleCostChange}
            />
          ) : (
            <div style={{ width: "75px", height: "75px" }}></div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          {picks[7] ? (
            <CharacterCard
              id="9"
              isPick={true}
              character={picks[7]}
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
