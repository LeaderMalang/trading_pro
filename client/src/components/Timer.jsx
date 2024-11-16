import { useState, useEffect } from "react";
import { ConvertToSeconds, FormatTime } from "../utils/HelperFunction";

// Timer component
const Timer = ({ name, time, status, index, onStatusChange }) => {
  const [remainingTime, setRemainingTime] = useState(ConvertToSeconds(time));

  useEffect(() => {
    let timerInterval;

    if (status && remainingTime > 0) {
      timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            onStatusChange(index);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // Clear the interval when component is unmounted
    return () => clearInterval(timerInterval);
  }, [status, remainingTime, onStatusChange, index]);

  return (
    <div style={{ color: status ? "green" : "red" }}>
      {name}: {FormatTime(remainingTime)}
    </div>
  );
};

// Main Component
const TimerList = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("timerData");
    return savedData
      ? JSON.parse(savedData)
      : [
          { name: "a", time: "12s/10%", status: true },
          { name: "a", time: "10m/10%", status: true },
          { name: "d", time: "9h/10%", status: false },
          { name: "a", time: "3m/10%", status: true },
        ];
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        localStorage.setItem("timerData", JSON.stringify(data));
      } else if (document.visibilityState === "visible") {
        const savedData = localStorage.getItem("timerData");
        if (savedData) {
          setData(JSON.parse(savedData));
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [data]);

  const updateTimerStatus = (index) => {
    const updatedData = [...data];
    updatedData[index].status = false;
    setData(updatedData);
    localStorage.setItem("timerData", JSON.stringify(updatedData));
  };

  return (
    <div>
      {data.map((item, index) => (
        <Timer
          key={index}
          name={item.name}
          time={item.time}
          status={item.status}
          index={index}
          onStatusChange={updateTimerStatus}
        />
      ))}
    </div>
  );
};

export default TimerList;
