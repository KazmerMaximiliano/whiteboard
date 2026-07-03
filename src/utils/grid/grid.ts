import type { CSSProperties } from "react";
import type { GridPosition } from "../../providers/WhiteboardProvider/WhiteboardProvider.types";
import type { GridMetrics } from "./grid.types";

/**
 * Compute the width of a single column given the container width, column count
 * and gap. Returns 0 when the container has not been measured yet.
 */
export const computeCellWidth = (
  containerWidth: number,
  columns: number,
  gap: number,
): number => {
  if (containerWidth <= 0 || columns <= 0) {
    return 0;
  }
  return (containerWidth - (columns - 1) * gap) / columns;
};

/**
 * Keep a position inside the grid bounds: width within [1, columns], height >= 1,
 * and the widget fully visible horizontally. x and w snap to whole cells;
 * y and h stay continuous so vertical moving and resizing are pixel-fine.
 */
export const clampPosition = (
  position: GridPosition,
  columns: number,
): GridPosition => {
  const w = Math.min(Math.max(1, Math.round(position.w)), columns);
  const h = Math.max(1, position.h);
  const x = Math.min(Math.max(0, Math.round(position.x)), columns - w);
  const y = Math.max(0, position.y);
  return { x, y, w, h };
};

/**
 * Convert a pixel delta (e.g. a drag translation) into a whole number of grid
 * cells moved on each axis.
 */
export const deltaToCells = (
  dxPx: number,
  dyPx: number,
  metrics: GridMetrics,
): { dx: number; dy: number } => {
  const stepX = metrics.cellWidth + metrics.gap;
  const stepY = metrics.rowHeight + metrics.gap;
  return {
    dx: stepX > 0 ? Math.round(dxPx / stepX) : 0,
    dy: stepY > 0 ? Math.round(dyPx / stepY) : 0,
  };
};

/**
 * Convert a point (relative to the grid's top-left) into the grid cell that
 * contains it.
 */
export const pointToCell = (
  xPx: number,
  yPx: number,
  metrics: GridMetrics,
): { x: number; y: number } => {
  const stepX = metrics.cellWidth + metrics.gap;
  const stepY = metrics.rowHeight + metrics.gap;
  return {
    x: stepX > 0 ? Math.floor(xPx / stepX) : 0,
    y: stepY > 0 ? Math.floor(yPx / stepY) : 0,
  };
};

/**
 * Translate a grid position into absolute CSS box coordinates for rendering
 * inside a position: relative grid container.
 */
export const positionToStyle = (
  position: GridPosition,
  metrics: GridMetrics,
): CSSProperties => {
  const stepX = metrics.cellWidth + metrics.gap;
  const stepY = metrics.rowHeight + metrics.gap;
  return {
    left: position.x * stepX,
    top: position.y * stepY,
    width: position.w * metrics.cellWidth + (position.w - 1) * metrics.gap,
    height: position.h * metrics.rowHeight + (position.h - 1) * metrics.gap,
  };
};
