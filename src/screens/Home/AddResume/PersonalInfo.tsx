import { FC } from "react";
import { PersonalInfo as PersonalInfoType } from "../type";
interface Props {
  data: PersonalInfoType;
  update: (field: keyof PersonalInfoType, value: string | string[]) => void;
}
const inputClass = "border px-3 py-2 rounded w-full";
const PersonalInfo: FC<Props> = ({ data, update }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <input
        className={inputClass}
        placeholder="Full Name"
        value={data.name}
        onChange={(e) => update("name", e.target.value)}
      />
      <input
        className="input"
        placeholder="Address"
        value={data.address}
        onChange={(e) => update("address", e.target.value)}
      />
      <input
        className="input"
        placeholder="Phone Number"
        value={data.phone}
        onChange={(e) => update("phone", e.target.value)}
      />
      <input
        className="input"
        placeholder="Email"
        value={data.email}
        onChange={(e) => update("email", e.target.value)}
      />
      <input
        className="input col-span-2"
        placeholder="Links (comma-separated)"
        value={data.links.join(", ")}
        onChange={(e) =>
          update(
            "links",
            e.target.value.split(",").map((link) => link.trim())
          )
        }
      />
    </div>
  );
};
export default PersonalInfo;
