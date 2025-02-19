import {
  Component,
  createSignal,
  createEffect,
  createMemo,
  Accessor,
  Show,
} from "solid-js";
import {
  charJson,
  lcJson,
  CharacterPick,
  ownTeam,
  isSinglePlayer,
  calcCost,
  testingTool,
  turnOrder,
  turn_order_bb,
  formatDecimal,
  ruleSet
} from "~/game/game_logic";

import styles from "./CharacterCard.module.css";
import testing from "~/routes/solo/testing";

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
  const num_picked = character.num_picked;
  const [eidolon, setEidolon] = createSignal(character.eidolon);
  const [superimposition, setSuperimposition] = createSignal(
    character.superimposition
  );
  const [lightCone, setLightCone] = createSignal(character.light_cone);
  const [cost, setCost] = createSignal(calcCost(props.signal()[id]));

  const [editedCharCost, setEditedCharCost] = createSignal(
    props.character.char_mod || 0
  );
  const [editedLCCost, setEditedLCCost] = createSignal(
    props.character.lc_mod || 0
  );
  const [editedCost, setEditedCost] = createSignal(
    cost() + editedCharCost() + editedLCCost()
  );

  const exceededLCCap = () => {
    if (ruleSet() != "pokke") {
      return false;
    }
    let numSigs = 0;
    props.signal().map( (pick) => {
      if (pick.light_cone && lcJson()[pick.light_cone] && lcJson()[pick.light_cone].rarity == 5) {
        numSigs += 1;
      }
    })
    return numSigs > 4;
  }
  
  let prevEid = character.eidolon;
  let prevLightCone = character.light_cone;
  let prevSuper = character.superimposition;

  const char = charJson()[character.name];
  const handleSuperimpositionEidolonChange = () => {
    if (
      prevEid !== eidolon() ||
      prevSuper !== superimposition() ||
      prevLightCone !== lightCone() ||
      testingTool()
    ) {
      const pick: CharacterPick = {
        name: character.name,
        light_cone: lightCone(),
        eidolon: eidolon(),
        superimposition: superimposition(),
        index: id,
        team: team,
        num_picked: num_picked,
        char_mod: editedCharCost(),
        lc_mod: editedLCCost(),
      };
      if (
        props.signal()[id].eidolon !== eidolon() ||
        props.signal()[id].superimposition !== superimposition() ||
        props.signal()[id].light_cone !== lightCone() 
      ) {
        handleSigEid(pick);
      } else if (testingTool()) {
        if (props.signal()[id].char_mod != editedCharCost() || props.signal()[id].lc_mod != editedLCCost()) {
          handleSigEid(pick);
        } 
      }
    }
    if (testingTool()) {
      setCost(calcCost(props.signal()[id]) + editedCost() || 0);
    } else {
      setCost(formatDecimal(calcCost(props.signal()[id])) || 0);
    }
    onCostChange(id, cost());
  };
  createEffect(() => {
    handleSuperimpositionEidolonChange();
    setEditedCost(editedCharCost() + editedLCCost());
  });
  const characterCard = createMemo(() => {
    const backgroundColor = char.rarity === 4 ? "#764585" : "#e6b741";
    return (
      <div class={styles.card_container}>
        <div
          class={styles.character_card}
          style={{
            "background-image": `url(/character_images/${char.id}.webp)`,
            "background-color": backgroundColor,
          }}
        >
          <Show when={testingTool()}>
            <div class={`${styles.tt_modifier}`}>
              <div class={`${styles.tt_label_char} ${styles.tt_label}`}>Character</div>
              <input
                type="text"
                onChange={(e) => {
                  setEditedCharCost(Number(e.target.value));
                  handleSuperimpositionEidolonChange();
                }}
                class={styles.tt_char_cost}
                value={editedCharCost()}
                inputmode="numeric"
              ></input>
            </div>
          </Show>
          <Show when={testingTool()}>
            <div class={`${styles.tt_modifier} ${styles.tt_label_lc}`}>
              <div class={`${styles.tt_label_lc} ${styles.tt_label}`}>LC</div>
              <input
                type="text"
                onChange={(e) => {
                  setEditedLCCost(Number(e.target.value));
                  handleSuperimpositionEidolonChange();
                }}
                class={styles.tt_lc_cost}
                value={editedLCCost()}
                inputmode="numeric"
              ></input>
            </div>
          </Show>
          <Show when={turnOrder() != turn_order_bb}>
            <div class={styles.cost}>+{cost()}</div>
          </Show>
          <Show when={testingTool()}>
            <div>
              <input
                type="button"
                onClick={(e) => {
                  setEditedCharCost(0);
                  setEditedLCCost(0);
                  handleSuperimpositionEidolonChange();
                }}
                class={styles.tt_reset_button}
                value={"Reset Cost"}
              ></input>
            </div>
          </Show>
        </div>
        <div class={styles.eidolon_sig}>
          <select
            value={props.signal()[id].eidolon}
            onInput={(e) => {
              prevEid = eidolon();
              setEidolon(Number(e.target.value));
              handleSuperimpositionEidolonChange();
            }}
            class={styles.eidolon_select}
            disabled={isSinglePlayer() ? false : team !== ownTeam()}
          >
            {[...Array(7).keys()].map((value) => (
              <option value={value}>E{value}</option>
            ))}
          </select>
          <div class={styles.light_cone_container}>
            <input
              list="light-cones"
              class={`${styles.light_cone_input} ${exceededLCCap() && lcJson()[lightCone()] && lcJson()[lightCone()].rarity == 5   ? styles.light_cone_input_warning : ''}`}
              value={props.signal()[id].light_cone}
              onBlur={(e) => {
                if (e.target.value !== lightCone()) {
                  prevLightCone = lightCone();
                  setLightCone(e.target.value);
                  handleSuperimpositionEidolonChange();
                }
              }}
              placeholder="Light Cone"
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
              class={styles.superimposition_select}
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
