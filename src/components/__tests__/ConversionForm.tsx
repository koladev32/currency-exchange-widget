import React from "react";
import { render, screen } from "../../utils/test-utils";
import ConversionForm from "../ConversionForm";

const fixtures = {
  primaryCurrency: "GBP",
  secondaryCurrency: "USD",
  rate: 1.985,
  isLoading: false,
};

test("renders FormComponent", () => {
  render(
    <ConversionForm
      primaryCurrency={fixtures.primaryCurrency}
      secondaryCurrency={fixtures.secondaryCurrency}
      rate={fixtures.rate}
      isLoading={fixtures.isLoading}
    />,
  );
  const primaryCurrencyElement = screen.getAllByPlaceholderText("0");
  expect(primaryCurrencyElement).toBeInTheDocument();
});
