import { isInGrid } from "../utils/index.ts";

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const getBytes = (input: string) => input.split("\n").map((line) => line.split(",").map(Number));
const simulate = (bytes: number[][], size: number, slice: number) => {
  const memory = Array.from({ length: size }, () => Array(size).fill(0));
  bytes.slice(0, slice).forEach(([x, y]) => (memory[y][x] = 1));
  return memory;
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
  const bytes = getBytes(input);
  const memory = simulate(bytes, size, nanoseconds);
  return findExit(memory, size);
};

export const part2 = (input: string, size: number, nanoseconds: number) => {
  const bytes = getBytes(input);

  let left = nanoseconds;
  let right = bytes.length;

  while (left < right - 1) {
    const mid = Math.floor((left + right) / 2);
    const memory = simulate(bytes, size, mid);
    const foundExit = findExit(memory, size) !== -1;
    left = foundExit ? mid : left;
    right = foundExit ? right : mid;
  }

  return bytes[left].join(",");
};
