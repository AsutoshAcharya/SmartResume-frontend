import React from "react";

type LoaderProps = {
  color?: string;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  color = "text-blue-500",
  className = "",
}) => {
  return (
    <div
      className={`flex justify-center items-center w-full h-full my-auto ${className}`}
    >
      <div
        className={`aspect-square w-full h-full max-w-[30px] max-h-[30px] animate-spin rounded-full border-3 border-solid border-t-transparent ${color}`}
      />
    </div>
  );
};

export default Loader;
