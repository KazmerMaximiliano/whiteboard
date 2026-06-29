import "./ChartCard.styles.css";
import type { ChartCardProps } from "./ChartCard.types";

const BARS = [45, 70, 35, 85, 55, 95, 60];

export const ChartCard = ({ title = "Traffic" }: ChartCardProps) => {
  return (
    <div className="chart-card">
      <span className="chart-card-title">{title}</span>
      <div className="chart-card-bars" role="img" aria-label={`${title} chart`}>
        {BARS.map((value, index) => (
          <span
            key={index}
            className="chart-card-bar"
            style={{ height: `${value}%` }}
          />
        ))}
      </div>
    </div>
  );
};
