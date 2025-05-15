import { FC } from "react";
import Flex from "./Flex";
import Text from "./Text";

interface Props {
  label?: string;
  checked?: boolean;
  onChange: (val: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}
const options = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];

const Question: FC<Props> = ({
  label,
  checked = false,
  onChange,
  required,
  disabled,
  className,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-500 mb-1 block">
          {label} {required && "*"}
        </label>
      )}
      <div className="w-full relative flex flex-row">
        {options.map((option) => (
          <Flex className="gap-2 items-center flex-row">
            <Text children={option.label} size="md" />
            <input
              type="radio"
              onClick={() => onChange(option.value)}
              checked={checked === option.value}
              disabled={disabled}
            />
          </Flex>
        ))}
      </div>
    </div>
  );
};

export default Question;
