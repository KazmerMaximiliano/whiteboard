import type { WidgetKind } from "../../providers/WhiteboardProvider/WhiteboardProvider.types";

export type ActiveDrag =
  | { type: "catalog"; kind: WidgetKind }
  | { type: "move"; widgetId: string }
  | null;

export type DragData = {
  type?: "catalog" | "move";
  kind?: WidgetKind;
  widgetId?: string;
};