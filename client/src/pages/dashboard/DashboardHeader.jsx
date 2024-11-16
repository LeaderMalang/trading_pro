import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetProgile } from "../../redux/features/auth/auth.action";

function Header() {
  const { loginUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      dispatch(GetProgile());
    }
    fetchData();
  }, [dispatch]);
  return (
    <div className="flex  justify-end h-20 bg-light-dark-clr w-full py-5 px-7 gap-6 text-sm md:text-base lg:text-lg rounded-lg mt-2">
      {/* <figure className="grid items-center bg-light-bg-clr py-2 px-3 w-max rounded-md">
        <FaBell className="text-text-clr" />
      </figure> */}

      <div className="py-2 px-3 flex gap-1 items-center bg-dark-clr text-text-clr font-medium rounded-md">
        <RiAccountPinBoxLine className="text-2xl text-success-clr " />
        <div>
          {/* <p className="hidden md:block leading-[0.7] text-fnt-b text-light-text-clr">coin</p> */}
          <p>${loginUser?.coin?.toFixed(2) || 0}</p>
        </div>
      </div>

      <Link to="/deposit" className="py-2 px-3 flex gap-1 items-center bg-success-clr text-text-clr font-medium rounded-md">
        <FaPlus />
        Deposit
      </Link>
      <Link to="/withdraw" className="py-2 px-3 flex gap-1 items-center bg-light-bg-clr text-text-clr font-medium rounded-md">
        Widthdrawal
      </Link>
    </div>
  );
}

export default Header;
