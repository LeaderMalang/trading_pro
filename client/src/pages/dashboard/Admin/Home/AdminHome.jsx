import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllUser,
  GetProgile,
} from "../../../../redux/features/auth/auth.action";
import { FaUserFriends } from "react-icons/fa";
import { SiBetfair } from "react-icons/si";

import { FaNetworkWired } from "react-icons/fa";
import { getAllNetwork } from "../../../../redux/features/network/network.action";
import { getCurrency } from "../../../../redux/features/currency/currency.action";
import { GetAllDepositeCoin } from "../../../../redux/features/deposite/deposite.action";
import { GetAllTrades } from "../../../../redux/features/trade/trade.action";
import { GetAllWithdrawlCoin } from "../../../../redux/features/withdrawl/withdrawl.action";

const AdminHome = () => {
  const { loginUser } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { network } = useSelector((state) => state.network);
  const { allDepositeCoin } = useSelector((state) => state.desposite);
  const { alltrades } = useSelector((state) => state.trade);
  const { withdrwal } = useSelector((state) => state.withdrawl);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetch() {
      dispatch(GetProgile());
      dispatch(GetAllUser());
      dispatch(getAllNetwork());
      dispatch(getCurrency());
      dispatch(GetAllDepositeCoin());
      dispatch(GetAllTrades());
      dispatch(GetAllWithdrawlCoin());
    }
    fetch();
  }, [dispatch]);

  // !just test remove this later

  const Loginusers = [];
  user?.data?.map((ele) => {
    if (ele.role == "user") {
      Loginusers.push(ele);
    }
  });
  let verifiedUser = 0;
  let nonVerifiedUser = 0;
  user?.map((ele) => ele?.kyc_status === true && verifiedUser++);
  user?.map((ele) => ele?.kyc_status === false && nonVerifiedUser++);

  return (
    <div className=" w-full">
      <p className="text-2xl font-semibold ">Welcome To Admin Dashboard</p>
      <div className="   border border-[#BEBEBE] py-4 px-2">
        <img
          src={
            loginUser?.profile_img ||
            "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png"
          }
          alt={loginUser?.userName}
          className="w-[80px] h-[80px] border border-[green] rounded-full"
        />
        <div className="m-2">
          <p>{loginUser?.fullName}</p>
          <p>{loginUser?.account}</p>
        </div>
      </div>
      <div className="my-5">
        <p className="text-2xl font-medium my-3"> Analytics</p>
        {/* <div className="grid grid-flow-row grid-cols-5 gap-4"> */}
        <div className="responsive_grid gap-2">
          <div className="border border-[#BEBEBE] flex bg-[blue] rounded-md  gap-5">
            <SiBetfair className="text-5xl border bg-[white] rounded-full text-[blue] mx-3 my-2 p-1 " />
            <div className="mt-3">
              <p className="font-bold text-white uppercase">Total Trade</p>
              <p className="font-bold text-white text-center">
                ${alltrades.reduce((acc, cur) => acc + cur.amount, 0)}.00
              </p>
            </div>
          </div>
          <div className="border border-[#BEBEBE] flex bg-[red] rounded-md  gap-5">
            <FaUserFriends className="text-5xl border bg-[white] rounded-full text-[red] mx-3 my-2 p-1 " />
            <div className="mt-3">
              <p className="font-bold text-white uppercase">deposite Coin</p>
              <p className="font-bold text-white text-center">
                $
                {allDepositeCoin?.reduce(
                  (acc, cur) => acc + cur.recharge_amount,
                  0
                )}
                .00
              </p>
            </div>
          </div>
          <div className="border border-[#BEBEBE] flex bg-[green] rounded-md  gap-5">
            <FaUserFriends className="text-5xl border bg-[white] rounded-full text-[green] mx-3 my-2 p-1 " />
            <div className="mt-3">
              <p className="font-bold text-white uppercase">withdrawl Coin</p>
              <p className="font-bold text-white text-center">
                ${withdrwal?.reduce((acc, cur) => acc + cur.coin, 0)}
                .00
              </p>
            </div>
          </div>

          <div className="border border-[#BEBEBE] flex bg-[green] rounded-md  gap-5">
            <FaNetworkWired className="text-5xl border bg-[white] rounded-full text-[green] mx-3 my-2 p-1 " />
            <div className="mt-3">
              <p className="font-bold text-white uppercase"> Network</p>
              <p className="font-bold text-white text-center">
                {network?.data?.length}
              </p>
            </div>
          </div>
          <div className="border border-[#BEBEBE] flex bg-[green] rounded-md  gap-5">
            <FaUserFriends className="text-5xl border bg-[white] rounded-full text-[green] mx-3 my-2 p-1 " />
            <div className="mt-3">
              <p className="font-bold text-white uppercase">Total User</p>
              <p className="font-bold text-white text-center">{user?.length}</p>
            </div>
          </div>
          <div className="border border-[#BEBEBE] flex bg-[blue] rounded-md  gap-5">
            <FaUserFriends className="text-5xl border bg-[white] rounded-full text-[blue] mx-3 my-2 p-1 " />
            <div className="mt-3">
              <p className="font-bold text-white uppercase">verified Users</p>
              <p className="font-bold text-white text-center">{verifiedUser}</p>
            </div>
          </div>
          <div className="border border-[#BEBEBE] flex bg-[red] rounded-md  gap-5">
            <FaUserFriends className="text-5xl border bg-[white] rounded-full text-[red] mx-3 my-2 p-1 " />
            <div className="mt-3">
              <p className="font-bold text-white uppercase">
                non-verified Users
              </p>
              <p className="font-bold text-white text-center">
                {nonVerifiedUser}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
