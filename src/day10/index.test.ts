import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Ten", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 1", async () => {
      assertEquals(part1(await getInput("day10", "input-example1")), 1);
    });
    Rhum.testCase("should get 2", async () => {
      assertEquals(part1(await getInput("day10", "input-example2")), 2);
    });
    Rhum.testCase("should get 4", async () => {
      assertEquals(part1(await getInput("day10", "input-example3")), 4);
    });
    Rhum.testCase("should get 3", async () => {
      assertEquals(part1(await getInput("day10", "input-example4")), 3);
    });
    Rhum.testCase("should get 36", async () => {
      assertEquals(part1(await getInput("day10", "input-example5")), 36);
    });
    Rhum.testCase("should get 667", async () => {
      assertEquals(part1(await getInput("day10", "input")), 667);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 3", async () => {
      assertEquals(part2(await getInput("day10", "input-example6")), 3);
    });
    Rhum.testCase("should get 13", async () => {
      assertEquals(part2(await getInput("day10", "input-example7")), 13);
    });
    Rhum.testCase("should get 227", async () => {
      assertEquals(part2(await getInput("day10", "input-example8")), 227);
    });
    Rhum.testCase("should get 81", async () => {
      assertEquals(part2(await getInput("day10", "input-example9")), 81);
    });
    Rhum.testCase("should get 1344", async () => {
      assertEquals(part2(await getInput("day10", "input")), 1344);
    });
  });
});

Rhum.run();
