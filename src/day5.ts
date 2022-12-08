import { readFileSync } from "fs";

export function day5() {
  console.log("## Day 5 ##");

  const input = readFileSync("./inputs/inputDay5.txt", { encoding: "utf-8" });
  const crates = input
    .substring(0, input.indexOf("\n 1"))
    .replaceAll("[", "")
    .replaceAll("]", "")
    .replaceAll(RegExp(/\s\s\s\s/gm), "-")
    .replaceAll(" ", "")
    .split("\n");
  const instructions = input.substring(input.indexOf("m"), input.length).split("\n");

  const prepareStock = (crates: string[]) => {
    let columns: string[][] = [[], [], [], [], [], [], [], [], []];
    for (let index = crates.length - 1; index >= 0; index--) {
      const row = crates[index];

      for (let i = 0; i < row.length; i++) {
        const char = row.charAt(i);
        if (char.includes("-")) {
        } else {
          columns[i].push(char);
        }
      }
    }
    return columns;
  };
  console.log(crates);
  console.log("Result1:", prepareStock(crates));
}
