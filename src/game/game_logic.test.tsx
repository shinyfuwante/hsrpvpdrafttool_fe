// import { calcCost, setCharJson } from "./game_logic";
// import charJson from '../../public/rule_sets/phd_standard/characters.json';
// import oldJson from '../../public/rule_sets/phd_standard/old/characters.json';

// test("calcCost refactor", async () => {
//   setCharJson(charJson);
//   const old = Object.entries(oldJson);
//   const newChars = Object.entries(charJson);
//   for (let i = 0; i < old.length; i++) {
//     for (let j = 0; j < 7; j++) {
//       const char = {
//         name: newChars[i][0],
//         eidolon: j,
//         superimposition: 0,
//         light_cone: "",
//         index: 0,
//         team: "blue_team",
//       };
//       try {
//         expect(calcCost(char)).toBe(old[i][1].point_costs[j]);
//       } catch (e) {
//         console.log(char.name);
//         throw e;
//       }
//     }
//   }
// });
