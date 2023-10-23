import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootReducer } from "./rootReducer";
import { deviceApi } from "../services/deviceApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "../services/userApi";
import { brandApi } from "@/services/brandApi";
import { typeApi } from "@/services/typeApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...[
        deviceApi.middleware,
        userApi.middleware,
        brandApi.middleware,
        typeApi.middleware,
      ]
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

setupListeners(store.dispatch);
