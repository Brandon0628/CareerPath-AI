import { Question } from "@/lib/scoring";

interface QuestionCardProps {
  question: Question;
  value: number | undefined;
  onChange: (value: number) => void;
  index: number;
  total: number;
}

const LABELS = ["Strongly Disagree", "Disagree", "Agree", "Strongly Agree"];

export function QuestionCard({ question, value, onChange, index, total }: QuestionCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          Q{index + 1} of {total}
        </span>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {question.skillMap.map((s) => s.skill).join(" · ")}
        </span>
      </div>
      <p className="mb-4 font-display text-base font-semibold leading-snug text-card-foreground">
        {question.text}
      </p>

      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((level) => (
          <button
            key={level}
            onClick={() => onChange(level)}
            className={`flex flex-col items-center gap-1 rounded-lg border-2 px-2 py-3 text-center transition-all ${
              value === level
                ? "border-primary bg-primary/10 text-primary"
                : "border-transparent bg-muted text-muted-foreground hover:border-border hover:bg-muted/80"
            }`}
          >
            <span className="text-lg font-bold">{level}</span>
            <span className="text-[10px] font-medium leading-tight">{LABELS[level - 1]}</span>
          </button>
        ))}
      </div>

      <p className="mt-3 text-[11px] italic text-muted-foreground">
        {question.scoringNote}
      </p>
    </div>
  );
}
