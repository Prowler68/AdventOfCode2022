import { Dir, readFileSync } from "fs";

export function day7() {
  console.log("## Day 7 ##");

  // type File = {
  //   parent: string;
  //   name: string;
  //   size: number;
  // };

  // type Dir = {
  //   parent: string;
  //   name: string;
  //   content: {
  //     files: string[];
  //     directories: string[];
  //   };
  // };

  type Dir = { type: "dir"; name: string; parent?: Item; content: Item[] };
  type File = { type: "file"; name: string; parent: Item; size: number };
  type Item =
    | { type: "dir"; name: string; parent?: Item; content: Item[] }
    | { type: "file"; name: string; parent: Item; size: number };

  // const directories: Dir[] = [{ name: "/", parent: "", content: { files: [], directories: [] } }];
  // const files: File[] = [];
  const storage: Item = { name: "/", type: "dir", content: [] };

  const input = readFileSync("./inputs/inputDay7.txt", { encoding: "utf-8" }).replaceAll("\r", "").split("\n");
  const testInput = readFileSync("./inputs/testInputDay7.txt", { encoding: "utf-8" }).replaceAll("\r", "").split("\n");

  // const isDir = (item: Item) => {
  //   return item.type === "dir";
  // };

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
            const newTarget = storage.content.find(a => a.name === consoleLine.substring(5, consoleLine.length));
            if (newTarget) {
              target = newTarget;
            }
          }
        }
        if (consoleLine.substring(2, 5).includes("ls")) {
          list = true;
        }
      } else if (list) {
        if (consoleLine.substring(0, 3).includes("dir")) {
          if (target.type === "dir") {
            storage.content
              .find((a): a is Dir => a.name === target.name && a.parent === target.parent)
              ?.content.push({
                type: "dir",
                name: consoleLine.substring(4),
                parent: target,
                content: [],
              });
          }
        } else {
          const file = consoleLine.split(" ");
          storage.content
            .find((a): a is Dir => a.name === target.name && a.parent === target.parent)
            ?.content.push({ type: "file", name: file[1], parent: target, size: Number(file[0]) });
        }
      }
    }
  };

  // const getDirSize = (directory: Dir) => {
  //   let sum = 0;
  //   for (let i = 0; i < directory.content.files.length; i++) {
  //     const fileName = directory.content.files[i];
  //     const value = files.find(a => a.name === fileName && a.parent === directory.name)?.size;
  //     if (value) {
  //       sum += value;
  //     }
  //   }

  //   for (let i = 0; i < directory.content.directories.length; i++) {
  //     const dirName = directory.content.directories[i];
  //     const child = directories.find(a => a.name === dirName && a.parent === directory.name);
  //     if (child) {
  //       sum += getDirSize(child);
  //     }
  //   }
  //   return sum;
  // };

  // const findDirBySize = (limit: number) => {
  //   const sums = [];
  //   for (let i = 0; i < directories.length; i++) {
  //     const directory = directories[i];
  //     sums.push(getDirSize(directory));
  //   }
  //   return sums.filter(a => a <= limit).reduce((a, b) => a + b, 0);
  // };

  readConsole(testInput);

  console.log("storage: ", storage.content);
  // console.log("Result1:", findDirBySize(100000));
}
