import { lazy } from "react";
import { AppRoute } from "./type";
const Main = lazy(() => import("../screens/Main"));
const Home = lazy(() => import("../screens/Home"));
const Templates = lazy(() => import("../screens/Templates"));
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
      title: "Templates",
      path: "/templates",
      Element: Templates,
    },
  };
  static INDEPENDENT: Record<string, AppRoute> = {};
}
export default AllRoutes;
