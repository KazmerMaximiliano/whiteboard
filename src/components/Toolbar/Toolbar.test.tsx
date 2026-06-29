import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Toolbar } from "./Toolbar";

describe("Toolbar", () => {
  it("should render the three actions", () => {
    render(
      <Toolbar
        onOpenSettings={vi.fn()}
        onOpenSave={vi.fn()}
        onOpenLoad={vi.fn()}
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
  });

  it("should fire the matching handler for each action", async () => {
    const onOpenSettings = vi.fn();
    const onOpenSave = vi.fn();
    const onOpenLoad = vi.fn();
    render(
      <Toolbar
        onOpenSettings={onOpenSettings}
        onOpenSave={onOpenSave}
        onOpenLoad={onOpenLoad}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Grid settings" }));
    await userEvent.click(screen.getByRole("button", { name: "Save dashboard" }));
    await userEvent.click(screen.getByRole("button", { name: "Load dashboard" }));
    expect(onOpenSettings).toHaveBeenCalledTimes(1);
    expect(onOpenSave).toHaveBeenCalledTimes(1);
    expect(onOpenLoad).toHaveBeenCalledTimes(1);
  });
});
