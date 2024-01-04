import { Component} from "solid-js";
import { charJson } from "~/game/game_logic";

interface BanCardProps {
  character: string;
}
export const BanCard: Component<BanCardProps> = ({ character }) => {
  const char = charJson()[character];
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
        "min-height": "150px",
        border: "1px solid grey",
      }}
    ></div>
  );
};

