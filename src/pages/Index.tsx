import { useState } from "react";
import { QUESTIONS, calculateStage1Results, calculateStage2Results, getQuizQuestionsForCareers, CareerMatch } from "@/lib/scoring";
import type { CareerQuizResult, DomainScore } from "@/lib/scoring";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { SkillAssessment } from "@/components/SkillAssessment";
import { FinalResults } from "@/components/FinalResults";
import { Button } from "@/components/ui/button";
import { Compass, RotateCcw, ArrowRight } from "lucide-react";

type Stage = "stage1" | "stage1-results" | "stage2" | "final";

const Index = () => {
  const [stage, setStage] = useState<Stage>("stage1");

  // Stage 1
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [stage1Results, setStage1Results] = useState<{
    domains: DomainScore[];
    topDomain: string;
    topCareers: CareerMatch[];
  } | null>(null);

  // Stage 2
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [stage2Results, setStage2Results] = useState<CareerQuizResult[] | null>(null);

  const answered = Object.keys(answers).length;
  const total = QUESTIONS.length;
  const allAnswered = answered === total;

  const handleAnswer = (qId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleStage1Submit = () => {
    const results = calculateStage1Results(answers);
    setStage1Results(results);
    setStage("stage1-results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProceedToStage2 = () => {
    setStage("stage2");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuizAnswer = (id: string, value: string) => {
    setQuizAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleStage2Submit = () => {
    if (!stage1Results) return;
    const careerTitles = stage1Results.topCareers.map((c) => c.career.title);
    const results = calculateStage2Results(quizAnswers, careerTitles);
    setStage2Results(results);
    setStage("final");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setQuizAnswers({});
    setStage1Results(null);
    setStage2Results(null);
    setStage("stage1");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const topCareerTitles = stage1Results?.topCareers.map((c) => c.career.title) ?? [];
  const quizQuestions = getQuizQuestionsForCareers(topCareerTitles);

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
            {stage === "stage1" && "Stage 1: Answer 10 preference questions (1–4)"}
            {stage === "stage1-results" && "Stage 1 Results: Your career preference match"}
            {stage === "stage2" && "Stage 2: Rate your current skill levels (0–5)"}
            {stage === "final" && "Final Results: Combined analysis & skill gaps"}
          </p>
        </div>

        {/* Stage indicator */}
        <div className="mb-6 flex items-center justify-center gap-2 text-xs font-medium">
          <span className={`rounded-full px-3 py-1 ${stage === "stage1" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            1. Preferences
          </span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          <span className={`rounded-full px-3 py-1 ${stage === "stage1-results" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            Results
          </span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          <span className={`rounded-full px-3 py-1 ${stage === "stage2" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>
            2. Skills
          </span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          <span className={`rounded-full px-3 py-1 ${stage === "final" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
            Final
          </span>
        </div>

        {/* Stage 1: Questions */}
        {stage === "stage1" && (
          <>
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
              <Button onClick={handleStage1Submit} size="lg" className="px-8" disabled={!allAnswered}>
                {allAnswered ? "See My Preference Match" : `Answer all ${total} questions`}
              </Button>
            </div>
          </>
        )}

        {/* Stage 1 Results */}
        {stage === "stage1-results" && stage1Results && (
          <>
            <ResultsDisplay
              domains={stage1Results.domains}
              topDomain={stage1Results.topDomain}
              topCareer={stage1Results.topCareers[0]}
            />
            <div className="mt-8 text-center space-y-3">
              <Button onClick={handleProceedToStage2} size="lg" className="gap-2 px-8">
                Continue to Skill Assessment
                <ArrowRight className="h-4 w-4" />
              </Button>
              <div>
                <Button onClick={handleReset} variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                  <RotateCcw className="h-3 w-3" />
                  Start Over
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Stage 2: Skill Assessment */}
        {stage === "stage2" && (
          <SkillAssessment
            questions={quizQuestions}
            answers={quizAnswers}
            onAnswer={handleQuizAnswer}
            onSubmit={handleStage2Submit}
            topCareers={topCareerTitles}
          />
        )}

        {/* Final Results */}
        {stage === "final" && stage1Results && stage2Results && (
          <>
            <FinalResults stage1={stage1Results} stage2={stage2Results} />
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
