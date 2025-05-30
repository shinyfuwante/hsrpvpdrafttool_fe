import { Component} from "solid-js";
import { charJson } from "~/game/game_logic";
import { CharacterBan, turnOrder, turn_order_2_bans } from "~/game/game_logic";
import styles from "./BanCard.module.css";

interface BanCardProps {
  character: CharacterBan;
}
export const HalfBanCard: Component<BanCardProps> = ({ character }) => {
  const char = charJson()[character.name];
  return (
    <div
      class={`${styles.ban_row_half}`}
      style={{
        "background-image": `url(/character_images/${char.id}.webp)`,
      }}
    ></div>
  );
};

