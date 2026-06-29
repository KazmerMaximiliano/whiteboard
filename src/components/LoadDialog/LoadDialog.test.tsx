import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { LoadDialog } from "./LoadDialog";
import type { DashboardSummary } from "../../services/dashboardStorage";

const dashboards: DashboardSummary[] = [
  { id: "a", name: "Sales", updatedAt: 1000 },
  { id: "b", name: "Ops", updatedAt: 2000 },
];

describe("LoadDialog", () => {
  it("should show an empty message when there are no dashboards", () => {
    render(
      <LoadDialog
        open
        dashboards={[]}
        onClose={vi.fn()}
        onLoad={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByText("No saved dashboards yet.")).toBeInTheDocument();
  });

  it("should load a dashboard and close", async () => {
    const onLoad = vi.fn();
    const onClose = vi.fn();
    render(
      <LoadDialog
        open
        dashboards={dashboards}
        onClose={onClose}
        onLoad={onLoad}
        onDelete={vi.fn()}
      />,
    );
    await userEvent.click(screen.getByText("Sales"));
    expect(onLoad).toHaveBeenCalledWith("a");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should delete a dashboard", async () => {
    const onDelete = vi.fn();
    render(
      <LoadDialog
        open
        dashboards={dashboards}
        onClose={vi.fn()}
        onLoad={vi.fn()}
        onDelete={onDelete}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Delete Ops" }),
    );
    expect(onDelete).toHaveBeenCalledWith("b");
  });
});
