// import Logo from "./../../assets/logo.jpg";
import { FaHouse } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { FaUserCheck } from "react-icons/fa";
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import { IoExitOutline } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { GetProgile } from "../redux/features/auth/auth.action";
import { Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { MdNetworkPing, MdVerifiedUser } from "react-icons/md";
import { PiHandWithdrawLight } from "react-icons/pi";
import { TbCoinFilled } from "react-icons/tb";

export function AdminSideBar() {
  // props are setShowSideBar
  const userLogout = () => {
    // dispatch(LogOut({ navigate }));
    localStorage.clear();
    dispatch(GetProgile());
    navigate("/");
  };
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <section className="flex  bg-white h-fit">
        {!collapsed ? (
          <div className="flex-row justify-evenly bg-[white] w-[220px] h-screen  fixed sm:relative    overflow-auto z-19">
            <Tooltip title="Collapse Sidebar " arrow>
              <p
                className="flex flex-row-reverse my-1 border top-0"
                onClick={() => {
                  setCollapsed((currentValue) => !currentValue);
                }}
              >
                <SidebarCloseIcon
                  className="text-[green]   border bg-white rounded-sm "
                  size={35}
                />
              </p>
            </Tooltip>
            <div>
              <Tooltip title="Home" arrow>
                <Link to="/admin-dashboard">
                  <p className="flex flex-row my-1 border  p-[2px] ">
                    <div className="flex gap-1 items-center">
                      <FaHouse className="text-[green] mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
                      <p className="text-[black]   ">Home</p>
                    </div>
                  </p>
                </Link>
              </Tooltip>
              <Tooltip title="Quick Trade" arrow>
                <Link to={"/admin-get-all-user"}>
                  <p className="flex flex-row my-1 border py-1 ">
                    <div className="flex gap-1 items-center">
                      <FaUserCheck className="text-[green] mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
                      <p className="text-[black]   ">User</p>
                    </div>
                  </p>
                </Link>
              </Tooltip>
              <Tooltip title="Quick Trade" arrow>
                <Link to={"/admin-netwok"}>
                  <p className="flex flex-row my-1 border py-1 ">
                    <div className="flex gap-1 items-center">
                      <MdNetworkPing className="text-[green] mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
                      <p className="text-[black]   ">Add Network</p>
                    </div>
                  </p>
                </Link>
              </Tooltip>
              <Tooltip title="Users KYCs" arrow>
                <Link to={"/admin-user-kyc"}>
                  <p className="flex flex-row my-1 border py-1 ">
                    <div className="flex gap-1 items-center">
                      <MdVerifiedUser className="text-[green] mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
                      <p className="text-[black]   ">User KYCs</p>
                    </div>
                  </p>
                </Link>
              </Tooltip>

              <Tooltip title="Users Withdrawls" arrow>
                <Link to={"/admin-user-withdrawl"}>
                  <p className="flex flex-row my-1 border py-1 ">
                    <div className="flex gap-1 items-center">
                      <PiHandWithdrawLight className="text-[green] mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
                      <p className="text-[black]   ">User Withdrawls</p>
                    </div>
                  </p>
                </Link>
              </Tooltip>

              <Tooltip title="Users Coins" arrow>
                <Link to={"/user-coins"}>
                  <p className="flex flex-row my-1 border py-1 ">
                    <div className="flex gap-1 items-center">
                      <TbCoinFilled className="text-[green] mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
                      <p className="text-[black]   ">User Coins</p>
                    </div>
                  </p>
                </Link>
              </Tooltip>

              <Tooltip title="Users Trades" arrow>
                <Link to={"/user-trades"}>
                  <p className="flex flex-row my-1 border py-1 ">
                    <div className="flex gap-1 items-center">
                      <GoGraph className="text-[green] mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
                      <p className="text-[black]   ">User Trdade</p>
                    </div>
                  </p>
                </Link>
              </Tooltip>
            </div>
            <div className="mt-[0.5rem] ">
              <Tooltip title="Logout" arrow>
                <p
                  className="flex flex-row border my-1 py-1"
                  onClick={userLogout}
                >
                  <div className="flex gap-1 items-center">
                    <IoExitOutline className="text-green-700 mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
                    <p className="text-[black] ">Exit</p>
                  </div>
                </p>
              </Tooltip>
            </div>
            <p className="text-left px-2    text-[black]">
              status:-
              <span className="font-bold  text-green-700 ">active</span>
            </p>
          </div>
        ) : (
          //  collapsed SideBar
          <div className="flex-row justify-evenly bg-[white] w-fit h-screen  sm:relative    overflow-auto ">
            <Tooltip title="Collapse Sidebar " arrow placement="right">
              <p
                className="flex flex-row my-1 border top-0"
                onClick={() => {
                  setCollapsed((currentValue) => !currentValue);
                }}
              >
                <SidebarOpenIcon
                  className="text-[green]   border bg-white rounded-sm "
                  size={35}
                />
              </p>
            </Tooltip>
            <div>
              <Tooltip title="Home" arrow placement="right">
                <Link to="/admin-dashboard">
                  <p className="flex flex-row my-1 border   ">
                    <FaHouse className="text-[green] mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
                  </p>
                </Link>
              </Tooltip>
              <Tooltip title="Users" arrow placement="right">
                <Link to={"/admin-get-all-user"}>
                  <p className="flex flex-row my-1 border py-1 ">
                    <FaUserCheck className="text-[green] mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
                  </p>
                </Link>
              </Tooltip>
              <Tooltip title="Networks" arrow placement="right">
                <Link to={"/admin-netwok"}>
                  <p className="flex flex-row my-1 border py-1 ">
                    <MdNetworkPing className="text-[green] mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
                  </p>
                </Link>
              </Tooltip>
              <Tooltip title="Users KYCs" arrow placement="right">
                <Link to={"/admin-user-kyc"}>
                  <p className="flex flex-row my-1 border py-1 ">
                    <MdVerifiedUser className="text-[green] mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
                  </p>
                </Link>
              </Tooltip>
              <Tooltip title="Users Withdrawls" arrow placement="right">
                <Link to={"/admin-user-withdrawl"}>
                  <p className="flex flex-row my-1 border py-1 ">
                    <PiHandWithdrawLight className="text-[green] mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
                  </p>
                </Link>
              </Tooltip>

              <Tooltip title="Users Coins" arrow placement="right">
                <Link to={"/user-coins"}>
                  <p className="flex flex-row my-1 border py-1 ">
                    <TbCoinFilled className="text-[green] mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
                  </p>
                </Link>
              </Tooltip>

              <Tooltip title="Users trades" arrow placement="right">
                <Link to={"/user-trades"}>
                  <p className="flex flex-row my-1 border py-1 ">
                    <GoGraph className="text-[green] mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
                  </p>
                </Link>
              </Tooltip>
            </div>
            <div className="mt-[0.5rem] ">
              <Tooltip title="Logout" arrow placement="right">
                <p
                  className="flex flex-row border my-1 py-1"
                  onClick={userLogout}
                >
                  <IoExitOutline className="text-green-700 mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
                </p>
              </Tooltip>
            </div>

            <Tooltip title="Active Status" arrow placement="right">
              <p className="flex flex-row border my-1 py-1">
                <FaCircle className="text-green-700 mx-1 text-[2.3rem] border bg-white rounded-full p-2 " />
              </p>
            </Tooltip>
          </div>
        )}
      </section>
    </>
  );
}
