import type { DashboardConfig } from "../providers/WhiteboardProvider/WhiteboardProvider.types";

const INDEX_KEY = "whiteboard:dashboards";

const itemKey = (id: string): string => `whiteboard:dashboard:${id}`;

export type DashboardSummary = {
  id: string;
  name: string;
  updatedAt: number;
};

const readIndex = (): DashboardSummary[] => {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as DashboardSummary[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeIndex = (summaries: DashboardSummary[]): void => {
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify(summaries));
  } catch {
    /* storage unavailable — fail silently */
  }
};

/** List saved dashboards, most recently updated first. */
export const listDashboards = (): DashboardSummary[] =>
  readIndex().sort((a, b) => b.updatedAt - a.updatedAt);

/** Persist a dashboard, upserting it by id and updating the index. */
export const saveDashboard = (config: DashboardConfig): void => {
  try {
    localStorage.setItem(itemKey(config.id), JSON.stringify(config));
  } catch {
    return;
  }
  const summaries = readIndex().filter((item) => item.id !== config.id);
  summaries.push({
    id: config.id,
    name: config.name,
    updatedAt: config.updatedAt,
  });
  writeIndex(summaries);
};

/** Load a dashboard by id, or null when missing/corrupt. */
export const loadDashboard = (id: string): DashboardConfig | null => {
  try {
    const raw = localStorage.getItem(itemKey(id));
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as DashboardConfig;
  } catch {
    return null;
  }
};

/** Remove a dashboard and its index entry. */
export const deleteDashboard = (id: string): void => {
  try {
    localStorage.removeItem(itemKey(id));
  } catch {
    /* ignore */
  }
  writeIndex(readIndex().filter((item) => item.id !== id));
};
