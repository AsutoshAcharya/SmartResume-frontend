import { FC, ReactNode } from "react";
import DefaultLoader from "./Loader";

interface LoadingProps {
  loading: boolean;
  Loader?: ReactNode;
  children: ReactNode;
  className?: string;
}

const Loading: FC<LoadingProps> = ({
  loading,
  Loader,
  children,
  className = "",
}) => {
  return (
    <div className={className}>
      {loading
        ? Loader || <DefaultLoader className="h-[90%] w-full" />
        : children}
    </div>
  );
};

export default Loading;
