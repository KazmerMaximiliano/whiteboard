import { useDraggable } from "@dnd-kit/core";
import "./CatalogItem.styles.css";
import type { CSSProperties } from "react";
import type { CatalogItemProps } from "./CatalogItem.types";

export const CatalogItem = ({ entry }: CatalogItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `catalog-${entry.kind}`,
    data: { type: "catalog", kind: entry.kind },
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <button
      ref={setNodeRef}
      type="button"
      className="catalog-item"
      style={style}
      {...attributes}
      {...listeners}
    >
      <span className="catalog-item-label">{entry.label}</span>
      <span className="catalog-item-description">{entry.description}</span>
    </button>
  );
};
