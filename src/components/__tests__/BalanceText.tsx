import React from "react";
import { render, screen } from "../../utils/test-utils";
import BalanceText from "../BalanceText";

const fixtures = {
  currency: "EUR",
  balance: 1000,
};

test("renders BalanceText", () => {
  render(
    <BalanceText currency={fixtures.currency} balance={fixtures.balance} />
  );
  const balanceElement = screen.getByText(/Balance/i);
  expect(balanceElement).toBeInTheDocument();
});
