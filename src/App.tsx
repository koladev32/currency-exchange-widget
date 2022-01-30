import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExchangeForm from "./components/ExchangeForm";

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col w-5/6 h-10/12 p-2 lg:h-11/12">
        <h2 className="text-2xl font-semibold text-center">
          Currency exchange
        </h2>
        <p className="text-center">
          Enjoy excellent exchange rates for EUR, USD and GBP
        </p>
        <ExchangeForm />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
