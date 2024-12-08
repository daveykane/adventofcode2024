import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Eight", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 14", async () => {
      assertEquals(part1((await getInput("day8", "input-example")).split("\n")), 14);
    });
    Rhum.testCase("should get 240", async () => {
      assertEquals(part1((await getInput("day8", "input")).split("\n")), 240);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 34", async () => {
      assertEquals(part2((await getInput("day8", "input-example")).split("\n")), 34);
    });
    Rhum.testCase("should get 955", async () => {
      assertEquals(part2((await getInput("day8", "input")).split("\n")), 955);
    });
  });
});

Rhum.run();
