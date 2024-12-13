const calculateTokens = (machines: string[], increasePrize = 0) =>
  machines.reduce((cost, machine) => {
    const [buttonA, buttonB, prize] = machine
      .split("\n")
      .map((line) => ({ x: Number(line.match(/X=?\+?(\d+)/)?.[1]), y: Number(line.match(/Y=?\+?(\d+)/)?.[1]) }));

    prize.x = prize.x + increasePrize;
    prize.y = prize.y + increasePrize;

    const a = (prize.x * buttonB.y - prize.y * buttonB.x) / (buttonA.x * buttonB.y - buttonA.y * buttonB.x);
    const b = (buttonA.x * prize.y - buttonA.y * prize.x) / (buttonA.x * buttonB.y - buttonA.y * buttonB.x);
    return a % 1 === 0 && b % 1 === 0 ? cost + a * 3 + b : cost;
  }, 0);

export const part1 = (machines: string[]) => calculateTokens(machines);
export const part2 = (machines: string[]) => calculateTokens(machines, 10000000000000);
