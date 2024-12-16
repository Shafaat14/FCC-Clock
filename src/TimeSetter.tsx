import React from "react";

interface TimeSetterProps {
  time: number;
  setTime: (time: number) => void;
  min: number;
  max: number;
  interval: number;
  type: "break" | "session";
}

const TimeSetter: React.FC<TimeSetterProps> = ({ time, setTime, min, max, interval, type }) => {
  const increment = () => {
    if (time + interval <= max) setTime(time + interval);
  };

  const decrement = () => {
    if (time - interval >= min) setTime(time - interval);
  };

  return (
    <div className="time-setter">
      <button id={`${type}-decrement`} onClick={decrement}>
        ⬇
      </button>
      <span id={`${type}-length`}>{time / 60}</span>
      <button id={`${type}-increment`} onClick={increment}>
        ⬆
      </button>
    </div>
  );
};

export default TimeSetter;
