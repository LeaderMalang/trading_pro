import PropTypes from "prop-types";
import { PiHandWithdrawLight } from "react-icons/pi";
import { DialogTitle } from "@headlessui/react";

const ViewWithdrawl = ({ data }) => {
  return (
    <div className="sm:flex sm:items-start">
      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
        <PiHandWithdrawLight
          aria-hidden="true"
          className="h-6 w-6 text-yellow-600"
        />
      </div>
      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <div className="flex justify-between">
          <DialogTitle
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900 capitalize"
          >
            {data.actionType} Details
          </DialogTitle>
          <td
            className={`${
              data.history[0].isRelease == true
                ? "text-green-400  rounded-full font-medium"
                : "text-yellow-600   rounded-full font-medium"
            }  px-4`}
          >
            {data.history[0].isRelease == true ? "Approved" : "Pending"}
          </td>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Currency : {data.history[0].curencyId}
          </p>
          <p className="text-sm text-gray-500">
            Amount ($) : {data.history[0].coin}
          </p>
          <p className="text-sm text-gray-500">
            Network : {data.history[0].networkId} (
            {data.history[0].wallet_address})
          </p>
        </div>
      </div>
    </div>
  );
};

ViewWithdrawl.propTypes = {
  data: PropTypes.any,
};

export default ViewWithdrawl;