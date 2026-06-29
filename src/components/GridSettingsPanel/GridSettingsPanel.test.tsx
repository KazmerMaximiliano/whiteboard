import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { GridSettingsPanel } from "./GridSettingsPanel";
import type { GridConfig } from "../../providers/WhiteboardProvider/WhiteboardProvider.types";

const grid: GridConfig = { columns: 12, gap: 12, maxWidth: 1280, rowHeight: 80 };

describe("GridSettingsPanel", () => {
  it("should seed inputs from the current grid", () => {
    render(
      <GridSettingsPanel
        open
        grid={grid}
        onClose={vi.fn()}
        onApply={vi.fn()}
      />,
    );
    expect(screen.getByLabelText("Columns")).toHaveValue(12);
    expect(screen.getByLabelText("Gap (px)")).toHaveValue(12);
  });

  it("should apply edited values and close", async () => {
    const onApply = vi.fn();
    const onClose = vi.fn();
    render(
      <GridSettingsPanel
        open
        grid={grid}
        onClose={onClose}
        onApply={onApply}
      />,
    );
    const columns = screen.getByLabelText("Columns");
    await userEvent.clear(columns);
    await userEvent.type(columns, "6");
    await userEvent.click(screen.getByRole("button", { name: "Apply" }));
    expect(onApply).toHaveBeenCalledWith(
      expect.objectContaining({ columns: 6 }),
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should clamp out-of-range values", async () => {
    const onApply = vi.fn();
    render(
      <GridSettingsPanel open grid={grid} onClose={vi.fn()} onApply={onApply} />,
    );
    const columns = screen.getByLabelText("Columns");
    await userEvent.clear(columns);
    await userEvent.type(columns, "99");
    await userEvent.click(screen.getByRole("button", { name: "Apply" }));
    expect(onApply).toHaveBeenCalledWith(
      expect.objectContaining({ columns: 24 }),
    );
  });
});
