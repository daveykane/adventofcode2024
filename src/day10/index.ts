import { getGrid, getNeighbours } from "../utils/index.ts";

const walkTrails = (grid: number[][], [x, y]: number[], trailheads: string[], distinct: boolean) => {
  const neighbours = getNeighbours([y, x], grid[y].length, grid.length);
  const peak = grid[y][x];

  for (const [nx, ny] of neighbours) {
    if (grid[ny][nx] === 9 && peak === 8) {
      trailheads.push(`${nx},${ny}`);
    } else if (grid[ny][nx] === peak + 1) {
      walkTrails(grid, [nx, ny], trailheads, distinct);
    }
  }

  return distinct ? trailheads.length : new Set([...trailheads]).size;
};

const getTrailheadScores = (grid: number[][], distinct = false) =>
  grid.reduce((score, row, y) => {
    return row.reduce((score, peak, x) => {
      if (peak !== 0) return score;
      return score + walkTrails(grid, [x, y], [], distinct);
    }, score);
  }, 0);

export const part1 = (input: string) => getTrailheadScores(getGrid<number>(input, Number));
export const part2 = (input: string) => getTrailheadScores(getGrid<number>(input, Number), true);
