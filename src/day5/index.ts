type Instructions = { [key: number]: { before: number[]; after: number[] } };

const getInstructions = (rules: string) =>
  rules.split("\n").reduce((instructions: Instructions, rule) => {
    const [before, after] = rule.split("|").map(Number);
    instructions[before] = instructions[before] || { before: [], after: [] };
    instructions[after] = instructions[after] || { before: [], after: [] };
    instructions[before].after.push(after);
    instructions[after].before.push(before);
    return instructions;
  }, {});

const sumMiddle = (pages: number[][]) =>
  pages.reduce((sum, update) => {
    const middle = Math.floor((0 + update.length - 1) / 2);
    return sum + Number(update[middle]);
  }, 0);

const getPageStatus = (update: number[], index: number, page: number, instructions: Instructions) => {
  const { before, after } = instructions[page];
  const pagesBefore = update.slice(0, index);
  const pagesAfter = update.slice(index + 1);
  const invalidBefore = pagesBefore.some((beforePage) => after.includes(beforePage));
  const invalidAfter = pagesAfter.some((afterPage) => before.includes(afterPage));
  return { before, after, pagesBefore, pagesAfter, invalidBefore, invalidAfter };
};

const isUpdateValid = (update: number[], instructions: Instructions) => {
  for (let index = 0; index < update.length; index++) {
    if (!instructions[update[index]]) return true;
    const { invalidBefore, invalidAfter } = getPageStatus(update, index, update[index], instructions);
    if (invalidBefore || invalidAfter) return false;
  }

  return true;
};

const sortUpdates = (updates: string, instructions: Instructions) =>
  updates.split("\n").reduce(
    (sortedUpdates: { valid: number[][]; invalid: number[][] }, update) => {
      const pages = update.split(",").map(Number);
      const key = isUpdateValid(pages, instructions) ? "valid" : "invalid";
      sortedUpdates[key].push(pages);
      return sortedUpdates;
    },
    { valid: [], invalid: [] }
  );

export const part1 = ([rules, updates]: string[]) => {
  const instructions = getInstructions(rules);
  const { valid } = sortUpdates(updates, instructions);
  return sumMiddle(valid);
};

export const part2 = ([rules, updates]: string[]) => {
  const instructions = getInstructions(rules);
  const { invalid } = sortUpdates(updates, instructions);

  invalid.forEach((update) => {
    while (!isUpdateValid(update, instructions)) {
      update.forEach((page, index) => {
        if (!instructions[page]) return true;
        const { after, pagesBefore, invalidBefore } = getPageStatus(update, index, update[index], instructions);

        if (invalidBefore) {
          const invalidPage = pagesBefore.find((beforePage) => after.includes(beforePage)) || -1;
          const invalidIndex = update.indexOf(invalidPage);
          update[invalidIndex] = page;
          update[index] = invalidPage;
        }
      });
    }
  });

  return sumMiddle(invalid);
};
