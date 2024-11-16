import { createSlice } from "@reduxjs/toolkit";
import {
  AddNetwork,
  DeleteNetwork,
  getAllNetwork,
  UpdateWalletAddress,
} from "./network.action";

const networkSlice = createSlice({
  name: "network",
  initialState: {
    network: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNetwork.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllNetwork.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.network = payload?.data;
      })
      .addCase(getAllNetwork.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(AddNetwork.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddNetwork.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.network = payload?.data;
      })
      .addCase(AddNetwork.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(DeleteNetwork.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteNetwork.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.network = payload?.data;
      })
      .addCase(DeleteNetwork.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(UpdateWalletAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateWalletAddress.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.network = payload?.data;
      })
      .addCase(UpdateWalletAddress.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const networkReducer = networkSlice.reducer;
