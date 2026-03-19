import { DomainScore, CareerMatch } from "@/lib/scoring";
import { Trophy, AlertTriangle, ArrowRight, Briefcase, Star } from "lucide-react";

interface ResultsDisplayProps {
  domains: DomainScore[];
  topDomain: string;
  topCareer: CareerMatch;
}

export function ResultsDisplay({ domains, topDomain, topCareer }: ResultsDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Top recommendation */}
      <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 text-center">
        <Trophy className="mx-auto mb-2 h-8 w-8 text-accent" />
        <h3 className="text-xl font-bold text-foreground">
          Best Domain: {topDomain}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Top Career Match: <strong>{topCareer.career.title}</strong> ({topCareer.percentage}%)
        </p>
      </div>

      {/* Domain scores */}
      {domains.map((domain) => {
        const isTech = domain.domain === "Tech";
        const barColor = isTech ? "bg-tech" : "bg-secondary";
        const bgColor = isTech ? "bg-tech-light" : "bg-accounting-light";
        const iconColor = isTech ? "text-tech" : "text-secondary";

        return (
          <div key={domain.domain} className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className={`h-5 w-5 ${iconColor}`} />
                <span className="font-display text-lg font-bold text-card-foreground">
                  {domain.domain}
                </span>
              </div>
              <span className="text-sm font-semibold text-muted-foreground">
                {domain.totalScore}/{domain.maxScore} pts · {domain.percentage}%
              </span>
            </div>

            {/* Domain bar */}
            <div className={`mb-4 h-3 w-full overflow-hidden rounded-full ${bgColor}`}>
              <div
                className={`h-full rounded-full ${barColor} animate-score-fill`}
                style={{ "--score-width": `${domain.percentage}%`, width: `${domain.percentage}%` } as React.CSSProperties}
              />
            </div>

            {/* Careers within domain */}
            <div className="space-y-3">
              {domain.careers.map((cm) => (
                <div key={cm.career.title} className="rounded-lg border border-border bg-background p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className={`h-4 w-4 ${cm === topCareer ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                      <span className="font-display font-semibold text-foreground">
                        {cm.career.title}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {cm.percentage}%
                    </span>
                  </div>

                  {/* Skill breakdown */}
                  <div className="mb-2 space-y-1">
                    {cm.skillBreakdown.map((sb) => (
                      <div key={sb.skill} className="flex items-center gap-2 text-sm">
                        <span className="w-32 shrink-0 text-muted-foreground">{sb.skill}</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full ${barColor}`}
                            style={{ width: `${sb.maxScore > 0 ? (sb.score / sb.maxScore) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="w-12 text-right text-xs text-muted-foreground">
                          {sb.score}/{sb.maxScore}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Skill gaps */}
                  {cm.skillGaps.length > 0 && (
                    <div className="mt-2 rounded-md bg-accent/10 p-2">
                      <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-accent">
                        <AlertTriangle className="h-3 w-3" />
                        Skill Gaps
                      </div>
                      {cm.skillGaps.map((gap) => (
                        <div key={gap.skill} className="flex items-center gap-1 text-xs text-muted-foreground">
                          <ArrowRight className="h-3 w-3 shrink-0" />
                          <span>
                            <strong>{gap.skill}</strong> — {Math.round((gap.score / gap.maxScore) * 100)}% (needs improvement)
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
