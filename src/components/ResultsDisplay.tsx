import { DomainResult } from "@/lib/scoring";
import { Trophy, AlertTriangle, ArrowRight } from "lucide-react";

interface ResultsDisplayProps {
  results: DomainResult[];
  topDomain: string;
}

export function ResultsDisplay({ results, topDomain }: ResultsDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Top recommendation */}
      <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 text-center">
        <Trophy className="mx-auto mb-2 h-8 w-8 text-accent" />
        <h3 className="text-xl font-bold text-foreground">
          Top Recommendation: {topDomain}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Based on your skills and interests
        </p>
      </div>

      {/* Score bars */}
      <div className="space-y-4">
        {results.map((result) => {
          const isTech = result.domain === "Tech";
          const barColor = isTech ? "bg-tech" : "bg-secondary";
          const bgColor = isTech ? "bg-tech-light" : "bg-accounting-light";

          return (
            <div key={result.domain} className="rounded-lg border border-border bg-card p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display font-semibold text-card-foreground">
                  {result.domain}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {result.score}/{result.maxScore} pts ({result.percentage}%)
                </span>
              </div>
              {/* Score bar */}
              <div className={`h-3 w-full overflow-hidden rounded-full ${bgColor}`}>
                <div
                  className={`h-full rounded-full ${barColor} animate-score-fill`}
                  style={{ "--score-width": `${result.percentage}%`, width: `${result.percentage}%` } as React.CSSProperties}
                />
              </div>

              {/* Skill gaps */}
              {result.skillGaps.length > 0 && (
                <div className="mt-3">
                  <div className="mb-1 flex items-center gap-1 text-xs font-medium text-accent">
                    <AlertTriangle className="h-3 w-3" />
                    Skill Gaps to Improve
                  </div>
                  <ul className="space-y-1">
                    {result.skillGaps.map((gap) => (
                      <li
                        key={gap.skill}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <ArrowRight className="h-3 w-3 shrink-0" />
                        <span>
                          <strong>{gap.skill}</strong> — you rated{" "}
                          {gap.currentRating}/5, aim for {gap.idealRating}/5
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
