import React, { useState } from "react";

export function TimerSlot({ index, timer, updateTimers }) {
  const [time, setTime] = useState(timer.time);
  const [text, setText] = useState(timer.text);

  function handleBlur() {
    updateTimers(index, time, text);
  }

  return (
    <form className="timer" key={index}>
      <input
        type="number"
        value={time}
        onChange={(e) => setTime(Number(e.target.value))}
        onBlur={handleBlur}
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
      />
    </form>
  );
}
