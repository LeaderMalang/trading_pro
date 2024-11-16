import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { createChart, CrosshairMode, LineStyle } from "lightweight-charts";
import { useDispatch, useSelector } from "react-redux";
import { GetTradeById } from "../../../../redux/features/trade/trade.action";

const intervals = ["1s", "1m", "3m", "5m", "15m", "30m", "1h", "4h", "1d"];

const intervalMapping = {
  "1s": "1s",
  "1m": "1m",
  "3m": "3m",
  "5m": "5m",
  "15m": "15m",
  "30m": "30m",
  "1h": "1h",
  "4h": "4h",
  "1d": "1d",
};

const SingleTrade = ({ trade }) => {
  const { singleTrade } = useSelector((state) => state.trade);
  const chartContainerRef = useRef();
  const socketRef = useRef(null);
  const candlestickSeriesRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [interval, setInterval] = useState("1m");
  const fetchHistoricalData = useCallback(
    (interval) => {
      setIsLoading(true);
      fetch(
        `https://api.binance.com/api/v3/klines?symbol=${trade.currency}&interval=${interval}&limit=100000000`
      )
        .then((res) => res.json())
        .then((data) => {
          const cdata = data.map((d) => ({
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
            time: d[0] / 1000,
          }));

          candlestickSeriesRef.current.setData(cdata);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    },
    [trade.currency]
  );

  const subscribeToWebSocket = useCallback(
    (interval) => {
      if (socketRef.current) {
        socketRef.current.close();
      }

      const streamName = intervalMapping[interval];
      const socket = new WebSocket(
        `wss://stream.binance.com:9443/ws/${trade.currency}usdt@kline_${streamName}`
      );

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const candlestick = message.k;
        const newData = {
          time: candlestick.t / 1000,
          open: parseFloat(candlestick.o),
          high: parseFloat(candlestick.h),
          low: parseFloat(candlestick.l),
          close: parseFloat(candlestick.c),
        };

        candlestickSeriesRef.current.update(newData);
      };

      socketRef.current = socket;
    },
    [trade.currency]
  );

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#212634" },
        textColor: "hsl(224, 22%, 90%)",
      },
      grid: {
        vertLines: { color: "hsl(224, 22%, 30%)" },
        horzLines: { color: "hsl(224, 22%, 30%)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        minBarSpacing: 0.05,
        rightOffset: 16,
        barSpacing: 9,
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: "rgba(225, 225, 225, 0.8)",
          width: 1,
          style: LineStyle.Dotted,
          visible: true,
          labelVisible: true,
        },
        horzLine: {
          color: "rgba(225, 225, 225, 0.8)",
          width: 1,
          style: LineStyle.Dashed,
          visible: true,
          labelVisible: true,
        },
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#0faf59",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#0faf59",
      wickDownColor: "#ef5350",
    });

    chart.priceScale("right").applyOptions({
      borderColor: "hsl(224, 22%, 80%)",
    });

    chart.timeScale().applyOptions({
      borderColor: "hsl(224, 22%, 90%)",
    });

    candlestickSeriesRef.current = candlestickSeries;

    fetchHistoricalData(interval);
    subscribeToWebSocket(interval);

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      chart.remove();
    };
  }, [interval, fetchHistoricalData, subscribeToWebSocket]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTradeById(trade._id));
  }, [dispatch, trade._id]);

  console.log({ singleTrade });

  return (
    <div className="relative w-full overflow-hidden p-4">
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-light-dark-clr z-10">
          <div className="loader"></div>
        </div>
      )}
      <div className="flex gap-4 items-start w-full overflow-auto mx-2">
        <div className="flex justify-between w-full items-center flex-wrap">
          <div className="flex  mb-3 gap-3">
            {intervals.map((int) => (
              <button
                key={int}
                onClick={() => setInterval(int)}
                className={`py-2 px-3 flex gap-1 items-center text-text-clr font-medium rounded-md text-sm md:text-base lg:text-lg ${
                  int === interval ? "bg-success-clr" : "bg-light-bg-clr"
                }`}
              >
                {int}
              </button>
            ))}
          </div>
          <h3 className="font-semibold text-1xl bg-voilet-dark p-2 px-4 text-warning-clr rounded-md text-sm md:text-base lg:text-lg mb-3">
            {trade.currency}
          </h3>
        </div>
      </div>
      <div className="flex justify-between mx-2">
        <Link to={"/trade"}>
          <button
            className={` my-2 py-2 px-3 flex gap-1 items-center text-text-clr font-medium rounded-md text-sm md:text-base lg:text-lg bg-[#2B3040] hover:bg-green-600`}
          >
            Go to Trade
          </button>
        </Link>
        <button
          className={` my-2 ${
            singleTrade.action == "up"
              ? "bg-green-700 text-white px-3 rounded-md capitalize"
              : "bg-red-700 text-white px-3 rounded-md capitalize"
          } text-sm md:text-base lg:text-lg`}
        >
          {singleTrade.action}
        </button>
      </div>

      <div
        ref={chartContainerRef}
        className="w-auto h-[60vh]  overflow-auto rounded-lg mx-2"
      />

      <section className="mt-3 mx-2">
        <p className="text-white text-xl">Trade Details</p>
        <div className="flex gap-5 overflow-auto ">
          <button
            className={`py-2 px-3 flex gap-1 items-center text-text-clr font-medium rounded-md text-sm md:text-base lg:text-lg whitespace-nowrap bg-[#2B3040]`}
          >
            Currency : {singleTrade.currency}
          </button>
          <button
            className={`py-2 px-3 flex gap-1 items-center text-text-clr font-medium rounded-md text-sm md:text-base lg:text-lg whitespace-nowrap bg-[#2B3040]`}
          >
            Trade Amount : ${singleTrade.amount}
          </button>
          <button
            className={`py-2 px-3 flex gap-1 items-center text-text-clr font-medium rounded-md text-sm md:text-base lg:text-lg whitespace-nowrap bg-[#2B3040]`}
          >
            Time Frame : {singleTrade.timeFrame}
          </button>
          <button
            className={`py-2 px-3 flex gap-1 items-center text-text-clr font-medium rounded-md text-sm md:text-base lg:text-lg whitespace-nowrap bg-[#2B3040]`}
          >
            Trade At : {new Date(singleTrade.created_at).toLocaleDateString()}
          </button>
        </div>
      </section>
      {/* <section>
        <div className=" flex justify-center my-5 ">
          <table className="  rounded-sm">
            <tr className="">
              <th className=" px-[3rem] text-white  opacity-30  text-start text-semibold">
                Coin
              </th>

              <th className=" px-[3rem] text-white  opacity-30  text-start text-semibold">
                Last End
              </th>
              <th className=" px-[3rem] text-white  opacity-30  text-start text-semibold">
                Coin Count
              </th>
              <th className=" px-[3rem] text-white  opacity-30  text-start text-semibold">
                Price
              </th>
              <th className=" px-[3rem] text-white  opacity-30  text-start text-semibold">
                1hr Chrgs
              </th>
              <th className="  px-2 text-white  opacity-30  text-start text-semibold">
                Action
              </th>
            </tr>

            {currentCoins ? (
              currentCoins?.map((ele, i) => {
                // console.log(existCoin.includes(ele.asset_id.toString()));
                return (
                  <tr key={i}>
                    <td className=" px-[3rem] text-white  opacity-90  text-start text-semibold">
                      {ele ? ele?.name : "loading"}

                      <span className="opacity-30"> {ele.asset_id}</span>
                    </td>
                    <td className=" px-[3rem] text-white  opacity-90  text-start text-semibold">
                      {ele?.data_end}
                    </td>
                    <td className=" px-[3rem] text-white  opacity-90  text-start text-semibold">
                      {ele?.data_symbols_count}
                    </td>
                    <td
                      className={`px-[3rem] text-white   opacity-90  text-start text-semibold`}
                    >
                      $ {ele.price_usd ? ele.price_usd.toFixed(2) : 0}
                    </td>
                    <td
                      className={` px-[3rem]    opacity-90  text-start text-semibold ${
                        ele.volume_1hrs_usd < 1
                          ? "text-[red]"
                          : "text-green-500"
                      }`}
                    >
                      {ele?.volume_1hrs_usd.toFixed(2)}
                    </td>
                    <p>
                      <td
                        className={`${
                          ele.name == localStorage.getItem("tradeCoin")
                            ? "bg-blue-500 text-white"
                            : ""
                        } bg-green-400 p-2 text-center rounded-md   text-[black]   text-bold cursor-pointer  `}
                        onClick={() => clickToTrade(ele.asset_id)}
                      >
                        {ele.name == localStorage.getItem("tradeCoin")
                          ? "Trade On"
                          : "Trade Now"}
                      </td>
                    </p>
                    ;
                  </tr>
                );
              })
            ) : (
              <div className="flex ">
                <p className="text-white text-center px-[3rem] py-3">
                  please wait the coin is loading...
                </p>
                <div className="mt-[1rem]">
                  <Loader />
                </div>
              </div>
            )}
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <nav aria-label="Page navigation">
            <ul className="inline-flex -space-x-px">
              {Array.from(
                { length: Math.ceil(coinlists?.length / rowsPerPage) },
                (_, i) => i + 1
              ).map((pageNumber) => (
                <li key={pageNumber}>
                  <button
                    onClick={() => paginate(pageNumber)}
                    className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100  rounded-md mx-2 hover:text-gray-700 ${
                      currentPage === pageNumber
                        ? "z-10 bg-green-300 border-green-300 text-green-700 hover:bg-green-400 hover:text-green-800"
                        : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section> */}
    </div>
  );
};

export default SingleTrade;
