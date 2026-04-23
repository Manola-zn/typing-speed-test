import { useEffect, useRef, useState } from "react";

export const useTypingTest = () => {
  // user input
  const [input, setInput] = useState("");

  // timestamp when typing starts
  const [startTime, setStartTime] = useState<number | null>(null);

  // elapsed time (seconds)
  const [time, setTime] = useState(0);

  // animated WPM value shown in UI
  const [displayWpm, setDisplayWpm] = useState(0);

  // whether test is running
  const [isRunning, setIsRunning] = useState(false);

  // target WPM (used for smooth animation)
  const targetWpm = useRef(0);

  // prevents auto-restart after stopping
  const stoppedRef = useRef(false);

  // TIMER: updates every second
  useEffect(() => {
    if (!isRunning || !startTime) return;

    const interval = window.setInterval(() => {
      setTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  // START + WPM CALCULATION
  useEffect(() => {
    // prevent restarting after manual stop
    if (stoppedRef.current) return;

    // start test on first keystroke
    if (input.length > 0 && !isRunning) {
      setIsRunning(true);
      setStartTime(Date.now());
      return;
    }

    if (!isRunning || !startTime) return;

    // calculate WPM
    const minutes = (Date.now() - startTime) / 60000;
    const words = input.length / 5; // standard: 5 chars = 1 word
    const calc = minutes > 0 ? Math.round(words / minutes) : 0;

    // store target WPM (for smooth animation)
    targetWpm.current = calc;
  }, [input, isRunning, startTime]);

  // SMOOTH WPM ANIMATION
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayWpm((prev) => {
        const target = targetWpm.current;

        // gradually move toward target WPM
        if (prev < target) return prev + 1;
        if (prev > target) return prev - 1;
        return prev;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  // STOP TEST
  const stop = () => {
    setIsRunning(false);
    setStartTime(null);
    stoppedRef.current = true; // lock auto-restart

    downloadStats(); // export results
  };

  // RESET TEST
  const reset = () => {
    setInput("");
    setStartTime(null);
    setTime(0);
    setIsRunning(false);

    setDisplayWpm(0);

    targetWpm.current = 0;
    stoppedRef.current = false; // allow restart again
  };

  // DOWNLOAD RESULTS AS TEXT FILE
  const downloadStats = () => {
    const now = new Date();

    // format date and time
    const formattedDate = now.toLocaleDateString("en-GB");
    const formattedTime = now.toLocaleTimeString();

    // file content
    const data = `
      Typing Stats
      ----------------

      WPM: ${displayWpm}
      Time: ${time}s
      Input Length: ${input.length}

      Date: ${formattedDate}
      Time: ${formattedTime}
      `;

    // create file blob
    const blob = new Blob([data], { type: "text/plain" });

    // create temporary download link
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "typing-stats.txt";

    // trigger download
    document.body.appendChild(a);
    a.click();
    a.remove();

    // cleanup
    URL.revokeObjectURL(url);
  };

  // expose state + actions
  return {
    input,
    setInput,
    time,
    wpm: displayWpm,
    isRunning,
    stop,
    reset,
    downloadStats,
  };
};