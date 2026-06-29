import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useWhiteboard } from "./useWhiteboard";
import { WhiteboardProvider } from "../providers/WhiteboardProvider/WhiteboardProvider";

describe("useWhiteboard", () => {
  it("should throw when used outside a provider", () => {
    expect(() => renderHook(() => useWhiteboard())).toThrow(
      /must be used within a WhiteboardProvider/,
    );
  });

  it("should return the context value inside a provider", () => {
    const { result } = renderHook(() => useWhiteboard(), {
      wrapper: WhiteboardProvider,
    });
    expect(result.current.grid.columns).toBe(12);
    expect(typeof result.current.addWidget).toBe("function");
  });
});
