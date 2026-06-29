import { useMemo, useReducer } from "react";
import { createId } from "../../utils/id/id";
import { initialWhiteboardState } from "./WhiteboardProvider.consts";
import { WhiteboardContext } from "./WhiteboardProvider.context";
import { whiteboardReducer } from "./WhiteboardProvider.reducer";
import type {
  WhiteboardContextValue,
  WhiteboardProviderProps,
} from "./WhiteboardProvider.types";

export const WhiteboardProvider = ({ children }: WhiteboardProviderProps) => {
  const [state, dispatch] = useReducer(
    whiteboardReducer,
    initialWhiteboardState,
  );

  const value = useMemo<WhiteboardContextValue>(
    () => ({
      grid: state.grid,
      widgets: state.widgets,
      addWidget: (kind, position) =>
        dispatch({
          type: "ADD_WIDGET",
          widget: { id: createId(), kind, position },
        }),
      moveWidget: (id, x, y) => dispatch({ type: "MOVE_WIDGET", id, x, y }),
      resizeWidget: (id, w, h) => dispatch({ type: "RESIZE_WIDGET", id, w, h }),
      removeWidget: (id) => dispatch({ type: "REMOVE_WIDGET", id }),
      updateGrid: (grid) => dispatch({ type: "UPDATE_GRID", grid }),
      loadDashboard: (dashboard) =>
        dispatch({ type: "LOAD_DASHBOARD", dashboard }),
      reset: () => dispatch({ type: "RESET" }),
    }),
    [state.grid, state.widgets],
  );

  return (
    <WhiteboardContext.Provider value={value}>
      {children}
    </WhiteboardContext.Provider>
  );
};
