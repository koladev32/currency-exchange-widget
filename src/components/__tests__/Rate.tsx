import React from "react";
import { render, screen } from "../../utils/test-utils";
import Rate from "../Rate";
import { ISymbols, symbols } from "../../utils/constants";

const fixtures = {
  primaryCurrency: "GBP",
  secondaryCurrency: "USD",
  rate: 1.985,
};

test("renders learn react link", () => {
  render(
    <Rate
      primaryCurrency={fixtures.primaryCurrency}
      secondaryCurrency={fixtures.secondaryCurrency}
      rate={fixtures.rate}
    />,
  );
  const linkElement = screen.getByText(/Our current rate/i);
  expect(linkElement).toBeInTheDocument();

  // Checking if actual rate and currencies symbols are rendered

  const primaryCurrencyElement = screen.getByText(`${symbols[fixtures.primaryCurrency as keyof ISymbols]}`);
  expect(primaryCurrencyElement).toBeInTheDocument();

  const secondCurrencyElement = screen.getByText(`${symbols[fixtures.secondaryCurrency as keyof ISymbols]}`);
  expect(secondCurrencyElement).toBeInTheDocument();

  const rateElement = screen.getByText(`${fixtures.rate}`);
  expect(rateElement).toBeInTheDocument();
});
