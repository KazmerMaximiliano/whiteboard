import type { DashboardSummary } from "../../services/dashboardStorage/dashboardStorage.types";


export type LoadDialogProps = {
  open: boolean;
  dashboards: DashboardSummary[];
  onClose: () => void;
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
};
