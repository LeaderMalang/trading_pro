// import { FaRegIdCard } from "react-icons/fa"
// import { IoMdLogIn } from "react-icons/io"
import { MdOutlineDashboard } from "react-icons/md"
import { Link } from "react-router-dom"

function Header() {
  const user_token = localStorage.getItem("AUTH-TOKEN");
    return (
        <header className="sec_max-width flex items-center justify-between pt-7">
            <div>
                <figure>
                    {/* <img className="w-[140px]" src="../src/assets/main-logo.jpg" alt="" /> */}
                </figure>
            </div>
            <div>
                    {!user_token ? (
                    <div className="flex gap-4 justify-end">
                    <Link to={"/login"}>
                        <button className="rounded-md  bg-primary-clr px-8 py-2  font-semibold text-[18px] hover:bg-green-700">
                        Login
                        {/* <IoMdLogIn className="text-[2rem]" /> */}
                        </button>
                    </Link>
                    <Link to={"/register"}>
                        <button className="rounded-md  bg-primary-clr px-8 py-2  font-semibold text-[18px] hover:bg-green-700">
                        Signup
                        {/* <IoMdLogIn className="text-[2rem]" /> */}
                        </button>
                    </Link>


                    </div>
                ) : (
                    <div className="flex justify-end mx-2">
                    <Link
                        to="/trade"
                        className="rounded-md flex items-center bg-primary-clr px-8 py-2  font-semibold text-2xl lg:text-xl hover:bg-green-700"
                    >
                        <p className="px-2 inline">Dashboard</p>
                        <p className="mr-2 text-2xl  ">
                        <MdOutlineDashboard />
                        </p>
                    </Link>
                    </div>
                )}
            </div>

        </header>
    )
}

export default Header



