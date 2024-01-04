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
  return (
    <div>
      {props.children}
      <button onClick={() => joinGame()}>Create Game</button>
    </div>
  );
};

export default MainMenu;
