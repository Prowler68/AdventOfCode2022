import { readFileSync } from "fs";

export function day7() {
  console.log("## Day 7 ##");

  type Dir = { type: "dir"; name: string; parent?: Item; content: Item[] };
  type File = { type: "file"; name: string; parent: Item; size: number };
  type Item = Dir | File;

  const input = readFileSync("./inputs/inputDay7.txt", { encoding: "utf-8" }).split("\n");

  const storage: Dir = { name: "/", type: "dir", content: [] };

  const readConsole = (input: string[]) => {
    let target: Item = storage;
    let list = false;
    for (let i = 0; i < input.length; i++) {
      const consoleLine = input[i];
      if (consoleLine.charAt(0).includes("$")) {
        list = false;
        if (consoleLine.substring(2, 5).includes("cd")) {
          if (consoleLine.substring(5, 7).includes("..")) {
            if (target.parent) {
              target = target.parent;
            }
          } else if (consoleLine.substring(5, 7).includes("/")) {
            target = storage;
          } else {
            if (target.type === "dir") {
              target = target.content.find(a => a.name === consoleLine.substring(5, consoleLine.length)) ?? target;
            }
          }
        } else if (consoleLine.substring(2, 5).includes("ls")) {
          list = true;
        }
      } else if (list) {
        if (consoleLine.substring(0, 3).includes("dir")) {
          if (target.type === "dir") {
            target.content.push({
              type: "dir",
              name: consoleLine.substring(4),
              parent: target,
              content: [],
            });
          } else {
          }
        } else {
          const file = consoleLine.split(" ");
          if (target.type === "dir") {
            target.content.push({ type: "file", name: file[1], parent: target, size: Number(file[0]) });
          }
        }
      }
    }
  };

  const flattenStorage = (directory: Dir) => {
    const flatStorage: Dir[] = [];
    flatStorage.push(directory);
    for (let i = 0; i < directory.content.length; i++) {
      const item = directory.content[i];
      if (item.type === "dir") {
        flatStorage.push(...flattenStorage(item));
      }
    }
    return flatStorage;
  };

  const getDirSize = (directory: Dir) => {
    let sum = 0;
    for (let i = 0; i < directory.content.length; i++) {
      const item = directory.content[i];
      if (item.type === "file") {
        sum += item.size;
      } else if (item.type === "dir") {
        sum += getDirSize(item);
      }
    }
    return sum;
  };

  const findDirBySize = (limit: number, discSpace?: number) => {
    const sums = [];
    for (let i = 0; i < flatStorage.length; i++) {
      const directory = flatStorage[i];
      sums.push(getDirSize(directory));
    }
    if (!discSpace) {
      return sums.filter(a => a <= limit).reduce((a, b) => a + b, 0);
    } else {
      return Math.min(...sums.filter(a => a > limit - (discSpace - getDirSize(flatStorage[0]))));
    }
  };

  const findClosest = (discSpace: number) => {
    const targetSize = discSpace - getDirSize(flatStorage[0]);
    return findDirBySize(targetSize);
  };

  readConsole(input);
  const flatStorage = flattenStorage(storage);

  console.log("Result1: ", findDirBySize(100000));
  console.log("Result2: ", findDirBySize(30000000, 70000000));
}
