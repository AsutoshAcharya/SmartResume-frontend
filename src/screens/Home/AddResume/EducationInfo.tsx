import { FC, Fragment } from "react";
import { Education, EducationKeys } from "../type";
import { Button } from "../../../Components/Button";
import { Plus, Trash2 } from "lucide-react";
import { educationDataFields, educationDateFields } from "./DataField";
import { TextField } from "../../../Components/TextField";
import { DateField } from "../../../Components/DateField";
import { Some } from "../../../helpers/Some";
import { useViewStore } from "../../../store/viewStore";

interface Props {
  educations: Array<Education>;
  updateEducation: <T extends keyof Education>(
    index: number,
    key: T,
    value: Education[T]
  ) => void;
  addEducation: () => void;
  removeEducation: (index: number) => void;
}

const EducationInfo: FC<Props> = ({
  educations,
  updateEducation,
  addEducation,
  removeEducation,
}) => {
  const { isViewingResume } = useViewStore();
  return (
    <Fragment>
      {!isViewingResume && (
        <div className="mb-6 sticky top-0 z-10 w-full shadow-md p-4 rounded bg-white">
          <Button
            onClick={addEducation}
            className="flex items-center gap-2 shadow-md"
          >
            <Plus size={16} />
            Add Education
          </Button>
        </div>
      )}
      {educations.map((data, index) => (
        <div
          key={index}
          className="border border-gray-200 p-6 rounded-2xl shadow-md mb-8 bg-white relative transition hover:shadow-lg"
        >
          {!isViewingResume && (
            <div className="absolute top-4 right-4">
              <button
                onClick={() => removeEducation(index)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
                title="Remove experience"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}

          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Education {index + 1}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            {educationDataFields.map(
              ({ key, label, placeholder, maxLength, type, required }) => (
                <div key={key} className="w-full">
                  {type === "text" && (
                    <TextField
                      type={type}
                      value={data[key as EducationKeys] as string}
                      label={label}
                      onChange={(val) =>
                        updateEducation(index, key as EducationKeys, val)
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
            <div className="w-full flex flex-row justify-between items-center">
              {educationDateFields.map(
                ({ key, label, placeholder, type, required }, idx) => {
                  return (
                    <Fragment key={key}>
                      {type === "date" && (
                        <DateField
                          value={
                            data[key as EducationKeys]?.toString().length > 0
                              ? new Date(
                                  Some.String(data[key as EducationKeys])
                                )
                              : undefined
                          } //
                          label={label}
                          onChange={(date) =>
                            updateEducation(
                              index,
                              key as EducationKeys,
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
        </div>
      ))}
    </Fragment>
  );
};

export default EducationInfo;
