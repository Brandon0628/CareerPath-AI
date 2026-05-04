import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Mission = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
          Our Mission
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Built by a student, for students — because not knowing what to do with your life shouldn't be the norm.
        </p>
      </section>

      {/* The Problem */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-semibold text-foreground">The Problem We're Solving</h2>
        <p className="text-muted-foreground leading-relaxed">
          73 million young people worldwide are unemployed (ILO, 2024). But the deeper crisis is invisible: millions more are underemployed or stuck in careers they fell into by accident — not by choice. In Malaysia and across Southeast Asia, most students finish secondary school without a clear understanding of what careers exist, what skills those careers require, or what path to take. The result? Wrong degrees, wasted years, and lost potential.
        </p>
      </section>

      {/* Our Story */}
      <section className="space-y-4">
        <h2 className="text-2xl font-display font-semibold text-foreground">Why We Built This</h2>
        <p className="text-muted-foreground leading-relaxed">
          This project started with a personal frustration. At 17, about to graduate, I realized I had no real idea what field to study or commit to — and neither did most of my friends. School teaches us subjects, not careers. GuidePost Genius is our answer to that gap.
        </p>
      </section>

      {/* The Solution */}
      <section className="space-y-6">
        <h2 className="text-2xl font-display font-semibold text-foreground">What GuidePost Genius Does</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: "🧭", title: "Career Discovery", desc: "An AI-guided assessment that maps your personality and preferences to real career paths — not generic job titles." },
            { icon: "🧪", title: "Skill Testing", desc: "Domain-specific quizzes powered by AI, so you know where you actually stand before committing." },
            { icon: "🗺️", title: "Learning Roadmaps", desc: "Step-by-step visual roadmaps showing exactly how to get from where you are to where you want to be." },
          ].map((f) => (
            <Card key={f.title}>
              <CardContent className="p-6 space-y-3">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="text-lg font-display font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SDG */}
      <section className="space-y-6">
        <h2 className="text-2xl font-display font-semibold text-foreground">Aligned with the UN Sustainable Development Goals</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-l-4 border-l-secondary">
            <CardContent className="p-6 space-y-2">
              <h3 className="text-lg font-display font-semibold text-foreground">📚 SDG 4: Quality Education</h3>
              <p className="text-sm text-muted-foreground">We ensure every student — regardless of background — has access to quality career knowledge and learning pathways.</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6 space-y-2">
              <h3 className="text-lg font-display font-semibold text-foreground">💼 SDG 8: Decent Work & Economic Growth</h3>
              <p className="text-sm text-muted-foreground">We directly tackle youth unemployment and underemployment by empowering informed career decisions from the start.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-4">
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/discover">Start Your Journey</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/roadmap">Explore Career Roadmaps</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Mission;