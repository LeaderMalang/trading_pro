import React, { useEffect, useRef, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getCurrency } from "../redux/features/currency/currency.action";

function TradingChartWidget() {
  const dispatch = useDispatch();
  const { currency } = useSelector((state) => state.currency);

  // Fetch currencies on mount
  useEffect(() => {
    (async () => {
      dispatch(getCurrency());
    })();
  }, [dispatch]);

  const container = useRef();
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT");

  // Handle TradingView widget updates
  useEffect(() => {
    // Clear the container before adding a new widget
    if (container.current.firstChild) {
      container.current.innerHTML = "";
    }

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "height": "700",
          "symbol": "BINANCE:${selectedSymbol}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
    container.current.appendChild(script);
  }, [selectedSymbol]);

  // Handle select change
  const handleChange = (selectedOption) => {
    setSelectedSymbol(selectedOption.value);
  };

  // Store selected symbol in localStorage
  useEffect(() => {
    localStorage.setItem("tradeCoin", selectedSymbol);
  }, [selectedSymbol]);

  // Map currency data to the format required by react-select
  const currencyOptions =
    currency?.data?.map((item) => ({
      label: `${item.curency_name} (${item.slug.toUpperCase()})`,
      value: `${item.slug.toUpperCase()}USDT`,
    })) || [];

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <label
          htmlFor="crypto-select"
          style={{ marginRight: "8px", color: "white" }}
        >
          Select Cryptocurrency:
        </label>
        <Select
          id="crypto-select"
          options={currencyOptions}
          defaultValue={currencyOptions[0]}
          onChange={handleChange}
          isSearchable
          styles={{
            container: (base) => ({
              ...base,
              width: "100%",
              maxWidth: "300px",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#333", // Dark background for the dropdown menu
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected
                ? "#555" // Background color for selected option
                : state.isFocused
                ? "#444" // Background color for focused option
                : "#333", // Default background color
              color: "#fff", // Text color for options
              ":active": {
                ...provided[":active"],
                backgroundColor: "#666", // Background color when the option is active
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "#fff", // Text color for the selected value
            }),
            control: (base) => ({
              ...base,
              backgroundColor: "#333", // Background color of the input
              borderColor: "#555", // Border color of the input
              color: "#fff",
            }),
            input: (base) => ({
              ...base,
              color: "#fff", // Text color inside the input
            }),
          }}
        />
      </div>
      <div
        className="tradingview-widget-container"
        ref={container}
        style={{ height: "800px", width: "100%" }}
      >
        <div id="tradingview_widget"></div>
      </div>
      <style jsx>{`
        .tradingview-widget-container {
          width: 100%;
        }
        @media (max-width: 768px) {
          .tradingview-widget-container {
            height: 400px; /* Adjust height for mobile screens */
          }
        }
      `}</style>
    </div>
  );
}

export default memo(TradingChartWidget);
