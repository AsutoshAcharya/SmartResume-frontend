import { FC, Fragment, useState } from "react";
import { DroppableIds, Experience, ExperienceInfoKeys } from "../type";
import { experienceInfoFields } from "./DataField";
import { TextField } from "../../../Components/TextField";
import { Button } from "../../../Components/Button";
import { Trash2, Plus, GripVertical } from "lucide-react";
import { DateField } from "../../../Components/DateField";
import { Some } from "../../../helpers/Some";
import Chip from "./components/Chip";
import { toast } from "react-toastify";
import Question from "../../../Components/Question";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useViewStore } from "../../../store/viewStore";

interface Props {
  experiences: Array<Experience>;
  updateExperience: <T extends keyof Experience>(
    index: number,
    key: T,
    value: Experience[T]
  ) => void;
  addExperience: () => void;
  removeExperience: (index: number) => void;
}

const ExperienceInfo: FC<Props> = ({
  experiences,
  updateExperience,
  addExperience,
  removeExperience,
}) => {
  const [newDescription, setNewDescription] = useState("");
  const { isViewingResume } = useViewStore();
  return (
    <Fragment>
      {!isViewingResume && (
        <div className="mb-6 sticky top-0 z-10 w-full shadow-md p-4 rounded bg-white">
          <Button
            onClick={addExperience}
            className="flex items-center gap-2 shadow-md"
          >
            <Plus size={16} />
            Add Experience
          </Button>
        </div>
      )}
      <Droppable droppableId={DroppableIds.experience}>
        {(provided) => (
          <div ref={provided?.innerRef}>
            {experiences.map((data, index) => (
              <Draggable
                key={`${DroppableIds.experience}-${index}`}
                draggableId={`${DroppableIds.experience}-${index}`}
                index={index}
              >
                {(provided) => (
                  <div
                    key={index}
                    ref={provided?.innerRef}
                    {...provided.draggableProps}
                    className="border border-gray-200 p-6 rounded-2xl shadow-md mb-8 bg-white  transition hover:shadow-lg relative"
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
                            onClick={() => removeExperience(index)}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                            title="Remove experience"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </Fragment>
                    )}

                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                      Experience {index + 1}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                      {experienceInfoFields
                        .slice(0, 4)
                        .map(
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
                                  value={
                                    data[key as ExperienceInfoKeys] as string
                                  }
                                  label={label}
                                  onChange={(val) =>
                                    updateExperience(
                                      index,
                                      key as ExperienceInfoKeys,
                                      val
                                    )
                                  }
                                  placeholder={placeholder}
                                  maxLength={maxLength}
                                  required={required}
                                  disabled={isViewingResume}
                                />
                              )}
                              {type === "question" && (
                                <Question
                                  label={label}
                                  required={required}
                                  checked={Some.Boolean(
                                    data[key as ExperienceInfoKeys]
                                  )}
                                  disabled={isViewingResume}
                                  onChange={(val) =>
                                    updateExperience(
                                      index,
                                      key as ExperienceInfoKeys,
                                      val
                                    )
                                  }
                                />
                              )}
                            </div>
                          )
                        )}
                      <div className="w-full flex flex-row justify-between items-center">
                        {experienceInfoFields
                          .slice(4)
                          .map(
                            (
                              { key, label, placeholder, type, required },
                              idx
                            ) => {
                              return (
                                <Fragment key={key}>
                                  {type === "date" && (
                                    <DateField
                                      value={
                                        data[
                                          key as ExperienceInfoKeys
                                        ]?.toString().length > 0
                                          ? new Date(
                                              Some.String(
                                                data[key as ExperienceInfoKeys]
                                              )
                                            )
                                          : undefined
                                      } //
                                      label={label}
                                      onChange={(date) =>
                                        updateExperience(
                                          index,
                                          key as ExperienceInfoKeys,
                                          date?.toISOString()!
                                        )
                                      }
                                      placeholder={placeholder}
                                      required={required}
                                      className={idx === 1 ? "ml-5" : ""}
                                      disabled={isViewingResume}
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
                            const updated = data.descriptions.filter(
                              (_, i) => i !== idx
                            );
                            updateExperience(index, "descriptions", updated);
                          }}
                          className="w-full justify-between text-cyan-950 rounded-md"
                          disabled={isViewingResume}
                        />
                      ))}
                    </div>

                    {!isViewingResume && (
                      <div className="flex items-center justify-between gap-2 p-2">
                        <textarea
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          id="message"
                          rows={4}
                          className="block p-2.5 w-[80%] resize-none text-sm  bg-gray-50 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write description about your experience"
                        />
                        <Button
                          onClick={() => {
                            if (data.descriptions.length === 10) {
                              setNewDescription("");
                              return toast.warn(
                                "Can't add more than 10 descriptions",
                                {
                                  toastId: "warn",
                                }
                              );
                            }
                            if (newDescription.trim()) {
                              updateExperience(index, "descriptions", [
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

export default ExperienceInfo;
