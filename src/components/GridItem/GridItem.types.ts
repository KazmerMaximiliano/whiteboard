import type { WidgetInstance } from "../../providers/WhiteboardProvider/WhiteboardProvider.types";
import type { GridMetrics } from "../../utils/grid/grid.types";


export type GridItemProps = {
  widget: WidgetInstance;
  metrics: GridMetrics;
  onRemove: (id: string) => void;
  onResize: (id: string, w: number, h: number) => void;
};
