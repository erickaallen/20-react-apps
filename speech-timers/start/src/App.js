import React, { useCallback, useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useStopwatch } from "react-timer-hook";
import { TimerSlot } from "./components/TimerSlot";
import "./App.css";

export default function App() {
  const [timers, setTimers] = useState([
    { time: 2, text: "this is my message" },
    { time: 5, text: "hello" },
    { time: 8, text: "what is up" },
  ]);
  const { seconds, isRunning, start, reset } = useStopwatch();
  const { speak, speaking, supported } = useSpeechSynthesis();

  const doReset = useCallback(() => reset(), []);
  const doSpeak = useCallback((...p) => speak(...p), []);

  useEffect(() => {
    const foundTimer = timers.find((t) => t.time === seconds);
    if (foundTimer) doSpeak({ text: foundTimer.text });

    // TODO: This stops the timer after the last item in list,
    // but it should stop after the highest second count instead
    if (seconds > timers[timers.length - 1].time) doReset();
  }, [seconds, timers, doSpeak, doReset]);

  function updateTimers(index, time, text) {
    const newTimers = [...timers];
    newTimers[index].time = time;
    newTimers[index].text = text;

    setTimers(newTimers);
  }

  function addTimer() {
    const newTimers = [...timers, { time: "15", text: "yooo" }];

    setTimers(newTimers);
  }

  if (!supported) {
    return <div>Sorry, but your browser is not supported.</div>;
  }

  return (
    <div className="app">
      <h2>Talk the Talk</h2>

      <div className="timers">
        {/* timers go here */}
        {timers.map((timer, index) => (
          <TimerSlot
            key={index}
            index={index}
            timer={timer}
            updateTimers={updateTimers}
          />
        ))}

        <button className="add-button" onClick={addTimer}>
          Add
        </button>
      </div>

      {/* seconds */}
      <h2>{seconds}</h2>

      {/* buttons */}
      <div className="buttons">
        {!isRunning && (
          <button className="start-button" onClick={start}>
            Start
          </button>
        )}

        {isRunning && (
          <button className="stop-button" onClick={reset}>
            Stop
          </button>
        )}

        {speaking && <p>I am speaking...</p>}
      </div>
    </div>
  );
}
