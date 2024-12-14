type Robot = { px: number; py: number; vx: number; vy: number };

const getRobots = (input: string[]) => {
  return input.map((line) => {
    const [[px, py], [vx, vy]] = (line.match(/p=(.+) v=(.+)/) ?? []).slice(1).map((s) => s.split(",").map(Number));
    return { px, py, vx, vy };
  });
};

const getQuadrantBounds = ([WIDTH, HEIGHT]: [number, number]): [number, number, number, number] => [
  Math.floor(WIDTH / 2),
  Math.ceil(WIDTH / 2),
  Math.floor(HEIGHT / 2),
  Math.ceil(HEIGHT / 2),
];

const getQuadrantCount = (robots: Robot[], [left, right, top, bottom]: [number, number, number, number]) =>
  robots.reduce(
    (quadrantCount, robot) => {
      if (robot.px < left) {
        const quadrant = robot.py < top ? 0 : robot.py >= bottom ? 2 : -1;
        if (quadrant !== -1) quadrantCount[quadrant]++;
      } else if (robot.px >= right) {
        const quadrant = robot.py < top ? 1 : robot.py >= bottom ? 3 : -1;
        if (quadrant !== -1) quadrantCount[quadrant]++;
      }
      return quadrantCount;
    },
    [0, 0, 0, 0]
  );

const passTime = (robots: Robot[], seconds: number, [WIDTH, HEIGHT]: [number, number]) => {
  robots.forEach((robot) => {
    const px = (robot.px + robot.vx * seconds) % WIDTH;
    const py = (robot.py + robot.vy * seconds) % HEIGHT;
    robot.px = px < 0 ? px + WIDTH : px;
    robot.py = py < 0 ? py + HEIGHT : py;
  });
};

export const part1 = (input: string[], [WIDTH, HEIGHT]: [number, number]) => {
  const robots = getRobots(input);
  const quadrantBounds = getQuadrantBounds([WIDTH, HEIGHT]);
  passTime(robots, 100, [WIDTH, HEIGHT]);
  return getQuadrantCount(robots, quadrantBounds).reduce((factor, count) => factor * count, 1);
};

export const part2 = (input: string[], [WIDTH, HEIGHT]: [number, number]) => {
  const robots = getRobots(input);
  const quadrantBounds = getQuadrantBounds([WIDTH, HEIGHT]);
  const arbitaryLowCount = 70;

  let x = 0;
  let y = 0;
  let varianceX = 0;
  let varianceY = 0;
  let seconds = 0;

  // Find the first time the robots are clustered vertically and horizontally
  while (varianceX === 0 || varianceY === 0) {
    seconds++;
    passTime(robots, 1, [WIDTH, HEIGHT]);
    const quadrantCount = getQuadrantCount(robots, quadrantBounds);
    // When the top right and bottom right quadrants have a low count, the robots are clustered vertically
    if (varianceX === 0 && quadrantCount[1] < arbitaryLowCount && quadrantCount[3] < arbitaryLowCount) {
      varianceX = seconds % WIDTH;
    }
    // When the top left and bottom left quadrants have a low count, the robots are clustered horizontally
    if (varianceY === 0 && quadrantCount[2] < arbitaryLowCount && quadrantCount[3] < arbitaryLowCount) {
      varianceY = seconds % HEIGHT;
    }
  }

  // Loop until the value match which is the first time both x and y clusters happen on the same tick
  while (true) {
    const ySeconds = varianceY + HEIGHT * x;
    const xSeconds = varianceX + WIDTH * y;

    if (ySeconds === xSeconds) return ySeconds;
    if (ySeconds < xSeconds) x++;
    else y++;
  }
};
