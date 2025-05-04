import React, { FC } from "react";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchFIeld: FC<Props> = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className="flex items-center gap-2 w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 bg-white">
      <Search className="text-gray-500 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchFIeld;
