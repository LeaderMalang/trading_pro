import { useEffect, useState } from "react";
// import VerifyCoinModal from "./VerifyCoinModal";
import { GetAllDepositeCoin } from "../../../../redux/features/deposite/deposite.action";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteNetwork,
  getAllNetwork,
  UpdateWalletAddress,
} from "../../../../redux/features/network/network.action";
import AddNetworkModal from "./AddNetworkModal";
import PageHeader from "../../../../components/ui/PageHeader";
import { SiTicktick } from "react-icons/si";
import { MdClose, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const NetWorkList = ({ setShowImage, setImageSrc }) => {
  const { network } = useSelector((state) => state.network);
  const [isShowInputTradeId, setShowInputTradeId] = useState(null);
  const [newWalletAddress, setNewWalletAddress] = useState(null);
  const headings = [
    { key: "SN", value: "SN" },
    { key: "networkName", value: "Network Name" },
    { key: "walletAddress", value: "Wallet Address" },
    { key: "qr", value: "Q.R" },
    { key: "Date", value: "Date" },
    { key: "Action", value: "Action" },
    // { key: "Action", value: "Action" },
  ];

  function popUpImg(src) {
    setShowImage(true);
    setImageSrc(src);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetch() {
      dispatch(GetAllDepositeCoin());
      dispatch(getAllNetwork());
    }
    fetch(dispatch);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllNetwork());
  }, [dispatch]);

  const deleteNetwork = (id) => {
    dispatch(DeleteNetwork(id));
  };

  const updateWalletAddress = (id) => {
    if (!newWalletAddress) {
      toast.info("Wallet address accnot be null");
    } else {
      dispatch(
        UpdateWalletAddress({
          id,
          newWalletAddress,
        })
      );
      setShowInputTradeId(null);
      setNewWalletAddress(null);
    }
  };

  const openInput = (id) => {
    setShowInputTradeId(id);
  };

  const closedInput = () => {
    setShowInputTradeId(null);
  };
  return (
    <>
      <div className=" flex justify-between">
        <span>
          <PageHeader header={"Network"} />
        </span>
        <AddNetworkModal
          btnName={
            <button className="border p-2 bg-[green] text-white uppercase font-semibold rounded-md mt-5">
              Add Network
            </button>
          }
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
            {network?.data?.map((ele, i) => (
              <tr key={ele._id}>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {i + 1}
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {ele.network_name}
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {ele.wallet_address}
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  <img
                    src={ele.wallet_img}
                    alt={ele.network_name}
                    className="w-[50px] h-[50px] cursor-pointer"
                    onClick={() => {
                      popUpImg(ele.wallet_img);
                    }}
                  />
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  $ {ele.created_at}
                </td>
                <td className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                  {isShowInputTradeId == ele._id ? (
                    <div className="flex gap-1">
                      <input
                        value={newWalletAddress}
                        type="text"
                        placeholder="Enter New Wallet Address"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"
                        onChange={(e) => setNewWalletAddress(e.target.value)}
                      />
                      <SiTicktick
                        className=" m-2 text-3xl text-blue-700 cursor-pointer hover:text-white hover:bg-blue-700 rounded-full"
                        onClick={() => updateWalletAddress(ele._id)}
                      />{" "}
                      <MdClose
                        className=" m-2 text-3xl text-red-700 cursor-pointer hover:text-white hover:bg-red-700 rounded-full"
                        onClick={closedInput}
                      />
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <span
                        className="bg-green-600 text-white p-2 rounded-md cursor-pointer"
                        onClick={() => openInput(ele._id)}
                      >
                        Update Wallet
                      </span>
                      {/* <MdDelete
                        className="text-3xl text-red-600 bg-gray-300 rounded-full  p-1 cursor-pointer"
                        onClick={() => deleteNetwork(ele._id)}
                      /> */}
                    </div>
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

export default NetWorkList;
