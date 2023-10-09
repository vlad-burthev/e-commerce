import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { SHOP_PAGE_ROUTE } from "../utils/constants/constants";
import { adminRoutes, privatRoutes, publicRoutes } from "./routes";

interface AppRouterProps {}

export const AppRouter: FC<AppRouterProps> = () => {
  return (
    <>
      <Routes>
        <Route path={SHOP_PAGE_ROUTE} element={<Layout />}>
          {publicRoutes.map(({ path, Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
          {privatRoutes.map(({ path, Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
          {adminRoutes.map(({ path, Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
        </Route>
      </Routes>
    </>
  );
};
