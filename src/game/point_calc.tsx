import {
  player1Name,
  player2Name,
} from "~/components/SoloSettings/SoloSettings";
import {
  ruleSet,
  blueCost,
  redCost,
  initiativeWinner,
  draftOrder,
  CharacterBan,
  CharacterPick,
  charJson,
  lcJson,
  player1Roll,
  player2Roll,
  setInitiativeWinner,
  blueTeamName,
  redTeamName,
  applyTimerPenalty,
  blueTimePenalty,
  redTimePenalty,
} from "./game_logic";
import { Setter } from "solid-js";

export const calculateBonusCycles = (points: number) => {
  if (points < 30) {
    return (points - 30) / 6;
  } else {
    return (points - 30) / 4;
  }
};
const determineInitiativeWinner = () => {
  if (player1Roll() > player2Roll()) {
    if (player1Name() == blueTeamName()) {
      setInitiativeWinner("blue_team");
    } else {
      setInitiativeWinner("red_team");
    }
  } else {
    if (player2Name() == redTeamName()) {
      setInitiativeWinner("red_team");
    } else {
      setInitiativeWinner("blue_team");
    }
  }
};
export const calculateScore = (
  points: number,
  deaths: number,
  p1Cycles: number,
  p2Cycles: number
) => {
  determineInitiativeWinner();
  if (ruleSet() == "pokke") {
    return p1Cycles + p2Cycles;
  }
  const bonusCycles = calculateBonusCycles(points + deaths);
  const score = p1Cycles + p2Cycles + bonusCycles;

  return score;
};

export const encodeString = async (
  blue1Cycles: number,
  blue2Cycles: number,
  red1Cycles: number,
  red2Cycles: number,
  blueDeaths: number,
  redDeaths: number,
  setCopied: Setter<boolean>
) => {
  let encodedString = "";
  const cjson = charJson();
  const lcjson = lcJson();
  draftOrder().map((char) => {
    if ((char as CharacterPick).eidolon != undefined) {
      const lc_name = (char as CharacterPick).light_cone;
      let superimp_num = 0;
      const lc = lcjson[lc_name];
      if (lc && lc.rarity == 5 && (!lc.free || lc.character)) {
        superimp_num = (char as CharacterPick).superimposition;
      }
      encodedString += `${cjson[char.name].code}${
        (char as CharacterPick).eidolon
      }${superimp_num}`;
    } else {
      // it's a ban, just append
      encodedString += cjson[char.name].code;
    }
  });
  // add cycle nums
  encodedString += String(Math.min(15, blue1Cycles)).padStart(2, "0");
  encodedString += String(Math.min(15, blue2Cycles)).padStart(2, "0");
  encodedString += String(Math.min(15, red1Cycles)).padStart(2, "0");
  encodedString += String(Math.min(15, red2Cycles)).padStart(2, "0");
  // add deaths
  encodedString += String(Math.min(8, blueDeaths));
  encodedString += String(Math.min(8, redDeaths));
  encodedString += String(blueTimePenalty()).padStart(2, "0");
  encodedString += String(redTimePenalty()).padStart(2, "0");
  encodedString += String(blueCost()).padStart(2, "0");
  encodedString += String(redCost()).padStart(2, "0");
  encodedString += initiativeWinner() == "blue_team" ? "b" : "r";
  try {
    await navigator.clipboard.writeText(encodedString);
    setCopied(true);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
