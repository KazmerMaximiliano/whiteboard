import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TableCard } from "./TableCard";

describe("TableCard", () => {
  it("should render the title and rows", () => {
    render(<TableCard title="Revenue by account" />);
    expect(screen.getByText("Revenue by account")).toBeInTheDocument();
    expect(screen.getByText("Acme Inc.")).toBeInTheDocument();
    expect(screen.getByText("$12,400")).toBeInTheDocument();
  });
});
