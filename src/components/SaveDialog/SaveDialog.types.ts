export type SaveDialogProps = {
  open: boolean;
  defaultName?: string;
  onClose: () => void;
  onSave: (name: string) => void;
};
