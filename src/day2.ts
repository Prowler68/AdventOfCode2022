import { readFileSync } from "fs";
export interface Shape {
  type: string;
  beats: string;
  value: number;
  code1: string;
  code2: string;
}

export function day2() {
  console.log("## Day 2 ##");

  const encryptedGuide = readFileSync("./inputs/inputDay2.txt", { encoding: "utf-8" }).split("\n");

  const shapes: Shape[] = [
    { type: "Rock", beats: "Scissors", value: 1, code1: "A", code2: "X" },
    { type: "Paper", beats: "Rock", value: 2, code1: "B", code2: "Y" },
    { type: "Scissors", beats: "Paper", value: 3, code1: "C", code2: "Z" },
  ];

  const determinePlay = (oponent: Shape, outcome: string) => {
    if (outcome === "X") {
      return shapes.find(a => a.type === oponent.beats);
    } else if (outcome === "Y") {
      return shapes.find(a => a.type === oponent.type);
    } else if (outcome === "Z") {
      return shapes.find(a => a.beats === oponent.type);
    }
  };

  const rpsRules = (input: string, determine: boolean) => {
    let score = 0;
    const oponent = shapes.find(a => a.code1 === input.charAt(0));
    if (oponent) {
      const you = determine ? determinePlay(oponent, input.charAt(2)) : shapes.find(a => a.code2 === input.charAt(2));

      if (you) {
        if (you?.beats === oponent?.type) score = 6;
        else if (oponent?.beats === you?.type) score = 0;
        else if (oponent?.type === you?.type) score = 3;

        score += you.value;
      }
    }
    return score;
  };

  const getScore = (list: string[], determine: boolean) => {
    let score = 0;
    for (let index = 0; index < list.length; index++) {
      score += rpsRules(list[index], determine);
    }
    return score;
  };

  console.log("Result1:", getScore(encryptedGuide, false));
  console.log("Result2:", getScore(encryptedGuide, true));
}
