import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Eleven", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 7", async () => {
      assertEquals(part1((await getInput("day11", "input-example1")).split(" ").map(Number), 1), 7);
    });
    Rhum.testCase("should get 22", async () => {
      assertEquals(part1((await getInput("day11", "input-example2")).split(" ").map(Number), 6), 22);
    });
    Rhum.testCase("should get 55312", async () => {
      assertEquals(part1((await getInput("day11", "input-example2")).split(" ").map(Number), 25), 55312);
    });
    Rhum.testCase("should get 199982", async () => {
      assertEquals(part1((await getInput("day11", "input")).split(" ").map(Number), 25), 199982);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 7", async () => {
      assertEquals(part2((await getInput("day11", "input-example1")).split(" ").map(Number), 1), 7);
    });
    Rhum.testCase("should get 22", async () => {
      assertEquals(part2((await getInput("day11", "input-example2")).split(" ").map(Number), 6), 22);
    });
    Rhum.testCase("should get 55312", async () => {
      assertEquals(part2((await getInput("day11", "input-example2")).split(" ").map(Number), 25), 55312);
    });
    Rhum.testCase("should get 199982", async () => {
      assertEquals(part2((await getInput("day11", "input")).split(" ").map(Number), 25), 199982);
    });
    Rhum.testCase("should get 237149922829154", async () => {
      assertEquals(part2((await getInput("day11", "input")).split(" ").map(Number), 75), 237149922829154);
    });
  });
});

Rhum.run();
