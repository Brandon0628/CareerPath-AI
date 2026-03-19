import { useState } from "react";
import { SKILLS, calculateScores, DomainResult } from "@/lib/scoring";
import { SkillRater } from "@/components/SkillRater";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { Button } from "@/components/ui/button";
import { Compass, RotateCcw } from "lucide-react";

const Index = () => {
  const [ratings, setRatings] = useState<Record<string, number>>(
    Object.fromEntries(SKILLS.map((s) => [s.id, 0]))
  );
  const [results, setResults] = useState<{
    results: DomainResult[];
    topDomain: string;
  } | null>(null);

  const handleRate = (skillId: string, value: number) => {
    setRatings((prev) => ({ ...prev, [skillId]: value }));
  };

  const handleSubmit = () => {
    setResults(calculateScores(ratings));
  };

  const handleReset = () => {
    setRatings(Object.fromEntries(SKILLS.map((s) => [s.id, 0])));
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Compass className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            AI Career Guide
          </h1>
          <p className="mt-2 text-muted-foreground">
            Rate your skills & interests (0–5) to discover your best-fit career
            domain
          </p>
        </div>

        {!results ? (
          <>
            {/* Skills grid */}
            <div className="space-y-3">
              {SKILLS.map((skill) => (
                <SkillRater
                  key={skill.id}
                  skill={skill}
                  value={ratings[skill.id]}
                  onChange={(v) => handleRate(skill.id, v)}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button onClick={handleSubmit} size="lg" className="px-8">
                Get My Results
              </Button>
            </div>
          </>
        ) : (
          <>
            <ResultsDisplay results={results.results} topDomain={results.topDomain} />
            <div className="mt-8 text-center">
              <Button onClick={handleReset} variant="outline" size="lg" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Start Over
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
