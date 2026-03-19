import { CareerSkillAssessment, DomainScore, CareerMatch } from "@/lib/scoring";
import { ResultsDisplay } from "./ResultsDisplay";
import { Trophy, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

interface FinalResultsProps {
  stage1: {
    domains: DomainScore[];
    topDomain: string;
    topCareers: CareerMatch[];
  };
  stage2: CareerSkillAssessment[];
}

export function FinalResults({ stage1, stage2 }: FinalResultsProps) {
  return (
    <div className="space-y-8">
      {/* Stage 1 recap */}
      <div>
        <h2 className="mb-3 font-display text-lg font-bold text-foreground">
          Stage 1 — Preference Match
        </h2>
        <ResultsDisplay
          domains={stage1.domains}
          topDomain={stage1.topDomain}
          topCareer={stage1.topCareers[0]}
        />
      </div>

      {/* Stage 2 skill gap analysis */}
      <div>
        <h2 className="mb-3 font-display text-lg font-bold text-foreground">
          Stage 2 — Skill Gap Analysis
        </h2>
        <div className="space-y-4">
          {stage2.map((assessment) => {
            const hasGaps = assessment.gaps.length > 0;
            return (
              <div key={assessment.careerTitle} className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-card-foreground">
                    {assessment.careerTitle}
                  </h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                    assessment.overallReadiness >= 75
                      ? "bg-secondary/15 text-secondary"
                      : assessment.overallReadiness >= 50
                        ? "bg-accent/15 text-accent"
                        : "bg-destructive/15 text-destructive"
                  }`}>
                    {assessment.overallReadiness}% Ready
                  </span>
                </div>

                {/* Readiness bar */}
                <div className="mb-4 h-3 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      assessment.overallReadiness >= 75
                        ? "bg-secondary"
                        : assessment.overallReadiness >= 50
                          ? "bg-accent"
                          : "bg-destructive"
                    }`}
                    style={{ width: `${assessment.overallReadiness}%` }}
                  />
                </div>

                {/* Skill bars */}
                <div className="mb-3 space-y-2">
                  {assessment.skills.map((s) => (
                    <div key={s.skill} className="flex items-center gap-2 text-sm">
                      <span className="w-36 shrink-0 text-muted-foreground">{s.skill}</span>
                      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        {/* Required level marker */}
                        <div
                          className="absolute top-0 h-full w-0.5 bg-foreground/30"
                          style={{ left: `${(s.requiredLevel / 5) * 100}%` }}
                        />
                        <div
                          className={`h-full rounded-full ${s.gap > 0 ? "bg-accent" : "bg-secondary"}`}
                          style={{ width: `${(s.rating / 5) * 100}%` }}
                        />
                      </div>
                      <span className="w-16 text-right text-xs text-muted-foreground">
                        {s.rating}/{s.requiredLevel} req
                      </span>
                    </div>
                  ))}
                </div>

                {/* Gaps */}
                {hasGaps ? (
                  <div className="rounded-md bg-accent/10 p-3">
                    <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-accent">
                      <AlertTriangle className="h-3 w-3" />
                      Skills to Improve
                    </div>
                    {assessment.gaps.map((gap) => (
                      <div key={gap.skill} className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ArrowRight className="h-3 w-3 shrink-0" />
                        <span>
                          <strong>{gap.skill}</strong> — currently {gap.currentLevel}/5, need {gap.requiredLevel}/5 (gap: {gap.gap})
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md bg-secondary/10 p-3">
                    <div className="flex items-center gap-1 text-xs font-semibold text-secondary">
                      <CheckCircle className="h-3 w-3" />
                      You meet all skill requirements!
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
