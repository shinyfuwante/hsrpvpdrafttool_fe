import {
  Component,
  createSignal,
  createEffect,
  createMemo,
  Accessor,
} from "solid-js";
import {
  charJson,
  lcJson,
  CharacterPick,
  ownTeam,
  isSinglePlayer,
  calcCost,
} from "~/game/game_logic";

import styles from "./CharacterCard.module.css";

interface CharacterCardProps {
  id: number;
  character: CharacterPick;
  onCostChange: (id: number, cost: number) => void;
  handleSigEid: (character: CharacterPick) => void;
  signal: Accessor<CharacterPick[]>;
  team: string;
}

export const CharacterCard: Component<CharacterCardProps> = (props) => {
  const id = props.id;
  const onCostChange = props.onCostChange;
  const handleSigEid = props.handleSigEid;
  const team = props.team;
  const character = props.character;
  const [eidolon, setEidolon] = createSignal(character.eidolon);
  const [superimposition, setSuperimposition] = createSignal(
    character.superimposition
  );
  const [lightCone, setLightCone] = createSignal(character.light_cone);
  const [cost, setCost] = createSignal(calcCost(props.signal()[id]));
  
  let prevEid = character.eidolon;
  let prevLightCone = character.light_cone;
  let prevSuper = character.superimposition;

  const char = charJson()[character.name];
  const handleSuperimpositionEidolonChange = () => {
    if (
      prevEid !== eidolon() ||
      prevSuper !== superimposition() ||
      prevLightCone !== lightCone()
    ) {
      const pick: CharacterPick = {
        name: character.name,
        light_cone: lightCone(),
        eidolon: eidolon(),
        superimposition: superimposition(),
        index: id,
        team: team,
      };
      if (
        props.signal()[id].eidolon !== eidolon() ||
        props.signal()[id].superimposition !== superimposition() ||
        props.signal()[id].light_cone !== lightCone()
      ) {
        handleSigEid(pick);
      }
    }
    setCost(calcCost(props.signal()[id]) || 0);
    onCostChange(id, cost());
  };
  createEffect(() => {
    handleSuperimpositionEidolonChange();
  });
  const characterCard = createMemo(() => {
    const backgroundColor = char.rarity === 4 ? "#702985" : "#EFAF0B";
    return (
      <div class={styles.card_container}>
        <div
          class={styles.character_card}
          style={{
            "background-image": `url(/character_images/${char.id}.webp)`,
            "background-color": backgroundColor,
          }}
        >
          <div class={styles.cost}>+{cost()}</div>
        </div>
        <div class={styles.eidolon_sig}>
          <select
            value={props.signal()[id].eidolon}
            onInput={(e) => {
              prevEid = eidolon();
              setEidolon(Number(e.target.value));
              handleSuperimpositionEidolonChange();
            }}
            style={{ "max-width": "100%" }}
            disabled={isSinglePlayer() ? false : team !== ownTeam()}
          >
            {[...Array(7).keys()].map((value) => (
              <option value={value}>E{value}</option>
            ))}
          </select>
          <div
            style={{
              "max-width": "100%",
              display: "flex",
            }}
          >
            <input
              list="light-cones"
              value={props.signal()[id].light_cone}
              onBlur={(e) => {
                if (e.target.value !== lightCone()) {
                  prevLightCone = lightCone();
                  setLightCone(e.target.value);
                  handleSuperimpositionEidolonChange();
                }
              }}
              placeholder="Light Cone"
              style={{ flex: 1 }}
              disabled={isSinglePlayer() ? false : team !== ownTeam()}
            />

            <datalist id="light-cones">
              {Object.keys(lcJson()).map((key) => (
                <>
                <option value={key}>{lcJson()[key].character || key}</option>
                </>
              ))}
            </datalist>
            <select
              value={props.signal()[id].superimposition || 1}
              onInput={(e) => {
                prevSuper = superimposition();
                setSuperimposition(Number(e.target.value));
                handleSuperimpositionEidolonChange();
              }}
              style={{ "max-width": "30%" }}
              disabled={isSinglePlayer() ? false : team !== ownTeam()}
            >
              {[...Array(5).keys()].map((value) => (
                <option value={value + 1}>S{value + 1}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  });
  return characterCard();
};
