import { Component, createSignal, Accessor, createMemo, Show } from "solid-js";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { BanCard } from "../BanCard/BanCard";
import { CharacterBan, CharacterPick } from "~/game/game_logic";

export type TeamProps = {
  bansSignal: Accessor<CharacterBan[]>;
  picksSignal: Accessor<CharacterPick[]>;
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
const Team: Component<TeamProps> = (props) => {
  const bansSignal = props.bansSignal;
  const picksSignal = props.picksSignal;
  const team = props.team;
  const handleSigEid = props.handleSigEid;
  const [cost, setCost] = createSignal(0);
  const costs = new Map();
  const picksSignalMemo = createMemo(() => {
    console.log("picks changed");
    return props.picksSignal();
  });
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
        <Show when={bansSignal()[0]} fallback={<EmptyCharacterComponent />}>
          <BanCard character={bansSignal()[0]} />
        </Show>
      </div>
      <div
        style={{
          display: "flex",
          "flex-direction": "row",
          border: "solid 2px grey",
        }}
      >
        <div style={{ flex: 1 }}>
          <Show
            when={picksSignalMemo()[0]}
            fallback={<EmptyCharacterComponent />}
          >
            <CharacterCard
              id={0}
              character={picksSignalMemo()[0]}
              picksSignal={picksSignal}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          </Show>
        </div>
        <div style={{ flex: 1 }}>
          <Show
            when={picksSignalMemo()[1]}
            fallback={<EmptyCharacterComponent />}
          >
            <CharacterCard
              id={1}
              character={picksSignalMemo()[1]}
              picksSignal={picksSignal}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          </Show>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <Show when={bansSignal()[1]} fallback={<EmptyCharacterComponent />}>
          <BanCard character={bansSignal()[1]} />
        </Show>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ flex: 1 }}>
          <Show
            when={picksSignalMemo()[2]}
            fallback={<EmptyCharacterComponent />}
          >
            <CharacterCard
              id={2}
              character={picksSignalMemo()[2]}
              picksSignal={picksSignal}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          </Show>
        </div>
        <div style={{ flex: 1 }}>
          <Show
            when={picksSignalMemo()[3]}
            fallback={<EmptyCharacterComponent />}
          >
            <CharacterCard
              id={3}
              character={picksSignalMemo()[3]}
              picksSignal={picksSignal}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          </Show>
        </div>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ flex: 1 }}>
          <Show
            when={picksSignalMemo()[4]}
            fallback={<EmptyCharacterComponent />}
          >
            <CharacterCard
              id={4}
              character={picksSignalMemo()[4]}
              picksSignal={picksSignal}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          </Show>
        </div>
        <div style={{ flex: 1 }}>
          <Show
            when={picksSignalMemo()[5]}
            fallback={<EmptyCharacterComponent />}
          >
            <CharacterCard
              id={5}
              character={picksSignalMemo()[5]}
              picksSignal={picksSignal}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          </Show>
        </div>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ flex: 1 }}>
          <Show
            when={picksSignalMemo()[6]}
            fallback={<EmptyCharacterComponent />}
          >
            <CharacterCard
              id={6}
              character={picksSignalMemo()[6]}
              picksSignal={picksSignal}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          </Show>
        </div>
        <div style={{ flex: 1 }}>
          <Show
            when={picksSignalMemo()[7]}
            fallback={<EmptyCharacterComponent />}
          >
            <CharacterCard
              id={7}
              character={picksSignalMemo()[7]}
              picksSignal={picksSignal}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          </Show>
        </div>
      </div>
    </div>
  );
};

export default Team;
