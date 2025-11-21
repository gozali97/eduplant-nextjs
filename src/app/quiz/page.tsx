import { getQuizData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Play, Clock, CheckCircle } from "lucide-react";

export default function QuizPage() {
  const quizData = getQuizData();

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 md:px-6 py-8">
      <Card className="w-full max-w-3xl mx-auto overflow-hidden border-none shadow-2xl bg-card/50 backdrop-blur-sm">
        <div className="relative h-64 md:h-72 w-full bg-gradient-to-r from-primary/20 to-secondary/20">
          <Image
            src={quizData.intro.image}
            alt="Quiz Intro"
            fill
            className="object-contain p-6"
            priority
          />
        </div>
        <CardHeader className="text-center space-y-4 pt-8">
          <CardTitle className="text-3xl md:text-4xl font-bold text-primary">
            {quizData.intro.title}
          </CardTitle>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {quizData.intro.description}
          </p>
        </CardHeader>
        <CardContent className="space-y-8 pb-10 px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors">
              <CheckCircle className="h-6 w-6 text-primary" />
              <span className="font-bold">
                {quizData.config.totalQuestions} Soal
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors">
              <Clock className="h-6 w-6 text-primary" />
              <span className="font-bold">
                ~{quizData.config.durationMinutes} Menit
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors">
              <CheckCircle className="h-6 w-6 text-primary" />
              <span className="font-bold">
                KKM {quizData.config.passingScore}
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <Link href="/quiz/play">
              <Button
                size="lg"
                className="w-full md:w-auto px-10 gap-2 text-lg h-14 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <Play className="h-5 w-5" /> Mulai Kuis
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
