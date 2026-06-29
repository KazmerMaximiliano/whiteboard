import { useContext } from "react";
import { WhiteboardContext } from "../../providers/WhiteboardProvider/WhiteboardProvider.context";
import type { WhiteboardContextValue } from "../../providers/WhiteboardProvider/WhiteboardProvider.types";


export const useWhiteboard = (): WhiteboardContextValue => {
  const context = useContext(WhiteboardContext);
  if (!context) {
    throw new Error("useWhiteboard must be used within a WhiteboardProvider");
  }
  return context;
};
