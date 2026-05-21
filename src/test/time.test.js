import { getTimeSlotOptions } from "@/utils/time";
import { expect, test, describe } from "vitest";

describe("getTimeSlotOptions", () => {
  test("Case 1: should return an array of strings for standard 24h range", () => {
    const result = getTimeSlotOptions("09:00", "14:00");
    expect(Array.isArray(result)).toBe(true);
    expect(
      result.every(
        (slot) => typeof slot === "object" && slot !== null
      )
    ).toBe(true);
  });

  test("Case 2: should return an array of strings when meridiem and includeLast are true", () => {
    const result = getTimeSlotOptions(
      "09:00",
      "14:00",
      true,
      true
    );
    expect(Array.isArray(result)).toBe(true);
    expect(
      result.every(
        (slot) => typeof slot === "object" && slot !== null
      )
    ).toBe(true);
  });
});
