import React from "react";
import { ISymbols, symbols } from "../utils/constants";

interface IBalanceText {
  balance: number | string;
  currency: string;
}

const BalanceText: React.FC<IBalanceText> = ({ balance, currency }) => (
  <p className="text-xs ml-2 w-full">
    Balance:
    {" "}
    {symbols[currency as keyof ISymbols]}
    {balance}
  </p>
);

export default BalanceText;
