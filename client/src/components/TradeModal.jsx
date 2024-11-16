"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import PropTypes from "prop-types";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaBitcoin } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useDispatch } from "react-redux";
import { TradeNow } from "../redux/features/trade/trade.action";

export default function TradeModal({ btn_name, details, isOpen }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const openModal = () => {
    setOpen(!open);
  };

  const tradeNow = () => {
    dispatch(
      TradeNow({
        ...details,
        currency: localStorage.getItem("tradeCoin") || "BTC",
      })
    );
  };
  return (
    <>
      
      <p onClick={openModal}>{btn_name}</p>{" "}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex justify-center items-center">
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-[#14171F] text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              {/* <p className="text-xl text-green-700 text-center  uppercase pt-2 ">
                {" "}
                trade / {details.type}
              </p> */}
              <div className="bg-[#14171F] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                {isOpen ? (
                  <>
                    {" "}
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <BsGraphUpArrow
                          aria-hidden="true"
                          className="h-6 w-6 text-green-600"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6 text-white underline"
                        >
                          Trade Info
                        </DialogTitle>
                        <div className="mt-2 text-black">
                          <ul>
                            <spna className="flex gap-2 my-1">
                              <FaBitcoin className="bg-blue-600 text-white text-3xl  rounded-full " />
                              <span className="opacity-50 px-3 text-white">
                                Currency :{" "}
                              </span>
                              <li className="text-white">
                                {localStorage.getItem("tradeCoin")}
                              </li>
                            </spna>
                            <spna className="flex gap-2 my-1">
                              <MdOutlineAttachMoney className="bg-red-600 text-white text-3xl p-1 rounded-full" />
                              <span className="opacity-50 px-3 text-white">
                                Amount($) :{" "}
                              </span>
                              <li className="text-white">{details?.amount}</li>
                            </spna>
                            <spna className="flex gap-2 my-1">
                              <IoTimeOutline className="bg-green-600 text-white text-3xl p-1 rounded-full" />
                              <span className="opacity-50 px-3 text-white">
                                Time Frame :{" "}
                              </span>
                              <li className="text-white">
                                {details?.timeFrame}{" "}
                              </li>
                            </spna>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="m-2">
                        <p
                          type="button"
                          data-autofocus
                          onClick={() => setOpen(false)}
                          className=" bg-red-800 text-white px-3 py-1 text-xl rounded-md cursor-pointer "
                        >
                          Cancel
                        </p>
                      </div>
                      <div className="m-2">
                        <p
                          type="button"
                          data-autofocus
                          onClick={() => {
                            setOpen(false);
                            tradeNow();
                          }}
                          className="bg-green-800 text-white px-3 py-1 text-xl rounded-md cursor-pointer"
                        >
                          Buy {details.action}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p>Invalid Trade please recheck the trade.</p>
                  </>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
TradeModal.propTypes = {
  btn_name: PropTypes.string.isRequired,
  details: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    timeFrame: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
  }).isRequired,
  action: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
