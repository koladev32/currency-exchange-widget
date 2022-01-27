import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { walletSlice } from "../store/slices/wallet";

function render(
  ui: React.ReactNode,
  {
    preloadedState,
    store = configureStore({ reducer: { wallet: walletSlice.reducer }, preloadedState }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(
ui as React.ReactElement<any, string | React.JSXElementConstructor<any>>,
{ wrapper: Wrapper, ...renderOptions },
  );
}

export * from "@testing-library/react";
export { render };
