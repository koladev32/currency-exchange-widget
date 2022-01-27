import React from "react";
import { ISymbols, symbolsEmojis } from "../utils/constants";

interface ISelectCurrency {
  currencies: string[];
  onChange: (value: string) => void;
}

const SelectCurrency:React.FC<ISelectCurrency> = ({ currencies, onChange }) => (
  <div className="relative w-3/6">
    <select
      className="block appearance-none bg-white ml-2 w-full hover:bg-stone-50 text-gray-700 py-3 px-4 pr-8 focus:outline-none focus:bg-white"
      id="grid-state"
      onChange={(event) => onChange(event.target.value)}
    >
      {
          currencies.map((currency) => (
            <option value={currency}>{symbolsEmojis[currency as keyof ISymbols]}</option>
          ))
        }
    </select>
  </div>
);

export default SelectCurrency;