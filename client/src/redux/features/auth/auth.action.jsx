import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";
import { toast } from "react-toastify";
export const LoginAuth = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate }) => {
    try {
      const { data } = await api.post("auth/login", {
        account: email,
        password,
      });
      console.log({ data }, data?.data?.user?.role);
      if (data?.status == 200) {
        toast.success(data.msg);
        localStorage.setItem("AUTH-TOKEN", data?.data?.token);
        if (data?.data?.user?.role == "user") {
          navigate("/trade");
        } else if (data?.data?.user?.role == "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
        return data;
      } else {
        toast.error(data.msg);
      }
      console.log(data.data);
      data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const RegisterAuth = createAsyncThunk(
  "auth/register",
  async ({ data, navigate }) => {
    try {
      const response = await api.post("auth/register", {
        account: data.email,
        password: data.password,
        fullName: data.nickName,
        country: data?.country.label,
      });
      if (response.data.status === 200) {
        toast.success("User Register Successfully!");
        navigate("/login");
      } else {
        toast.info(response.data.msg);
      }
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(error);
      throw error;
    }
  }
);

export const GetProgile = createAsyncThunk("auth/get/profile", async () => {
  try {
    const { data } = await api.get("auth/get-profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
      },
    });

    return data.data;
  } catch (error) {
    console.log(error);
  }
});

export const GetAllUser = createAsyncThunk("auth/get-all-user", async () => {
  try {
    const data = await api.get("auth/get-all-users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
      },
    });
    return data.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const ChangePassword = createAsyncThunk(
  "auth/change/password",
  async (payload, navigate) => {
    console.log({ payload, navigate });
    try {
      const { data } = await api.post(
        "auth/change-password",
        {
          currentPassword: payload.oldpassword,
          newPassword: payload.newpassword,
          comfirmPassword: payload.confirmpassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
          },
        }
      );
      if (data.status == 200) {
        setTimeout(async () => {
          navigate("/");
        }, 100);
        toast.success(data.data?.msg);
      } else {
        toast.info(data?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }
);
// update kyc
export const VerifyProfile = createAsyncThunk(
  "auth/verify-profile",
  async (payload) => {
    console.log({ payload });
    try {
      const { data } = await api.post(
        "auth/verify-profile",
        {
          front_img: payload.document_front[0],
          back_img: payload.document_back[0],
          verification_type: payload.document_type,
        },
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
          },
        }
      );
      if (data.status === 200) {
        toast.success(data?.data.msg);
      } else {
        toast.info(data?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const VerifyUserKYC = createAsyncThunk(
  "auth/verify-kyc",
  async (payload) => {
    console.log({ payload });
    try {
      const { data } = await api.post("auth/verify-kyc", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
        },
      });
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

export const GetSingleDocs = createAsyncThunk(
  "auth/get-single/doc",
  async () => {
    try {
      const { data } = await api.get("auth/get-single-docs", {
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

export const GetAllUserKYCDocs = createAsyncThunk(
  "auth/get-all-users-kyc-docs",
  async () => {
    try {
      const data = await api.get("auth/get-all-users-kyc-docs", {
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

export const UpdateUserBalance = createAsyncThunk(
  "auth/update-user-balance",
  async (payload) => {
    console.log({ payload });
    try {
      const { data } = await api.post("auth/update-user-balance", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
        },
      });
      if (data?.status === 200) {
        toast.success(data?.data.msg);
      } else {
        toast.info(data?.msg);
      }
      console.log(data);
      return data.data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const LogOut = createAsyncThunk(
  "auth/user-logout",
  async ({ navigate }) => {
    try {
      const { data } = await api.get("auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
        },
      });
      console.log(data, "logout");
      if (data.status == 200) {
        localStorage.removeItem("CURRENT_USER");
        localStorage.removeItem("AUTH-TOKEN");
        localStorage.removeItem("AUTH-TOKEN-EXPIRE");
        toast.success(data.msg);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const FilterUser = createAsyncThunk(
  "auth/filter-user",
  async ({ selectType, searchFor }) => {
    console.log(selectType, searchFor);
    try {
      const data = await api.get(
        `auth/filter/user?${selectType}=${searchFor}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AUTH-TOKEN")}`,
          },
        }
      );
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
