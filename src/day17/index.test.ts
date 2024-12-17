import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Seventeen", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 4,6,3,5,6,3,5,2,1,0", async () => {
      assertEquals(part1(await getInput("day17", "input-example1")), "4,6,3,5,6,3,5,2,1,0");
    });
    Rhum.testCase("should get 7,6,5,3,6,5,7,0,4", async () => {
      assertEquals(part1(await getInput("day17", "input")), "7,6,5,3,6,5,7,0,4");
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 117440n", async () => {
      assertEquals(part2(await getInput("day17", "input-example2")), 117440n);
    });
    Rhum.testCase("should get 190615597431823n", async () => {
      assertEquals(part2(await getInput("day17", "input")), 190615597431823n);
    });
  });
});

Rhum.run();
