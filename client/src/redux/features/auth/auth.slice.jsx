import { createSlice } from "@reduxjs/toolkit";
import {
  ChangePassword,
  FilterUser,
  GetAllUser,
  GetAllUserKYCDocs,
  GetProgile,
  GetSingleDocs,
  LoginAuth,
  LogOut,
  RegisterAuth,
  UpdateUserBalance,
  VerifyProfile,
  VerifyUserKYC,
} from "./auth.action";

const auhtSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("AUTH-TOKEN") || null,
    user: [],
    docs: {},
    KYCDocs: [],
    loginUser: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isLoading = false;
      localStorage.removeItem("AUTH-TOKEN");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginAuth.fulfilled, (state, { payload }) => {
        console.log({ payload });
        state.isLoading = false;
        state.token = payload.data?.token;
        state.expireIn = payload.data.expire_in;
        state.user = payload.data.user;
        state.role = payload.data.user.role;
        localStorage.setItem("AUTH-TOKEN", payload.data.token);
        localStorage.setItem("AUTH-TOKEN-EXPIRE", payload.data.expire_in);
        localStorage.setItem("CURRENT_USER", payload.data.user.role);
        // localStorage.setItem("_id", payload.data.user._id);
      })
      .addCase(LoginAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(RegisterAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegisterAuth.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(RegisterAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(GetProgile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetProgile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.loginUser = payload;
      })
      .addCase(GetSingleDocs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetSingleDocs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.docs = { ...payload };
      })
      .addCase(GetSingleDocs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(GetAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(GetAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(ChangePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ChangePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(ChangePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(LogOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LogOut.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(LogOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(VerifyProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(VerifyProfile.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(VerifyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(VerifyUserKYC.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(VerifyUserKYC.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.KYCDocs = payload;
      })
      .addCase(VerifyUserKYC.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(GetAllUserKYCDocs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllUserKYCDocs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.KYCDocs = payload;
      })
      .addCase(GetAllUserKYCDocs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(UpdateUserBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateUserBalance.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(UpdateUserBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(FilterUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FilterUser.fulfilled, (state,  {payload} ) => {
        console.log(payload.data)
        state.isLoading = false;
        state.user = payload.data;
      })
      .addCase(FilterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { logout } = auhtSlice.actions;
export const authReducer = auhtSlice.reducer;
