import { describe, expect, it } from "vitest";
import { createId } from "./id";


describe("createId", () => {
  it("should return a non-empty string", () => {
    expect(createId().length).toBeGreaterThan(0);
  });

  it("should return unique values", () => {
    const ids = new Set(Array.from({ length: 100 }, () => createId()));
    expect(ids.size).toBe(100);
  });
});
