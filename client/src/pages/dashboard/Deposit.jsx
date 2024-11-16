import { Link } from "react-router-dom";
import DashboardSubNav from "../../components/DashboardSubNav";
import DashboardLayout from "./DashboardLayout";
import { IoMdAlert } from "react-icons/io";

const cryptoDeposit = [
  {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/binance.svg",
  },
  {
    name: "Polka dot",
    iconUrl: "https://qxbroker.com/profile/images/polkadot.svg",
  },
  {
    name: "Zcash(ZEC)",
    iconUrl: "https://qxbroker.com/profile/images/crypto-zec.svg",
  },
  {
    name: "Ripple",
    iconUrl: "https://qxbroker.com/profile/images/crypto-xpr.svg",
  },
  {
    name: "ApeCoin(APE)",
    iconUrl: "https://qxbroker.com/profile/images/apecoin.svg",
  },
  {
    name: "Avalance",
    iconUrl: "https://qxbroker.com/profile/images/avalance.svg",
  },
  {
    name: "Polygon(MATIC)",
    iconUrl: "https://qxbroker.com/profile/images/polygon.svg",
  },
  {
    name: "USD Coin (USDC ERC-20)",
    iconUrl: "https://qxbroker.com/profile/images/usdc-eth.svg",
  },
  {
    name: "Binance Cash",
    iconUrl: "https://qxbroker.com/profile/images/crypto-bch.svg",
  },
  {
    name: "Solana",
    iconUrl: "https://qxbroker.com/profile/images/crypto-solana.svg",
  },
  {
    name: "Shiba Inu(ERC-20)",
    iconUrl: "https://qxbroker.com/profile/images/crypto-shiba_erc20.svg",
  },
  {
    name: "Dogecoin",
    iconUrl: "https://qxbroker.com/profile/images/crypto-doge.svg",
  },
  {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/ton.svg",
  },
  {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/uniswap.svg",
  },
  {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/crypto-dash.svg",
  },
  {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/crypto-tron.svg",
  },
  {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/crypto-ltc.svg",
  },
  {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/crypto-btc.svg",
  },
  {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/usdt_bep20.svg",
  },
  {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/usdt_erc20.svg",
  },
  {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/usdt_trc20.svg",
  },
  {
    name: "Binance Pay",
    iconUrl: "https://qxbroker.com/profile/images/crypto-eth.svg",
  },
];

function Deposit() {
  return <DashboardLayout layout={<DepositPage />} />;
}

function DepositPage() {
  return (
    <div className="mb-20 px-7">
      {/* <DashboardSubNav /> */}

      <div
        role="alerts"
        className="bg-warning-clr text-black font-semibold text-fnt-b flex items-center gap-3 px-4 py-3 max-w-[40rem] mt-5 rounded-md"
      >
        <IoMdAlert className="inline-block basis-24 text-3xl" />
        <span className="inlin-block">
          Some options may not be available at times, due to the maintenance on
          the side of the financial providers, or other reasons. Please watch
          for updates, and consider using the other available variants. Desposit
        </span>
        <div></div>
      </div>
      <h2 className="text-text-clr text-fnt-c my-2">Cryptocurrency :</h2>
      <div className="flex justify-between flex-wrap max-w-[45rem]">
        {cryptoDeposit.map((coin, index) => (
          <Link
            to={`/deposit/${index}`}
            key={index}
            className="border bg-slate-100 flex items-center gap-5 p-4 pe-20 w-[20rem] my-4 rounded-md hover:bg-voilet-dark group"
          >
            <img src={coin.iconUrl} alt="" />
            {console.log(index)}
            <h2 className="group-hover:text-text-clr text-fnt-c">
              {coin.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Deposit;
