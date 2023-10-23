import { useCheckQuery } from "@/services/userApi";

import { T_User } from "@/store/userSlice/userSlice";
import jwtDecode from "jwt-decode";

const useCheckAuth = () => {
  const token = localStorage.getItem("token");
  let user: T_User = { id: null, email: null, role: null };
  let isAdmin = false;
  let isLogin = false;

  if (token) {
    const { data, isError } = useCheckQuery(token);

    if (!isError && data) {
      user = jwtDecode(data);
      localStorage.setItem("token", data);
      if (user.role === "ADMIN") {
        isAdmin = true;
      }
      isLogin = true;
    }
  }

  return { user, isAdmin, isLogin };
};

export default useCheckAuth;
