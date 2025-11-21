"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Autoplay on mount
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Autoplay prevented. User interaction required.");
          setIsPlaying(false);
        }
      }
    };
    playAudio();
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const increaseVolume = () => {
    const newVolume = Math.min(volume + 10, 100);
    setVolume(newVolume);
    if (isMuted && audioRef.current) {
      audioRef.current.muted = false;
      setIsMuted(false);
    }
  };

  const decreaseVolume = () => {
    const newVolume = Math.max(volume - 10, 0);
    setVolume(newVolume);
    if (isMuted && audioRef.current) {
      audioRef.current.muted = false;
      setIsMuted(false);
    }
  };

  const circumference = 2 * Math.PI * 14;
  const progress = isMuted ? 0 : volume;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/audio.mp3"
        loop
        onEnded={() => setIsPlaying(false)}
      />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <div className="relative">
              {/* Volume Icon */}
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Volume2 className="h-5 w-5 text-primary" />
              )}
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-64 p-4" align="end">
          <div className="space-y-4">
            {/* Play/Pause Control */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Background Music</span>
              <Button
                onClick={togglePlay}
                size="sm"
                className={`rounded-full h-10 w-10 ${
                  isPlaying
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-primary hover:bg-primary/90"
                }`}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 ml-0.5" />
                )}
              </Button>
            </div>

            {/* Volume Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Volume</span>
                <span className="text-sm font-bold">
                  {isMuted ? 0 : volume}%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={decreaseVolume}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  disabled={volume === 0}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>

                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${isMuted ? 0 : volume}%` }}
                  />
                </div>

                <Button
                  onClick={increaseVolume}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  disabled={volume === 100}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Mute Toggle */}
            <Button
              onClick={toggleMute}
              variant="outline"
              size="sm"
              className="w-full"
            >
              {isMuted ? (
                <>
                  <VolumeX className="h-4 w-4 mr-2" />
                  Unmute
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4 mr-2" />
                  Mute
                </>
              )}
            </Button>

            {/* Playing Indicator */}
            {isPlaying && (
              <div className="flex justify-center gap-1 pt-2">
                <div className="w-1 h-3 bg-primary/60 animate-pulse rounded-full" />
                <div className="w-1 h-4 bg-primary/70 animate-pulse rounded-full delay-75" />
                <div className="w-1 h-3 bg-primary/60 animate-pulse rounded-full delay-100" />
                <div className="w-1 h-2 bg-primary/50 animate-pulse rounded-full delay-150" />
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
