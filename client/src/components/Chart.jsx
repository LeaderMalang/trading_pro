import { useEffect, useRef, useState, useCallback } from "react";
import { createChart, CrosshairMode, LineStyle } from "lightweight-charts";
import { CoinList } from "../utils/HelperFunction";
import Loader from "../utils/Loader";
import { Pagination } from "./Pagination";

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

function Chart() {
    const chartContainerRef = useRef();
    const socketRef = useRef(null);
    const candlestickSeriesRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [interval, setInterval] = useState("1m");
    const [coinlists, setCoinList] = useState([]);

    const [currentCoin, setCurrentCoin] = useState(
        localStorage.getItem("tradeCoin") ? localStorage.getItem("tradeCoin") : "BTC"
    );

    const lowercaseCurrentCoin = currentCoin.toLowerCase();
    // localStorage.setItem("tradeCoin", coinName);
    const fetchHistoricalData = useCallback(
        (interval) => {
            setIsLoading(true);
            fetch(
                `https://api.binance.com/api/v3/klines?symbol=${currentCoin}USDT&interval=${interval}&limit=100000`
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
        [currentCoin]
    );

    const subscribeToWebSocket = useCallback(
        (interval) => {
            if (socketRef.current) {
                socketRef.current.close();
            }

            const streamName = intervalMapping[interval];
            const socket = new WebSocket(
                `wss://stream.binance.com:9443/ws/${lowercaseCurrentCoin}usdt@kline_${streamName}`
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
        [lowercaseCurrentCoin]
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
    }, [interval, fetchHistoricalData, subscribeToWebSocket, coinlists]);

    // const [coinDropdown, setCoinDropdown] = useState(true);
    //for trade coin

    useEffect(() => {
        async function fetch() {
            const res = await CoinList();
            setCoinList(res);
        }
        fetch();
    }, []);

    const clickToTrade = (coin) => {
        setCurrentCoin(coin);
        localStorage.setItem("tradeCoin", coin);
    };

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10; // You can change this value based on your preference

    // Function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the index range for the current page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentCoins = coinlists?.slice(indexOfFirstRow, indexOfLastRow);

    return (
        <div className="relative w-full flex flex-col flex-grow max-w-full overflow-hidden">
            {isLoading && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-light-dark-clr z-10">
                    <div className="loader"></div>
                </div>
            )}
            <div className="flex justify-between items-center w-full overflow-auto">
                <div className="flex justify-between w-full items-center flex-grow self-start">
                    <div className="flex  mb-3 gap-3">
                        {intervals.map((int) => (
                            <button
                                key={int}
                                onClick={() => setInterval(int)}
                                className={`py-2 px-3 flex gap-1 items-center text-text-clr font-medium rounded-md text-fnt-b md:text-fnt-c text-sm md:text-base lg:text-lg ${
                                    int === interval ? "bg-success-clr" : "bg-light-dark-clr"
                                }`}>
                                {int}
                            </button>
                        ))}
                    </div>
                    <h3 className="font-semibold text-1xl bg-voilet-dark p-2 px-4 text-warning-clr rounded-md text-sm md:text-base lg:text-lg mb-3">
                        {localStorage.getItem("tradeCoin")
                            ? localStorage.getItem("tradeCoin")
                            : "BTC"}
                    </h3>
                </div>
            </div>
            <div
                ref={chartContainerRef}
                className="w-auto h-[50vh] md:h-[80vh] overflow-auto rounded-lg"
            />
            <section>
                <div className=" w-full flex justify-center flex-col overflow-auto my-5 px-5 flex-grow-0 ">
                    <table className="rounded-sm w-full self-start px-5 overflow-auto border-spacing-2">
                        <tr className="">
                            <th className=" pr-2 text-white  opacity-30  text-start text-semibold  whitespace-nowrap overflow-auto text-sm md:text-base lg:text-lg">
                                Coin
                            </th>
                            <th className=" px-2 text-white  opacity-30  text-center text-semibold whitespace-nowrap overflow-auto text-sm md:text-base lg:text-lg">
                                Last End
                            </th>
                            <th className=" px-2 text-white  opacity-30  text-end text-semibold whitespace-nowrap overflow-auto text-sm md:text-base lg:text-lg">
                                Coin Count
                            </th>
                            <th className=" px-2 text-white  opacity-30  text-end text-semibold whitespace-nowrap overflow-auto text-sm md:text-base lg:text-lg">
                                Price
                            </th>
                            <th className=" px-2 text-white  opacity-30  text-end text-semibold whitespace-nowrap overflow-auto text-sm md:text-base lg:text-lg">
                                1hr Chrgs
                            </th>
                            <th className=" px-2  text-white  opacity-30  text-center text-semibold whitespace-nowrap overflow-auto text-sm md:text-base lg:text-lg">
                                Action
                            </th>
                        </tr>

                        {currentCoins
                            ? currentCoins?.map((ele, i) => {
                                  // console.log(existCoin.includes(ele.asset_id.toString()));
                                  return (
                                      <tr key={i}>
                                          <td className=" px-2 text-white text-start opacity-90   text-semibold whitespace-nowrap overflow-auto text-sm md:text-base lg:text-lg">
                                              {ele ? ele?.name : "loading"}

                                              <span className="opacity-30"> {ele.asset_id}</span>
                                          </td>
                                          <td className=" px-2 text-white  opacity-90  text-center text-semibold whitespace-nowrap overflow-auto text-sm md:text-base lg:text-lg">
                                              {ele?.data_end}
                                          </td>
                                          <td className=" px-2 text-white  opacity-90  text-end text-semibold whitespace-nowrap overflow-auto text-sm md:text-base lg:text-lg">
                                              {ele?.data_symbols_count}
                                          </td>
                                          <td
                                              className={`px-2 text-white   opacity-90  text-end text-semibold whitespace-nowrap overflow-auto text-sm md:text-base lg:text-lg`}>
                                              $ {ele.price_usd ? ele.price_usd.toFixed(2) : 0}
                                          </td>
                                          <td
                                              className={` px-2    opacity-90  text-end text-semibold whitespace-nowrap overflow-auto text-sm md:text-base lg:text-lg ${
                                                  ele.volume_1hrs_usd < 1
                                                      ? "text-[red]"
                                                      : "text-green-500"
                                              }`}>
                                              {ele?.volume_1hrs_usd.toFixed(2)}
                                          </td>
                                          {/* <p> */}
                                          <td className="p-2 ">
                                              <p
                                                  onClick={() => clickToTrade(ele.asset_id)}
                                                  className={`${
                                                      ele.name == localStorage.getItem("tradeCoin")
                                                          ? "bg-blue-500 text-white"
                                                          : ""
                                                  } bg-green-400 p-1 text-end rounded-md   text-[black]   text-bold cursor-pointer   whitespace-nowrap overflow-auto text-sm md:text-base lg:text-lg `}>
                                                  {" "}
                                                  {ele.name == localStorage.getItem("tradeCoin")
                                                      ? "Trade On"
                                                      : "Trade Now"}
                                              </p>
                                          </td>
                                          {/* </p> */};
                                      </tr>
                                  );
                              })
                            : null}
                    </table>
                    {currentCoins ? null : (
                        <div className="flex flex-col items-center self-center">
                            <p className="text-white text-center px-[3rem] py-3 text-sm md:text-base lg:text-lg">
                                please wait the coin is loading...
                            </p>
                            <div className="mt-[1rem]">
                                <Loader />
                            </div>
                        </div>
                    )}
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
                                        }`}>
                                        {pageNumber}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </section>
        </div>
    );
}

export default Chart;
