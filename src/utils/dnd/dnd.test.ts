import { describe, expect, it } from "vitest";
import type { WidgetInstance } from "../../providers/WhiteboardProvider/WhiteboardProvider.types";
import type { GridMetrics } from "../grid/grid";
import { resolveCatalogDropCell, resolveMovePosition } from "./dnd";


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

  it("should offset x by whole cells but y by fractional rows", () => {
    // delta 210px / 100 = 2 cols; 45px / 90 = 0.5 row
    expect(resolveMovePosition(widget, { x: 210, y: 45 }, metrics)).toEqual({
      x: 4,
      y: 1.5,
    });
  });

  it("should support negative deltas", () => {
    expect(resolveMovePosition(widget, { x: -100, y: -90 }, metrics)).toEqual({
      x: 1,
      y: 0,
    });
  });
});
