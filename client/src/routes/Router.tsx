import { Suspense, type FC } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout/Layout";
import { SHOP_PAGE_ROUTE } from "../utils/constants/constants";
import { adminRoutes, privatRoutes, publicRoutes } from "./routes";
import { I_User } from "../store/userSlice/userSlice";
import { useAppSelector } from "../store/store";

interface AppRouterProps {}

export const AppRouter: FC<AppRouterProps> = () => {
  const { isLogin, isAdmin }: I_User = useAppSelector((state) => state.user);
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path={SHOP_PAGE_ROUTE} element={<Layout />}>
            {publicRoutes.map(({ path, Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
            {isLogin &&
              privatRoutes.map(({ path, Element }) => (
                <Route key={path} path={path} element={<Element />} />
              ))}
            {isAdmin &&
              adminRoutes.map(({ path, Element }) => (
                <Route key={path} path={path} element={<Element />} />
              ))}
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
