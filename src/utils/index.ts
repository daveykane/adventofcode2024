export const getInput = async (day: string, file = "input", trim = true): Promise<string> => {
  const text = await Deno.readTextFile(`${Deno.cwd()}/src/${day}/${file}.txt`);
  return trim ? text.trim() : text;
};

export const getGrid = <T>(input: string, mapFunc?: (cell: string) => T): T[][] =>
  input.split("\n").map((row) => {
    const rowSplit = row.split("");
    return (mapFunc ? rowSplit.map(mapFunc) : rowSplit) as T[];
  });

export const isInGrid = ([x, y]: number[], width: number, height: number) =>
  x >= 0 && y >= 0 && x < width && y < height;

export const getNeighbours = ([y, x]: number[], width: number, height: number, diagonals = false) => {
  const neighbours: number[][] = [];

  for (let xx = -1; xx <= 1; xx++) {
    for (let yy = -1; yy <= 1; yy++) {
      if (xx == 0 && yy == 0) continue;
      if (!diagonals && Math.abs(xx) + Math.abs(yy) > 1) continue;
      if (isInGrid([x + xx, y + yy], width, height)) {
        neighbours.push([x + xx, y + yy]);
      }
    }
  }

  return neighbours;
};
