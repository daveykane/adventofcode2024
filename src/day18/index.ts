import { isInGrid } from "../utils/index.ts";

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const parseAndSimulate = (input: string, size: number, nanoseconds: number) => {
  const bytes = input.split("\n").map((line) => line.split(",").map(Number));
  const memory = Array.from({ length: size }, () => Array(size).fill(0));
  for (let i = 0; i < nanoseconds; i++) memory[bytes[i][1]][bytes[i][0]] = 1;
  return { bytes, memory };
};

const findExit = (memory: number[][], size: number) => {
  const start = [0, 0];
  const end = [size - 1, size - 1];
  const queue = [[start]];
  const visited = new Set([`0,0`]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const [col, row] = path[path.length - 1];

    if (col === end[0] && row === end[1]) return path.length - 1;

    directions.forEach(([dx, dy]) => {
      const [nx, ny] = [col + dx, row + dy];
      if (isInGrid([ny, nx], size, size) && !visited.has(`${nx},${ny}`) && memory[ny][nx] !== 1) {
        visited.add(`${nx},${ny}`);
        queue.push([...path, [nx, ny]]);
      }
    });
  }

  return -1;
};

export const part1 = (input: string, size: number, nanoseconds: number) => {
  const { memory } = parseAndSimulate(input, size, nanoseconds);
  return findExit(memory, size);
};

export const part2 = (input: string, size: number, nanoseconds: number) => {
  const { bytes, memory } = parseAndSimulate(input, size, nanoseconds);
  for (let i = nanoseconds; i < bytes.length; i++) {
    memory[bytes[i][1]][bytes[i][0]] = 1;
    if (findExit(memory, size) === -1) return bytes[i].join(",");
  }
};
