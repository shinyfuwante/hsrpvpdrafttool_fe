import { Component} from "solid-js";
import { charJson } from "~/game/game_logic";
import { CharacterBan } from "~/game/game_logic";

interface BanCardProps {
  character: CharacterBan;
}
export const BanCard: Component<BanCardProps> = ({ character }) => {
  const char = charJson()[character.name];
  return (
    <div
      style={{
        "background-image": `url(/character_images/${char.id}.webp)`,
        "background-color": "#D3D3D3",
        "max-width": "100%",
        height: "50%",
        "background-size": "cover",
        "background-position": "30% 30%",
        filter: "grayscale(100%)",
        "min-height": "125px",
        border: "1px solid grey",
      }}
    ></div>
  );
};

