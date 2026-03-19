import { CareerQuizResult, DomainScore, CareerMatch } from "@/lib/scoring";
import { ResultsDisplay } from "./ResultsDisplay";
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

interface FinalResultsProps {
  stage1?: {
    domains: DomainScore[];
    topDomain: string;
    topCareers: CareerMatch[];
  };
  stage2: CareerQuizResult[];
}

export function FinalResults({ stage1, stage2 }: FinalResultsProps) {
  return (
    <div className="space-y-8">
      {/* Stage 1 recap (only shown in discover flow) */}
      {stage1 && (
        <div>
          <h2 className="mb-3 font-display text-lg font-bold text-foreground">
            Preference Match
          </h2>
          <ResultsDisplay
            domains={stage1.domains}
            topDomain={stage1.topDomain}
            topCareer={stage1.topCareers[0]}
          />
        </div>
      )}

      {/* Stage 2 quiz results */}
      <div>
        <h2 className="mb-3 font-display text-lg font-bold text-foreground">
          Knowledge Assessment
        </h2>
        <div className="space-y-4">
          {stage2.map((result) => {
            const hasWeakSkills = result.weakSkills.length > 0;
            return (
              <div key={result.careerTitle} className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-card-foreground">
                    {result.careerTitle}
                  </h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                    result.overallScore >= 75
                      ? "bg-secondary/15 text-secondary"
                      : result.overallScore >= 50
                        ? "bg-accent/15 text-accent"
                        : "bg-destructive/15 text-destructive"
                  }`}>
                    {result.overallScore}% Score
                  </span>
                </div>

                {/* Score bar */}
                <div className="mb-4 h-3 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      result.overallScore >= 75
                        ? "bg-secondary"
                        : result.overallScore >= 50
                          ? "bg-accent"
                          : "bg-destructive"
                    }`}
                    style={{ width: `${result.overallScore}%` }}
                  />
                </div>

                {/* Skill breakdown bars */}
                <div className="mb-3 space-y-2">
                  {result.skillResults.map((s) => (
                    <div key={s.skill} className="flex items-center gap-2 text-sm">
                      <span className="w-36 shrink-0 text-muted-foreground">{s.skill}</span>
                      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${s.percentage < 100 ? "bg-accent" : "bg-secondary"}`}
                          style={{ width: `${s.percentage}%` }}
                        />
                      </div>
                      <span className="w-16 text-right text-xs text-muted-foreground">
                        {s.correct}/{s.total} correct
                      </span>
                    </div>
                  ))}
                </div>

                {/* Weak skills */}
                {hasWeakSkills ? (
                  <div className="rounded-md bg-accent/10 p-3">
                    <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-accent">
                      <AlertTriangle className="h-3 w-3" />
                      Skills to Improve
                    </div>
                    {result.weakSkills.map((ws) => (
                      <div key={ws.skill} className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ArrowRight className="h-3 w-3 shrink-0" />
                        <span>
                          <strong>{ws.skill}</strong> — scored {ws.correct}/{ws.total} ({ws.percentage}%)
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md bg-secondary/10 p-3">
                    <div className="flex items-center gap-1 text-xs font-semibold text-secondary">
                      <CheckCircle className="h-3 w-3" />
                      Perfect score — great knowledge!
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
