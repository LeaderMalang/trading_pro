import { useForm } from "react-hook-form";
// import { FaArrowRightLong } from "react-icons/fa6";
import CountrySelect from "./CountrySelect";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RegisterAuth } from "../../redux/features/auth/auth.action";

function Login() {
  const { register, handleSubmit, control, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function registerSubmit(data) {
    dispatch(RegisterAuth({ data, navigate }));
  }

  return (
    <section className="auth_sec bg-voilet-dark p-[1rem] lg:p-[5rem] pt-[7rem] min-h-screen font-poppins">
      <h1 className="text-fnt-c lg:text-fnt-e text-text-clr font-extrabold text-center mb-7">
        Register New Account
      </h1>
      <div className="bg-[#444b5d] max-w-[34rem] py-[1.4rem] px-[1rem] lg:px-[4rem]  rounded-lg mx-auto">
        <div className="bg-[#575d6e] rounded-md w-max px-2 py-2 mx-auto flex">
          <div className="text-text-clr loginTab p-3">
            <Link
              to="/login"
              className={`text-text-clr text-fnt-b lg:text-fnt-c font-bold px-2`}
            >
              Login
            </Link>
          </div>
          <div className="registerTab active p-3">
            <Link
              to="/register"
              className="text-text-clr text-fnt-b lg:text-fnt-c font-bold px-2"
            >
              Registration
            </Link>
          </div>
        </div>
        <div className="bg-[#515768] w-full h-[1px] my-11"></div>
        <div>
          {/* Signup Form Start */}
          <div className="text-text-clr" value="register">
            <form onSubmit={handleSubmit(registerSubmit)}>
              <CountrySelect control={control} />
              {/* <CurrencySelect control={control} /> */}
              <div className="relative">
                <p className="hidden lg:block  bg-[#444b5d] text-white w-max px-2 text-md translate-x-3 translate-y-3">
                  Full Name
                </p>
                <input
                  className="mt-3 lg:mt-0 text-text-clr text-xl border border-white bg-transparent rounded-md p-3  w-full placeholder:text-#8f98a7 focus:outline-none focus-visible:outline-none"
                  type="text"
                  placeholder="Full Name"
                  {...register("nickName", {
                    required: "This field is required",
                    pattern: {
                      message: "Please provide valid Name",
                    },
                  })}
                />
                <p className="text-red-400 font-medium">
                  {errors?.email?.message}
                </p>
              </div>
              <div className="relative">
                <p className="hidden lg:block  bg-[#444b5d] text-white w-max px-2 text-md translate-x-3 translate-y-3">
                  Email
                </p>
                <input
                  className="mt-3 lg:mt-0 text-text-clr text-xl border border-white bg-transparent rounded-md p-3  w-full placeholder:text-#8f98a7 focus:outline-none focus-visible:outline-none"
                  type="text"
                  placeholder="Email"
                  {...register("email", {
                    required: "This field is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please provide valid email",
                    },
                  })}
                />
                <p className="text-red-400 font-medium">
                  {errors?.email?.message}
                </p>
              </div>

              <div className="relative">
                <p className="hidden lg:block bg-[#444b5d] text-white w-max px-2 m-0 text-md translate-x-3 translate-y-5">
                  Password
                </p>
                <input
                  className="text-text-clr text-xl border border-white bg-transparent rounded-md p-3 mt-2 w-full placeholder:text-[#8f98a7] focus:outline-none focus-visible:outline-none"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 8,
                      message: "Please input at least 8 characters",
                    },
                  })}
                />
                <p className="text-red-400 font-medium">
                  {errors?.password?.message}
                </p>
              </div>
              <div className="">
                <div className="flex gap-3 my-6">
                  <input
                    className="w-8 h-8"
                    type="checkbox"
                    name="confirmAge"
                    id="confirmAge"
                    {...register("confirmAge", {
                      required: "This Field is required",
                    })}
                  />
                  <label
                    htmlFor="confirmAge"
                    className="font-medium text-text-clr text-fnt-b lg:text-fnt-c"
                  >
                    I confirm that I am 18 years old or older and accept Service
                    Aggrement
                  </label>
                </div>
                <p className="text-red-400 font-medium">
                  {errors?.confirmAge?.message}
                </p>
                <div className="flex gap-3 my-6">
                  <input
                    className="w-8 h-8"
                    type="checkbox"
                    name="declareCitizen"
                    id="declareCitizen"
                    {...register("declareCitizen", {
                      required: "This field is required",
                    })}
                  />
                  <label
                    htmlFor="declareCitizen"
                    className="font-medium text-text-clr text-fnt-b lg:text-fnt-c"
                  >
                    I declare and confirm that I am not a citizen or resident of
                    the US for tax purposes
                  </label>
                </div>
                <p className="text-red-400 font-medium">
                  {errors?.declareCitizen?.message}
                </p>
              </div>
              <button className="flex items-center gap-5 justify-center rounded-md text-fnt-b lg:text-fnt-c font-bold p-5 bg-success-clr w-full cursor-pointer">
                Sign Up
                {/* <FaArrowRightLong className="p-2 text-fnt-e rounded-full" /> */}
              </button>
            </form>
          </div>
          {/* Signup Form End */}
        </div>
      </div>
    </section>
  );
}

export default Login;
