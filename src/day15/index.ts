type Change = { x: number; y: number; char: string };
const directions = { "^": [0, -1], ">": [1, 0], v: [0, 1], "<": [-1, 0] };

const parseInput = ([mapInput, pathInput]: string[], expand = false) => {
  let robot = [0, 0];
  const map: string[][] = [];
  const path = pathInput.split("") as (keyof typeof directions)[];

  mapInput.split("\n").forEach((row, y) => {
    map[y] = [];
    row.split("").forEach((cell, x) => {
      if (cell === "#" || cell === ".") {
        map[y].push(...(expand ? cell.repeat(2).split("") : [cell]));
      } else if (cell === "O") {
        map[y].push(...(expand ? ["[", "]"] : ["O"]));
      } else {
        robot = [expand ? x * 2 : x, y];
        map[y].push(...(expand ? ["@", "."] : ["@"]));
      }
    });
  });

  return { map, path, robot };
};

const move = (map: string[][], [dx, dy]: number[], robot: number[], changes: Change[], isExpanded: boolean) => {
  changes = [];
  const [rx, ry] = robot;

  if (canMove(map, [rx + dx, ry + dy], [dx, dy], changes, isExpanded)) {
    const [nrx, nry] = [rx + dx, ry + dy];
    // Sort change so that empty spaces are processed first
    changes.sort((a, b) => (a.char === "." && b.char !== "." ? -1 : a.char !== "." && b.char === "." ? 1 : 0));
    changes.forEach((box) => (map[box.y][box.x] = box.char));
    // Move robot
    map[ry][rx] = ".";
    map[nry][nrx] = "@";
    robot[0] = nrx;
    robot[1] = nry;
  }
};

const canMove = (map: string[][], [nx, ny]: number[], [dx, dy]: number[], changes: Change[], isExpanded: boolean) => {
  // Wall so can't move
  if (map[ny][nx] === "#") return false;
  // Empty space so can move
  if (map[ny][nx] === ".") return true;
  // Moving horizontal or not expanded so just move one dimension the same size as the robot
  if (dy === 0 || !isExpanded) {
    if (canMove(map, [nx + dx, ny + dy], [dx, dy], changes, isExpanded)) {
      map[ny + dy][nx + dx] = map[ny][nx];
      return true;
    }
  } else {
    // Work out if the robot is on the left or right of the box
    const xShift = map[ny][nx] === "[" ? 1 : -1;
    const xShiftChar = map[ny][nx] === "[" ? "]" : "[";
    // See if the whole box can move
    if (
      canMove(map, [nx + dx, ny + dy], [dx, dy], changes, isExpanded) &&
      canMove(map, [nx + dx + xShift, ny + dy], [dx, dy], changes, isExpanded)
    ) {
      // For each box that can move push updates to changes array
      const updates = [
        { x: nx + dx, y: ny + dy, char: map[ny][nx] },
        { x: nx + dx + xShift, y: ny + dy, char: xShiftChar },
        { x: nx, y: ny, char: "." },
        { x: nx + xShift, y: ny, char: "." },
      ];
      // Push updates to changes array
      changes.push(...updates);
      return true;
    }
  }

  return false;
};

const walkPath = (input: string[], boxChar: string, animate: boolean, expand = false) => {
  const changes: Change[] = [];
  const { map, path, robot } = parseInput(input, expand);

  if (animate) {
    let moveCount = 0;
    const printMap = () => {
      console.clear();
      console.log(map.map((row) => row.join("")).join("\n"));
      console.log("move:", moveCount);
    };

    printMap();
    const interval = setInterval(function () {
      const direction = path.shift() as keyof typeof directions;
      move(map, directions[direction], robot, changes, expand);
      moveCount++;
      printMap();
      if (path.length === 0) clearInterval(interval);
    }, 100);
  } else {
    path.forEach((direction) => move(map, directions[direction], robot, changes, expand));

    let res = 0;
    for (let r = 0; r < map.length; r++) {
      for (let c = 0; c < map[r].length; c++) {
        if (map[r][c] === boxChar) res += r * 100 + c;
      }
    }
    return res;
  }
};

export const part1 = (input: string[], animate = false) => walkPath(input, "O", animate);
export const part2 = (input: string[], animate = false) => walkPath(input, "[", animate, true);
