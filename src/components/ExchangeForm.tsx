import React, { useEffect, useMemo, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useSelector } from "react-redux";
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
import { useGetRatesBetweenCurrenciesQuery } from "../services/rates";

function ExchangeForm() {
  const wallet = useSelector((state: RootState) => state.wallet);

  const [rate, setRate] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [targetCurrencyAmount, setTargetCurrencyAmount] = useState(0);

  const currencies = [...projectCurrencies];

  const [targetCurrency, setTargetCurrency] = useState("USD");

  const { data, isLoading } = useGetRatesBetweenCurrenciesQuery(
    { baseCurrency, targetCurrency },
    {
      pollingInterval: 50000,
    },
  );

  const validationConversionForm = Yup.object({
    amount: Yup.number()
      .lessThan(wallet[baseCurrency as keyof ISymbols].balance)
      .moreThan(0)
      .required()
      .test(
        "maxDigitsAfterDecimal",
        "Amount field must have 2 digits after decimal or less",
        (number) => /^\d+(\.\d{1,2})?$/.test(number),
      ),
  });

  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    onSubmit: (values, { resetForm }) => {
      store.dispatch(
        walletSlice.actions.incrementByAmount({
          currency: targetCurrency,
          amount: targetCurrencyAmount,
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
      resetForm();
      setTargetCurrencyAmount(0);
      toast.info(
        `You've successfully exchanged ${values.amount}
       ${baseCurrency} to ${targetCurrencyAmount} ${targetCurrency}`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        },
      );
    },
    validationSchema: validationConversionForm,
  });

  useMemo(() => {
    setTargetCurrency(targetCurrency);
  }, [targetCurrency]);

  useEffect(() => {
    if (data) {
      setRate(data.rates[targetCurrency].toFixed(2));
    }
  }, [data]);

  const buttonText = `Sell ${baseCurrency} for ${targetCurrency}`;

  return (
    <FormikProvider value={formik}>
      <form
        className="w-full flex flex-col h-2/3 bg-stone-50 rounded p-2 md:w-9/12 md:self-center md:p-4 lg:w-5/12 lg:h-10/12"
        onSubmit={formik.handleSubmit}
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
              placeholder="0"
              name="amount"
              value={formik.values.amount || ""}
              onChange={(e) => {
                formik.handleChange(e);
                setTargetCurrencyAmount(parseFloat((e.target.value * rate).toFixed(2)));
              }}
              onBlur={formik.handleBlur}
              onKeyPress={(e) => {
                if (intrudersKeysValues.includes(e?.key)) {
                  e.preventDefault();
                }
              }}
            />
            {formik.errors.amount ? (
              <p className="text-red-500 text-xs text-left">{formik.errors.amount}</p>
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
              className="appearance-none block w-full text-right text-gray-700 py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              name="targetCurrency"
              placeholder="0"
              value={`+${targetCurrencyAmount}`}
              defaultValue={1}
            />
            {targetCurrency === baseCurrency ? (
              <p className="text-red-500 text-xs text-left">You can't convert the same currency.</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-row bg-white py-2 mt-10 rounded">
          <Rate
            baseCurrency={baseCurrency}
            targetCurrency={targetCurrency}
            rate={rate}
            isLoading={isLoading}
          />
        </div>
        <div className="flex flex-row py-2 mt-6 rounded justify-center">
          <button
            type="submit"
            className={`${!formik.isValid || formik.isSubmitting || isLoading || targetCurrency === baseCurrency ? "bg-gray-400" : "bg-blue-600"} rounded-lg py-3 text-white px-16 
            font-semibold shadow-md shadow-blue-500/50 md:px-40 lg:px-36`}
            disabled={targetCurrency === baseCurrency}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </FormikProvider>
  );
}

export default ExchangeForm;
