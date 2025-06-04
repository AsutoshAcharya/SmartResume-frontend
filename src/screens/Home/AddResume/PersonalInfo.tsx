import { FC, Fragment, useState } from "react";
import { PersonalInfoKeys, PersonalInfo as PersonalInfoType } from "../type";
import { TextField } from "../../../Components/TextField";
import { personalInfoFields } from "./DataField";
import { Button } from "../../../Components/Button";
import { Link as LinkIcon, X } from "lucide-react";
import { toast } from "react-toastify";
import { useViewStore } from "../../../store/viewStore";
import AddField from "./components/AddField";

interface Props {
  data: PersonalInfoType;
  update: (field: keyof PersonalInfoType, value: string | string[]) => void;
}

const PersonalInfo: FC<Props> = ({ data, update }) => {
  const { isViewingResume } = useViewStore();

  const handleRemoveLink = (index: number) => {
    const updatedLinks = [...data.links];
    updatedLinks.splice(index, 1);
    update("links", updatedLinks);
  };

  return (
    <Fragment>
      <div className="grid grid-cols-2 gap-4 p-2">
        {personalInfoFields.map(
          ({ key, label, placeholder, maxLength, type, required }) => (
            <div key={key}>
              <TextField
                type={type}
                value={data[key as PersonalInfoKeys]}
                label={label}
                onChange={(val) => update(key as PersonalInfoKeys, val)}
                placeholder={placeholder}
                maxLength={maxLength}
                className="border-b"
                required={required}
                disabled={isViewingResume}
              />
            </div>
          )
        )}
      </div>
      <div className="mt-4 border-t-2 border-t-gray-400">
        {data.links.length > 0 && (
          <ul className="space-y-2 p-2">
            {data.links.map((l, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-600 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-2 text-sm text-white break-all">
                  <LinkIcon size={16} />
                  <a
                    href={l}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {l}
                  </a>
                </div>
                {!isViewingResume && (
                  <button
                    onClick={() => handleRemoveLink(index)}
                    className="cursor-pointer"
                  >
                    <X
                      size={16}
                      className="text-gray-400 hover:text-gray-200"
                    />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {!isViewingResume && (
        <AddField
          className="w-fit"
          onAdd={(val) => {
            if (data.links.length === 3)
              return toast.warn("Can only add 3 links");
            const trimmed = val.trim();
            if (trimmed && !data.links.includes(trimmed)) {
              update("links", [...data.links, trimmed]);
            }
          }}
        />
      )}
    </Fragment>
  );
};

export default PersonalInfo;
