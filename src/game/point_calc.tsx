import { ruleSet } from "./game_logic";

export const calculateBonusCycles = (points: number) => {
  if (points < 30) {
    return (points - 30) / 6;
  } else {
    return (points - 30) / 4;
  }
};

export const calculateScore = (points: number, deaths: number, p1Cycles: number, p2Cycles: number) => {
  if (ruleSet() == "pokke") {
    return p1Cycles + p2Cycles;
  }
    const bonusCycles = calculateBonusCycles(points + deaths);
    const score = p1Cycles + p2Cycles + bonusCycles;
    return score;
} 