import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useWhiteboard } from "../../hooks";
import { WhiteboardProvider } from "./WhiteboardProvider";
import {
  DEFAULT_GRID,
  initialWhiteboardState,
} from "./WhiteboardProvider.consts";
import { whiteboardReducer } from "./WhiteboardProvider.reducer";
import type {
  DashboardConfig,
  WidgetInstance,
} from "./WhiteboardProvider.types";

const widget: WidgetInstance = {
  id: "w1",
  kind: "kpi",
  position: { x: 0, y: 0, w: 3, h: 2 },
};

describe("whiteboardReducer", () => {
  it("should add a widget clamped to bounds", () => {
    const next = whiteboardReducer(initialWhiteboardState, {
      type: "ADD_WIDGET",
      widget: { ...widget, position: { x: 20, y: 0, w: 99, h: 1 } },
    });
    expect(next.widgets).toHaveLength(1);
    expect(next.widgets[0].position).toEqual({ x: 0, y: 0, w: 12, h: 1 });
  });

  it("should move a widget", () => {
    const start = { ...initialWhiteboardState, widgets: [widget] };
    const next = whiteboardReducer(start, {
      type: "MOVE_WIDGET",
      id: "w1",
      x: 4,
      y: 3,
    });
    expect(next.widgets[0].position).toMatchObject({ x: 4, y: 3, w: 3, h: 2 });
  });

  it("should resize a widget", () => {
    const start = { ...initialWhiteboardState, widgets: [widget] };
    const next = whiteboardReducer(start, {
      type: "RESIZE_WIDGET",
      id: "w1",
      w: 6,
      h: 4,
    });
    expect(next.widgets[0].position).toMatchObject({ w: 6, h: 4 });
  });

  it("should remove a widget", () => {
    const start = { ...initialWhiteboardState, widgets: [widget] };
    const next = whiteboardReducer(start, { type: "REMOVE_WIDGET", id: "w1" });
    expect(next.widgets).toHaveLength(0);
  });

  it("should update grid and re-clamp widgets to fewer columns", () => {
    const wide: WidgetInstance = {
      id: "w2",
      kind: "chart",
      position: { x: 6, y: 0, w: 6, h: 2 },
    };
    const start = { ...initialWhiteboardState, widgets: [wide] };
    const next = whiteboardReducer(start, {
      type: "UPDATE_GRID",
      grid: { columns: 4 },
    });
    expect(next.grid.columns).toBe(4);
    expect(next.widgets[0].position.w).toBe(4);
    expect(next.widgets[0].position.x).toBe(0);
  });

  it("should load a dashboard", () => {
    const dashboard: DashboardConfig = {
      id: "d1",
      name: "Demo",
      grid: { ...DEFAULT_GRID, columns: 6 },
      widgets: [widget],
      updatedAt: 1,
    };
    const next = whiteboardReducer(initialWhiteboardState, {
      type: "LOAD_DASHBOARD",
      dashboard,
    });
    expect(next.grid.columns).toBe(6);
    expect(next.widgets).toHaveLength(1);
  });

  it("should reset to initial state", () => {
    const start = { ...initialWhiteboardState, widgets: [widget] };
    expect(whiteboardReducer(start, { type: "RESET" })).toEqual(
      initialWhiteboardState,
    );
  });
});

describe("WhiteboardProvider", () => {
  it("should expose actions that update state", () => {
    const { result } = renderHook(() => useWhiteboard(), {
      wrapper: WhiteboardProvider,
    });

    expect(result.current.widgets).toHaveLength(0);

    act(() => result.current.addWidget("kpi", { x: 0, y: 0, w: 3, h: 2 }));
    expect(result.current.widgets).toHaveLength(1);

    const id = result.current.widgets[0].id;
    act(() => result.current.moveWidget(id, 2, 1));
    expect(result.current.widgets[0].position).toMatchObject({ x: 2, y: 1 });

    act(() => result.current.updateGrid({ gap: 20 }));
    expect(result.current.grid.gap).toBe(20);

    act(() => result.current.removeWidget(id));
    expect(result.current.widgets).toHaveLength(0);
  });
});
