import { readFileSync } from "fs";

export function day3() {
  console.log("## Day 3 ##");

  const rucksackInventory = readFileSync("./inputs/inputDay3.txt", { encoding: "utf-8" }).split("\n");
  const testArray = [
    "vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg",
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
    "ttgJtRGJQctTZtZT",
    "CrZsJsPPZsGzwwsLwLmpwMDw",
  ];

  const findDupe = (code: string) => {
    const compartment1 = code.slice(0, code.length / 2).split("");
    const compartment2 = code.slice(code.length / 2).split("");
    const dupe = compartment1.find(a => compartment2.includes(a));
    let priority = 0;
    if (dupe) {
      getPriority(dupe);
    }
    return priority;
  };

  const getPriority = (char: string) => {
    const charCode = char.charCodeAt(0);
    return charCode > 96 ? charCode - 96 : charCode - 38;
  };

  const sumPriorities = (inventory: string[]) => {
    let sum = 0;
    for (let index = 0; index < inventory.length; index++) {
      const priority = findDupe(inventory[index]);
      sum += priority;
    }
    return sum;
  };

  console.log("Result1:", sumPriorities(rucksackInventory));

  const testArray1 = ["vJrwpWtwJgWrhcsFMMfFFhFp", "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL", "PmmdzqPrVvPwwTWBwg"];
  const testArray2 = ["wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn", "ttgJtRGJQctTZtZT", "CrZsJsPPZsGzwwsLwLmpwMDw"];

  const findGroup = (inventory: string[]) => {
    const dupe = inventory.filter(a => a);
  };
}
