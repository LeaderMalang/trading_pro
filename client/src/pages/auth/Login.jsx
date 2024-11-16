// import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginAuth } from "../../redux/features/auth/auth.action";
import { useState } from "react";
import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function loginSubmit() {
    if (email === "" && password === "") {
      toast.error("Feilds cannot be null!");
    } else {
      const res = await dispatch(LoginAuth({ email, password, navigate }));
      console.log(res);
    }
  }

  return (
    <section className="auth_sec bg-voilet-dark p-[1rem] lg:p-[5rem] pt-[7rem] h-screen font-poppins">
      <h1 className="text-fnt-c lg:text-fnt-e text-text-clr font-extrabold text-center mb-7">
        Sign In To Your Account
      </h1>
      <div className="bg-[#444b5d] max-w-[34rem] py-[1.4rem] px-[1rem] rounded-lg mx-auto lg:px-[4rem]">
        <div className="bg-[#575d6e] rounded-md w-max px-2 py-2 mx-auto flex">
          <div className="text-text-clr data-[state=active]:text-sm loginTab active p-3">
            <Link
              to="/login"
              className={`text-text-clr  text-fnt-b lg:text-fnt-c font-bold px-2`}
            >
              Login
            </Link>
          </div>
          <div className="registerTab p-3">
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
          {/* Login Form Start */}
          <div className="text-text-clr">
            <div className="relative">
              <p className="hidden lg:block bg-[#444b5d] text-white w-max px-2 m-0 text-md translate-x-3 translate-y-3">
                Email
              </p>
              <input
                className="text-text-clr text-xl border border-white bg-transparent rounded-md p-3  w-full placeholder:text-[#8f98a7] focus:outline-none focus-visible:outline-none"
                type="email"
                placeholder="john@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <p className="hidden lg:block bg-[#444b5d] text-white w-max px-2 m-0 text-md translate-x-3 translate-y-5">
                Password
              </p>
              <input
                className="text-text-clr text-xl border border-white bg-transparent rounded-md p-3 mt-2 w-full placeholder:text-[#8f98a7] focus:outline-none focus-visible:outline-none"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between py-7">
              <div className="flex gap-3">
                <input
                  className="w-8"
                  type="checkbox"
                  name="remember"
                  id="remember"
                />
                <label
                  htmlFor="remember"
                  className="text-fnt-b lg:text-fnt-c font-medium"
                >
                  Remember me
                </label>
              </div>
              {/* <a
                href="#"
                className="text-success-clr font-bold text-fnt-b lg:text-fnt-c"
              >
                Forgot your password?
              </a> */}
            </div>

            <div
              className="flex items-center gap-5 justify-center rounded-md text-fnt-b lg:text-fnt-c font-bold p-5 bg-success-clr w-full cursor-pointer"
              onClick={loginSubmit}
            >
              Sign in
              {/* <FaArrowRightLong className="p-2 text-fnt-e bg-[#0faf5a62] rounded-full" /> */}
            </div>
            {/* </form> */}
          </div>
          {/* Login Form End*/}
        </div>
      </div>
    </section>
  );
}

export default Login;
