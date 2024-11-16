import { createSlice } from "@reduxjs/toolkit";
// import {
//   GetAllDepositeCoin,
//   GetAllDepositeCurrencyBill,
//   VerifyDepositeCoin,
//   WithdrawlCoin,
// } from "./withdrawl.action";
import {
  FilterAllHistory,
  GetAllTrades,
  GetTradeById,
  GetTradeByUser,
  TradeNow,
  UpdateTradeAmount,
  UserTransactionHistory,
} from "./trade.action";

const tradelSlice = createSlice({
  name: "trade",
  initialState: {
    trade: [],
    alltrades: [],
    userTrades: [],
    history: [],
    singleTrade: {},
    isLoading: false,
    lines: [],
    textBoxes: [],
  },
  reducers: {
    addLine(state, action) {
      state.lines.push(action.payload);
    },
    addTextBox(state, action) {
      state.textBoxes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(TradeNow.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(TradeNow.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userTrades = payload;
      })
      .addCase(TradeNow.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllTrades.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllTrades.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.alltrades = payload;
      })
      .addCase(GetAllTrades.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetTradeByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetTradeByUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userTrades = payload;
      })
      .addCase(GetTradeByUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(UpdateTradeAmount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateTradeAmount.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.alltrades = payload;
      })
      .addCase(UpdateTradeAmount.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(FilterAllHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FilterAllHistory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.history = payload;
      })
      .addCase(FilterAllHistory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(UserTransactionHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UserTransactionHistory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.history = payload;
      })
      .addCase(UserTransactionHistory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetTradeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetTradeById.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.singleTrade = payload;
      })
      .addCase(GetTradeById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const tradeReducer = tradelSlice.reducer;
export const { addLine, addTextBox } = tradelSlice.actions;
