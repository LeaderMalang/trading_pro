import { useEffect } from "react";
import { GetUserWithdrawlCoin } from "../redux/features/withdrawl/withdrawl.action";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const SubNavBar = ({ title }) => {
  const { userWithdrawls } = useSelector((state) => state.withdrawl);
  const { loginUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      dispatch(GetUserWithdrawlCoin());
    })();
  }, [dispatch]);

  return (
    <>
      <div className="flex gap-5 flex-wrap justify-between items-center p-5  bg-light-bg-clr w-full rounded-md ">
        {/* <DashboardSubNav /> */}
        <h2 className="head--two text-white text-xl md:text-2xl lg:text-3xl">
          {title}
        </h2>
        <div className="flex flex-wrap gap-14 text-left lg:text-right me-4">
          <div>
            <p className="text-fnt-b font-medium text-light-text-clr text-sm md:text-base lg:text-lg">
              My current currency
            </p>
            <p className="text-fnt-c font-bold text-text-clr text-sm md:text-base lg:text-lg pt-1">
              {"USD"} &nbsp;{" "}
            </p>
          </div>
          <div>
            <p className="text-fnt-b font-medium text-light-text-clr text-sm md:text-base lg:text-lg">
              Total Coin withdrawal
            </p>
            <p className="text-fnt-c font-bold text-text-clr text-sm md:text-base lg:text-lg">
              {userWithdrawls.reduce((acc, curr) => acc + curr?.coin, 0)}.00$
            </p>
          </div>
          <div>
            <p className="text-fnt-b font-medium text-light-text-clr text-sm md:text-base lg:text-lg">
              In the account
            </p>
            <p className="text-fnt-c font-bold text-text-clr text-sm md:text-base lg:text-lg">
              {" "}
              {loginUser?.coin}$
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubNavBar;
 