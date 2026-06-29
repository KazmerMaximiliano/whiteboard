import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ChartCard } from "./ChartCard";

describe("ChartCard", () => {
  it("should render the title", () => {
    render(<ChartCard title="Sessions" />);
    expect(screen.getByText("Sessions")).toBeInTheDocument();
  });

  it("should expose an accessible chart label", () => {
    render(<ChartCard title="Sessions" />);
    expect(screen.getByRole("img", { name: "Sessions chart" })).toBeInTheDocument();
  });
});
