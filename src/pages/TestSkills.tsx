import { useState } from "react";
import { Link } from "react-router-dom";
import {
  getQuizQuestionsForDomain,
  calculateDomainQuizResults,
  type CareerQuizResult,
} from "@/lib/scoring";
import { SkillAssessment } from "@/components/SkillAssessment";
import { FinalResults } from "@/components/FinalResults";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Code, Calculator, RotateCcw } from "lucide-react";

type Stage = "select" | "quiz" | "results";

const TestSkills = () => {
  const [stage, setStage] = useState<Stage>("select");
  const [selectedDomain, setSelectedDomain] = useState<"Tech" | "Accounting" | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<CareerQuizResult[] | null>(null);

  const questions = selectedDomain ? getQuizQuestionsForDomain(selectedDomain) : [];
  const topCareers = selectedDomain
    ? [...new Set(questions.map((q) => q.careerTitle))]
    : [];

  const handleSelectDomain = (domain: "Tech" | "Accounting") => {
    setSelectedDomain(domain);
    setAnswers({});
    setResults(null);
    setStage("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (!selectedDomain) return;
    const res = calculateDomainQuizResults(answers, selectedDomain);
    setResults(res);
    setStage("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setStage("select");
    setSelectedDomain(null);
    setAnswers({});
    setResults(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
              className="group rounded-2xl border-2 border-primary/20 bg-card p-8 text-left shadow-sm transition-all hover:border-primary/50 hover:shadow-lg"
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
              className="group rounded-2xl border-2 border-secondary/20 bg-card p-8 text-left shadow-sm transition-all hover:border-secondary/50 hover:shadow-lg"
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
          <SkillAssessment
            questions={questions}
            answers={answers}
            onAnswer={handleAnswer}
            onSubmit={handleSubmit}
            topCareers={topCareers}
          />
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
