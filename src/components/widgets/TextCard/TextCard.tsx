import "./TextCard.styles.css";
import type { TextCardProps } from "./TextCard.types";

export const TextCard = ({ title = "Note" }: TextCardProps) => {
  return (
    <div className="text-card">
      <span className="text-card-title">{title}</span>
      <p className="text-card-body">
        Double-click to edit this note. Use it for context, reminders, or a
        short description of the dashboard.
      </p>
    </div>
  );
};
