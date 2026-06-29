import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WidgetRenderer } from "./WidgetRenderer";

describe("WidgetRenderer", () => {
  it("should render the KPI widget", () => {
    render(<WidgetRenderer kind="kpi" />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
  });

  it("should render the chart widget", () => {
    render(<WidgetRenderer kind="chart" />);
    expect(screen.getByText("Traffic")).toBeInTheDocument();
  });

  it("should render the text widget", () => {
    render(<WidgetRenderer kind="text" />);
    expect(screen.getByText("Note")).toBeInTheDocument();
  });

  it("should render the table widget", () => {
    render(<WidgetRenderer kind="table" />);
    expect(screen.getByText("Top Accounts")).toBeInTheDocument();
  });
});
