import { Skill } from "@/lib/scoring";

interface SkillRaterProps {
  skill: Skill;
  value: number;
  onChange: (value: number) => void;
}

const ratingLabels = ["None", "Low", "Some", "Good", "Strong", "Expert"];

export function SkillRater({ skill, value, onChange }: SkillRaterProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md">
      <div className="mb-1 font-display font-semibold text-card-foreground">
        {skill.label}
      </div>
      <p className="mb-3 text-sm text-muted-foreground">{skill.description}</p>
      <div className="flex items-center gap-2">
        {[0, 1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => onChange(level)}
            className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-all ${
              value === level
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-primary/10"
            }`}
          >
            {level}
          </button>
        ))}
        <span className="ml-2 text-xs text-muted-foreground">
          {ratingLabels[value]}
        </span>
      </div>
    </div>
  );
}
