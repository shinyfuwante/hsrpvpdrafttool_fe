import { Component } from "solid-js";
import styles from "./MainMenu.module.css";

interface MainMenuProps {
  game_id: string;
  create_game: boolean;
  children: any;
}
const MainMenu: Component<MainMenuProps> = (props: any) => {
  const joinGame = () => {
    const game_id = props.game_id;
    const url = `/game/${game_id}`;
    window.location.href = url;
  };
  const soloGame = () => {
    const url = `/solo/game`;
    window.location.href = url;
  };
  return (
    <div>
      {props.children}
      <div class={styles.select_container}>
        <div 
        class = {styles.game_mode_select}>
          <div>
            Create a game for Screen-Share drafting (e.g. Discord, etc):
          </div>
          {/* <button onClick={() => soloGame()}>Create Solo Draft Game</button> */}
        </div>
        <div
        class = {styles.game_mode_select}>
          <div>Create a game for multiplayer lobby-style drafting:</div>
          {/* <button onClick={() => joinGame()}>Create Lobby Draft Game</button> */}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
