import { DndContext } from "@dnd-kit/core";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { WhiteboardCanvas } from "./WhiteboardCanvas";

import type {
  GridConfig,
  WidgetInstance,
} from "../../providers/WhiteboardProvider/WhiteboardProvider.types";
import type { GridMetrics } from "../../utils/grid/grid.types";

const grid: GridConfig = {
  columns: 12,
  gap: 10,
  maxWidth: 1280,
  rowHeight: 80,
};
const metrics: GridMetrics = {
  cellWidth: 90,
  rowHeight: 80,
  gap: 10,
  columns: 12,
};

const renderCanvas = (widgets: WidgetInstance[]) => {
  const gridRef = createRef<HTMLDivElement>();
  return render(
    <DndContext>
      <WhiteboardCanvas
        widgets={widgets}
        grid={grid}
        metrics={metrics}
        gridRef={gridRef}
        onRemove={vi.fn()}
        onResize={vi.fn()}
      />
    </DndContext>,
  );
};

describe("WhiteboardCanvas", () => {
  it("should show the empty hint when there are no widgets", () => {
    renderCanvas([]);
    expect(screen.getByText(/Drag a component/)).toBeInTheDocument();
  });

  it("should render placed widgets", () => {
    renderCanvas([
      { id: "w1", kind: "kpi", position: { x: 0, y: 0, w: 3, h: 2 } },
      { id: "w2", kind: "table", position: { x: 4, y: 0, w: 4, h: 3 } },
    ]);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("Top Accounts")).toBeInTheDocument();
    expect(screen.queryByText(/Drag a component/)).not.toBeInTheDocument();
  });
});
