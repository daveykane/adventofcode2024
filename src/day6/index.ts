const Patrol = {
  map: [[]] as number[][],
  mapTemplate: [[]] as number[][],
  start: [] as number[],
  guard: [] as number[],
  width: 0,
  height: 0,
  stuck: 0,
  directions: [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ],

  isInMap(x: number, y: number) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  },

  parseInput(input: string[]) {
    this.height = input.length;
    this.width = input[0].length;
    this.mapTemplate = input.map((row, y) =>
      row.split("").map((cell, x) => {
        if (cell === "^") {
          this.start = [x, y, 0];
          this.guard = [x, y, 0];
        }

        return cell === "#" ? -1 : 0;
      })
    );
  },

  cloneMap(map: number[][]) {
    return map.map((row) => row.slice());
  },

  walk(obstacle?: [number, number]) {
    // Reset map and set guard position
    this.map = this.cloneMap(this.mapTemplate);
    this.map[this.start[1]][this.start[0]] = this.start[2] + 1;
    this.guard = [...this.start];

    // Add obstacle
    if (obstacle) {
      this.map[obstacle[1]][obstacle[0]] = -1;
    }

    while (true) {
      const nx = this.guard[0] + this.directions[this.guard[2]][0];
      const ny = this.guard[1] + this.directions[this.guard[2]][1];

      // Escaped map
      if (!this.isInMap(nx, ny)) break;

      // Hit obstacle so rotate
      if (this.map[ny][nx] === -1) {
        this.guard[2] = (this.guard[2] + 1) % 4;
        continue;
      }

      // Move Guard
      this.guard = [nx, ny, this.guard[2]];

      // Guard at new position never visited before
      if (this.map[this.guard[1]][this.guard[0]] === 0) {
        this.map[this.guard[1]][this.guard[0]] = this.guard[2] + 1;
        continue;
      }

      // Guard stuck because visited before in the same direction
      if (`${this.map[this.guard[1]][this.guard[0]]}`.includes(`${this.guard[2] + 1}`)) {
        this.stuck++;
        break;
      }

      // Track Guard at position in new direction
      this.map[this.guard[1]][this.guard[0]] = +`${this.map[this.guard[1]][this.guard[0]]}${this.guard[2] + 1}`;
    }
  },
};

export const part1 = (input: string[]) => {
  Patrol.parseInput(input);
  Patrol.walk();
  return Patrol.map.flat().filter((cell) => cell > 0).length;
};

export const part2 = (input: string[]) => {
  Patrol.parseInput(input);
  Patrol.walk();

  const walkedMap = Patrol.cloneMap(Patrol.map);
  Patrol.stuck = 0;

  for (let y = 0; y < walkedMap.length; y++) {
    for (let x = 0; x < walkedMap[y].length; x++) {
      if (walkedMap[y][x] <= 0) continue;

      const [direction, ...rest] = `${walkedMap[y][x]}`;
      const oppositeDirection = (+direction - 1 + 2) % 4;
      const px = x + Patrol.directions[oppositeDirection][0];
      const py = y + Patrol.directions[oppositeDirection][1];

      // Start guard at previous position and walk with new obstacle
      Patrol.start = [px, py, +direction - 1];
      Patrol.walk([x, y]);
      walkedMap[y][x] = +rest.join("");
    }
  }

  return Patrol.stuck;
};
