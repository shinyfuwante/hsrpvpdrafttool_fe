import { Component } from "solid-js";
import { Title } from "solid-start";

// TODO fix any props?
const MainMenu: Component<{}> = (props: any) => {
  // game_id
  const create_game: boolean = props.create || true;

  const joinGame = () => {
    const game_id = props.game_id;
    const url = `/game/${game_id}}`;
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
