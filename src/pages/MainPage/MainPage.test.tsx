import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { MainPage } from "./MainPage";

describe("MainPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render the canvas, catalog and toolbar", () => {
    render(<MainPage />);
    expect(screen.getByText(/Drag a component/)).toBeInTheDocument();
    expect(screen.getByText("Component Catalog")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Grid settings" }),
    ).toBeInTheDocument();
  });

  it("should open the grid settings dialog", async () => {
    render(<MainPage />);
    await userEvent.click(
      screen.getByRole("button", { name: "Grid settings" }),
    );
    expect(
      screen.getByRole("dialog", { name: "Grid settings" }),
    ).toBeInTheDocument();
  });

  it("should open the load dialog with an empty state", async () => {
    render(<MainPage />);
    await userEvent.click(
      screen.getByRole("button", { name: "Load dashboard" }),
    );
    expect(screen.getByText("No saved dashboards yet.")).toBeInTheDocument();
  });

  it("should save a dashboard and list it in the load dialog", async () => {
    render(<MainPage />);
    await userEvent.click(
      screen.getByRole("button", { name: "Save dashboard" }),
    );
    await userEvent.type(screen.getByLabelText("Dashboard name"), "Sales");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    await userEvent.click(
      screen.getByRole("button", { name: "Load dashboard" }),
    );
    expect(screen.getByText("Sales")).toBeInTheDocument();
  });

  it("should load a saved dashboard and close the dialog", async () => {
    render(<MainPage />);
    await userEvent.click(
      screen.getByRole("button", { name: "Save dashboard" }),
    );
    await userEvent.type(screen.getByLabelText("Dashboard name"), "Sales");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    await userEvent.click(
      screen.getByRole("button", { name: "Load dashboard" }),
    );
    await userEvent.click(screen.getByText("Sales"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should delete a saved dashboard", async () => {
    render(<MainPage />);
    await userEvent.click(
      screen.getByRole("button", { name: "Save dashboard" }),
    );
    await userEvent.type(screen.getByLabelText("Dashboard name"), "Ops");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));

    await userEvent.click(
      screen.getByRole("button", { name: "Load dashboard" }),
    );
    await userEvent.click(screen.getByRole("button", { name: "Delete Ops" }));
    expect(screen.getByText("No saved dashboards yet.")).toBeInTheDocument();
  });
});
