import type { GridConfig } from "../../providers/WhiteboardProvider/WhiteboardProvider.types";

export type GridSettingsPanelProps = {
  open: boolean;
  grid: GridConfig;
  onClose: () => void;
  onApply: (grid: GridConfig) => void;
};
