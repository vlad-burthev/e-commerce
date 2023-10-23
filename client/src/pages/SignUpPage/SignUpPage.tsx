import { UiButtonPrimary } from "@/components/UI/Ui-button/Ui-button";
import {
  UiInputDanger,
  UiInputPrimary,
} from "@/components/UI/Ui-input/Ui-input";
import { useSignUpMutation } from "@/services/userApi";
import { LOGIN_PAGE_ROUTE, SHOP_PAGE_ROUTE } from "@/utils/constants/constants";
import { useState, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";

interface SigInPageProps {}

const SignUpPage: FC<SigInPageProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [signUp, { isLoading, isError, error }] = useSignUpMutation();
  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signUp({ email, password });

    if (!error) {
      if ("data" in res) {
        localStorage.setItem("token", res.data);
        navigate(SHOP_PAGE_ROUTE);
      }
    }
  };

  return (
    <div
      className={`w-96 mx-auto rounded-xl my-60 border-2 border-green-500  ${
        isError ? "bg-red-50" : "bg-orange-50"
      }`}
    >
      <h1 className="text-4xl my-6 text-center">Реєстрація</h1>
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
          />
        )}
        <label className="text-md text-gray-500 " htmlFor="password">
          Пароль
        </label>
        {isError ? (
          <UiInputDanger
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
          {isLoading ? "loading" : "Зареєструватись"}
        </UiButtonPrimary>

        <p className="mt-4">
          Є аккаунту?
          <Link
            className="text-green-600 underline	font-bold"
            to={LOGIN_PAGE_ROUTE}
          >
            Авторизуватись.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
