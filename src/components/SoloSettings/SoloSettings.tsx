import { Component, createSignal } from "solid-js";
import {
  blueTeamName,
  redTeamName,
  setBlueTeamName,
  setRedTeamName,
} from "~/game/game_logic";
import styles from "./SoloSettings.module.css";

const SoloSettings: Component<{}> = (props) => {
  const roll = () => {
    return Math.floor(Math.random() * 100) + 1;
  };
  const [player1Name, setPlayer1Name] = createSignal("Team 1");
  const [player2Name, setPlayer2Name] = createSignal("Team 2");
  const [player1Roll, setPlayer1Roll] = createSignal(0);
  const [player2Roll, setPlayer2Roll] = createSignal(0);
  const updatePlayer1Name = (name: string) => {
    const old_name = player1Name();
    if (old_name == blueTeamName()) {
      setBlueTeamName(name);
    } else {
      setRedTeamName(name);
    }
    setPlayer1Name(name);
  };
  const updatePlayer2Name = (name: string) => {
    const old_name = player2Name();
    if (old_name == blueTeamName()) {
      setBlueTeamName(name);
    } else {
      setRedTeamName(name);
    }
    setPlayer2Name(name);
  }
  const determineBlueTeam = (name: string) => {
    if (player1Name() === name) {
      setBlueTeamName(player1Name());
      setRedTeamName(player2Name());
    } else {
      setBlueTeamName(player2Name());
      setRedTeamName(player1Name());
    }
  };

  return (
    <div class={styles.settings_menu}>
        <h3>Settings: </h3>
      <div>
        <div>
          <input
            type="text"
            placeholder="Team 1 Name"
            onChange={(e) => updatePlayer1Name(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="Team 2 Name"
            onChange={(e) => updatePlayer2Name(e.target.value)}
          ></input>
        </div>
        <div>
          <button onClick={() => setPlayer1Roll(roll())}>
            Roll for {player1Name()}
          </button>
        </div>
        <div>
          <button onClick={() => setPlayer2Roll(roll())}>
            Roll for {player2Name()}
          </button>
        </div>
      </div>
      <div>
        <div>
          <div>Team 1 Name: {player1Name()}</div>
          <div>Team 2 Name: {player2Name()}</div>
        </div>
        <div>
          <div>Team 1 Roll: {player1Roll()}</div>
          <div>Team 2 Roll: {player2Roll()}</div>
        </div>
        <div>
          Blue Team is:
          <input
            type="radio"
            id="player1"
            name="team"
            value={player1Name()}
            checked={true}
            onChange={(e) => determineBlueTeam(player1Name())}
          />
          <label for="player1">{player1Name()}</label>
          <input
            type="radio"
            id="player2"
            name="team"
            value={player2Name()}
            onChange={(e) => determineBlueTeam(player2Name())}
          />
          <label for="player2">{player2Name()}</label>
        </div>
      </div>
    </div>
  );
};

export default SoloSettings;
