import { deltaToCells, pointToCell } from "./grid";
import type { GridMetrics } from "./grid";
import type { WidgetInstance } from "../providers/WhiteboardProvider/WhiteboardProvider.types";

export type PointLike = {
  left: number;
  top: number;
};

/**
 * Grid cell where a catalog item dropped onto the board should land, derived
 * from the dragged element's translated rect relative to the grid rect.
 */
export const resolveCatalogDropCell = (
  translated: PointLike,
  gridRect: PointLike,
  metrics: GridMetrics,
): { x: number; y: number } =>
  pointToCell(
    translated.left - gridRect.left,
    translated.top - gridRect.top,
    metrics,
  );

/**
 * New top-left cell for a moved widget given the drag delta in pixels.
 */
export const resolveMovePosition = (
  widget: WidgetInstance,
  delta: { x: number; y: number },
  metrics: GridMetrics,
): { x: number; y: number } => {
  const { dx, dy } = deltaToCells(delta.x, delta.y, metrics);
  return { x: widget.position.x + dx, y: widget.position.y + dy };
};
