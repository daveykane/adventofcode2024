const diagonals = { UR: [1, -1], DR: [1, 1], DL: [-1, 1], UL: [-1, -1] };
const directions = { ...diagonals, U: [0, -1], R: [1, 0], D: [0, 1], L: [-1, 0] };

const getChar = (wordsearch: string[][], y: number, x: number) => wordsearch[y] && wordsearch[y][x];
const getNextChars = (wordsearch: string[][], y: number, x: number, [dx, dy]: number[], distance: number[]) =>
  distance.reduce((acc, i) => acc + getChar(wordsearch, y + dy * i, x + dx * i), "");

export const part1 = (wordsearch: string[][]) => {
  let count = 0;

  for (let i = 0; i < wordsearch.length; i++) {
    for (let j = 0; j < wordsearch[i].length; j++) {
      if (wordsearch[i][j] === "X") {
        Object.values(directions).forEach(([dx, dy]) => {
          if (getNextChars(wordsearch, i, j, [dx, dy], [1, 2, 3]) === "MAS") {
            count += 1;
          }
        });
      }
    }
  }

  return count;
};

export const part2 = (wordsearch: string[][]) => {
  let count = 0;

  for (let i = 0; i < wordsearch.length; i++) {
    for (let j = 0; j < wordsearch[i].length; j++) {
      if (wordsearch[i][j] === "A") {
        const [tr, br, bl, tl] = Object.values(diagonals).map(([dx, dy]) =>
          getNextChars(wordsearch, i, j, [dx, dy], [1])
        );

        if ((tl + br === "MS" || tl + br === "SM") && (bl + tr === "MS" || bl + tr === "SM")) {
          count += 1;
        }
      }
    }
  }

  return count;
};
