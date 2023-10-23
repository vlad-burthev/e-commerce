import { AppRouter } from "./routes/Router";
import useCheckAuth from "./helpers/hooks/useCheckAuth";
import { useAppDispatch } from "./store/store";
import { setIsAdmin, setLogin, setUser } from "./store/userSlice/userSlice";
import { useEffect } from "react";

const App = () => {
  const { user, isAdmin, isLogin } = useCheckAuth();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setUser(user));
    dispatch(setLogin(isLogin));
    dispatch(setIsAdmin(isAdmin));
  }, [user, isAdmin, isLogin]);

  return <AppRouter />;
};

export default App;
