import { lazy } from "react";
import { AppRoute } from "./type";
const Main = lazy(() => import("../screens/Main"));
const Home = lazy(() => import("../screens/Home"));
const Settings = lazy(() => import("../screens/Settings"));
const Auth = lazy(() => import("../screens/Auth"));
export type PublicRouteKeys = "MAIN" | "AUTH";
export type PrivateRouteKeys = "HOME" | "SETTINGS";
// export type IndependentRouteKeys = "";

class AllRoutes {
  static PUBLIC: Record<PublicRouteKeys, AppRoute> = {
    MAIN: {
      title: "Main",
      path: "/",
      Element: Main,
    },
    AUTH: {
      title: "Register",
      path: "/auth",
      Element: Auth,
    },
  };
  static PRIVATE: Record<PrivateRouteKeys, AppRoute> = {
    HOME: {
      title: "Home",
      path: "/home",
      Element: Home,
    },
    SETTINGS: {
      title: "Settings",
      path: "/settings",
      Element: Settings,
    },
  };
  static INDEPENDENT: Record<string, AppRoute> = {};
}
export default AllRoutes;
