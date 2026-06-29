import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  describe("rendering", () => {
    it("should render its label", () => {
      render(<Button>Save</Button>);
      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });

    it("should apply the variant class", () => {
      render(<Button variant="ghost">Cancel</Button>);
      expect(screen.getByRole("button")).toHaveClass("button-ghost");
    });

    it("should expose an accessible label for icon buttons", () => {
      render(
        <Button variant="icon" ariaLabel="Settings">
          <svg />
        </Button>,
      );
      expect(
        screen.getByRole("button", { name: "Settings" }),
      ).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("should call onClick when pressed", async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Go</Button>);
      await userEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("edge cases", () => {
    it("should not fire onClick when disabled", async () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Go
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      await userEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
