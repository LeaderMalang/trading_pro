import DashboardLayout from "./DashboardLayout";
import "../../../src/home.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  FilterAllHistory,
  GetTradeByUser,
  UserTransactionHistory,
} from "../../redux/features/trade/trade.action";
import { LuPackageOpen } from "react-icons/lu";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import ViewDeposite from "../../components/ui/ViewDeposite";
import ViewWithdrawl from "../../components/ui/ViewWithdrawl";
import ViewTrade from "../../components/ui/ViewTrade";

function Transaction() {
  return <DashboardLayout layout={<TransactionPage />} />;
}

function TransactionPage() {
  const { history } = useSelector((state) => state.trade);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [filterBy, setFilterBy] = useState("All");
  const [filterResult, setFilterResult] = useState(filterBy);
  const [viewHistory, setHistory] = useState();
  useEffect(() => {
    dispatch(GetTradeByUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(UserTransactionHistory(filterBy));
    setFilterResult(filterBy);
  }, [dispatch, filterBy]);

  const filterItem = ["All", "Trade", "Deposite", "Withdrawl"];
  const tHeading = [
    "Currency Name",
    "Amount",
    "Action Type",
    "Check",
    "Created At",
  ];

  const open = (data) => {
    setHistory(data);
    setOpen(true);
  };

  console.log({ viewHistory });

  const closed = () => {
    setOpen(!true);
  };

  return (
    <section className="bg-light-dark-clr p-7    flex flex-col rounded-lg">
      {/* <DashboardSubNav /> */}
      <h2 className="head--two text-white text-base md:text-lg lg:text-xl">
        Transaction History
      </h2>
      <div className="  mt-2">
        <div className="flex justify-between">
          <div>
            <p className="text-white pb-2 text-sm md:text-base lg:text-lg">
              Filter By
            </p>
            <select
              className=" py-2 w-[200px] px-1 rounded-md text-sm md:text-base lg:text-lg"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              {filterItem.map((ele, i) => {
                return (
                  <option
                    className="text-[#212634] opacity-20 text-sm md:text-base lg:text-lg font-po"
                    key={i}
                  >
                    {ele}
                  </option>
                );
              })}
            </select>
            {/* <span
                            className="bg-green-600 text-white px-2 py-1 rounded-md mx-2 cursor-pointer text-xl"
                            onClick={filterNow}>
                            Submit
                        </span> */}
          </div>
          <div>
            <p className="text-white opacity-70 text-sm md:text-base lg:text-lg">
              Showing Result :{" "}
              <span className="opacity-70">{filterResult}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center flex-col overflow-auto  rounded-md  mt-5 ">
        <table className="w-100 transaction_table  w-full text-center  table-auto min-w-[540] overflow-auto ">
          <tr className="text-text-clr  text-sm md:text-base lg:text-lg ">
            {tHeading.map((ele, i) => (
              <th
                className={`py-3 px-4 whitespace-nowrap   even:bg-light-dark-clr odd:bg-light-bg-clr ${
                  i == 0 ? "rounded-tl-lg" : ""
                } ${i == tHeading.length - 1 ? "rounded-tr-lg" : ""}`}
                key={i}
              >
                {ele}
              </th>
            ))}
          </tr>

          <tbody>
            {history ? (
              history.toReversed().flatMap((ele) => {
                return ele.history.map((item, i) => {
                  return (
                    <tr className="text-light-text-clr " key={i}>
                      <td
                        className={`  px-4 capitalize text-sm md:text-base lg:text-lg  even:bg-light-dark-clr odd:bg-light-bg-clr `}
                      >
                        {ele.currencyName}
                        {ele.actionType == "trade" && (
                          <span>
                            {" "}
                            -{" "}
                            <span
                              className={`${
                                item.action === "up"
                                  ? "bg-green-700 text-white px-3 rounded-md capitalize"
                                  : "bg-red-700 text-white px-3 rounded-md capitalize"
                              }`}
                            >
                              {item.action}
                            </span>
                          </span>
                        )}
                      </td>

                      <td className=" px-4 whitespace-nowrap text-sm md:text-base lg:text-lg  even:bg-light-dark-clr odd:bg-light-bg-clr">
                        ${ele.amount}
                      </td>
                      {/* <div className="my-3 flex justify-center px-4  "> */}
                      <td
                        className={` 
                                             flex justify-center px-4 whitespace-nowrap text-sm md:text-base lg:text-lg  even:bg-light-dark-clr odd:bg-light-bg-clr h-full`}
                      >
                        <span
                          className={`text-white rounded-md px-3  py-1 my-3 uppercase  font-semibold    ${
                            ele.actionType == "deposite"
                              ? "bg-[blue]"
                              : ele.actionType == "trade"
                              ? "bg-[green]"
                              : "bg-[#4c3703]"
                          } `}
                        >
                          {ele.actionType}
                        </span>
                      </td>
                      {/* </div> */}

                      <td className="  px-4 whitespace-nowrap text-sm md:text-base lg:text-lg  even:bg-light-dark-clr odd:bg-light-bg-clr">
                        <div className="flex justify-center">
                          <BiDotsHorizontalRounded
                            className="text-3xl text-[white] cursor-pointer"
                            onClick={() => open(ele)}
                          />
                        </div>
                      </td>

                      <td className="text-success-clr px-4 whitespace-nowrap text-sm md:text-base lg:text-lg  even:bg-light-dark-clr odd:bg-light-bg-clr">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                });
              })
            ) : (
              <></>
            )}
          </tbody>
        </table>
        {!history ? (
          <div className="text-center flex flex-col ">
            <div className="w-14 h-14 p-3 rounded-full bg-light-text-clr flex items-center justify-center mx-auto mt-7">
              <LuPackageOpen className="text-text-clr text-3xl" />
            </div>
            <p className="text-light-text-clr text-fnt-b text-center inline-block  ">
              You donot have a trade history yet. Please Trade Now.
            </p>
          </div>
        ) : (
          <></>
        )}
        {isOpen && (
          <Dialog open={isOpen} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center ">
                <DialogPanel
                  transition
                  // className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in min-w-[250px] max-w-[450px] w-[50%] text-sm md:text-base lg:text-lg"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    {/* <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          aria-hidden="true"
                          className="h-6 w-6 text-red-600"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Deactivate account
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to deactivate your account?
                            All of your data will be permanently removed. This
                            action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div> */}
                    {viewHistory.actionType == "deposite" ? (
                      <ViewDeposite data={viewHistory} />
                    ) : viewHistory.actionType == "withdrawl" ? (
                      <ViewWithdrawl data={viewHistory} />
                    ) : viewHistory.actionType == "trade" ? (
                      <ViewTrade data={viewHistory} />
                    ) : null}
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {/* <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Deactivate
                    </button> */}
                    <button
                      type="button"
                      data-autofocus
                      onClick={closed}
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    </section>
  );
}

export default Transaction;
