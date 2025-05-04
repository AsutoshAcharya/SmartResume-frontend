import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {
  return (
    <div className="flex flex-row h-screen w-screen">
      <SideBar />
      <div className="grow h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
