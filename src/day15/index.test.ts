import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Fifteen", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 2028", async () => {
      assertEquals(part1((await getInput("day15", "input-example1")).split("\n\n")), 2028);
    });
    Rhum.testCase("should get 10092", async () => {
      assertEquals(part1((await getInput("day15", "input-example2")).split("\n\n")), 10092);
    });
    Rhum.testCase("should get 1476771", async () => {
      assertEquals(part1((await getInput("day15", "input")).split("\n\n")), 1476771);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 618", async () => {
      assertEquals(part2((await getInput("day15", "input-example3")).split("\n\n")), 618);
    });
    Rhum.testCase("should get 9021", async () => {
      assertEquals(part2((await getInput("day15", "input-example2")).split("\n\n")), 9021);
    });
    Rhum.testCase("should get 1468005", async () => {
      assertEquals(part2((await getInput("day15", "input")).split("\n\n")), 1468005);
    });
  });
});

Rhum.run();
