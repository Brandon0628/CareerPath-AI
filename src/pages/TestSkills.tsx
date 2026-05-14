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
import { saveResultsToSupabase } from "@/lib/session";
import { SkillAssessment } from "@/components/SkillAssessment";
import { FinalResults } from "@/components/FinalResults";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RotateCcw, RefreshCw } from "lucide-react";
import {
  TechIcon,
  AccountingIcon,
  HealthcareIcon,
  CreativeIcon,
  BusinessIcon,
} from "@/components/DomainIcons";

type Domain = "Tech" | "Accounting" | "Healthcare" | "Creative" | "Business";
type Stage = "select" | "quiz" | "results";

const DOMAIN_CARDS: {
  domain: Domain;
  Icon: React.FC<{ className?: string }>;
  label: string;
  desc: string;
  borderClass: string;
  tagColor: string;
  tag: string;
}[] = [
  {
    domain: "Tech",
    Icon: TechIcon,
    label: "Tech",
    desc: "Software Development, Data Analysis, Cybersecurity",
    borderClass: "hover:border-blue-400/60 hover:shadow-blue-100/60",
    tagColor: "bg-blue-50 text-blue-600 border border-blue-200",
    tag: "3 careers",
  },
  {
    domain: "Accounting",
    Icon: AccountingIcon,
    label: "Accounting",
    desc: "Bookkeeping, Financial Statements, Tax, Accounting Software",
    borderClass: "hover:border-emerald-400/60 hover:shadow-emerald-100/60",
    tagColor: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    tag: "1 career",
  },
  {
    domain: "Healthcare",
    Icon: HealthcareIcon,
    label: "Healthcare",
    desc: "Nursing, Medical Lab Technology, Psychology",
    borderClass: "hover:border-red-400/60 hover:shadow-red-100/60",
    tagColor: "bg-red-50 text-red-600 border border-red-200",
    tag: "3 careers",
  },
  {
    domain: "Creative",
    Icon: CreativeIcon,
    label: "Creative",
    desc: "UI/UX Design, Graphic Design, Content Creation",
    borderClass: "hover:border-purple-400/60 hover:shadow-purple-100/60",
    tagColor: "bg-purple-50 text-purple-600 border border-purple-200",
    tag: "3 careers",
  },
  {
    domain: "Business",
    Icon: BusinessIcon,
    label: "Business",
    desc: "Digital Marketing, Business Analysis, Entrepreneurship",
    borderClass: "hover:border-amber-400/60 hover:shadow-amber-100/60",
    tagColor: "bg-amber-50 text-amber-600 border border-amber-200",
    tag: "3 careers",
  },
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
  const topCareers = selectedDomain ? [...new Set(questions.map((q) => q.careerTitle))] : [];

  const generateQuestions = useCallback(
    async (domain: Domain) => {
      setIsGenerating(true);
      let newQuestions: QuizQuestion[] = [];
      let usedFallback = false;

      try {
        const { data, error } = await supabase.functions.invoke("generate-questions", {
          body: { domain, count: 20, pastQuestions: Array.from(pastQuestionTexts) },
        });
        if (error) throw error;
        const aiQs = (data as { questions?: QuizQuestion[] })?.questions;
        if (!Array.isArray(aiQs) || aiQs.length === 0) throw new Error("No questions");
        newQuestions = aiQs;
      } catch {
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
    const careerTitles = [...new Set(questions.map((q) => q.careerTitle))];
    const skillMap: Record<string, Record<string, { correct: number; total: number }>> = {};

    careerTitles.forEach((title) => {
      skillMap[title] = {};
      questions.filter((q) => q.careerTitle === title).forEach((q) => {
        if (!skillMap[title][q.skill]) skillMap[title][q.skill] = { correct: 0, total: 0 };
        skillMap[title][q.skill].total++;
        const correctOption = q.options.find((o) => o.isCorrect);
        if (answers[q.id] && correctOption && answers[q.id] === correctOption.label) {
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
      return { careerTitle: title, skillResults, overallScore, weakSkills: skillResults.filter((r) => r.percentage < 100) };
    });

    setResults(res);
    const topResult = res.reduce((best, r) => (r.overallScore > best.overallScore ? r : best), res[0]);
    saveResultsToSupabase(selectedDomain, topResult.careerTitle, topResult.overallScore, topResult.skillResults)
      .then(() => toast({ title: "Results saved ✓", description: "Your career assessment has been recorded." }));

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
    <div className="min-h-screen">
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

        {/* Domain Selection — aesthetic cards with gradient icons */}
        {stage === "select" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DOMAIN_CARDS.map((card) => (
              <button
                key={card.domain}
                onClick={() => handleSelectDomain(card.domain)}
                className={`group rounded-2xl border-2 border-border/50 p-6 text-left shadow-sm transition-all hover:shadow-xl active:scale-[0.98] ${card.borderClass}`}
                style={{ background: "rgba(255,255,255,0.62)", backdropFilter: "blur(16px)" }}
              >
                {/* Gradient icon */}
                <div className="mb-4">
                  <card.Icon className="h-12 w-12 transition-transform group-hover:scale-110 group-hover:-rotate-3" />
                </div>

                <div className="mb-1 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-foreground">{card.label}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${card.tagColor}`}>
                    {card.tag}
                  </span>
                </div>

                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{card.desc}</p>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                  Start Quiz
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Quiz */}
        {stage === "quiz" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={handleReset}>
                <ArrowLeft className="h-3 w-3" />
                Change Domain
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleRegenerate} disabled={isGenerating}>
                <RefreshCw className={`h-3 w-3 ${isGenerating ? "animate-spin" : ""}`} />
                {isGenerating ? "Generating…" : "Regenerate Questions"}
              </Button>
            </div>

            {isGenerating && questions.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border/50 p-16 text-center" style={{ background: "rgba(255,255,255,0.62)", backdropFilter: "blur(16px)" }}>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <RefreshCw className="h-7 w-7 animate-spin text-primary" />
                </div>
                <p className="text-base font-bold text-foreground">Generating your questions...</p>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  Our AI is crafting personalised questions — this takes a few seconds.
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