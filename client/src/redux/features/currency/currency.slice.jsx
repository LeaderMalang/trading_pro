import { createSlice } from "@reduxjs/toolkit";
import { AddCurrency, getCurrency } from "./currency.action";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currency: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrency.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrency.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currency = payload?.data;
      })
      .addCase(getCurrency.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(AddCurrency.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddCurrency.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.currency = payload?.data;
      })
      .addCase(AddCurrency.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const currencyReducer = currencySlice.reducer;
