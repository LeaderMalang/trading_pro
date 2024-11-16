import React from "react";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
const UserLayout = ({ children }) => {
  const path = window.location.pathname;
  console.log(path);
  return (
    <div className="h-[100vh]">
      <div className=" flex justify-end gap-10 my-3">
        {/* <Link to={"/user-profile"}>
          <p
            className={`capitalize cursor-pointer ${
              path == "/user-profile" && "text-[green]"
            }`}
          >
            Overview
          </p>
        </Link> */}
        <Link to={"/user-address-management"}>
          <p
            className={`font-medium text-base capitalize cursor-pointer ${
              path == "/user-address-management"
                ? "text-green-700"
                : "text-slate-300"
            }`}
          >
            Address Management
          </p>
        </Link>
        <Link to={"/user-profile-verify"}>
          <p
            className={`font-medium text-base  capitalize cursor-pointer ${
              path == "/user-profile-verify"
                ? "text-green-700"
                : "text-slate-300"
            }`}
          >
            Authentication
          </p>
        </Link>
        <Link to={"/user-change-password"}>
          <p
            className={`font-medium text-base  capitalize cursor-pointer ${
              path == "/user-change-password"
                ? "text-green-700"
                : "text-slate-300"
            }`}
          >
            Change Password
          </p>
        </Link>
        {/* <p
          className="capitalize cursor-pointer
        "
        >
          My Bill
        </p> */}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default UserLayout;
