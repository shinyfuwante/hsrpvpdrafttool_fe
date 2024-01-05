import { Component, createSignal, Accessor, createEffect } from "solid-js";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { BanCard } from "../BanCard/BanCard";
import { CharacterPick } from "~/game/game_logic";

export type TeamProps = {
  bansSignal: Accessor<any[]>;
  picksSignal: Accessor<any[]>;
  team: string;
  handleSigEid: (character: CharacterPick) => void;
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
const Team: Component<TeamProps> = ({
  bansSignal,
  picksSignal,
  team,
  handleSigEid,
}) => {
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
  const [picks, setPicks] = createSignal(picksSignal());
  createEffect(() => {
    setPicks(picksSignal());
  })
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
          <BanCard character={bansSignal()[0]} />
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
          {picks()[0] ? (
            <CharacterCard
              id={0}
              character={picks()[0]}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          ) : (
            <EmptyCharacterComponent />
          )}
        </div>
        <div style={{ flex: 1 }}>
          {picks()[1] ? (
            <CharacterCard
              id={1}
              character={picks()[1]}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          ) : (
            <EmptyCharacterComponent />
          )}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        {bansSignal()[1] ? (
          <BanCard character={bansSignal()[1]} />
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
          {picks()[2] ? (
            <CharacterCard
              id={2}
              character={picks()[2]}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          ) : (
            <EmptyCharacterComponent />
          )}
        </div>
        <div style={{ flex: 1 }}>
          {picks()[3] ? (
            <CharacterCard
              id={3}
              character={picks()[3]}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
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
          {picks()[4] ? (
            <CharacterCard
              id={4}
              character={picks()[4]}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          ) : (
            <EmptyCharacterComponent />
          )}
        </div>
        <div style={{ flex: 1 }}>
          {picks()[5] ? (
            <CharacterCard
              id={5}
              character={picks()[5]}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
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
          {picks()[6] ? (
            <CharacterCard
              id={6}
              character={picks()[6]}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          ) : (
            <EmptyCharacterComponent />
          )}
        </div>
        <div style={{ flex: 1 }}>
          {picks()[7] ? (
            <CharacterCard
              id={7}
              character={picks()[7]}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
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
