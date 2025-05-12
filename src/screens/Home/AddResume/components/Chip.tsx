import { X } from "lucide-react";
import { FC } from "react";

import clsx from "clsx";
interface Props {
  item: string;
  onDelete: () => void;
  className?: string;
}
const Chip: FC<Props> = ({ item, onDelete, className }) => {
  return (
    <div
      className={clsx(
        "flex items-center bg-gray-600 text-sm px-3 py-1 rounded-full shadow-sm text-white",
        className
      )}
    >
      <span className="text-wrap text-ellipsis wrap-break-word max-w-[90%]">
        {item}
      </span>
      <button
        onClick={onDelete}
        className="ml-2 text-gray-400 hover:text-gray-200 cursor-pointer"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default Chip;
