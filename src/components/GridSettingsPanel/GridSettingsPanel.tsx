import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { clamp } from "./GridSettingsPanel.consts";
import "./GridSettingsPanel.styles.css";
import type {
  GridSettingsFormProps,
  GridSettingsPanelProps,
} from "./GridSettingsPanel.types";

const GridSettingsForm = ({
  grid,
  onClose,
  onApply,
}: GridSettingsFormProps) => {
  const [columns, setColumns] = useState(grid.columns);
  const [gap, setGap] = useState(grid.gap);
  const [maxWidth, setMaxWidth] = useState(grid.maxWidth);
  const [rowHeight, setRowHeight] = useState(grid.rowHeight);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    onApply({
      columns: clamp(columns, 1, 24),
      gap: clamp(gap, 0, 64),
      maxWidth: clamp(maxWidth, 0, 4000),
      rowHeight: clamp(rowHeight, 40, 320),
    });
    onClose();
  };

  return (
    <form className="grid-settings" noValidate onSubmit={handleSubmit}>
      <label className="grid-settings-field">
        <span>Columns</span>
        <input
          type="number"
          min={1}
          max={24}
          value={columns}
          onChange={(event) => setColumns(Number(event.target.value))}
        />
      </label>
      <label className="grid-settings-field">
        <span>Gap (px)</span>
        <input
          type="number"
          min={0}
          max={64}
          value={gap}
          onChange={(event) => setGap(Number(event.target.value))}
        />
      </label>
      <label className="grid-settings-field">
        <span>Max width (px, 0 = full)</span>
        <input
          type="number"
          min={0}
          max={4000}
          value={maxWidth}
          onChange={(event) => setMaxWidth(Number(event.target.value))}
        />
      </label>
      <label className="grid-settings-field">
        <span>Row height (px)</span>
        <input
          type="number"
          min={40}
          max={320}
          value={rowHeight}
          onChange={(event) => setRowHeight(Number(event.target.value))}
        />
      </label>
      <div className="grid-settings-actions">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Apply</Button>
      </div>
    </form>
  );
};

export const GridSettingsPanel = ({
  open,
  grid,
  onClose,
  onApply,
}: GridSettingsPanelProps) => {
  return (
    <Modal open={open} title="Grid settings" onClose={onClose}>
      <GridSettingsForm grid={grid} onClose={onClose} onApply={onApply} />
    </Modal>
  );
};
