import { CAREER_RESOURCES, type LearningResource } from "@/lib/scoring";
import { BookOpen, GraduationCap, Wrench, Map } from "lucide-react";

interface LearningResourcesProps {
  careerTitles: string[];
}

const TYPE_ICONS: Record<LearningResource["type"], React.ReactNode> = {
  course: <GraduationCap className="h-4 w-4" />,
  tutorial: <BookOpen className="h-4 w-4" />,
  tool: <Wrench className="h-4 w-4" />,
  roadmap: <Map className="h-4 w-4" />,
};

const TYPE_COLORS: Record<LearningResource["type"], string> = {
  course: "bg-primary/10 text-primary",
  tutorial: "bg-secondary/10 text-secondary",
  tool: "bg-accent/10 text-accent",
  roadmap: "bg-destructive/10 text-destructive",
};

export function LearningResources({ careerTitles }: LearningResourcesProps) {
  const relevantResources = CAREER_RESOURCES.filter((cr) =>
    careerTitles.includes(cr.careerTitle)
  );

  if (relevantResources.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-bold text-foreground">
        📚 Recommended Learning Resources
      </h3>
      {relevantResources.map((cr) => (
        <div key={cr.careerTitle} className="rounded-xl border border-border bg-card p-5">
          <h4 className="mb-3 font-display font-semibold text-card-foreground">{cr.careerTitle}</h4>
          <div className="space-y-2">
            {cr.resources.map((r) => (
              <a
                key={r.title}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-lg border border-transparent bg-muted/50 p-3 transition-all hover:border-border hover:bg-muted"
              >
                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${TYPE_COLORS[r.type]}`}>
                  {TYPE_ICONS[r.type]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{r.title}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">
                      {r.type}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
