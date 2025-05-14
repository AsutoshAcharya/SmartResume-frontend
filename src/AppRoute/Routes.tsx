import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllRoutes, { PrivateRouteKeys, PublicRouteKeys } from "./AllRoutes";
import { AppRoute } from "./type";
import { Suspense } from "react";
import Layout from "../Layout";
import Loader from "../Components/Loader";

const allPublicRoutes = Object.keys(AllRoutes.PUBLIC).map(
  (kee) => AllRoutes.PUBLIC[kee as PublicRouteKeys]
);
const allPrivateRputes = Object.keys(AllRoutes.PRIVATE).map(
  (kee) => AllRoutes.PRIVATE[kee as PrivateRouteKeys]
);

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {true && (
            <Route path="/" element={<Layout />}>
              {allPrivateRputes.map(GetRoute)}
            </Route>
          )}
          {allPublicRoutes.map(GetRoute)}
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
