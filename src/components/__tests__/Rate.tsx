import React from "react";
import { render, screen } from "../../utils/test-utils";
import Rate from "../Rate";
import { ISymbols, symbols } from "../../utils/constants";

const fixtures = {
  baseCurrency: "GBP",
  targetCurrency: "USD",
  rate: 1.985,
};

test("renders rate", () => {
  render(
    <Rate
      baseCurrency={fixtures.baseCurrency}
      targetCurrency={fixtures.targetCurrency}
      rate={fixtures.rate}
      isLoading={false}
    />
  );
  const linkElement = screen.getByText(/Our current rate/i);
  expect(linkElement).toBeInTheDocument();

  // Checking if actual rate and currencies symbols are rendered

  const primaryCurrencyElement = screen.getByText(
    `${symbols[fixtures.baseCurrency as keyof ISymbols]}`
  );
  expect(primaryCurrencyElement).toBeInTheDocument();

  const secondCurrencyElement = screen.getByText(
    `${symbols[fixtures.targetCurrency as keyof ISymbols]}`
  );
  expect(secondCurrencyElement).toBeInTheDocument();

  const rateElement = screen.getByText(`${fixtures.rate}`);
  expect(rateElement).toBeInTheDocument();
});
