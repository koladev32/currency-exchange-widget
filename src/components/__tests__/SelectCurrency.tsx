import React from "react";
import { render, screen } from "../../utils/test-utils";
import {
  ISymbols,
  projectCurrencies,
  symbolsEmojis,
} from "../../utils/constants";
import SelectCurrency from "../SelectCurrency";

test("renders SelectCurrency", () => {
  render(<SelectCurrency currencies={projectCurrencies} onChange={() => {}} />);
  const optionEURElement = screen.getByText(
    symbolsEmojis[projectCurrencies[0] as keyof ISymbols]
  );
  expect(optionEURElement).toBeInTheDocument();
});
