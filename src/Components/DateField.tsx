import React, { useState, useRef } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CalendarIcon } from "lucide-react";

type DateFieldProps = {
  label?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export const DateField: React.FC<DateFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = "Pick a date",
  required = false,
  disabled = false,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`} ref={ref}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && "*"}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={disabled}
        className={`flex w-full justify-between items-center border px-3 py-2 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "hover:shadow-md"
        }`}
      >
        <span className={`${value ? "text-gray-900" : "text-gray-400"}`}>
          {value ? format(value, "PPP") : placeholder}
        </span>
        <CalendarIcon size={18} className="text-gray-500" />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 bg-white border rounded-md shadow-lg p-2">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            disabled={disabled}
            classNames={{
              months: "flex flex-col space-y-4",
              month: "space-y-4",
              caption: "flex justify-between items-center px-2",
              nav: "flex items-center gap-1",
              nav_button:
                "h-7 w-7 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "flex-1 text-xs text-center text-gray-500",
              row: "flex w-full mt-1",
              cell: "text-center text-sm p-1 w-9 h-9 rounded-full hover:bg-blue-100 focus:bg-blue-200 cursor-pointer",
              day_selected: "bg-blue-500 text-white hover:bg-blue-600",
              day_today: "border border-blue-500",
              day_disabled: "text-gray-300 cursor-not-allowed",
            }}
          />
        </div>
      )}
    </div>
  );
};
