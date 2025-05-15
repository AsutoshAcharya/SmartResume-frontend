import { FC, HTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Flex: FC<Props> = ({ className, ...rest }) => {
  return (
    <div
      className={clsx("flex flex-col justify-start ", className)}
      {...rest}
    />
  );
};

export default Flex;
