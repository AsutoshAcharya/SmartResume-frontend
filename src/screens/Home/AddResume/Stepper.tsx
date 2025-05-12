import { FC, Fragment } from "react";
import clsx from "clsx";
import Text from "../../../Components/Text";
import { Step } from "../type";
interface Props {
  current: number;
  steps: Array<Step>;
}

const Stepper: FC<Props> = ({ current, steps }) => {
  return (
    <div className="flex flex-row p-6 px-10">
      {steps.map((step, idx) => (
        <Fragment key={step.name}>
          <div className="flex flex-col gap-8 items-center">
            <div
              className={clsx(
                "p-1 rounded-full",
                current === idx && "border-1 border-blue-300"
              )}
            >
              <div
                className={clsx(
                  "flex justify-center items-center rounded-full w-13 h-13 shrink-0 font-bold text-white",
                  idx <= current ? "bg-blue-600" : "bg-blue-300"
                )}
              >
                {idx + 1}
              </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <step.Icon className="w-6 h-6 text-blue-600 mr-2" />
              <Text
                children={step.name}
                size="md"
                className={clsx(
                  current === idx ? "text-blue-600" : "text-black"
                )}
              />
            </div>
          </div>
          {idx < steps.length - 1 && (
            <div
              className={clsx(
                "h-1 w-25 mt-7",
                idx <= current - 1 ? "bg-blue-600" : "bg-blue-300"
              )}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Stepper;
