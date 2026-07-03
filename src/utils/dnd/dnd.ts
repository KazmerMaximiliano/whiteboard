
import type { WidgetInstance } from "../../providers/WhiteboardProvider/WhiteboardProvider.types";
import { deltaToCells, pointToCell, type GridMetrics } from "../grid/grid";
import type { PointLike } from "./dnd.types";

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
 * New top-left position for a moved widget given the drag delta in pixels.
 * x snaps to whole columns; y follows the pointer as a fractional row so the
 * widget moves finely on the vertical axis instead of jumping by a full row.
 */
export const resolveMovePosition = (
  widget: WidgetInstance,
  delta: { x: number; y: number },
  metrics: GridMetrics,
): { x: number; y: number } => {
  const { dx } = deltaToCells(delta.x, delta.y, metrics);
  const stepY = metrics.rowHeight + metrics.gap;
  const dy = stepY > 0 ? delta.y / stepY : 0;
  return { x: widget.position.x + dx, y: widget.position.y + dy };
};
