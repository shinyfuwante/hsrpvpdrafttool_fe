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
  const pokkeGame = () => {
    const url = `/solo/pokke`;
    window.location.href = url;
  };
  return (
    <div>
      {props.children}
      <div class={styles.select_container}>
        <div class={styles.server_container}>
          <div onClick={() => soloGame()} class={styles.game_mode_select}>
            <div>
              Create a game for Screen-Share drafting (e.g. Discord, etc)
            </div>
          </div>
          <div onClick={() => joinGame()} class={styles.game_mode_select}>
            <div>Create a game for multiplayer lobby-style drafting</div>
          </div>
          <a href="https://discord.gg/Rb4PKm5aWn" class={styles.discord_link}>
            <img src="/discord.svg" alt="Discord Logo"/>
            <div>Join the HSR PvP Server!</div>
          </a>
        </div>
        <div class={styles.server_container}>
          <div class={styles.other_formats}> Other Formats: </div>
          <div onClick={() => pokkeGame()} class={styles.game_mode_select}>
            <div>Create a Screen-Share draft for Pokke's format</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
