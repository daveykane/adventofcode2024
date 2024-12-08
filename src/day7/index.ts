const isSolvable = (result: number, numbers: number[], useConcat = false): boolean => {
  if (numbers.length === 0 && result === 0) return true;
  if (result === 0 || !Number.isInteger(result)) return false;

  const [last, nextNumbers] = [numbers[numbers.length - 1], numbers.slice(0, -1)];

  return (
    isSolvable(result - last, nextNumbers, useConcat) ||
    isSolvable(result / last, nextNumbers, useConcat) ||
    (useConcat &&
      `${result}`.endsWith(`${last}`) &&
      isSolvable(+`${result}`.replace(new RegExp(`${last}$`), ""), nextNumbers, useConcat))
  );
};

const sumValidEquations = (equations: string[], useConcat = false) =>
  equations.reduce((sum, equation) => {
    const [result, ...numbers] = equation.split(/:? /).map(Number);
    return sum + (isSolvable(result, numbers, useConcat) ? result : 0);
  }, 0);

export const part1 = (equations: string[]) => sumValidEquations(equations);
export const part2 = (equations: string[]) => sumValidEquations(equations, true);
