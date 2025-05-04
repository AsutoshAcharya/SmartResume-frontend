import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { AppRoute } from "../AppRoute/type";
import AllRoutes from "../AppRoute/AllRoutes";
import clsx from "clsx";
import { FileText } from "lucide-react";

const SideBar = () => {
  const sidebarRoutes: Array<AppRoute & { Icon: ReactElement }> = [
    {
      ...AllRoutes.PRIVATE.HOME,
      Icon: <>🏠</>,
    },
    {
      ...AllRoutes.PRIVATE.SETTINGS,
      Icon: <>⚙️</>,
    },
  ];
  return (
    <div className="w-64 flex flex-col flex-shrink-0 h-full border-r-1 border-gray-200 p-2">
      <div className="flex w-full flex-row items-center gap-2 p-4 text-2xl font-bold border-b-1 border-gray-200">
        <FileText className="text-blue-500" />{" "}
        <p className="text-blue-500 text-xl">Smart Resume</p>
        <div className="grow" />
        {/* <button className="rounded-full hover:bg-blue-200 transition">
          <X className="text-gray-400" />
        </button> */}
      </div>
      <div className="flex flex-col gap-2 p-2 w-full">
        {sidebarRoutes.map((r) => (
          <NavLink
            key={r.path}
            to={r.path}
            className={({ isActive }) =>
              clsx(
                "block py-2 px-3 rounded hover:bg-blue-200 text-gray-400",
                isActive ? "bg-blue-200" : ""
              )
            }
          >
            {r.Icon} &nbsp; {r.title}
          </NavLink>
        ))}
      </div>
      <div className="grow" />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        LogOut
      </button>
    </div>
  );
};

export default SideBar;
