import React from "react";

const SideBar = () => {
  return (
    <div className="w-64 flex-shrink-0 h-full">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Smart Resume
      </div>
      <nav className="mt-4 space-y-2 px-4">
        <a
          href="#"
          className="block py-2 px-3 rounded hover:bg-gray-700 hover:text-white"
        >
          🏠 Home
        </a>

        <a
          href="#"
          className="block py-2 px-3 rounded hover:bg-gray-700 hover:text-white"
        >
          ⚙️ Settings
        </a>
      </nav>
    </div>
  );
};

export default SideBar;
