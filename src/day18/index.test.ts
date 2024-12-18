import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Eighteen", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 22", async () => {
      assertEquals(part1(await getInput("day18", "input-example"), 7, 12), 22);
    });
    Rhum.testCase("should get 248", async () => {
      assertEquals(part1(await getInput("day18", "input"), 71, 1024), 248);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 6,1", async () => {
      assertEquals(part2(await getInput("day18", "input-example"), 7), "6,1");
    });
    Rhum.testCase("should get 32,55", async () => {
      assertEquals(part2(await getInput("day18", "input"), 71), "32,55");
    });
  });
});

Rhum.run();
