import { describe, it, expect } from "vitest";
import { resolveCatalogDropCell, resolveMovePosition } from "./dnd";
import type { GridMetrics } from "./grid";
import type { WidgetInstance } from "../providers/WhiteboardProvider/WhiteboardProvider.types";

const metrics: GridMetrics = {
  cellWidth: 90,
  rowHeight: 80,
  gap: 10,
  columns: 12,
};

describe("resolveCatalogDropCell", () => {
  it("should map a drop point relative to the grid into a cell", () => {
    // point = (250 - 50, 190 - 90) = (200, 100); stepX 100, stepY 90
    const cell = resolveCatalogDropCell(
      { left: 250, top: 190 },
      { left: 50, top: 90 },
      metrics,
    );
    expect(cell).toEqual({ x: 2, y: 1 });
  });
});

describe("resolveMovePosition", () => {
  const widget: WidgetInstance = {
    id: "w1",
    kind: "kpi",
    position: { x: 2, y: 1, w: 3, h: 2 },
  };

  it("should offset the widget by whole cells", () => {
    // delta 210px / 100 = 2 cols, 175px / 90 = 2 rows
    expect(resolveMovePosition(widget, { x: 210, y: 175 }, metrics)).toEqual({
      x: 4,
      y: 3,
    });
  });

  it("should support negative deltas", () => {
    expect(resolveMovePosition(widget, { x: -100, y: -90 }, metrics)).toEqual({
      x: 1,
      y: 0,
    });
  });
});
