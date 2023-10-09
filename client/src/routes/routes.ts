import AccountPage from "../pages/AccountPage/AccountPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import CartPage from "../pages/CartPage/CartPage";
import DevicePage from "../pages/DevicePage/DevicePage";
import LogInPage from "../pages/LogInPage/LogInPage";
import NotFound from "../pages/NotFound/NotFound";
import OrderPage from "../pages/OrdersPage/OrdersPage";
import ShopPage from "../pages/ShopPage/ShopPage";
import SigInPage from "../pages/SigInPage/SigInPage";
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
  { path: SIGIN_Page_ROUTE, Element: SigInPage },
  { path: LOGIN_PAGE_ROUTE, Element: LogInPage },
  { path: "*", Element: NotFound },
];
export const privatRoutes = [
  { path: CART_PAGE_ROUTE + "/:cartId", Element: CartPage },
  { path: ORDERS_PAGE_ROUTE + "/:orderId", Element: OrderPage },
  { path: ACCOUNT_PAGE_ROUTE + "/:userName", Element: AccountPage },
];
export const adminRoutes = [{ path: ADMIN_PAGE_ROUTE, Element: AdminPage }];
