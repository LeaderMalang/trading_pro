import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";
import { toast } from "react-toastify";

export const getCurrency = createAsyncThunk(
  "currency/get-currency",
  async () => {
    try {
      const response = await api.get("currency/get-currencys", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const AddCurrency = createAsyncThunk(
  "currency/post-currency",
  async (payload) => {
    try {
      const data = await api.post(
        "currency/add-currency",
        { ...payload },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
          },
        }
      );

      if (data.status == 201) {
        toast.success("Currency Added Successfully!");
      } else {
        toast.error(data?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }
);
