"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/contexts/AudioContext";

interface VoiceNarratorProps {
  title: string;
  content: string;
}

export function VoiceNarrator({ title, content }: VoiceNarratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [narration, setNarration] = useState<string | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Get audio context for background music control
  const { pauseBackgroundMusic, resumeBackgroundMusic, setIsVoiceSpeaking } =
    useAudio();

  // Check if browser supports Web Speech API (in useEffect to avoid hydration mismatch)
  useEffect(() => {
    setIsSpeechSupported(
      typeof window !== "undefined" && "speechSynthesis" in window
    );
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
      // Resume music if it was paused
      setIsVoiceSpeaking(false);
      resumeBackgroundMusic();
    };
  }, [setIsVoiceSpeaking, resumeBackgroundMusic]);

  // Generate narration from Mistral AI
  const generateNarration = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/generate-narration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate narration");
      }

      const data = await response.json();
      setNarration(data.narration);
      return data.narration;
    } catch (err) {
      setError("Gagal membuat narasi. Silakan coba lagi.");
      console.error("Error generating narration:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Speak the narration using Web Speech API
  const speakNarration = (text: string) => {
    if (!isSpeechSupported) {
      setError("Browser Anda tidak mendukung fitur suara.");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Clear any previous errors
    setError(null);

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Configure speech settings
    utterance.lang = "id-ID"; // Indonesian language
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Event handlers
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsVoiceSpeaking(true);
      setError(null);
      // Pause background music when voice starts
      pauseBackgroundMusic();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsVoiceSpeaking(false);
      // Resume background music when voice ends
      resumeBackgroundMusic();
    };

    utterance.onerror = (event) => {
      setIsSpeaking(false);
      setIsVoiceSpeaking(false);

      // Only show error message for actual errors, not user cancellation
      // "canceled" and "interrupted" are not real errors
      if (event.error !== "canceled" && event.error !== "interrupted") {
        setError("Terjadi kesalahan saat memutar suara.");
        console.error("Speech synthesis error:", event);
      }

      // Resume background music on error
      resumeBackgroundMusic();
    };

    // Speak
    window.speechSynthesis.speak(utterance);
  };

  // Handle voice button click
  const handleVoiceClick = async () => {
    if (isSpeaking) {
      // Stop speaking
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsVoiceSpeaking(false);
      setError(null); // Clear any error message
      // Resume background music when manually stopped
      resumeBackgroundMusic();
      return;
    }

    // If narration already generated, just speak it
    if (narration) {
      speakNarration(narration);
      return;
    }

    // Generate and speak new narration
    const generatedNarration = await generateNarration();
    if (generatedNarration) {
      speakNarration(generatedNarration);
    }
  };

  if (!isSpeechSupported) {
    return null; // Don't show button if not supported
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleVoiceClick}
        disabled={isLoading}
        variant={isSpeaking ? "destructive" : "default"}
        size="lg"
        className="gap-2 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Membuat Narasi...</span>
            </motion.div>
          ) : isSpeaking ? (
            <motion.div
              key="speaking"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <VolumeX className="h-5 w-5" />
              <span>Stop Suara</span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <Volume2 className="h-5 w-5" />
              <span>🎙️ Dengarkan Penjelasan</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated background pulse when speaking */}
        {isSpeaking && (
          <motion.div
            className="absolute inset-0 bg-white/20"
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </Button>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg p-2"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Narration text (optional, can be shown when generated) */}
      {narration && !isSpeaking && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3 mt-2"
        >
          <p className="italic leading-relaxed">{narration}</p>
        </motion.div>
      )}
    </div>
  );
}
