import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Check,
  Lock,
  Sparkles,
  Zap,
  Clock,
  TrendingUp,
  ExternalLink,
  BookOpen,
} from "lucide-react";

type NodeStatus = "completed" | "current" | "recommended" | "locked";
type Difficulty = "Beginner" | "Intermediate" | "Advanced";

interface MilestoneNode {
  id: string;
  title: string;
  description: string;
  why: string;
  difficulty: Difficulty;
  duration: string;
  resources: { label: string; url: string }[];
  status: NodeStatus;
}

interface CareerPath {
  key: string;
  title: string;
  domain: "Tech" | "Accounting";
  tagline: string;
  nodes: MilestoneNode[];
}

const CAREER_PATHS: CareerPath[] = [
  {
    key: "software-developer",
    title: "Software Developer",
    domain: "Tech",
    tagline: "From first line of code to junior engineer",
    nodes: [
      { id: "sd-1", title: "Learn HTML & CSS", status: "completed", description: "Master the building blocks of every webpage: structure with HTML, styling with CSS.", why: "Every web product starts here. You can't build interfaces without these fundamentals.", difficulty: "Beginner", duration: "2–3 weeks", resources: [{ label: "MDN Web Docs", url: "https://developer.mozilla.org/" }, { label: "freeCodeCamp", url: "https://www.freecodecamp.org/" }] },
      { id: "sd-2", title: "Learn JavaScript", status: "completed", description: "Variables, functions, async, the DOM, and modern ES syntax.", why: "JavaScript powers interactivity on the web and is the gateway to React, Node, and beyond.", difficulty: "Beginner", duration: "1–2 months", resources: [{ label: "JavaScript.info", url: "https://javascript.info/" }, { label: "Eloquent JavaScript", url: "https://eloquentjavascript.net/" }] },
      { id: "sd-3", title: "React Basics", status: "current", description: "Learn components, state, props, and hooks to build modern UIs.", why: "React is the most in-demand frontend framework and the standard for scalable apps.", difficulty: "Intermediate", duration: "3–4 weeks", resources: [{ label: "React Docs", url: "https://react.dev/" }, { label: "Scrimba React", url: "https://scrimba.com/" }] },
      { id: "sd-4", title: "Git + GitHub", status: "recommended", description: "Version control your projects and collaborate with developers worldwide.", why: "Every professional team uses Git. GitHub is also your public résumé.", difficulty: "Beginner", duration: "1 week", resources: [{ label: "GitHub Skills", url: "https://skills.github.com/" }] },
      { id: "sd-5", title: "Build Portfolio Projects", status: "locked", description: "Ship 3–5 polished projects: a clone, an original app, and a full-stack build.", why: "Projects prove your skill better than certificates. Recruiters look here first.", difficulty: "Intermediate", duration: "1–2 months", resources: [{ label: "Frontend Mentor", url: "https://www.frontendmentor.io/" }] },
      { id: "sd-6", title: "Internship / Freelance", status: "locked", description: "Get real-world experience through internships, open source, or freelance gigs.", why: "Working with real teams and clients builds skills no tutorial can teach.", difficulty: "Intermediate", duration: "3–6 months", resources: [{ label: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/" }] },
      { id: "sd-7", title: "Junior Developer Role", status: "locked", description: "Land your first full-time engineering role and start your career.", why: "The first role unlocks mentorship, salary, and the path toward senior engineering.", difficulty: "Advanced", duration: "Ongoing", resources: [{ label: "Tech Interview Handbook", url: "https://www.techinterviewhandbook.org/" }] },
    ],
  },
  {
    key: "data-analyst",
    title: "Data Analyst",
    domain: "Tech",
    tagline: "Turn raw data into business decisions",
    nodes: [
      { id: "da-1", title: "Excel Basics", status: "completed", description: "Formulas, pivot tables, VLOOKUP, and data cleaning.", why: "Excel is the most used analytics tool in the world. It's table stakes.", difficulty: "Beginner", duration: "1–2 weeks", resources: [{ label: "Excel Easy", url: "https://www.excel-easy.com/" }] },
      { id: "da-2", title: "SQL", status: "current", description: "Query databases with SELECT, JOIN, GROUP BY, and window functions.", why: "SQL is the universal language of data. Every analyst job requires it.", difficulty: "Beginner", duration: "3–4 weeks", resources: [{ label: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/" }, { label: "SQLBolt", url: "https://sqlbolt.com/" }] },
      { id: "da-3", title: "Python + Pandas", status: "recommended", description: "Use Python and Pandas for data wrangling, cleaning, and analysis at scale.", why: "Pandas handles datasets too big for Excel and unlocks automation.", difficulty: "Intermediate", duration: "1 month", resources: [{ label: "Kaggle Learn", url: "https://www.kaggle.com/learn" }] },
      { id: "da-4", title: "Visualization Tools", status: "locked", description: "Master Tableau, Power BI, or Looker to create compelling visual stories.", why: "Insights only matter when stakeholders understand them. Charts communicate.", difficulty: "Intermediate", duration: "3–4 weeks", resources: [{ label: "Tableau Public", url: "https://public.tableau.com/" }] },
      { id: "da-5", title: "Build Dashboards", status: "locked", description: "Create end-to-end dashboards from real datasets and publish them.", why: "Dashboards demonstrate your full pipeline: data → cleaning → visuals → insights.", difficulty: "Intermediate", duration: "1 month", resources: [{ label: "Maven Analytics", url: "https://www.mavenanalytics.io/" }] },
      { id: "da-6", title: "Portfolio", status: "locked", description: "Showcase 3–5 projects with code, dashboards, and write-ups.", why: "A strong portfolio beats any résumé bullet.", difficulty: "Intermediate", duration: "Ongoing", resources: [{ label: "GitHub Pages", url: "https://pages.github.com/" }] },
      { id: "da-7", title: "Analyst Job", status: "locked", description: "Apply for analyst roles and crush case-study interviews.", why: "First analyst role launches you toward senior, BI, or data science tracks.", difficulty: "Advanced", duration: "Ongoing", resources: [{ label: "StrataScratch", url: "https://www.stratascratch.com/" }] },
    ],
  },
  {
    key: "cybersecurity",
    title: "Cybersecurity Analyst",
    domain: "Tech",
    tagline: "Defend systems, hunt threats, secure the future",
    nodes: [
      { id: "cs-1", title: "Networking Basics", status: "completed", description: "TCP/IP, DNS, HTTP, ports, and the OSI model.", why: "You can't secure what you don't understand. Networks are the battlefield.", difficulty: "Beginner", duration: "3–4 weeks", resources: [{ label: "Professor Messer", url: "https://www.professormesser.com/" }] },
      { id: "cs-2", title: "Linux", status: "current", description: "Master the Linux command line, filesystem, and basic shell scripting.", why: "Most servers and security tools run on Linux. Comfort here is non-negotiable.", difficulty: "Beginner", duration: "1 month", resources: [{ label: "OverTheWire Bandit", url: "https://overthewire.org/wargames/bandit/" }] },
      { id: "cs-3", title: "Security Fundamentals", status: "recommended", description: "CIA triad, threats, vulnerabilities, encryption, and authentication.", why: "These concepts appear in every interview, exam, and real-world incident.", difficulty: "Intermediate", duration: "1 month", resources: [{ label: "Cybrary", url: "https://www.cybrary.it/" }] },
      { id: "cs-4", title: "CTF Practice", status: "locked", description: "Capture-the-flag challenges to build hands-on offensive and defensive skills.", why: "CTFs teach how attackers think — the fastest way to level up real ability.", difficulty: "Intermediate", duration: "Ongoing", resources: [{ label: "TryHackMe", url: "https://tryhackme.com/" }, { label: "HackTheBox", url: "https://www.hackthebox.com/" }] },
      { id: "cs-5", title: "Certifications", status: "locked", description: "Earn CompTIA Security+, then advance toward CySA+, CEH, or OSCP.", why: "Certs are entry filters for many security roles, especially government and enterprise.", difficulty: "Advanced", duration: "2–4 months", resources: [{ label: "CompTIA Security+", url: "https://www.comptia.org/certifications/security" }] },
      { id: "cs-6", title: "SOC / Junior Security Role", status: "locked", description: "Join a Security Operations Center monitoring alerts and responding to incidents.", why: "SOC analyst is the most common entry point into the security industry.", difficulty: "Advanced", duration: "Ongoing", resources: [{ label: "Blue Team Labs", url: "https://blueteamlabs.online/" }] },
    ],
  },
  {
    key: "accountant",
    title: "Accountant",
    domain: "Accounting",
    tagline: "From bookkeeping to qualified accountant",
    nodes: [
      { id: "ac-1", title: "Bookkeeping Basics", status: "completed", description: "Double-entry, debits/credits, journals, and the accounting cycle.", why: "Bookkeeping is the foundation of all accounting. Everything builds on it.", difficulty: "Beginner", duration: "2–3 weeks", resources: [{ label: "AccountingCoach", url: "https://www.accountingcoach.com/" }] },
      { id: "ac-2", title: "Excel for Accounting", status: "current", description: "Pivot tables, VLOOKUP, SUMIF, and financial modeling formulas.", why: "Accountants live in spreadsheets. Excel mastery saves hours every week.", difficulty: "Beginner", duration: "2 weeks", resources: [{ label: "Corporate Finance Institute", url: "https://corporatefinanceinstitute.com/" }] },
      { id: "ac-3", title: "Financial Statements", status: "recommended", description: "Read and prepare income statements, balance sheets, and cash flow statements.", why: "These three reports tell the story of any business. Reading them is core skill #1.", difficulty: "Intermediate", duration: "1 month", resources: [{ label: "Investopedia", url: "https://www.investopedia.com/" }] },
      { id: "ac-4", title: "Tax Knowledge", status: "locked", description: "Understand individual and corporate tax basics, deductions, and filings.", why: "Tax season drives huge demand for accountants. Tax expertise pays well.", difficulty: "Intermediate", duration: "1–2 months", resources: [{ label: "IRS Resources", url: "https://www.irs.gov/" }] },
      { id: "ac-5", title: "Accounting Software", status: "locked", description: "Get hands-on with QuickBooks, Xero, or SAP — the tools firms actually use.", why: "Software fluency is what employers test on day one of an internship.", difficulty: "Intermediate", duration: "3–4 weeks", resources: [{ label: "QuickBooks Training", url: "https://quickbooks.intuit.com/learn-support/" }] },
      { id: "ac-6", title: "Internship", status: "locked", description: "Land an internship at a CPA firm, corporate finance team, or tax practice.", why: "Internships convert into full-time offers. Real client work beats classroom theory.", difficulty: "Intermediate", duration: "3–6 months", resources: [{ label: "AICPA Career Center", url: "https://www.aicpa-cima.com/" }] },
      { id: "ac-7", title: "Junior Accountant", status: "locked", description: "Start your career with reconciliations, journal entries, and month-end close.", why: "Junior roles build the experience needed for CPA and senior tracks.", difficulty: "Advanced", duration: "Ongoing", resources: [{ label: "Becker CPA", url: "https://www.becker.com/" }] },
    ],
  },
];

const STATUS_STYLES: Record<NodeStatus, { card: string; ring: string; badge: string; label: string; icon: typeof Check }> = {
  completed: { card: "bg-primary/10 border-primary/50 text-foreground", ring: "ring-primary/30", badge: "bg-primary text-primary-foreground", label: "Completed", icon: Check },
  current: { card: "bg-accent/15 border-accent text-foreground shadow-md", ring: "ring-accent/40", badge: "bg-accent text-accent-foreground", label: "In Progress", icon: Zap },
  recommended: { card: "bg-secondary/10 border-secondary/50 border-dashed text-foreground", ring: "ring-secondary/30", badge: "bg-secondary text-secondary-foreground", label: "Recommended", icon: Sparkles },
  locked: { card: "bg-muted/40 border-border text-muted-foreground", ring: "ring-muted", badge: "bg-muted text-muted-foreground", label: "Locked", icon: Lock },
};

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Beginner: "bg-primary/10 text-primary",
  Intermediate: "bg-accent/15 text-foreground",
  Advanced: "bg-destructive/10 text-destructive",
};

export function RoadmapMapView() {
  const [activeKey, setActiveKey] = useState<string>(CAREER_PATHS[0].key);
  const [selected, setSelected] = useState<MilestoneNode | null>(null);

  const activePath = CAREER_PATHS.find((p) => p.key === activeKey)!;

  return (
    <div className="space-y-6">
      {/* Career selector */}
      <div className="flex flex-wrap gap-2">
        {CAREER_PATHS.map((path) => {
          const isActive = path.key === activeKey;
          const isTech = path.domain === "Tech";
          return (
            <button
              key={path.key}
              onClick={() => setActiveKey(path.key)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                isActive
                  ? isTech
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-secondary text-secondary-foreground border-secondary shadow-sm"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {path.title}
            </button>
          );
        })}
      </div>

      {/* Path header */}
      <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            activePath.domain === "Tech" ? "bg-primary/15 text-primary" : "bg-secondary/15 text-secondary"
          }`}>
            {activePath.domain}
          </span>
          <h3 className="font-display text-lg font-bold text-foreground">{activePath.title}</h3>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{activePath.tagline}</p>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
          {(Object.keys(STATUS_STYLES) as NodeStatus[]).map((s) => {
            const Icon = STATUS_STYLES[s].icon;
            return (
              <span key={s} className="inline-flex items-center gap-1.5">
                <span className={`inline-flex h-4 w-4 items-center justify-center rounded-full ${STATUS_STYLES[s].badge}`}>
                  <Icon className="h-2.5 w-2.5" />
                </span>
                {STATUS_STYLES[s].label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Roadmap nodes */}
      <div key={activeKey} className="relative mx-auto max-w-md animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activePath.nodes.map((node, i) => {
          const styles = STATUS_STYLES[node.status];
          const Icon = styles.icon;
          const isLast = i === activePath.nodes.length - 1;
          const isLeft = i % 2 === 0;

          return (
            <div key={node.id} className="relative">
              <div className={`flex ${isLeft ? "justify-start" : "justify-end"}`}>
                <button
                  onClick={() => setSelected(node)}
                  className={`group relative w-[78%] rounded-2xl border-2 px-4 py-3 text-left transition-all hover:scale-[1.02] hover:shadow-lg hover:ring-4 ${styles.card} ${styles.ring}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${styles.badge}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-sm font-bold leading-tight">
                        {node.title}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px]">
                        <span className={`rounded-full px-2 py-0.5 font-medium ${DIFFICULTY_STYLES[node.difficulty]}`}>
                          {node.difficulty}
                        </span>
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-2.5 w-2.5" />
                          {node.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Connector */}
              {!isLast && (
                <div className="flex justify-center py-2" aria-hidden>
                  <svg width="40" height="36" viewBox="0 0 40 36" className="text-border">
                    <path
                      d={isLeft ? "M10 0 Q10 18 30 18 Q30 30 30 36" : "M30 0 Q30 18 10 18 Q10 30 10 36"}
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-md">
          {selected && (
            <>
              <DialogHeader>
                <div className="mb-2 flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[selected.status].badge}`}>
                    {(() => {
                      const I = STATUS_STYLES[selected.status].icon;
                      return <I className="h-2.5 w-2.5" />;
                    })()}
                    {STATUS_STYLES[selected.status].label}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${DIFFICULTY_STYLES[selected.difficulty]}`}>
                    {selected.difficulty}
                  </span>
                </div>
                <DialogTitle className="font-display text-xl">{selected.title}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {selected.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 pt-2">
                <div className="rounded-xl border border-border bg-muted/30 p-3">
                  <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Why it matters
                  </div>
                  <p className="text-xs text-muted-foreground">{selected.why}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-border p-3">
                    <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      Time to learn
                    </div>
                    <div className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {selected.duration}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border p-3">
                    <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      Difficulty
                    </div>
                    <div className="mt-1 text-sm font-bold text-foreground">{selected.difficulty}</div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <BookOpen className="h-3.5 w-3.5" />
                    Suggested resources
                  </div>
                  <div className="space-y-1.5">
                    {selected.resources.map((r) => (
                      <a
                        key={r.url}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-xs text-foreground transition-colors hover:bg-muted"
                      >
                        <span className="font-medium">{r.label}</span>
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>

                <Button onClick={() => setSelected(null)} className="w-full" size="sm">
                  Got it
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
