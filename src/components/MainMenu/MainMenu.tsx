import { Component } from "solid-js";
import { Title } from "solid-start";

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
      <div 
      style = {{
        "display": "flex",
        "flex-direction": "row",
        "justify-content": "space-evenly",
        "align-content": "center",
      }}>
        <div>
          <div>
            To create a game for Screen-Share drafting (e.g. Discord, etc):
          </div>
          <button onClick={() => soloGame()}>Create Solo Draft Game</button>
        </div>
        <div>
          <div>To create a game for multiplayer lobby-style drafting:</div>
          <button onClick={() => joinGame()}>Create Lobby Draft Game</button>
          <div>
            (Note: the player who selects side will be randomly selected.)
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
