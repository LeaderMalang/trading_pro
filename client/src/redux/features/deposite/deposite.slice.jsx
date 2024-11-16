import { createSlice } from "@reduxjs/toolkit";
import {
  DepositeCoin,
  GetAllDepositeCoin,
  GetUserDepositCoin,
  VerifyDepositeCoin,
} from "./deposite.action";

const depositeSlice = createSlice({
  name: "deposite",
  initialState: {
    userDeposite: [],
    allDepositeCoin: [],
    isLoading: false,
    allDepositeCoinCurrencyBill: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DepositeCoin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DepositeCoin.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.userDeposite = payload.data;
      })
      .addCase(DepositeCoin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetAllDepositeCoin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllDepositeCoin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allDepositeCoin = payload;
      })
      .addCase(GetAllDepositeCoin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(VerifyDepositeCoin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(VerifyDepositeCoin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allDepositeCoin = payload;
      })
      .addCase(VerifyDepositeCoin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetUserDepositCoin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetUserDepositCoin.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.userDeposite = payload;
      })
      .addCase(GetUserDepositCoin.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const depositeReducer = depositeSlice.reducer;
