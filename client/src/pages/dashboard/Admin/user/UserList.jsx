import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FilterUser,
  GetAllUser,
  UpdateUserBalance,
} from "../../../../redux/features/auth/auth.action";
import { toast } from "react-toastify";
import { SiTicktick } from "react-icons/si";
import { MdClose } from "react-icons/md";
import PageHeader from "../../../../components/ui/PageHeader";

const UserList = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetch() {
      dispatch(GetAllUser());
    }
    fetch();
  }, [dispatch]);
  const Loginusers = [];
  user?.data?.map((ele) => {
    if (ele.role == "user") {
      Loginusers.push(ele);
    }
  });

  //new
  const headings = [
    { key: "SN", value: "SN" },
    { key: "User No", value: "User No.`" },
    { key: "User Fullname", value: "User Fullname" },
    { key: "Account", value: "Account" },
    { key: "Current Amount", value: "Current Amount" },
    { key: "KYC Status", value: "KYC Status" },
    // { key: "Last Login", value: "Last Login" },
    // { key: "Last Logout", value: "Last Logout" },
    { key: "Created At", value: "Created At" },
    { key: "Action", value: "Action" },
  ];

  const [isInput, setIsInput] = useState(null);
  const [amount, setAmount] = useState();
  const [selectType, setType] = useState("id");
  const [searchFor, setSearchFor] = useState("");
  const openInput = (id) => {
    setIsInput(id);
  };
  const closedInput = () => {
    setIsInput(null);
  };
  const updateUserAmount = (id) => {
    if (!amount) {
      toast.info("Ammount cannot be null.");
    } else {
      dispatch(UpdateUserBalance({ user_id: id, amount: amount }));
      setIsInput(null);
    }
  };
  console.log({ user });
  useEffect(() => {
    console.log({ selectType, searchFor });
    dispatch(FilterUser({ selectType, searchFor }));
  }, [dispatch, selectType, searchFor]);
  return (
    <>
      <PageHeader header={"Users"} />
      <div className="m-3 flex ">
        <select
          className="border-gray-500 border rounded-md p-2 px-3"
          value={selectType}
          onChange={(e) => setType(e.target.value)}
        >
          <option> id</option>
          <option> name</option>
          <option> email</option>
        </select>
        <input
          type={
            selectType === "id"
              ? "number"
              : selectType === "email"
              ? "email"
              : "text"
          }
          disabled={!selectType && true}
          className="border-gray-500 border rounded-md p-2 placeholder:px-2"
          placeholder={`Enter ${selectType} to search Users`}
          value={searchFor}
          onChange={(e) => setSearchFor(e.target.value)}
        />
      </div>
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
            {user.length === 0 && (
              <p className="underline  ">No result found for the {searchFor}</p>
            )}
            {user?.map((ele, i) => {
              // Check if the user's role is not admin before rendering
              if (ele.role === "admin") {
                return null; // Skip rendering this row for admin
              }

              return (
                <tr key={ele._id}>
                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    {i + 1}
                  </td>
                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    {ele.u_id}
                  </td>
                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    {ele.fullName}
                  </td>
                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    {ele.account}
                  </td>
                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    $ {ele.coin}
                  </td>
                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    <span
                      className={`${
                        ele.kyc_status
                          ? "bg-green-700 text-white px-3 rounded-md capitalize p-2"
                          : "bg-red-700 text-white px-3 rounded-md capitalize p-2"
                      }`}
                    >
                      {ele.kyc_status ? "verified" : "pending"}
                    </span>
                  </td>
                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    {ele.created_at}
                  </td>
                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    <div>
                      {isInput === ele._id ? (
                        <div className="flex gap-1">
                          <input
                            value={amount}
                            type="number"
                            placeholder="Enter Top up Coin"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"
                            onChange={(e) => setAmount(e.target.value)}
                          />
                          <SiTicktick
                            className="m-2 text-3xl text-blue-700 cursor-pointer hover:text-white hover:bg-blue-700 rounded-full"
                            onClick={() => updateUserAmount(ele._id)}
                          />
                          <MdClose
                            className="m-2 text-3xl text-red-700 cursor-pointer hover:text-white hover:bg-red-700 rounded-full"
                            onClick={closedInput}
                          />
                        </div>
                      ) : (
                        <span
                          className="bg-blue-700 p-2 text-white rounded-md cursor-pointer"
                          onClick={() => openInput(ele._id)}
                        >
                          Update Balance
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserList;
