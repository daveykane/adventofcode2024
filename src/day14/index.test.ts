import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Fourteen", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 12", async () => {
      assertEquals(part1((await getInput("day14", "input-example")).split("\n"), [11, 7]), 12);
    });
    Rhum.testCase("should get 218619120", async () => {
      assertEquals(part1((await getInput("day14", "input")).split("\n"), [101, 103]), 218619120);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 7055", async () => {
      assertEquals(part2((await getInput("day14", "input")).split("\n"), [101, 103]), 7055);
    });
  });
});

Rhum.run();
