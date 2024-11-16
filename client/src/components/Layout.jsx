// import Logo from "./../../assets/logo.jpg";

import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

import { FaHouse } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { FaFire } from "react-icons/fa";
import { FaBullhorn } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import { PiWallet } from "react-icons/pi";
// import { FaLuggageCart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import Logo from "./../../assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetProgile, LogOut } from "../../redux/features/auth/auth.action";
import { useEffect, useState } from "react";
const Layout = ({ otherComponent }) => {
  const [showHamMenu, setShowHamMenu] = useState("");

  useEffect(() => {
    async function fetch() {
      dispatch(GetProgile());
    }
    fetch();
  }, []);
  const { loginUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogout = () => {
    // dispatch(LogOut({ navigate }));
    localStorage.clear();
    // localStorage.clear("AUTH-TOKEN-EXPIRE");
    // localStorage.clear("_id");
    navigate("/");
    dispatch(GetProgile());
  };

  // window.addEventListener("beforeunload", function (e) {
  //   e.preventDefault();
  //   e.returnValue = "aru you sure want to closed";
  //   dispatch(GetProgile());
  // });

  return (
    <>
      <button
        className="my-5 mx-8 max-w-max ms-auto block lg:hidden"
        onClick={() => setShowHamMenu("show")}
      >
        <IoMdMenu className=" text-slate-300 text-4xl" />
      </button>
      <section className="flex  bg-[#0e0f12]">
        <div
          className={`bg-[#1a1b1c] w-[310px] h-[100vh] overflow-scroll transition-all flex-shrink-0 p-5 fixed z-10 top-0  lg:relative lg:translate-x-0 ${
            showHamMenu === "show" ? "translate-x-[0]" : "translate-x-[-110%]"
          }`}
        >
          <div className="">
            <button
              className="my-2 mx-4 max-w-max ms-auto block lg:hidden"
              onClick={() => setShowHamMenu("")}
            >
              <RxCross2 className=" text-slate-300 text-2xl" />
            </button>
            <div className="flex justify-center mt-[1rem] mb-[1rem]">
              <img
                src={Logo}
                alt="logo"
                className="w-[80px] h-[80px] object-cover rounded-full "
              />
            </div>
            <p className="text-slate-300 uppercase  text-center font-semibold">
              {/* {loginUser.userName}*/}
              <span>Welcome</span>
              <span className="font-bold bg-green-700 text-[12px] text-slate-300 py-1 px-2 rounded-full ms-1">
                {loginUser?.role === "user" ? "Player" : "Player"}
              </span>
            </p>
            <p className="text-green-700  text-[18px] font-semibold capitalize  text-center">
              charisma future pro Capital Trading
            </p>
          </div>
          <div className="mt-[1.6rem] text-2xl lg:text-lg">
            <Link to="/user-dashboard">
              <p className="flex flex-row my-3 bg-dark-clr  p-[5px] rounded-md">
                <Tooltip title="Home" arrow>
                  <div className="flex  items-center">
                    <FaHouse className="text-slate-300 ms-2 me-1 text-[2.8rem]  rounded-full p-2 " />
                    <p className="text-slate-300">Home</p>
                  </div>
                </Tooltip>
              </p>
            </Link>
            <Link to={"/user-quick-trade"}>
              <p className="flex flex-row my-3 bg-dark-clr p-[5px] rounded-md">
                <Tooltip title="Quick Trade" arrow>
                  <div className="flex items-center">
                    <GoGraph className="text-slate-300 ms-2 me-1 text-[2.8rem]  rounded-full p-2 " />
                    {/* <p className="text-slate-300">Quick Trade</p> */}
                    <p className="text-slate-300">Trade</p>
                  </div>
                </Tooltip>
              </p>
            </Link>
            {/* <Link to={"/user-spot-trade"}>
              <p className="flex flex-row my-3 bg-dark-clr  p-[5px] rounded-md">
                <Tooltip title="Spot Trade" arrow>
                  <div className="flex items-center">
                    <FaFire className="text-slate-300 ms-2 me-1 text-[2.8rem] rounded-full p-2 " />
                    <p className="text-slate-300">Spot Trade</p>
                  </div>
                </Tooltip>
              </p>
            </Link> */}
            <Link to="/user-wallet">
              <p className="flex flex-row my-3 bg-dark-clr  p-[5px] rounded-md">
                <Tooltip title="Wallet" arrow>
                  <div className="flex items-center">
                    <PiWallet className="text-slate-300 ms-2 me-1 text-[2.8rem]  rounded-full p-2 " />
                    <p className="text-slate-300">Wallet</p>
                  </div>
                </Tooltip>
              </p>
            </Link>
            {/* <p className="flex flex-row my-2 border py-1">
            <Tooltip title="Order" arrow>
              <div className="flex gap-1">
                <FaLuggageCart className="text-[green] mx-2 text-[3rem] border bg-white rounded-full p-2 " />
                <p className="text-[black] mt-3">Order</p>
              </div>
            </Tooltip>
          </p> */}
            <Link to="/user-announcement">
              <p className="flex flex-row my-3 bg-dark-clr  p-[5px] rounded-md">
                <Tooltip title="Announcement Center" arrow>
                  <div className="flex items-center">
                    {" "}
                    <FaBullhorn className="text-slate-300 ms-2 me-1 text-[2.8rem]  rounded-full p-2 " />
                    <p className="text-slate-300">Announcement</p>
                  </div>
                </Tooltip>
              </p>
            </Link>{" "}
          </div>
          <div className="mt-[7rem] text-2xl lg:text-lg">
            <Link to="/user-history">
              <p className="flex flex-row my-3 bg-dark-clr  p-[5px] rounded-md">
                <Tooltip title="History" arrow>
                  <div className="flex gap-1 items-center">
                    <FaHistory className="text-slate-300 ms-2 me-1 text-[2.8rem]  rounded-full p-2 " />
                    <p className="text-slate-300">History</p>
                  </div>
                </Tooltip>
              </p>
            </Link>
            <Link to={"/user-address-management"}>
              <p className="flex flex-row my-3 bg-dark-clr  p-[5px] rounded-md">
                <Tooltip title="User" arrow>
                  <div className="flex items-center">
                    {" "}
                    <FaRegUserCircle className="text-slate-300 ms-2 me-1 text-[2.8rem] rounded-full p-2 " />
                    <p className="text-slate-300">Setting</p>
                  </div>
                </Tooltip>
              </p>
            </Link>{" "}
            <div
              onClick={userLogout}
              className="flex gap-1 items-center w-full"
            >
              <p className="flex flex-row  my-3 items-center cursor-pointer bg-dark-clr p-[5px] rounded-md w-full">
                <Tooltip title="Logout" arrow>
                  <IoExitOutline className="text-slate-300 ms-2 me-1 text-[2.8rem]  rounded-full p-2 " />
                </Tooltip>
                <p className="text-slate-300">Logout</p>
              </p>
            </div>
          </div>
          <p className="text-left px-2 mt-6  text-slate-300 text-xl">
            status: <span className="font-bold  text-[green] ">active</span>
          </p>
        </div>
        <div className="scrollBar text-black pt-5 mx-auto max-h-[100vh]">
          {otherComponent}
        </div>
      </section>
    </>
  );
};

export default Layout;
