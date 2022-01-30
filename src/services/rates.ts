import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiURL } from "../utils/api";

export const ratesApi = createApi({
  reducerPath: "ratesApi",
  baseQuery: fetchBaseQuery({ baseUrl: ApiURL }),
  endpoints: (builder) => ({
    getRatesBetweenCurrencies: builder.query({
      query: (arg:{
        baseCurrency: string,
        targetCurrency: string
      }) => `latest?base=${arg.baseCurrency}&symbols=${arg.targetCurrency}`,
    }),
  }),
});

export const { useGetRatesBetweenCurrenciesQuery } = ratesApi;
