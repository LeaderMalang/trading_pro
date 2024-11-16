import { useState } from "react";
import PropTypes from "prop-types";
import { GiTrade } from "react-icons/gi";
import {
  Dialog,
  DialogTitle,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import SingleTrade from "../../pages/dashboard/Admin/trade/SingleTrade";

const ViewTrade = ({ data }) => {
  const [isTradeModalOpen, setTradeModalOpen] = useState(false);

  const openTradeModal = () => {
    setTradeModalOpen(true);
  };

  const closeTradeModal = () => {
    setTradeModalOpen(false);
  };

  return (
    <>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
          <GiTrade aria-hidden="true" className="h-6 w-6 text-green-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <div className="flex justify-between">
            <DialogTitle
              as="h3"
              className="text-base font-semibold leading-6 text-gray-900 capitalize"
            >
              {data.actionType} ({data.history[0].action})
            </DialogTitle>
            <td
              className={`${
                data.history[0].isHold === true
                  ? "text-yellow-600 rounded-full font-medium"
                  : "text-green-400 rounded-full font-medium"
              } px-4`}
            >
              {data.history[0].isHold === true ? "Pending" : "Approved"}
            </td>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Currency : {data.history[0].currency}
            </p>
            <p className="text-sm text-gray-500">
              Amount ($) : {data.history[0].amount}
            </p>
            <p className="text-sm text-gray-500">
              Time Frame : {data.history[0].timeFrame}
            </p>
            <button
              onClick={openTradeModal}
              className="mt-3 py-2 px-3 flex gap-1 items-center text-text-clr font-medium rounded-md text-fnt-b md:text-fnt-c bg-[green]"
            >
              View Trade
            </button>
          </div>
        </div>
      </div>

      {/* SingleTrade Modal */}
      {isTradeModalOpen && (
        <Dialog
          open={isTradeModalOpen}
          onClose={closeTradeModal}
          className="relative z-20"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-gray-500 text-left shadow-xl transition-all min-w-[250px] max-w-[450px] w-[50%]">
                <div className="bg-gray-500 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <SingleTrade trade={data.history[0]} />
                </div>
                <div className="bg-gray-500 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={closeTradeModal}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};

ViewTrade.propTypes = {
  data: PropTypes.any,
};

export default ViewTrade;
