const countStones = (stones: Map<number, number>) => [...stones.values()].reduce((sum, count) => sum + count, 0);
const getStones = (input: number[]) =>
  input.reduce((stones, stone) => stones.set(stone, (stones.get(stone) ?? 0) + 1), new Map<number, number>());

const blink = (stones: Map<number, number>, blinks: number) => {
  for (let i = 0; i < blinks; i++) {
    const newStones: Map<number, number> = new Map();

    for (const [stone, count] of stones) {
      if (stone === 0) {
        newStones.set(1, (newStones.get(1) ?? 0) + count);
      } else if (`${stone}`.length % 2 === 0) {
        const middle = `${stone}`.length / 2;
        const [left, right] = [`${stone}`.slice(0, middle), `${stone}`.slice(middle)].map(Number);
        newStones.set(left, (newStones.get(left) ?? 0) + count);
        newStones.set(right, (newStones.get(right) ?? 0) + count);
      } else {
        const multipled = Number(stone) * 2024;
        newStones.set(multipled, (newStones.get(multipled) ?? 0) + count);
      }

      stones = newStones;
    }
  }

  return stones;
};

export const part1 = (input: number[], blinks: number) => countStones(blink(getStones(input), blinks));
export const part2 = (input: number[], blinks: number) => countStones(blink(getStones(input), blinks));
