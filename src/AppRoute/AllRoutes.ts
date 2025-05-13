import { lazy } from "react";
import { AppRoute } from "./type";
const Main = lazy(() => import("../screens/Main"));
const Home = lazy(() => import("../screens/Home"));
const Settings = lazy(() => import("../screens/Settings"));
const Register = lazy(() => import("../screens/Auth/Register"));
const Login = lazy(() => import("../screens/Auth/Login"));
export type PublicRouteKeys = "MAIN" | "REGISTER" | "LOGIN";
export type PrivateRouteKeys = "HOME" | "SETTINGS";
// export type IndependentRouteKeys = "";

class AllRoutes {
  static PUBLIC: Record<PublicRouteKeys, AppRoute> = {
    MAIN: {
      title: "Main",
      path: "/",
      Element: Main,
    },
    REGISTER: {
      title: "Register",
      path: "/register",
      Element: Register,
    },
    LOGIN: {
      title: "Register",
      path: "/login",
      Element: Login,
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
