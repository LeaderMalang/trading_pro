// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { GetTradeByUser } from "../../../../redux/features/trade/trade.action";
// import { api } from "../../../../utils/axios";

// // Utility function to parse the timeframe and convert it to seconds
// const parseDuration = (timeFrame) => {
//   const regex = /(\d+)([a-zA-Z])\/(\d+)%/;
//   const matches = timeFrame.match(regex);
//   if (!matches) return 0;

//   const time = parseInt(matches[1]);
//   const timetype = matches[2];
//   switch (timetype) {
//     case "s":
//       return time; // Seconds
//     case "m":
//       return time * 60; // Minutes to seconds
//     case "h":
//       return time * 3600; // Hours to seconds
//     default:
//       return 0;
//   }
// };

// const CountdownTimer = ({ timeFrame, status, id, onTimerComplete }) => {
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [startStatus, setStartStatus] = useState(status); // Track if countdown should run

//   useEffect(() => {
//     const savedStartStatus = localStorage.getItem(`startStatus_${id}`);
//     const initialStartStatus =
//       savedStartStatus === null ? status : savedStartStatus;
//     setStartStatus(initialStartStatus);

//     const startTime = localStorage.getItem(`startTime_${id}`);
//     const savedDuration = parseInt(localStorage.getItem(`duration_${id}`), 10);

//     if (startTime && savedDuration && initialStartStatus) {
//       const timePassed = Math.floor((Date.now() - new Date(startTime)) / 1000);
//       const remainingTime = savedDuration - timePassed;

//       if (remainingTime > 0) {
//         setTimeLeft(remainingTime); // Set the remaining time
//       } else {
//         setTimeLeft(0); // Time is up, stop the countdown
//         setStartStatus(false); // Stop countdown
//         onTimerComplete(id); // Notify timer completion
//       }
//     } else if (initialStartStatus) {
//       const duration = parseDuration(timeFrame); // Parse the timeFrame to get duration in seconds
//       localStorage.setItem(`startTime_${id}`, new Date().toISOString()); // Store the start time
//       localStorage.setItem(`duration_${id}`, duration); // Store the duration
//       setTimeLeft(duration); // Initialize time left
//     }

//     const interval = setInterval(() => {
//       if (startStatus && timeLeft > 0) {
//         setTimeLeft((prevTimeLeft) => {
//           const newTimeLeft = prevTimeLeft - 1;
//           if (newTimeLeft <= 0) {
//             clearInterval(interval);
//             setStartStatus(false); // Stop the countdown
//             localStorage.removeItem(`startTime_${id}`);
//             localStorage.removeItem(`duration_${id}`);
//             localStorage.setItem(`startStatus_${id}`, false); // Persist stopped state
//             onTimerComplete(id); // Notify timer completion
//           }
//           return newTimeLeft;
//         });
//       }
//     }, 1000);

//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, [startStatus, timeLeft, timeFrame, id, onTimerComplete]);

//   useEffect(() => {
//     localStorage.setItem(`startStatus_${id}`, startStatus); // Persist startStatus to localStorage
//   }, [startStatus, id]);

//   const hours = Math.floor(timeLeft / 3600);
//   const minutes = Math.floor((timeLeft % 3600) / 60);
//   const seconds = timeLeft % 60;

//   const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
//     minutes < 10 ? "0" : ""
//   }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

//   return (
//     <>
//       <span className={`${startStatus ? "text-green-700" : "text-red-600"}`}>
//         {formattedTime} , time
//       </span>
//     </>
//   );
// };

// const TradeCount = () => {
//   const [data, setData] = useState([]);
//   const { userTrades } = useSelector((state) => state.trade);
//   console.table(userTrades);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(GetTradeByUser());
//   }, [dispatch]);

//   // Fetch the data from the backend API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get("/trade/get-tradesby-user"); // Replace with your API URL
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to call when timer completes
//   const handleTimerComplete = async (id) => {
//     try {
//       await api.post(`/trade/upgrade-trade-time`, { trade_id: id }); // Call API to update status
//       setData((prevData) =>
//         prevData.map((item) =>
//           item.id === id ? { ...item, isTime: false } : item
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   return (
//     <>
//       {userTrades.map((item) => (
//         <CountdownTimer
//           key={item._id}
//           id={item._id}
//           timeFrame={item.timeFrame}
//           status={item.isTime}
//           onTimerComplete={() => handleTimerComplete(item._id)}
//         />
//       ))}
//     </>
//   );
// };

// export default TradeCount;



import React, { useState, useEffect } from "react";

// Helper function to convert time string to milliseconds
const convertToMilliseconds = (timeString) => {
  const [time, percent] = timeString.split("/");
  const unit = time.slice(-1); // Get the unit ('s', 'm', 'h')
  const timeValue = parseInt(time.slice(0, -1)); // Get the numeric value

  let milliseconds = 0;
  if (unit === "s") milliseconds = timeValue * 1000; // Seconds to ms
  if (unit === "m") milliseconds = timeValue * 60000; // Minutes to ms
  if (unit === "h") milliseconds = timeValue * 3600000; // Hours to ms

  return milliseconds;
};

const TimerComponent = () => {
  const [data, setData] = useState([]);
  const [counters, setCounters] = useState([]);

  // Simulate fetching data from the database
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/data"); // Replace with actual API endpoint
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  // Initialize counters when data is fetched
  useEffect(() => {
    const initialCounters = data
      .filter((item) => item.status) // Only for active status items
      .map((item) => ({
        name: item.name,
        remainingTime: convertToMilliseconds(item.time),
      }));

    setCounters(initialCounters);
  }, [data]);

  // Update the timers every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounters((prevCounters) =>
        prevCounters.map((counter) =>
          counter.remainingTime > 0
            ? { ...counter, remainingTime: counter.remainingTime - 1000 }
            : counter
        )
      );
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [counters]);

  return (
    <div>
      <h1>Timers</h1>
      {counters.map((counter, index) => (
        <div key={index}>
          <p>Name: {counter.name}</p>
          <p>
            Time Remaining: {Math.max(counter.remainingTime / 1000, 0)} seconds
          </p>
        </div>
      ))}
    </div>
  );
};

export default TimerComponent;
