export const getInput = async (day: string, file = "input", trim = true): Promise<string> => {
  const text = await Deno.readTextFile(`${Deno.cwd()}/src/${day}/${file}.txt`);
  return trim ? text.trim() : text;
};
