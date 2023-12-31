import { UiButtonPrimary } from "@/components/UI/Ui-button/Ui-button";
import {
  UiInputDanger,
  UiInputPrimary,
} from "@/components/UI/Ui-input/Ui-input";
import { useLoginMutation } from "@/services/userApi";
import { useAppDispatch } from "@/store/store";
import { setIsAdmin, setLogin, setUser } from "@/store/userSlice/userSlice";
import { SHOP_PAGE_ROUTE, SIGIN_Page_ROUTE } from "@/utils/constants/constants";
import { useState, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LogInPageProps {}

const LogInPage: FC<LogInPageProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [login, { isLoading, isError, error }] = useLoginMutation();
  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await login({ email, password });

    if (!error) {
      if ("data" in res) {
        localStorage.setItem("token", res.data.token);
        navigate(SHOP_PAGE_ROUTE);

        dispatch(setLogin(true));
        if (res.data.user.role === "ADMIN") {
          dispatch(setIsAdmin(true));
        }
        dispatch(
          setUser({
            id: res.data.user.id,
            email: res.data.user.email,
            role: res.data.user.role,
          })
        );
      }
    }
  };
  return (
    <div
      className={`w-96 mx-auto rounded-xl my-60 border-2 border-green-500  ${
        isError ? "bg-red-50" : "bg-orange-50"
      }`}
    >
      <h1 className="text-4xl my-6 text-center">Авторизація</h1>
      <form onSubmit={signUpHandler} className="p-4">
        <label className="text-md text-gray-500" htmlFor="email">
          Email
        </label>
        {isError ? (
          <UiInputDanger
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="w-full mb-6 text-xl"
            type="email"
            id="email"
            placeholder="Введіть email"
            autoComplete="email"
          />
        ) : (
          <UiInputPrimary
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="w-full mb-6 text-xl"
            type="email"
            id="email"
            placeholder="Введіть email"
            autoComplete="email"
          />
        )}
        <label className="text-md text-gray-500 " htmlFor="password">
          Пароль
        </label>
        {isError ? (
          <UiInputDanger
            autoComplete="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="w-full mb-6 text-xl"
            type="password"
            id="password"
            placeholder="Введіть пароль"
          />
        ) : (
          <UiInputPrimary
            value={password}
            autoComplete="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="w-full mb-6 text-xl"
            type="password"
            id="password"
            placeholder="Введіть пароль"
          />
        )}

        {isError && (
          <span className="block text-center text-red-600 mb-4">
            {error
              ? error?.data.message
              : "Помилка від сервера. Статус:" + error?.status}
          </span>
        )}

        <UiButtonPrimary className="w-full hover:bg-orange-400" type="submit">
          {isLoading ? "loading" : "Увійти"}
        </UiButtonPrimary>

        <p className="mt-4">
          Немає аккаунту?{" "}
          <Link
            className="text-green-600 underline	font-bold"
            to={SIGIN_Page_ROUTE}
          >
            Зареєеструватись.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogInPage;
