import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  GetAllTrades,
  UpdateTradeAmount,
} from "../../../../redux/features/trade/trade.action";

const UpdateTradeModal = ({ btnName, trade_id }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const updateTradeAmount = () => {
    if (percentage == "") {
      toast.info("All Feild are required!");
    } else {
      dispatch(
        UpdateTradeAmount({
          percentage: percentage,
          tradebuy_id: trade_id,
        })
      );
      dispatch(GetAllTrades());
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
              <p className="text-black underline">Update Trade Amount</p>
              <div className="my-5">
                <div className="my-5">
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Enter Percentage"
                    variant="outlined"
                    sx={{ width: 650 }}
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
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
                  onClick={updateTradeAmount}
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

export default UpdateTradeModal;
