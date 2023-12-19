import { Component } from "solid-js";
import { Title } from "solid-start";

// TODO fix any props? 
const MainMenu: Component<{}> = (props: any) => {
  return (
    <div>
        {props.children}
      <button>Create Game</button>
    </div>
  );
};

export default MainMenu;
