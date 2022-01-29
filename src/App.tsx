import React, { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetRatesBetweenCurrenciesQuery } from "./services/rates";
import { projectCurrencies } from "./utils/constants";
import ConversionForm from "./components/ConversionForm";

function App() {

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col w-5/6 h-10/12 p-2 lg:h-11/12">
        <h2 className="text-2xl font-semibold text-center">
          Currency exchange
        </h2>
        <p className="text-lg text-center">
          Enjoy excellent exchange rates for EUR, USD and GBPs
        </p>
        <ConversionForm />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
