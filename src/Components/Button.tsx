import React from "react";
import { clsx } from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const baseClass =
  "px-4 py-2 rounded text-sm cursor-pointer transition duration-200";
const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  disabled = false,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseClass,
        variants[variant],
        {
          "cursor-not-allowed opacity-50": disabled,
        },
        className
      )}
    >
      {children}
    </button>
  );
};
