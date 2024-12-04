import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Four", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 18", async () => {
      assertEquals(part1((await getInput("day4", "input-example")).split("\n").map((row) => row.split(""))), 18);
    });
    Rhum.testCase("should get 2532", async () => {
      assertEquals(part1((await getInput("day4", "input")).split("\n").map((row) => row.split(""))), 2532);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 9", async () => {
      assertEquals(part2((await getInput("day4", "input-example")).split("\n").map((row) => row.split(""))), 9);
    });
    Rhum.testCase("should get 1941", async () => {
      assertEquals(part2((await getInput("day4", "input")).split("\n").map((row) => row.split(""))), 1941);
    });
  });
});

Rhum.run();
