import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  getQuizQuestionsForDomain,
  type CareerQuizResult,
  type QuizQuestion,
} from "@/lib/scoring";
import { generateMockQuestions } from "@/lib/questionGenerator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { SkillAssessment } from "@/components/SkillAssessment";
import { FinalResults } from "@/components/FinalResults";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Code, Calculator, Heart, Palette, TrendingUp, RotateCcw, RefreshCw } from "lucide-react";

type Domain = "Tech" | "Accounting" | "Healthcare" | "Creative" | "Business";
type Stage = "select" | "quiz" | "results";

const DOMAIN_CARDS: { domain: Domain; icon: React.ElementType; label: string; desc: string; colorClass: string }[] = [
  { domain: "Tech", icon: Code, label: "Tech", desc: "Software Development, Data Analysis, Cybersecurity", colorClass: "border-primary/20 hover:border-primary/50 text-primary" },
  { domain: "Accounting", icon: Calculator, label: "Accounting", desc: "Bookkeeping, Financial Statements, Tax, Accounting Software", colorClass: "border-secondary/20 hover:border-secondary/50 text-secondary" },
  { domain: "Healthcare", icon: Heart, label: "Healthcare", desc: "Nursing, Medical Lab Technology, Psychology", colorClass: "border-red-400/20 hover:border-red-400/50 text-red-500" },
  { domain: "Creative", icon: Palette, label: "Creative", desc: "UI/UX Design, Graphic Design, Content Creation", colorClass: "border-purple-400/20 hover:border-purple-400/50 text-purple-500" },
  { domain: "Business", icon: TrendingUp, label: "Business", desc: "Digital Marketing, Business Analysis, Entrepreneurship", colorClass: "border-amber-400/20 hover:border-amber-400/50 text-amber-500" },
];

const TestSkills = () => {
  const [stage, setStage] = useState<Stage>("select");
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<CareerQuizResult[] | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<QuizQuestion[]>([]);
  const [pastQuestionTexts, setPastQuestionTexts] = useState<Set<string>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);

  const fallbackQuestions = selectedDomain ? getQuizQuestionsForDomain(selectedDomain) : [];
  const questions = generatedQuestions.length > 0 ? generatedQuestions : fallbackQuestions;

  const topCareers = selectedDomain
    ? [...new Set(questions.map((q) => q.careerTitle))]
    : [];

  const generateQuestions = useCallback(
    async (domain: Domain) => {
      setIsGenerating(true);
      let newQuestions: QuizQuestion[] = [];
      let usedFallback = false;

      try {
        const { data, error } = await supabase.functions.invoke("generate-questions", {
          body: {
            domain,
            count: 20,
            pastQuestions: Array.from(pastQuestionTexts),
          },
        });

        if (error) throw error;

        const aiQs = (data as { questions?: QuizQuestion[] })?.questions;
        if (!Array.isArray(aiQs) || aiQs.length === 0) {
          throw new Error("AI returned no questions");
        }
        newQuestions = aiQs;
      } catch (err) {
        console.error("AI generation failed, falling back to local generator", err);
        usedFallback = true;
        newQuestions = generateMockQuestions(domain, 20, pastQuestionTexts);
      }

      setPastQuestionTexts((prev) => {
        const next = new Set(prev);
        newQuestions.forEach((q) => next.add(q.text));
        return next;
      });
      setGeneratedQuestions(newQuestions);
      setAnswers({});
      setIsGenerating(false);

      toast({
        title: usedFallback ? "Using offline questions" : "Fresh AI questions ready",
        description: usedFallback
          ? "Couldn't reach the AI service — generated locally instead."
          : `${newQuestions.length} new AI-generated questions loaded.`,
      });
    },
    [pastQuestionTexts],
  );

  const handleSelectDomain = async (domain: Domain) => {
    setSelectedDomain(domain);
    setAnswers({});
    setResults(null);
    setGeneratedQuestions([]);
    setStage("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
    await generateQuestions(domain);
  };

  const handleAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (!selectedDomain) return;

    // Calculate results from whichever question set is active
    const careerTitles = [...new Set(questions.map((q) => q.careerTitle))];
    const skillMap: Record<string, Record<string, { correct: number; total: number }>> = {};

    careerTitles.forEach((title) => {
      skillMap[title] = {};
      const careerQs = questions.filter((q) => q.careerTitle === title);
      careerQs.forEach((q) => {
        if (!skillMap[title][q.skill]) skillMap[title][q.skill] = { correct: 0, total: 0 };
        skillMap[title][q.skill].total++;
        const selected = answers[q.id];
        const correctOption = q.options.find((o) => o.isCorrect);
        if (selected && correctOption && selected === correctOption.label) {
          skillMap[title][q.skill].correct++;
        }
      });
    });

    const res: CareerQuizResult[] = careerTitles.map((title) => {
      const skillResults = Object.entries(skillMap[title]).map(([skill, data]) => ({
        skill,
        correct: data.correct,
        total: data.total,
        percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      }));
      const totalCorrect = skillResults.reduce((s, r) => s + r.correct, 0);
      const totalQ = skillResults.reduce((s, r) => s + r.total, 0);
      const overallScore = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
      const weakSkills = skillResults.filter((r) => r.percentage < 100);
      return { careerTitle: title, skillResults, overallScore, weakSkills };
    });

    setResults(res);
    setStage("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setStage("select");
    setSelectedDomain(null);
    setAnswers({});
    setResults(null);
    setGeneratedQuestions([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRegenerate = async () => {
    if (!selectedDomain) return;
    await generateQuestions(selectedDomain);
  };

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
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Test Your Skills
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {stage === "select" && "Choose a domain to test your knowledge"}
            {stage === "quiz" && `${selectedDomain} Domain — Answer the knowledge questions`}
            {stage === "results" && `${selectedDomain} Domain — Your skill assessment results`}
          </p>
        </div>

        {/* Domain Selection */}
        {stage === "select" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DOMAIN_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.domain}
                  onClick={() => handleSelectDomain(card.domain)}
                  className={`group rounded-2xl border-2 bg-card p-6 text-left shadow-sm transition-all hover:shadow-lg active:scale-[0.98] ${card.colorClass}`}
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-card-foreground">{card.label} Domain</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{card.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium">
                    Start Quiz <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Quiz */}
        {stage === "quiz" && (
          <div className="space-y-4">
            {/* Regenerate + Back buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground"
                onClick={handleReset}
              >
                <ArrowLeft className="h-3 w-3" />
                Change Domain
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleRegenerate}
                disabled={isGenerating}
              >
                <RefreshCw className={`h-3 w-3 ${isGenerating ? "animate-spin" : ""}`} />
                {isGenerating ? "Generating…" : "Regenerate Questions"}
              </Button>
            </div>

            {isGenerating && questions.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center">
                <RefreshCw className="mb-3 h-6 w-6 animate-spin text-primary" />
                <p className="text-sm font-medium text-card-foreground">
                  Generating fresh AI questions…
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  This usually takes a few seconds.
                </p>
              </div>
            ) : (
              <SkillAssessment
                questions={questions}
                answers={answers}
                onAnswer={handleAnswer}
                onSubmit={handleSubmit}
                topCareers={topCareers}
              />
            )}
          </div>
        )}

        {/* Results */}
        {stage === "results" && results && (
          <>
            <FinalResults stage2={results} />
            <div className="mt-8 text-center space-y-3">
              <Button onClick={handleReset} variant="outline" size="lg" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Test Another Domain
              </Button>
              <div>
                <Link to="/roadmap">
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    View Career Roadmaps <ArrowRight className="h-3 w-3" />
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

export default TestSkills;
