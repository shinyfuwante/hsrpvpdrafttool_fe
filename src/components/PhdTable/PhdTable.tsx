import { Component, createEffect } from "solid-js";
import {
  setCharJson,
  setLcJson,
  charJson,
  lcJson,
  version,
  ruleSet,
  setRuleSet,
} from "~/game/game_logic";
import styles from "./PhdTable.module.css";

const PhdTable: Component<{}> = (props) => {
  const fetchData = async () => {
    let response1 = await fetch(
      `/rule_sets/${ruleSet()}/characters.json?version=${version()}`
    );

    setCharJson(await response1.json());

    let response2 = await fetch(
      `/rule_sets/${ruleSet()}/light_cones.json?version=${version()}`
    );

    setLcJson(await response2.json());
  };
  createEffect(fetchData);
  const sumCosts = (point_costs: number[]) => {
    const sum = [];
    let runningSum = 0;
    for (const cost of point_costs) {
      runningSum += cost;
      sum.push(runningSum);
    }
    return sum;
  };
  const lcCosts = (name: string, point_costs: number[]) => {
    if (point_costs[0] == 0) {
      return <></>;
    }
    return (
      <>
        <td class={styles.data_name}>{name}</td>
        <td>{point_costs[0]}</td>
      </>
    );
  };
  const charTable = () => {
    return (
      <table class={`${styles.data_table}`}>
        <thead>
          <tr>
            <th>Character</th>
            <th>E0</th>
            <th>E1</th>
            <th>E2</th>
            <th>E3</th>
            <th>E4</th>
            <th>E5</th>
            <th>E6</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(charJson()).map(([charName, details]) => (
            <tr class={styles.body}>
              <td class={styles.data_name}>{charName}</td>
              {sumCosts(details.point_costs).map((cost) => (
                <td>{cost}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  const lcTable = () => {
    return (
      <table class={styles.data_table}>
        <thead>
          <tr>
            <th>Light Cone</th>
            <th>S1 Cost</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(lcJson()).map(([lcName, details]) => {
            if (details.point_costs[0] == 0) {
              return;
            }
            return (
              <tr class={styles.body}>
                {lcCosts(lcName, details.point_costs)};
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  fetchData();
  return (
    <div class={styles.tables}>
      <h1>Cost Tables</h1>
      <div>
        <label for="ruleSetSelection">Rule Set: </label>
        <select
          id="ruleSetSelection"
          onChange={(e) => {
            setRuleSet(e.target.value);
            fetchData();
          }}
          class={styles.rule_set_dropdown}
        >
          <option value={"phd_standard"}>PHD MoC 12</option>
          <option value={"claire_cup"}>Claire Cup</option>
        </select>
      </div>
      <h3> Characters </h3>
      {charTable()}
      <h3> Light Cones </h3>
      {lcTable()}
    </div>
  );
};

export default PhdTable;
