import { createContext } from "react";
import type { WhiteboardContextValue } from "./WhiteboardProvider.types";

export const WhiteboardContext = createContext<WhiteboardContextValue | null>(
  null,
);
