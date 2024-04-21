import { Component} from "solid-js";
import { lcJson } from "~/game/game_logic";
import { LightConeBan } from "~/game/game_logic";
import styles from "./LightConeBanCard.module.css";

interface LCBanCardProps {
  light_cone: LightConeBan;
}
export const LightConeBanCard: Component<LCBanCardProps> = ({ light_cone }) => {
  const lc = lcJson()[light_cone.name];
  return (
    <div
      class={styles.ban_card}
      style={{
        "background-image": `url(/light_cone_images/${lc.id}.webp)`,
      }}
    ></div>
  );
};

