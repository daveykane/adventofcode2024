import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;
const parseInput = (input: string) => input.split("\n").map((report) => report.split(" ").map(Number));

Rhum.testPlan("Advent of Code - Day Two", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 2", async () => {
      assertEquals(part1(parseInput(await getInput("day2", "input-example"))), 2);
    });
    Rhum.testCase("should get 463", async () => {
      assertEquals(part1(parseInput(await getInput("day2"))), 463);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 4", async () => {
      assertEquals(part2(parseInput(await getInput("day2", "input-example"))), 4);
    });
    Rhum.testCase("should get 514", async () => {
      assertEquals(part2(parseInput(await getInput("day2"))), 514);
    });
  });
});

Rhum.run();
