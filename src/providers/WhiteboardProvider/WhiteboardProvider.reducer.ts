import { clampPosition } from "../../utils/grid";
import type {
  GridConfig,
  WhiteboardAction,
  WhiteboardState,
} from "./WhiteboardProvider.types";

export const DEFAULT_GRID: GridConfig = {
  columns: 12,
  gap: 12,
  maxWidth: 1280,
  rowHeight: 80,
};

export const initialWhiteboardState: WhiteboardState = {
  grid: DEFAULT_GRID,
  widgets: [],
};

export const whiteboardReducer = (
  state: WhiteboardState,
  action: WhiteboardAction,
): WhiteboardState => {
  switch (action.type) {
    case "ADD_WIDGET":
      return {
        ...state,
        widgets: [
          ...state.widgets,
          {
            ...action.widget,
            position: clampPosition(action.widget.position, state.grid.columns),
          },
        ],
      };
    case "MOVE_WIDGET":
      return {
        ...state,
        widgets: state.widgets.map((widget) =>
          widget.id === action.id
            ? {
                ...widget,
                position: clampPosition(
                  { ...widget.position, x: action.x, y: action.y },
                  state.grid.columns,
                ),
              }
            : widget,
        ),
      };
    case "RESIZE_WIDGET":
      return {
        ...state,
        widgets: state.widgets.map((widget) =>
          widget.id === action.id
            ? {
                ...widget,
                position: clampPosition(
                  { ...widget.position, w: action.w, h: action.h },
                  state.grid.columns,
                ),
              }
            : widget,
        ),
      };
    case "REMOVE_WIDGET":
      return {
        ...state,
        widgets: state.widgets.filter((widget) => widget.id !== action.id),
      };
    case "UPDATE_GRID": {
      const grid = { ...state.grid, ...action.grid };
      return {
        grid,
        widgets: state.widgets.map((widget) => ({
          ...widget,
          position: clampPosition(widget.position, grid.columns),
        })),
      };
    }
    case "LOAD_DASHBOARD":
      return {
        grid: action.dashboard.grid,
        widgets: action.dashboard.widgets.map((widget) => ({
          ...widget,
          position: clampPosition(
            widget.position,
            action.dashboard.grid.columns,
          ),
        })),
      };
    case "RESET":
      return initialWhiteboardState;
    default:
      return state;
  }
};
