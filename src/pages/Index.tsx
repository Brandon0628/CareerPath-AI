import { useState } from "react";
import { QUESTIONS, calculateResults } from "@/lib/scoring";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { Button } from "@/components/ui/button";
import { Compass, RotateCcw } from "lucide-react";

const Index = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [results, setResults] = useState<ReturnType<typeof calculateResults> | null>(null);

  const answered = Object.keys(answers).length;
  const total = QUESTIONS.length;
  const allAnswered = answered === total;

  const handleAnswer = (qId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = () => {
    setResults(calculateResults(answers));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setResults(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Compass className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            AI Career Guide
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Answer 10 questions (1–4) to find your best-fit career domain
          </p>
        </div>

        {!results ? (
          <>
            {/* Progress */}
            <div className="mb-6">
              <div className="mb-1 flex justify-between text-xs font-medium text-muted-foreground">
                <span>{answered}/{total} answered</span>
                <span>{Math.round((answered / total) * 100)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${(answered / total) * 100}%` }}
                />
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-4">
              {QUESTIONS.map((q, i) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  value={answers[q.id]}
                  onChange={(v) => handleAnswer(q.id, v)}
                  index={i}
                  total={total}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={handleSubmit}
                size="lg"
                className="px-8"
                disabled={!allAnswered}
              >
                {allAnswered ? "Get My Results" : `Answer all ${total} questions`}
              </Button>
            </div>
          </>
        ) : (
          <>
            <ResultsDisplay
              domains={results.domains}
              topDomain={results.topDomain}
              topCareer={results.topCareer}
            />
            <div className="mt-8 text-center">
              <Button onClick={handleReset} variant="outline" size="lg" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Start Over
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
