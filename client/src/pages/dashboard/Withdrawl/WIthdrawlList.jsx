import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllWithdrawlCoin,
  ReleaseWithdrawlAmount,
} from "../../../redux/features/withdrawl/withdrawl.action";
import { toast } from "react-toastify";
import PageHeader from "../../../components/ui/PageHeader";
import { GetAllUser } from "../../../redux/features/auth/auth.action";

const WIthdrawlList = () => {
  const { withdrwal } = useSelector((state) => state.withdrawl);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const headings = [
    { key: "SN", value: "SN" },
    { key: "User ID", value: "User Id`" },
    { key: "Currency ID", value: "Currency ID" },
    { key: "Network ID", value: "Network ID" },
    { key: "Amount", value: "Amount" },
    { key: "Wallet Address", value: "Wallet Address" },
    { key: "Status", value: "Status" },
    { key: "Created At", value: "Created At" },
    { key: "Action", value: "Action" },
  ];
  useEffect(() => {
    dispatch(GetAllWithdrawlCoin());
    dispatch(GetAllUser());
  }, [dispatch]);

  const ReleaseAmount = (id) => {
    dispatch(ReleaseWithdrawlAmount({ _id: id }));
  };

  return (
    <>
      <PageHeader header={"User Coin Withdrawls"} />
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
            {withdrwal?.map((kyc, i) => (
              <tr key={kyc._id}>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {i + 1}
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  <p className="text-green-600 capitalize">
                  {user.map(
                    (ele) => ele._id === kyc.user_id.toString() && ele.fullName
                  )}
                  </p>
                  <span className="opacity-50">{kyc.user_id}</span>
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {kyc.curencyId}
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {kyc.networkId}
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  ${kyc.coin}
                </td>
                <td
                  className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(kyc.wallet_address);
                    toast.info("User Wallet copy Copied Successfully!");
                  }}
                >
                  <p className="opacity-20">CLick to copy Address</p>
                  {kyc.wallet_address}
                </td>

                <td>
                  <p
                    className={` ${
                      kyc.isRelease
                        ? "m-1 bg-yellow-100 text-yellow-900 *: p-1 rounded-md px-2 "
                        : "m-1 bg-red-950 text-red-600 *: p-1 rounded-md px-2"
                    } bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs`}
                  >
                    {kyc.isRelease ? "Success" : "Pending"}
                  </p>
                </td>

                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {kyc.created_at}
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {kyc.isRelease ? (
                    <p className="text-green-500 cursor-not-allowed mt-3">
                      Release
                    </p>
                  ) : (
                    <p
                      className="bg-blue-600 text-white p-2 rounded-md cursor-pointer"
                      onClick={() => ReleaseAmount(kyc._id)}
                    >
                      Release Now
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

export default WIthdrawlList;
