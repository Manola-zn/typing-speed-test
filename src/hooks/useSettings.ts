import { useEffect, useState } from "react";

export const useSettings = () => {
  // theme (dark/light)
  const [dark, setDark] = useState(true);

  // typing sound on/off
  const [sound, setSound] = useState(true);

  // settings modal open/close state
  const [open, setOpen] = useState(false);

  // "saved" toast visibility
  const [saved, setSaved] = useState(false);

  // run when dark or sound changes
  useEffect(() => {
    // save settings to localStorage
    localStorage.setItem(
      "typing-settings",
      JSON.stringify({ dark, sound })
    );

    // apply theme to body (used in CSS)
    document.body.setAttribute("data-theme", dark ? "dark" : "light");

    // show "saved" feedback
    setSaved(true);

    // hide toast after 1 second
    const t = setTimeout(() => setSaved(false), 1000);

    // cleanup timeout on re-run/unmount
    return () => clearTimeout(t);
  }, [dark, sound]);

  return {
    dark,
    sound,
    open,
    saved,
    setDark,   // toggle dark mode
    setSound,  // toggle sound

    // open settings modal
    openSettings: () => setOpen(true),

    // close settings modal
    closeSettings: () => setOpen(false),

    // toggle modal state
    toggleSettings: () => setOpen((v) => !v),
  };
};