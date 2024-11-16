import axios from "axios";

// let config = {
//   method: "get",
//   maxBodyLength: Infinity,
//   url: "https://rest.coinapi.io/v1/assets/icons/:100", // Replace :size with the actual size you need
//   headers: {
//     Accept: "text/plain",
// "X-CoinAPI-Key": "8FC0AF9A-4F15-4378-BCC8-076EB12155EB", // Replace with your actual API key
//   },
// };
// axios
//   .request(config)
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });

(async () => {
  const data = await axios.get("https://rest.coinapi.io/v1/assets/icons/100", {
    headers: {
      "Content-Type": "application/json",
      "X-CoinAPI-Key": "8FC0AF9A-4F15-4378-BCC8-076EB12155EB", // Replace with your actual API key
    },
  });
  console.log(data.data);
})();
