const check = (design: string, towels: string[], cache = new Map<string, number>()): number => {
  if (cache.has(design)) return cache.get(design)!;
  if (design.length === 0) return 1;

  const total = towels.reduce((count, towel) => {
    return design.startsWith(towel) ? count + check(design.slice(towel.length), towels, cache) : count;
  }, 0);

  cache.set(design, total);
  return total;
};

export const part1 = ([patterns, arrangements]: string[]) => {
  const [towels, designs] = [patterns.split(", "), arrangements.split("\n")];
  return designs.filter((design) => check(design, towels)).length;
};

export const part2 = ([patterns, arrangements]: string[]) => {
  const [towels, designs] = [patterns.split(", "), arrangements.split("\n")];
  return designs.reduce((total, design) => total + check(design, towels), 0);
};
