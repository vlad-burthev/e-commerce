import type { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import headerLogo from "@/assets/images/header-logo.svg";
import cartImg from "@/assets/images/cart.svg";
import ordersImg from "@/assets/images/orders.svg";
import shopImg from "@/assets/images/shop.svg";
import btnFilterItem from "@/assets/images/btn-filter-item.svg";

import {
  ADMIN_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  ORDERS_PAGE_ROUTE,
  SHOP_PAGE_ROUTE,
  SIGIN_Page_ROUTE,
} from "@/utils/constants/constants";

import {
  UiButtonDanger,
  UiButtonPrimary,
} from "@/components/UI/Ui-button/Ui-button";

import {
  UiLinkPrimary,
  UiLinkSecondary,
} from "@/components/UI/Ui-link/Ui-link";

import { UiInputPrimary } from "@/components/UI/Ui-input/Ui-input";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { logout } from "@/store/userSlice/userSlice";

const Header: FC = () => {
  const { isLogin, isAdmin, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutUserHandler = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate(SHOP_PAGE_ROUTE);
  };

  return (
    <header className="shadow-md z-50">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto py-2">
        <Link to={SHOP_PAGE_ROUTE}>
          <img src={headerLogo} alt="header-logo" />
        </Link>

        <UiButtonPrimary className="flex">
          <img src={btnFilterItem} alt="filter-item" />
          <span className="ml-2">Фільтр</span>
        </UiButtonPrimary>

        <UiInputPrimary className="w-96" type="text" placeholder="Пошук" />

        <nav className="flex items-center">
          <Link
            className="flex flex-col items-center duration-200 rounded-md mx-2 p-1  hover:bg-green-100 "
            to={SHOP_PAGE_ROUTE}
          >
            <img className="w-5" src={shopImg} alt="orders" />{" "}
            <span>Магазин</span>
          </Link>
          <Link
            className="flex flex-col items-center duration-200 rounded-md mx-2 p-1  hover:bg-green-100 "
            to={isLogin ? ORDERS_PAGE_ROUTE : LOGIN_PAGE_ROUTE}
          >
            <img className="w-5" src={ordersImg} alt="orders" />
            <span>Замовлення</span>
          </Link>
          <Link
            className="flex flex-col items-center duration-200 rounded-md mx-2 p-1  hover:bg-green-100 "
            to={isLogin ? ORDERS_PAGE_ROUTE : LOGIN_PAGE_ROUTE}
          >
            <img className="w-5" src={cartImg} alt="cart" />{" "}
            <span>Корзина</span>
          </Link>
        </nav>

        <div className="flex">
          {isAdmin && (
            <UiLinkPrimary className="mr-4" to={ADMIN_PAGE_ROUTE}>
              Адмін панель
            </UiLinkPrimary>
          )}

          {isLogin ? (
            <div className="flex items-center">
              {!isAdmin && (
                <p className="mr-2 flex items-center text-sm">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.5 19C3.5 16.5147 5.51472 14.5 8 14.5H16C18.4853 14.5 20.5 16.5147 20.5 19V21C20.5 21.2761 20.2761 21.5 20 21.5C19.7239 21.5 19.5 21.2761 19.5 21V19C19.5 17.067 17.933 15.5 16 15.5H8C6.067 15.5 4.5 17.067 4.5 19V21C4.5 21.2761 4.27614 21.5 4 21.5C3.72386 21.5 3.5 21.2761 3.5 21V19Z"
                      fill="#414141"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.5 7C7.5 4.51472 9.51472 2.5 12 2.5C14.4853 2.5 16.5 4.51472 16.5 7C16.5 9.48528 14.4853 11.5 12 11.5C9.51472 11.5 7.5 9.48528 7.5 7ZM12 3.5C10.067 3.5 8.5 5.067 8.5 7C8.5 8.933 10.067 10.5 12 10.5C13.933 10.5 15.5 8.933 15.5 7C15.5 5.067 13.933 3.5 12 3.5Z"
                      fill="#414141"
                    />
                  </svg>
                  {user?.email}
                </p>
              )}
              <UiButtonDanger onClick={logoutUserHandler}>Вийти</UiButtonDanger>
            </div>
          ) : (
            <>
              <UiLinkPrimary className="mr-2" to={LOGIN_PAGE_ROUTE}>
                Увійти
              </UiLinkPrimary>
              <UiLinkSecondary to={SIGIN_Page_ROUTE}>
                Зареєструватись
              </UiLinkSecondary>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
