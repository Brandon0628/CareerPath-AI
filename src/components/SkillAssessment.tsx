import { SkillQuestion } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { ClipboardCheck } from "lucide-react";

interface SkillAssessmentProps {
  questions: SkillQuestion[];
  answers: Record<string, number>;
  onAnswer: (id: string, value: number) => void;
  onSubmit: () => void;
  topCareers: string[];
}

export function SkillAssessment({ questions, answers, onAnswer, onSubmit, topCareers }: SkillAssessmentProps) {
  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  // Group by career
  const grouped: Record<string, SkillQuestion[]> = {};
  questions.forEach((q) => {
    if (!grouped[q.careerTitle]) grouped[q.careerTitle] = [];
    grouped[q.careerTitle].push(q);
  });

  return (
    <div className="space-y-6">
      <div className="rounded-xl border-2 border-secondary/30 bg-secondary/5 p-6 text-center">
        <ClipboardCheck className="mx-auto mb-2 h-8 w-8 text-secondary" />
        <h3 className="text-xl font-bold text-foreground">Stage 2: Skill Assessment</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Rate your current skill level (0–5) for your top career match{topCareers.length > 1 ? "es" : ""}:{" "}
          <strong>{topCareers.join(", ")}</strong>
        </p>
      </div>

      {Object.entries(grouped).map(([career, qs]) => (
        <div key={career} className="rounded-xl border border-border bg-card p-5">
          <h4 className="mb-4 font-display text-lg font-bold text-card-foreground">{career}</h4>
          <div className="space-y-4">
            {qs.map((q) => (
              <div key={q.id} className="rounded-lg border border-border bg-background p-4">
                <p className="mb-1 text-sm font-semibold text-foreground">{q.text}</p>
                <p className="mb-3 text-xs text-muted-foreground">
                  Required level: {q.requiredLevel}/5
                </p>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => onAnswer(q.id, level)}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 text-sm font-bold transition-all ${
                        answers[q.id] === level
                          ? "border-secondary bg-secondary/15 text-secondary"
                          : "border-transparent bg-muted text-muted-foreground hover:border-border"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center">
        <Button onClick={onSubmit} size="lg" className="px-8" disabled={!allAnswered}>
          {allAnswered ? "See Final Results" : "Rate all skills to continue"}
        </Button>
      </div>
    </div>
  );
}
