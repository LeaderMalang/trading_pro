import { useEffect, useState } from "react";
import { SidebarOpenIcon } from "lucide-react";
import PropTypes from "prop-types";
import { AdminSideBar } from "./AdminSideBar.jsx";
import { Tooltip } from "@mui/material";
import Network from "../pages/dashboard/Admin/network/Network";
import Index from "../pages/dashboard/Admin/varifyCoin/Index";
import Currecy from "../pages/dashboard/Admin/currency/Currecy";
import TradeIndex from "../pages/dashboard/Admin/trade/Trade";
import AdminHome from "../pages/dashboard/Admin/Home/AdminHome";
import { useLocation } from "react-router-dom";
import KYCList from "../pages/dashboard/Admin/user/KYCList.jsx";
import WIthdrawlList from "../pages/dashboard/Withdrawl/WIthdrawlList.jsx";
import UserCoinLists from "../pages/dashboard/Admin/Coin/UserCoinLists.jsx";
import UserTradeLists from "../pages/dashboard/Admin/trade/UserTradeLists.jsx";
import UserList from "../pages/dashboard/Admin/user/UserList.jsx";
const AdminLayout = ({ otherComponent }) => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [component, setComponent] = useState();
  const location = useLocation();
  useEffect(() => {
    setShowImage(false);
  }, [location]);
  useEffect(() => {
    switch (otherComponent) {
      case "userIndex":
        setComponent(<UserList />);
        break;
      case "network":
        setComponent(
          <Network setShowImage={setShowImage} setImageSrc={setImageSrc} />
        );
        break;
      case "index":
        setComponent(<Index />);
        break;
      case "tradeIndex":
        setComponent(<TradeIndex />);
        break;
      case "currency":
        setComponent(<Currecy />);
        break;
      case "kyclists":
        setComponent(
          <KYCList setShowImage={setShowImage} setImageSrc={setImageSrc} />
        );
        break;
      case "adminHome":
        setComponent(<AdminHome />);
        break;
      case "withdrawlLists":
        setComponent(<WIthdrawlList />);
        break;
      case "userCoinLists":
        setComponent(
          <UserCoinLists
            setShowImage={setShowImage}
            setImageSrc={setImageSrc}
          />
        );
        break;
      case "userTrades":
        setComponent(<UserTradeLists />);
        break;
      default:
        setComponent(<AdminHome />);
        break;
    }
  }, [otherComponent]);
  return (
    <div className="flex flex-row-reverse h-screen max-w-full">
      {/* popupImage */}

      <div className=" text-black bg-white  h-full  flex flex-col overflow-auto w-full  justify-top ">
        {component}
      </div>
      {showSideBar ? (
        <AdminSideBar setShowSideBar={setShowSideBar} />
      ) : (
        <div className="w-fit">
          <p className="flex flex-row my-2  p-[2px] top-0 w-fit ">
            <Tooltip title="Show sidebar" arrow>
              <div className="flex gap-1 ">
                <SidebarOpenIcon
                  className="text-[green] mx-1  border bg-white rounded-sm "
                  size={35}
                  onClick={() => {
                    setShowSideBar((currentValue) => !currentValue);
                  }}
                />
                <p className="text-[black]   mt-3"></p>
              </div>
            </Tooltip>
          </p>
        </div>
      )}
      <div
        className={`flex items-center justify-center w-screen h-screen bg-black bg-opacity-50 absolute  ${
          !showImage ? "hidden" : "block"
        }`}
        onClick={() => {
          setShowImage((prevVal) => !prevVal);
        }}
      >
        <img
          src={imageSrc}
          alt="popup image"
          className="max-w-[400px] max-h-[400px]"
          onClick={(event) => {
            event.stopPropagation();
          }}
        ></img>
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  otherComponent: PropTypes.any.isRequired,
};

export default AdminLayout;
