import type { FC } from "react";
import { Outlet } from "react-router-dom";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
