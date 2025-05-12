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
        "flex items-center bg-[#8ecae6] text-sm px-3 py-1 rounded-full shadow-sm ",
        className
      )}
    >
      <span className="text-wrap text-ellipsis wrap-break-word max-w-[90%]">
        {item}
      </span>
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
