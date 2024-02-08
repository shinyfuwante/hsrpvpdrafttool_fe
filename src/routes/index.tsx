import { Title } from "solid-start";
import {v4} from "uuid";
import MainMenu from "~/components/MainMenu/MainMenu";

export default function Home() {
  const game_id = v4();
  return (
    <main>
      <Title>HSR PVP Draft Tool</Title>
      <MainMenu game_id={game_id} create_game={true}>
        <h1>HSR PVP Draft Tool!</h1>
      </MainMenu>
    </main>
  );
}
