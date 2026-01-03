"use client";

import { Topic } from "@/types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ArrowLeft, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { VoiceNarrator } from "@/components/VoiceNarrator";

interface TopicViewerProps {
  topic: Topic;
}

export function TopicViewer({ topic }: TopicViewerProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentPage = topic.pages[currentPageIndex];
  const totalPages = topic.pages.length;

  const handleNext = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-10 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/materi">
            <Button
              variant="ghost"
              className="gap-2 pl-0 hover:pl-2 transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Kembali ke Materi</span>
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-2xl">{topic.icon}</span>
            <h1 className="text-lg font-bold hidden sm:block">{topic.title}</h1>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
            <BookOpen className="h-4 w-4" />
            <span>
              {currentPageIndex + 1} / {totalPages}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 container max-w-7xl mx-auto p-4 md:p-8 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
          >
            <Card className="overflow-hidden border border-primary/10 shadow-2xl bg-white/85 dark:bg-card/85 backdrop-blur-xl">
              <div className="grid lg:grid-cols-2 min-h-[60vh]">
                {/* Image Section */}
                <div className="relative bg-primary/5 p-8 flex items-center justify-center min-h-[300px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-border/50">
                  <div className="relative w-full h-full min-h-[300px] max-h-[500px]">
                    <Image
                      src={currentPage.image}
                      alt={topic.title}
                      fill
                      className="object-contain drop-shadow-xl"
                      priority
                    />
                  </div>
                </div>

                {/* Text Section */}
                <div className="p-8 md:p-12 flex flex-col justify-center bg-white/50 dark:bg-black/30">
                  <div className="prose dark:prose-invert max-w-none">
                    <h2 className="text-3xl font-bold mb-6 text-primary border-b pb-4 inline-block">
                      Penjelasan
                    </h2>
                    <div className="text-lg md:text-xl leading-relaxed text-foreground/90 whitespace-pre-line font-medium">
                      {currentPage.content}
                    </div>

                    {/* Voice Narrator Component */}
                    <div className="mt-8 pt-6 border-t border-border/50">
                      <VoiceNarrator
                        title={topic.title}
                        content={currentPage.content}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Controls */}
      <div className="bg-background/80 backdrop-blur-md border-t p-4 sticky bottom-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrev}
            disabled={currentPageIndex === 0}
            className="flex-1 max-w-[200px] gap-2 shadow-sm hover:shadow-md transition-all"
          >
            <ChevronLeft className="h-5 w-5" /> Sebelumnya
          </Button>

          <div className="flex gap-1.5">
            {topic.pages.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentPageIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          <Button
            size="lg"
            onClick={handleNext}
            disabled={currentPageIndex === totalPages - 1}
            className="flex-1 max-w-[200px] gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Selanjutnya <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
