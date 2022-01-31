import React, { useEffect, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import useSWR from "swr";
import SelectCurrency from "./SelectCurrency";
import BalanceText from "./BalanceText";
import {
  intrudersKeysValues,
  ISymbols,
  projectCurrencies,
} from "../utils/constants";
import Rate from "./Rate";
import { RootState, store } from "../store";
import { walletSlice } from "../store/slices/wallet";
import { TransactionType } from "../enums/transactions";
import { ApiURL } from "../utils/api";

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

const ExchangeForm = () => {
  const wallet = useSelector((state: RootState) => state.wallet);

  const [rate, setRate] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState("EUR");

  const currencies = [...projectCurrencies];

  const [targetCurrency, setTargetCurrency] = useState("USD");
  const ratesQuery = useSWR(`${ApiURL}latest?base=${baseCurrency}&symbols=${targetCurrency}`, fetcher, {
    refreshInterval: 10000,
  });

  const validationConversionForm = Yup.object({
    amount: Yup.number()
      .lessThan(wallet[baseCurrency as keyof ISymbols].balance)
      .moreThan(0, "This field should be greater than zero.")
      .required("This field is required")
      .test(
        "maxDigitsAfterDecimal",
        "Amount field must have 2 digits after decimal or less",
        // @ts-ignore
        (number) => /^\d+(\.\d{1,2})?$/.test(number),
      ),
    targetAmount: Yup.number()
      .lessThan(wallet[targetCurrency as keyof ISymbols].balance)
      .moreThan(0, "This field should be greater than zero.")
      .required("This field is required")
      .test(
        "maxDigitsAfterDecimal",
        "Amount field must have 2 digits after decimal or less",
        // @ts-ignore
        (number) => /^\d+(\.\d{1,2})?$/.test(number),
      ),
  });

  useEffect(() => {
    if (ratesQuery.data) {
      setRate(ratesQuery.data.rates[targetCurrency].toFixed(2));
    }
  }, [ratesQuery.data, targetCurrency]);

  const formik = useFormik({
    initialValues: {
      amount: 1,
      targetAmount: rate,
    },
    onSubmit: (values, { setValues, setSubmitting }) => {
      store.dispatch(
        walletSlice.actions.incrementByAmount({
          currency: targetCurrency,
          amount: values.targetAmount,
          transactionType: TransactionType.credit,
        }),
      );

      store.dispatch(
        walletSlice.actions.decrementByAmount({
          currency: baseCurrency,
          amount: values.amount,
          transactionType: TransactionType.debit,
        }),
      );
      toast.info(
        `You've successfully exchanged ${values.amount}
       ${baseCurrency} to ${values.targetAmount} ${targetCurrency}`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        },
      );
      setValues({ amount: 1, targetAmount: rate });
      setSubmitting(false);
    },
    validationSchema: validationConversionForm,
  });

  const buttonText = `Sell ${baseCurrency} for ${targetCurrency}`;

  return (
    <FormikProvider value={formik}>
      <form
        className="w-full flex flex-col h-2/3 bg-stone-50 rounded p-2 md:w-9/12 md:self-center md:p-4 lg:w-5/12 lg:h-10/12"
        onSubmit={formik.handleSubmit}
        data-testid="exchange-form"
      >
        <div className="flex flex-row bg-white py-2 my-2 rounded">
          <div className="relative w-3/6">
            {/*
              For primary currency selection
              */}
            <SelectCurrency
              currencies={currencies}
              onChange={setBaseCurrency}
            />
            <BalanceText
              balance={wallet[baseCurrency as keyof ISymbols].balance}
              currency={baseCurrency}
            />
          </div>
          <div className="w-4/6">
            <input
              className=" block w-full text-right rounded text-gray-700 py-4 px-4 leading-tight focus:outline-none
              focus:bg-white focus:border focus:border-blue-100"
              type="number"
              required
              data-testid="amount-field"
              placeholder={formik.values.amount.toString()}
              name="amount"
              value={formik.values.amount || ""}
              onChange={(e) => {
                const eValue = parseFloat(e.target.value).toFixed(2);
                formik.setFieldValue("amount", eValue);
                formik.handleChange(e);
                formik.setFieldValue(
                  "targetAmount",
                  parseFloat((parseFloat(eValue) * rate).toFixed(2)),
                );
              }}
              onBlur={formik.handleBlur}
              onKeyPress={(e) => {
                if (intrudersKeysValues.includes(e?.key)) {
                  e.preventDefault();
                }
              }}
            />
            {formik.errors.amount ? (
              <p className="text-red-500 text-xs text-left">
                {formik.errors.amount}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-row bg-white py-2 my-2 rounded">
          <div className="relative w-3/6">
            {/*
              For secondary currency selection
              */}
            <SelectCurrency
              currencies={["USD", "EUR", "GBP"]}
              onChange={setTargetCurrency}
            />
            <BalanceText
              balance={wallet[targetCurrency as keyof ISymbols].balance}
              currency={targetCurrency}
            />
          </div>
          <div className="w-4/6">
            <input
              className=" block w-full text-right rounded text-gray-700 py-4 px-4 leading-tight focus:outline-none
              focus:bg-white focus:border focus:border-blue-100"
              type="number"
              required
              name="targetAmount"
              data-testid="targetAmount-field"
              placeholder={rate.toString()}
              value={formik.values.targetAmount || ""}
              onChange={(e) => {
                const eValue = parseFloat(e.target.value).toFixed(2);
                formik.setFieldValue("targetAmount", eValue);
                formik.handleChange(e);
                formik.setFieldValue(
                  "amount",
                  parseFloat((parseFloat(eValue) / rate).toFixed(2)),
                );
              }}
              onBlur={formik.handleBlur}
              onKeyPress={(e) => {
                if (intrudersKeysValues.includes(e?.key)) {
                  e.preventDefault();
                }
              }}
            />
            {formik.errors.targetAmount ? (
              <p className="text-red-500 text-xs text-left">
                {formik.errors.targetAmount}
              </p>
            ) : null}
            {targetCurrency === baseCurrency ? (
              <p className="text-red-500 text-xs text-left">
                You can&apos;t convert the same currency.
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-row bg-white py-2 mt-10 rounded">
          <Rate
            baseCurrency={baseCurrency}
            targetCurrency={targetCurrency}
            rate={rate}
            isLoading={!ratesQuery.data}
          />
        </div>
        <div className="flex flex-row py-2 mt-6 rounded justify-center">
          <button
            data-testid="exchange-form-submit"
            type="submit"
            className={`${
              !formik.isValid
              || formik.isSubmitting
              || !ratesQuery.data
              || targetCurrency === baseCurrency
                ? "bg-gray-400"
                : "bg-blue-600"
            } rounded-lg py-3 text-white px-16 
            font-semibold shadow-md shadow-blue-500/50 md:px-40 lg:px-36`}
            disabled={targetCurrency === baseCurrency}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default ExchangeForm;
