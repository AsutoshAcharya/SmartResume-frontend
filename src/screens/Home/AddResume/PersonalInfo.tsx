import { FC, Fragment, useState } from "react";
import { PersonalInfoKeys, PersonalInfo as PersonalInfoType } from "../type";
import { TextField } from "../../../Components/TextField";
import { personalInfoFields } from "./DataField";
import { Button } from "../../../Components/Button";
import { Link as LinkIcon, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";

interface Props {
  data: PersonalInfoType;
  update: (field: keyof PersonalInfoType, value: string | string[]) => void;
}

const PersonalInfo: FC<Props> = ({ data, update }) => {
  const [link, setLink] = useState("");

  const handleAddLink = () => {
    if (data.links.length === 3) return toast.warn("Can only add 3 links");
    const trimmed = link.trim();
    if (trimmed && !data.links.includes(trimmed)) {
      update("links", [...data.links, trimmed]);
      setLink("");
    }
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks = [...data.links];
    updatedLinks.splice(index, 1);
    update("links", updatedLinks);
  };

  return (
    <Fragment>
      <div className="grid grid-cols-2 gap-4 p-2">
        {personalInfoFields.map(
          ({ key, label, placeholder, maxLength, type }) => (
            <div key={key}>
              <TextField
                type={type}
                value={data[key as PersonalInfoKeys]}
                label={label}
                onChange={(val) => update(key as PersonalInfoKeys, val)}
                placeholder={placeholder}
                maxLength={maxLength}
                className="border-b"
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
                <button
                  onClick={() => handleRemoveLink(index)}
                  className="cursor-pointer"
                >
                  <X size={16} className="text-gray-400 hover:text-gray-200" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-6 p-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Add Link
        </label>
        <div className="flex gap-2">
          <TextField
            type="text"
            placeholder="https://your-link.com"
            value={link}
            onChange={(val) => setLink(val)}
            className="flex-1"
          />
          <Button onClick={handleAddLink}>+ Add</Button>
        </div>
      </div>
    </Fragment>
  );
};

export default PersonalInfo;
