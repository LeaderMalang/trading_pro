import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";
import { toast } from "react-hot-toast";

export const TradeNow = createAsyncThunk("user/trade", async (payload) => {
  try {
    const { data } = await api.post(
      "trade/trade-now",
      {
        ...payload,
      },

      {
        headers: {
          // "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
        },
      }
    );
    console.log({ data });
    if (data?.status == 200) {
      toast.success(data.data?.msg);
    } else {
      toast.info(data.msg?.msg);
      window.alert(data.msg?.msg);
    }

    return data?.data?.data;
  } catch (error) {
    console.error(error);
  }
});

export const GetAllTrades = createAsyncThunk(
  "trade/get-all-trades",
  async () => {
    try {
      const { data } = await api.get("trade/get-all-trades", {
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

export const GetTradeByUser = createAsyncThunk(
  "trade/get-all-trades-by-user",
  async () => {
    try {
      const { data } = await api.get("trade/get-tradesby-user", {
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

export const UpdateTradeAmount = createAsyncThunk(
  "admin/trade/upgrade-buy-trade",
  async (payload) => {
    try {
      const { data } = await api.post("trade/upgrade-buy-trade", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
        },
      });

      if (data?.status === 200) {
        toast.success("Coin Verify Successfully");
      } else {
        toast.info(data.msg);
      }
      console.log(data.data.data);
      return data.data?.data;
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

export const FilterAllHistory = createAsyncThunk(
  "history/filter-history",
  async (payload) => {
    try {
      const { data } = await api.get(`trade/filter-history/${payload}`, {
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
export const UserTransactionHistory = createAsyncThunk(
  "trade/get-user-history",
  async () => {
    try {
      const { data } = await api.get(`trade/get-user-history`, {
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

export const GetTradeById = createAsyncThunk("trade/user", async (payload) => {
  try {
    console.log(payload);
    const { data } = await api.get(`trade/user/${payload}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
});
