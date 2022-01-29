import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { useSelector } from "react-redux";
import { useFormik, Field, FormikProvider } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetRatesBetweenCurrenciesQuery } from "./services/rates";
import Rate from "./components/Rate";
import SelectCurrency from "./components/SelectCurrency";
import { intrudersKeysValues, ISymbols, projectCurrencies } from "./utils/constants";
import { RootState, store } from "./store";
import BalanceText from "./components/BalanceText";
import { walletSlice } from "./store/slices/wallet";
import { TransactionType } from "./enums/transactions";

function App() {
  const wallet = useSelector((state: RootState) => state.wallet);

  const [rate, setRate] = useState(0);
  const [primaryCurrency, setPrimaryCurrency] = useState("EUR");

  const primaryCurrenciesList = [...projectCurrencies];
  const [secondaryCurrenciesList, setSecondaryCurrenciesList] = useState(
    [...primaryCurrenciesList].filter(
      (value) => value !== primaryCurrency,
    ),
  );

  const [secondaryCurrency, setSecondaryCurrency] = useState(secondaryCurrenciesList[0]);
  const [secondCurrencyAmount, setSecondCurrencyAmount] = useState(rate);

  const validationConversionForm = Yup.object({
    primaryCurrency: Yup.string().trim().required(),
    secondaryCurrency: Yup.string().trim().required(),
    amount: Yup.number().lessThan(wallet[primaryCurrency as keyof ISymbols].balance).moreThan(0).required(),
  });

  const formik = useFormik({
    initialValues: {
      primaryCurrency,
      secondaryCurrency,
      amount: 0,
    },
    onSubmit: (values) => {
      store.dispatch(walletSlice.actions.incrementByAmount(
        {
          currency: values.secondaryCurrency,
          amount: secondCurrencyAmount,
          transactionType: TransactionType.credit,
        },
      ));

      store.dispatch(walletSlice.actions.decrementByAmount(
        {
          currency: values.primaryCurrency,
          amount: values.amount,
          transactionType: TransactionType.debit,
        },
      ));

      toast.success(`You've successfully exchanged ${values.amount}
       ${primaryCurrency} to ${secondCurrencyAmount} ${secondaryCurrency}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    validationSchema: validationConversionForm,
  });

  const { data, isLoading } = useGetRatesBetweenCurrenciesQuery(
    { primaryCurrency, secondaryCurrency },
    {
      pollingInterval: 10000,
    },
  );
  useEffect(() => {
    if (data) {
      setRate(data.rates[secondaryCurrency]);
    }
    // Refreshing the secondaryCurrency value because it directly points to a reference

    setSecondaryCurrenciesList([...primaryCurrenciesList].filter(
      (value) => value !== primaryCurrency,
    ));
    setSecondaryCurrency(secondaryCurrenciesList[0]);

    formik.values.primaryCurrency = primaryCurrency;
    formik.values.secondaryCurrency = secondaryCurrency;
  }, [data, secondaryCurrency, primaryCurrency]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col w-5/6 h-10/12 p-2 lg:h-11/12">
        <h2 className="text-2xl font-semibold text-center">
          Currency exchange
        </h2>
        <p className="text-lg text-center">
          Enjoy excellent exchange rates for EUR, USD and GBPs
        </p>
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
                  onChange={setPrimaryCurrency}
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
                  onChange={setSecondaryCurrency}
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
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
