import "./KpiCard.styles.css";
import type { KpiCardProps } from "./KpiCard.types";

export const KpiCard = ({ title = "Revenue" }: KpiCardProps) => {
  return (
    <div className="kpi-card">
      <span className="kpi-card-label">{title}</span>
      <span className="kpi-card-value">$24.5k</span>
      <span className="kpi-card-delta">▲ 12.4%</span>
    </div>
  );
};
