import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import "./SaveDialog.styles.css";
import type { SaveDialogFormProps, SaveDialogProps } from "./SaveDialog.types";

const SaveDialogForm = ({
  defaultName,
  onClose,
  onSave,
}: SaveDialogFormProps) => {
  const [name, setName] = useState(defaultName);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }
    onSave(trimmed);
    onClose();
  };

  return (
    <form className="save-dialog" onSubmit={handleSubmit}>
      <label className="save-dialog-field">
        <span>Dashboard name</span>
        <input
          type="text"
          value={name}
          placeholder="My dashboard"
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <div className="save-dialog-actions">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={name.trim().length === 0}>
          Save
        </Button>
      </div>
    </form>
  );
};

export const SaveDialog = ({
  open,
  defaultName = "",
  onClose,
  onSave,
}: SaveDialogProps) => {
  return (
    <Modal open={open} title="Save dashboard" onClose={onClose}>
      <SaveDialogForm
        defaultName={defaultName}
        onClose={onClose}
        onSave={onSave}
      />
    </Modal>
  );
};
