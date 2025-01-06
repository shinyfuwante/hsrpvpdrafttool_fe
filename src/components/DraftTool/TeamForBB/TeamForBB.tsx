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
  blueCost,
  redCost,
  setBlueCost,
  setRedCost,
  blueTeamName,
  redTeamName,
  ownTeam,
  turnOrder,
  turnIndex,
  isSinglePlayer,
  blueCostsMap,
  redCostsMap,
  totalCost,
} from "~/game/game_logic";
import styles from "./Team.module.css";
import { HalfBanCard } from "../BanCard/HalfBanCard";

export type TeamProps = {
  bansSignal: Accessor<CharacterBan[]>;
  picksSignal: Accessor<CharacterPick[]>;
  team: string;
  handleSigEid: (character: CharacterPick) => void;
};

const TeamForBB: Component<TeamProps> = (props) => {
  const team = props.team;
  const bansSignal = props.team === "blue_team" ? blueBans : redBans;
  const picksSignal = props.team === "blue_team" ? bluePicks : redPicks;
  const setCostSignal = props.team === "blue_team" ? setBlueCost : setRedCost;
  const teamName = props.team === "blue_team" ? blueTeamName : redTeamName;
  const cost = props.team === "blue_team" ? blueCost : redCost;
  const handleSigEid = props.handleSigEid;
  const costs = props.team === "blue_team" ? blueCostsMap : redCostsMap;
  const handleCostChange = (id: number, newCost: number) => {
    const oldCost = costs().get(id) || 0;
    if (newCost !== oldCost) {
      costs().set(id, newCost);
      const totalCost = Array.from(costs().values()).reduce((a, b) => a + b, 0);
      if (totalCost !== cost()) {
        setCostSignal(totalCost);
      }
    }
  };
  const blue_pick_index = [1, 3, 5, 8, 9, 12, 14, 16, 17, 20, 21, 23, 26, 27, 30];
  const red_pick_index = [2, 4, 6, 7, 10, 11, 13, 15, 18, 19, 22, 24, 25, 28, 29];
  const EmptyCharacterComponent = ({ id = 0, type = "" }) => {
    const order =
      team === "blue_team" ? blue_pick_index[id] : red_pick_index[id];
    let text = "";
    if (type == "ban") {
      text = "Banning...";
    } else {
      text = "Picking...";
    }
    return (
      <div
        class={`${styles.empty_card} ${
          turnOrder()[turnIndex()] &&
          turnOrder()[turnIndex()].id == id &&
          turnOrder()[turnIndex()].action == type &&
          turnOrder()[turnIndex()].team == team
            ? styles.current_pick
            : ""
        } ${type == "ban" ? styles.ban : styles.pick}`}
      >
        {text} ({order})
      </div>
    );
  };
  return (
    <div
      style={{
        border:
          team === ownTeam() && !isSinglePlayer ? "10px solid yellow" : "none",
      }}
      class={`${styles.team}`}
    >
      <div
        class={`${styles.team_header} ${
          team === "blue_team" ? styles.blue_team : styles.red_team
        }`}
      >
        <div>{teamName()} </div>
      </div>
      <div class={styles.team_row}>
        <div style={{ flex: 1 }}>
          <Show
            when={bansSignal()[0]}
            fallback={<EmptyCharacterComponent id={0} type={"ban"} />}
          >
            <HalfBanCard character={bansSignal()[0]} />
          </Show>
        </div>
        <div style={{ flex: 1 }}>
          <Show
            when={bansSignal()[1]}
            fallback={<EmptyCharacterComponent id={1} type={"ban"} />}
          >
            <HalfBanCard character={bansSignal()[1]} />
          </Show>
        </div>
      </div>
      <div class={styles.team_row}>
        <div style={{ flex: 1 }}>
          <Show
            when={picksSignal()[0]}
            fallback={<EmptyCharacterComponent id={2} type={"pick"} />}
          >
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
          <Show
            when={picksSignal()[1]}
            fallback={<EmptyCharacterComponent id={3} type={"pick"} />}
          >
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
      <div class={styles.team_row}>
        <div style={{ flex: 1 }}>
          <Show
            when={picksSignal()[2]}
            fallback={<EmptyCharacterComponent id={4} type={"pick"} />}
          >
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
          <Show
            when={picksSignal()[3]}
            fallback={<EmptyCharacterComponent id={5} type={"pick"} />}
          >
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
      <div class={styles.team_row}>
        <div style={{ flex: 1 }}>
          <Show
            when={picksSignal()[4]}
            fallback={<EmptyCharacterComponent id={6} type={"pick"} />}
          >
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
      </div>
      <div class={styles.ban_row}>
        <Show
          when={bansSignal()[2]}
          fallback={<EmptyCharacterComponent id={7} type={"ban"} />}
        >
          <BanCard character={bansSignal()[2]} />
        </Show>
      </div>
      <div class={styles.team_row}>
        <div style={{ flex: 1 }}>
          <Show
            when={picksSignal()[5]}
            fallback={<EmptyCharacterComponent id={8} type={"pick"} />}
          >
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
      <div class={styles.team_row}>
        <div style={{ flex: 1 }}>
          <Show
            when={picksSignal()[6]}
            fallback={<EmptyCharacterComponent id={9} type={"pick"} />}
          >
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
          <Show
            when={picksSignal()[7]}
            fallback={<EmptyCharacterComponent id={10} type={"pick"} />}
          >
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
      <div class={styles.ban_row}>
        <Show
          when={bansSignal()[3]}
          fallback={<EmptyCharacterComponent id={11} type={"ban"} />}
        >
          <BanCard character={bansSignal()[3]} />
        </Show>
      </div>
      <div class={styles.team_row}>
        <div style={{ flex: 1 }}>
          <Show
            when={picksSignal()[8]}
            fallback={<EmptyCharacterComponent id={12} type={"pick"} />}
          >
            <CharacterCard
              id={6}
              character={picksSignal()[8]}
              signal={props.picksSignal}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          </Show>
        </div>
        <div style={{ flex: 1 }}>
          <Show
            when={picksSignal()[9]}
            fallback={<EmptyCharacterComponent id={13} type={"pick"} />}
          >
            <CharacterCard
              id={7}
              character={picksSignal()[9]}
              signal={props.picksSignal}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={team}
            />
          </Show>
        </div>
      </div>
      <div class={styles.ban_row}>
        <Show
          when={bansSignal()[4]}
          fallback={<EmptyCharacterComponent id={14} type={"ban"} />}
        >
          <BanCard character={bansSignal()[4]} />
        </Show>
      </div>
    </div>
  );
};

export default TeamForBB;
