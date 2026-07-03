import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Toolbar } from "./Toolbar";

describe("Toolbar", () => {
  it("should render the four actions", () => {
    render(
      <Toolbar
        onOpenSettings={vi.fn()}
        onOpenSave={vi.fn()}
        onOpenLoad={vi.fn()}
        onExport={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Grid settings" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save dashboard" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Load dashboard" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Export dashboard as JSON" }),
    ).toBeInTheDocument();
  });

  it("should fire the matching handler for each action", async () => {
    const onOpenSettings = vi.fn();
    const onOpenSave = vi.fn();
    const onOpenLoad = vi.fn();
    const onExport = vi.fn();
    render(
      <Toolbar
        onOpenSettings={onOpenSettings}
        onOpenSave={onOpenSave}
        onOpenLoad={onOpenLoad}
        onExport={onExport}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Grid settings" }));
    await userEvent.click(screen.getByRole("button", { name: "Save dashboard" }));
    await userEvent.click(screen.getByRole("button", { name: "Load dashboard" }));
    await userEvent.click(
      screen.getByRole("button", { name: "Export dashboard as JSON" }),
    );
    expect(onOpenSettings).toHaveBeenCalledTimes(1);
    expect(onOpenSave).toHaveBeenCalledTimes(1);
    expect(onOpenLoad).toHaveBeenCalledTimes(1);
    expect(onExport).toHaveBeenCalledTimes(1);
  });
});
