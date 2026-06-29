import type { MouseEvent, ReactNode } from "react";

export type ButtonVariant = "primary" | "ghost" | "danger" | "icon";

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit";
  disabled?: boolean;
  title?: string;
  ariaLabel?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};
