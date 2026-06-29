import { useDraggable } from "@dnd-kit/core";
import { Button } from "../Button/Button";
import { GripIcon, TrashIcon } from "../Icon/Icon";
import { WidgetRenderer } from "../WidgetRenderer/WidgetRenderer";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { positionToStyle } from "../../utils";
import "./GridItem.styles.css";
import type { GridItemProps } from "./GridItem.types";

export const GridItem = ({
  widget,
  metrics,
  onRemove,
  onResize,
}: GridItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: widget.id,
    data: { type: "move", widgetId: widget.id },
  });

  const style: CSSProperties = {
    ...positionToStyle(widget.position, metrics),
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 5 : undefined,
  };

  const handleResizeStart = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ): void => {
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startY = event.clientY;
    const startW = widget.position.w;
    const startH = widget.position.h;
    const stepX = metrics.cellWidth + metrics.gap;
    const stepY = metrics.rowHeight + metrics.gap;

    const handleMove = (moveEvent: PointerEvent): void => {
      const dCols =
        stepX > 0 ? Math.round((moveEvent.clientX - startX) / stepX) : 0;
      const dRows =
        stepY > 0 ? Math.round((moveEvent.clientY - startY) / stepY) : 0;
      onResize(widget.id, startW + dCols, startH + dRows);
    };
    const handleUp = (): void => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  return (
    <div ref={setNodeRef} className="grid-item" style={style}>
      <div className="grid-item-toolbar">
        <button
          type="button"
          className="grid-item-handle"
          aria-label="Move widget"
          {...attributes}
          {...listeners}
        >
          <GripIcon />
        </button>
        <Button
          variant="icon"
          ariaLabel="Remove widget"
          onClick={() => onRemove(widget.id)}
        >
          <TrashIcon />
        </Button>
      </div>
      <div className="grid-item-body">
        <WidgetRenderer kind={widget.kind} />
      </div>
      <button
        type="button"
        className="grid-item-resize"
        aria-label="Resize widget"
        onPointerDown={handleResizeStart}
      />
    </div>
  );
};
