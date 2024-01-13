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
  const [cost, setCost] = createSignal(0);

  const char = charJson()[character.name];
  const lcs = lcJson();
  const calculateCost = createMemo(() => {
    const lc = lcs[props.signal()[id].light_cone];
    if (lc && props.signal()[id].superimposition > 0) {
      setCost(
        char.point_costs[props.signal()[id].eidolon] +
          lc.point_costs[props.signal()[id].superimposition - 1]
      );
    } else {
      setCost(char.point_costs[props.signal()[id].eidolon]);
    }
    onCostChange(id, cost());
  });

  const handleSuperimpositionEidolonChange = () => {
    if (
      character.eidolon !== eidolon() ||
      character.superimposition !== superimposition() ||
      character.light_cone !== lightCone()
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
  };
  createEffect(() => {
    handleSuperimpositionEidolonChange();
    calculateCost();
  });
  const characterCard = createMemo(() => {
    const backgroundColor = char.rarity === 4 ? "purple" : "orange";
    return (
      <div class={styles.card_container}>
        <div
          class={styles.character_card}
          style={{
            "background-image": `url(/character_images/${char.id}.webp)`,
            "background-size": "cover",
            "background-position": "25% 25%",
            width: "100%",
            height: "75%",
            "min-height": "100px",
            flex: "1",
            "background-color": backgroundColor,
            position: "relative",
          }}
        >
          <div class={styles.cost}>+{cost()}</div>
        </div>
        <div class={styles.eidolon_sig}>
          <select
            value={props.signal()[id].eidolon}
            onChange={(e) => {
              setEidolon(Number(e.target.value));
            }}
            style={{ "max-width": "25%" }}
            disabled={isSinglePlayer() ? false : team !== ownTeam()}
          >
            {[...Array(7).keys()].map((value) => (
              <option value={value}>E{value}</option>
            ))}
          </select>
          <div
            style={{
              "max-width": "75%",
              display: "flex",
            }}
          >
            <input
              list="light-cones"
              value={props.signal()[id].light_cone}
              onBlur={(e) => {
                if (e.target.value !== lightCone()) {
                  setLightCone(e.target.value);
                }
              }}
              placeholder="LC"
              style={{ flex: 1 }}
              disabled={isSinglePlayer() ? false : team !== ownTeam()}
            />

            <datalist id="light-cones">
              {Object.keys(lcJson()).map((key) => (
                <option value={key}>{key}</option>
              ))}
            </datalist>
            <select
              value={props.signal()[id].superimposition}
              onChange={(e) => {
                setSuperimposition(Number(e.target.value));
              }}
              style={{ flex: 1 }}
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
