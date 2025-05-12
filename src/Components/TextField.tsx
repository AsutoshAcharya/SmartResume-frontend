import { InputType } from "../screens/Home/type";

type TextFieldProps<T> = {
  type?: InputType;
  value: T;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  maxLength?: number;
};

export const TextField = <T,>({
  type = "text",
  value,
  onChange,
  label,
  placeholder,
  className = "",
  disabled = false,
  required = false,
  error,
  maxLength,
}: TextFieldProps<T>) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-500">
          {label} {required && "*"}
        </label>
      )}
      <input
        id={label}
        type={type}
        value={String(value)}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        disabled={disabled}
        required={required}
        className={`border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
      />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
};
