import { createSlice } from "@reduxjs/toolkit";

export type T_User = {
  id: null | number;
  email: null | string;
  role: "USER" | "ADMIN" | null;
};

export interface I_User {
  isLogin: boolean;
  isAdmin: boolean;
  user: T_User;
}

const initialState: I_User = {
  isLogin: false,
  isAdmin: false,
  user: {
    id: null,
    email: null,
    role: null,
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    logout: (state) => {
      state.isLogin = initialState.isLogin;
      state.user = initialState.user;
      state.isAdmin = initialState.isAdmin;
    },
  },
});

export const { setLogin, setUser, setIsAdmin, logout } = userSlice.actions;
export default userSlice.reducer;
