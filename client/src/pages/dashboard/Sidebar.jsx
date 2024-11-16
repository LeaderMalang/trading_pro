import { RxHamburgerMenu } from "react-icons/rx";
import { FaChartArea } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { SiMoneygram } from "react-icons/si";
import { MdAccountCircle } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { PiHandWithdrawLight } from "react-icons/pi";
import { MdSecurity } from "react-icons/md";
import { FaSquarePlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "@mui/material";
import { MdDashboard } from "react-icons/md";

function Sidebar() {
    const navigate = useNavigate();
    const [toggleSidebar, setToggleSidebar] = useState(true);
    const logout = () => {
        localStorage.clear();
        navigate("/");
        toast.success("User Logout Successfully");
    };
    return (
        <>
            <div className="hidden md:block transition-all w-fit bg-light-bg-clr  rounded-md">
                {toggleSidebar ? (
                    <div className="flex w-20  text-text-clr h-screen  flex-col items-center justify-between p-5 transition-all">
                        <div className="flex gap-8 flex-col">
                            <RxHamburgerMenu
                                className="text-2xl hover:cursor-pointer"
                                onClick={() => setToggleSidebar(!toggleSidebar)}
                            />

                            <Link to="/trade">
                                <Tooltip title="Trade" placement="right">
                                    <span>
                                        <FaChartArea className="text-2xl text-text-clr" />
                                    </span>
                                </Tooltip>
                            </Link>

                            <Link to="/account">
                                <Tooltip title="Account" placement="right">
                                    <span>
                                        <MdAccountCircle className="text-2xl hover:cursor-pointer" />
                                    </span>
                                </Tooltip>
                            </Link>
                            <Link to="/withdraw">
                                <Tooltip title="Withdraw" placement="right">
                                    <span>
                                        <PiHandWithdrawLight className="text-2xl hover:cursor-pointer" />
                                    </span>
                                </Tooltip>
                            </Link>
                            <Link to="/transaction">
                                <Tooltip title="Transaction" placement="right">
                                    <span>
                                        <SiMoneygram className="text-2xl hover:cursor-pointer" />
                                    </span>
                                </Tooltip>
                            </Link>
                            <Link to="/deposit">
                                <Tooltip title="Deposit" placement="right">
                                    <span>
                                        <FaSquarePlus className="text-2xl hover:cursor-pointer" />
                                    </span>
                                </Tooltip>
                            </Link>
                            {/* <Link to="/faq">
                <Tooltip title="Faq" placement="right">
                  <span>
                    <FaQuestionCircle className="text-2xl hover:cursor-pointer" />
                  </span>
                </Tooltip>
              </Link> */}
                        </div>
                        <div className="flex flex-col gap-8 items-center">
                            <Link to="/security">
                                <Tooltip title="Security" placement="right">
                                    <span>
                                        <MdSecurity className="text-2xl hover:cursor-pointer" />
                                    </span>
                                </Tooltip>
                            </Link>
                            <button
                                className="text-center  p-3 text-fnt-b rounded-md font-extrabold bg-danger-clr"
                                onClick={logout}>
                                <IoIosLogOut className="text-2xl hover:cursor-pointer mx-auto" />
                            </button>
                            {/* <Link
                to="/deposit"
                className="text-center border border-1 border-gray-600 p-3 text-fnt-b rounded-md font-extrabold"
              >
                Join Us
              </Link> */}
                            {/* <Link
                to="/help"
                className="text-center border border-1 border-gray-600 p-3 text-fnt-b rounded-md font-extrabold"
              >
                Help
              </Link> */}
                        </div>
                    </div>
                ) : (
                    <div className="bg-light-bg-clr rounded-md">
                        <div className="w-56  text-text-clr h-screen flex flex-col  justify-between p-5 ">
                            <div className="flex gap-8 flex-col">
                                <RxCross1
                                    className="text-2xl hover:cursor-pointer"
                                    onClick={() => setToggleSidebar(!toggleSidebar)}
                                />

                                <Link to="/trade" className="flex items-center gap-3">
                                    <FaChartArea className="text-2xl hover:cursor-pointer" />
                                    <span>Trade</span>
                                </Link>

                                <Link to="/account" className="flex items-center gap-3">
                                    <MdAccountCircle className="text-2xl hover:cursor-pointer" />
                                    <span>Account</span>
                                </Link>
                                <Link to="/withdraw" className="flex items-center gap-3">
                                    <PiHandWithdrawLight className="text-2xl hover:cursor-pointer" />
                                    <span>Withdrawal</span>
                                </Link>
                                <Link to="/transaction" className="flex items-center gap-3">
                                    <SiMoneygram className="text-2xl hover:cursor-pointer" />
                                    <span>Transactions</span>
                                </Link>
                                <Link to="/deposit" className="flex items-center gap-3">
                                    <FaSquarePlus className="text-2xl hover:cursor-pointer" />
                                    <span>Deposit</span>
                                </Link>
                                {/* <Link to="/faq" className="flex items-center gap-3">
                  <FaQuestionCircle className="text-2xl hover:cursor-pointer" />
                  <span>Faq</span>
                </Link> */}
                            </div>
                            <div className="flex flex-col gap-8">
                                <Link to="/security">
                                    <span className="flex">
                                        <MdSecurity className="text-2xl hover:cursor-pointer" />
                                        Security
                                    </span>
                                </Link>
                                <button
                                    className="text-center p-3 text-fnt-b rounded-md font-extrabold bg-danger-clr"
                                    onClick={logout}>
                                    Logout
                                </button>
                                {/* <Link
                  to="/deposit"
                  className="text-center border border-1 border-gray-600 p-3 text-fnt-b rounded-md font-extrabold"
                >
                  Join Us
                </Link> */}
                                {/* <Link
                  to="/help"
                  className="text-center border border-1 border-gray-600 p-3 text-fnt-b rounded-md font-extrabold"
                >
                  Help
                </Link> */}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className=" w-full h-16 fixed bottom-0 bg-dark-clr text-text-clr  flex md:hidden  items-center justify-around p-5 z-10 ">
                <Link to="/trade">
                    <FaChartArea className="text-4xl hover:cursor-pointer" />
                </Link>
                <Link to="/transaction">
                    <SiMoneygram className="text-4xl hover:cursor-pointer" />
                </Link>
                <Link to="/account">
                    <MdAccountCircle className="text-4xl hover:cursor-pointer" />
                </Link>
                <p>
                    <IoIosLogOut
                        className="text-4xl hover:cursor-pointer mx-auto"
                        onClick={logout}
                    />
                </p>
            </div>
        </>
    );
}

export default Sidebar;
