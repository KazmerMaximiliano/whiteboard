import type { GridPosition, WidgetKind } from "../providers/WhiteboardProvider/WhiteboardProvider.types";

export type WidgetSize = Pick<GridPosition, "w" | "h">;

export type WidgetCatalogEntry = {
  kind: WidgetKind;
  label: string;
  description: string;
  defaultSize: WidgetSize;
};

export const WIDGET_CATALOG: WidgetCatalogEntry[] = [
  {
    kind: "kpi",
    label: "KPI",
    description: "Single metric with trend",
    defaultSize: { w: 3, h: 2 },
  },
  {
    kind: "chart",
    label: "Chart",
    description: "Bar chart placeholder",
    defaultSize: { w: 6, h: 3 },
  },
  {
    kind: "text",
    label: "Text",
    description: "Note or description",
    defaultSize: { w: 4, h: 2 },
  },
  {
    kind: "table",
    label: "Table",
    description: "Tabular list",
    defaultSize: { w: 4, h: 3 },
  },
];

export const getDefaultSize = (kind: WidgetKind): WidgetSize =>
  WIDGET_CATALOG.find((entry) => entry.kind === kind)?.defaultSize ?? {
    w: 3,
    h: 2,
  };
