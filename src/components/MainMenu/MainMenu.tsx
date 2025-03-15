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
  const soloGame6Bans = () => {
    const url = `/solo/game_6_bans`;
    window.location.href = url;
  };
  const pokkeGame = () => {
    const url = `/solo/pokke`;
    window.location.href = url;
  };
  const pokkeSpecial = () => {
    const url = `/solo/pokke-special`;
    window.location.href = url;
  };
  const phd_11 = () => {
    const url = `/solo/phd_11`;
    window.location.href = url;
  };
  const mirrorCupGame = () => {
    const url = `/mirror_cup/game`;
    window.location.href = url;
  };
  const mirrorCupTestingTool = () => {
    const url = `/mirror_cup/testing`;
    window.location.href = url;
  };
  const testingTool = () => {
    const url = `/solo/testing`;
    window.location.href = url;
  };
  const phd_11_testing = () => {
    const url = `/solo/testing_11`;
    window.location.href = url;
  };
  const boulder_league = () => {
    const url = `/solo/boulder_league`;
    window.location.href = url;
  };
  const boulder_league_testing = () => {
    const url = `/solo/testing_boulder_league`;
    window.location.href = url;
  };
  const costs = () => {
    const url = `/solo/costs`;
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
          {/* <div onClick={() => soloGame6Bans()} class={styles.game_mode_select}>
            <div>
              BETA: Create a game for Screen-Share drafting with 6 bans (e.g.
              Discord, etc)
            </div>
          </div> */}
          <div onClick={() => joinGame()} class={styles.game_mode_select}>
            <div>Create a game for multiplayer lobby-style drafting (Possibly buggy)</div>
          </div>
          <div onClick={() => testingTool()} class={styles.supp_mode_select}>
            <div>PHD Points Testing Tool</div>
          </div>
          <div onClick={() => costs()} class={styles.supp_mode_select}>
            <div>PHD Costs Table</div>
          </div>
          {/* <div onClick={() => phd_11()} class={styles.game_mode_select}>
            <div>Create a Screen-Share draft for PHD's MoC 11 Balance</div>
          </div>
          <div onClick={() => phd_11_testing()} class={styles.supp_mode_select}>
            <div>PHD's MoC 11 Testing Tool</div>
          </div> */}
          <a href="https://discord.gg/Rb4PKm5aWn" class={styles.discord_link}>
            <img src="/discord.svg" alt="Discord Logo" />
            <div>Join the HSR PvP Server!</div>
          </a>
        </div>
        <div class={styles.server_container}>
          <div class={styles.other_formats}> Pokke PVP: </div>
          <div onClick={() => pokkeGame()} class={styles.game_mode_select}>
            <div>Create a Screen-Share draft for Pokke's format</div>
          </div>
          <div onClick={() => pokkeSpecial()} class={styles.game_mode_select}>
            <div>Create a Screen-Share draft for Pokke's Special format</div>
          </div>
          {/* <div onClick={() => mirrorCupGame()} class={styles.game_mode_select}>
            <div>Create a Screen-Share draft for the Mirror Cup format</div>
          </div>
          <div onClick={() => mirrorCupTestingTool()} class={styles.game_mode_select}>
            <div>Mirror Cup Points Testing Tool</div>
          </div> */}
        </div>
        <div class={styles.server_container}>
        <div class={styles.other_formats}> Boulder League: </div>
          {/* <div onClick={() => boulder_league()} class={styles.game_mode_select}>
            <div>Boulder League 3.0 Tourney</div>
          </div>
          <div
            onClick={() => boulder_league_testing()}
            class={styles.supp_mode_select}
          >
            <div>Boulder League Testing Tool</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
