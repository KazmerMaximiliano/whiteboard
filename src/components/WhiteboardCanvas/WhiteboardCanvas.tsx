import { useDroppable } from "@dnd-kit/core";
import type { CSSProperties } from "react";
import { GridItem } from "../GridItem/GridItem";
import { WHITEBOARD_DROPPABLE_ID } from "./Whiteboard.consts";
import "./WhiteboardCanvas.styles.css";
import type { WhiteboardCanvasProps } from "./WhiteboardCanvas.types";

export const WhiteboardCanvas = ({
  widgets,
  grid,
  metrics,
  gridRef,
  onRemove,
  onResize,
}: WhiteboardCanvasProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: WHITEBOARD_DROPPABLE_ID });

  const setRefs = (node: HTMLDivElement | null): void => {
    gridRef.current = node;
    setNodeRef(node);
  };

  const style = {
    maxWidth: grid.maxWidth > 0 ? grid.maxWidth : undefined,
    "--wb-cell-width": `${metrics.cellWidth}px`,
    "--wb-gap": `${metrics.gap}px`,
  } as CSSProperties;

  return (
    <div className={`whiteboard-canvas${isOver ? " is-over" : ""}`}>
      <div ref={setRefs} className="whiteboard-grid" style={style}>
        <div className="whiteboard-grid-overlay" aria-hidden="true" />
        {widgets.map((widget) => (
          <GridItem
            key={widget.id}
            widget={widget}
            metrics={metrics}
            onRemove={onRemove}
            onResize={onResize}
          />
        ))}
        {widgets.length === 0 ? (
          <p className="whiteboard-empty">
            Drag a component from the catalog to start building
          </p>
        ) : null}
      </div>
    </div>
  );
};
