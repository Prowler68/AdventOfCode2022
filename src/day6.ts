import { readFileSync } from "fs";

export function day6() {
  console.log("## Day 6 ##");

  const input = readFileSync("./inputs/inputDay6.txt", { encoding: "utf-8" });

  const findMarker = (input: string, bufferLength: number) => {
    let buffer = "";
    for (let index = 0; index < input.length; index++) {
      const char = input[index];
      buffer = buffer + char;
      if (buffer.length === bufferLength + 1) {
        buffer = buffer.substring(1, bufferLength + 1);
        if (
          !buffer.split("").some(function (v, i, a) {
            return a.lastIndexOf(v) != i;
          })
        ) {
          return index + 1;
        }
      }
    }
  };

  console.log("Result1:", findMarker(input, 4));
  console.log("Result1:", findMarker(input, 14));
}
