import React, { FC, ReactElement, useState } from "react";
import { Pencil, Eye, Download, Trash2 } from "lucide-react";
import clsx from "clsx";
import { Action, State } from "./type";

interface Props {
  title: string;
  updatedAt: string;
  onEdit: () => void;
  onView: () => void;
  onDownload: () => void;
  onDelete: () => void;
  className?: string;
}

const ResumeCard: FC<Props> = ({
  title,
  updatedAt,
  onEdit,
  onView,
  onDownload,
  onDelete,
  className = "",
}) => {
  const [state, setState] = useState(State.Default);
  const actions: Array<Action> = [
    {
      state: State.Edit,
      onClick: () => setState(State.Edit),
      Icon: <Pencil size={18} className="text-blue-600" />,
    },
    {
      state: State.View,
      onClick: () => setState(State.View),
      Icon: <Eye size={18} className=" text-green-600" />,
    },
    {
      state: State.Download,
      onClick: () => setState(State.Download),
      Icon: <Download size={18} className="text-yellow-600" />,
    },
    {
      state: State.Delete,
      onClick: () => setState(State.Delete),
      Icon: <Trash2 size={18} className="text-red-600" />,
    },
  ];

  return (
    <div
      className={clsx(
        " bg-white shadow-md hover:shadow-lg transition rounded-xl p-4 border border-gray-200 w-full",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">Updated: {updatedAt}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-1">
        {actions.map((action) => (
          <button
            key={action.state}
            onClick={action.onClick}
            title={action.state}
            className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition"
          >
            {action.Icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResumeCard;
