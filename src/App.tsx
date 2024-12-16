import { useState, useEffect } from "react";
import "./App.css";
import { DisplayState } from "./helpers";
import TimeSetter from "./TimeSetter";
import Display from "./Display";

const defaultBreakTime = 5 * 60; // 5 minutes in seconds
const defaultSessionTime = 25 * 60; // 25 minutes in seconds
const min = 60; // 1 minute in seconds
const max = 60 * 60; // 60 minutes in seconds
const interval = 60; // Interval for time adjustments

function App() {
  const [breakTime, setBreakTime] = useState<number>(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState<number>(defaultSessionTime);
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: defaultSessionTime,
    timeType: "Session",
    timerRunning: false,
  });

  useEffect(() => {
    let timerID: number;
    if (!displayState.timerRunning) return;

    timerID = window.setInterval(() => {
      setDisplayState((prevState) => {
        if (prevState.time === 0) {
          const audio = document.getElementById("beep") as HTMLAudioElement;
          audio.currentTime = 0;
          audio.play();
          return {
            ...prevState,
            timeType: prevState.timeType === "Session" ? "Break" : "Session",
            time: prevState.timeType === "Session" ? breakTime : sessionTime,
          };
        }
        return { ...prevState, time: prevState.time - 1 };
      });
    }, 1000);

    return () => window.clearInterval(timerID);
  }, [displayState.timerRunning, breakTime, sessionTime]);

  const reset = () => {
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setDisplayState({
      time: defaultSessionTime,
      timeType: "Session",
      timerRunning: false,
    });
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  };

  const startStop = () => {
    setDisplayState((prevState) => ({
      ...prevState,
      timerRunning: !prevState.timerRunning,
    }));
  };

  const changeBreakTime = (time: number) => {
    if (displayState.timerRunning) return;
    if (time >= min && time <= max) setBreakTime(time);
  };

  const changeSessionTime = (time: number) => {
    if (displayState.timerRunning) return;
    if (time >= min && time <= max) {
      setSessionTime(time);
      setDisplayState((prevState) => ({
        ...prevState,
        time: time,
        timeType: "Session",
      }));
    }
  };

  return (
    <div className="clock">
       <h2>25 + 5 Clock</h2>
      <div className="setters">
        <div className="break">
          <h4 id="break-label">Break Length</h4>
          <TimeSetter
            time={breakTime}
            setTime={changeBreakTime}
            min={min}
            max={max}
            interval={interval}
            type="break"
          />
        </div>
        <div className="session">
          <h4 id="session-label">Session Length</h4>
          <TimeSetter
            time={sessionTime}
            setTime={changeSessionTime}
            min={min}
            max={max}
            interval={interval}
            type="session"
          />
        </div>
      </div>
      <Display
        displayState={displayState}
        reset={reset}
        startStop={startStop}
      />
      <footer>
        Created and designed by{" "}
        <a href="https://codepen.io/Shafaat_Ali" target="_blank" rel="noopener noreferrer">
          Shafaat
        </a>
      </footer>

      <audio id="beep" src={"https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"}></audio>
    </div>
  );
}

export default App;


