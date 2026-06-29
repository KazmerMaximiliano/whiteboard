import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GearIcon, SaveIcon, DownloadIcon } from "./Icon";

describe("Icon", () => {
  it("should render an svg at the requested size", () => {
    const { container } = render(<GearIcon size={32} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "32");
  });

  it("should render the toolbar icon set", () => {
    const { container } = render(
      <>
        <SaveIcon />
        <DownloadIcon />
      </>,
    );
    expect(container.querySelectorAll("svg")).toHaveLength(2);
  });
});
