import { lazy } from "react";
import { AppRoute } from "./type";
const Main = lazy(() => import("../screens/Main"));
const Home = lazy(() => import("../screens/Home"));

export type PublicRouteKeys = "MAIN";
export type PrivateRouteKeys = "HOME";
// export type IndependentRouteKeys = "";

class AllRoutes {
  static PUBLIC: Record<PublicRouteKeys, AppRoute> = {
    MAIN: {
      title: "Main",
      path: "/",
      Element: Main,
    },
  };
  static PRIVATE: Record<PrivateRouteKeys, AppRoute> = {
    HOME: {
      title: "Home",
      path: "/home",
      Element: Home,
    },
  };
  static INDEPENDENT: Record<string, AppRoute> = {};
}
export default AllRoutes;
