import type { RefObject } from "react";
import type {
  GridConfig,
  WidgetInstance,
} from "../../providers/WhiteboardProvider/WhiteboardProvider.types";
import type { GridMetrics } from "../../utils/grid";

export type WhiteboardCanvasProps = {
  widgets: WidgetInstance[];
  grid: GridConfig;
  metrics: GridMetrics;
  gridRef: RefObject<HTMLDivElement | null>;
  onRemove: (id: string) => void;
  onResize: (id: string, w: number, h: number) => void;
};
