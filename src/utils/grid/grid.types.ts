/**
 * Pixel geometry of the grid, derived from the measured container width and the
 * current grid configuration. Drives all px <-> grid-cell conversions.
 */
export type GridMetrics = {
  cellWidth: number;
  rowHeight: number;
  gap: number;
  columns: number;
};