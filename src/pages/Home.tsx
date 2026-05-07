import { Compass, Brain, Map, ArrowRight, Search, GraduationCap, Bot, Route } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* SDG Pill Banner */}
        <div className="mb-8 flex justify-center opacity-0 animate-fade-in-up">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500/15 to-teal-500/15 px-4 py-1.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-500/20">
            🌍 Supporting UN SDG 4: Quality Education & SDG 8: Decent Work and Economic Growth
          </span>
        </div>

        {/* Hero */}
        <div className="mb-8 text-center opacity-0 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Compass className="h-7 w-7" />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Find Your Career Path with AI
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            73 million young people are unemployed globally. CareerPath AI uses AI to help students like you discover the right career — before committing to the wrong one.
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-12 grid grid-cols-1 gap-3 sm:grid-cols-3 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">5 Career Domains</p>
              <p className="text-xs text-muted-foreground">Tech, Healthcare, Business & more</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
              <Bot className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">AI-Powered</p>
              <p className="text-xs text-muted-foreground">Questions generated fresh every session</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <Route className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Step-by-step Roadmaps</p>
              <p className="text-xs text-muted-foreground">From beginner to hired</p>
            </div>
          </div>
        </div>

        {/* Two main options */}
        <div className="grid gap-6 sm:grid-cols-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
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

        {/* Find Careers by Skills */}
        <Link to="/find-careers" className="group mt-6 block opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <div className="rounded-2xl border-2 border-accent/20 bg-card p-6 shadow-sm transition-all hover:border-accent/50 hover:shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <Search className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-lg font-bold text-card-foreground">
                  Find Careers by Skills
                </h2>
                <p className="text-sm text-muted-foreground">
                  Select the skills you already have and discover matching career paths instantly.
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>

        {/* Career paths preview */}
        <div className="mt-6 text-center opacity-0 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
          <Link to="/roadmap">
            <Button variant="outline" className="gap-2">
              <Map className="h-4 w-4" />
              Explore Career Roadmaps
            </Button>
          </Link>
        </div>

        {/* SDG Section */}
        <div className="mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
          <h2 className="mb-6 text-center font-display text-2xl font-bold text-foreground">
            Built for the UN Sustainable Development Goals
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border border-border/50 border-l-4 border-l-emerald-500 shadow-sm">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-lg font-display font-semibold text-foreground">
                  📚 SDG 4: Quality Education
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ensuring inclusive access to career knowledge and learning pathways for every student.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-border/50 border-l-4 border-l-blue-500 shadow-sm">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-lg font-display font-semibold text-foreground">
                  💼 SDG 8: Decent Work & Economic Growth
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tackling youth unemployment by empowering informed career decisions from the start.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
