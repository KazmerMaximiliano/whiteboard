import { ChartCard, KpiCard, TableCard, TextCard } from "../../widgets";
import type { WidgetRendererProps } from "./WidgetRenderer.types";

export const WidgetRenderer = ({ kind }: WidgetRendererProps) => {
  switch (kind) {
    case "kpi":
      return <KpiCard />;
    case "chart":
      return <ChartCard />;
    case "text":
      return <TextCard />;
    case "table":
      return <TableCard />;
    default:
      return null;
  }
};
