import { FC, Fragment } from "react";
import { OtherInfo, OtherInfoKeys } from "../type";
import { Button } from "../../../Components/Button";
import { Plus, Trash2 } from "lucide-react";
import { TextField } from "../../../Components/TextField";
import { otherFields } from "./DataField";
import Chip from "./components/Chip";
import { toast } from "react-toastify";
import AddField from "./components/AddField";

interface Props {
  others: Array<OtherInfo>;
  updateOther: <T extends keyof OtherInfo>(
    idx: number,
    key: T,
    value: OtherInfo[T]
  ) => void;
  addOther: () => void;
  removeOther: (idx: number) => void;
}

const OtherInformation: FC<Props> = ({
  others,
  updateOther,
  addOther,
  removeOther,
}) => {
  return (
    <Fragment>
      <div className="mb-6 sticky top-0 z-10 w-full shadow-md p-4 rounded bg-white">
        <Button
          onClick={addOther}
          className="flex items-center gap-2 shadow-md"
        >
          <Plus size={16} />
          Add Others
        </Button>
      </div>
      {others.map((data, index) => (
        <div
          key={index}
          className="border border-gray-200 p-6 rounded-2xl shadow-md mb-8 bg-white relative transition hover:shadow-lg"
        >
          <div className="absolute top-4 right-4">
            <button
              onClick={() => removeOther(index)}
              className="text-red-500 hover:text-red-700 cursor-pointer"
              title="Remove experience"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Others {index + 1}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            {otherFields.map(
              ({ key, label, placeholder, maxLength, type, required }) => (
                <div key={key} className="w-full">
                  {type === "text" && (
                    <TextField
                      type={type}
                      value={data[key as OtherInfoKeys] as string}
                      label={label}
                      onChange={(val) =>
                        updateOther(index, key as OtherInfoKeys, val)
                      }
                      placeholder={placeholder}
                      maxLength={maxLength}
                      required={required}
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
                  const updated = data.info.filter((_, i) => i !== idx);
                  updateOther(index, "info", updated);
                }}
                className="text-cyan-950"
              />
            ))}
          </div>
          <AddField
            onAdd={(val) => {
              if (data.info.length === 30) {
                return toast.warn("Can't add more than 10 info", {
                  toastId: "warn",
                });
              }
              if (val.trim()) {
                updateOther(index, "info", [...data.info, val.trim()]);
              }
            }}
            className="w-fit"
          />
        </div>
      ))}
    </Fragment>
  );
};

export default OtherInformation;
