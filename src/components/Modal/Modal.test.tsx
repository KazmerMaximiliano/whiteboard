import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

describe("Modal", () => {
  describe("rendering", () => {
    it("should not render when closed", () => {
      render(
        <Modal open={false} title="Settings" onClose={vi.fn()}>
          body
        </Modal>,
      );
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should render title and children when open", () => {
      render(
        <Modal open title="Settings" onClose={vi.fn()}>
          <p>content</p>
        </Modal>,
      );
      expect(screen.getByRole("dialog", { name: "Settings" })).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("should close via the close button", async () => {
      const onClose = vi.fn();
      render(
        <Modal open title="Settings" onClose={onClose}>
          body
        </Modal>,
      );
      await userEvent.click(screen.getByRole("button", { name: "Close" }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should close on Escape", async () => {
      const onClose = vi.fn();
      render(
        <Modal open title="Settings" onClose={onClose}>
          body
        </Modal>,
      );
      await userEvent.keyboard("{Escape}");
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("edge cases", () => {
    it("should not close when clicking inside the dialog", async () => {
      const onClose = vi.fn();
      render(
        <Modal open title="Settings" onClose={onClose}>
          <p>content</p>
        </Modal>,
      );
      await userEvent.click(screen.getByText("content"));
      expect(onClose).not.toHaveBeenCalled();
    });
  });
});
