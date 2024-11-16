import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllTrades } from "../../../../redux/features/trade/trade.action";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import UpdateTradeModal from "./UpdateTradeModal";

const TradeList = () => {
  const { alltrades } = useSelector((state) => state.trade);
  console.log({ alltrades });
  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(GetAllTrades());
    })();
  }, [dispatch]);
  const headings = [
    { key: "SN", value: "SN" },
    { key: "userId", value: "User _id" },
    { key: "currencyName", value: "Currency Name" },
    { key: "amount", value: "amount" },
    { key: "time", value: "time" },
    { key: "isHold", value: "isHold" },
    { key: "Date", value: "Date" },
    { key: "Action", value: "Action" },
  ];
  const [rowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateTradeModal, setUpdateTradeModel] = useState(false);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const updateTradeAmount = ({ hold, userId }) => {
    if (!hold) {
      toast.info(`Trade Amount Already Added to the User-${userId}`);
      setUpdateTradeModel(false);
    } else {
      setUpdateTradeModel(true);
    }
  };

  return (
    <div>
      <p>Trade List</p>
      <div className="antialiased sans-serif ">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css"
        />
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-between">
            <h1 className="text-3xl py-4 mb-10">Trades List</h1>
            {/* <UpdateTradeModal
              btnName={
                <button className="border p-2 bg-[green] text-white uppercase font-semibold rounded-md mt-5">
                  Add Currecy
                </button>
              }
            /> */}
          </div>

          <div className="mb-4 flex justify-between items-center">
            <div className="flex-1 pr-4">
              <div className="relative md:w-1/3">
                <input
                  type="search"
                  className="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                  placeholder="Search..."
                />
                <div className="absolute top-0 left-0 inline-flex items-center p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-400"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                      stroke="none"
                    ></rect>
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="shadow rounded-lg flex"></div>
          </div>
          <div
            className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative"
            style={{ height: "600px" }}
          >
            <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
              <thead>
                <tr className="text-left">
                  {/* <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
                    <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox focus:outline-none focus:shadow-outline"
                        onClick={selectAllCheckbox}
                      />
                    </label>
                  </th> */}
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
                {alltrades?.map((user, i) => (
                  <tr key={user._id}>
                    {/* <td className="border-dashed border-t border-gray-200 px-3">
                      <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline"
                          name={user.userId}
                        />
                      </label>
                    </td> */}
                    <td className="border-dashed border-t border-gray-200 userId">
                      <span className="text-gray-700 px-6 py-3 flex items-center">
                        {i + 1}
                      </span>
                    </td>
                    <td className="border-dashed border-t border-gray-200 firstName">
                      <span
                        className={` px-6 py-3 flex items-center ${
                          user.isHold ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {user.user_id}
                      </span>
                    </td>
                    <td className="border-dashed border-t border-gray-200 gender">
                      <span className="text-gray-700 px-6 py-3 flex items-center">
                        {user.currency}
                      </span>
                    </td>

                    <td className="border-dashed border-t border-gray-200 phoneNumber">
                      <span className="text-gray-700 px-6 py-3 flex items-center">
                        {user.amount}
                      </span>
                    </td>
                    <td className="border-dashed border-t border-gray-200 phoneNumber">
                      <span className="text-gray-700 px-6 py-3 flex items-center">
                        {user.time} sec
                      </span>
                    </td>
                    <td className="border-dashed border-t border-gray-200 phoneNumber">
                      <span
                        className={` px-6 py-3 flex items-center ${
                          user.isHold
                            ? "text-white bg-red-600 p-2 rounded-md uppercase font-semibold text-center"
                            : "text-white bg-green-600 p-2 rounded-md uppercase font-semibold text-center"
                        }`}
                      >
                        {user.isHold ? "true" : "false"}
                      </span>
                    </td>
                    <td className="border-dashed border-t border-gray-200 phoneNumber">
                      <span className="text-gray-700 px-6 py-3 flex items-center">
                        {user.created_at}
                      </span>
                    </td>
                    <td className="border-dashed border-t border-gray-200 phoneNumber flex justify-evenly my-6">
                      {/* <FaRegEdit className="text-4xl bg-[blue] text-white  rounded-full p-2" />
                      <MdDeleteOutline className="text-4xl bg-[red] text-white  rounded-full p-2" /> */}
                      <button
                        className="bg-[green] text-white rounded-md p-2 uppercase font-semibold"
                        // disabled={user.isHold ? false : true}
                        onClick={() => {
                          updateTradeAmount({
                            hold: user.isHold ? "true" : "false",
                            userId: user.user_id,
                          });
                        }}
                      >
                        {!updateTradeModal ? (
                          " Update Trade Amount"
                        ) : (
                          <UpdateTradeModal
                            btnName={"Update Trade Amount"}
                            trade_id={user._id}
                          />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <nav aria-label="Page navigation">
              <ul className="inline-flex -space-x-px">
                {Array.from(
                  { length: Math.ceil(alltrades.length / rowsPerPage) },
                  (_, i) => i + 1
                ).map((pageNumber) => (
                  <li key={pageNumber}>
                    <button
                      onClick={() => paginate(pageNumber)}
                      className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                        currentPage === pageNumber
                          ? "z-10 bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                          : ""
                      }`}
                    >
                      {pageNumber}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

TradeList.propTypes = {};

export default TradeList;
