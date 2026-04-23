import { useTypingTest } from "./hooks/useTypingTest"; // Custom hook for typing logic (input, timer, WPM)
import { useSound } from "./hooks/useSound"; // Custom hook to play typing sound
import { useSettings } from "./hooks/useSettings"; // Custom hook for app settings (dark mode, sound, modal)

import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap Icons
import "./styles.css"; // Your custom styles

function App() {
  // Typing test state & actions
  const { input, setInput, time, wpm, isRunning, stop, reset } =
    useTypingTest();

  // Sound control
  const { play } = useSound();

  // Settings state & controls
  const {
    dark,          // Dark mode enabled/disabled
    sound,         // Sound enabled/disabled
    open,          // Settings modal open state
    saved,         // Show "saved" toast
    setDark,       // Toggle dark mode
    setSound,      // Toggle sound
    openSettings,  // Open settings modal
    closeSettings, // Close settings modal
  } = useSettings();

  const isOpen = open; // Alias for readability

  return (
    <div className="app">

      {/* MAIN CARD CONTAINER */}
      <div className={`card ${isOpen ? "blurred" : ""}`}>
        {/* Adds blur effect when settings modal is open */}

        {/* HEADER */}
        <div className="top-bar">
          <h1>
            {/* App title with icon */}
            <i className="bi bi-lightning-charge-fill text-warning fs-3"></i>
            {" "}Typing Speed Test
          </h1>

          {/* Open settings button */}
          <button className="icon-btn success" onClick={openSettings}>
            <i className="bi bi-gear-fill"></i>
          </button>
        </div>

        {/* TOAST MESSAGE (shown when settings saved) */}
        {saved && <div className="toast">Saved ✓</div>}

        {/* TYPING INPUT AREA */}
        <textarea
          value={input} // Controlled input from state
          onChange={(e) => {
            setInput(e.target.value); // Update typing input

            // Play sound on each keystroke if enabled
            if (sound) play();
          }}
          placeholder="Start typing..."
        />

        {/* STATS DISPLAY */}
        <div className="stats">
          {/* TIME */}
          <div>
            <span className="label">
              <i className="bi bi-clock me-2"></i> Time
            </span>
            <span className="value">{time}s</span>
          </div>

          {/* SPEED (WPM) */}
          <div>
            <span className="label">
              <i className="bi bi-lightning-charge me-2"></i> Speed
            </span>
            <span className="value">{wpm} WPM</span>
          </div>
        </div>

        {/* CONTROL BUTTONS */}
        <div className="buttons">
          {/* Stop typing test */}
          <button onClick={stop} disabled={!isRunning}>
            <i className="bi bi-stop-fill me-2"></i>
            Stop
          </button>

          {/* Restart typing test */}
          <button onClick={reset}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Restart
          </button>
        </div>
      </div>

      {/* SETTINGS MODAL OVERLAY */}
      {isOpen && (
        <div className="overlay" onClick={closeSettings}>
          {/* Clicking outside closes modal */}

          <div
            className="settings-panel"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* SETTINGS HEADER */}
            <div className="settings-header">
              <div className="settings-title">
                <i className="bi bi-gear-fill"></i>
                <span>Settings</span>
              </div>

              {/* Close button */}
              <button className="icon-btn danger" onClick={closeSettings}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="settings-divider"></div>

            {/* DARK MODE TOGGLE */}
            <div className="setting-row">
              <span>Dark Mode</span>
              <div
                className={`switch ${dark ? "on" : ""}`}
                onClick={() => setDark(!dark)} // Toggle dark mode
              >
                <div className="knob" />
              </div>
            </div>

            {/* SOUND TOGGLE */}
            <div className="setting-row">
              <span>Sound</span>
              <div
                className={`switch ${sound ? "on" : ""}`}
                onClick={() => setSound(!sound)} // Toggle sound
              >
                <div className="knob" />
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        Developed by{" "}
        <a
          href="https://github.com/Manola-zn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Manola Pillay
        </a>
      </footer>
    </div>
  );
}

export default App;