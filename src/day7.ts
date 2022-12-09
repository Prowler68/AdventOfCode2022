import { readFileSync } from "fs";

export function day7() {
  console.log("## Day 7 ##");

  type File = {
    parent: string;
    name: string;
    size: number;
  };

  type Dir = {
    parent: string;
    name: string;
    content: {
      files: string[];
      directories: string[];
    };
  };

  const directories: Dir[] = [{ name: "/", parent: "", content: { files: [], directories: [] } }];
  const files: File[] = [];

  const input = readFileSync("./inputs/inputDay7.txt", { encoding: "utf-8" }).split("\n");
  const testInput = readFileSync("./inputs/testInputDay7.txt", { encoding: "utf-8" }).replaceAll("\r", "").split("\n");

  const readConsole = (input: string[]) => {
    let target = { name: "", list: false };
    for (let i = 0; i < input.length; i++) {
      const consoleLine = input[i];
      if (consoleLine.charAt(0).includes("$")) {
        target.list = false;
        if (consoleLine.substring(2, 5).includes("cd")) {
          if (consoleLine.substring(5, 7).includes("..")) {
            const parentDir = directories.find(a => a.content.directories.includes(target.name))?.name;
            if (parentDir) {
              target.name = parentDir;
            }
          } else {
            target.name = consoleLine.substring(5, consoleLine.length);
          }
        }
        if (consoleLine.substring(2, 5).includes("ls")) {
          target.list = true;
        }
      } else if (target.list) {
        if (consoleLine.substring(0, 3).includes("dir")) {
          directories.find(a => a.name === target.name)?.content.directories.push(consoleLine.substring(4));
          directories.push({
            name: consoleLine.substring(4),
            parent: target.name,
            content: { directories: [], files: [] },
          });
        } else {
          const file = consoleLine.split(" ");
          directories.find(a => a.name === target.name)?.content.files.push(file[1]);
          files.push({ name: file[1], parent: target.name, size: Number(file[0]) });
        }
      }
    }
  };

  const getDirSize = (directory: Dir) => {
    let sum = 0;
    for (let i = 0; i < directory.content.files.length; i++) {
      const fileName = directory.content.files[i];
      const value = files.find(a => a.name === fileName && a.parent === directory.name)?.size;
      if (value) {
        sum += value;
      }
    }

    for (let i = 0; i < directory.content.directories.length; i++) {
      const dirName = directory.content.directories[i];
      const child = directories.find(a => a.name === dirName && a.parent === directory.name);
      if (child) {
        sum += getDirSize(child);
      }
    }
    return sum;
  };

  const findDirBySize = (limit: number) => {
    const sums = [];
    for (let i = 0; i < directories.length; i++) {
      const directory = directories[i];
      sums.push(getDirSize(directory));
    }
    return sums.filter(a => a <= limit).reduce((a, b) => a + b, 0);
  };

  readConsole(input);
  console.log("Directories:", directories.slice(-10, directories.length));
  console.log("Files:", files);
  //   console.log(getDirSize(directories[0]));
  console.log("Result1:", findDirBySize(100000));
  //   console.log(input);
}
