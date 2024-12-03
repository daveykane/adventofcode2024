import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Three", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 161", async () => {
      assertEquals(part1(await getInput("day3", "input-example1")), 161);
    });
    Rhum.testCase("should get 188116424", async () => {
      assertEquals(part1(await getInput("day3")), 188116424);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 48", async () => {
      assertEquals(part2(await getInput("day3", "input-example2")), 48);
    });
    Rhum.testCase("should get 104245808", async () => {
      assertEquals(part2(await getInput("day3")), 104245808);
    });
  });
});

Rhum.run();
