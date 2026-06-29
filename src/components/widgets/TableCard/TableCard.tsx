import "./TableCard.styles.css";
import type { TableCardProps } from "./TableCard.types";

const ROWS = [
  { label: "Acme Inc.", value: "$12,400" },
  { label: "Globex", value: "$9,210" },
  { label: "Initech", value: "$7,880" },
  { label: "Umbrella", value: "$5,140" },
];

export const TableCard = ({ title = "Top Accounts" }: TableCardProps) => {
  return (
    <div className="table-card">
      <span className="table-card-title">{title}</span>
      <table className="table-card-table">
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              <td className="table-card-value">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
