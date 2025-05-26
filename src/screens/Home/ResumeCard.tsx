import { type FC, Fragment, useState } from "react";
import {
  Pencil,
  Eye,
  Download,
  Trash2,
  Calendar,
  FileText,
} from "lucide-react";
import clsx from "clsx";
import Confirm from "../../Components/Confirm";
import Resume from "../../services/Resume";
import apiCall from "../../helpers/apiCall";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Action, ResumeForm, State } from "./type";
import { useAuthStore } from "../../store";
import AddResume from "./AddResume";
import { pdf } from "@react-pdf/renderer";
import ExportToPdf from "./ExportToPdf";
import { useViewStore } from "../../store/viewStore";

interface Props {
  resume: ResumeForm;
  className?: string;
}

const ResumeCard: FC<Props> = ({ resume, className = "" }) => {
  const { cred } = useAuthStore();
  const { onViewAction } = useViewStore();
  const [state, setState] = useState(State.Default);
  const [loading, setLoading] = useState(false);
  const client = useQueryClient();

  function handleDelete() {
    setLoading(true);
    apiCall({
      fn: () => Resume.deleteResume({ ...cred, resumeId: resume.id }),
      onSuccess: () => {
        toast.success("Resume has been deleted");
        client.invalidateQueries(["get-user-resumes", cred.userId]);
        setState(State.Default);
      },
      onError: () => toast.error("Something went wrong!"),
      setLoading,
    });
  }

  async function handleDownload() {
    setState(State.Download);
    const blob = await pdf(<ExportToPdf data={resume} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resume.title}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
    setState(State.Default);
  }

  const actions: Array<Action> = [
    {
      state: State.Edit,
      onClick: () => setState(State.Edit),
      Icon: <Pencil size={18} className="text-blue-600" />,

      color: "blue",
    },
    {
      state: State.View,
      onClick: () => {
        setState(State.View);
        onViewAction(true);
      },
      Icon: <Eye size={18} className=" text-green-600" />,
      color: "green",
    },
    {
      state: State.Download,
      onClick: handleDownload,
      Icon: <Download size={18} className="text-yellow-600" />,
      color: "yellow",
    },
    {
      state: State.Delete,
      onClick: () => setState(State.Delete),
      Icon: <Trash2 size={18} className="text-red-600" />,

      color: "red",
    },
  ];

  return (
    <Fragment>
      <div
        className={clsx(
          "group relative bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-100 overflow-hidden transform hover:-translate-y-1",
          className
        )}
      >
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 truncate">
                  {resume.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  Updated {new Date(resume.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">
                {new Date(resume.createdAt).toLocaleDateString()}
              </div>
              <div className="text-xs text-gray-600">Created</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">Recently</div>
              <div className="text-xs text-gray-600">Last Modified</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {actions.slice(0, 2).map((action) => (
              <button
                key={action.state}
                onClick={action.onClick}
                className={clsx(
                  "flex items-center justify-center cursor-pointer gap-2 p-3 rounded-lg font-medium transition-all duration-200 hover:scale-105",
                  action.color === "blue" &&
                    "bg-blue-50 text-blue-700 hover:bg-blue-100",
                  action.color === "green" &&
                    "bg-green-50 text-green-700 hover:bg-green-100"
                )}
              >
                {action.Icon}
                <span className="text-sm">{action.state}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            {actions.slice(2).map((action) => (
              <button
                key={action.state}
                onClick={action.onClick}
                className={clsx(
                  "flex-1 flex items-center cursor-pointer justify-center gap-2 p-2 rounded-lg font-medium transition-all duration-200 text-sm",
                  action.color === "yellow" &&
                    "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
                  action.color === "red" &&
                    "bg-red-50 text-red-700 hover:bg-red-100"
                )}
              >
                {action.Icon}
                <span>{action.state}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      {[State.View, State.Edit].includes(state) && (
        <AddResume
          open
          onClose={() => {
            setState(State.Default);
            onViewAction(false);
          }}
          prevResumeData={resume}
        />
      )}
      {state === State.Delete && (
        <Confirm
          open
          onClose={() => setState(State.Default)}
          loading={loading}
          title="Are you sure you want to delete this resume ?"
          variant="destructive"
          onConfirm={handleDelete}
          className="w-[350px]"
          confirmText="Yes ,Delete"
        />
      )}
    </Fragment>
  );
};

export default ResumeCard;
