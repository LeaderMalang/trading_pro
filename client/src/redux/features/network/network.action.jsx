import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";
import { toast } from "react-toastify";

export const getAllNetwork = createAsyncThunk("/get/network", async () => {
  try {
    const response = await api.get("network/get-all-neworks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const AddNetwork = createAsyncThunk("/post/network", async (payload) => {
  try {
    const data = await api.post(
      "network/add-network",
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    if (data.status == 200) {
      toast.success(data.data.msg);
    } else {
      toast.error(data.msg);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const DeleteNetwork = createAsyncThunk(
  "network/delete-network",
  async (payload) => {
    try {
      const data = await api.delete("network/delete-nework", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
        },
      });
      console.log(data);
      if (data.status == 200) {
        toast.success(data?.data?.data?.msg);
      } else {
        toast.error("Network Error");
      }
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const UpdateWalletAddress = createAsyncThunk(
  "/patch/network/wallet-address",
  async (payload) => {
    try {
      const data = await api.patch(
        "network/update-wallet-address",
        { ...payload },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
            // "content-type": "multipart/form-data",
          },
        }
      );
      if (data.status == 200) {
        toast.success(data?.data?.data?.msg);
      } else {
        toast.error(data.msg);
      }
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
