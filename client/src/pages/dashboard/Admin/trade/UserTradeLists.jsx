import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllTrades,
  UpdateTradeAmount,
} from "../../../../redux/features/trade/trade.action";
import { SiTicktick } from "react-icons/si";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import PageHeader from "../../../../components/ui/PageHeader";
import { GetAllUser } from "../../../../redux/features/auth/auth.action";

const UserTradeLists = () => {
  const { alltrades } = useSelector((state) => state.trade);
  const { user } = useSelector((state) => state.auth);
  const headings = [
    { key: "SN", value: "SN" },
    { key: "User Name", value: "User Name`" },
    { key: "Currency", value: "Currency" },
    { key: "Time Frame", value: "Time Frame" },
    { key: "Amount", value: "Amount" },
    { key: "Trade Type", value: "Trade Type" },
    { key: "Hold Amount", value: "Hold Amount" },
    { key: "Created At", value: "Created At" },
    { key: "Action", value: "Action" },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllTrades());
    dispatch(GetAllUser());
  }, [dispatch]);
  const [isShowInputTradeId, setShowInputTradeId] = useState(null);
  const [amount, setAmount] = useState();

  const openInput = (trade_id) => {
    setShowInputTradeId(trade_id);
  };

  const updateTrade = (id) => {
    if (!amount) {
      toast.info("Amount cannot be null");
    } else {
      dispatch(
        UpdateTradeAmount({
          trade_id: id,
          amount: amount,
        })
      );
      setShowInputTradeId(null);
    }
  };

  const closedInput = () => {
    setShowInputTradeId(null);
  };

  return (
    <>
      <PageHeader header={"User Trades"} />
      <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative h-fit">
        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
          <thead>
            <tr className="text-left">
              {headings?.map((heading) => (
                <th
                  key={heading.key}
                  className={`bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs ${heading.key}`}
                >
                  {heading.value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alltrades?.map((trade, i) => (
              <tr key={trade._id}>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {i + 1}
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  <p className="text-green-600 capitalize">
                    {user.map(
                      (ele) =>
                        ele._id === trade.user_id.toString() && ele.fullName
                    )}
                  </p>
                  <span className="opacity-50">{trade.user_id}</span>
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {trade.currency}
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {trade.timeFrame}
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  $ {trade.amount}
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  <span
                    className={`${
                      trade.action == "up"
                        ? "bg-green-700 text-white px-3 rounded-md capitalize p-2"
                        : "bg-red-700 text-white px-3 rounded-md capitalize p-2"
                    }  `}
                  >
                    {trade.action}
                  </span>
                </td>

                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  <p
                    className={` ${
                      !trade.isHold
                        ? "m-1 bg-yellow-100 text-yellow-900 *: p-1 rounded-md px-2 "
                        : "m-1 bg-red-950 text-red-600 *: p-1 rounded-md px-2"
                    } p-1 py-3   text-center`}
                  >
                    {!trade.isHold ? "Success" : "Pending"}
                  </p>
                </td>

                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {trade.created_at}
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {!trade.isHold ? (
                    <p className="text-green-500 cursor-not-allowed mt-3">
                      Verified
                    </p>
                  ) : isShowInputTradeId == trade._id ? (
                    <div className="flex gap-1">
                      <input
                        value={amount}
                        type="number"
                        placeholder="Enter Top up Coin"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <SiTicktick
                        className=" m-2 text-3xl text-blue-700 cursor-pointer hover:text-white hover:bg-blue-700 rounded-full"
                        onClick={() => updateTrade(trade._id)}
                      />{" "}
                      <MdClose
                        className=" m-2 text-3xl text-red-700 cursor-pointer hover:text-white hover:bg-red-700 rounded-full"
                        onClick={closedInput}
                      />
                    </div>
                  ) : (
                    <p
                      className="bg-blue-600 text-white p-2 rounded-md cursor-pointer"
                      onClick={() => openInput(trade._id)}
                    >
                      Verify Now
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTradeLists;
