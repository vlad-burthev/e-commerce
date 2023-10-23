import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Container from "../Container/Container";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  return (
    <>
      <Header />

      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
