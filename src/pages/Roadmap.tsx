import { CAREER_ROADMAPS } from "@/lib/scoring";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, GraduationCap } from "lucide-react";

const LEVEL_STYLES: Record<string, { bg: string; border: string; dot: string }> = {
  entry: { bg: "bg-primary/5", border: "border-primary/30", dot: "bg-primary" },
  mid: { bg: "bg-secondary/5", border: "border-secondary/30", dot: "bg-secondary" },
  senior: { bg: "bg-accent/5", border: "border-accent/30", dot: "bg-accent" },
  lead: { bg: "bg-destructive/5", border: "border-destructive/30", dot: "bg-destructive" },
};

const LEVEL_LABELS: Record<string, string> = {
  entry: "Entry Level",
  mid: "Mid Level",
  senior: "Senior Level",
  lead: "Leadership",
};

const Roadmap = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4 gap-2 text-muted-foreground">
              <ArrowLeft className="h-3 w-3" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <GraduationCap className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Career Roadmaps
              </h1>
              <p className="text-sm text-muted-foreground">
                Explore progression paths from entry-level to leadership
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {CAREER_ROADMAPS.map((roadmap) => {
            const isTech = roadmap.domain === "Tech";
            return (
              <div key={roadmap.careerTitle} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${isTech ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
                    {roadmap.domain}
                  </span>
                  <h2 className="font-display text-lg font-bold text-card-foreground">
                    {roadmap.careerTitle}
                  </h2>
                </div>

                {/* Timeline */}
                <div className="relative ml-4">
                  {/* Vertical line */}
                  <div className="absolute left-0 top-0 h-full w-0.5 bg-border" />

                  <div className="space-y-4">
                    {roadmap.nodes.map((node, i) => {
                      const styles = LEVEL_STYLES[node.level];
                      const isLast = i === roadmap.nodes.length - 1;
                      return (
                        <div key={node.id} className="relative pl-8">
                          {/* Dot on timeline */}
                          <div className={`absolute left-0 top-3 -translate-x-1/2 h-3 w-3 rounded-full border-2 border-card ${styles.dot}`} />
                          {/* Arrow between nodes */}
                          {!isLast && (
                            <div className="absolute left-0 top-8 -translate-x-1/2">
                              <ArrowRight className="h-3 w-3 rotate-90 text-muted-foreground" />
                            </div>
                          )}

                          <div className={`rounded-xl border ${styles.border} ${styles.bg} p-4`}>
                            <div className="mb-1 flex items-center justify-between">
                              <span className="font-display text-sm font-bold text-foreground">{node.title}</span>
                              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                                {LEVEL_LABELS[node.level]}
                              </span>
                            </div>
                            <p className="mb-2 text-xs text-muted-foreground">{node.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {node.skills.map((skill) => (
                                <span key={skill} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
