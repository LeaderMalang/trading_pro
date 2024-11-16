import React from "react";
import {
  ChartCanvas,
  Chart,
  CandlestickSeries,
  XAxis,
  YAxis,
  CrossHairCursor,
  discontinuousTimeScaleProviderBuilder,
  HoverTooltip,
} from "react-financial-charts";
import { timeFormat } from "d3-time-format";
import { format } from "d3-format";

const TradingChart = ({ data, width, height }) => {
  if (!data || data.length === 0) {
    return <div>Loading chart data...</div>;
  }

  const margin = { left: 50, right: 50, top: 10, bottom: 30 };
  const xScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      (d) => new Date(d.date)
    );
  const {
    data: chartData,
    xScale,
    xAccessor,
    displayXAccessor,
  } = xScaleProvider(data);

  const xExtents = [
    xAccessor(chartData[0]),
    xAccessor(chartData[chartData.length - 1]),
  ];

  const tooltipContent = (d) => ({
    x: timeFormat("%Y-%m-%d %H:%M")(d.date), // Full date format
    y: [
      { label: "Open", value: d.open && format(".2f")(d.open) },
      { label: "High", value: d.high && format(".2f")(d.high) },
      { label: "Low", value: d.low && format(".2f")(d.low) },
      { label: "Close", value: d.close && format(".2f")(d.close) },
    ],
  });

  return (
    <ChartCanvas
      width={width}
      height={height}
      margin={margin}
      data={chartData}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xExtents={xExtents}
    >
      <Chart id={1} yExtents={(d) => [d.high, d.low]}>
        {/* X and Y Axis with custom styles */}
        <XAxis
          axisAt="bottom"
          orient="bottom"
          tickFormat={timeFormat("%Y-%m-%d")}
          stroke="white" // Axis line color
          tickStroke="white" // Tick color
        />
        <YAxis
          axisAt="left"
          orient="left"
          tickFormat={format(".2f")}
          stroke="white" // Axis line color
          tickStroke="white" // Tick color
        />
        <CandlestickSeries
          stroke={(d) => (d.close > d.open ? "green" : "red")} // Green for up, red for down
        />
        {/* Tooltip with adjusted font color */}
        <HoverTooltip
          tooltipContent={tooltipContent}
          fontSize={15}
          stroke="white"
          bgFill="rgba(0, 0, 0, 0.8)" // Dark background for tooltip
          fontFill="white" // White text for tooltip
        />
      </Chart>

      {/* CrossHairCursor with white color */}
      <CrossHairCursor strokeStyle="white" />
    </ChartCanvas>
  );
};

export default TradingChart;
