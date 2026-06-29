import { describe, expect, it } from "vitest";
import { clampPosition, computeCellWidth, deltaToCells, pointToCell, positionToStyle } from "./grid";
import type { GridMetrics } from "./grid.types";

const metrics: GridMetrics = {
  cellWidth: 90,
  rowHeight: 80,
  gap: 10,
  columns: 12,
};

describe("computeCellWidth", () => {
  it("should divide remaining space across columns", () => {
    // 1180 - 11*10 = 1070 over 12 cols
    expect(computeCellWidth(1190, 12, 10)).toBeCloseTo(90);
  });

  it("should return 0 for an unmeasured container", () => {
    expect(computeCellWidth(0, 12, 10)).toBe(0);
  });

  it("should return 0 when columns are invalid", () => {
    expect(computeCellWidth(1000, 0, 10)).toBe(0);
  });
});

describe("clampPosition", () => {
  it("should keep a valid position unchanged", () => {
    expect(clampPosition({ x: 2, y: 1, w: 3, h: 2 }, 12)).toEqual({
      x: 2,
      y: 1,
      w: 3,
      h: 2,
    });
  });

  it("should clamp width to the column count", () => {
    expect(clampPosition({ x: 0, y: 0, w: 20, h: 1 }, 12).w).toBe(12);
  });

  it("should keep the widget fully visible horizontally", () => {
    expect(clampPosition({ x: 11, y: 0, w: 4, h: 1 }, 12).x).toBe(8);
  });

  it("should enforce minimum width, height and non-negative coords", () => {
    expect(clampPosition({ x: -5, y: -3, w: 0, h: 0 }, 12)).toEqual({
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    });
  });

  it("should round fractional cells", () => {
    expect(clampPosition({ x: 1.6, y: 2.2, w: 2.4, h: 1.5 }, 12)).toEqual({
      x: 2,
      y: 2,
      w: 2,
      h: 2,
    });
  });
});

describe("deltaToCells", () => {
  it("should convert pixel deltas to whole cells", () => {
    // stepX = 100, stepY = 90
    expect(deltaToCells(210, 175, metrics)).toEqual({ dx: 2, dy: 2 });
  });

  it("should return zero when geometry is not ready", () => {
    expect(
      deltaToCells(200, 200, { ...metrics, cellWidth: 0, gap: 0, rowHeight: 0 }),
    ).toEqual({ dx: 0, dy: 0 });
  });
});

describe("pointToCell", () => {
  it("should floor a point into its cell", () => {
    // stepX = 100, stepY = 90
    expect(pointToCell(250, 100, metrics)).toEqual({ x: 2, y: 1 });
  });
});

describe("positionToStyle", () => {
  it("should size and place a multi-cell widget", () => {
    const style = positionToStyle({ x: 1, y: 2, w: 3, h: 2 }, metrics);
    // left = 1*100, top = 2*90
    expect(style.left).toBe(100);
    expect(style.top).toBe(180);
    // width = 3*90 + 2*10
    expect(style.width).toBe(290);
    // height = 2*80 + 1*10
    expect(style.height).toBe(170);
  });
});
