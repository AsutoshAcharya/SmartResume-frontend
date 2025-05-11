import { FC, Fragment, createElement } from "react";
import { Experience, ExperienceInfoKeys } from "../type";
import { experienceInfoFields } from "./DataField";
import { TextField } from "../../../Components/TextField";
import { Button } from "../../../Components/Button";
import { Trash2, Plus } from "lucide-react";
import { DateField } from "../../../Components/DateField";
import { Some } from "../../../helpers/Some";

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
  return (
    <Fragment>
      <div className="mb-6 sticky top-0 z-10 w-full shadow-md p-4 rounded bg-white">
        <Button
          onClick={addExperience}
          className="flex items-center gap-2 shadow-md"
        >
          <Plus size={16} />
          Add Experience
        </Button>
      </div>

      {experiences.map((data, index) => (
        <div
          key={index}
          className="border border-gray-200 p-6 rounded-2xl shadow-md mb-8 bg-white relative transition hover:shadow-lg"
        >
          <div className="absolute top-4 right-4">
            <button
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:text-red-700"
              title="Remove experience"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Experience {index + 1}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experienceInfoFields.map(
              ({ key, label, placeholder, maxLength, type, required }) => (
                <div key={key}>
                  {type === "text" ? (
                    <TextField
                      type={type}
                      value={data[key as ExperienceInfoKeys] as string}
                      label={label}
                      onChange={(val) =>
                        updateExperience(index, key as ExperienceInfoKeys, val)
                      }
                      placeholder={placeholder}
                      maxLength={maxLength}
                      required={required}
                    />
                  ) : type === "date" ? (
                    //update datefield component later
                    <DateField
                      value={
                        data[key as ExperienceInfoKeys].toString().length > 0
                          ? new Date(
                              Some.String(data[key as ExperienceInfoKeys])
                            )
                          : undefined
                      } //
                      label={label}
                      onChange={(date) => {}}
                      placeholder={placeholder}
                      required={required}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default ExperienceInfo;

{
  /* <TextField
                      type={type}
                      value={data[key as ExperienceInfoKeys] as string}
                      label={label}
                      onChange={(val) =>
                        updateExperience(index, key as ExperienceInfoKeys, val)
                      }
                      placeholder={placeholder}
                      maxLength={maxLength}
                      required={required}
                    /> */
}
