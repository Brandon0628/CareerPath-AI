import { useState } from "react";
import { Link } from "react-router-dom";
import { QUESTIONS, QUIZ_QUESTIONS, CAREERS, calculateStage1Results, calculateStage2Results, getQuizQuestionsForCareers, CareerMatch } from "@/lib/scoring";
import type { CareerQuizResult, DomainScore } from "@/lib/scoring";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { LearningResources } from "@/components/LearningResources";
import { SkillAssessment } from "@/components/SkillAssessment";
import { FinalResults } from "@/components/FinalResults";
import { Button } from "@/components/ui/button";
import { Compass, RotateCcw, ArrowRight, ArrowLeft, Map } from "lucide-react";

type Stage = "stage1" | "stage1-results" | "field-select" | "stage2" | "final";

const Index = () => {
  const [stage, setStage] = useState<Stage>("stage1");

  // Stage 1
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [stage1Results, setStage1Results] = useState<{
    domains: DomainScore[];
    topDomain: string;
    topCareers: CareerMatch[];
    mbtiType: string;
    mbtiNickname: string;
    mbtiWorkStyle: string;
    mbtiSuitableRoles: string[];
  } | null>(null);

  // Stage 2
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [stage2Results, setStage2Results] = useState<CareerQuizResult[] | null>(null);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [mbtiSubStage, setMbtiSubStage] = useState<"EI" | "SN" | "TF" | "JP">("EI");

  const dimensionOrder: Array<"EI" | "SN" | "TF" | "JP"> = ["EI", "SN", "TF", "JP"];
  const dimensionLabels: Record<string, { title: string; description: string; emoji: string }> = {
    EI: { title: "Extraversion vs Introversion", description: "How do you gain energy and interact with the world?", emoji: "🌐" },
    SN: { title: "Sensing vs Intuition", description: "How do you take in information and learn?", emoji: "🔍" },
    TF: { title: "Thinking vs Feeling", description: "How do you make decisions?", emoji: "⚖️" },
    JP: { title: "Judging vs Perceiving", description: "How do you approach structure and planning?", emoji: "🗂️" },
  };
  const currentDimensionQuestions = QUESTIONS.filter((q) => q.dimension === mbtiSubStage);
  const currentDimIndex = dimensionOrder.indexOf(mbtiSubStage);
  const currentDimAnswered = currentDimensionQuestions.every((q) => answers[q.id] !== undefined);

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

  const handleNextDimension = () => {
    const nextIndex = dimensionOrder.indexOf(mbtiSubStage) + 1;
    if (nextIndex < dimensionOrder.length) {
      setMbtiSubStage(dimensionOrder[nextIndex]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // All 4 dimensions done — calculate results
      const results = calculateStage1Results(answers);
      setStage1Results(results);
      setStage("stage1-results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleProceedToStage2 = () => {
    setStage("field-select");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDomainToggle = (domain: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]
    );
  };

  const handleProceedFromFieldSelect = () => {
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
    setMbtiSubStage("EI");
    setStage("stage1");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const topCareerTitles = stage1Results?.topCareers.map((c) => c.career.title) ?? [];
  const quizQuestions = selectedDomains.length > 0
    ? QUIZ_QUESTIONS.filter((q) =>
        selectedDomains.some((domain) =>
          CAREERS.find((c) => c.title === q.careerTitle)?.domain === domain
        )
      )
    : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* Header */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4 gap-2 text-muted-foreground">
              <ArrowLeft className="h-3 w-3" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Compass className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Discover Your Strengths
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {stage === "stage1" && "Stage 1: 40 personality questions — 10 per dimension, rated 1 (Strongly Disagree) to 4 (Strongly Agree)"}
              {stage === "stage1-results" && "Your personality type, career match & learning resources"}
              {stage === "stage2" && "Stage 2: Test your knowledge with real problems"}
              {stage === "final" && "Final Results: Combined analysis & skill gaps"}
            </p>
          </div>
        </div>

        {/* Stage indicator */}
        <div className="mb-6 flex items-center justify-center gap-2 text-xs font-medium">
          <span className={`rounded-full px-3 py-1 ${stage === "stage1" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {stage === "stage1" ? `${currentDimIndex + 1}/4 ${mbtiSubStage}` : "1. Personality"}
          </span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          <span className={`rounded-full px-3 py-1 ${stage === "stage1-results" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            Your Type
          </span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          <span className={`rounded-full px-3 py-1 ${stage === "field-select" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            Fields
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
            {/* Dimension progress pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
              {dimensionOrder.map((dim, i) => {
                const isActive = dim === mbtiSubStage;
                const isComplete = i < currentDimIndex;
                return (
                  <div key={dim} className="flex items-center gap-1">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                      isComplete ? "bg-green-100 text-green-700 border border-green-300" :
                      isActive ? "bg-primary text-primary-foreground" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {isComplete ? "✓ " : ""}{dim}
                    </span>
                    {i < dimensionOrder.length - 1 && (
                      <span className="text-muted-foreground text-xs">→</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Current dimension header */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mb-6 text-center">
              <span className="text-3xl">{dimensionLabels[mbtiSubStage].emoji}</span>
              <h3 className="font-bold text-lg text-foreground mt-2">
                Dimension {currentDimIndex + 1} of 4: {dimensionLabels[mbtiSubStage].title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{dimensionLabels[mbtiSubStage].description}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {currentDimensionQuestions.filter(q => answers[q.id] !== undefined).length} / {currentDimensionQuestions.length} answered
              </p>
            </div>

            {/* Questions for current dimension only */}
            {currentDimensionQuestions.map((question, idx) => (
              <QuestionCard
                key={question.id}
                question={question}
                value={answers[question.id]}
                onChange={(val) => handleAnswer(question.id, val)}
                index={idx}
              />
            ))}

            {/* Next button */}
            <div className="text-center mt-6">
              <Button
                onClick={handleNextDimension}
                size="lg"
                className="px-8 gap-2"
                disabled={!currentDimAnswered}
              >
                {!currentDimAnswered
                  ? `Answer all ${currentDimensionQuestions.length} questions to continue`
                  : currentDimIndex < 3
                  ? `Next: ${dimensionLabels[dimensionOrder[currentDimIndex + 1]].title} →`
                  : "See My Personality Results 🎉"
                }
              </Button>
            </div>
          </>
        )}

        {/* Stage 1 Results + Resources */}
        {stage === "stage1-results" && stage1Results && (
          <>
            {stage1Results.mbtiType && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase text-primary tracking-wide">Your Personality Type</span>
                  <span className="rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-bold">💼 SDG 8 Aligned</span>
                </div>
                <div className="flex items-baseline gap-3 mb-2">
                  <h2 className="text-4xl font-bold text-primary">{stage1Results.mbtiType}</h2>
                  <span className="text-lg font-semibold text-foreground">{stage1Results.mbtiNickname}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{stage1Results.mbtiWorkStyle}</p>

                {/* Dimension bars */}
                <div className="space-y-2 mb-4">
                  {[
                    { left: "Extravert", right: "Introvert", type: stage1Results.mbtiType[0], pair: "EI" },
                    { left: "Sensing", right: "Intuitive", type: stage1Results.mbtiType[1], pair: "SN" },
                    { left: "Thinking", right: "Feeling", type: stage1Results.mbtiType[2], pair: "TF" },
                    { left: "Judging", right: "Perceiving", type: stage1Results.mbtiType[3], pair: "JP" },
                  ].map((dim) => (
                    <div key={dim.pair} className="flex items-center gap-2 text-xs">
                      <span className={`w-20 text-right font-medium ${["E","S","T","J"].includes(dim.type) ? "text-primary" : "text-muted-foreground"}`}>{dim.left}</span>
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full bg-primary transition-all ${["E","S","T","J"].includes(dim.type) ? "w-2/3" : "w-1/3"}`} />
                      </div>
                      <span className={`w-20 font-medium ${!["E","S","T","J"].includes(dim.type) ? "text-primary" : "text-muted-foreground"}`}>{dim.right}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Roles That Suit You</p>
                  <div className="flex flex-wrap gap-2">
                    {stage1Results.mbtiSuitableRoles.map((role) => (
                      <span key={role} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{role}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <ResultsDisplay
              domains={stage1Results.domains}
              topDomain={stage1Results.topDomain}
              topCareer={stage1Results.topCareers[0]}
            />

            {/* Learning Resources */}
            <div className="mt-6">
              <LearningResources careerTitles={topCareerTitles} />
            </div>

            {/* Roadmap link */}
            <div className="mt-4 text-center">
              <Link to="/roadmap">
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                  <Map className="h-3 w-3" />
                  View Career Roadmaps
                </Button>
              </Link>
            </div>

            <div className="mt-6 text-center space-y-3">
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

        {/* Field Select */}
        {stage === "field-select" && (
          <div className="space-y-6">
            <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 text-center">
              <h3 className="text-xl font-bold text-foreground">Which fields do you know?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Select only the domains you have some knowledge in. You'll be tested only on what you select — and you must fully complete every field you choose.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(["Tech", "Accounting", "Healthcare", "Creative", "Business"] as const).map((domain) => {
                const icons: Record<string, string> = {
                  Tech: "💻", Accounting: "📊", Healthcare: "🏥", Creative: "🎨", Business: "📈"
                };
                const descs: Record<string, string> = {
                  Tech: "Software, Data, Cybersecurity",
                  Accounting: "Finance & Accounting",
                  Healthcare: "Nursing, Lab, Psychology",
                  Creative: "Design, Content, UX",
                  Business: "Marketing, Analysis, Entrepreneurship"
                };
                const isSelected = selectedDomains.includes(domain);
                return (
                  <button
                    key={domain}
                    onClick={() => handleDomainToggle(domain)}
                    className={`rounded-xl border-2 p-4 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{icons[domain]}</span>
                        <div>
                          <p className="font-semibold text-foreground">{domain}</p>
                          <p className="text-xs text-muted-foreground">{descs[domain]}</p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                          <span className="text-[10px] text-primary-foreground font-bold">✓</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedDomains.length === 0 && (
              <p className="text-center text-sm text-muted-foreground italic">
                Select at least one domain to continue.
              </p>
            )}

            <div className="text-center space-y-3">
              <Button
                onClick={handleProceedFromFieldSelect}
                size="lg"
                className="px-8 gap-2"
                disabled={selectedDomains.length === 0}
              >
                Start Knowledge Test ({selectedDomains.length} field{selectedDomains.length !== 1 ? "s" : ""} selected)
                <ArrowRight className="h-4 w-4" />
              </Button>
              <div>
                <Button
                  onClick={() => setStage("stage1-results")}
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back to Results
                </Button>
              </div>
            </div>
          </div>
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

            {/* Resources again */}
            <div className="mt-6">
              <LearningResources careerTitles={topCareerTitles} />
            </div>

            <div className="mt-8 text-center space-y-3">
              <Button onClick={handleReset} variant="outline" size="lg" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Start Over
              </Button>
              <div>
                <Link to="/roadmap">
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <Map className="h-3 w-3" />
                    View Career Roadmaps
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
