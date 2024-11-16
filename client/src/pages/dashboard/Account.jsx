import DashboardLayout from "./DashboardLayout";
// import DashboardSubNav from "../../components/DashboardSubNav";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  GetProgile,
  GetSingleDocs,
  VerifyProfile,
} from "../../redux/features/auth/auth.action";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCopy } from "react-icons/fa";
import SubNavBar from "../../components/SubNavBar";
// import { FaRegEdit } from "react-icons/fa";

function Account() {
  return <DashboardLayout layout={<AccountSection />} />;
}

// Account Page Section Start
function AccountSection() {
  const { loginUser, docs } = useSelector((state) => state.auth);
  const {
    formState: { errors },
  } = useForm();
  const {
    register: registerDoc,
    handleSubmit: handleSubmitDoc,
    formState: { errors: errorsDoc },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitDocument = (data) => {
    console.log(data);
    dispatch(
      VerifyProfile({
        ...data,
        navigate,
      })
    );
  };

  useEffect(() => {
    dispatch(GetProgile());
    dispatch(GetSingleDocs());
  }, [dispatch]);

  return (
    <section className="bg-voilet-dark p-3 rounded-md">
      <SubNavBar title={"User Account"} />
      {/* <div className="flex gap-5 flex-wrap justify-between items-center p-5">
         
        <h2 className="head--two text-white">User Account</h2>
        <div className="flex flex-wrap gap-14 text-left lg:text-right me-4">
          <div>
            <p className="text-sm md:text-base lg:text-lg font-medium text-light-text-clr">
              My current currency
            </p>
            <p className="text-sm md:text-base lg:text-lg font-bold text-text-clr">
              {loginUser?.currency} &nbsp;{""}
              <span className="bg-success-clr text-text-clr text-sm md:text-base lg:text-lg font-semibold p-1 rounded hover:cursor-pointer">
                change
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm md:text-base lg:text-lg font-medium text-light-text-clr">
              Available for withdrawal
            </p>
            <p className="text-sm md:text-base lg:text-lg font-bold text-text-clr">
              {loginUser?.coin?.toFixed(2)}$
            </p>
          </div>
          <div>
            <p className="text-sm md:text-base lg:text-lg font-medium text-light-text-clr">
              In the account
            </p>
            <p className="text-sm md:text-base lg:text-lg font-bold text-text-clr">
              {" "}
              {loginUser?.coin?.toFixed(2)}$
            </p>
          </div>
        </div>
      </div> */}
      {/* Account Form Section Start */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 ${
          loginUser?.kyc_status ? "lg:grid-cols-2 " : "lg:grid-cols-3 "
        } justify-center`}
      >
        <div className="border-xl border-white text-white">
          <div>
            <img
              src="https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png"
              alt={loginUser?.userName}
              className="w-[70px] h-[70px] rounded-full bg-white"
            />
            <div className="flex">
              <p className="py-2 text-sm md:text-base lg:text-lg">
                User Name : {loginUser?.fullName}
              </p>
              {loginUser?.kyc_status ? (
                <span className="m-1 bg-green-950 text-green-600 *: p-1 rounded-md px-2 text-sm md:text-base lg:text-lg">
                  Verified
                </span>
              ) : (
                <span className="m-1 bg-red-950 text-red-600 *: p-1 rounded-md px-2 text-sm md:text-base lg:text-lg">
                  Not Verified
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <p className="py-2 text-sm md:text-base lg:text-lg">
                UID :{loginUser?.u_id}
              </p>
              <FaCopy
                className="my-2 hover:text-[blue] cursor-pointer text-xl"
                onClick={() => {
                  navigator.clipboard.writeText(loginUser?.u_id);
                  toast.info("User ID Copied Successfully!");
                }}
              />
            </div>

            <p className="py-2 text-sm md:text-base lg:text-lg">
              Email : {loginUser?.account}
            </p>
            <p className="text-sm md:text-base lg:text-lg">
              Remaining Amount : ${loginUser?.coin?.toFixed(2)}
            </p>
          </div>
        </div>
        {/* Account Details Form End */}
        {!docs?.isVerify ? (
          <form
            onSubmit={handleSubmitDoc(submitDocument)}
            className="max-w-[600px] py-6 px-8"
          >
            <h3 className="text-text-clr text-sm md:text-base lg:text-lg">
              Documents verification:
            </h3>
            <select
              className="mt-7 text-text-clr text-sm md:text-base  lg:text-lg border border-[#515768] bg-transparent rounded-md p-3 w-full focus:outline-none focus-visible:outline-none"
              name="document_type"
              id="document_type"
              {...registerDoc("document_type", {
                required: "This field is required",
              })}
            >
              <option
                className="bg-light-dark-clr text-sm md:text-base lg:text-lg"
                value=""
              >
                Select document type
              </option>
              <option
                className="bg-light-dark-clr text-sm md:text-base lg:text-lg"
                value="passport"
              >
                Passport
              </option>
              <option
                className="bg-light-dark-clr text-sm md:text-base lg:text-lg"
                value="citizenship"
              >
                Citizenship
              </option>
            </select>
            <p className="text-red-400 font-medium">
              {errorsDoc.document_type?.message}
            </p>
            {/*  */}
            <div className="relative">
              <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 text-md translate-x-3 translate-y-3 text-sm md:text-base lg:text-lg">
                Upload front side of you document
              </p>
              <input
                className="mt-3 lg:mt-0 text-text-clr text-sm md:text-base   lg:text-lg border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none"
                type="file"
                {...registerDoc("document_front", {
                  required: "This field is required",
                })}
              />
              <p className="text-red-400 font-medium text-sm md:text-base lg:text-lg">
                {errorsDoc.document_front?.message}
              </p>
            </div>
            {/*  */}
            {/*  */}
            <div className="relative">
              <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 text-md translate-x-3 translate-y-3 text-sm md:text-base lg:text-lg">
                Upload back side of you document
              </p>
              <input
                className="mt-3 lg:mt-0 text-text-clr text-sm md:text-base lg:text-lg border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none"
                type="file"
                {...registerDoc("document_back", {
                  required: "This field is required",
                })}
              />
              <p className="text-red-400 font-medium text-sm md:text-base lg:text-lg">
                {errorsDoc.document_back?.message}
              </p>
            </div>
            {/*  */}

            <input
              placeholder="Document number"
              className="mt-5 text-text-clr text-sm md:text-base lg:text-lg border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none"
              type="text"
              {...registerDoc("doc_number", {
                required: "This field is required",
              })}
            />
            <p className="text-red-400 font-medium">
              {errorsDoc.doc_number?.message}
            </p>
            <button className="text-text-clr flex items-center gap-5 justify-center rounded-md text-sm md:text-base lg:text-lg font-bold p-3 bg-btn-clr w-full mt-4">
              Submit Document
            </button>
          </form>
        ) : docs.isVerify ? (
          <div className="">
            <p className="  bg-[green] text-white py-2 rounded-md text-text-center px-2  text-sm md:text-base lg:text-lg">
              You are Successfully Verified now. Happy trade.
            </p>
          </div>
        ) : (
          <div className="">
            <p className="  bg-[red] text-white py-2 rounded-md text-text-center px-2  text-sm md:text-base lg:text-lg">
              You Document verification is pending. Please wait for Admin
              verification.
            </p>
          </div>
        )}
      </div>
      {/* Account Form Section End */}
    </section>
  );
}

// Account Page Section End

export default Account;
