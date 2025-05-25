"use client";

import type { FC, HTMLAttributes } from "react";

import clsx from "clsx";
import Text from "./Text";
import Modal from "./Modal";

interface ConfirmProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive" | "warning";
  loading?: boolean;
}

const Confirm: FC<ConfirmProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  loading = false,
  className,
  ...rest
}) => {
  const variantStyles = {
    default: {
      confirmButton: "bg-blue-600 cursor-pointer hover:bg-blue-700 text-white",
      icon: "text-blue-600",
    },
    destructive: {
      confirmButton: "bg-red-600 cursor-pointer hover:bg-red-700 text-white",
      icon: "text-red-600",
    },
    warning: {
      confirmButton:
        "bg-yellow-600 cursor-pointer hover:bg-yellow-700 text-white",
      icon: "text-yellow-600",
    },
  };

  return (
    <Modal open={open} onClose={onClose} className={clsx(className)} {...rest}>
      <div className="flex flex-col w-full p-1">
        <div className="flex items-start gap-1 mb-1">
          <div className="flex-1">
            <Text size="lg" weight="semibold" className="mb-2">
              {title}
            </Text>
            <Text size="sm">{message}</Text>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium cursor-pointer text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50  disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={clsx(
              "px-4 py-2 text-sm font-medium rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2",
              variantStyles[variant].confirmButton
            )}
          >
            {loading && (
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Confirm;
