import { useState, useEffect } from "react";
import {
  Compass, Brain, Map, ArrowRight, Search,
  Bot, Route, Star, MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { getLastResult } from "@/lib/session";

interface ReviewPreview {
  id: string;
  name: string | null;
  comment: string;
  rating: number;
}

const Home = () => {
  const [sessionCount, setSessionCount] = useState<number | null>(null);
  const [lastResult, setLastResult] = useState<{ topCareer: string; overallScore: number } | null>(null);
  const [recentReviews, setRecentReviews] = useState<ReviewPreview[]>([]);

  useEffect(() => {
    (supabase as any)
      .from("user_sessions")
      .select("*", { count: "exact", head: true })
      .then(({ count }: { count: number | null }) => setSessionCount(count ?? 0));

    getLastResult().then(setLastResult);

    (supabase as any)
      .from("user_reviews")
      .select("id, name, comment, rating")
      .order("created_at", { ascending: false })
      .limit(12)
      .then(({ data }: { data: ReviewPreview[] | null }) => {
        if (data) setRecentReviews(data);
      });
  }, []);

  // Duplicate reviews so marquee loops seamlessly
  const marqueeReviews = recentReviews.length > 0
    ? [...recentReviews, ...recentReviews, ...recentReviews]
    : [];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-12">

        {/* SDG Pill Banner */}
        <div className="mb-6 flex justify-center opacity-0 animate-fade-in-up">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500/15 to-teal-500/15 px-4 py-1.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-500/20 backdrop-blur-sm">
            🌍 Supporting UN SDG 4: Quality Education & SDG 8: Decent Work and Economic Growth
          </span>
        </div>

        {/* Welcome Back Banner */}
        {lastResult && (
          <div className="mb-4 flex justify-center opacity-0 animate-fade-in-up">
            <Link to="/test-skills">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 backdrop-blur-sm px-4 py-2 text-sm hover:bg-white/80 transition-all cursor-pointer shadow-sm">
                <span className="text-muted-foreground">Welcome back! Last result:</span>
                <span className="font-bold text-primary">{lastResult.topCareer}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">{lastResult.overallScore}%</span>
                <span className="text-xs text-muted-foreground">→ Retake</span>
              </div>
            </Link>
          </div>
        )}

        {/* Hero */}
        <div className="mb-10 text-center opacity-0 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg glow-primary animate-float">
            <Compass className="h-8 w-8" />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary/70">CareerPath AI</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-tight">
            Stop scrolling for answers.
            <br />
            <span className="text-gradient">Start knowing yourself.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
            73 million young people chose the wrong career. CareerPath AI helps you discover your path through AI-powered personality profiling, skill assessment, and your personalised{" "}
            <span className="font-semibold text-foreground">Career Blueprint</span> — before it's too late.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/discover">
              <Button size="lg" className="gap-2 px-6 glow-primary shadow-lg">
                Get My Career Blueprint
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/advisor">
              <Button size="lg" variant="outline" className="gap-2 px-6 bg-white/60 backdrop-blur-sm hover:bg-white/80 border-white/60">
                <Bot className="h-4 w-4" />
                Talk to AI Advisor
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Row — glass cards */}
        <div className="mb-10 grid grid-cols-3 gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          {[
            { value: sessionCount !== null ? `${sessionCount}+` : "...", label: "Assessments Taken" },
            { value: "5", label: "Career Domains" },
            { value: "100%", label: "Free Forever" },
          ].map((stat) => (
            <div key={stat.label} className="card-glass flex flex-col items-center justify-center p-4 text-center">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main feature cards — glass */}
        <div className="grid gap-5 sm:grid-cols-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "250ms" }}>
          <Link to="/discover" className="group">
            <div className="card-glass relative h-full overflow-hidden p-7 group-hover:border-primary/40 transition-all">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                🗺️ Generates your Career Blueprint
              </div>
              <h2 className="mb-2 font-display text-xl font-bold text-card-foreground">
                Discover Your Strengths
              </h2>
              <p className="mb-5 text-sm text-muted-foreground leading-relaxed">
                40-question MBTI personality assessment across 4 dimensions, followed by an AI knowledge quiz — reveals your unique Career Blueprint.
              </p>
              <ul className="mb-5 space-y-1.5 text-sm text-muted-foreground">
                {["MBTI personality profiling (4 dimensions)", "AI-generated knowledge questions", "Malaysian salary & university data"].map(t => (
                  <li key={t} className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 shrink-0 text-primary" />{t}
                  </li>
                ))}
              </ul>
              <Button className="gap-2 group-hover:gap-3 transition-all">
                Start Assessment <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Link>

          <Link to="/test-skills" className="group">
            <div className="card-glass relative h-full overflow-hidden p-7 group-hover:border-secondary/40 transition-all">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <Map className="h-6 w-6 text-secondary" />
              </div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-2.5 py-0.5 text-[11px] font-semibold text-secondary">
                🤖 Groq AI — unique every session
              </div>
              <h2 className="mb-2 font-display text-xl font-bold text-card-foreground">
                Test Your Skills
              </h2>
              <p className="mb-5 text-sm text-muted-foreground leading-relaxed">
                Pick a domain, answer AI-generated questions, and see exactly where you stand — with improvement resources for every weak area.
              </p>
              <ul className="mb-5 space-y-1.5 text-sm text-muted-foreground">
                {["5 career domains to choose from", "MCQ + fill-in-the-blank questions", "Skill gap analysis + free resources"].map(t => (
                  <li key={t} className="flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 shrink-0 text-secondary" />{t}
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="gap-2 group-hover:gap-3 transition-all">
                Take Quiz <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Link>
        </div>

        {/* Secondary links — glass */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <Link to="/find-careers" className="group">
            <div className="card-glass p-5 group-hover:border-accent/40">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <Search className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-sm font-bold text-foreground">Find Careers by Skills</h3>
                  <p className="text-xs text-muted-foreground">Select skills you have → see matching careers</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
          <Link to="/roadmap" className="group">
            <div className="card-glass p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/80">
                  <Route className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-sm font-bold text-foreground">Career Roadmaps</h3>
                  <p className="text-xs text-muted-foreground">Step-by-step paths from beginner to hired</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>

        {/* ── FLOWING REVIEWS MARQUEE ── */}
        {marqueeReviews.length > 0 && (
          <div className="mt-14 opacity-0 animate-fade-in-up" style={{ animationDelay: "350ms" }}>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">What Students Say</h2>
                <p className="text-sm text-muted-foreground">Hover to pause • Real feedback from real users</p>
              </div>
              <Link to="/reviews">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs bg-white/60 backdrop-blur-sm border-white/60">
                  <MessageSquare className="h-3 w-3" />
                  All Reviews
                </Button>
              </Link>
            </div>

            {/* Marquee container */}
            <div className="overflow-hidden relative">
              {/* Fade edges */}
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background/80 to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background/80 to-transparent" />

              <div className="flex animate-marquee gap-4 w-max">
                {marqueeReviews.map((review, i) => (
                  <div
                    key={`${review.id}-${i}`}
                    className="card-glass w-72 shrink-0 p-5"
                  >
                    <div className="mb-2 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`h-3.5 w-3.5 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
                        />
                      ))}
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed italic">
                      "{review.comment}"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                        {review.name ? review.name[0].toUpperCase() : "A"}
                      </div>
                      <p className="text-xs font-semibold text-foreground">
                        {review.name || "Anonymous"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 text-center">
              <Link to="/reviews">
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground text-xs">
                  Leave your own review <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* SDG Section */}
        <div className="mt-14 opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <h2 className="mb-6 text-center font-display text-2xl font-bold text-foreground">
            Built for the UN Sustainable Development Goals
          </h2>
          <div className="card-glass p-6 my-6">
            <h3 className="font-display text-lg font-bold mb-4 text-center text-foreground">Why This Matters</h3>
            <div className="grid gap-3 sm:grid-cols-3 text-center">
              {[
                { stat: "73 million", desc: "young people unemployed globally (ILO, 2024)" },
                { stat: "1 in 3", desc: "Malaysian graduates work in unrelated fields (DOSM)" },
                { stat: "Age 17", desc: "is when career decisions begin — but guidance is scarce" }
              ].map(item => (
                <div key={item.stat} className="rounded-xl bg-foreground/5 border border-border/40 p-3">
                  <p className="text-xl font-bold text-primary">{item.stat}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4 italic">
              CareerPath AI was built to change these numbers — one student at a time.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="card-glass border-l-4 border-l-emerald-500">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-lg font-display font-semibold text-foreground">📚 SDG 4: Quality Education</h3>
                <p className="text-sm text-muted-foreground">Ensuring inclusive access to career knowledge and learning pathways for every student.</p>
              </CardContent>
            </Card>
            <Card className="card-glass border-l-4 border-l-blue-500">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-lg font-display font-semibold text-foreground">💼 SDG 8: Decent Work & Economic Growth</h3>
                <p className="text-sm text-muted-foreground">Tackling youth unemployment by empowering informed career decisions from the start.</p>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;