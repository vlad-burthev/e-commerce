import { combineReducers } from "@reduxjs/toolkit";
import { deviceApi } from "../services/deviceApi";
import { userApi } from "../services/userApi";
import userSlice from "./userSlice/userSlice";
import { brandApi } from "@/services/brandApi";
import { typeApi } from "@/services/typeApi";

export const rootReducer = combineReducers({
  [deviceApi.reducerPath]: deviceApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [brandApi.reducerPath]: brandApi.reducer,
  [typeApi.reducerPath]: typeApi.reducer,
  user: userSlice,
});
