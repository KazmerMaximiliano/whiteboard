import "./Button.styles.css";
import type { ButtonProps } from "./Button.types";

export const Button = ({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  title,
  ariaLabel,
  onClick,
}: ButtonProps) => {
  const className = `button button-${variant}${disabled ? " disabled" : ""}`;

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
