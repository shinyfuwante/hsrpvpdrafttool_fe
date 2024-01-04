import { Component, createSignal, createEffect, createMemo } from "solid-js";
import { charJson, lcJson, CharacterPick } from "~/game/game_logic";

interface CharacterCardProps {
  id: number;
  character: string;
  light_cone: string;
  onCostChange: (id: number, cost: number) => void;
  handleSigEid: (character: CharacterPick) => void;
}

export const CharacterCard: Component<CharacterCardProps> = ({
  id,
  character,
  light_cone = "",
  onCostChange,
  handleSigEid
}) => {
  const char = charJson()[character];
  const lcs = lcJson();
  const characterCard = createMemo(() => {
    const [eidolon, setEidolon] = createSignal(0);
    const [superimposition, setSuperimposition] = createSignal(1);
    const [lightCone, setLightCone] = createSignal(light_cone);
    const calculateCost = () => {
      const lc = lcs[lightCone()];
      let cost;
      if (lc) {
        cost =
          char.point_costs[eidolon()] + lc.point_costs[superimposition() - 1];
      } else {
        cost = char.point_costs[eidolon()];
      }
      onCostChange(id, cost);
    };
    const handleSuperimpositionEidolonChange = () => {
      const pick: CharacterPick = {
        name: character,
        light_cone: lightCone(),
        eidolon: eidolon(),
        superimposition: superimposition(),
        index: id,
      };
      calculateCost();
    };
    createEffect(calculateCost);
    createEffect;

    const backgroundColor = char.rarity === 4 ? "purple" : "orange";
    // it's a pick
    return (
      <div
        style={{
          "min-height": "150px",
          display: "flex",
          "flex-direction": "column",
        }}
      >
        <div
          style={{
            "background-image": `url(/character_images/${char.id}.webp)`,
            "background-size": "cover",
            "background-position": "25% 25%",
            width: "100%",
            height: "75%",
            "min-height": "125px",
            flex: "1",
            "background-color": backgroundColor,
          }}
        ></div>
        <div
          style={{
            display: "flex",
            width: "100%",
            "justify-content": "space-between",
            "background-color": "darkgrey",
          }}
        >
          <select
            value={eidolon()}
            onInput={(e) => setEidolon(Number(e.target.value))}
            style={{ "max-width": "25%" }}
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
              value={lightCone()}
              onInput={(e) => {
                if (e.target.value !== lightCone()) {
                  setLightCone(e.target.value);
                }
              }}
              placeholder="LC"
              style={{ flex: 1 }}
            />

            <datalist id="light-cones">
              {Object.keys(lcJson()).map((key) => (
                <option value={key}>{key}</option>
              ))}
            </datalist>
            <select
              value={superimposition()}
              onInput={(e) => setSuperimposition(Number(e.target.value))}
              style={{ flex: 1 }}
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
  return (
    <div
      style={{
        border: "1px solid grey",
      }}
    >
      {characterCard()}
    </div>
  );
};
