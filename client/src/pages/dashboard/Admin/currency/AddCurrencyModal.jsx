import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  AddCurrency,
  getCurrency,
} from "../../../../redux/features/currency/currency.action";

const AddCurrencyModal = ({ btnName }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currencyName, setCurrencyName] = useState("");
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addNetwork = () => {
    if (currencyName == "") {
      toast.info("All Feild are required!");
    } else {
      dispatch(
        AddCurrency({
          curency_name: currencyName,
        })
      );
      dispatch(getCurrency());
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
              <p className="text-black underline">Add Currency</p>
              <div className="my-5">
                <div className="my-5">
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Enter Currency Name"
                    variant="outlined"
                    sx={{ width: 650 }}
                    value={currencyName}
                    onChange={(e) => setCurrencyName(e.target.value)}
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

export default AddCurrencyModal;
