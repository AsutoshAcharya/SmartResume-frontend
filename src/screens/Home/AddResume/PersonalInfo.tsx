import { FC, Fragment } from "react";
import { PersonalInfo as PersonalInfoType } from "../type";
import { TextField } from "../../../Components/TextField";
import { personalInfoFields } from "./DataField";
import { Button } from "../../../Components/Button";
interface Props {
  data: PersonalInfoType;
  update: (field: keyof PersonalInfoType, value: string | string[]) => void;
}

const PersonalInfo: FC<Props> = ({ data, update }) => {
  return (
    <Fragment>
      <div className="grid grid-cols-2 gap-4">
        {personalInfoFields.map(
          ({ key, label, placeholder, maxLength, type }) => (
            <div key={key}>
              <TextField
                type={type}
                value={data[key]}
                label={label}
                onChange={(val) => update(key, val)}
                placeholder={placeholder}
                maxLength={maxLength}
                className="border-b"
              />
            </div>
          )
        )}
      </div>
      <Button children="+ Add Links" />
    </Fragment>
  );
};
export default PersonalInfo;
