import { Component, createEffect, createSignal } from "solid-js";
import Roster from "~/components/DraftTool/Roster/Roster";
import {
  CharacterPick,
  setIsSinglePlayer,
  setRuleSet,
  ruleSet,
  version,
  setCharJson,
  setLcJson,
  setTurnOrder,
  totalCost,
} from "~/game/game_logic";
import { CharacterCard } from "~/components/DraftTool/CharacterCard/CharacterCard";
import styles from "./testing.module.css";

const testing: Component<{}> = (props) => {
  const EmptyCharacterComponent = ({ id = 0, type = "" }) => {
    return (
      <div class={`${styles.empty_card}`}>
        <div>Picking...</div>
      </div>
    );
  };
  const fetchData = async () => {
    console.log(ruleSet());
    let response1 = await fetch(
      `/rule_sets/${ruleSet()}/characters.json?version=${version()}`
    );
    // if response fails, fetch phd_standard characters.json
    if (!response1.ok) {
      try {
        response1 = await fetch(
          `/rule_sets/phd_standard/characters.json?version=${version()}`
        );
      } catch (e) {
        console.log(e);
      }
    }
    setCharJson(await response1.json());

    let response2 = await fetch(
      `/rule_sets/${ruleSet()}/light_cones.json?version=${version()}`
    );
    if (!response2.ok) {
      try {
        response2 = await fetch(
          `/rule_sets/phd_standard/light_cones.json?version=${version()}`
        );
      } catch (e) {
        console.log(e);
      }
    }
    setLcJson(await response2.json());
  };
  fetchData();
  setIsSinglePlayer(true);
  setRuleSet("phd_standard");
  const [picks, setPicks] = createSignal<CharacterPick[]>([]);
  const [cost, SetCost] = createSignal<number>(0);
  const [costsMap, setCostsMap] = createSignal(new Map());
  const handlePick = (character: CharacterPick) => {
    if (picks().length >= 4) {
      return;
    }
    setPicks([...picks(), character]);
    console.log(picks());
  };
  const handleReset = () => {
    setPicks([]);
    setCostsMap(new Map());
    SetCost(0);
  };
  const handleUndo = () => {
    SetCost(cost() - costsMap().get(picks().length - 1));
    costsMap().set(picks().length - 1, 0);
    setPicks(picks().slice(0, picks().length - 1));
  };
  const handleBan = () => {
    console.log("Ban");
  };
  const turn_order = [
    { team: "blue_team", action: "pick", id: 0 },
    { team: "blue_team", action: "pick", id: 1 },
    { team: "blue_team", action: "pick", id: 2 },
    { team: "blue_team", action: "pick", id: 3 },
  ];
  const handleCostChange = (id: number, newCost: number) => {
    costsMap().set(id, newCost);
    let totalCost = 0;
    costsMap().forEach((cost) => {
      totalCost += cost;
    });
    SetCost(totalCost);
  };
  const handleSigEid = (character: CharacterPick) => {
    const setPicksSignal = setPicks;
    const picksArray = [...picks()];
    if (picksArray[character.index] != character) {
      picksArray[character.index] = character;
      setPicksSignal(picksArray);
    }
    return;
  };

  const Calculator = () => {
    // input for inputting cycles
    const [cycles, setCycles] = createSignal(0);
    const [efficiency, setEfficiency] = createSignal(0);
    const [adjustedEfficiency, setAdjustedEfficiency] = createSignal(0);
    const [efficiencyAdjustment, setEfficiencyAdjustment] = createSignal(0);

    createEffect(() => {
      setEfficiency(cost() / 6 + cycles());
      setEfficiencyAdjustment(cost() != 0 ? (cost() - 15) / 4 : 0);
      setAdjustedEfficiency(efficiency() + efficiencyAdjustment());
    });

    return (
      <div class={styles.calculator}>
        <div class={styles.calculator_top}>
          <div class={styles.calculator_title}>Efficiency Calc: </div>
          <div class={styles.calculator_info}>
            Team Efficiency is calculated as:
            <div class={styles.results}>(Cost / 6) + Clear Speed</div>
            Adjusted Efficiency is calculated as:
            <div class={styles.results}>Team Efficiency + (Cost - 15) / 4</div>
            Teams are graded by efficiency as follows:
            <div class={styles.results}>
              <div class={styles.too_efficient}>too efficient</div>
              <div class={styles.efficient}>efficient</div>
              <div class={styles.inefficient}>inefficient</div>
            </div>
          </div>
          <div>
            <label for="cycles">Clear Speed: </label>
            <input
              class={styles.clear_speed}
              type="number"
              onChange={(e) => setCycles(Number(e.target.value))}
              placeholder="Cycle Speed"
            />
          </div>
        </div>
        <div class={styles.results}>
          <div> Cycles Taken: {cycles()}</div>
          <div> Cost: {cost()}</div>
          <div
            class={`${
              efficiency() > 6
                ? styles.inefficient
                : efficiency() < 4
                ? styles.too_efficient
                : styles.efficient
            }`}
          >
            {" "}
            Team Efficiency: {efficiency().toPrecision(4)}
          </div>
          <div
            class={`${
                adjustedEfficiency() > 6
                ? styles.inefficient
                : adjustedEfficiency() < 4
                ? styles.too_efficient
                : styles.efficient
            }`}
          >
            {" "}
            Adjusted Efficiency: {adjustedEfficiency().toPrecision(4)}
          </div>
        </div>
      </div>
    );
  };

  setTurnOrder(turn_order);
  return (
    <div class={styles.container}>
      <div class={styles.team}>
        <div
          class={`${cost() > 30 ? styles.over_30 : styles.under_30} ${
            styles.header
          }`}
        >
          Cost: {cost()}/{totalCost()}
        </div>
        {Array.from({ length: 4 }).map((_, i) =>
          picks()[i] ? (
            <CharacterCard
              id={i}
              character={picks()[i]}
              signal={picks}
              onCostChange={handleCostChange}
              handleSigEid={handleSigEid}
              team={"blue_team"}
            />
          ) : (
            <div class={styles.empty_card}>
              <EmptyCharacterComponent />
            </div>
          )
        )}
      </div>
      <Calculator />
      <div>
        <Roster
          handleBan={handleBan}
          handlePick={handlePick}
          handleReset={handleReset}
          handleUndo={handleUndo}
        />
      </div>
    </div>
  );
};

export default testing;
