import axios from "axios";
export const CoinList = async () => {
  try {
    const { data } = await axios.get(
      "https://rest.coinapi.io/v1/assets?limit=10&page=1",
      {
        headers: {
          "Content-Type": "application/json",
          "X-CoinAPI-Key": "3aae184f-df40-4e05-92cd-d094a18d7246", // Replace with your actual API key", // Replace with your actual API key
        },
      }
    );
    const existCoin = [
      "BTC",
      "ETH",
      // "USDT",
      "BNB",
      // "XPR",
      "USDC",
      "DOGE",
      "TON",
      "TRX ",
      "AVAX",
      "DOT",
      "DAI",
      "LTC",
    ];

    const res = [];
    data.map((ele) => {
      if (existCoin.includes(ele.asset_id.toString())) {
        res.push(ele);
      }
    });

    if (res) return res;
  } catch (error) {
    console.log(error);
  }
};

export const TimeExtract = (time) => {
  // Regular expression to capture time, timetype, and percentage
  const regex = /(\d+)([a-zA-Z])\/(\d+)%/;

  const matches = time.match(regex);

  if (matches) {
    const time = parseInt(matches[1]);
    const timetype = matches[2];
    const percentage = parseInt(matches[3]);

    return {
      Time: time,
      TimeType: timetype,
      Percentage: percentage,
    };
  } else {
    console.log("Invalid format");
  }
};

export const ConvertToSeconds = (timeStr) => {
  const timeParts = timeStr.match(/(\d+)([smh])/);
  const value = parseInt(timeParts[1]);
  const unit = timeParts[2];

  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    default:
      return 0;
  }
};

export const FormatTime = (seconds) => {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
};
