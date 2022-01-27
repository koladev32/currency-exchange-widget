import React from "react";
import { render, screen } from "./utils/test-utils";
import App from "./App";
// so we can import fireEvent and screen here as well

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Currency exchange/i);
  expect(linkElement).toBeInTheDocument();
});
