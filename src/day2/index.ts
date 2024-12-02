const checkReport = (levels: number[]) => {
  const increasing = levels[0] < levels[1];
  return levels.every((level, i) => {
    if (i === levels.length - 1) return true;
    const delta = Math.abs(level - levels[i + 1]);
    const stillIncreasing = level < levels[i + 1];
    return delta >= 1 && delta <= 3 && increasing === stillIncreasing;
  });
};

export const part1 = (reports: number[][]) => reports.filter(checkReport).length;
export const part2 = (reports: number[][]) =>
  reports.filter(
    (report) => checkReport(report) || report.some((_, i) => checkReport(report.filter((_, j) => j !== i)))
  ).length;
