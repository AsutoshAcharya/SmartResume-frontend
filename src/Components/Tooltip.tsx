import React, { ReactNode, useState } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
}) => {
  const [visible, setVisible] = useState(false);

  const placementClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <div
        className={`absolute z-50 px-2 py-1 text-sm bg-black/60 text-white rounded shadow-md whitespace-nowrap transform transition-all duration-200 origin-center
        ${placementClasses[placement]} 
        ${
          visible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-30 pointer-events-none"
        }
        `}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
