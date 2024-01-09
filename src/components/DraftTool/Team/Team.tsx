import { Component, createSignal, Accessor, Show } from "solid-js";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { BanCard } from "../BanCard/BanCard";
import {
  CharacterBan,
  CharacterPick,
  redBans,
  redPicks,
  bluePicks,
  blueBans,
  setBlueCost,
  setRedCost
} from "~/game/game_logic";

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
        "min-height": "125px",
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
  const team = props.team;
  const bansSignal = props.team === "blue_team" ? blueBans : redBans;
  const picksSignal = props.team === "blue_team" ? bluePicks : redPicks;
  const setCostSignal = props.team === "blue_team" ? setBlueCost : setRedCost;
  const handleSigEid = props.handleSigEid;
  const [cost, setCost] = createSignal(0);
  const costs = new Map();
  const handleCostChange = (id: number, newCost: number) => {
    const oldCost = costs.get(id) || 0;
    if (newCost !== oldCost) {
      costs.set(id, newCost);
      const totalCost = Array.from(costs.values()).reduce((a, b) => a + b, 0);
      if (totalCost !== cost()) {
        setCost(totalCost);
        setCostSignal(totalCost);
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
      <div class="team-info"
      style = {{
        "text-align": "right",
        "font-size": "20pt",
      }}>
        <div> {cost()}/30</div>
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
          <Show when={picksSignal()[0]} fallback={<EmptyCharacterComponent />}>
            <CharacterCard
              id={0}
              character={picksSignal()[0]}
              signal={props.picksSignal}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          </Show>
        </div>
        <div style={{ flex: 1 }}>
          <Show when={picksSignal()[1]} fallback={<EmptyCharacterComponent />}>
            <CharacterCard
              id={1}
              character={picksSignal()[1]}
              signal={props.picksSignal}
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
          <Show when={picksSignal()[2]} fallback={<EmptyCharacterComponent />}>
            <CharacterCard
              id={2}
              character={picksSignal()[2]}
              signal={props.picksSignal}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          </Show>
        </div>
        <div style={{ flex: 1 }}>
          <Show when={picksSignal()[3]} fallback={<EmptyCharacterComponent />}>
            <CharacterCard
              id={3}
              character={picksSignal()[3]}
              signal={props.picksSignal}
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
          <Show when={picksSignal()[4]} fallback={<EmptyCharacterComponent />}>
            <CharacterCard
              id={4}
              character={picksSignal()[4]}
              signal={props.picksSignal}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          </Show>
        </div>
        <div style={{ flex: 1 }}>
          <Show when={picksSignal()[5]} fallback={<EmptyCharacterComponent />}>
            <CharacterCard
              id={5}
              character={picksSignal()[5]}
              signal={props.picksSignal}
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
          <Show when={picksSignal()[6]} fallback={<EmptyCharacterComponent />}>
            <CharacterCard
              id={6}
              character={picksSignal()[6]}
              signal={props.picksSignal}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          </Show>
        </div>
        <div style={{ flex: 1 }}>
          <Show when={picksSignal()[7]} fallback={<EmptyCharacterComponent />}>
            <CharacterCard
              id={7}
              character={picksSignal()[7]}
              signal={props.picksSignal}
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
