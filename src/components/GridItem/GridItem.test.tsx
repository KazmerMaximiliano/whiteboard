import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { DndContext } from "@dnd-kit/core";
import { GridItem } from "./GridItem";
import type { GridMetrics } from "../../utils/grid";
import type { WidgetInstance } from "../../providers/WhiteboardProvider/WhiteboardProvider.types";

const metrics: GridMetrics = {
  cellWidth: 90,
  rowHeight: 80,
  gap: 10,
  columns: 12,
};

const widget: WidgetInstance = {
  id: "w1",
  kind: "kpi",
  position: { x: 1, y: 1, w: 3, h: 2 },
};

const renderItem = (onRemove = vi.fn(), onResize = vi.fn()) =>
  render(
    <DndContext>
      <GridItem
        widget={widget}
        metrics={metrics}
        onRemove={onRemove}
        onResize={onResize}
      />
    </DndContext>,
  );

describe("GridItem", () => {
  describe("rendering", () => {
    it("should render the widget content and controls", () => {
      renderItem();
      expect(screen.getByText("Revenue")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Move widget" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Resize widget" }),
      ).toBeInTheDocument();
    });

    it("should position and size the item from the grid metrics", () => {
      const { container } = renderItem();
      const item = container.querySelector(".grid-item") as HTMLElement;
      // left = 1 * (90 + 10), top = 1 * (80 + 10)
      expect(item.style.left).toBe("100px");
      expect(item.style.top).toBe("90px");
      // width = 3*90 + 2*10
      expect(item.style.width).toBe("290px");
    });
  });

  describe("interactions", () => {
    it("should call onRemove with the widget id", async () => {
      const onRemove = vi.fn();
      renderItem(onRemove);
      await userEvent.click(
        screen.getByRole("button", { name: "Remove widget" }),
      );
      expect(onRemove).toHaveBeenCalledWith("w1");
    });

    it("should resize by whole cells while dragging the handle", () => {
      const onResize = vi.fn();
      renderItem(vi.fn(), onResize);
      const handle = screen.getByRole("button", { name: "Resize widget" });
      // stepX = 90 + 10 = 100, stepY = 80 + 10 = 90
      fireEvent.pointerDown(handle, { clientX: 200, clientY: 200 });
      fireEvent.pointerMove(window, { clientX: 300, clientY: 290 });
      fireEvent.pointerUp(window);
      // startW = 3 (+1 col), startH = 2 (+1 row)
      expect(onResize).toHaveBeenLastCalledWith("w1", 4, 3);
    });

    it("should stop resizing after pointer up", () => {
      const onResize = vi.fn();
      renderItem(vi.fn(), onResize);
      const handle = screen.getByRole("button", { name: "Resize widget" });
      fireEvent.pointerDown(handle, { clientX: 0, clientY: 0 });
      fireEvent.pointerUp(window);
      onResize.mockClear();
      fireEvent.pointerMove(window, { clientX: 500, clientY: 500 });
      expect(onResize).not.toHaveBeenCalled();
    });
  });
});
