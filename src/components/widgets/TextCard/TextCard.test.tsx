import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TextCard } from "./TextCard";

describe("TextCard", () => {
  it("should render the title and body", () => {
    render(<TextCard title="Summary" />);
    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(screen.getByText(/Double-click to edit/)).toBeInTheDocument();
  });
});
