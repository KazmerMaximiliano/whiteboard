import { describe, it, expect, beforeEach } from "vitest";
import {
  deleteDashboard,
  listDashboards,
  loadDashboard,
  saveDashboard,
} from "./dashboardStorage";
import type { DashboardConfig } from "../providers/WhiteboardProvider/WhiteboardProvider.types";

const makeConfig = (
  overrides: Partial<DashboardConfig> = {},
): DashboardConfig => ({
  id: "dash-1",
  name: "Sales",
  grid: { columns: 12, gap: 12, maxWidth: 1280, rowHeight: 80 },
  widgets: [{ id: "w1", kind: "kpi", position: { x: 0, y: 0, w: 3, h: 2 } }],
  updatedAt: 1000,
  ...overrides,
});

describe("dashboardStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should save and load a dashboard", () => {
    const config = makeConfig();
    saveDashboard(config);
    expect(loadDashboard("dash-1")).toEqual(config);
  });

  it("should list summaries sorted by updatedAt desc", () => {
    saveDashboard(makeConfig({ id: "a", name: "A", updatedAt: 1 }));
    saveDashboard(makeConfig({ id: "b", name: "B", updatedAt: 5 }));
    const list = listDashboards();
    expect(list.map((item) => item.id)).toEqual(["b", "a"]);
    expect(list[0]).toEqual({ id: "b", name: "B", updatedAt: 5 });
  });

  it("should upsert by id without duplicating index entries", () => {
    saveDashboard(makeConfig({ updatedAt: 1 }));
    saveDashboard(makeConfig({ name: "Renamed", updatedAt: 2 }));
    const list = listDashboards();
    expect(list).toHaveLength(1);
    expect(list[0].name).toBe("Renamed");
  });

  it("should return null for a missing dashboard", () => {
    expect(loadDashboard("nope")).toBeNull();
  });

  it("should delete a dashboard and its index entry", () => {
    saveDashboard(makeConfig());
    deleteDashboard("dash-1");
    expect(loadDashboard("dash-1")).toBeNull();
    expect(listDashboards()).toHaveLength(0);
  });

  it("should tolerate corrupt stored data", () => {
    localStorage.setItem("whiteboard:dashboards", "{not json");
    expect(listDashboards()).toEqual([]);
  });
});
