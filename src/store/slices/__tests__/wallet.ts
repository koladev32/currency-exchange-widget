import reducer, { decrementByAmount, incrementByAmount } from "../wallet";
import WALLET_MOCK from "../../../mock/wallet";
import { TransactionType } from "../../../enums/transactions";

test("should return initial state", () => {
  expect(reducer(undefined, {})).toEqual(
    WALLET_MOCK,
  );
});

test("should increment EUR balance", () => {
  const previousState = JSON.parse(JSON.stringify(WALLET_MOCK));
  // Adding 500 to the EUR account to test the incrementByAmount reducer
  const expectedState = JSON.parse(JSON.stringify(WALLET_MOCK));
  expectedState.EUR.balance += 500;

  expect(reducer(previousState, incrementByAmount({ currency: "EUR", amount: 500, transactionType: TransactionType.credit }))).toEqual(
    expectedState,
  );
});

test("should decrement EUR balance", () => {
  const previousState = JSON.parse(JSON.stringify(WALLET_MOCK));
  // Subtracting 500 to the EUR account to test the decrementByAmount reducer
  const expectedState = JSON.parse(JSON.stringify(WALLET_MOCK));
  expectedState.EUR.balance -= 500;

  expect(reducer(previousState, decrementByAmount({ currency: "EUR", amount: 500, transactionType: TransactionType.debit }))).toEqual(
    expectedState,
  );
});
