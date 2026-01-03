"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";

interface AudioContextType {
  // Background music controls
  pauseBackgroundMusic: () => void;
  resumeBackgroundMusic: () => void;

  // Background music state
  isMusicPlaying: boolean;
  setIsMusicPlaying: (playing: boolean) => void;

  // Audio element ref (for direct access)
  backgroundMusicRef: React.RefObject<HTMLAudioElement | null> | null;
  setBackgroundMusicRef: (
    ref: React.RefObject<HTMLAudioElement | null>
  ) => void;

  // Voice narration state
  isVoiceSpeaking: boolean;
  setIsVoiceSpeaking: (speaking: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);
  const [backgroundMusicRef, setBackgroundMusicRefState] =
    useState<React.RefObject<HTMLAudioElement | null> | null>(null);
  const previousMusicState = useRef<boolean>(false);

  const pauseBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef?.current) {
      // Save current music playing state
      previousMusicState.current = !backgroundMusicRef.current.paused;

      // Pause music if it's playing
      if (!backgroundMusicRef.current.paused) {
        backgroundMusicRef.current.pause();
        setIsMusicPlaying(false);
      }
    }
  }, [backgroundMusicRef]);

  const resumeBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef?.current && previousMusicState.current) {
      // Resume music only if it was playing before
      backgroundMusicRef.current.play().catch((error) => {
        console.log("Could not resume background music:", error);
      });
      setIsMusicPlaying(true);
    }
  }, [backgroundMusicRef]);

  const setBackgroundMusicRef = useCallback(
    (ref: React.RefObject<HTMLAudioElement | null>) => {
      setBackgroundMusicRefState(ref);
    },
    []
  );

  return (
    <AudioContext.Provider
      value={{
        pauseBackgroundMusic,
        resumeBackgroundMusic,
        isMusicPlaying,
        setIsMusicPlaying,
        backgroundMusicRef,
        setBackgroundMusicRef,
        isVoiceSpeaking,
        setIsVoiceSpeaking,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
