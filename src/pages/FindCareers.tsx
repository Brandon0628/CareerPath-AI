import { useState, useMemo } from "react";
import { ALL_SKILLS, CAREERS, type SkillName } from "@/lib/scoring";
import { Search, Briefcase, CheckCircle2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CareerResult {
  title: string;
  domain: "Tech" | "Accounting" | "Healthcare" | "Creative" | "Business";
  skills: string[];
  matchedSkills: string[];
  percentage: number;
}

const FindCareers = () => {
  const [selected, setSelected] = useState<Set<SkillName>>(new Set());

  const toggle = (skill: SkillName) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(skill) ? next.delete(skill) : next.add(skill);
      return next;
    });
  };

  const results: CareerResult[] = useMemo(() => {
    if (selected.size === 0) return [];
    return CAREERS.map((c) => {
      const matched = c.skills.filter((s) => selected.has(s as SkillName));
      return {
        title: c.title,
        domain: c.domain,
        skills: c.skills,
        matchedSkills: matched,
        percentage: Math.round((matched.length / c.skills.length) * 100),
      };
    })
      .filter((r) => r.percentage > 0)
      .sort((a, b) => b.percentage - a.percentage);
  }, [selected]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6 gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> Home
          </Button>
        </Link>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15">
            <Search className="h-6 w-6 text-accent" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Find Careers by Skills
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Select the skills you have — we'll show careers that match.
          </p>
        </div>

        {/* Skill selector */}
        <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="mb-3 text-sm font-medium text-card-foreground">Select your skills</p>
          <div className="flex flex-wrap gap-2">
            {ALL_SKILLS.map((skill) => {
              const active = selected.has(skill);
              return (
                <button
                  key={skill}
                  onClick={() => toggle(skill)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors active:scale-[0.97] ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
          {selected.size > 0 && (
            <button
              onClick={() => setSelected(new Set())}
              className="mt-3 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Results */}
        {selected.size > 0 && (
          <div className="space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground">
              {results.length > 0
                ? `${results.length} career${results.length > 1 ? "s" : ""} matched`
                : "No matching careers"}
            </h2>

            {results.map((r) => {
              const domainColor =
                r.domain === "Tech" ? "bg-[hsl(var(--tech-light))] text-[hsl(var(--tech))]"
                  : r.domain === "Accounting" ? "bg-[hsl(var(--accounting-light))] text-[hsl(var(--accounting))]"
                  : "bg-muted text-muted-foreground";
              const barColor =
                r.domain === "Tech" ? "bg-[hsl(var(--tech))]"
                  : r.domain === "Accounting" ? "bg-[hsl(var(--accounting))]"
                  : "bg-primary";

              return (
                <div
                  key={r.title}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 shrink-0 text-muted-foreground" />
                      <div>
                        <span className="font-display text-base font-bold text-card-foreground">
                          {r.title}
                        </span>
                        <Badge className={`ml-2 text-[10px] ${domainColor} border-0`}>
                          {r.domain}
                        </Badge>
                      </div>
                    </div>
                    <span className="shrink-0 font-display text-lg font-bold text-foreground">
                      {r.percentage}%
                    </span>
                  </div>

                  {/* Match bar */}
                  <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${barColor} transition-all`}
                      style={{ width: `${r.percentage}%` }}
                    />
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {r.skills.map((s) => {
                      const matched = r.matchedSkills.includes(s);
                      return (
                        <span
                          key={s}
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${
                            matched
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {matched && <CheckCircle2 className="h-3 w-3" />}
                          {s}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindCareers;
