import { getQuizData } from "@/lib/data";
import { QuizApp } from "@/components/QuizApp";

export default function QuizPlayPage() {
  const quizData = getQuizData();

  return <QuizApp data={quizData} />;
}
