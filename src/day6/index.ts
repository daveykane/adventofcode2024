class Patrol {
  cells: string[][] = [];

  currentDirection = 0;
  directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  guard: number[] = [];
  start: number[] = [];
  stuck = false;

  visited = new Map<string, number[]>();

  constructor(grid: string[]) {
    this.cells = grid.map((row, y) =>
      row.split("").map((cell, x) => {
        if (cell === "^") {
          this.start = [x, y];
          this.guard = [x, y];
        }

        return cell;
      })
    );
  }

  reset() {
    this.guard = this.start;
    this.currentDirection = 0;
    this.stuck = false;
    this.visited.clear();
  }

  walk() {
    while (true) {
      const guard = this.guard.join(",");
      const newX = this.guard[0] + this.directions[this.currentDirection][0];
      const newY = this.guard[1] + this.directions[this.currentDirection][1];
      const newCell = this.cells[newY]?.[newX];

      if (this.visited.get(guard)?.includes(this.currentDirection)) {
        this.stuck = true;
        break;
      }

      const pastGuard = this.visited.get(guard) ?? [];
      pastGuard.push(this.currentDirection);
      this.visited.set(guard, pastGuard);

      if (!newCell) {
        break;
      } else if (newCell === "#") {
        this.currentDirection = (this.currentDirection + 1) % 4;
      } else {
        this.guard = [newX, newY];
      }
    }
  }
}

export const part1 = (map: string[]) => {
  const patrol = new Patrol(map);
  patrol.walk();
  return patrol.visited.size;
};

export const part2 = (map: string[]) => {
  let stuckPatrolCount = 0;
  const patrol = new Patrol(map);
  patrol.walk();

  let index = 0;
  const entries = [...patrol.visited.entries()];

  for (const [position] of entries) {
    if (index === 0) {
      index++;
      continue;
    }

    const [x, y] = position.split(",").map(Number);
    const [pPosition, pDirections] = entries[index - 1];
    const [px, py] = pPosition.split(",").map(Number);
    const direction = pDirections.shift();

    if (direction === undefined) {
      throw new Error("Direction not found somehow");
    }

    patrol.reset();
    patrol.cells[y][x] = "#";
    patrol.guard = [px, py];
    patrol.currentDirection = direction;
    patrol.walk();
    patrol.cells[y][x] = ".";

    if (patrol.stuck) stuckPatrolCount++;
    index++;
  }

  return stuckPatrolCount;
};
