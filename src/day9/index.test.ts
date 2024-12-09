import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Nine", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 60", () => {
      assertEquals(part1(["1", "2", "3", "4", "5"].map(Number)), 60);
    });
    Rhum.testCase("should get 1928", async () => {
      assertEquals(part1((await getInput("day9", "input-example")).split("").map(Number)), 1928);
    });
    Rhum.testCase("should get 6283170117911", async () => {
      assertEquals(part1((await getInput("day9", "input")).split("").map(Number)), 6283170117911);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 2858", async () => {
      assertEquals(part2((await getInput("day9", "input-example")).split("").map(Number)), 2858);
    });
    Rhum.testCase("should get 6307653242596", async () => {
      assertEquals(part2((await getInput("day9", "input")).split("").map(Number)), 6307653242596);
    });
  });
});

Rhum.run();
