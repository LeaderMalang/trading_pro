import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUserDepositCoin,
  VerifyDepositeCoin,
} from "../../../../redux/features/deposite/deposite.action";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import PageHeader from "../../../../components/ui/PageHeader";
import { GetAllUser } from "../../../../redux/features/auth/auth.action";

const UserCoinLists = ({ setShowImage, setImageSrc }) => {
  const { allDepositeCoin } = useSelector((state) => state.desposite);
  const { user } = useSelector((state) => state.auth);
  const headings = [
    { key: "SN", value: "SN" },
    { key: "User ID", value: "User Id`" },
    { key: "Currency Name", value: "Currency Name" },
    { key: "Network  Name", value: "Network Name" },
    { key: "Wallet Address", value: "Wallet Address" },
    { key: "Vochure Image", value: "Vochure Image" },
    { key: "Amount", value: "Amount" },
    { key: "Status", value: "Status" },
    { key: "Created At", value: "Created At" },
    { key: "Action", value: "Action" },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUserDepositCoin());
    dispatch(GetAllUser());
  }, [dispatch]);

  const [isShowInputId, setShowInputId] = useState(null);
  const [amount, setAmount] = useState();

  const openInput = (id) => {
    setShowInputId(id);
  };

  const verifyCoin = (id) => {
    if (!amount) {
      toast.info("Amount cannot be null");
    } else {
      dispatch(
        VerifyDepositeCoin({
          coin_id: id,
          amount: amount,
        })
      );
    }
  };

  const closedInput = () => {
    setShowInputId(null);
  };

  function popUpImg(src) {
    setShowImage(true);
    setImageSrc(src);
  }
  return (
    <>
      <PageHeader header={"User Coin List"} />
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
            {allDepositeCoin?.map((ele, i) => {
              return (
                <tr key={ele._id}>
                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    {i + 1}
                  </td>
                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    <p className="text-green-600 capitalize">
                      {user.map(
                        (el) =>
                          el._id === ele.user_id.toString() && ele.fullName
                      )}
                    </p>
                    <span className="opacity-50">{ele.user_id}</span>
                  </td>
                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    {ele.currencyName}
                  </td>
                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    {ele.network.network_name}
                  </td>
                  <td
                    className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(ele.network.wallet_address);
                      toast.info("User Wallet copy Copied Successfully!");
                    }}
                  >
                    <p className="opacity-20">CLick to copy Address</p>
                    {ele.network.wallet_address}
                  </td>
                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    <img
                      src={ele.voucher_img}
                      alt={ele.voucher_img}
                      className="h-[100px] w-[100px] rounded-full cursor-pointer"
                      onClick={() => {
                        popUpImg(ele.voucher_img);
                      }}
                    />
                  </td>
                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    ${ele.recharge_amount}
                  </td>

                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    <p
                      className={` ${
                        ele.is_recharge
                          ? "m-1 bg-yellow-100 text-yellow-900 *: p-1 rounded-md px-2 "
                          : "m-1 bg-red-950 text-red-600 *: p-1 rounded-md px-2"
                      } bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs`}
                    >
                      {ele.is_recharge ? "Success" : "Pending"}
                    </p>
                  </td>

                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    {ele.created_at}
                  </td>
                  <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                    {ele.is_recharge ? (
                      <p className="text-green-500 cursor-not-allowed mt-3">
                        Verified
                      </p>
                    ) : isShowInputId == ele._id ? (
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
                          onClick={() => verifyCoin(ele._id)}
                        />{" "}
                        <MdClose
                          className=" m-2 text-3xl text-red-700 cursor-pointer hover:text-white hover:bg-red-700 rounded-full"
                          onClick={closedInput}
                        />
                      </div>
                    ) : (
                      <p
                        className="bg-blue-600 text-white p-2 rounded-md cursor-pointer"
                        onClick={() => openInput(ele._id)}
                      >
                        Verify Now
                      </p>
                    )}
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

export default UserCoinLists;
