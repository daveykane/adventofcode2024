type StackItem = {
  position: number[];
  direction: number;
  path: string[];
  cost: number;
};

const directions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const parseInput = (input: string) => {
  let start: number[] = [];
  let end: number[] = [];
  const maze = input.split("\n").map((row, y) =>
    row.split("").map((col, x) => {
      if (col == "S") start = [x, y];
      else if (col == "E") end = [x, y];
      return col;
    })
  );

  return { maze, start, end };
};

const solveMaze = (input: string) => {
  const { maze, start, end } = parseInput(input);
  const stack: StackItem[] = [{ position: start, direction: 0, path: [], cost: 0 }];
  const seen: Record<string, number> = {};

  let lowest = Infinity;
  let paths: Set<string> = new Set();

  while (stack.length > 0) {
    const { position, direction, path, cost } = stack.shift() as StackItem;
    const positionKey = position.join(",");

    path.push(positionKey);

    if (positionKey === end.join(",")) {
      if (cost < lowest) {
        paths = new Set();
        lowest = cost;
      }
      // Add all best paths to track tiles
      if (cost == lowest) paths = new Set([...paths, ...path]);
      continue;
    }
    // Don't consider path if its already been seen for cheaper or its already higher than the lowest
    if (seen[`${positionKey},${direction}`] < cost || cost > lowest) continue;
    // Track the cost of the position and direction
    seen[`${positionKey},${direction}`] = cost;
    // Check each direction from current position
    directions.forEach(([dx, dy], index) => {
      const [x, y] = directions[direction];
      // Skip if the direction is opposite
      if ((dx === x && dy !== y) || (dx !== x && dy === y)) return true;
      // Skip if the next position is a wall
      const [nx, ny] = [position[0] + dx, position[1] + dy];
      if (maze[ny][nx] == "#") return true;
      // Find insert position
      const newCost = cost + (index == direction ? 1 : 1001);
      const insertIndex = stack.findIndex((item) => item.cost > newCost);
      // Add the path to the stack
      stack.splice(insertIndex, 0, {
        path: [...path],
        position: [nx, ny],
        direction: index,
        cost: newCost,
      });
    });
  }

  return { lowest, tiles: paths.size };
};

export const part1 = (input: string) => solveMaze(input).lowest;
export const part2 = (input: string) => solveMaze(input).tiles;
