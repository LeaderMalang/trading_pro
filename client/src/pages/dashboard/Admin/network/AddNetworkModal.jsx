import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  AddNetwork,
  getAllNetwork,
} from "../../../../redux/features/network/network.action";

const AddNetworkModal = ({ btnName }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [networkName, setNetworkName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletImage, setWalletImage] = useState(null);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addNetwork = () => {
    if (networkName == "" || walletAddress == "" || walletImage == null) {
      toast.info("All Feild are required!");
    } else {
      dispatch(
        AddNetwork({
          network_name: networkName,
          wallet_address: walletAddress,
          networkImg: walletImage,
        })
      );
      dispatch(getAllNetwork());
    }
  };
  return (
    <>
      <div>
        <button onClick={openModal}>{btnName}</button>
      </div>

      {showModal && (
        <div
          className="fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
          style={{ background: "rgba(0,0,0,.7)" }}
        >
          <div className="border border-teal-500   modal-container bg-white w-11/12 md:max-w-[700px] mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className=" py-4 text-left px-6">
              <p className="text-black underline">Add Netwok</p>
              <div className="my-5">
                <div className="my-5">
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Enter Network Name"
                    variant="outlined"
                    sx={{ width: 650 }}
                    value={networkName}
                    onChange={(e) => setNetworkName(e.target.value)}
                  />
                </div>
                <div className="my-5">
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Enter  Wallet Address For Network"
                    variant="outlined"
                    sx={{ width: 650 }}
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                  />
                </div>
                <div className="my-5 text-black">
                  <p>Upload Amount Network Image</p>
                  <input
                    type="file"
                    className="border  p-2 rounded-md"
                    name="walletImage"
                    onChange={(e) => {
                      const file = e.currentTarget.files[0];
                      console.log(file);
                      setWalletImage(file);
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  className="focus:outline-none modal-close px-4 bg-[red] p-3 rounded-lg text-black hover:bg-red-900"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="focus:outline-none px-4 bg-[green] p-3 ml-3 rounded-lg text-white hover:bg-green-900"
                  onClick={addNetwork}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNetworkModal;
