import { FC, Fragment, useState } from "react";
import { Project, ProjectInfoKeys } from "../type";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../../../Components/Button";
import { projectDateFields, projectFields } from "./DataField";
import { TextField } from "../../../Components/TextField";
import { DateField } from "../../../Components/DateField";
import { Some } from "../../../helpers/Some";
import Chip from "./components/Chip";
import { toast } from "react-toastify";
interface Props {
  projects: Array<Project>;
  updateProject: <T extends keyof Project>(
    index: number,
    key: T,
    value: Project[T]
  ) => void;
  addProject: () => void;
  removeProject: (idx: number) => void;
}
const ProjectInfo: FC<Props> = ({
  projects,
  updateProject,
  addProject,
  removeProject,
}) => {
  const [newDescription, setNewDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  return (
    <Fragment>
      <div className="mb-6 sticky top-0 z-10 w-full shadow-md p-4 rounded bg-white">
        <Button
          onClick={addProject}
          className="flex items-center gap-2 shadow-md"
        >
          <Plus size={16} />
          Add Project
        </Button>
      </div>
      {projects.map((data, index) => (
        <div
          key={index}
          className="border border-gray-200 p-6 rounded-2xl shadow-md mb-8 bg-white relative transition hover:shadow-lg"
        >
          <div className="absolute top-4 right-4">
            <button
              onClick={() => removeProject(index)}
              className="text-red-500 hover:text-red-700 cursor-pointer"
              title="Remove experience"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Project {index + 1}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            {projectFields.map(
              ({ key, label, placeholder, maxLength, type, required }) => (
                <div key={key} className="w-full">
                  {type === "text" && (
                    <TextField
                      type={type}
                      value={data[key as ProjectInfoKeys] as string}
                      label={label}
                      onChange={(val) =>
                        updateProject(index, key as ProjectInfoKeys, val)
                      }
                      placeholder={placeholder}
                      maxLength={maxLength}
                      required={required}
                    />
                  )}
                </div>
              )
            )}
            <div className="w-full flex flex-row justify-between items-center">
              {projectDateFields.map(
                ({ key, label, placeholder, type, required }, idx) => {
                  return (
                    <Fragment key={key}>
                      {type === "date" && (
                        <DateField
                          value={
                            data[key as ProjectInfoKeys]?.toString().length > 0
                              ? new Date(
                                  Some.String(data[key as ProjectInfoKeys])
                                )
                              : undefined
                          } //
                          label={label}
                          onChange={(date) =>
                            updateProject(
                              index,
                              key as ProjectInfoKeys,
                              date?.toISOString()!
                            )
                          }
                          placeholder={placeholder}
                          required={required}
                          className={idx === 1 ? "ml-5" : ""}
                        />
                      )}
                    </Fragment>
                  );
                }
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4 w-full p-2 border-t-2 border-t-gray-400">
            {data.descriptions.map((desc, idx) => (
              <Chip
                key={idx}
                item={desc}
                onDelete={() => {
                  const updated = data.descriptions.filter((_, i) => i !== idx);
                  updateProject(index, "descriptions", updated);
                }}
                className="w-full justify-between text-cyan-950 rounded-md"
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 p-2">
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              id="message"
              rows={4}
              className="block p-2.5 w-[80%] resize-none text-sm  bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write description about your project"
            />
            <Button
              onClick={() => {
                if (data.descriptions.length === 10) {
                  setNewDescription("");
                  return toast.warn("Can't add more than 10 descriptions", {
                    toastId: "warn",
                  });
                }
                if (newDescription.trim()) {
                  updateProject(index, "descriptions", [
                    ...data.descriptions,
                    newDescription.trim(),
                  ]);
                  setNewDescription("");
                }
              }}
            >
              + Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4 w-full p-2 border-t-2 border-t-gray-400">
            {data.techStack.map((techStack, idx) => (
              <Chip
                key={idx}
                item={techStack}
                onDelete={() => {
                  const updated = data.techStack.filter((_, i) => i !== idx);
                  updateProject(index, "techStack", updated);
                }}
                className="w-fit justify-between text-cyan-950"
              />
            ))}
          </div>
          <div className="flex items-center gap-2 p-2">
            <TextField
              value={techStack}
              onChange={(val) => setTechStack(val)}
              placeholder="Enter the tech stack used"
              maxLength={15}
            />
            <Button
              onClick={() => {
                if (data.descriptions.length === 10) {
                  setTechStack("");
                  return toast.warn("Can't add more than 10 descriptions", {
                    toastId: "warn",
                  });
                }
                if (techStack.trim()) {
                  updateProject(index, "techStack", [
                    ...data.techStack,
                    techStack.trim(),
                  ]);
                  setTechStack("");
                }
              }}
            >
              + Add
            </Button>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default ProjectInfo;
