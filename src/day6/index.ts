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

  visited = new Set<string>();
  visitedByDirection = new Set<string>();

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

  walk() {
    while (true) {
      const guard = this.guard.join(",");
      const visitedByDirection = `${guard},${this.currentDirection}`;
      const newX = this.guard[0] + this.directions[this.currentDirection][0];
      const newY = this.guard[1] + this.directions[this.currentDirection][1];
      const newCell = this.cells[newY]?.[newX];

      if (this.visitedByDirection.has(visitedByDirection)) {
        this.stuck = true;
        break;
      }

      this.visited.add(guard);
      this.visitedByDirection.add(visitedByDirection);

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

  const visited = [...patrol.visited];
  const visitedByDirection = [...patrol.visitedByDirection];
  visited.shift();

  for (const cell of visited) {
    const blockPatrol = new Patrol(map);
    const [x, y] = cell.split(",").map(Number);
    const [px, py, direction] = (visitedByDirection.shift() ?? "").split(",").map(Number);

    blockPatrol.cells[y][x] = "#";
    blockPatrol.guard = [px, py];
    blockPatrol.currentDirection = direction;
    blockPatrol.walk();

    if (blockPatrol.stuck) stuckPatrolCount++;
  }

  return stuckPatrolCount;
};
