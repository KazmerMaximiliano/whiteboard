import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { TrashIcon } from "../Icon/Icon";
import "./LoadDialog.styles.css";
import type { LoadDialogProps } from "./LoadDialog.types";

const formatDate = (timestamp: number): string =>
  new Date(timestamp).toLocaleString();

export const LoadDialog = ({
  open,
  dashboards,
  onClose,
  onLoad,
  onDelete,
}: LoadDialogProps) => {
  return (
    <Modal open={open} title="Load dashboard" onClose={onClose}>
      {dashboards.length === 0 ? (
        <p className="load-dialog-empty">No saved dashboards yet.</p>
      ) : (
        <ul className="load-dialog-list">
          {dashboards.map((dashboard) => (
            <li key={dashboard.id} className="load-dialog-item">
              <button
                type="button"
                className="load-dialog-select"
                onClick={() => {
                  onLoad(dashboard.id);
                  onClose();
                }}
              >
                <span className="load-dialog-name">{dashboard.name}</span>
                <span className="load-dialog-date">
                  {formatDate(dashboard.updatedAt)}
                </span>
              </button>
              <Button
                variant="icon"
                ariaLabel={`Delete ${dashboard.name}`}
                onClick={() => onDelete(dashboard.id)}
              >
                <TrashIcon />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};
