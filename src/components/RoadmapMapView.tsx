import { useState, useCallback, useRef, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Layers,
  BookOpen,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

/* ================================================================
   DATA MODEL — 3-level hierarchy: L1 (Phase) → L2 (Topic) → L3 (Micro)
   ================================================================ */

interface L3Node {
  title: string;
  description: string;
  link?: string;
}

interface L2Node {
  title: string;
  description: string;
  children: L3Node[];
}

interface L1Node {
  title: string;
  label: string; // e.g. "Phase 1"
  color: string; // tailwind border/accent class token
  children: L2Node[];
}

interface CareerMap {
  key: string;
  title: string;
  domain: string;
  tagline: string;
  phases: L1Node[];
}

/* ================================================================
   CAREER DATA — deep curriculum for every career
   ================================================================ */

const CAREER_MAPS: CareerMap[] = [
  // ── SOFTWARE DEVELOPER ──
  {
    key: "software-developer",
    title: "Software Developer",
    domain: "Tech",
    tagline: "From first line of code to production-ready engineer",
    phases: [
      {
        title: "Foundations",
        label: "Phase 1",
        color: "border-primary/60 bg-primary/5",
        children: [
          {
            title: "HTML & CSS",
            description: "Structure and style of the web",
            children: [
              { title: "Semantic Tags", description: "header, nav, main, article, section — meaningful markup" },
              { title: "Box Model", description: "margin, padding, border, content — how elements size" },
              { title: "Flexbox", description: "One-axis layouts with justify & align" },
              { title: "CSS Grid", description: "Two-dimensional grid layouts" },
              { title: "Responsive Design", description: "Media queries & mobile-first approach" },
            ],
          },
          {
            title: "JavaScript Basics",
            description: "The language of the web",
            children: [
              { title: "Variables & Types", description: "let, const, string, number, boolean, null, undefined" },
              { title: "Functions", description: "Declaration, expression, arrow functions, closures" },
              { title: "Control Flow", description: "if/else, switch, ternary operator" },
              { title: "Loops", description: "for, while, for...of, forEach" },
              { title: "Arrays & Objects", description: "map, filter, reduce, destructuring, spread" },
            ],
          },
          {
            title: "Developer Tooling",
            description: "Essential tools every dev needs",
            children: [
              { title: "Git Basics", description: "init, add, commit, branch, merge" },
              { title: "GitHub", description: "Pull requests, issues, collaboration workflows" },
              { title: "VS Code", description: "Extensions, shortcuts, debugging panel" },
              { title: "Terminal / CLI", description: "Navigate files, run scripts, pipe commands" },
            ],
          },
        ],
      },
      {
        title: "Core Skills",
        label: "Phase 2",
        color: "border-accent/60 bg-accent/5",
        children: [
          {
            title: "Advanced JavaScript",
            description: "Deep language mastery",
            children: [
              { title: "Promises & Async/Await", description: "Asynchronous programming patterns" },
              { title: "ES Modules", description: "import/export, dynamic imports, tree-shaking" },
              { title: "Error Handling", description: "try/catch, custom errors, error boundaries" },
              { title: "DOM Manipulation", description: "querySelector, events, event delegation" },
              { title: "Fetch & APIs", description: "HTTP requests, JSON parsing, REST consumption" },
            ],
          },
          {
            title: "React Fundamentals",
            description: "Component-based UI development",
            children: [
              { title: "JSX & Components", description: "Declarative UI with functional components" },
              { title: "Props & State", description: "Data flow, useState, lifting state" },
              { title: "useEffect", description: "Side effects, cleanup, dependency arrays" },
              { title: "Conditional Rendering", description: "Ternaries, && guards, early returns" },
              { title: "Lists & Keys", description: "Rendering arrays, key prop for reconciliation" },
            ],
          },
          {
            title: "CSS Frameworks",
            description: "Rapid UI styling at scale",
            children: [
              { title: "Tailwind CSS", description: "Utility-first classes, responsive prefixes" },
              { title: "Component Libraries", description: "shadcn/ui, Radix, Headless UI" },
              { title: "Design Tokens", description: "CSS variables, theme customization" },
            ],
          },
        ],
      },
      {
        title: "Advanced",
        label: "Phase 3",
        color: "border-secondary/60 bg-secondary/5",
        children: [
          {
            title: "State Management",
            description: "Managing complex application state",
            children: [
              { title: "Context API", description: "Share state across component tree" },
              { title: "React Query", description: "Server state, caching, background refetch" },
              { title: "Zustand / Redux", description: "Global stores, actions, selectors" },
              { title: "URL State", description: "Search params as state, deep linking" },
            ],
          },
          {
            title: "Backend Basics",
            description: "Server-side fundamentals",
            children: [
              { title: "Node.js & Express", description: "HTTP servers, middleware, routing" },
              { title: "REST API Design", description: "Resources, verbs, status codes, pagination" },
              { title: "SQL & Databases", description: "SELECT, JOIN, migrations, ORMs" },
              { title: "Authentication", description: "JWT, sessions, OAuth, password hashing" },
            ],
          },
          {
            title: "Testing",
            description: "Quality assurance and confidence",
            children: [
              { title: "Unit Tests", description: "Vitest, Jest — testing pure functions" },
              { title: "Component Tests", description: "React Testing Library, user-event" },
              { title: "E2E Tests", description: "Playwright, Cypress — full browser tests" },
            ],
          },
        ],
      },
      {
        title: "Professional",
        label: "Phase 4",
        color: "border-destructive/40 bg-destructive/5",
        children: [
          {
            title: "DevOps & Deployment",
            description: "Ship and maintain production apps",
            children: [
              { title: "CI/CD Pipelines", description: "GitHub Actions, automated tests on push" },
              { title: "Docker Basics", description: "Containers, images, docker-compose" },
              { title: "Cloud Hosting", description: "Vercel, Netlify, AWS basics" },
              { title: "Monitoring", description: "Error tracking, logging, uptime checks" },
            ],
          },
          {
            title: "Portfolio & Career",
            description: "Land and succeed in your first role",
            children: [
              { title: "Portfolio Projects", description: "3–5 polished, deployed projects" },
              { title: "Resume & LinkedIn", description: "Tech resume format, keywords, networking" },
              { title: "Technical Interviews", description: "Data structures, system design, behavioral" },
              { title: "Open Source", description: "Contributing to repos, building reputation" },
            ],
          },
          {
            title: "Soft Skills",
            description: "Thrive on a team",
            children: [
              { title: "Code Reviews", description: "Giving and receiving constructive feedback" },
              { title: "Agile / Scrum", description: "Sprints, standups, retrospectives" },
              { title: "Documentation", description: "READMEs, ADRs, inline comments" },
            ],
          },
        ],
      },
    ],
  },

  // ── DATA ANALYST ──
  {
    key: "data-analyst",
    title: "Data Analyst",
    domain: "Tech",
    tagline: "From spreadsheets to actionable business insights",
    phases: [
      {
        title: "Foundations",
        label: "Phase 1",
        color: "border-primary/60 bg-primary/5",
        children: [
          {
            title: "Spreadsheets",
            description: "Excel & Google Sheets mastery",
            children: [
              { title: "Formulas", description: "SUM, AVERAGE, COUNTIF, SUMIFS, INDEX/MATCH" },
              { title: "Pivot Tables", description: "Summarize large datasets interactively" },
              { title: "Charts", description: "Bar, line, scatter — choosing the right viz" },
              { title: "Data Cleaning", description: "TRIM, SUBSTITUTE, removing duplicates" },
            ],
          },
          {
            title: "SQL Fundamentals",
            description: "Query any relational database",
            children: [
              { title: "SELECT & WHERE", description: "Filtering rows and choosing columns" },
              { title: "JOINs", description: "INNER, LEFT, RIGHT, FULL — combining tables" },
              { title: "GROUP BY & Aggregates", description: "COUNT, SUM, AVG with grouping" },
              { title: "Subqueries", description: "Nested queries for complex filtering" },
              { title: "Window Functions", description: "ROW_NUMBER, RANK, LAG, LEAD" },
            ],
          },
          {
            title: "Statistics Basics",
            description: "Foundational stats for data work",
            children: [
              { title: "Mean, Median, Mode", description: "Central tendency measures" },
              { title: "Standard Deviation", description: "Spread and variability of data" },
              { title: "Distributions", description: "Normal, skewed, binomial basics" },
            ],
          },
        ],
      },
      {
        title: "Core Skills",
        label: "Phase 2",
        color: "border-accent/60 bg-accent/5",
        children: [
          {
            title: "Python for Data",
            description: "Programming for analysis & automation",
            children: [
              { title: "Pandas Basics", description: "DataFrames, read_csv, filtering, groupby" },
              { title: "NumPy", description: "Arrays, vectorized operations, broadcasting" },
              { title: "Data Wrangling", description: "Merge, pivot, melt, handle missing values" },
              { title: "Matplotlib / Seaborn", description: "Static charts, heatmaps, pair plots" },
            ],
          },
          {
            title: "Data Visualization",
            description: "Tell stories with data",
            children: [
              { title: "Tableau Basics", description: "Drag-and-drop dashboards, calculated fields" },
              { title: "Power BI", description: "DAX, relationships, published reports" },
              { title: "Chart Selection", description: "When to use bar vs. line vs. scatter" },
              { title: "Dashboard Design", description: "Layout, color, hierarchy, interactivity" },
            ],
          },
          {
            title: "Business Acumen",
            description: "Translate data into decisions",
            children: [
              { title: "KPIs & Metrics", description: "Revenue, churn, LTV, CAC, NPS" },
              { title: "Stakeholder Communication", description: "Executive summaries, data storytelling" },
              { title: "Domain Knowledge", description: "Industry context for meaningful analysis" },
            ],
          },
        ],
      },
      {
        title: "Advanced",
        label: "Phase 3",
        color: "border-secondary/60 bg-secondary/5",
        children: [
          {
            title: "Advanced SQL",
            description: "Complex queries and optimization",
            children: [
              { title: "CTEs", description: "Common Table Expressions for readable queries" },
              { title: "Query Optimization", description: "EXPLAIN, indexes, avoiding N+1" },
              { title: "Stored Procedures", description: "Server-side logic in the database" },
            ],
          },
          {
            title: "Statistical Analysis",
            description: "Rigorous quantitative methods",
            children: [
              { title: "Hypothesis Testing", description: "t-tests, chi-square, p-values" },
              { title: "A/B Testing", description: "Experiment design, significance, sample size" },
              { title: "Regression", description: "Linear, logistic, interpreting coefficients" },
              { title: "Correlation vs Causation", description: "Confounders, Simpson's paradox" },
            ],
          },
          {
            title: "ETL & Pipelines",
            description: "Move and transform data at scale",
            children: [
              { title: "Data Warehousing", description: "Star schema, fact & dimension tables" },
              { title: "ETL Tools", description: "dbt, Airflow, Fivetran basics" },
              { title: "Data Quality", description: "Validation, anomaly detection, lineage" },
            ],
          },
        ],
      },
      {
        title: "Professional",
        label: "Phase 4",
        color: "border-destructive/40 bg-destructive/5",
        children: [
          {
            title: "Portfolio & Case Studies",
            description: "Prove your analytical skills",
            children: [
              { title: "End-to-End Projects", description: "Question → data → analysis → insight → action" },
              { title: "GitHub Portfolio", description: "Notebooks, READMEs, reproducible analysis" },
              { title: "Blog / Writing", description: "Publish findings, build thought leadership" },
            ],
          },
          {
            title: "Interview Prep",
            description: "Land the analyst role",
            children: [
              { title: "SQL Challenges", description: "StrataScratch, LeetCode SQL tracks" },
              { title: "Case Study Practice", description: "Product sense, metric definition, trade-offs" },
              { title: "Take-Home Assignments", description: "Clean data, analyze, present findings" },
              { title: "Behavioral Questions", description: "STAR method, past project storytelling" },
            ],
          },
          {
            title: "Career Growth",
            description: "From analyst to senior / lead",
            children: [
              { title: "Specialization Paths", description: "Product analytics, BI engineering, data science" },
              { title: "Mentoring", description: "Teaching juniors, reviewing analyses" },
              { title: "Certifications", description: "Google Data Analytics, Tableau Desktop Specialist" },
            ],
          },
        ],
      },
    ],
  },

  // ── CYBERSECURITY ANALYST ──
  {
    key: "cybersecurity",
    title: "Cybersecurity Analyst",
    domain: "Tech",
    tagline: "Defend systems, hunt threats, and protect data",
    phases: [
      {
        title: "Foundations",
        label: "Phase 1",
        color: "border-primary/60 bg-primary/5",
        children: [
          {
            title: "Networking",
            description: "How data moves across networks",
            children: [
              { title: "OSI Model", description: "7 layers — physical to application" },
              { title: "TCP/IP", description: "Packets, handshakes, port numbers" },
              { title: "DNS & HTTP", description: "Name resolution, request/response cycle" },
              { title: "Subnetting", description: "CIDR notation, IP ranges, VLANs" },
            ],
          },
          {
            title: "Linux Fundamentals",
            description: "The security analyst's OS",
            children: [
              { title: "File System", description: "/etc, /var, /home, permissions (chmod, chown)" },
              { title: "Shell Commands", description: "grep, awk, sed, pipes, redirection" },
              { title: "Process Management", description: "ps, top, kill, systemctl, cron" },
              { title: "Shell Scripting", description: "Bash scripts for automation" },
            ],
          },
          {
            title: "Security Concepts",
            description: "Core principles of infosec",
            children: [
              { title: "CIA Triad", description: "Confidentiality, Integrity, Availability" },
              { title: "Encryption Basics", description: "Symmetric, asymmetric, hashing, TLS" },
              { title: "Authentication", description: "Passwords, MFA, biometrics, SSO" },
              { title: "Threat Landscape", description: "Malware types, APTs, social engineering" },
            ],
          },
        ],
      },
      {
        title: "Core Skills",
        label: "Phase 2",
        color: "border-accent/60 bg-accent/5",
        children: [
          {
            title: "Security Operations",
            description: "Day-to-day SOC work",
            children: [
              { title: "SIEM Tools", description: "Splunk, ELK, QRadar — log aggregation & alerts" },
              { title: "Log Analysis", description: "Parsing firewall, web server, auth logs" },
              { title: "Incident Triage", description: "Classify, prioritize, escalate alerts" },
              { title: "Playbooks", description: "Standard operating procedures for incidents" },
            ],
          },
          {
            title: "Vulnerability Management",
            description: "Find and fix weaknesses",
            children: [
              { title: "Nmap Scanning", description: "Port scanning, service detection, scripts" },
              { title: "Vulnerability Scanners", description: "Nessus, OpenVAS, Qualys basics" },
              { title: "CVSS Scoring", description: "Rating severity, prioritizing patches" },
              { title: "Patch Management", description: "Lifecycle, testing, deployment" },
            ],
          },
          {
            title: "Web Security",
            description: "Protect web applications",
            children: [
              { title: "OWASP Top 10", description: "Injection, XSS, CSRF, broken auth" },
              { title: "Burp Suite", description: "Proxy, scanner, intruder — web pentesting" },
              { title: "Secure Coding", description: "Input validation, parameterized queries" },
            ],
          },
        ],
      },
      {
        title: "Advanced",
        label: "Phase 3",
        color: "border-secondary/60 bg-secondary/5",
        children: [
          {
            title: "Offensive Security",
            description: "Think like an attacker",
            children: [
              { title: "CTF Challenges", description: "TryHackMe, HackTheBox — practice exploitation" },
              { title: "Exploitation Frameworks", description: "Metasploit, payload crafting" },
              { title: "Privilege Escalation", description: "Linux & Windows privesc techniques" },
              { title: "Social Engineering", description: "Phishing simulations, pretexting" },
            ],
          },
          {
            title: "Defensive Security",
            description: "Build and maintain defenses",
            children: [
              { title: "Threat Hunting", description: "Proactive search for hidden threats" },
              { title: "Digital Forensics", description: "Disk imaging, memory analysis, chain of custody" },
              { title: "Incident Response", description: "Containment, eradication, recovery, lessons learned" },
              { title: "Threat Intelligence", description: "IOCs, MITRE ATT&CK, threat feeds" },
            ],
          },
          {
            title: "Cloud Security",
            description: "Secure cloud infrastructure",
            children: [
              { title: "AWS Security", description: "IAM, Security Groups, CloudTrail, GuardDuty" },
              { title: "Container Security", description: "Docker/K8s hardening, image scanning" },
              { title: "Zero Trust", description: "Never trust, always verify — architecture patterns" },
            ],
          },
        ],
      },
      {
        title: "Professional",
        label: "Phase 4",
        color: "border-destructive/40 bg-destructive/5",
        children: [
          {
            title: "Certifications",
            description: "Industry-recognized credentials",
            children: [
              { title: "CompTIA Security+", description: "Foundational security certification" },
              { title: "CySA+", description: "Cybersecurity analyst intermediate cert" },
              { title: "CEH", description: "Certified Ethical Hacker — offensive focus" },
              { title: "OSCP", description: "Offensive Security Certified Professional — advanced" },
            ],
          },
          {
            title: "Career Launch",
            description: "Land your security role",
            children: [
              { title: "Home Lab", description: "Build a practice environment with VMs" },
              { title: "Security Blog", description: "Write-ups, CTF solutions, research" },
              { title: "Networking", description: "BSides, DEF CON, local meetups" },
              { title: "Resume & Interview", description: "Highlight labs, certs, and CTF rankings" },
            ],
          },
          {
            title: "Specialization Paths",
            description: "Choose your niche",
            children: [
              { title: "SOC Analyst", description: "Monitor, detect, respond — 24/7 operations" },
              { title: "Penetration Tester", description: "Authorized hacking to find vulnerabilities" },
              { title: "Security Engineer", description: "Build secure infrastructure and tooling" },
            ],
          },
        ],
      },
    ],
  },

  // ── ACCOUNTANT ──
  {
    key: "accountant",
    title: "Accountant",
    domain: "Accounting",
    tagline: "From bookkeeping basics to qualified professional accountant",
    phases: [
      {
        title: "Foundations",
        label: "Phase 1",
        color: "border-primary/60 bg-primary/5",
        children: [
          {
            title: "Bookkeeping",
            description: "The language of business",
            children: [
              { title: "Double-Entry", description: "Every transaction has equal debit and credit" },
              { title: "Chart of Accounts", description: "Asset, liability, equity, revenue, expense categories" },
              { title: "Journals & Ledgers", description: "Recording and posting transactions" },
              { title: "Trial Balance", description: "Verify debits equal credits before statements" },
            ],
          },
          {
            title: "Excel for Accounting",
            description: "Your daily work tool",
            children: [
              { title: "VLOOKUP & INDEX/MATCH", description: "Look up values across tables" },
              { title: "Pivot Tables", description: "Summarize financial data quickly" },
              { title: "SUMIFS & COUNTIFS", description: "Conditional aggregation formulas" },
              { title: "Data Validation", description: "Drop-downs, input restrictions, error checking" },
            ],
          },
          {
            title: "Financial Concepts",
            description: "Core accounting principles",
            children: [
              { title: "GAAP Basics", description: "Generally Accepted Accounting Principles" },
              { title: "Accrual vs Cash", description: "When to recognize revenue and expenses" },
              { title: "Time Value of Money", description: "Present value, future value, discounting" },
            ],
          },
        ],
      },
      {
        title: "Core Skills",
        label: "Phase 2",
        color: "border-accent/60 bg-accent/5",
        children: [
          {
            title: "Financial Statements",
            description: "The three core reports",
            children: [
              { title: "Income Statement", description: "Revenue - expenses = net income" },
              { title: "Balance Sheet", description: "Assets = Liabilities + Equity" },
              { title: "Cash Flow Statement", description: "Operating, investing, financing activities" },
              { title: "Ratio Analysis", description: "Liquidity, profitability, leverage ratios" },
            ],
          },
          {
            title: "Tax Fundamentals",
            description: "Understanding taxation",
            children: [
              { title: "Individual Tax", description: "Filing status, brackets, deductions, credits" },
              { title: "Corporate Tax", description: "Entity types, estimated payments, depreciation" },
              { title: "Sales Tax", description: "Nexus, exemptions, compliance" },
              { title: "Payroll Tax", description: "FICA, withholding, quarterly filings" },
            ],
          },
          {
            title: "Accounting Software",
            description: "Industry-standard tools",
            children: [
              { title: "QuickBooks", description: "Small business accounting, invoicing, reports" },
              { title: "Xero", description: "Cloud accounting, bank reconciliation" },
              { title: "SAP Basics", description: "Enterprise resource planning modules" },
            ],
          },
        ],
      },
      {
        title: "Advanced",
        label: "Phase 3",
        color: "border-secondary/60 bg-secondary/5",
        children: [
          {
            title: "Auditing",
            description: "Verify and assure financial accuracy",
            children: [
              { title: "Internal Controls", description: "Segregation of duties, authorization, reconciliation" },
              { title: "Audit Procedures", description: "Planning, fieldwork, sampling, reporting" },
              { title: "Risk Assessment", description: "Inherent, control, and detection risk" },
              { title: "Compliance", description: "SOX, regulatory requirements, ethics" },
            ],
          },
          {
            title: "Management Accounting",
            description: "Decision support for business leaders",
            children: [
              { title: "Budgeting", description: "Operating budgets, variance analysis" },
              { title: "Cost Accounting", description: "Job costing, process costing, ABC" },
              { title: "Forecasting", description: "Trend analysis, scenario planning" },
              { title: "Break-Even Analysis", description: "Fixed costs, variable costs, contribution margin" },
            ],
          },
          {
            title: "Corporate Finance",
            description: "FP&A and strategic finance",
            children: [
              { title: "Financial Modeling", description: "Three-statement models in Excel" },
              { title: "Valuation", description: "DCF, comparables, precedent transactions" },
              { title: "Capital Budgeting", description: "NPV, IRR, payback period" },
            ],
          },
        ],
      },
      {
        title: "Professional",
        label: "Phase 4",
        color: "border-destructive/40 bg-destructive/5",
        children: [
          {
            title: "Certifications",
            description: "Professional credentials",
            children: [
              { title: "CPA", description: "Certified Public Accountant — gold standard" },
              { title: "CMA", description: "Certified Management Accountant — corporate focus" },
              { title: "CIA", description: "Certified Internal Auditor" },
              { title: "EA", description: "Enrolled Agent — IRS tax specialist" },
            ],
          },
          {
            title: "Career Launch",
            description: "Start your accounting career",
            children: [
              { title: "Internships", description: "Big 4, mid-tier firms, corporate rotations" },
              { title: "Networking", description: "AICPA, local CPA societies, LinkedIn" },
              { title: "Interview Prep", description: "Technical questions, case studies, behavioral" },
            ],
          },
          {
            title: "Specialization",
            description: "Choose your long-term path",
            children: [
              { title: "Public Accounting", description: "Audit, tax, advisory at firms" },
              { title: "Corporate Accounting", description: "Controller, FP&A, treasury" },
              { title: "Forensic Accounting", description: "Fraud investigation, litigation support" },
            ],
          },
        ],
      },
    ],
  },
];

/* ================================================================
   DOMAIN COLORS
   ================================================================ */
const DOMAIN_BADGE: Record<string, string> = {
  Tech: "bg-primary/15 text-primary",
  Accounting: "bg-secondary/15 text-secondary",
  Healthcare: "bg-accent/15 text-accent-foreground",
  Creative: "bg-primary/15 text-primary",
  Business: "bg-secondary/15 text-secondary",
};

/* ================================================================
   L3 PILL COMPONENT
   ================================================================ */
function L3Pill({ node }: { node: L3Node }) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex cursor-help items-center gap-1 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-foreground transition-all hover:bg-muted hover:shadow-sm hover:scale-105">
            {node.title}
            {node.link && <ExternalLink className="h-2.5 w-2.5 text-muted-foreground" />}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[220px]">
          <p className="text-xs font-semibold">{node.title}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{node.description}</p>
          {node.link && (
            <a href={node.link} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-[11px] text-primary hover:underline">
              Learn this <ExternalLink className="h-2.5 w-2.5" />
            </a>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/* ================================================================
   L2 CARD COMPONENT
   ================================================================ */
function L2Card({ node, isActive, onToggle, dimmed }: {
  node: L2Node;
  isActive: boolean;
  onToggle: () => void;
  dimmed: boolean;
}) {
  return (
    <div className={`transition-opacity duration-300 ${dimmed ? "opacity-40" : "opacity-100"}`}>
      <button
        onClick={onToggle}
        className={`group flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all hover:shadow-md ${
          isActive
            ? "border-accent/50 bg-accent/10 shadow-sm"
            : "border-border bg-card hover:border-accent/30"
        }`}
      >
        <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors ${
          isActive ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
        }`}>
          {isActive ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        </span>
        <div className="min-w-0 flex-1">
          <span className="text-[13px] font-semibold text-foreground">{node.title}</span>
          <span className="ml-2 text-[11px] text-muted-foreground">{node.description}</span>
        </div>
        <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {node.children.length}
        </span>
      </button>

      {isActive && (
        <div className="mt-2 ml-7 flex flex-wrap gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
          {node.children.map((l3) => (
            <L3Pill key={l3.title} node={l3} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ================================================================
   L1 PHASE CARD COMPONENT
   ================================================================ */
function L1PhaseCard({ node, phaseIndex, expandedL2, onToggleL2, activeL2Key, dimmed }: {
  node: L1Node;
  phaseIndex: number;
  expandedL2: Set<string>;
  onToggleL2: (key: string) => void;
  activeL2Key: string | null;
  dimmed: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`transition-opacity duration-300 ${dimmed ? "opacity-40" : "opacity-100"}`}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`group flex w-full items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left transition-all hover:shadow-lg ${node.color} ${
          collapsed ? "" : "shadow-sm"
        }`}
      >
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-foreground/10 text-foreground">
          <Layers className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
              {node.label}
            </span>
            <h3 className="font-display text-base font-bold text-foreground sm:text-lg">{node.title}</h3>
          </div>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            {node.children.length} topics · {node.children.reduce((sum, c) => sum + c.children.length, 0)} concepts
          </p>
        </div>
        <span className="text-muted-foreground transition-transform">
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </span>
      </button>

      {!collapsed && (
        <div className="mt-3 ml-4 space-y-2 border-l-2 border-border pl-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {node.children.map((l2, l2i) => {
            const key = `${phaseIndex}-${l2i}`;
            const isActive = expandedL2.has(key);
            const l2Dimmed = activeL2Key !== null && activeL2Key !== key;
            return (
              <L2Card
                key={key}
                node={l2}
                isActive={isActive}
                onToggle={() => onToggleL2(key)}
                dimmed={l2Dimmed}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
export function RoadmapMapView() {
  const [activeKey, setActiveKey] = useState(CAREER_MAPS[0].key);
  const [expandedL2, setExpandedL2] = useState<Set<string>>(new Set());
  const [activeL2Key, setActiveL2Key] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeMap = CAREER_MAPS.find((c) => c.key === activeKey)!;

  // Reset state when switching careers
  useEffect(() => {
    setExpandedL2(new Set());
    setActiveL2Key(null);
    setZoom(1);
  }, [activeKey]);

  const handleToggleL2 = useCallback((key: string) => {
    setExpandedL2((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
        if (activeL2Key === key) setActiveL2Key(null);
      } else {
        next.add(key);
        setActiveL2Key(key);
      }
      return next;
    });
  }, [activeL2Key]);

  const totalConcepts = activeMap.phases.reduce(
    (sum, p) => sum + p.children.reduce((s, c) => s + c.children.length, 0),
    0,
  );

  return (
    <div className="space-y-6">
      {/* Career selector */}
      <div className="flex flex-wrap gap-2">
        {CAREER_MAPS.map((career) => {
          const isActive = career.key === activeKey;
          return (
            <button
              key={career.key}
              onClick={() => setActiveKey(career.key)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {career.title}
            </button>
          );
        })}
      </div>

      {/* Header */}
      <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${DOMAIN_BADGE[activeMap.domain] || "bg-muted text-muted-foreground"}`}>
            {activeMap.domain}
          </span>
          <h3 className="font-display text-lg font-bold text-foreground">{activeMap.title}</h3>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{activeMap.tagline}</p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Layers className="h-3 w-3" />
            {activeMap.phases.length} phases
          </span>
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {activeMap.phases.reduce((s, p) => s + p.children.length, 0)} topics
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="font-mono font-bold text-foreground">{totalConcepts}</span> micro-concepts
          </span>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}>
          <ZoomOut className="h-3.5 w-3.5" />
        </Button>
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}>
          <ZoomIn className="h-3.5 w-3.5" />
        </Button>
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setZoom(1)}>
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
        <span className="ml-1 text-[11px] text-muted-foreground">{Math.round(zoom * 100)}%</span>
      </div>

      {/* Map canvas — scrollable + zoomable */}
      <div
        ref={containerRef}
        className="overflow-auto rounded-2xl border border-border bg-gradient-to-b from-card/40 to-background"
        style={{ maxHeight: "70vh" }}
      >
        <div
          key={activeKey}
          className="origin-top-left p-6 space-y-4 transition-transform duration-200 animate-in fade-in slide-in-from-bottom-2 duration-300"
          style={{ transform: `scale(${zoom})`, transformOrigin: "top left", width: `${100 / zoom}%` }}
        >
          {activeMap.phases.map((phase, pi) => (
            <L1PhaseCard
              key={pi}
              node={phase}
              phaseIndex={pi}
              expandedL2={expandedL2}
              onToggleL2={handleToggleL2}
              activeL2Key={activeL2Key}
              dimmed={false}
            />
          ))}
        </div>
      </div>

      <p className="text-center text-[11px] text-muted-foreground">
        Click phases to expand topics, then click topics to reveal micro-concepts. Hover a concept for details.
      </p>
    </div>
  );
}