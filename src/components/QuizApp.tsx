"use client";

import { QuizData } from "@/types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  RefreshCcw,
  Home,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";

interface QuizAppProps {
  data: QuizData;
}

export function QuizApp({ data }: QuizAppProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = data.questions[currentIndex];
  const progress = ((currentIndex + 1) / data.config.totalQuestions) * 100;

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;

    setIsAnswered(true);
    const option = currentQuestion.options.find((o) => o.id === selectedOption);
    if (option?.isCorrect) {
      setScore((s) => s + currentQuestion.points);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#22c55e", "#16a34a"],
      });
    } else {
      // Shake effect or error sound could go here
    }
  };

  const handleNext = () => {
    if (currentIndex < data.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      if (score >= data.config.passingScore) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const isPassed = score >= data.config.passingScore;
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <Card className="w-full max-w-lg text-center border-none shadow-2xl bg-white/80 dark:bg-card/80 backdrop-blur-xl p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <div
              className={`mx-auto mb-6 rounded-full p-8 w-32 h-32 flex items-center justify-center ${
                isPassed
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {isPassed ? (
                <Trophy className="h-16 w-16" />
              ) : (
                <XCircle className="h-16 w-16" />
              )}
            </div>

            <h2 className="text-3xl font-bold mb-2">
              {isPassed ? "Selamat! Kamu Lulus" : "Belum Lulus"}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isPassed
                ? "Kamu telah menguasai materi ini dengan baik."
                : "Jangan menyerah, coba pelajari materi lagi."}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-muted/50 p-4 rounded-xl">
                <div className="text-sm text-muted-foreground">Skor Kamu</div>
                <div className="text-3xl font-bold text-primary">{score}</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-xl">
                <div className="text-sm text-muted-foreground">KKM</div>
                <div className="text-3xl font-bold text-muted-foreground">
                  {data.config.passingScore}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={handleRetry}
                size="lg"
                className="w-full gap-2 text-lg"
              >
                <RefreshCcw className="h-5 w-5" /> Coba Lagi
              </Button>
              <Link href="/" className="w-full">
                <Button variant="outline" size="lg" className="w-full gap-2">
                  <Home className="h-5 w-5" /> Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </motion.div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Stats */}
      <div className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-10 p-4">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Pertanyaan
            </span>
            <span className="text-xl font-bold text-primary">
              {currentIndex + 1}
              <span className="text-muted-foreground/50 text-lg">
                /{data.config.totalQuestions}
              </span>
            </span>
          </div>

          <div className="flex-1 max-w-xs mx-4">
            <Progress value={progress} className="h-3 rounded-full" />
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Skor
            </span>
            <span className="text-xl font-bold text-primary">{score}</span>
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 container max-w-4xl mx-auto p-4 md:p-8 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Card className="overflow-hidden border border-primary/10 shadow-xl bg-white/85 dark:bg-card/85 backdrop-blur-md">
              <div className="p-6 md:p-8 text-center border-b bg-primary/5">
                <h2 className="text-xl md:text-2xl font-semibold leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 md:h-auto bg-muted/30 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r">
                  <div className="relative w-full h-full min-h-[200px]">
                    <Image
                      src={currentQuestion.image}
                      alt="Question Illustration"
                      fill
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                </div>

                {/* Options */}
                <div className="p-6 flex flex-col justify-center gap-4 bg-white/50 dark:bg-black/5">
                  <div className="grid gap-3">
                    {currentQuestion.options.map((option) => {
                      let variant = "outline";
                      let className =
                        "justify-start text-left h-auto py-4 px-5 text-lg transition-all hover:scale-[1.02] hover:shadow-md border-2";

                      if (isAnswered) {
                        if (option.isCorrect) {
                          className +=
                            " bg-green-100 border-green-500 text-green-800 hover:bg-green-100 hover:scale-100";
                          variant = "ghost";
                        } else if (selectedOption === option.id) {
                          className +=
                            " bg-red-100 border-red-500 text-red-800 hover:bg-red-100 hover:scale-100";
                          variant = "ghost";
                        } else {
                          className += " opacity-50 grayscale";
                        }
                      } else if (selectedOption === option.id) {
                        className +=
                          " border-primary bg-primary/5 ring-2 ring-primary/20";
                      } else {
                        className += " hover:border-primary/50";
                      }

                      return (
                        <Button
                          key={option.id}
                          variant={variant as any}
                          className={className}
                          onClick={() => handleOptionSelect(option.id)}
                          disabled={isAnswered}
                        >
                          <div className="flex items-center w-full">
                            <span className="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold mr-4">
                              {option.id.toUpperCase()}
                            </span>
                            <span className="grow font-medium">
                              {option.text}
                            </span>
                            {isAnswered && option.isCorrect && (
                              <CheckCircle className="h-6 w-6 text-green-600 ml-2" />
                            )}
                            {isAnswered &&
                              !option.isCorrect &&
                              selectedOption === option.id && (
                                <XCircle className="h-6 w-6 text-red-600 ml-2" />
                              )}
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer / Feedback */}
              <div className="p-4 bg-muted/30 border-t flex justify-end items-center min-h-[80px]">
                {!isAnswered ? (
                  <Button
                    onClick={handleCheckAnswer}
                    disabled={!selectedOption}
                    size="lg"
                    className="w-full md:w-auto px-8 text-lg shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    Jawab Pertanyaan
                  </Button>
                ) : (
                  <div className="w-full flex items-center justify-between animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex-1 mr-4">
                      <p className="font-semibold text-sm text-muted-foreground">
                        Penjelasan:
                      </p>
                      <p className="text-sm md:text-base">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                    <Button
                      onClick={handleNext}
                      size="lg"
                      className="gap-2 shadow-lg"
                    >
                      Lanjut <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
