import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiURL } from "../utils/api";

export const ratesApi = createApi({
  reducerPath: "ratesApi",
  baseQuery: fetchBaseQuery({ baseUrl: ApiURL }),
  endpoints: (builder) => ({
    getRatesBetweenCurrencies: builder.query({
      query: (arg:{
        primaryCurrency: string,
        secondaryCurrency: string
      }) => `latest?base=${arg.primaryCurrency}&symbols=${arg.secondaryCurrency}`,
    }),
  }),
});

export const { useGetRatesBetweenCurrenciesQuery } = ratesApi;
