const getLists = (pairs: string[]) => {
  const list1: number[] = [];
  const list2: number[] = [];
  const counts: Record<number, number> = {};

  pairs.forEach((pair) => {
    const [locationID1, locationID2] = pair.split("   ").map((locationID) => parseInt(locationID, 10));
    list1.push(locationID1);
    list2.push(locationID2);
    counts[locationID2] = (counts[locationID2] || 0) + 1;
  });

  return [list1.sort(), list2.sort(), counts];
};

export const part1 = (pairs: string[]) => {
  const [list1, list2] = getLists(pairs);
  return pairs.reduce((sum, _, i) => sum + Math.abs(list1[i] - list2[i]), 0);
};

export const part2 = (pairs: string[]) => {
  const [list1, _, counts] = getLists(pairs);
  return pairs.reduce((sum, _, i) => sum + list1[i] * (counts[list1[i]] || 0), 0);
};
