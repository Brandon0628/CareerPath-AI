import { Compass, Brain, Map, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Hero */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Compass className="h-7 w-7" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            AI Career Guide
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Discover your ideal career path through preference assessment and hands-on skill testing.
            Get personalized recommendations, learning resources, and a clear roadmap to success.
          </p>
        </div>

        {/* Two main options */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Discover Your Strengths */}
          <Link to="/discover" className="group">
            <div className="relative h-full overflow-hidden rounded-2xl border-2 border-primary/20 bg-card p-8 shadow-sm transition-all hover:border-primary/50 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mb-2 font-display text-xl font-bold text-card-foreground">
                Discover Your Strengths
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Answer 10 MBTI-style preference questions to uncover your ideal career domain.
                Get personalized career recommendations and curated learning resources.
              </p>
              <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3 shrink-0 text-primary" />
                  10 preference questions (1–4 scale)
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3 shrink-0 text-primary" />
                  Career domain & path recommendations
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3 shrink-0 text-primary" />
                  Tailored learning resources & roadmap
                </li>
              </ul>
              <Button className="gap-2 group-hover:gap-3 transition-all">
                Start Assessment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Link>

          {/* Test Your Skills */}
          <Link to="/test-skills" className="group">
            <div className="relative h-full overflow-hidden rounded-2xl border-2 border-secondary/20 bg-card p-8 shadow-sm transition-all hover:border-secondary/50 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <Map className="h-6 w-6 text-secondary" />
              </div>
              <h2 className="mb-2 font-display text-xl font-bold text-card-foreground">
                Test Your Skills
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Choose a domain and take knowledge-based quizzes with real problems.
                Includes coding fill-in-the-blank challenges for Tech and finance problems for Accounting.
              </p>
              <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3 shrink-0 text-secondary" />
                  Choose Tech or Accounting domain
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3 shrink-0 text-secondary" />
                  MCQ + fill-in-the-blank coding problems
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3 shrink-0 text-secondary" />
                  Skill gap analysis & improvement areas
                </li>
              </ul>
              <Button variant="secondary" className="gap-2 group-hover:gap-3 transition-all">
                Take Quiz
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Link>
        </div>

        {/* Career paths preview */}
        <div className="mt-12 text-center">
          <Link to="/roadmap">
            <Button variant="outline" className="gap-2">
              <Map className="h-4 w-4" />
              Explore Career Roadmaps
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
