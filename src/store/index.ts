import { configureStore } from "@reduxjs/toolkit";
import { walletSlice } from "./slices/wallet";

export const store = configureStore({
  reducer: {
    wallet: walletSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
