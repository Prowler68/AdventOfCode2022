import { readFileSync } from "fs";

export function day4() {
  console.log("## Day 4 ##");

  const pairs = readFileSync("./inputs/inputDay4.txt", { encoding: "utf-8" }).split("\n");

  const findOverlap = (item: string, totalOverlap: boolean) => {
    const pair = item.split(",");
    const range1start = Number(pair[0].substring(0, pair[0].indexOf("-")));
    const range1end = Number(pair[0].substring(pair[0].indexOf("-") + 1, pair[0].length));
    const range2start = Number(pair[1].substring(0, pair[1].indexOf("-")));
    const range2end = Number(pair[1].substring(pair[1].indexOf("-") + 1, pair[1].length));

    let overlap = false;
    if (
      totalOverlap
        ? (range1start >= range2start && range1end <= range2end) ||
          (range2start >= range1start && range2end <= range1end)
        : (range1start >= range2start && range1start <= range2end) ||
          (range2start >= range1start && range2start <= range1end)
    ) {
      overlap = true;
    }
    return overlap;
  };

  const searchList = (list: string[], totalOverlap: boolean) => {
    let count = 0;
    for (let i = 0; i < list.length; i++) {
      if (findOverlap(list[i], totalOverlap)) {
        count++;
      }
    }
    return count;
  };

  console.log("Result1:", searchList(pairs, true));
  console.log("Result2:", searchList(pairs, false));
}
