import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";
import { toast } from "react-toastify";

export const DepositeCoin = createAsyncThunk(
  "user/deposite/deposite-coin",
  async (payload) => {
    console.log(payload, payload[0].value);
    try {
      const { data } = await api.post(
        "deposite/deposite-coin",

        {
          currencyName: payload[0].value,
          recharge_network_id: payload[1].value,
          recharge_amount: payload[2].value,
          voucher_img: payload[3].value,
        },

        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
          },
        }
      );
      if (data?.status == 200) {
        toast.success(data.data?.msg);
      } else {
        toast.info(data.msg);
      }

      return data.data;
    } catch (error) {
      console.error(error);
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
  " deposite/verify-coin",
  async (payload) => {
    console.log(payload);
    try {
      const { data } = await api.post("deposite/verify-coin", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
        },
      });
      console.log({ data });
      if (data?.status === 200) {
        toast.success(data?.data?.msg);
      }
      return data.data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const GetUserDepositCoin = createAsyncThunk(
  "deposite/user-coin",
  async () => {
    try {
      const { data } = await api.get("deposite/user-coin", {
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

//need to delete
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
