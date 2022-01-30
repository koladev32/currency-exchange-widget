import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WALLET_MOCK from "../../mock/wallet";
import { Wallet } from "../../models/wallet";
import { TransactionType } from "../../enums/transactions";

export const initialState: Wallet = JSON.parse(JSON.stringify(WALLET_MOCK));

interface CreditPayload {
  transactionType: TransactionType.credit;
  amount: number;
  currency: string;
}

interface DebitPayload {
  transactionType: TransactionType.debit;
  amount: number;
  currency: string;
}

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    incrementByAmount: (
      state: Wallet,
      action: PayloadAction<CreditPayload>,
    ) => {
      const updatedState = state;
      updatedState[action.payload.currency as keyof Wallet].balance
        += action.payload.amount;
    },
    decrementByAmount: (state: Wallet, action: PayloadAction<DebitPayload>) => {
      const updatedState = state;

      updatedState[action.payload.currency as keyof Wallet].balance
        -= action.payload.amount;
    },
  },
});

export const { incrementByAmount, decrementByAmount } = walletSlice.actions;

export default walletSlice.reducer;
