import { FC, useState } from "react";
import { Pencil, Eye, Download, Trash2 } from "lucide-react";
import clsx from "clsx";
import { Action, ResumeForm, State } from "./type";
import Tooltip from "../../Components/Tooltip";
import moment from "moment";
import AddResume from "./AddResume";
import Confirm from "../../Components/Confirm";
import apiCall from "../../helpers/apiCall";
import Resume from "../../services/Resume";
import { useAuthStore } from "../../store";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
interface Props {
  resume: ResumeForm;
  className?: string;
}

const ResumeCard: FC<Props> = ({ resume, className = "" }) => {
  const { cred } = useAuthStore();
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
          <h3 className="text-lg font-semibold text-gray-800">
            {resume.title}
          </h3>
          <p className="text-sm text-gray-500">
            Updated:{" "}
            {moment(resume.updatedAt).format("DD MMM,YYYY [at] hh:mm A")}
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-1">
        {actions.map((action) => (
          <Tooltip placement="bottom" content={action.state}>
            <button
              key={action.state}
              onClick={action.onClick}
              className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition"
            >
              {action.Icon}
            </button>
          </Tooltip>
        ))}
      </div>
      {[State.View, State.Edit].includes(state) && (
        <AddResume
          open
          onClose={() => setState(State.Default)}
          prevResumeData={resume}
          isViewing={state === State.View}
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
    </div>
  );
};

export default ResumeCard;
