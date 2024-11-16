import dataCoin from "../../assets/cryptoDeposit/latestCrypto.json";
import DashboardLayout from "./DashboardLayout";
import "../../../src/home.css";
import { Link } from "react-router-dom";
// import { useState } from "react";

function Dashboard() {
  return <Layout />;
}

function Layout() {
  return (
    <section className=" pb-28 sec_max-width">
      <h2 className="head--two  mb-4 text-white">Dashboard</h2>
      <table className="border border-1 dash-table">
        <tr className="border border-1">
          <th className="border border-1 text-white text-2xl text-start text-semibold">
            S.N
          </th>
          <th className="border border-1 text-white text-2xl text-start text-semibold">
            Name
          </th>
          <th className="border border-1 text-white text-2xl text-start text-semibold">
            Circulating Supply
          </th>
          <th className="border border-1 text-white text-2xl text-start text-semibold">
            Max Supply
          </th>
          <th className="border border-1 text-white text-2xl text-start text-semibold">
            Total Supply
          </th>
          <th className="border border-1 text-white text-2xl text-start text-semibold"></th>
        </tr>
        {dataCoin.map((coin, index) => {
          return (
            <tr key={index} className="cursor-pointer text-xl text-text-clr">
              <td className="border border-1">{index + 1}</td>
              <td className="border border-1">{coin.name}</td>
              <td className="border border-1">{coin.circulating_supply}</td>
              <td className="border border-1">
                {coin.max_supply == null ? 0 : coin.max_supply}
              </td>
              <td className="border border-1">{coin.total_supply}</td>
              <td className="border border-1">
                <Link
                  onClick={() => {
                    // setCoinName(coin.name);
                  }}
                  to={`/trade/${coin.symbol}`}
                  className="bg-success-clr px-3 py-2 rounded text-text-clr"
                >
                  Trade
                </Link>
              </td>
            </tr>
          );
        })}
      </table>
    </section>
  );
}

export default Dashboard;
