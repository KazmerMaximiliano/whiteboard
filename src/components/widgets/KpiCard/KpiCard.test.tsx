import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { KpiCard } from "./KpiCard";

describe("KpiCard", () => {
  it("should render the default title", () => {
    render(<KpiCard />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
  });

  it("should render a custom title", () => {
    render(<KpiCard title="Users" />);
    expect(screen.getByText("Users")).toBeInTheDocument();
  });
});
