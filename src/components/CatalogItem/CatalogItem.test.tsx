import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DndContext } from "@dnd-kit/core";
import { CatalogItem } from "./CatalogItem";
import type { WidgetCatalogEntry } from "../widgets/widgets.catalog";

const entry: WidgetCatalogEntry = {
  kind: "kpi",
  label: "KPI",
  description: "Single metric with trend",
  defaultSize: { w: 3, h: 2 },
};

describe("CatalogItem", () => {
  it("should render the entry label and description", () => {
    render(
      <DndContext>
        <CatalogItem entry={entry} />
      </DndContext>,
    );
    expect(screen.getByText("KPI")).toBeInTheDocument();
    expect(screen.getByText("Single metric with trend")).toBeInTheDocument();
  });
});
