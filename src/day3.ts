import { readFileSync } from "fs";

export function day3() {
    console.log("## Day 3 ##");

    const encryptedGuide = readFileSync("./inputs/inputDay3.txt", {encoding: "utf-8"}).split("\n");
    const testArray = [
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg",
        "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
        "ttgJtRGJQctTZtZT",
        "CrZsJsPPZsGzwwsLwLmpwMDw"
    ];

    const findDupe = (code: string) => {
        const compartment1 = code.slice(0, (code.length) / 2).split("");
        const compartment2 = code.slice((code.length) / 2).split("");
        const dupe = compartment1.find(a => compartment2.includes(a));
        let priority = 0;
        if (dupe?.charCodeAt(0)) {
            priority = dupe?.charCodeAt(0) > 96 ? dupe?.charCodeAt(0) - 96 : dupe?.charCodeAt(0) - 38;
        }
        return priority;
    };



    console.log("Result1:", findDupe(testArray[1]));

};
