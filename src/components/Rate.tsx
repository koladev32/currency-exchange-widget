import React from "react";
import { ISymbols, symbols } from "../utils/constants";

interface IRate {
  primaryCurrency: string;
  secondaryCurrency: string;
  rate: number;
}

const Rate: React.FC<IRate> = ({ primaryCurrency, secondaryCurrency, rate }) => (
  <div className="flex flex-row justify-between w-full p-4 font-semibold">
    <div className="text-xs">
      <p>
        {symbols[primaryCurrency as keyof ISymbols]}
      </p>
      1 =
      <p>
        {symbols[secondaryCurrency as keyof ISymbols]}
      </p>
      <p>
        { rate }
      </p>
    </div>
    <p className="text-xs">
      Our current rate
    </p>
  </div>
);

export default Rate;
