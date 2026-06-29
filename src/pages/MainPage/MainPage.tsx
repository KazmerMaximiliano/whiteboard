import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { ComponentCatalog } from "../../components/ComponentCatalog/ComponentCatalog";
import { GridSettingsPanel } from "../../components/GridSettingsPanel/GridSettingsPanel";
import { LoadDialog } from "../../components/LoadDialog/LoadDialog";
import { SaveDialog } from "../../components/SaveDialog/SaveDialog";
import { Toolbar } from "../../components/Toolbar/Toolbar";
import { WHITEBOARD_DROPPABLE_ID } from "../../components/WhiteboardCanvas/Whiteboard.consts";
import { WhiteboardCanvas } from "../../components/WhiteboardCanvas/WhiteboardCanvas";
import { WidgetRenderer } from "../../components/WidgetRenderer/WidgetRenderer";
import { useGridMetrics, useWhiteboard } from "../../hooks";
import { WhiteboardProvider } from "../../providers/WhiteboardProvider/WhiteboardProvider";
import type { DashboardConfig } from "../../providers/WhiteboardProvider/WhiteboardProvider.types";

import {
  deleteDashboard,
  listDashboards,
  loadDashboard as readDashboard,
  saveDashboard,
} from "../../services/dashboardStorage/dashboardStorage";
import type { DashboardSummary } from "../../services/dashboardStorage/dashboardStorage.types";

import {
  positionToStyle,
  resolveCatalogDropCell,
  resolveMovePosition,
} from "../../utils";
import { createId } from "../../utils/id/id";
import { getDefaultSize, WIDGET_CATALOG } from "../../widgets/widgets.catalog";
import "./MainPage.styles.css";
import type { ActiveDrag, DragData } from "./MainPage.types";

const WhiteboardView = () => {
  const {
    grid,
    widgets,
    addWidget,
    moveWidget,
    resizeWidget,
    removeWidget,
    updateGrid,
    loadDashboard,
  } = useWhiteboard();
  const { ref: gridRef, metrics } = useGridMetrics(grid);

  const [activeDrag, setActiveDrag] = useState<ActiveDrag>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [loadOpen, setLoadOpen] = useState(false);
  const [saved, setSaved] = useState<DashboardSummary[]>([]);
  const [current, setCurrent] = useState<{ id: string; name: string } | null>(
    null,
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const handleDragStart = (event: DragStartEvent): void => {
    const data = event.active.data.current as DragData | undefined;
    if (data?.type === "catalog" && data.kind) {
      setActiveDrag({ type: "catalog", kind: data.kind });
    } else if (data?.type === "move" && data.widgetId) {
      setActiveDrag({ type: "move", widgetId: data.widgetId });
    }
  };

  const handleDragEnd = (event: DragEndEvent): void => {
    setActiveDrag(null);
    const data = event.active.data.current as DragData | undefined;
    if (!data) {
      return;
    }

    if (data.type === "catalog" && data.kind) {
      if (event.over?.id !== WHITEBOARD_DROPPABLE_ID) {
        return;
      }
      const gridElement = gridRef.current;
      const translated = event.active.rect.current.translated;
      if (!gridElement || !translated) {
        return;
      }
      const gridRect = gridElement.getBoundingClientRect();
      const cell = resolveCatalogDropCell(translated, gridRect, metrics);
      addWidget(data.kind, { ...cell, ...getDefaultSize(data.kind) });
      return;
    }

    if (data.type === "move" && data.widgetId) {
      const widget = widgets.find(
        (item: { id: string | undefined }) => item.id === data.widgetId,
      );
      if (!widget) {
        return;
      }
      const { x, y } = resolveMovePosition(widget, event.delta, metrics);
      moveWidget(widget.id, x, y);
    }
  };

  const handleSave = (name: string): void => {
    const existing = listDashboards().find((item) => item.name === name);
    const id = existing?.id ?? createId();
    const config: DashboardConfig = {
      id,
      name,
      grid,
      widgets,
      updatedAt: Date.now(),
    };
    saveDashboard(config);
    setCurrent({ id, name });
  };

  const handleLoad = (id: string): void => {
    const config = readDashboard(id);
    if (config) {
      loadDashboard(config);
      setCurrent({ id: config.id, name: config.name });
    }
  };

  const handleDelete = (id: string): void => {
    deleteDashboard(id);
    setSaved(listDashboards());
    if (current?.id === id) {
      setCurrent(null);
    }
  };

  const openLoad = (): void => {
    setSaved(listDashboards());
    setLoadOpen(true);
  };

  const renderOverlay = () => {
    if (!activeDrag) {
      return null;
    }
    if (activeDrag.type === "catalog") {
      const entry = WIDGET_CATALOG.find(
        (item) => item.kind === activeDrag.kind,
      );
      const style = positionToStyle(
        { x: 0, y: 0, ...getDefaultSize(activeDrag.kind) },
        metrics,
      );
      return (
        <div
          className="drag-preview"
          style={{ width: style.width, height: style.height }}
        >
          {entry?.label}
        </div>
      );
    }
    const widget = widgets.find(
      (item: { id: string }) => item.id === activeDrag.widgetId,
    );
    if (!widget) {
      return null;
    }
    const style = positionToStyle(widget.position, metrics);
    return (
      <div
        className="drag-preview drag-preview-widget"
        style={{ width: style.width, height: style.height }}
      >
        <WidgetRenderer kind={widget.kind} />
      </div>
    );
  };

  return (
    <div className="main-page">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <WhiteboardCanvas
          widgets={widgets}
          grid={grid}
          metrics={metrics}
          gridRef={gridRef}
          onRemove={removeWidget}
          onResize={resizeWidget}
        />
        <ComponentCatalog />
        <DragOverlay>{renderOverlay()}</DragOverlay>
      </DndContext>

      <Toolbar
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenSave={() => setSaveOpen(true)}
        onOpenLoad={openLoad}
      />

      <GridSettingsPanel
        open={settingsOpen}
        grid={grid}
        onClose={() => setSettingsOpen(false)}
        onApply={updateGrid}
      />
      <SaveDialog
        open={saveOpen}
        defaultName={current?.name}
        onClose={() => setSaveOpen(false)}
        onSave={handleSave}
      />
      <LoadDialog
        open={loadOpen}
        dashboards={saved}
        onClose={() => setLoadOpen(false)}
        onLoad={handleLoad}
        onDelete={handleDelete}
      />
    </div>
  );
};

export const MainPage = () => {
  return (
    <WhiteboardProvider>
      <WhiteboardView />
    </WhiteboardProvider>
  );
};
