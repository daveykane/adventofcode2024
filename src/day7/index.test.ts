import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Seven", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 3749", async () => {
      assertEquals(part1((await getInput("day7", "input-example")).split("\n")), 3749);
    });
    Rhum.testCase("should get 5540634308362", async () => {
      assertEquals(part1((await getInput("day7", "input")).split("\n")), 5540634308362);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 11387", async () => {
      assertEquals(part2((await getInput("day7", "input-example")).split("\n")), 11387);
    });
    Rhum.testCase("should get 472290821152397", async () => {
      assertEquals(part2((await getInput("day7", "input")).split("\n")), 472290821152397);
    });
  });
});

Rhum.run();
