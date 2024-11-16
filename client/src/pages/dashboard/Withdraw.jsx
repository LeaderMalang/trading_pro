import { useForm } from "react-hook-form";
import DashboardLayout from "./DashboardLayout";
import { FaArrowRightLong } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import "../../../src/home.css";
import { useDispatch, useSelector } from "react-redux";
import { getCurrency } from "../../redux/features/currency/currency.action";
import { getAllNetwork } from "../../redux/features/network/network.action";
import {
  GetUserWithdrawlCoin,
  WithdrawlCoin,
} from "../../redux/features/withdrawl/withdrawl.action";

// import { DialogPanel, DialogTitle } from "@headlessui/react";
// import { FaCodeBranch } from "react-icons/fa";
import { GetProgile } from "../../redux/features/auth/auth.action";
import { CoinList } from "../../utils/HelperFunction";
import SubNavBar from "../../components/SubNavBar";

function Withdraw() {
  return <DashboardLayout layout={<WithdrawPage />} />;
}
function WithdrawPage() {
  const { network } = useSelector((state) => state.network);
  const { currency } = useSelector((state) => state.currency);
  const { isLoading, userWithdrawls } = useSelector((state) => state.withdrawl);
  const { loginUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [modalToggle, setModalToggle] = useState(false);
  const [coins, setCoins] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  async function withdrawSubmit(data) {
    const res = await dispatch(WithdrawlCoin({ ...data }));
    if (res?.payload) {
      setModalToggle(true);
      reset();
    }
  }
  useEffect(() => {
    (async () => {
      dispatch(getCurrency());
      dispatch(getAllNetwork());
      dispatch(GetProgile());
      dispatch(GetUserWithdrawlCoin());
      // const data = await CoinList();
      // setCoins(data);
    })();
  }, [dispatch]);

  console.log(currency);

  return (
    <div className="mb-20 p-7 bg-light-dark-clr rounded-lg">
      {/* <div className="flex gap-5 flex-wrap justify-between items-center p-5  bg-light-bg-clr w-full rounded-md ">
         
        <h2 className="head--two text-white text-xl md:text-2xl lg:text-3xl">
          Withdraw Now
        </h2>
        <div className="flex flex-wrap gap-14 text-left lg:text-right me-4">
          <div>
            <p className="text-fnt-b font-medium text-light-text-clr text-sm md:text-base lg:text-lg">
              My current currency
            </p>
            <p className="text-fnt-c font-bold text-text-clr text-sm md:text-base lg:text-lg pt-1">
              {"USD"} &nbsp;{" "}
            </p>
          </div>
          <div>
            <p className="text-fnt-b font-medium text-light-text-clr text-sm md:text-base lg:text-lg">
              Total Coin withdrawal
            </p>
            <p className="text-fnt-c font-bold text-text-clr text-sm md:text-base lg:text-lg">
              {userWithdrawls.reduce((acc, curr) => acc + curr?.coin, 0)}.00$
            </p>
          </div>
          <div>
            <p className="text-fnt-b font-medium text-light-text-clr text-sm md:text-base lg:text-lg">
              In the account
            </p>
            <p className="text-fnt-c font-bold text-text-clr text-sm md:text-base lg:text-lg">
              {" "}
              {loginUser?.coin}$
            </p>
          </div>
        </div>
      </div> */}
      <SubNavBar title={" Withdraw Now"} />
      <div className="flex w-full items-start flex-col sm:flex-row">
        {/* Deposit Form Start*/}
        <form
          className="max-w-[600px]  w-full py-6  pt-0 "
          onSubmit={handleSubmit(withdrawSubmit)}
        >
          <select
            className="mt-7 text-text-clr text-fnt-b md:text-fnt-c border border-[#515768] bg-transparent rounded-md p-3 w-full focus:outline-none focus-visible:outline-none text-sm md:text-base lg:text-lg"
            name="select_currency"
            id="select_currency"
            {...register("select_currency", {
              required: "This field is required",
            })}
          >
            <option
              className="bg-light-dark-clr text-sm md:text-base lg:text-lg"
              value=""
            >
              Select your currency
            </option>
            {coins ? (
              currency?.data?.map((ele, i) => {
                return (
                  <option
                    className="bg-light-dark-clr text-sm md:text-base lg:text-lg capitalize"
                    value={ele.curency_name}
                    key={i}
                  >
                    {ele.curency_name} ({ele.slug})
                  </option>
                );
              })
            ) : (
              <option className="bg-light-dark-clr text-sm md:text-base lg:text-lg">
                Please Wait the coin is loading
              </option>
            )}
          </select>
          <p className="text-red-400 font-medium text-sm md:text-base lg:text-lg">
            {errors.select_currency?.message}
          </p>

          <select
            className="mt-7 text-text-clr  text-fnt-b md:text-fnt-c border border-[#515768] bg-transparent rounded-md p-3 w-full focus:outline-none focus-visible:outline-none text-sm md:text-base lg:text-lg"
            name="select_network"
            id="select_network"
            {...register("select_network", {
              required: "This field is required",
            })}
          >
            <option
              className="bg-light-dark-clr text-[#5f636a] text-sm md:text-base lg:text-lg"
              value=""
            >
              Select your network
            </option>
            {network?.data?.map((ele, i) => {
              return (
                <option
                  className="bg-light-dark-clr text-sm md:text-base lg:text-lg"
                  value={ele._id}
                  key={i}
                >
                  {ele.network_name}
                </option>
              );
            })}
          </select>
          <p className="text-red-400 font-medium text-sm md:text-base lg:text-lg">
            {errors.select_network?.message}
          </p>

          {/*  */}
          <div className="relative">
            <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 text-sm md:text-base lg:text-lg translate-x-3 translate-y-3">
              Withdraw Ammount
            </p>
            <input
              className="mt-3 lg:mt-0 text-text-clr text-sm md:text-base lg:text-lg border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none"
              type="number"
              placeholder="Enter the ammount"
              {...register("withdraw_amt", {
                required: "This field is required",
              })}
            />
            <p className="text-red-400 font-medium text-sm md:text-base lg:text-lg">
              {errors.withdraw_amt?.message}
            </p>
          </div>

          <div className="relative">
            <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 text-sm md:text-base lg:text-lg translate-x-3 translate-y-3">
              User Wallet Address
            </p>
            <input
              className="mt-3 lg:mt-0 text-text-clr text-sm md:text-base lg:text-lg border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none"
              type="text"
              placeholder="Enter wallet address"
              {...register("walletAddress", {
                required: "This field is required",
              })}
            />
            <p className="text-red-400 font-medium text-sm md:text-base lg:text-lg">
              {errors.walletAddress?.message}
            </p>
          </div>

          {/* Modal Section Start */}

          {modalToggle && (
            <div className="modal_wrap">
              <div className="bg-white rounded-md p-3 flex flex-col">
                <p className=" captialized text-[red] py-1 text-lg  lg:text-xl">
                  Request info!
                </p>
                <p className="text-sm md:text-base lg:text-lg">
                  {" "}
                  Coin Withdrawl Request is sent to the Admin{" "}
                </p>
                <p className="text-sm md:text-base lg:text-lg">
                  Please wait{" "}
                  <span className="text-[blue] font-bold underline text-sm md:text-base lg:text-lg">
                    24hr
                  </span>{" "}
                  to withdraw the coin.
                </p>
                <button
                  onClick={() => setModalToggle(false)}
                  className="bg-[green] py-2 px-3 rounded-sm text-white m-4 flex justify-center text-sm md:text-base lg:text-lg w-fit self-end"
                >
                  Ok
                </button>
              </div>
            </div>
          )}
          {/* Modal Section End */}

          <button className="text-text-clr flex items-center gap-5 justify-center rounded-md text-sm md:text-base lg:text-lg font-bold p-3 bg-success-clr w-full mt-4">
            {!isLoading ? "Withdraw " : "Loading.."}
            <div className="p-2 bg-[#82b0f2] rounded-full w-max">
              <FaArrowRightLong className="text-fnt-b md:text-fnt-b" />
            </div>
          </button>
        </form>
        {/* Deposit Form End */}

        {/* table */}

        {/* <div className="w-full flex justify-center flex-col overflow-auto mt-7 sm:mt-0">
          <p className="text-start px-4 text-xl opacity-25 text-white  pb-5">
            Withdrawl History :{" "}
          </p>
          <table className="w-100 transaction_table  w-full text-center  table-auto min-w-[540] overflow-auto">
            <tr className="text-text-clr ">
              <th className="px-4 ">Currency Name</th>
              <th className="px-4 ">Amount</th>
              <th className="px-4 ">Network</th>
              <th className="px-4 ">Wallet Address</th>
              <th className="px-4 ">Status</th>
            </tr>
            {withdraws.length < 0 && (
              <div className="text-center flex flex-col ">
                <div className="w-14 h-14 p-3 rounded-full bg-light-text-clr flex items-center justify-center mx-auto mt-7">
                  <LuPackageOpen className="text-text-clr text-3xl" />
                </div>
                <p className="text-light-text-clr text-fnt-b text-center inline-block  ">
                  You don't have a withdraw history yet. Please withdraw Now.
                </p>
              </div>
            )}
            <tbody>
              {userWithdrawls.map((item, i) => {
                return (
                  <tr className="text-light-text-clr " key={i}>
                    <td className="  px-4">{item?.curencyId}</td>

                    <td className=" px-4">${item.coin}</td>
                    <div className="my-3 flex justify-center px-4">
                      <td className="text-light-text-clr bg-[#14171F] text-white rounded-md px-3  py-1 ">
                        {item.networkId}
                      </td>
                    </div>
                    <td className="text-light-text-clr bg-[#14171F] text-white rounded-md px-3  py-1 ">
                      {item.wallet_address}
                    </td>
                    <td
                      className={`${
                        item.isRelease == true
                          ? "text-green-400  rounded-full font-medium"
                          : "text-yellow-600   rounded-full font-medium"
                      }  px-4`}
                    >
                      {item.isRelease == true ? "Approved" : "Pending"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
}

export default Withdraw;
