import { Component} from "solid-js";
import { charJson } from "~/game/game_logic";
import { CharacterBan, turnOrder, turn_order_2_bans } from "~/game/game_logic";
import styles from "./BanCard.module.css";

interface BanCardProps {
  character: CharacterBan;
}
export const BanCard: Component<BanCardProps> = ({ character }) => {
  const char = charJson()[character.name];
  const style = turnOrder() == turn_order_2_bans ? styles.ban_card : styles.ban_row_half;
  return (
    <div
      class={`${style}`}
      style={{
        "background-image": `url(/character_images/${char.id}.webp)`,
      }}
    ></div>
  );
};

