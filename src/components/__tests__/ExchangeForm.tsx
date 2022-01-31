import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, render } from "../../utils/test-utils";
import ExchangeForm from "../ExchangeForm";

test("renders Exchange form", () => {
  render(
    <ExchangeForm />,
  );
  const formElement = screen.getByTestId("exchange-form");
  expect(formElement).toBeInTheDocument();

  const submitButton = screen.getByTestId("exchange-form-submit");

  const amountInput = screen.getByTestId("amount-field");
  expect(amountInput).toBeInTheDocument();
  expect(amountInput.type).toEqual("number");
  expect(amountInput.value).toEqual("1");

  const targetAmountInput = screen.getByTestId("targetAmount-field");
  expect(targetAmountInput).toBeInTheDocument();
  expect(targetAmountInput.type).toEqual("number");

  userEvent.clear(amountInput);
  userEvent.type(amountInput, "20");
  expect(amountInput.value).toEqual("20");
  expect(targetAmountInput.value).toEqual("20");

  userEvent.type(amountInput, "20.33");
  expect(submitButton.disabled).toEqual(false);
});
