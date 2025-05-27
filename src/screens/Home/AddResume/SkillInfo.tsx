import { FC, Fragment } from "react";
import { DroppableIds, OtherInfo, OtherInfoKeys } from "../type";
import { Button } from "../../../Components/Button";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { TextField } from "../../../Components/TextField";
import { skillFields } from "./DataField";
import Chip from "./components/Chip";
import { toast } from "react-toastify";
import AddField from "./components/AddField";
import { useViewStore } from "../../../store/viewStore";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface Props {
  skills: Array<OtherInfo>; //same type as other
  updateSkills: <T extends keyof OtherInfo>(
    idx: number,
    key: T,
    value: OtherInfo[T]
  ) => void;
  addSkill: () => void;
  removeSkill: (idx: number) => void;
}

const SkillInfo: FC<Props> = ({
  skills,
  updateSkills,
  addSkill,
  removeSkill,
}) => {
  const { isViewingResume } = useViewStore();
  return (
    <Fragment>
      {!isViewingResume && (
        <div className="mb-6 sticky top-0 z-10 w-full shadow-md p-4 rounded bg-white">
          <Button
            onClick={addSkill}
            className="flex items-center gap-2 shadow-md"
          >
            <Plus size={16} />
            Add Skills
          </Button>
        </div>
      )}
      <Droppable droppableId={DroppableIds.skills}>
        {(provided) => (
          <div ref={provided?.innerRef}>
            {skills.map((data, index) => (
              <Draggable
                key={`${DroppableIds.skills}-${index}`}
                draggableId={`${DroppableIds.skills}-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    key={index}
                    ref={provided?.innerRef}
                    {...provided.draggableProps}
                    className="border border-gray-200 p-6 rounded-2xl shadow-md mb-8 bg-white relative transition hover:shadow-lg"
                  >
                    {!isViewingResume && (
                      <Fragment>
                        <div
                          className="absolute top-[50%] left-3  transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                          {...provided.dragHandleProps}
                        >
                          <GripVertical className="text-gray-700" />
                        </div>
                        <div className="absolute top-4 right-4">
                          <button
                            onClick={() => removeSkill(index)}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                            title="Remove Skill"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </Fragment>
                    )}

                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                      Skills {index + 1}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                      {skillFields.map(
                        ({
                          key,
                          label,
                          placeholder,
                          maxLength,
                          type,
                          required,
                        }) => (
                          <div key={key} className="w-full">
                            {type === "text" && (
                              <TextField
                                type={type}
                                value={data[key as OtherInfoKeys] as string}
                                label={label}
                                onChange={(val) =>
                                  updateSkills(index, key as OtherInfoKeys, val)
                                }
                                placeholder={placeholder}
                                maxLength={maxLength}
                                required={required}
                                disabled={isViewingResume}
                              />
                            )}
                          </div>
                        )
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4 w-full p-2 border-t-2 border-t-gray-400">
                      {data.info.map((info, idx) => (
                        <Chip
                          key={idx}
                          item={info}
                          onDelete={() => {
                            const updated = data.info.filter(
                              (_, i) => i !== idx
                            );
                            updateSkills(index, "info", updated);
                          }}
                          className="text-cyan-950"
                          disabled={isViewingResume}
                        />
                      ))}
                    </div>
                    {!isViewingResume && (
                      <AddField
                        onAdd={(val) => {
                          if (data.info.length === 30) {
                            return toast.warn("Can't add more than 30 skill", {
                              toastId: "warn",
                            });
                          }
                          if (val.trim()) {
                            updateSkills(index, "info", [
                              ...data.info,
                              val.trim(),
                            ]);
                          }
                        }}
                        className="w-fit"
                      />
                    )}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </Fragment>
  );
};

export default SkillInfo;
