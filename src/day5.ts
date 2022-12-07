import { readFileSync } from "fs";

export function day5() {
  console.log("## Day 5 ##");

  const input = readFileSync("./inputs/inputDay5.txt", { encoding: "utf-8" });
  const crates = input.substring(0, input.indexOf("\n 1")).replaceAll("[", "").replaceAll("]", "").split("\n");
  const instructions = input.substring(input.indexOf("m"), input.length).split("\n");

  const prepareStock = (crates: string[]) => {
    let columns: string[][] = [[], [], [], [], [], [], [], [], []];
    for (let index = crates.length - 1; index >= 0; index--) {
      const row = crates[index];
      let blankCount = 0;
      let columnCount = 0;
      for (let i = 0; i < row.length; i++) {
        const char = row.charAt(i);
        if (char.includes(" ")) {
          blankCount++;
          if (blankCount === 2) {
            columnCount++;
            blankCount = 0;
          }
        } else {
          columns[columnCount].push(char);
          blankCount = 0;
          columnCount++;
        }
      }
    }
    return columns;
  };
  console.log(crates);
  console.log("Result1:", prepareStock(crates));
}
