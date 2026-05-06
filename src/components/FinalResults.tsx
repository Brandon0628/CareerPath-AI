import { CareerQuizResult, DomainScore, CareerMatch, CAREER_RESOURCES, LearningResource } from "@/lib/scoring";
import { ResultsDisplay } from "./ResultsDisplay";
import { TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, ArrowRight, Map, MessageCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FinalResultsProps {
  stage1?: {
    domains: DomainScore[];
    topDomain: string;
    topCareers: CareerMatch[];
  };
  stage2: CareerQuizResult[];
}

function getLowestSkills(result: CareerQuizResult, count: number) {
  return [...result.skillResults]
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, count);
}

function getResourcesForCareer(careerTitle: string): LearningResource[] {
  const entry = CAREER_RESOURCES.find(
    (r) => r.careerTitle.toLowerCase() === careerTitle.toLowerCase()
  );
  return entry?.resources ?? [];
}

export function FinalResults({ stage1, stage2 }: FinalResultsProps) {
  const topCareerTitle = stage2[0]?.careerTitle ?? "";

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
              <div key={result.careerTitle} className="rounded-xl border border-border/50 bg-card p-5 shadow-sm">
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

      {/* How to Improve section */}
      <div>
        <h2 className="mb-4 font-display text-lg font-bold text-foreground">
          How to Improve
        </h2>
        <div className="space-y-4">
          {stage2.map((result) => {
            const lowestSkills = getLowestSkills(result, 2);
            const careerResources = getResourcesForCareer(topCareerTitle);

            return lowestSkills.map((skill) => {
              const matchedResources = careerResources.slice(0, 3);
              const hasResources = matchedResources.length > 0;

              return (
                <div
                  key={`${result.careerTitle}-${skill.skill}`}
                  className="rounded-xl border border-border/50 bg-card p-5 shadow-sm"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-display text-base font-bold text-card-foreground">
                      {skill.skill} — {skill.percentage}%
                    </h3>
                    <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
                      Needs work
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Here's how to level up this skill:
                  </p>

                  {hasResources ? (
                    <ul className="mb-4 space-y-2">
                      {matchedResources.map((res) => (
                        <li key={res.title}>
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg border border-border/50 px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted/50"
                          >
                            <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-primary">
                              {res.type}
                            </span>
                            <span className="flex-1 font-medium">{res.title}</span>
                            <span className="hidden text-xs text-muted-foreground sm:inline">{res.description}</span>
                            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mb-4 text-sm text-muted-foreground italic">
                      Search this skill on Coursera or YouTube to get started.
                    </p>
                  )}

                  <Link to="/roadmap">
                    <Button variant="outline" size="sm" className="gap-1.5">
                      View Full Roadmap
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              );
            });
          })}
        </div>
      </div>

      {/* Next Steps */}
      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
        <h2 className="mb-4 font-display text-lg font-bold text-foreground">
          Next Steps
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/roadmap">
            <Button className="gap-2">
              <Map className="h-4 w-4" />
              Explore Career Roadmap
            </Button>
          </Link>
          <Link to="/advisor">
            <Button variant="outline" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat with AI Advisor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
