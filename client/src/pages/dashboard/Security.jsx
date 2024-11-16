import { useForm } from "react-hook-form";
import DashboardLayout from "./DashboardLayout";
import { useDispatch } from "react-redux";
import { ChangePassword } from "../../redux/features/auth/auth.action";
import { useNavigate } from "react-router-dom";

function Security() {
  return <DashboardLayout layout={<Layout />} />;
}

function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register: registerPwd,
    handleSubmit: handleSubmitPwd,
    formState: { errors: errorsPwd },
  } = useForm();

  const passwordEdit = (data) => {
    dispatch(
      ChangePassword({
        ...data,
        navigate,
      })
    );
  };

  return (
    <section className=" pb-28  ">
      <h2 className="head--two  text-white">Security</h2>
      {/* Security Form Start */}
      <form
        className="max-w-[600px]  pb-24"
        onSubmit={handleSubmitPwd(passwordEdit)}
      >
        <div className="relative">
          <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 text-md translate-x-3 translate-y-3">
            Old Password
          </p>
          <input
            className="mt-3 lg:mt-0 text-text-clr text-fnt-b md:text-fnt-c border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none"
            type="password"
            placeholder="Old Password"
            {...registerPwd("oldpassword", {
              required: "This field is required",
            })}
          />
          <p className="text-red-400 font-medium">
            {errorsPwd.oldpassword?.message}
          </p>
        </div>
        {/*  */}
        <div className="relative">
          <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 text-md translate-x-3 translate-y-3">
            New Password
          </p>
          <input
            className="mt-3 lg:mt-0 text-text-clr text-fnt-b md:text-fnt-c border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none"
            type="password"
            placeholder="New Password"
            {...registerPwd("newpassword", {
              required: "This field is required",
            })}
          />
          <p className="text-red-400 font-medium">
            {errorsPwd.newpassword?.message}
          </p>
        </div>
        {/*  */}
        <div className="relative">
          <p className="hidden lg:block bg-light-dark-clr text-[rgba(255,255,255,.3)] w-max px-2 text-md translate-x-3 translate-y-3">
            Confirm New Password
          </p>
          <input
            className="mt-3 lg:mt-0 text-text-clr text-fnt-b md:text-fnt-c border border-[#515768] bg-transparent rounded-md p-3 w-full placeholder:text-[#5f636a] focus:outline-none focus-visible:outline-none"
            type="password"
            placeholder="Confirm Password"
            {...registerPwd("confirmpassword", {
              required: "This field is required",
            })}
          />
          <p className="text-red-400 font-medium">
            {errorsPwd.confirmpassword?.message}
          </p>
        </div>
        {/*  */}
        <button className="text-text-clr flex items-center gap-5 justify-center rounded-md text-fnt-b lg:text-fnt-c font-bold p-3 bg-btn-clr w-full mt-4">
          Change Password
        </button>
      </form>
      {/* Security Details Form End */}
    </section>
  );
}

export default Security;
