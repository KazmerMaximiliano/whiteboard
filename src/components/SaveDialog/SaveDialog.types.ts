export type SaveDialogProps = {
  open: boolean;
  defaultName?: string;
  onClose: () => void;
  onSave: (name: string) => void;
};

export type SaveDialogFormProps = {
  defaultName: string;
  onClose: () => void;
  onSave: (name: string) => void;
};
