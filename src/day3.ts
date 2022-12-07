import { readFileSync } from "fs";

export function day3() {
  console.log("## Day 3 ##");

  const rucksackInventory = readFileSync("./inputs/inputDay3.txt", { encoding: "utf-8" }).split("\n");

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
    let charCode = char.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
      charCode -= 38;
    } else if (charCode >= 97 && charCode <= 122) {
      charCode -= 96;
    }
    return charCode;
  };

  const getChar = (priority: number) => {
    let char = "";
    if (priority <= 26) {
      char = String.fromCharCode(priority + 96);
    } else if (priority >= 27) {
      char = String.fromCharCode(priority + 38);
    }
    return char;
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

  const findBadge = (inventory: string[]) => {
    let prioritySum = 0;
    for (let index = 1; index < 53; index++) {
      const target = getChar(index);
      if (inventory.filter(a => a.includes(target)).length === 3) {
        prioritySum += getPriority(target);
      }
    }
    return prioritySum;
  };

  const findGroup = (inventory: string[]) => {
    let prioritySum = 0;

    for (let index = 0; index < inventory.length; index += 3) {
      prioritySum += findBadge([inventory[index], inventory[index + 1], inventory[index + 2]]);
    }
    return prioritySum;
  };

  console.log("Result2:", findGroup(rucksackInventory));
}
