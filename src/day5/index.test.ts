import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Five", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 143", async () => {
      assertEquals(part1((await getInput("day5", "input-example")).split("\n\n")), 143);
    });
    Rhum.testCase("should get 5964", async () => {
      assertEquals(part1((await getInput("day5", "input")).split("\n\n")), 5964);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 123", async () => {
      assertEquals(part2((await getInput("day5", "input-example")).split("\n\n")), 123);
    });
    Rhum.testCase("should get 4719", async () => {
      assertEquals(part2((await getInput("day5", "input")).split("\n\n")), 4719);
    });
  });
});

Rhum.run();
