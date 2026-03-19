import { QuizQuestion } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, CheckCircle } from "lucide-react";

interface SkillAssessmentProps {
  questions: QuizQuestion[];
  answers: Record<string, string>;
  onAnswer: (id: string, value: string) => void;
  onSubmit: () => void;
  topCareers: string[];
}

export function SkillAssessment({ questions, answers, onAnswer, onSubmit, topCareers }: SkillAssessmentProps) {
  const allAnswered = questions.every((q) => answers[q.id] !== undefined);
  const answered = questions.filter((q) => answers[q.id] !== undefined).length;
  const total = questions.length;

  // Group by career
  const grouped: Record<string, QuizQuestion[]> = {};
  questions.forEach((q) => {
    if (!grouped[q.careerTitle]) grouped[q.careerTitle] = [];
    grouped[q.careerTitle].push(q);
  });

  // Track question index across careers
  let globalIndex = 0;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border-2 border-secondary/30 bg-secondary/5 p-6 text-center">
        <ClipboardCheck className="mx-auto mb-2 h-8 w-8 text-secondary" />
        <h3 className="text-xl font-bold text-foreground">Stage 2: Knowledge Quiz</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Test your knowledge for your top career match{topCareers.length > 1 ? "es" : ""}:{" "}
          <strong>{topCareers.join(", ")}</strong>
        </p>
      </div>

      {/* Progress bar matching Stage 1 */}
      <div>
        <div className="mb-1 flex justify-between text-xs font-medium text-muted-foreground">
          <span>{answered}/{total} answered</span>
          <span>{total > 0 ? Math.round((answered / total) * 100) : 0}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${total > 0 ? (answered / total) * 100 : 0}%` }}
          />
        </div>
      </div>

      {Object.entries(grouped).map(([career, qs]) => (
        <div key={career} className="space-y-4">
          <h4 className="font-display text-lg font-bold text-foreground">{career}</h4>
          {qs.map((q) => {
            const idx = globalIndex++;
            return (
              <div key={q.id} className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    Q{idx + 1} of {total}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {q.skill}
                  </span>
                </div>
                <p className="mb-4 font-display text-base font-semibold leading-snug text-card-foreground">
                  {q.text}
                </p>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {q.options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => onAnswer(q.id, opt.label)}
                      className={`flex items-center gap-2 rounded-lg border-2 px-3 py-3 text-left text-sm font-medium transition-all ${
                        answers[q.id] === opt.label
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-transparent bg-muted text-muted-foreground hover:border-border hover:bg-muted/80"
                      }`}
                    >
                      {answers[q.id] === opt.label && <CheckCircle className="h-4 w-4 shrink-0" />}
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <div className="text-center">
        <Button onClick={onSubmit} size="lg" className="px-8" disabled={!allAnswered}>
          {allAnswered ? "See Final Results" : `Answer all ${total} questions to continue`}
        </Button>
      </div>
    </div>
  );
}
