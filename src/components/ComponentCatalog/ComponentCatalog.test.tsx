import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { DndContext } from "@dnd-kit/core";
import { ComponentCatalog } from "./ComponentCatalog";

const renderCatalog = (defaultExpanded = false) =>
  render(
    <DndContext>
      <ComponentCatalog defaultExpanded={defaultExpanded} />
    </DndContext>,
  );

describe("ComponentCatalog", () => {
  describe("rendering", () => {
    it("should render the title and all catalog entries", () => {
      renderCatalog();
      expect(screen.getByText("Component Catalog")).toBeInTheDocument();
      expect(screen.getByText("KPI")).toBeInTheDocument();
      expect(screen.getByText("Chart")).toBeInTheDocument();
      expect(screen.getByText("Text")).toBeInTheDocument();
      expect(screen.getByText("Table")).toBeInTheDocument();
    });

    it("should start collapsed by default", () => {
      renderCatalog();
      expect(screen.getByRole("button", { name: /Component Catalog/ })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });
  });

  describe("interactions", () => {
    it("should toggle expansion when the header is clicked", async () => {
      renderCatalog();
      const toggle = screen.getByRole("button", { name: /Component Catalog/ });
      await userEvent.click(toggle);
      expect(toggle).toHaveAttribute("aria-expanded", "true");
      await userEvent.click(toggle);
      expect(toggle).toHaveAttribute("aria-expanded", "false");
    });
  });
});
