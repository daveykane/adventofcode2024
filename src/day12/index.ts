import { getGrid, isInGrid } from "../utils/index.ts";

type Plot = { id: string; visited: boolean };

const directions = { U: [0, -1], R: [1, 0], D: [0, 1], L: [-1, 0] };
const diagonals = { LU: [-1, -1], RU: [1, -1], DR: [1, 1], DL: [-1, 1] };
const notOpposite = (a: string, b: string) =>
  (a === "U" && b !== "D") || (a === "D" && b !== "U") || (a === "L" && b !== "R") || (a === "R" && b !== "L");

const measureRegion = (
  grid: Plot[][],
  [x, y]: number[],
  region: { id: string; area: number; perimeter: number; corners: number }
) => {
  const plot = grid[y][x];
  const matchingNeighbours: string[] = [];

  plot.visited = true;

  for (const [direction, [dx, dy]] of Object.entries(directions)) {
    const [nx, ny] = [x + dx, y + dy];
    // Out of bounds or different ID so it's a perimeter
    if (!isInGrid([ny, nx], grid.length, grid[0].length) || grid[ny][nx].id !== plot.id) {
      region.perimeter++;
      continue;
    }
    // Add to matching neighbour list
    matchingNeighbours.push(direction);
    // If not visited, add to area and measure the region of the neighbour
    if (!grid[ny][nx].visited) {
      region.area++;
      measureRegion(grid, [nx, ny], region);
    }
  }
  // Count corners and return region
  countCorners(grid, [x, y], plot, matchingNeighbours, region);
  return region;
};

const addCornerIfDifferentId = (
  grid: Plot[][],
  [dx, dy]: number[],
  [x, y]: number[],
  plot: Plot,
  region: { corners: number }
) => {
  const [nx, ny] = [x + dx, y + dy];
  if (grid[ny][nx].id !== plot.id) region.corners++;
};

const countCorners = (
  grid: Plot[][],
  [x, y]: number[],
  plot: Plot,
  matchingNeighbours: string[],
  region: { corners: number }
) => {
  // Isolated plot - all corners count
  if (matchingNeighbours.length === 0) return (region.corners += 4);
  // Plot with single neighbour - two corners
  if (matchingNeighbours.length === 1) return (region.corners += 2);
  // Plot with two adjacent neighbours - one corner plus check diagonal
  if (matchingNeighbours.length === 2 && notOpposite(matchingNeighbours[0], matchingNeighbours[1])) {
    region.corners++;
    const diagonal = matchingNeighbours.sort().join("") as keyof typeof diagonals;
    return addCornerIfDifferentId(grid, diagonals[diagonal], [x, y], plot, region);
  }
  // Plot with three neighbours - check two relevant diagonals
  if (matchingNeighbours.length === 3) {
    const [missingDirection] = Object.keys(directions).filter((direction) => !matchingNeighbours.includes(direction));
    return Object.entries(diagonals).forEach(([diagonal, coords]) => {
      if (!diagonal.includes(missingDirection)) {
        addCornerIfDifferentId(grid, coords, [x, y], plot, region);
      }
    });
  }
  // Plot with all neighbours - check all diagonals
  if (matchingNeighbours.length === 4) {
    return Object.values(diagonals).forEach((coords) => addCornerIfDifferentId(grid, coords, [x, y], plot, region));
  }
};

const getRegionScore = (input: string, useCorners = false) => {
  const grid = getGrid<Plot>(input, (id) => ({ id, visited: false }));
  const regions = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x].visited) continue;
      regions.push(measureRegion(grid, [x, y], { id: grid[y][x].id, area: 1, perimeter: 0, corners: 0 }));
    }
  }

  return regions.reduce((sum, region) => sum + region.area * (useCorners ? region.corners : region.perimeter), 0);
};

export const part1 = (input: string) => getRegionScore(input);
export const part2 = (input: string) => getRegionScore(input, true);
