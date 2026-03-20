import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  getQuizQuestionsForDomain,
  calculateDomainQuizResults,
  type CareerQuizResult,
  type QuizQuestion,
  CAREERS,
} from "@/lib/scoring";
import { SkillAssessment } from "@/components/SkillAssessment";
import { FinalResults } from "@/components/FinalResults";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Code, Calculator, RotateCcw, RefreshCw, Loader2 } from "lucide-react";

type Stage = "select" | "quiz" | "results";

const TestSkills = () => {
  const [stage, setStage] = useState<Stage>("select");
  const [selectedDomain, setSelectedDomain] = useState<"Tech" | "Accounting" | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<CareerQuizResult[] | null>(null);
  const [aiQuestions, setAiQuestions] = useState<QuizQuestion[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Use AI questions if available, otherwise fall back to hardcoded
  const fallbackQuestions = selectedDomain ? getQuizQuestionsForDomain(selectedDomain) : [];
  const questions = aiQuestions.length > 0 ? aiQuestions : fallbackQuestions;

  const topCareers = selectedDomain
    ? [...new Set(questions.map((q) => q.careerTitle))]
    : [];

  const fetchAIQuestions = useCallback(async (domain: "Tech" | "Accounting") => {
    setIsLoadingAI(true);
    try {
      const domainCareers = CAREERS.filter((c) => c.domain === domain).map((c) => c.title);
      const prompt = `Generate ${domainCareers.length * 6} multiple-choice quiz questions for these careers: ${domainCareers.join(", ")}. 
Each question should test knowledge relevant to that career.
Return valid JSON array where each element has:
{
  "id": "unique-string",
  "careerTitle": "exact career title",
  "text": "question text",
  "skill": "skill area being tested",
  "options": [{"label": "option text", "isCorrect": true/false}],
  "type": "mcq",
  "scoringNote": "brief note"
}
Include exactly 4 options per question with exactly 1 correct answer.`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(window as Record<string, unknown>).__OPENAI_API_KEY || ""}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content ?? "";
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error("No JSON found in response");

      const parsed: QuizQuestion[] = JSON.parse(jsonMatch[0]);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setAiQuestions(parsed);
        setAnswers({});
      }
    } catch (err) {
      console.warn("AI question generation failed, using fallback questions:", err);
      setAiQuestions([]);
    } finally {
      setIsLoadingAI(false);
    }
  }, []);

  const handleSelectDomain = (domain: "Tech" | "Accounting") => {
    setSelectedDomain(domain);
    setAnswers({});
    setResults(null);
    setAiQuestions([]);
    setStage("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    setAiQuestions([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRegenerate = () => {
    if (!selectedDomain) return;
    setAnswers({});
    fetchAIQuestions(selectedDomain);
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
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => handleSelectDomain("Tech")}
              className="group rounded-2xl border-2 border-primary/20 bg-card p-8 text-left shadow-sm transition-all hover:border-primary/50 hover:shadow-lg active:scale-[0.98]"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-card-foreground">Tech Domain</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Test your knowledge in Software Development, Data Analysis, and Cybersecurity.
                Includes coding fill-in-the-blank challenges.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                Start Quiz <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </button>

            <button
              onClick={() => handleSelectDomain("Accounting")}
              className="group rounded-2xl border-2 border-secondary/20 bg-card p-8 text-left shadow-sm transition-all hover:border-secondary/50 hover:shadow-lg active:scale-[0.98]"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <Calculator className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-card-foreground">Accounting Domain</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Test your knowledge in Bookkeeping, Financial Statements, Tax, and Accounting Software.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-secondary">
                Start Quiz <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
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
                disabled={isLoadingAI}
              >
                {isLoadingAI ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <RefreshCw className="h-3 w-3" />
                )}
                {isLoadingAI ? "Generating…" : "Regenerate Questions"}
              </Button>
            </div>

            {isLoadingAI ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
                <p className="text-sm font-medium">Generating AI questions…</p>
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
