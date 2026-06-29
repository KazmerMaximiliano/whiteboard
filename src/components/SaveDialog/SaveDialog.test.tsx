import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { SaveDialog } from "./SaveDialog";

describe("SaveDialog", () => {
  it("should disable save when the name is empty", () => {
    render(<SaveDialog open onClose={vi.fn()} onSave={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });

  it("should save the trimmed name and close", async () => {
    const onSave = vi.fn();
    const onClose = vi.fn();
    render(<SaveDialog open onClose={onClose} onSave={onSave} />);
    await userEvent.type(screen.getByLabelText("Dashboard name"), "  Sales  ");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onSave).toHaveBeenCalledWith("Sales");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should seed the input from defaultName", () => {
    render(
      <SaveDialog open defaultName="Ops" onClose={vi.fn()} onSave={vi.fn()} />,
    );
    expect(screen.getByLabelText("Dashboard name")).toHaveValue("Ops");
  });
});
