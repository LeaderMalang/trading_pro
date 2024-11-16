import { useEffect, useState } from "react";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { LuPackageOpen } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { GetTradeByUser } from "../../redux/features/trade/trade.action";
import TradeModal from "../../components/TradeModal";
import { Link } from "react-router-dom";
import { GetProgile } from "../../redux/features/auth/auth.action";
import { toast } from "react-hot-toast";
import Modal from "../../components/layout/Modal";
import SingleTrade from "./Admin/trade/SingleTrade";

function BuySellSidebar() {
  const { userTrades } = useSelector((state) => state.trade);
  const { loginUser } = useSelector((state) => state.auth);

  const investmentData = ["10", "500", "1000", "4500", "7000"];
  const timeData = ["60s", "120s", "180s", "360s", "720s"];

  const [investment, setInvestment] = useState("");
  const [time, setTime] = useState("");
  const [isOpen, setOpen] = useState(true);
  const [countdown, setCountdown] = useState(null);

  const dispatch = useDispatch();

  const validateTrade = () => {
    if (!time || !investment) {
      toast.error("All Fields are required!");
      return setOpen(false);
    } else if (investment === 0) {
      setOpen(false);
      return toast.error("Please check your investment amount once.");
    } else if (loginUser.coin <= investment) {
      toast.error(
        "You don't have enough coins for Trade. Please deposit more coins for trade."
      );
      return setOpen(false);
    }

    setOpen(true);
    const timeInSeconds = parseInt(time.replace("s", "")) || 0;
    setCountdown(timeInSeconds);
  };

  useEffect(() => {
    dispatch(GetTradeByUser());
    dispatch(GetProgile());
  }, [dispatch]);

  useEffect(() => {
    let interval;
    if (countdown !== null && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);

  const openModal = (trade) => {
    setSelectedTrade(trade);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTrade(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-light-dark-clr mb-24 md:mb-0 px-7 md:px-3 w-full tabletSize:w-64 rounded-md flex-shrink-0 overflow-y-auto h-fit text-sm md:text-base lg:text-lg">
      <h4 className="text-text-clr font-semibold font-poppins">Trade Now</h4>

      <ul className="flex gap-2 flex-wrap mt-3 transition-all">
        {timeData.map((el, index) => (
          <li
            onClick={() => setTime(el)}
            className={`py-2 px-3 w-max gap-1 items-center text-text-clr font-medium rounded-md bg-dark-clr cursor-pointer text-sm md:text-base lg:text-lg hover:bg-dark-hover transition-colors duration-200 ${
              time === el ? "ring-2 ring-light-text-clr" : ""
            }`}
            key={index}
          >
            {el}
          </li>
        ))}
      </ul>

      <fieldset className="relative mt-6 flex px-3 py-2 rounded-md items-center border border-text-clr">
        <legend className="bg-light-dark-clr px-1 text-text-clr">Time</legend>
        <input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          type="text"
          className="w-full bg-inherit text-text-clr focus:outline-none text-left text-sm md:text-base lg:text-lg"
        />
      </fieldset>

      <ul className="flex flex-wrap gap-2 mt-6">
        {investmentData.map((el, index) => (
          <p
            onClick={() => setInvestment(el)}
            key={index}
            className={`py-2 px-3 w-max gap-1 items-center text-text-clr font-medium rounded-md text-fnt-b md:text-fnt-c bg-dark-clr cursor-pointer hover:bg-dark-hover transition-colors duration-200 ${
              investment === el ? "ring-2 ring-light-text-clr" : ""
            }`}
          >
            ${el}
          </p>
        ))}
      </ul>

      <fieldset className="relative mt-6 flex px-3 py-2 rounded-md items-center border border-text-clr">
        <legend className="bg-light-dark-clr px-1 text-text-clr">
          Investment
        </legend>
        <input
          value={investment}
          onChange={(e) => setInvestment(Number(e.target.value))}
          type="text"
          className="w-full bg-inherit text-text-clr focus:outline-none text-start text-sm md:text-base lg:text-lg"
        />
      </fieldset>

      <span className="text-text-clr mt-3 inline-block bg-[#14171F] px-2 py-1 rounded-md font-semibold">
        Total Trade: ${investment}
      </span>

      <TradeModal
        btn_name={
          <button
            className="text-text-clr flex items-center mt-3 justify-between bg-success-clr py-2 px-4 rounded-md w-full hover:shadow-lg transition-transform duration-200 transform hover:scale-105"
            onClick={validateTrade}
          >
            Up
            <BiUpArrowAlt className="text-2xl" />
          </button>
        }
        details={{ timeFrame: time, amount: investment, action: "up" }}
        isOpen={isOpen}
      />
      <TradeModal
        btn_name={
          <button
            className="text-text-clr flex items-center mt-3 justify-between bg-danger-clr py-2 px-4 rounded-md w-full hover:shadow-lg transition-transform duration-200 transform hover:scale-105"
            onClick={validateTrade}
          >
            Down
            <BiDownArrowAlt className="text-2xl" />
          </button>
        }
        details={{ timeFrame: time, amount: investment, action: "down" }}
        isOpen={isOpen}
      />

      <div className="my-4 block">
        <h5 className="text-text-clr font-bold">
          Latest Trade ({userTrades?.length})
        </h5>
        {userTrades?.length === 0 ? (
          <div className="text-center">
            <div className="w-14 h-14 p-3 rounded-full bg-light-text-clr flex items-center justify-center mx-auto mt-7">
              <LuPackageOpen className="text-text-clr text-3xl" />
            </div>
            <p className="text-light-text-clr text-fnt-b mt-3">
              You don&apos;t have a trade history yet. You can open a trade
              using the form above.
            </p>
          </div>
        ) : (
          <>
            {userTrades
              ?.toReversed()
              ?.slice(0, 5)
              .map((item, i) => (
                <div
                  className="flex gap-3 m-3 transition-opacity duration-200"
                  key={i}
                >
                  <button onClick={() => openModal(item)}>
                    <p
                      className={`${
                        item.action === "up"
                          ? "bg-green-700 text-white px-3 rounded-md capitalize"
                          : "bg-red-700 text-white px-3 rounded-md capitalize"
                      }`}
                    >
                      {item.action}
                    </p>
                  </button>
                  <p className="text-white">${item.amount}</p>
                  <p className="text-white">{item.timeFrame}</p>
                </div>
              ))}
            <Link to="/transaction" className="flex justify-center">
              <p className="text-white rounded-md hover:text-green-600">
                View More
              </p>
            </Link>
          </>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedTrade && <SingleTrade trade={selectedTrade} />}
      </Modal>
    </div>
  );
}

export default BuySellSidebar;
