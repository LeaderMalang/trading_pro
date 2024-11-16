import { FaArrowRightLong } from "react-icons/fa6";
import DashboardLayout from "./DashboardLayout";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import "../../../src/home.css";
import { useDispatch, useSelector } from "react-redux";
import { FaCopy } from "react-icons/fa";
import {
  DepositeCoin,
  GetUserDepositCoin,
} from "../../redux/features/deposite/deposite.action";
import { getAllNetwork } from "../../redux/features/network/network.action";
import { getCurrency } from "../../redux/features/currency/currency.action";
import { toast } from "react-toastify";
import { CoinList } from "../../utils/HelperFunction";

function Deposit() {
  return <DashboardLayout layout={<DepositPage />} />;
}

function DepositPage() {
  const { network } = useSelector((state) => state.network);
  const { isLoading } = useSelector((state) => state.desposite);
  const { currency } = useSelector((state) => state.currency);

  const dispatch = useDispatch();
  const [modalToggle, setModalToggle] = useState(false);
  const {
    formState: { errors },
  } = useForm();

  const [currencyName, setCurrencyName] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [depositeAmount, setDespositeAmount] = useState(0.0);
  const [ss_img, setSS_Img] = useState(null);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    (async () => {
      dispatch(getCurrency());
      dispatch(getAllNetwork());
      dispatch(GetUserDepositCoin());
      dispatch(getCurrency());
      const data = await CoinList();
      setCoins(data);
    })();
  }, [dispatch]);

  const formData = new FormData();
  formData.append("currencyName", currencyName);
  formData.append("selectedNetwork", selectedNetwork);
  formData.append("depositeAmount", depositeAmount);
  formData.append("ss_img", ss_img);

  const mappedEntries = Array.from(formData.entries()).map(([key, value]) => {
    // Example transformation: converting keys to uppercase
    return { key: key, value };
  });
  const accountSubmit = async (e) => {
    e.preventDefault();
    if (
      currencyName == null ||
      selectedNetwork == null ||
      depositeAmount < 0 ||
      ss_img == null
    ) {
      toast.error("All Feilds are Required!");
    } else {
      const res = await dispatch(DepositeCoin(mappedEntries));
      if (res?.payload) {
        setModalToggle(true);
      }
      setCurrencyName("");
      setSelectedNetwork("");
      setDespositeAmount(0);
      setSS_Img("");
    }
  };
  console.log({ currency });
  return (
    <div className="mb-20 p-7 bg-light-dark-clr rounded-lg">
      {/* <DashboardSubNav /> */}
      <h2 className="head--two text-white text-xl md:text-2xl lg:text-3xl">
        Deposit Coin
      </h2>

      <div className="flex w-full items-start flex-col sm:flex-row">
        {/* Payment Data Start */}
        <h2 className="text-text-clr text-sm md:text-base lg:text-lg  "></h2>

        {/* Deposit Form Start*/}
        <form
          className="max-w-[600px]  w-full py-6  pt-0"
          // onSubmit={handleSubmit(accountSubmit)}
        >
          <select
            className="mt-7 text-text-clr text-sm md:text-base lg:text-lg border border-[#515768] bg-transparent rounded-md p-3 w-full focus:outline-none focus-visible:outline-none"
            name="select_currency"
            id="select_currency"
            value={currencyName}
            onChange={(e) => setCurrencyName(e.target.value)}
          >
            <option
              className="bg-light-dark-clr text-sm md:text-base lg:text-lg"
              value=""
            >
              Select your currency
            </option>
            {currency?.data
              ? currency?.data?.slice(0, 20)?.map((ele, i) => {
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
              : "Please Wait the coin is loading"}
          </select>
          <p className="text-red-400 font-medium text-sm md:text-base lg:text-lg">
            {errors.select_currency?.message}
          </p>

          <select
            className="mt-7 text-text-clr text-sm md:text-base lg:text-lg border border-[#515768] bg-transparent rounded-md p-3 w-full focus:outline-none focus-visible:outline-none"
            name="select_network"
            id="select_network"
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value)}
          >
            <option
              className="bg-light-dark-clr text-sm md:text-base lg:text-lg"
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

          {selectedNetwork &&
            network?.data?.map((ele, i) => {
              if (ele._id === selectedNetwork) {
                return selectedNetwork ? (
                  <React.Fragment key={i}>
                    <h3 className="text-text-clr mt-4 mb-3 text-sm md:text-base lg:text-lg">
                      Scan here
                    </h3>
                    <div className="bg-white p-5 w-[12rem] ">
                      <img
                        src={ele.wallet_img}
                        alt={ele.network_name}
                        className="w-[100px] rounded-md"
                      />
                    </div>

                    <div className="relative">
                      <p className="mt-3 mb-2 text-text-clr font-sembold text-sm md:text-base lg:text-lg">
                        Wallet address
                      </p>
                      <div className="flex justify-between my-2 text-text-clr bg-[#2B3040] p-1 rounded-md w-auto px-2">
                        <h4 className="py-2 text-sm md:text-base lg:text-lg overflow-auto">
                          {ele.wallet_address}
                        </h4>
                        <FaCopy
                          className="my-2 hover:text-[blue] cursor-pointer  text-base lg:text-lg"
                          onClick={() => {
                            navigator.clipboard.writeText(ele.wallet_address);
                            toast.info("Wallet Address Copied Successfully!");
                          }}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                ) : (
                  <p>Loading..</p>
                );
              }
            })}

          <div className="relative">
            <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 text-md translate-x-3 translate-y-3 text-sm md:text-base lg:text-lg">
              Deposit Ammount
            </p>
            <input
              className="mt-3 lg:mt-0 text-text-clr text-fnt-b md:text-fnt-c border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none text-sm md:text-base lg:text-lg"
              type="number"
              value={depositeAmount}
              onChange={(e) => setDespositeAmount(e.target.value)}
            />
            <p className="text-red-400 font-medium text-sm md:text-base lg:text-lg">
              {errors.deposit_amt?.message}
            </p>
          </div>
          <div className="relative">
            <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 text-md translate-x-3 translate-y-3 text-sm md:text-base lg:text-lg">
              Enter your screenshot
            </p>
            <input
              className="mt-3 lg:mt-0 text-text-clr text-fnt-b md:text-fnt-c border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none text-sm md:text-base lg:text-lg"
              type="file"
              id="img"
              // value={ss_img}
              onChange={(e) => {
                const file = e.currentTarget.files[0];
                setSS_Img(file);
              }}
            />
            <p className="text-red-400 font-medium text-sm md:text-base lg:text-lg">
              {errors.qr_ss?.message}
            </p>
          </div>
          {/*  */}

          <p
            className="text-text-clr flex items-center gap-5 justify-center rounded-md text-fnt-b lg:text-fnt-c font-bold p-3 bg-success-clr w-full mt-4 cursor-pointer text-sm md:text-base lg:text-lg"
            onClick={accountSubmit}
          >
            {!isLoading ? "Deposit Now" : "Loading..."}
            <div className="p-2 bg-[#82b0f2] rounded-full w-max">
              <FaArrowRightLong className="text-fnt-b md:text-fnt-b" />
            </div>
          </p>
        </form>
        {/* Deposit Form End */}
        {/* Payment Data End */}

        {/* table */}
        {/* <div className="w-full flex justify-center flex-col overflow-auto mt-7 sm:mt-0">
          <p className="text-start md:px-[3rem] text-xl opacity-25 text-white  pb-5">
            Desposite History :{" "}
          </p>
          <table className="w-100 transaction_table  w-full text-center  table-auto min-w-[540] overflow-auto">
            <tr className="text-text-clr ">
              <th className="px-4 ">Currency Name</th>
              <th className="px-4 ">Amount </th>
              <th className="px-4 ">Network </th>
              <th className="px-4 ">Netwok Address</th>
              <th className="px-4 ">Status</th>
            </tr>

            <tbody>
              {userDeposite &&
                userDeposite?.map((item, i) => {
                  return (
                    <tr className="text-light-text-clr " key={i}>
                      <td className="  px-4">{item?.currencyName}</td>

                      <td className=" px-4">${item.recharge_amount}</td>
                      <div className="my-3 flex justify-center px-4">
                        <td className="text-light-text-clr bg-[#14171F] text-white rounded-md px-3  py-1 ">
                          {item.network.network_name}
                        </td>
                      </div>
                      <td className="text-light-text-clr bg-[#14171F] text-white rounded-md px-3  py-1 ">
                        {item.network.wallet_address}
                      </td>
                      <td
                        className={`${
                          item.is_recharge == true
                            ? "text-green-400  rounded-full font-medium"
                            : "text-yellow-600   rounded-full font-medium"
                        }  px-4`}
                      >
                        {item.is_recharge == true ? "Approved" : "Pending"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div> */}
      </div>

      {/* Modal Section Start */}
      {modalToggle && (
        <div className="modal_wrap">
          <div className="bg-white rounded-md p-3">
            <p className="text-xl captialized text-[red] py-1">Request info!</p>
            <p> Coin Deposite Request is sent to the Admin </p>
            <p>
              Please wait{" "}
              <span className="text-[blue] font-bold underline">24hr</span> to
              deposite the coin.
            </p>
            <button
              onClick={() => setModalToggle(false)}
              className="bg-[green] px-3 rounded-sm text-white my-4 flex justify-center"
            >
              Ok
            </button>
          </div>
        </div>
      )}
      {/* Modal Section End */}
    </div>
  );
}

export default Deposit;
