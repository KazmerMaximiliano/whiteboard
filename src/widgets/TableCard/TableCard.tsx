import { ROWS } from "./TableCard.consts";
import "./TableCard.styles.css";
import type { TableCardProps } from "./TableCard.types";

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
