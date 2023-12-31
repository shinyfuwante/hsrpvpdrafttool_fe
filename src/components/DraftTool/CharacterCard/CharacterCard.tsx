import { Component, createSignal, createEffect, createMemo } from "solid-js";
import { charJson, lcJson } from "~/game/game_logic";

interface CharacterCardProps {
  id: string;
  isPick: boolean;
  character: string;
  light_cone: string;
  onCostChange: (id: string, cost: number) => void;
}

export const CharacterCard: Component<CharacterCardProps> = ({
  id,
  isPick,
  character,
  light_cone = "",
  onCostChange,
}) => {
  const char = charJson()[character];
  const lcs = lcJson();
  const characterCard = createMemo(() => {
    if (isPick) {
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
        createEffect(calculateCost);
    
        const backgroundColor = char.rarity === 4 ? "purple" : "orange";
        // it's a pick
        return (
          <>
            <div
              style={{
                "background-image": `url(/character_images/${char.id}.webp)`,
                "background-size": "cover",
                "background-position": "25% 25%",
                width: "100%",
                height: "75%",
                "min-height": "125px",
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
                style={{ width: "45%" }}
              >
                {[...Array(7).keys()].map((value) => (
                  <option value={value}>E{value}</option>
                ))}
              </select>
              <div
                style={{
                  width: "45%",
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
                  placeholder="Search light_cone"
                />
    
                <datalist id="light-cones">
                  {Object.keys(lcJson()).map((key) => (
                    <option value={key}>{key}</option>
                  ))}
                </datalist>
                <select
                  value={superimposition()}
                  onInput={(e) => setSuperimposition(Number(e.target.value))}
                  style={{ width: "50%" }}
                >
                  {[...Array(5).keys()].map((value) => (
                    <option value={value + 1}>S{value + 1}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        );
      } else {
        // it's a ban
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
              "min-height": "100px",
            }}
          ></div>
        );
      }
  });
  return (
    <div
      style={{
        border: "2px solid grey",
      }}
    >
      {characterCard()}
    </div>
  );
};
