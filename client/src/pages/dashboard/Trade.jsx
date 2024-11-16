import Chart from "../../components/Chart";
import TradingChart from "../../components/TradingChart";
import TradingChartWidget from "../../components/TradingChartWidget";
import BuySellSidebar from "../dashboard/BuySellSidebar";
import DashboardLayout from "./DashboardLayout";

function Trade() {
  return <DashboardLayout layout={<TradeSection />} />;
}

function TradeSection() {
  return (
    <div
      className="relative overflow-y-auto block tabletSize:flex flex-row gap-5 w-full p-3 bg-light-bg-clr rounded-md"
      style={{ minHeight: "700px" }}
    >
      {/* <Chart /> */}
      {/* <TradingChart data={data} width={1000} height={600} /> */}
      <div style={{ flex: 1 }}>
        <TradingChartWidget />
      </div>
      <BuySellSidebar />
    </div>
  );
}

export default Trade;
