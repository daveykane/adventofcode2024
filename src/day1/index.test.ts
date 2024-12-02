import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day One", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 11", async () => {
      assertEquals(part1((await getInput("day1", "input-example")).split("\n")), 11);
    });
    Rhum.testCase("should get 2904518", async () => {
      assertEquals(part1((await getInput("day1")).split("\n")), 2904518);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 31", async () => {
      assertEquals(part2((await getInput("day1", "input-example")).split("\n")), 31);
    });
    Rhum.testCase("should get 18650129", async () => {
      assertEquals(part2((await getInput("day1")).split("\n")), 18650129);
    });
  });
});

Rhum.run();
