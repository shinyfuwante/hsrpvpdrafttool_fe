import { Title } from "solid-start";
import Counter from "~/components/Counter";
import MainMenu from "~/components/MainMenu/MainMenu";

export default function Home() {
  return (
    <main>
      <Title>HSR PVP Draft Tool</Title>
      <MainMenu>
        <h1>Welcome to the HSR PVP Draft Tool!</h1>
      </MainMenu>
    </main>
  );
}
