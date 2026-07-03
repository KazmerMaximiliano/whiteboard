import { Button } from "../Button/Button";
import { DownloadIcon, ExportIcon, GearIcon, SaveIcon } from "../Icon/Icon";
import "./Toolbar.styles.css";
import type { ToolbarProps } from "./Toolbar.types";

export const Toolbar = ({
  onOpenSettings,
  onOpenSave,
  onOpenLoad,
  onExport,
}: ToolbarProps) => {
  return (
    <nav className="toolbar" aria-label="Whiteboard actions">
      <Button variant="icon" ariaLabel="Grid settings" onClick={onOpenSettings}>
        <GearIcon />
      </Button>
      <span className="toolbar-divider" />
      <Button variant="icon" ariaLabel="Save dashboard" onClick={onOpenSave}>
        <SaveIcon />
      </Button>
      <span className="toolbar-divider" />
      <Button variant="icon" ariaLabel="Load dashboard" onClick={onOpenLoad}>
        <DownloadIcon />
      </Button>
      <span className="toolbar-divider" />
      <Button variant="icon" ariaLabel="Export dashboard as JSON" onClick={onExport}>
        <ExportIcon />
      </Button>
    </nav>
  );
};
