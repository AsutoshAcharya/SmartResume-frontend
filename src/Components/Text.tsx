import React, { JSX } from "react";
import clsx from "clsx";

type TextProps = {
  as?: keyof JSX.IntrinsicElements;
  variant?: "body" | "heading" | "subtle" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  className?: string;
  children: React.ReactNode;
};

const variantClasses = {
  body: "text-gray-800",
  heading: "text-gray-900",
  subtle: "text-gray-500",
  danger: "text-red-600",
};

const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const weightClasses = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const Text = ({
  as: Component = "p",
  variant = "body",
  size = "md",
  weight = "normal",
  className,
  children,
}: TextProps) => {
  return (
    <Component
      className={clsx(
        variantClasses[variant],
        sizeClasses[size],
        weightClasses[weight],
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Text;
