import React from "react";
import { DisplayState } from "./helpers";

interface DisplayProps {
  displayState: DisplayState;
  reset: () => void;
  startStop: () => void;
}

const Display: React.FC<DisplayProps> = ({ displayState, reset, startStop }) => {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="display">
      <h4 id="timer-label">{displayState.timeType}</h4>
      <h1 id="time-left">{formatTime(displayState.time)}</h1>
      <div className="controls">
        <button id="start_stop" onClick={startStop}>
          {displayState.timerRunning ? "Pause" : "Start"}
        </button>
        <button id="reset" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Display;
