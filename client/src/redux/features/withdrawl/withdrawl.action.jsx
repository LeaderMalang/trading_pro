import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";
import { toast } from "react-toastify";

export const WithdrawlCoin = createAsyncThunk(
  "user/withdrawl/withdrawl-coin",
  async (payload) => {
    try {
      console.log(payload);
      const { data } = await api.post(
        "withdrwal/credit-coin",
        //curencyId, networkId, wallet_address, coin
        {
          curencyId: payload?.select_currency,
          networkId: payload?.select_network,
          wallet_address: payload?.walletAddress,
          coin: +payload?.withdraw_amt,
        },

        {
          headers: {
            // "content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
          },
        }
      );
      console.log(data);
      if (data?.status == 200) {
        toast.success(data.data?.msg);
        // window.alert(data.data?.msg);
      } else if (data?.status == 404) {
        toast.info(data.msg.msg);
        window.alert(data.msg.msg);
      } else {
        console.log("2");
        toast.info(data.error);
        window.alert(data.error);
      }

      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const GetAllWithdrawlCoin = createAsyncThunk(
  " withdrwal/all-credit-coin",
  async () => {
    try {
      const { data } = await api.get("/withdrwal/all-credit-coin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
        },
      });
      console.log(data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const ReleaseWithdrawlAmount = createAsyncThunk(
  "auth/credit-coin-release",
  async (payload) => {
    console.log({ payload });
    try {
      const { data } = await api.post(
        "withdrwal/credit-coin-release",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
          },
        }
      );
      console.log({ data });
      if (data?.status === 200) {
        toast.success(data?.data.msg);
      } else {
        toast.info(data?.msg);
      }
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const GetUserWithdrawlCoin = createAsyncThunk(
  "withdrwal/credit-coin-user",
  async () => {
    try {
      const { data } = await api.get("withdrwal/credit-coin-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
        },
      });
      console.log({ data });
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const GetAllDepositeCoin = createAsyncThunk(
  "user/deposite/get-all-deposite-coin",
  async () => {
    try {
      const { data } = await api.get("deposite/get-all-deposite-coin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
        },
      });
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const VerifyDepositeCoin = createAsyncThunk(
  "user/deposite/verify-coin",
  async (payload) => {
    console.log(payload);
    try {
      const { data } = await api.post(
        "deposite/deposite-coin-verify",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
          },
        }
      );
      if (data?.status === 200) {
        toast.success("Coin Verify Successfully");
      }
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const GetAllDepositeCurrencyBill = createAsyncThunk(
  "deposite/deposite-all-currency-bill",
  async () => {
    try {
      const data = await api.get("deposite/deposite-coin-bills", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
        },
      });
      console.log({ data });
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
