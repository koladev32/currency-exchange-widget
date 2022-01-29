import React, { useState } from "react";
import { FormikProvider, useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import SelectCurrency from "./SelectCurrency";
import BalanceText from "./BalanceText";
import { intrudersKeysValues, ISymbols } from "../utils/constants";
import Rate from "./Rate";
import { RootState, store } from "../store";
import { walletSlice } from "../store/slices/wallet";
import { TransactionType } from "../enums/transactions";

interface IConversionForm {
  primaryCurrency: string;
  secondaryCurrency: string;
  rate: number;
  isLoading: boolean;
  secondaryCurrenciesList: Array<string>;
  primaryCurrenciesList: Array<string>;
  onChangePrimaryCurrency: () => void;
  onChangeSecondCurrency: () => void;
}

const ConversionForm: React.FC<IConversionForm> = ({
  primaryCurrency,
  secondaryCurrency,
  rate,
  isLoading,
  secondaryCurrenciesList,
  primaryCurrenciesList,
  onChangePrimaryCurrency,
  onChangeSecondCurrency,
}) => {
  const wallet = useSelector((state: RootState) => state.wallet);

  const validationConversionForm = Yup.object({
    primaryCurrency: Yup.string().trim().required(),
    secondaryCurrency: Yup.string().trim().required(),
    amount: Yup.number()
      .lessThan(wallet[primaryCurrency as keyof ISymbols].balance)
      .moreThan(0)
      .required(),
  });

  const [secondCurrencyAmount, setSecondCurrencyAmount] = useState(rate);

  const formik = useFormik({
    initialValues: {
      primaryCurrency,
      secondaryCurrency,
      amount: 0,
    },
    onSubmit: (values) => {
      store.dispatch(
        walletSlice.actions.incrementByAmount({
          currency: values.secondaryCurrency,
          amount: secondCurrencyAmount,
          transactionType: TransactionType.credit,
        }),
      );

      store.dispatch(
        walletSlice.actions.decrementByAmount({
          currency: values.primaryCurrency,
          amount: values.amount,
          transactionType: TransactionType.debit,
        }),
      );

      toast.success(
        `You've successfully exchanged ${values.amount}
       ${primaryCurrency} to ${secondCurrencyAmount} ${secondaryCurrency}`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        },
      );
    },
    validationSchema: validationConversionForm,
  });

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
              currencies={primaryCurrenciesList}
              onChange={onChangePrimaryCurrency}
            />
            <BalanceText
              balance={wallet[primaryCurrency as keyof ISymbols].balance}
              currency={primaryCurrency}
            />
          </div>
          <div className="w-4/6">
            <input
              className="appearance-none block w-full text-right text-gray-700 py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="number"
              placeholder="0"
              name="amount"
              value={formik.values.amount}
              onChange={(e) => {
                formik.handleChange(e);
                setSecondCurrencyAmount(e.target.value * rate);
              }}
              onBlur={formik.handleBlur}
              onKeyPress={(e) => {
                if (intrudersKeysValues.includes(e?.key)) {
                  e.preventDefault();
                }
              }}
              min="0"
              max="9999"
            />
            {formik.errors.amount ? (
              <div className="text-red-500">{formik.errors.amount}</div>
            ) : null}
          </div>
        </div>
        <FontAwesomeIcon
          id="arrow-exchange"
          icon={faArrowCircleDown}
          size="lg"
          className="text-blue-600 self-center"
        />
        <div className="flex flex-row bg-white py-2 my-2 rounded">
          <div className="relative w-3/6">
            {/*
              For secondary currency selection
              */}
            <SelectCurrency
              currencies={secondaryCurrenciesList}
              onChange={onChangeSecondCurrency}
            />
            <BalanceText
              balance={wallet[secondaryCurrency as keyof ISymbols].balance}
              currency={secondaryCurrency}
            />
          </div>
          <div className="w-4/6">
            <input
              className="appearance-none block w-full text-right text-gray-700 py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="number"
              name="secondaryCurrency"
              value={secondCurrencyAmount}
            />
          </div>
        </div>
        <div className="flex flex-row bg-white py-2 mt-10 rounded">
          <Rate
            primaryCurrency={primaryCurrency}
            secondaryCurrency={secondaryCurrency}
            rate={rate}
            isLoading={isLoading}
          />
        </div>
        <div className="flex flex-row py-2 mt-6 rounded justify-center">
          <button
            type="submit"
            className="bg-blue-600 rounded-lg py-3 text-white px-16 font-semibold shadow-md shadow-blue-500/50 md:px-40 lg:px-36"
          >
            Exchange money
          </button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default ConversionForm;
