import { readFileSync } from "fs";

export function day1() {
  console.log("## Day 1 ##");

  const inventory = readFileSync("./inputs/inputDay1.txt", {encoding: "utf-8"}).split("\n\n");
  const sortedInventory = inventory.map(a => a.split("\n").map(Number).reduce((a,b) => a + b, 0));

  const result1 = Math.max(...sortedInventory);
  console.log("Result1:", result1);

  const sortedByValue = sortedInventory.sort(function(a, b) {
    return b - a;
  });
  const result2 = sortedByValue.slice(0, 3).reduce((a,b) => a + b, 0);
  console.log("Result2:", result2);
}
