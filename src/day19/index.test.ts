import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Nineteen", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 6", async () => {
      assertEquals(part1((await getInput("day19", "input-example")).split("\n\n")), 6);
    });
    Rhum.testCase("should get 278", async () => {
      assertEquals(part1((await getInput("day19", "input")).split("\n\n")), 278);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 16", async () => {
      assertEquals(part2((await getInput("day19", "input-example")).split("\n\n")), 16);
    });
    Rhum.testCase("should get 569808947758890", async () => {
      assertEquals(part2((await getInput("day19", "input")).split("\n\n")), 569808947758890);
    });
  });
});

Rhum.run();
