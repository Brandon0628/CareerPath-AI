import { useState } from "react";
import { ExternalLink, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

type Domain = "All" | "Tech" | "Healthcare" | "Creative" | "Business" | "Accounting";
type ResourceType = "Article" | "Video" | "Course" | "Tool";

interface Resource {
  title: string;
  source: string;
  url: string;
  description: string;
  type: ResourceType;
  domain: Exclude<Domain, "All">;
}

const RESOURCES: Resource[] = [
  // Tech
  {
    title: "What is Software Development?",
    source: "freeCodeCamp",
    url: "https://freecodecamp.org/news/what-is-software-development",
    description: "Learn what software developers do, the skills they need, and how to get started.",
    type: "Article",
    domain: "Tech",
  },
  {
    title: "CS50 Introduction to Computer Science",
    source: "Harvard/edX",
    url: "https://cs50.harvard.edu/x",
    description: "Harvard's legendary intro to CS — free, self-paced, and open to everyone.",
    type: "Course",
    domain: "Tech",
  },
  {
    title: "What Does a Data Analyst Do?",
    source: "Coursera Blog",
    url: "https://coursera.org/articles/what-does-a-data-analyst-do",
    description: "Understand the day-to-day work, tools, and career path of a data analyst.",
    type: "Article",
    domain: "Tech",
  },
  {
    title: "Cybersecurity for Beginners",
    source: "YouTube/NetworkChuck",
    url: "https://youtube.com/c/NetworkChuck",
    description: "Engaging video series covering networking, security tools, and ethical hacking basics.",
    type: "Video",
    domain: "Tech",
  },
  // Healthcare
  {
    title: "Day in the Life of a Nurse",
    source: "YouTube/NurseTeach",
    url: "https://youtube.com/results?search_query=day+in+life+nurse",
    description: "See what a typical shift looks like and decide if nursing is right for you.",
    type: "Video",
    domain: "Healthcare",
  },
  {
    title: "What is Psychology? Careers and Specializations",
    source: "Coursera",
    url: "https://coursera.org/articles/what-is-psychology",
    description: "Explore psychology career paths from clinical to organizational psychology.",
    type: "Article",
    domain: "Healthcare",
  },
  {
    title: "Medical Laboratory Science Career Guide",
    source: "ASCP",
    url: "https://ascp.org/content/learning/student",
    description: "Official guide to education, certification, and career options in lab science.",
    type: "Article",
    domain: "Healthcare",
  },
  // Creative
  {
    title: "Intro to UI/UX Design",
    source: "Google",
    url: "https://design.google/resources",
    description: "Google's curated design resources covering UX principles and research methods.",
    type: "Article",
    domain: "Creative",
  },
  {
    title: "Graphic Design Fundamentals",
    source: "Canva Learn",
    url: "https://canva.com/learn/graphic-design",
    description: "Free lessons on color, typography, layout, and visual composition.",
    type: "Article",
    domain: "Creative",
  },
  {
    title: "How to Start as a Content Creator",
    source: "HubSpot Blog",
    url: "https://blog.hubspot.com/marketing/how-to-become-content-creator",
    description: "Step-by-step guide to building an audience and monetizing content.",
    type: "Article",
    domain: "Creative",
  },
  // Business
  {
    title: "Digital Marketing Full Course",
    source: "Google Digital Garage",
    url: "https://learndigital.withgoogle.com",
    description: "Free Google certification covering SEO, social media, analytics, and more.",
    type: "Course",
    domain: "Business",
  },
  {
    title: "What is a Business Analyst?",
    source: "Coursera",
    url: "https://coursera.org/articles/what-does-a-business-analyst-do",
    description: "Learn what business analysts do, the skills required, and typical career progression.",
    type: "Article",
    domain: "Business",
  },
  {
    title: "How to Start a Business at Any Age",
    source: "Khan Academy",
    url: "https://khanacademy.org/college-careers-more/entrepreneurship2",
    description: "Free entrepreneurship course covering idea validation, finance, and growth.",
    type: "Course",
    domain: "Business",
  },
  // Accounting
  {
    title: "Accounting Basics for Beginners",
    source: "AccountingCoach",
    url: "https://accountingcoach.com/accounting-basics/explanation",
    description: "Clear, free explanations of debits, credits, and the accounting cycle.",
    type: "Article",
    domain: "Accounting",
  },
  {
    title: "Introduction to Financial Accounting",
    source: "Coursera/Wharton",
    url: "https://coursera.org/learn/wharton-accounting",
    description: "Wharton's top-rated course on reading financial statements and accounting principles.",
    type: "Course",
    domain: "Accounting",
  },
];

const DOMAIN_COLORS: Record<string, string> = {
  Tech: "bg-primary/15 text-primary",
  Healthcare: "bg-accent/15 text-accent",
  Creative: "bg-pink-500/15 text-pink-600",
  Business: "bg-secondary/15 text-secondary",
  Accounting: "bg-emerald-500/15 text-emerald-600",
};

const TYPE_COLORS: Record<ResourceType, string> = {
  Article: "bg-blue-500/10 text-blue-600",
  Video: "bg-red-500/10 text-red-600",
  Course: "bg-amber-500/10 text-amber-600",
  Tool: "bg-slate-500/10 text-slate-600",
};

const TYPE_VERB: Record<ResourceType, string> = {
  Article: "Read",
  Video: "Watch",
  Course: "Start",
  Tool: "Try",
};

const CareerInsights = () => {
  const [filter, setFilter] = useState<Domain>("All");

  const filtered = filter === "All" ? RESOURCES : RESOURCES.filter((r) => r.domain === filter);
  const domains: Domain[] = ["All", "Tech", "Healthcare", "Creative", "Business", "Accounting"];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Career Insights
            </h1>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Free, curated resources to help you explore and grow in any career path — no sign-up required.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-500/20">
            SDG 4 Aligned
          </span>
        </div>

        {/* Domain filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {domains.map((d) => (
            <Button
              key={d}
              variant={filter === d ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(d)}
              className="text-xs"
            >
              {d}
            </Button>
          ))}
        </div>

        {/* Resource cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((res) => (
            <div
              key={res.title}
              className="flex flex-col rounded-xl border border-border/50 bg-card p-5 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${DOMAIN_COLORS[res.domain]}`}>
                  {res.domain}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${TYPE_COLORS[res.type]}`}>
                  {res.type}
                </span>
              </div>

              <h3 className="mb-1 font-display text-sm font-bold text-card-foreground leading-snug">
                {res.title}
              </h3>
              <p className="mb-1 text-xs text-muted-foreground">
                by {res.source}
              </p>
              <p className="mb-4 flex-1 text-xs text-muted-foreground leading-relaxed">
                {res.description}
              </p>

              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                {TYPE_VERB[res.type]}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <BookOpen className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No resources found for this domain.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerInsights;
