import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Sixteen", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 7036", async () => {
      assertEquals(part1(await getInput("day16", "input-example1")), 7036);
    });
    Rhum.testCase("should get 11048", async () => {
      assertEquals(part1(await getInput("day16", "input-example2")), 11048);
    });
    Rhum.testCase("should get 98484", async () => {
      assertEquals(part1(await getInput("day16", "input")), 98484);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 45", async () => {
      assertEquals(part2(await getInput("day16", "input-example1")), 45);
    });
    Rhum.testCase("should get 64", async () => {
      assertEquals(part2(await getInput("day16", "input-example2")), 64);
    });
    Rhum.testCase("should get 531", async () => {
      assertEquals(part2(await getInput("day16", "input")), 531);
    });
  });
});

Rhum.run();
