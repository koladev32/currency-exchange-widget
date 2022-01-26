import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col w-5/6 h-10/12 p-2 lg:h-11/12">
        <h2 className="text-2xl font-semibold text-center">Currency exchange</h2>
        <p className="text-lg text-center">
          Enjoy excellent exchange rates for EUR, USD and GBP
        </p>
        <form className="w-full flex flex-col h-2/3 bg-stone-50 rounded p-2 md:w-9/12 md:self-center md:p-4 lg:w-5/12 lg:h-10/12">
          <div className="flex flex-row bg-white py-2 my-2 rounded">
            <div className="relative w-3/6">
              <select
                className="block appearance-none w-3/4 ml-2 hover:bg-stone-50 bg-white text-gray-700 py-3 px-4 pr-8 focus:outline-none focus:bg-white"
                id="grid-state"
              >
                <option>
                  🇪🇺 EUR
                </option>
                <option>🇺🇸 USD</option>
                <option>🇬🇧 GBP</option>
              </select>
            </div>
            <div className="w-4/6">
              <input
                className="appearance-none block w-full text-right text-gray-700 py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="number"
                placeholder="0"
                name="primaryCurrency"
              />
            </div>
          </div>
          <FontAwesomeIcon id="arrow-exchange" icon={faArrowCircleDown} size="lg" className="text-blue-600 self-center" />
          <div className="flex flex-row bg-white py-2 my-2 rounded">
            <div className="relative w-3/6">
              <select
                className="block appearance-none bg-white ml-2 w-full hover:bg-stone-50 text-gray-700 py-3 px-4 pr-8 focus:outline-none focus:bg-white"
                id="grid-state"
              >
                <option>
                  🇪🇺 EUR
                </option>
                <option>🇺🇸 USD</option>
                <option>🇬🇧 GBP</option>
              </select>
            </div>
            <div className="w-4/6">
              <input
                className="appearance-none block w-full text-right text-gray-700 py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="number"
                placeholder="0"
                name="secondaryCurrency"
              />
            </div>
          </div>
          <div className="flex flex-row bg-white py-2 mt-10 rounded">
            <div className="flex flex-row justify-between w-full p-4 font-semibold">
              <p className="text-xs">
                £1 = €1.1946
              </p>
              <p className="text-xs">
                Our current rate
              </p>
            </div>
          </div>
          <div className="flex flex-row py-2 mt-6 rounded justify-center">
            <button type="submit" className="bg-blue-600 rounded-lg py-3 text-white px-16 font-semibold shadow-md shadow-blue-500/50 md:px-40 lg:px-36">
              Exchange money
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
