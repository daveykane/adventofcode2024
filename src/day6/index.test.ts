import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Six", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 41", async () => {
      assertEquals(part1((await getInput("day6", "input-example")).split("\n")), 41);
    });
    Rhum.testCase("should get 4988", async () => {
      assertEquals(part1((await getInput("day6", "input")).split("\n")), 4988);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 6", async () => {
      assertEquals(part2((await getInput("day6", "input-example")).split("\n")), 6);
    });
    Rhum.testCase("should get 1697", async () => {
      assertEquals(part2((await getInput("day6", "input")).split("\n")), 1697);
    });
  });
});

Rhum.run();
