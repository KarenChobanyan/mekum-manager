import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authApi } from "../API/authApi";
import authSlice from "./Slices/authSlice";
import { directoriesApi } from "../API/direcroriesApi";
import { actionsApi } from "../API/actionsApi";


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [directoriesApi.reducerPath]:directoriesApi.reducer,
    [actionsApi.reducerPath]:actionsApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      directoriesApi.middleware,
      actionsApi.middleware
    ]),
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
