import { Button } from "../Button/Button";
import { DownloadIcon, GearIcon, SaveIcon } from "../Icon/Icon";
import "./Toolbar.styles.css";
import type { ToolbarProps } from "./Toolbar.types";

export const Toolbar = ({
  onOpenSettings,
  onOpenSave,
  onOpenLoad,
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
    </nav>
  );
};
