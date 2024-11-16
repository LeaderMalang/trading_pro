import { createSlice } from "@reduxjs/toolkit";
import {
  GetAllDepositeCoin,
  GetAllDepositeCurrencyBill,
  GetAllWithdrawlCoin,
  GetUserWithdrawlCoin,
  ReleaseWithdrawlAmount,
  VerifyDepositeCoin,
  WithdrawlCoin,
} from "./withdrawl.action";

const withdrawlSlice = createSlice({
  name: "withdrwal",
  initialState: {
    withdrwal: [],
    userWithdrawls: [],
    allwithdrwalCoin: [],
    isLoading: false,
    allwithdrwalCoinCurrencyBill: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(WithdrawlCoin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(WithdrawlCoin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userWithdrawls = payload.data;
      })
      .addCase(WithdrawlCoin.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllWithdrawlCoin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllWithdrawlCoin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.withdrwal = payload;
      })
      .addCase(GetAllWithdrawlCoin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(ReleaseWithdrawlAmount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ReleaseWithdrawlAmount.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.withdrwal = payload.data;
      })
      .addCase(ReleaseWithdrawlAmount.rejected, (state) => {
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
      .addCase(GetUserWithdrawlCoin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetUserWithdrawlCoin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userWithdrawls = payload;
      })
      .addCase(GetUserWithdrawlCoin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(VerifyDepositeCoin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(VerifyDepositeCoin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.allDepositeCoin = payload;
      })
      .addCase(VerifyDepositeCoin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetAllDepositeCurrencyBill.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllDepositeCurrencyBill.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allDepositeCoinCurrencyBill = payload;
      })
      .addCase(GetAllDepositeCurrencyBill.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const withdrawlReducer = withdrawlSlice.reducer;
