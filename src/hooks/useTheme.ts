import { useEffect, useState } from "react";

export const useTheme = () => {
  // dark mode state (true = dark, false = light)
  const [dark, setDark] = useState(true);

  // settings/modal open state
  const [open, setOpen] = useState(false);

  // update theme on body whenever dark changes
  useEffect(() => {
    document.body.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  return {
    dark,

    // toggle between dark and light mode
    toggleTheme: () => setDark((p) => !p),

    open,

    // toggle settings/modal visibility
    toggleSettings: () => setOpen((p) => !p),
  };
};