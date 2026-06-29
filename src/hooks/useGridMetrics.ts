import { useEffect, useRef, useState } from "react";
import { computeCellWidth } from "../utils/grid";
import type { GridMetrics } from "../utils/grid";
import type { GridConfig } from "../providers/WhiteboardProvider/WhiteboardProvider.types";

/**
 * Measure the grid container and derive pixel geometry for the current grid
 * configuration. Returns the ref to attach to the container plus live metrics.
 */
export const useGridMetrics = (grid: GridConfig) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(element);
    setWidth(element.clientWidth);
    return () => observer.disconnect();
  }, []);

  const metrics: GridMetrics = {
    cellWidth: computeCellWidth(width, grid.columns, grid.gap),
    rowHeight: grid.rowHeight,
    gap: grid.gap,
    columns: grid.columns,
  };

  return { ref, metrics, width };
};
