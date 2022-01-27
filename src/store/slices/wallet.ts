import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import WALLET_MOCK from "../../mock/wallet";
import { Wallet } from "../../models/wallet";
import { TransactionType } from "../../enums/transactions";

const initialState: Wallet = WALLET_MOCK;

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
    incrementByAmount: (state, action: PayloadAction<CreditPayload>) => {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      state[action.payload.currency].amount += action.payload.amount;
    },
    decrementByAmount: (state, action: PayloadAction<DebitPayload>) => {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      state[action.payload.currency].amount -= action.payload.amount;
    },
  },
});

export const { incrementByAmount, decrementByAmount } = walletSlice.actions;

export const selectWallet = (state: RootState) => state.wallet;

export default walletSlice.reducer;
