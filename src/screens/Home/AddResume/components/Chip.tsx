import { Trash2 } from "lucide-react";
import React, { FC } from "react";
import { Button } from "../../../../Components/Button";
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
        "flex items-center bg-gray-100 text-sm px-3 py-1 rounded-full shadow-sm ",
        className
      )}
    >
      <span>{item}</span>
      <button
        onClick={onDelete}
        className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};

export default Chip;
