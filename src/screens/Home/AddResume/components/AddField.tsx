import { FC, useState } from "react";
import { TextField } from "../../../../Components/TextField";
import { Button } from "../../../../Components/Button";
import clsx from "clsx";

interface Props {
  onAdd: (val: string) => void;
  placeholder?: string;
  className?: string;
}
const AddField: FC<Props> = ({ onAdd, placeholder, className }) => {
  const [val, setVal] = useState("");

  function add() {
    onAdd(val);
    setVal("");
  }

  return (
    <div
      className={clsx(
        "flex items-center justify-between gap-2 p-2 ",
        className
      )}
    >
      <TextField
        value={val}
        onChange={(val) => {
          setVal(val);
        }}
        placeholder={placeholder || "Add field value"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            add();
          }
        }}
      />
      <Button onClick={add}>+ Add</Button>
    </div>
  );
};

export default AddField;
