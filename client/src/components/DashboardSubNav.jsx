import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function DashboardSubNav() {
  const { pathname } = useLocation();

  return (
    <div className="max-w-[700px] overflow-auto">
      <div className="bg-light-bg-clr flex gap-7 items-center min-w-min rounded-md text-text-clr font-semibold text-fnt-c py-2 px-3 overflow-auto">
        <Link
          to="/withdraw"
          className={`py-3 px-3 ${
            pathname === "/withdraw" && "bg-[#212634]"
          } hover:bg-[#212634] rounded-sm text-fnt-b md:text-fnt-c`}
        >
          Withdrawal
        </Link>
        <Link
          to="/deposit"
          className={`py-3 px-3 ${
            pathname === "/deposit" && "bg-[#212634]"
          } hover:bg-[#212634] rounded-sm text-fnt-b md:text-fnt-c`}
        >
          Deposit
        </Link>
        <Link
          to="/transaction"
          className={`py-3 px-3 ${
            pathname === "/transaction" && "bg-[#212634]"
          } hover:bg-[#212634] rounded-sm text-fnt-b md:text-fnt-c`}
        >
          Transactions
        </Link>
        <Link
          to="/trade"
          className={`py-3 px-3 ${
            pathname === "/trade" && "bg-[#212634]"
          }  hover:bg-[#212634] rounded-sm text-fnt-b md:text-fnt-c`}
        >
          Trades
        </Link>
        <Link
          to="/account"
          className={`py-3 px-3 ${
            pathname === "/account" && "bg-[#212634]"
          }  hover:bg-[#212634] rounded-sm text-fnt-b md:text-fnt-c`}
        >
          Account
        </Link>
      </div>
    </div>
  );
}

export default DashboardSubNav;
