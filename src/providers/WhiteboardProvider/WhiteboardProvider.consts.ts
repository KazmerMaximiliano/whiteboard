import type { GridConfig, WhiteboardState } from "./WhiteboardProvider.types";

export const DEFAULT_GRID: GridConfig = {
  columns: 12,
  gap: 12,
  maxWidth: 1280,
  rowHeight: 80,
};

export const initialWhiteboardState: WhiteboardState = {
  grid: DEFAULT_GRID,
  widgets: [],
};
