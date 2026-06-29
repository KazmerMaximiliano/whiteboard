import type { ReactNode } from "react";

export type WidgetKind = "kpi" | "chart" | "text" | "table";

export type GridPosition = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type WidgetInstance = {
  id: string;
  kind: WidgetKind;
  position: GridPosition;
};

export type GridConfig = {
  columns: number;
  gap: number;
  maxWidth: number;
  rowHeight: number;
};

export type DashboardConfig = {
  id: string;
  name: string;
  grid: GridConfig;
  widgets: WidgetInstance[];
  updatedAt: number;
};

export type WhiteboardState = {
  grid: GridConfig;
  widgets: WidgetInstance[];
};

export type WhiteboardAction =
  | { type: "ADD_WIDGET"; widget: WidgetInstance }
  | { type: "MOVE_WIDGET"; id: string; x: number; y: number }
  | { type: "RESIZE_WIDGET"; id: string; w: number; h: number }
  | { type: "REMOVE_WIDGET"; id: string }
  | { type: "UPDATE_GRID"; grid: Partial<GridConfig> }
  | { type: "LOAD_DASHBOARD"; dashboard: DashboardConfig }
  | { type: "RESET" };

export type WhiteboardContextValue = {
  grid: GridConfig;
  widgets: WidgetInstance[];
  addWidget: (kind: WidgetKind, position: GridPosition) => void;
  moveWidget: (id: string, x: number, y: number) => void;
  resizeWidget: (id: string, w: number, h: number) => void;
  removeWidget: (id: string) => void;
  updateGrid: (grid: Partial<GridConfig>) => void;
  loadDashboard: (dashboard: DashboardConfig) => void;
  reset: () => void;
};

export type WhiteboardProviderProps = {
  children: ReactNode;
};
