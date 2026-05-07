import { useState, useEffect, useCallback } from "react";
import { CAREER_ROADMAPS, CAREER_RESOURCES, CAREERS, type LearningResource } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, GraduationCap, List, Map as MapIcon, ExternalLink, BookOpen, Wrench, Lightbulb, MapPin } from "lucide-react";
import { RoadmapMapView } from "@/components/RoadmapMapView";

const DOMAIN_COLORS: Record<string, string> = {
  Tech: "bg-primary/10 text-primary",
  Accounting: "bg-secondary/10 text-secondary",
  Healthcare: "bg-red-500/10 text-red-600",
  Creative: "bg-pink-500/10 text-pink-600",
  Business: "bg-amber-500/10 text-amber-600",
};

const DOMAIN_BAR_COLORS: Record<string, string> = {
  Tech: "bg-primary",
  Accounting: "bg-secondary",
  Healthcare: "bg-red-500",
  Creative: "bg-pink-500",
  Business: "bg-amber-500",
};

const TYPE_ICON: Record<string, React.ElementType> = {
  course: BookOpen,
  tutorial: Lightbulb,
  tool: Wrench,
  roadmap: MapPin,
};

const TYPE_BADGE: Record<string, string> = {
  course: "bg-blue-500/10 text-blue-600",
  tutorial: "bg-amber-500/10 text-amber-600",
  tool: "bg-emerald-500/10 text-emerald-600",
  roadmap: "bg-primary/10 text-primary",
};

const SKILL_DESCRIPTIONS: Record<string, string> = {
  "HTML/CSS": "Foundation of every web page you'll build",
  "JavaScript Basics": "The language that powers interactivity on the web",
  Git: "Track changes and collaborate on code safely",
  "React/Vue/Angular": "Build complex UIs with component frameworks",
  "REST APIs": "Connect frontends to backends and external services",
  Testing: "Ensure your code works correctly before shipping",
  SQL: "Query databases to read and write data",
  "System Design": "Plan scalable, maintainable architectures",
  "CI/CD": "Automate testing and deployment pipelines",
  "Cloud (AWS/GCP)": "Deploy and manage applications at scale",
  "Performance Optimization": "Make apps fast and efficient for users",
  "Architecture Patterns": "Proven solutions to recurring design problems",
  "Team Leadership": "Guide and grow a technical team",
  "Stakeholder Communication": "Translate technical concepts for business audiences",
  DevOps: "Bridge development and operations for faster delivery",
  Excel: "Analyze and organize data in spreadsheets",
  "SQL Basics": "Retrieve and filter data from relational databases",
  "Data Cleaning": "Prepare raw data for accurate analysis",
  "Tableau/Power BI": "Build interactive dashboards for stakeholders",
  "Advanced SQL": "Write complex queries for deep analysis",
  Statistics: "Apply statistical methods to draw valid conclusions",
  "Python/R": "Programmatic data analysis and visualization",
  "A/B Testing": "Run experiments to make data-driven decisions",
  "Predictive Modeling": "Forecast outcomes using statistical models",
  "Stakeholder Management": "Keep teams aligned on data priorities",
  "Machine Learning": "Build models that learn patterns from data",
  "Data Strategy": "Define how an organization collects and uses data",
  "Big Data Tools": "Process datasets too large for traditional tools",
  "SIEM Tools": "Aggregate and analyze security log data",
  "Log Analysis": "Identify threats by examining system logs",
  "Network Basics": "Understand how data flows across networks",
  "Pen Testing Basics": "Find vulnerabilities by simulating attacks",
  "Threat Intelligence": "Stay ahead of emerging threats and attack patterns",
  "Firewall Management": "Control network traffic with security rules",
  "Cloud Security": "Protect cloud infrastructure and services",
  "Incident Response": "Detect, contain, and recover from security breaches",
  "Security Automation": "Automate repetitive security tasks at scale",
  Compliance: "Meet regulatory and industry security standards",
  "Risk Management": "Identify and prioritize organizational risks",
  "Policy & Governance": "Define and enforce security policies org-wide",
  "Executive Communication": "Present security posture to leadership clearly",
  Bookkeeping: "Record financial transactions accurately",
  "Accounting Software": "Use tools like QuickBooks and Xero efficiently",
  "Financial Reporting": "Prepare statements that show financial health",
  "Tax Preparation": "Calculate and file taxes correctly and on time",
  "GAAP/IFRS Basics": "Apply standard accounting frameworks properly",
  "Advanced Tax": "Handle complex tax scenarios and planning",
  "Audit Management": "Lead audits to verify financial accuracy",
  "Financial Analysis": "Interpret financial data for business decisions",
  "CPA Certification": "Earn the gold-standard accounting credential",
  "Strategic Planning": "Set long-term financial goals and roadmaps",
  "Regulatory Compliance": "Ensure the organization meets all legal requirements",
  "Financial Strategy": "Align financial decisions with business objectives",
  "Basic Patient Care": "Provide safe, compassionate daily care",
  Anatomy: "Understand the human body's structure and function",
  "Clinical Skills": "Perform essential medical procedures competently",
  "Patient Assessment": "Evaluate patient condition accurately and thoroughly",
  "Medication Administration": "Give medications safely and correctly",
  "Care Planning": "Design individualized patient care plans",
  "Advanced Clinical Skills": "Handle complex medical situations confidently",
  "Team Coordination": "Orchestrate care across a multidisciplinary team",
  Specialization: "Develop deep expertise in a clinical area",
  "Advanced Practice": "Diagnose and prescribe at an advanced level",
  Leadership: "Guide teams and shape department strategy",
  "Policy & Research": "Influence healthcare policy through evidence",
  "Sample Handling": "Process specimens correctly for accurate results",
  "Lab Safety": "Maintain a safe working environment in the lab",
  "Basic Biology": "Understand the biological basis of lab tests",
  "Diagnostic Testing": "Run and interpret medical diagnostic tests",
  "QC Procedures": "Ensure test results are reliable and reproducible",
  "Hematology/Chemistry": "Analyze blood and chemical samples accurately",
  "Method Validation": "Verify that new test methods produce valid results",
  Mentoring: "Train and develop junior lab staff",
  "Lab Management": "Oversee operations, budgets, and accreditation",
  "Research Methods": "Design and conduct rigorous scientific studies",
  "Counseling Basics": "Apply foundational therapeutic techniques",
  Ethics: "Navigate confidentiality, consent, and professional boundaries",
  "Therapeutic Techniques": "Use evidence-based therapy approaches effectively",
  "Psychological Testing": "Administer and interpret psychological assessments",
  "Case Management": "Coordinate care and resources for clients",
  "Research Publication": "Contribute findings to the scientific community",
  Supervision: "Oversee trainees and ensure quality of care",
  "Practice Management": "Run a private practice efficiently and ethically",
  "Program Development": "Design and implement mental health programs",
  "Figma Basics": "Create designs and prototypes in Figma",
  Wireframing: "Sketch layouts before building high-fidelity designs",
  "User Flows": "Map the steps users take through a product",
  Prototyping: "Build interactive mockups to test ideas quickly",
  "Usability Testing": "Validate designs with real users before launch",
  "Design Systems": "Maintain consistent UI patterns across products",
  "Design Strategy": "Align design decisions with business and user goals",
  "User Research": "Understand user needs through interviews and testing",
  Accessibility: "Make products usable for people of all abilities",
  "Design Leadership": "Build and lead a high-performing design team",
  "Cross-functional Collaboration": "Work effectively with engineering and product",
  "Design Ops": "Scale design processes and tooling across teams",
  "Adobe Illustrator": "Create vector graphics and illustrations",
  "Layout Design": "Arrange elements for clear visual communication",
  "Color Theory": "Choose color palettes that evoke the right emotions",
  "Brand Identity": "Build cohesive visual systems for brands",
  "Print & Digital Design": "Design for both physical and screen media",
  Typography: "Select and pair typefaces for readability and impact",
  "Art Direction": "Guide the visual style of campaigns and projects",
  "Brand Strategy": "Define how a brand looks, feels, and communicates",
  "Motion Graphics": "Add animation to bring designs to life",
  "Creative Leadership": "Inspire and direct creative teams",
  "Campaign Strategy": "Plan multi-channel campaigns that drive results",
  "Team Management": "Hire, develop, and retain creative talent",
  Copywriting: "Write clear, persuasive text for marketing",
  "Social Media Basics": "Manage accounts and grow audiences online",
  "Content Planning": "Organize topics, formats, and publishing schedules",
  "Video Production": "Film and edit engaging video content",
  "Audience Growth": "Attract and retain followers across platforms",
  "Brand Partnerships": "Collaborate with brands for sponsored content",
  "Content Strategy": "Plan content that supports business goals",
  Analytics: "Measure performance and optimize content",
  "SEO Optimization": "Improve content visibility in search engines",
  "Media Strategy": "Define how content reaches the right audiences",
  "Revenue Models": "Monetize content through ads, subscriptions, and more",
  "Social Media Management": "Schedule, post, and engage across platforms",
  "Basic SEO": "Understand how search engines rank content",
  "Email Marketing": "Build email campaigns that convert",
  "Google Ads": "Create and manage paid search campaigns",
  "A/B Testing": "Test variations to find what performs best",
  "Marketing Strategy": "Plan campaigns that align with business objectives",
  CRO: "Optimize pages to increase conversion rates",
  "Attribution Modeling": "Understand which channels drive conversions",
  "Brand Strategy": "Define brand positioning and messaging",
  "Budget Management": "Allocate and track marketing spend effectively",
  "Requirements Gathering": "Elicit and document what stakeholders need",
  "Process Mapping": "Visualize workflows to find improvements",
  "Data Analysis": "Interpret data to support business decisions",
  "Strategic Analysis": "Evaluate options and recommend the best path",
  "KPI Frameworks": "Define metrics that measure what matters",
  "Change Management": "Guide organizations through transitions smoothly",
  "Enterprise Strategy": "Shape long-term organizational direction",
  "Digital Transformation": "Modernize processes with technology",
  "Lean Startup": "Validate business ideas quickly and cheaply",
  "Market Research": "Understand your target market and competitors",
  "Basic Finance": "Manage cash flow, budgets, and financial basics",
  Sales: "Close deals and generate revenue consistently",
  "Product Management": "Build the right product for the right audience",
  Fundraising: "Raise capital from investors to fuel growth",
  "Team Building": "Hire and develop a high-performing team",
  "Growth Strategy": "Scale the business to new markets and channels",
  "Financial Management": "Manage budgets, forecasts, and financial health",
  "Vision & Strategy": "Set a compelling direction for the company",
  "Board Management": "Work effectively with a board of directors",
  "M&A": "Navigate mergers, acquisitions, and exits",
};

function getSkillDescription(skill: string): string {
  return SKILL_DESCRIPTIONS[skill] ?? "Essential skill for this career path";
}

function getCareerResources(careerTitle: string): LearningResource[] {
  const entry = CAREER_RESOURCES.find(
    (r) => r.careerTitle.toLowerCase() === careerTitle.toLowerCase()
  );
  return entry?.resources ?? [];
}

function getCareerSkills(careerTitle: string): string[] {
  const career = CAREERS.find((c) => c.title === careerTitle);
  return career?.skills ?? [];
}

function getMapKey(careerTitle: string): string {
  const mapKeys: Record<string, string> = {
    "Software Developer": "software-developer",
    "Data Analyst": "data-analyst",
    "Cybersecurity Analyst": "cybersecurity",
    Accountant: "accountant",
  };
  return mapKeys[careerTitle] ?? "";
}

type ViewMode = "list" | "map";

const STORAGE_KEY = "careerpath-roadmap-progress";

function loadProgress(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(data: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore write failures
  }
}

const Roadmap = () => {
  const [view, setView] = useState<ViewMode>("list");
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [checked, setChecked] = useState<Record<string, boolean>>(loadProgress);
  const [highlightKey, setHighlightKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 800);
    return () => clearTimeout(timer);
  }, [view]);

  const toggleCheck = useCallback((topicKey: string) => {
    setChecked((prev) => {
      const next = { ...prev, [topicKey]: !prev[topicKey] };
      saveProgress(next);
      return next;
    });
  }, []);

  const handleViewOnMap = useCallback((careerTitle: string) => {
    const key = getMapKey(careerTitle);
    setHighlightKey(key);
    setView("map");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (showSkeleton) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <div className="mb-6 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div>
              <Skeleton className="mb-2 h-7 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <div className="mb-6 flex gap-2">
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* Header */}
        <div className="mb-6">
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

        {/* View Toggle */}
        <div className="mb-6 flex items-center gap-2">
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="sm"
            className="gap-2"
            onClick={() => setView("list")}
          >
            <List className="h-3.5 w-3.5" />
            List View
          </Button>
          <Button
            variant={view === "map" ? "default" : "outline"}
            size="sm"
            className="gap-2"
            onClick={() => setView("map")}
          >
            <MapIcon className="h-3.5 w-3.5" />
            Map View
          </Button>
        </div>

        {/* Map View */}
        {view === "map" && <RoadmapMapView highlightKey={highlightKey} />}

        {/* List View */}
        {view === "list" && (
          <div className="space-y-8">
            {CAREER_ROADMAPS.map((roadmap) => {
              const domainColor = DOMAIN_COLORS[roadmap.domain] ?? "bg-muted text-muted-foreground";
              const barColor = DOMAIN_BAR_COLORS[roadmap.domain] ?? "bg-muted";
              const mapKey = getMapKey(roadmap.careerTitle);
              const hasMapView = mapKey !== "";

              // Collect all L2 topics across all nodes for this career
              const allTopics: { nodeId: string; nodeTitle: string; skill: string }[] = [];
              roadmap.nodes.forEach((node) => {
                node.skills.forEach((skill) => {
                  allTopics.push({ nodeId: node.id, nodeTitle: node.title, skill });
                });
              });

              const totalTopics = allTopics.length;
              const completedTopics = allTopics.filter(
                (t) => checked[`${roadmap.careerTitle}::${t.skill}`]
              ).length;
              const progressPct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

              const careerSkills = getCareerSkills(roadmap.careerTitle);
              const careerResources = getCareerResources(roadmap.careerTitle);

              return (
                <div key={roadmap.careerTitle} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  {/* Card header */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${domainColor}`}>
                        {roadmap.domain}
                      </span>
                      <h2 className="font-display text-lg font-bold text-card-foreground">
                        {roadmap.careerTitle}
                      </h2>
                    </div>
                    {hasMapView && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-xs"
                        onClick={() => handleViewOnMap(roadmap.careerTitle)}
                      >
                        <MapIcon className="h-3 w-3" />
                        View on Map
                      </Button>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="mb-5">
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="font-medium text-muted-foreground">
                        {completedTopics} of {totalTopics} topics completed
                      </span>
                      <span className="font-bold text-foreground">{progressPct}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Accordion sections */}
                  <Accordion type="multiple" className="w-full">
                    {/* Learning Path */}
                    <AccordionItem value="learning-path" className="border-border/50">
                      <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-primary" />
                          Learning Path
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {roadmap.nodes.map((node, ni) => (
                            <div key={node.id}>
                              <div className="mb-2 flex items-center gap-2">
                                <span className="font-display text-sm font-bold text-foreground">
                                  {node.title}
                                </span>
                                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                                  {node.level === "entry" ? "Entry" : node.level === "mid" ? "Mid" : node.level === "senior" ? "Senior" : "Lead"}
                                </span>
                              </div>
                              <p className="mb-2 text-xs text-muted-foreground">{node.description}</p>
                              <div className="space-y-1.5 pl-1">
                                {node.skills.map((skill) => {
                                  const topicKey = `${roadmap.careerTitle}::${skill}`;
                                  const isChecked = checked[topicKey] ?? false;
                                  return (
                                    <label
                                      key={skill}
                                      className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-muted/50"
                                    >
                                      <Checkbox
                                        checked={isChecked}
                                        onCheckedChange={() => toggleCheck(topicKey)}
                                        className="shrink-0"
                                      />
                                      <span className={isChecked ? "line-through text-muted-foreground" : ""}>
                                        {skill}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                              {ni < roadmap.nodes.length - 1 && (
                                <div className="my-3 ml-4 flex items-center gap-2 text-muted-foreground">
                                  <div className="h-px flex-1 bg-border" />
                                  <ArrowRight className="h-3 w-3 rotate-90" />
                                  <div className="h-px flex-1 bg-border" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Key Skills */}
                    <AccordionItem value="key-skills" className="border-border/50">
                      <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-amber-500" />
                          Key Skills
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2">
                          {careerSkills.map((skill) => (
                            <div
                              key={skill}
                              className="group relative rounded-lg border border-border/50 bg-muted/30 px-3 py-2 text-sm transition-colors hover:bg-muted/60"
                            >
                              <span className="font-medium text-foreground">{skill}</span>
                              <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                                {getSkillDescription(skill)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Free Resources */}
                    <AccordionItem value="free-resources" className="border-border/50">
                      <AccordionTrigger className="text-sm font-bold text-foreground hover:no-underline">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-secondary" />
                          Free Resources
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {careerResources.length > 0 ? (
                          <div className="grid gap-2 sm:grid-cols-2">
                            {careerResources.map((res) => {
                              const Icon = TYPE_ICON[res.type] ?? BookOpen;
                              const badgeClass = TYPE_BADGE[res.type] ?? "bg-muted text-muted-foreground";
                              return (
                                <a
                                  key={res.title}
                                  href={res.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-start gap-3 rounded-xl border border-border/50 bg-background p-3 transition-colors hover:bg-muted/40"
                                >
                                  <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${badgeClass}`}>
                                    <Icon className="h-3.5 w-3.5" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-foreground leading-snug">{res.title}</p>
                                    <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2">{res.description}</p>
                                    <span className={`mt-1 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${badgeClass}`}>
                                      {res.type}
                                    </span>
                                  </div>
                                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                </a>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">No resources available for this career yet.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
