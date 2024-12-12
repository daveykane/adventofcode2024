import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Twelve", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 140", async () => {
      assertEquals(part1(await getInput("day12", "input-example1")), 140);
    });
    Rhum.testCase("should get 772", async () => {
      assertEquals(part1(await getInput("day12", "input-example2")), 772);
    });
    Rhum.testCase("should get 1930", async () => {
      assertEquals(part1(await getInput("day12", "input-example3")), 1930);
    });
    Rhum.testCase("should get 1381056", async () => {
      assertEquals(part1(await getInput("day12", "input")), 1381056);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 80", async () => {
      assertEquals(part2(await getInput("day12", "input-example1")), 80);
    });
    Rhum.testCase("should get 436", async () => {
      assertEquals(part2(await getInput("day12", "input-example2")), 436);
    });
    Rhum.testCase("should get 1206", async () => {
      assertEquals(part2(await getInput("day12", "input-example3")), 1206);
    });
    Rhum.testCase("should get 236", async () => {
      assertEquals(part2(await getInput("day12", "input-example4")), 236);
    });
    Rhum.testCase("should get 368", async () => {
      assertEquals(part2(await getInput("day12", "input-example5")), 368);
    });
    Rhum.testCase("should get 834828", async () => {
      assertEquals(part2(await getInput("day12", "input")), 834828);
    });
  });
});

Rhum.run();
