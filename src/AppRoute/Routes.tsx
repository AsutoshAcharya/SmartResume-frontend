import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AllRoutes, { PrivateRouteKeys, PublicRouteKeys } from "./AllRoutes";
import { AppRoute } from "./type";
import { Suspense } from "react";
import Layout from "../Layout";
import Loader from "../Components/Loader";
import { useAuthStore } from "../store";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const allPublicRoutes = Object.keys(AllRoutes.PUBLIC).map(
  (kee) => AllRoutes.PUBLIC[kee as PublicRouteKeys]
);
const allPrivateRputes = Object.keys(AllRoutes.PRIVATE).map(
  (kee) => AllRoutes.PRIVATE[kee as PrivateRouteKeys]
);

const AppRoutes = () => {
  const { cred } = useAuthStore();
  // const cred = useSelector((state: RootState) => state.auth);
  console.log(cred);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {cred.token ? (
            <Route path="/" element={<Layout />}>
              {allPrivateRputes.map(GetRoute)}
              <Route
                path="/"
                element={<Navigate to={AllRoutes.PRIVATE.HOME.path} replace />}
              />
            </Route>
          ) : (
            allPublicRoutes.map(GetRoute)
          )}
          <Route
            path="*"
            element={<Navigate to={cred.token ? "/" : "/auth"} replace />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;

function GetRoute(route: AppRoute) {
  let Skeleton = route.skeleton || Loader;
  return (
    <Route
      key={route.path + route.title}
      path={route.path}
      element={
        <Suspense fallback={<Skeleton />} children={<route.Element />} />
      }
    />
  );
}
