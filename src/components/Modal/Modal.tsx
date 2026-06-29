import { useEffect } from "react";
import { Button } from "../Button/Button";
import { CloseIcon } from "../Icon/Icon";
import "./Modal.styles.css";
import type { ModalProps } from "./Modal.types";

export const Modal = ({
  open,
  title,
  onClose,
  children,
  footer,
}: ModalProps) => {
  useEffect(() => {
    if (!open) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <Button variant="icon" ariaLabel="Close" onClick={onClose}>
            <CloseIcon />
          </Button>
        </header>
        <div className="modal-body">{children}</div>
        {footer ? <footer className="modal-footer">{footer}</footer> : null}
      </div>
    </div>
  );
};
