import { configureStore } from "@reduxjs/toolkit";
import { walletSlice } from "./slices/wallet";
import { ratesApi } from "../services/rates";

export const store = configureStore({
  reducer: {
    wallet: walletSlice.reducer,
    [ratesApi.reducerPath]: ratesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ratesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
