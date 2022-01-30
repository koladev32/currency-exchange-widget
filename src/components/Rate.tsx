import React from "react";
import { ISymbols, symbols } from "../utils/constants";

interface IRate {
  baseCurrency: string;
  targetCurrency: string;
  rate: number;
  isLoading: boolean;
}

const Rate: React.FC<IRate> = ({
  baseCurrency, targetCurrency, rate,
  isLoading = false,
}) => {
  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <div className="flex flex-row justify-between w-full p-4 font-semibold">
      <div className="flex flex-row text-xs">
        <p>
          {symbols[baseCurrency as keyof ISymbols]}
        </p>
        1 =
        <p>
          {symbols[targetCurrency as keyof ISymbols]}
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
};

export default Rate;
