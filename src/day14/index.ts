type Robot = { px: number; py: number; vx: number; vy: number };

const getRobots = (input: string[]) => {
  return input.map((line) => {
    const [[px, py], [vx, vy]] = (line.match(/p=(.+) v=(.+)/) ?? []).slice(1).map((s) => s.split(",").map(Number));
    return { px, py, vx, vy };
  });
};

const passTime = (robots: Robot[], seconds: number, [WIDTH, HEIGHT]: [number, number]) => {
  for (let i = 0; i < seconds; i++) {
    const distinctRobots = new Set<string>();
    robots.forEach((robot) => {
      const px = robot.px + robot.vx;
      const py = robot.py + robot.vy;
      robot.px = px >= WIDTH ? px - WIDTH : px < 0 ? px + WIDTH : px;
      robot.py = py >= HEIGHT ? py - HEIGHT : py < 0 ? py + HEIGHT : py;
      distinctRobots.add(`${robot.px},${robot.py}`);
    });
    if (distinctRobots.size === robots.length && i > 100) return i + 1;
  }
};

export const part1 = (input: string[], [WIDTH, HEIGHT]: [number, number]) => {
  const robots = getRobots(input);

  passTime(robots, 100, [WIDTH, HEIGHT]);

  const halfHeightLow = Math.floor(HEIGHT / 2);
  const halfHeightHigh = Math.ceil(HEIGHT / 2);
  const quadrantCount = [0, 0, 0, 0];

  robots.forEach((robot) => {
    if (robot.px < Math.floor(WIDTH / 2)) {
      const quadrant = robot.py < halfHeightLow ? 0 : robot.py >= halfHeightHigh ? 2 : -1;
      if (quadrant !== -1) quadrantCount[quadrant]++;
    } else if (robot.px >= Math.ceil(WIDTH / 2)) {
      const quadrant = robot.py < halfHeightLow ? 1 : robot.py >= halfHeightHigh ? 3 : -1;
      if (quadrant !== -1) quadrantCount[quadrant]++;
    }
  });

  return quadrantCount.reduce((safetyFactor, count) => safetyFactor * count, 1);
};

export const part2 = (input: string[], [WIDTH, HEIGHT]: [number, number]) =>
  passTime(getRobots(input), Infinity, [WIDTH, HEIGHT]);
