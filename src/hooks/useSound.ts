import { useRef } from "react";

export const useSound = () => {
  // store audio instance (persists across renders)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // play typing sound
  const play = () => {
    // create audio only once (lazy initialization)
    if (!audioRef.current) {
      audioRef.current = new Audio("/key.mp3");
    }

    // restart sound from beginning (for rapid typing)
    audioRef.current.currentTime = 0;

    // play sound
    audioRef.current.play();
  };

  return { play };
};