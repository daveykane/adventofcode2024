import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Thirteen", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 480", async () => {
      assertEquals(part1((await getInput("day13", "input-example")).split("\n\n")), 480);
    });
    Rhum.testCase("should get 36954", async () => {
      assertEquals(part1((await getInput("day13", "input")).split("\n\n")), 36954);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 875318608908", async () => {
      assertEquals(part2((await getInput("day13", "input-example")).split("\n\n")), 875318608908);
    });
    Rhum.testCase("should get 79352015273424", async () => {
      assertEquals(part2((await getInput("day13", "input")).split("\n\n")), 79352015273424);
    });
  });
});

Rhum.run();
