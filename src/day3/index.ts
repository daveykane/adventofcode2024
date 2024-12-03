const checkMemory = (memory: string, useControl = false) => {
  let enabled = true;
  const instructions = memory.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g) || [];

  return instructions.reduce((sum, instruction) => {
    if (instruction.startsWith("mul") && (enabled || !useControl)) {
      const [num1, num2] = instruction.slice(4, -1).split(",").map(Number);
      return sum + num1 * num2;
    }

    enabled = instruction === "do()";
    return sum;
  }, 0);
};

export const part1 = (memory: string) => checkMemory(memory);
export const part2 = (memory: string) => checkMemory(memory, true);
