import { KpiCard } from "../widgets/KpiCard/KpiCard";
import { ChartCard } from "../widgets/ChartCard/ChartCard";
import { TextCard } from "../widgets/TextCard/TextCard";
import { TableCard } from "../widgets/TableCard/TableCard";
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
