import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateFieldProps = {
  label?: string;
  value?: Date;
  onChange: (date: Date | null) => void;
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
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-500 mb-1 block">
          {label} {required && "*"}
        </label>
      )}
      <div className="w-full relative flex flex-row">
        <DatePicker
          selected={value}
          onChange={(date) => onChange(date)}
          disabled={disabled}
          placeholderText={placeholder}
          className={`w-full grow relative  border rounded border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            disabled ? "bg-gray-100 cursor-not-allowed" : "hover:shadow-md"
          }`}
          calendarClassName="border rounded-md shadow-lg"
          popperPlacement="bottom-end"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          dateFormat="MMMM dd, yyyy"
          popperProps={{ strategy: "fixed" }}
        />
        {/* <CalendarIcon
          size={18}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
        /> */}
      </div>
    </div>
  );
};
