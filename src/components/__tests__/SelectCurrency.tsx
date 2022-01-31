import React from "react";
import userEvent from "@testing-library/user-event";
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
    symbolsEmojis[projectCurrencies[0] as keyof ISymbols],
  );
  expect(optionEURElement).toBeInTheDocument();
  userEvent.selectOptions(screen.getByTestId("select-multiple"), ["EUR"]);

  projectCurrencies.forEach((value) => {
    if (value === "EUR") {
      expect(screen.getByTestId(`val-${value}`).selected).toBe(true);
    } else {
      expect(screen.getByTestId(`val-${value}`).selected).toBe(false);
    }
  });
});
