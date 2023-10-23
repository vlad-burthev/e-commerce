import { lazy } from "react";

import ShopPage from "@/pages/ShopPage/ShopPage";

const OrdersPage = lazy(() => import("@/pages/OrdersPage/OrdersPage"));
const NotFound = lazy(() => import("@/pages/NotFound/NotFound"));
const LogInPage = lazy(() => import("@/pages/LogInPage/LogInPage"));
const DevicePage = lazy(() => import("@/pages/DevicePage/DevicePage"));
const CartPage = lazy(() => import("@/pages/CartPage/CartPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage/AdminPage"));
const AccountPage = lazy(() => import("@/pages/AccountPage/AccountPage"));
const SignUpPage = lazy(() => import("@/pages/SignUpPage/SignUpPage"));

import {
  ACCOUNT_PAGE_ROUTE,
  ADMIN_PAGE_ROUTE,
  CART_PAGE_ROUTE,
  DEVICE_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  ORDERS_PAGE_ROUTE,
  SHOP_PAGE_ROUTE,
  SIGIN_Page_ROUTE,
} from "../utils/constants/constants";

export const publicRoutes = [
  { path: SHOP_PAGE_ROUTE, Element: ShopPage },
  { path: DEVICE_PAGE_ROUTE + "/:slug", Element: DevicePage },
  { path: SIGIN_Page_ROUTE, Element: SignUpPage },
  { path: LOGIN_PAGE_ROUTE, Element: LogInPage },
  { path: "*", Element: NotFound },
];
export const privatRoutes = [
  { path: CART_PAGE_ROUTE + "/:cartId", Element: CartPage },
  { path: ORDERS_PAGE_ROUTE + "/:orderId", Element: OrdersPage },
  { path: ACCOUNT_PAGE_ROUTE + "/:userName", Element: AccountPage },
];
export const adminRoutes = [
  { path: ADMIN_PAGE_ROUTE + "/*", Element: AdminPage },
];
