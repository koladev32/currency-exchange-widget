import { Wallet } from "../models/wallet";

const WALLET_MOCK: Wallet = {
  EUR: {
    currency: "EUR",
    balance: 1000.25,
  },
  USD: {
    currency: "USD",
    balance: 300.25,
  },
  GBP: {
    currency: "GBP",
    balance: 600.25,
  },
};

export default WALLET_MOCK;
