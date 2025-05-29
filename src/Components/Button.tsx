import React, { ButtonHTMLAttributes, Fragment } from "react";
import { clsx } from "clsx";
import Loader from "./Loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
}

const baseClass =
  "px-4 py-2 rounded text-sm font-medium transition duration-200 inline-flex items-center justify-center cursor-pointer";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
};

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  variant = "primary",
  className,
  disabled = false,
  loading = false,
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        baseClass,
        variants[variant],
        {
          "cursor-not-allowed opacity-50": disabled || loading,
        },
        className
      )}
      {...rest}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};
