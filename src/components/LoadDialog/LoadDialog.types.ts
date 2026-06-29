import type { DashboardSummary } from "../../services/dashboardStorage";

export type LoadDialogProps = {
  open: boolean;
  dashboards: DashboardSummary[];
  onClose: () => void;
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
};
