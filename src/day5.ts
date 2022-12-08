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
        if (!char.includes("-")) {
          columns[i].push(char);
        }
      }
    }
    return columns;
  };

  const crane = (instructions: string[], stock: string[][], model: "CrateMover9000" | "CrateMover9001") => {
    let result = stock;
    for (let i = 0; i < instructions.length; i++) {
      const command = instructions[i]
        .replaceAll("move ", "")
        .replaceAll(" from ", "-")
        .replaceAll(" to ", "-")
        .split("-");
      const count = Number(command[0]);
      const target = Number(command[1]);
      const destination = Number(command[2]);

      if (model === "CrateMover9000") {
        for (let index = 0; index < count; index++) {
          const liftedCrate = result[target - 1].pop();
          if (liftedCrate) {
            result[destination - 1].push(liftedCrate);
          }
        }
      }

      if (model === "CrateMover9001" && count && target && destination) {
        const liftedStack = result[target - 1].splice(-count, count);
        result[destination - 1].push(...liftedStack);
      }
    }
    return result;
  };

  const getTopCrates = (stock: string[][]) => {
    let result = "";
    for (let i = 0; i < stock.length; i++) {
      const topCrate = stock[i].pop();
      if (topCrate) {
        result = result + topCrate;
      }
    }
    return result;
  };

  const result1 = getTopCrates(crane(instructions, prepareStock(crates), "CrateMover9000"));
  const result2 = getTopCrates(crane(instructions, prepareStock(crates), "CrateMover9001"));

  console.log("Result1", result1);
  console.log("Result2", result2);
}
