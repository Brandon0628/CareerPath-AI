import { QuizQuestion } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, CircleCheck as CheckCircle, Code } from "lucide-react";

interface SkillAssessmentProps {
  questions: QuizQuestion[];
  answers: Record<string, string>;
  onAnswer: (id: string, value: string) => void;
  onSubmit: () => void;
  topCareers: string[];
}

export function SkillAssessment({ questions, answers, onAnswer, onSubmit, topCareers }: SkillAssessmentProps) {
  // Group by career
  const grouped: Record<string, QuizQuestion[]> = {};
  questions.forEach((q) => {
    if (!grouped[q.careerTitle]) grouped[q.careerTitle] = [];
    grouped[q.careerTitle].push(q);
  });

  // Per-career completion check
  const careerStatus = Object.entries(grouped).map(([career, qs]) => {
    const answeredCount = qs.filter((q) => answers[q.id] !== undefined).length;
    return {
      career,
      total: qs.length,
      answered: answeredCount,
      complete: answeredCount === qs.length,
      started: answeredCount > 0,
      partial: answeredCount > 0 && answeredCount < qs.length,
    };
  });

  const hasPartial = careerStatus.some((s) => s.partial);
  const atLeastOneComplete = careerStatus.some((s) => s.complete);
  const canSubmit = atLeastOneComplete && !hasPartial;
  const answered = questions.filter((q) => answers[q.id] !== undefined).length;
  const total = questions.length;
  const completedCareers = careerStatus.filter((s) => s.complete).length;
  const totalCareers = careerStatus.length;

  let globalIndex = 0;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border-2 border-secondary/30 bg-secondary/5 p-6 text-center">
        <ClipboardCheck className="mx-auto mb-2 h-8 w-8 text-secondary" />
        <h3 className="text-xl font-bold text-foreground">Knowledge Quiz</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Test your knowledge for:{" "}
          <strong>{topCareers.join(", ")}</strong>
        </p>
        <p className="mt-2 text-xs text-muted-foreground italic">
          Complete all questions in a field to count it — or skip a field entirely. You cannot partially answer a field.
        </p>
      </div>

      {/* Progress bar */}
      <div>
        <div className="mb-1 flex justify-between text-xs font-medium text-muted-foreground">
          <span>{answered}/{total} answered</span>
          <span>{completedCareers}/{totalCareers} fields complete</span>
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
          {(() => {
            const status = careerStatus.find((s) => s.career === career);
            return status ? (
              <div className={`mb-3 flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium ${
                status.complete ? "bg-green-50 text-green-700 border border-green-200" :
                status.partial ? "bg-amber-50 text-amber-700 border border-amber-200" :
                "bg-muted text-muted-foreground"
              }`}>
                <span>{career}</span>
                <span>
                  {status.answered}/{status.total} answered
                  {status.complete ? " ✓ Complete" : status.partial ? " — finish all or skip entirely" : " — skippable"}
                </span>
              </div>
            ) : null;
          })()}
          <h4 className="font-display text-lg font-bold text-foreground">{career}</h4>
          {qs.map((q) => {
            const idx = globalIndex++;
            const isFillBlank = q.type === "fill-blank";
            return (
              <div key={q.id} className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    Q{idx + 1} of {total}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isFillBlank && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary flex items-center gap-1">
                        <Code className="h-3 w-3" />
                        Fill in the Blank
                      </span>
                    )}
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {q.skill}
                    </span>
                  </div>
                </div>

                <p className="mb-3 font-display text-base font-semibold leading-snug text-card-foreground">
                  {q.text}
                </p>

                {isFillBlank && q.codeSnippet && (
                  <div className="mb-4 overflow-x-auto rounded-lg bg-foreground/5 border border-border p-4">
                    <pre className="text-sm font-mono text-foreground">
                      {q.codeSnippet.split("______").map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="inline-block rounded bg-primary/20 px-2 py-0.5 text-primary font-bold border border-primary/30">
                              {answers[q.id] || "______"}
                            </span>
                          )}
                        </span>
                      ))}
                    </pre>
                  </div>
                )}

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
                      <span className={isFillBlank ? "font-mono" : ""}>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <div className="space-y-3 text-center">
        {hasPartial && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            ⚠️ You've partially answered some fields. Complete all questions in that field or leave it entirely unanswered.
            <ul className="mt-2 text-left list-disc pl-5">
              {careerStatus.filter((s) => s.partial).map((s) => (
                <li key={s.career}>{s.career} — {s.answered}/{s.total} answered</li>
              ))}
            </ul>
          </div>
        )}

        {!atLeastOneComplete && !hasPartial && (
          <p className="text-sm text-muted-foreground italic">
            Complete all questions in at least one field to see your results.
          </p>
        )}

        <Button
          onClick={onSubmit}
          size="lg"
          className="px-8"
          disabled={!canSubmit}
        >
          {canSubmit
            ? `See Results (${completedCareers} field${completedCareers !== 1 ? "s" : ""} completed)`
            : hasPartial
            ? "Finish or skip partial fields to continue"
            : "Complete at least one field to continue"}
        </Button>
      </div>
    </div>
  );
}