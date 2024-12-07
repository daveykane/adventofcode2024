const isSolvable = (result: number, value: number, [next, ...remaining]: number[], useConcat = false): boolean => {
  if (next === undefined || value > result) return result === value;
  const add = isSolvable(result, value + next, remaining, useConcat);
  const multiply = isSolvable(result, value * next, remaining, useConcat);
  const concat = useConcat && isSolvable(result, Number(`${value}${next}`), remaining, useConcat);
  return add || multiply || concat;
};

const sumValidEquations = (equations: string[], useConcat = false) =>
  equations.reduce((sum, equation) => {
    const [result, next, ...remaining] = equation.split(/:? /).map(Number);
    return sum + (isSolvable(result, next, remaining, useConcat) ? result : 0);
  }, 0);

export const part1 = (equations: string[]) => sumValidEquations(equations);
export const part2 = (equations: string[]) => sumValidEquations(equations, true);
