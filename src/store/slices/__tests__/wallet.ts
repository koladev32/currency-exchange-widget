import reducer, { incrementByAmount, decrementByAmount } from "../wallet";
import WALLET_MOCK from "../../../mock/wallet";

test("should return initial state", () => {
  expect(reducer(undefined, {})).toEqual(
    WALLET_MOCK,
  );
});
