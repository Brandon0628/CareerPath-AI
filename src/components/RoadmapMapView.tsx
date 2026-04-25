import { useMemo, useState } from "react";
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
  GitBranch,
} from "lucide-react";

type NodeStatus = "completed" | "current" | "recommended" | "locked";
type Difficulty = "Beginner" | "Intermediate" | "Advanced";
type NodeKind = "milestone" | "decision";

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  why: string;
  difficulty: Difficulty;
  duration: string;
  resources: { label: string; url: string }[];
  status: NodeStatus;
  kind?: NodeKind; // defaults to "milestone"
  next?: string[]; // ids of children — supports branching
}

interface RoadmapGraph {
  key: string;
  title: string;
  domain: "Tech" | "Accounting";
  tagline: string;
  rootId: string;
  nodes: RoadmapNode[];
}

// ============================================================
// CAREER GRAPHS — true DAGs with branching + decision points
// ============================================================
const CAREER_GRAPHS: RoadmapGraph[] = [
  {
    key: "software-developer",
    title: "Software Developer",
    domain: "Tech",
    tagline: "From first line of code to senior engineer — pick your specialization",
    rootId: "sd-html",
    nodes: [
      { id: "sd-html", title: "HTML & CSS", status: "completed", description: "Master the building blocks of every webpage.", why: "Every web product starts here.", difficulty: "Beginner", duration: "2–3 weeks", resources: [{ label: "MDN Web Docs", url: "https://developer.mozilla.org/" }], next: ["sd-js"] },
      { id: "sd-js", title: "JavaScript", status: "completed", description: "Variables, functions, async, the DOM, and modern ES syntax.", why: "JavaScript powers interactivity on the web.", difficulty: "Beginner", duration: "1–2 months", resources: [{ label: "JavaScript.info", url: "https://javascript.info/" }], next: ["sd-git"] },
      { id: "sd-git", title: "Git + GitHub", status: "current", description: "Version control your projects and collaborate.", why: "Every professional team uses Git.", difficulty: "Beginner", duration: "1 week", resources: [{ label: "GitHub Skills", url: "https://skills.github.com/" }], next: ["sd-choice"] },
      // DECISION POINT
      { id: "sd-choice", title: "Choose Your Track", status: "recommended", kind: "decision", description: "Pick the developer track that excites you. You can always come back and explore others.", why: "Specialization helps you go deep and land a first role faster.", difficulty: "Beginner", duration: "—", resources: [], next: ["sd-frontend", "sd-backend", "sd-mobile"] },
      // BRANCH 1: FRONTEND
      { id: "sd-frontend", title: "Frontend (React)", status: "recommended", description: "Components, state, hooks, and modern UI patterns.", why: "React is the most in-demand frontend framework.", difficulty: "Intermediate", duration: "1–2 months", resources: [{ label: "React Docs", url: "https://react.dev/" }], next: ["sd-portfolio"] },
      // BRANCH 2: BACKEND
      { id: "sd-backend", title: "Backend (Node + DB)", status: "locked", description: "REST APIs, databases, auth, and deployment.", why: "Backend skills round out your full-stack capability.", difficulty: "Intermediate", duration: "2 months", resources: [{ label: "Node Docs", url: "https://nodejs.org/en/docs" }], next: ["sd-portfolio"] },
      // BRANCH 3: MOBILE
      { id: "sd-mobile", title: "Mobile (React Native)", status: "locked", description: "Build cross-platform iOS + Android apps.", why: "Mobile is a fast-growing niche with great pay.", difficulty: "Intermediate", duration: "2 months", resources: [{ label: "React Native", url: "https://reactnative.dev/" }], next: ["sd-portfolio"] },
      // CONVERGE
      { id: "sd-portfolio", title: "Portfolio Projects", status: "locked", description: "Ship 3–5 polished projects that prove your skill.", why: "Projects beat certificates with recruiters.", difficulty: "Intermediate", duration: "1–2 months", resources: [{ label: "Frontend Mentor", url: "https://www.frontendmentor.io/" }], next: ["sd-job"] },
      { id: "sd-job", title: "Junior Developer Role", status: "locked", description: "Land your first full-time engineering role.", why: "The first role unlocks mentorship and the senior track.", difficulty: "Advanced", duration: "Ongoing", resources: [{ label: "Tech Interview Handbook", url: "https://www.techinterviewhandbook.org/" }] },
    ],
  },
  {
    key: "data-analyst",
    title: "Data Analyst",
    domain: "Tech",
    tagline: "From spreadsheets to specialized analyst — multiple paths forward",
    rootId: "da-excel",
    nodes: [
      { id: "da-excel", title: "Excel Basics", status: "completed", description: "Formulas, pivot tables, VLOOKUP, and data cleaning.", why: "Excel is the most-used analytics tool in the world.", difficulty: "Beginner", duration: "1–2 weeks", resources: [{ label: "Excel Easy", url: "https://www.excel-easy.com/" }], next: ["da-sql"] },
      { id: "da-sql", title: "SQL", status: "current", description: "SELECT, JOIN, GROUP BY, and window functions.", why: "SQL is the universal language of data.", difficulty: "Beginner", duration: "3–4 weeks", resources: [{ label: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/" }], next: ["da-choice"] },
      // DECISION
      { id: "da-choice", title: "Pick a Specialization", status: "recommended", kind: "decision", description: "Three popular analyst tracks: BI, Product, or Data Science prep.", why: "Specializing helps you stand out in interviews.", difficulty: "Beginner", duration: "—", resources: [], next: ["da-bi", "da-product", "da-python"] },
      { id: "da-bi", title: "BI Tools (Tableau / Power BI)", status: "recommended", description: "Build polished dashboards stakeholders love.", why: "BI roles are the most common analyst entry point.", difficulty: "Intermediate", duration: "1 month", resources: [{ label: "Tableau Public", url: "https://public.tableau.com/" }], next: ["da-portfolio"] },
      { id: "da-product", title: "Product Analytics", status: "locked", description: "Funnels, cohort analysis, A/B tests, retention metrics.", why: "Tech companies hire heavily for product analysts.", difficulty: "Intermediate", duration: "1 month", resources: [{ label: "Amplitude Academy", url: "https://academy.amplitude.com/" }], next: ["da-portfolio"] },
      { id: "da-python", title: "Python + Pandas", status: "locked", description: "Wrangling, automation, and stepping toward ML.", why: "Python opens the door to data science later.", difficulty: "Intermediate", duration: "1 month", resources: [{ label: "Kaggle Learn", url: "https://www.kaggle.com/learn" }], next: ["da-portfolio"] },
      { id: "da-portfolio", title: "Portfolio + Case Studies", status: "locked", description: "Showcase projects with code, dashboards, and write-ups.", why: "A strong portfolio beats a résumé bullet.", difficulty: "Intermediate", duration: "Ongoing", resources: [{ label: "GitHub Pages", url: "https://pages.github.com/" }], next: ["da-job"] },
      { id: "da-job", title: "Analyst Role", status: "locked", description: "Apply and crush case-study interviews.", why: "First analyst role launches you toward senior tracks.", difficulty: "Advanced", duration: "Ongoing", resources: [{ label: "StrataScratch", url: "https://www.stratascratch.com/" }] },
    ],
  },
  {
    key: "cybersecurity",
    title: "Cybersecurity Analyst",
    domain: "Tech",
    tagline: "Defend, hunt, or break — choose your security path",
    rootId: "cs-net",
    nodes: [
      { id: "cs-net", title: "Networking Basics", status: "completed", description: "TCP/IP, DNS, HTTP, ports, OSI model.", why: "You can't secure what you don't understand.", difficulty: "Beginner", duration: "3–4 weeks", resources: [{ label: "Professor Messer", url: "https://www.professormesser.com/" }], next: ["cs-linux"] },
      { id: "cs-linux", title: "Linux Fundamentals", status: "current", description: "Command line, filesystem, basic shell scripting.", why: "Most servers and security tools run on Linux.", difficulty: "Beginner", duration: "1 month", resources: [{ label: "OverTheWire Bandit", url: "https://overthewire.org/wargames/bandit/" }], next: ["cs-fund"] },
      { id: "cs-fund", title: "Security Fundamentals", status: "recommended", description: "CIA triad, threats, encryption, authentication.", why: "Core concepts appear in every interview.", difficulty: "Intermediate", duration: "1 month", resources: [{ label: "Cybrary", url: "https://www.cybrary.it/" }], next: ["cs-choice"] },
      // DECISION
      { id: "cs-choice", title: "Red Team or Blue Team?", status: "recommended", kind: "decision", description: "Offense (find weaknesses) or defense (stop attacks). Both are great careers.", why: "Each side hires differently and pays differently.", difficulty: "Intermediate", duration: "—", resources: [], next: ["cs-blue", "cs-red"] },
      { id: "cs-blue", title: "Blue Team / SOC", status: "recommended", description: "Monitor alerts, hunt threats, respond to incidents.", why: "SOC analyst is the most common entry point in security.", difficulty: "Intermediate", duration: "Ongoing", resources: [{ label: "Blue Team Labs", url: "https://blueteamlabs.online/" }], next: ["cs-cert"] },
      { id: "cs-red", title: "Red Team / Pentest", status: "locked", description: "CTFs, exploitation, web pentesting.", why: "Offensive skills command top salaries.", difficulty: "Advanced", duration: "Ongoing", resources: [{ label: "TryHackMe", url: "https://tryhackme.com/" }, { label: "HackTheBox", url: "https://www.hackthebox.com/" }], next: ["cs-cert"] },
      { id: "cs-cert", title: "Certifications", status: "locked", description: "Security+, then CySA+, CEH, or OSCP.", why: "Certs are entry filters for many security roles.", difficulty: "Advanced", duration: "2–4 months", resources: [{ label: "CompTIA Security+", url: "https://www.comptia.org/certifications/security" }], next: ["cs-job"] },
      { id: "cs-job", title: "Security Role", status: "locked", description: "Land your first SOC, pentest, or security engineer role.", why: "First role unlocks the rest of the security career path.", difficulty: "Advanced", duration: "Ongoing", resources: [] },
    ],
  },
  {
    key: "accountant",
    title: "Accountant",
    domain: "Accounting",
    tagline: "From bookkeeping to qualified accountant — multiple specializations",
    rootId: "ac-book",
    nodes: [
      { id: "ac-book", title: "Bookkeeping Basics", status: "completed", description: "Double-entry, debits/credits, journals, the cycle.", why: "Bookkeeping is the foundation of all accounting.", difficulty: "Beginner", duration: "2–3 weeks", resources: [{ label: "AccountingCoach", url: "https://www.accountingcoach.com/" }], next: ["ac-excel"] },
      { id: "ac-excel", title: "Excel for Accounting", status: "current", description: "Pivot tables, VLOOKUP, SUMIF, financial formulas.", why: "Accountants live in spreadsheets.", difficulty: "Beginner", duration: "2 weeks", resources: [{ label: "Corporate Finance Institute", url: "https://corporatefinanceinstitute.com/" }], next: ["ac-fs"] },
      { id: "ac-fs", title: "Financial Statements", status: "recommended", description: "Income statement, balance sheet, cash flow.", why: "These three reports tell the story of any business.", difficulty: "Intermediate", duration: "1 month", resources: [{ label: "Investopedia", url: "https://www.investopedia.com/" }], next: ["ac-choice"] },
      // DECISION
      { id: "ac-choice", title: "Choose Your Niche", status: "recommended", kind: "decision", description: "Tax, audit, or corporate finance — three lucrative paths.", why: "Each niche has its own season, software, and skill set.", difficulty: "Intermediate", duration: "—", resources: [], next: ["ac-tax", "ac-audit", "ac-corp"] },
      { id: "ac-tax", title: "Tax Specialization", status: "recommended", description: "Individual + corporate tax, deductions, filings.", why: "Tax season drives huge demand and pays well.", difficulty: "Intermediate", duration: "1–2 months", resources: [{ label: "IRS Resources", url: "https://www.irs.gov/" }], next: ["ac-software"] },
      { id: "ac-audit", title: "Audit Track", status: "locked", description: "Internal controls, sampling, audit procedures.", why: "Big-4 audit roles open doors everywhere.", difficulty: "Intermediate", duration: "1–2 months", resources: [{ label: "AICPA", url: "https://www.aicpa-cima.com/" }], next: ["ac-software"] },
      { id: "ac-corp", title: "Corporate Finance", status: "locked", description: "FP&A, budgeting, forecasting, modeling.", why: "Corporate finance roles command higher salaries.", difficulty: "Advanced", duration: "2 months", resources: [{ label: "Wall Street Prep", url: "https://www.wallstreetprep.com/" }], next: ["ac-software"] },
      { id: "ac-software", title: "Accounting Software", status: "locked", description: "QuickBooks, Xero, SAP — tools firms use daily.", why: "Software fluency is tested on day one.", difficulty: "Intermediate", duration: "3–4 weeks", resources: [{ label: "QuickBooks Training", url: "https://quickbooks.intuit.com/learn-support/" }], next: ["ac-job"] },
      { id: "ac-job", title: "Junior Accountant Role", status: "locked", description: "Reconciliations, journal entries, month-end close.", why: "Junior roles build the experience needed for CPA.", difficulty: "Advanced", duration: "Ongoing", resources: [{ label: "Becker CPA", url: "https://www.becker.com/" }] },
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

// ============================================================
// LAYOUT — assign each node a (depth, slot) position via BFS
// ============================================================
interface PositionedNode extends RoadmapNode {
  depth: number;
  slot: number; // 0..(slotsAtDepth-1)
  x: number; // px
  y: number; // px
}

const NODE_W = 200;
const NODE_H = 84;
const COL_GAP = 56; // vertical gap between depths
const ROW_GAP = 24; // horizontal gap between siblings

function layoutGraph(graph: RoadmapGraph): {
  positioned: PositionedNode[];
  width: number;
  height: number;
  byId: Map<string, PositionedNode>;
} {
  const byId = new Map<string, RoadmapNode>(graph.nodes.map((n) => [n.id, n]));
  const depth = new Map<string, number>();
  const visited = new Set<string>();
  const queue: string[] = [graph.rootId];
  depth.set(graph.rootId, 0);

  // BFS to compute the *maximum* depth (longest path from root) so converging
  // nodes sit on the same row.
  while (queue.length) {
    const id = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);
    const d = depth.get(id) ?? 0;
    const node = byId.get(id);
    if (!node?.next) continue;
    for (const childId of node.next) {
      const candidate = d + 1;
      const existing = depth.get(childId);
      if (existing === undefined || candidate > existing) {
        depth.set(childId, candidate);
      }
      queue.push(childId);
    }
  }

  // Group by depth, preserving declaration order for stable layout.
  const byDepth = new Map<number, RoadmapNode[]>();
  for (const node of graph.nodes) {
    const d = depth.get(node.id);
    if (d === undefined) continue; // unreachable, skip
    if (!byDepth.has(d)) byDepth.set(d, []);
    byDepth.get(d)!.push(node);
  }

  const maxDepth = Math.max(...byDepth.keys());
  const maxSlots = Math.max(...Array.from(byDepth.values()).map((arr) => arr.length));
  const width = maxSlots * NODE_W + (maxSlots - 1) * ROW_GAP;
  const height = (maxDepth + 1) * NODE_H + maxDepth * COL_GAP;

  const positioned: PositionedNode[] = [];
  const posById = new Map<string, PositionedNode>();

  for (let d = 0; d <= maxDepth; d++) {
    const rowNodes = byDepth.get(d) ?? [];
    const rowWidth = rowNodes.length * NODE_W + (rowNodes.length - 1) * ROW_GAP;
    const offset = (width - rowWidth) / 2;
    rowNodes.forEach((node, slot) => {
      const x = offset + slot * (NODE_W + ROW_GAP);
      const y = d * (NODE_H + COL_GAP);
      const p: PositionedNode = { ...node, depth: d, slot, x, y };
      positioned.push(p);
      posById.set(node.id, p);
    });
  }

  return { positioned, width, height, byId: posById };
}

// ============================================================
// DOWNSTREAM HIGHLIGHT — collect ids reachable from a node
// ============================================================
function collectDownstream(graph: RoadmapGraph, startId: string): Set<string> {
  const result = new Set<string>([startId]);
  const byId = new Map(graph.nodes.map((n) => [n.id, n]));
  const stack = [startId];
  while (stack.length) {
    const id = stack.pop()!;
    const node = byId.get(id);
    if (!node?.next) continue;
    for (const child of node.next) {
      if (!result.has(child)) {
        result.add(child);
        stack.push(child);
      }
    }
  }
  return result;
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export function RoadmapMapView() {
  const [activeKey, setActiveKey] = useState<string>(CAREER_GRAPHS[0].key);
  const [selected, setSelected] = useState<RoadmapNode | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const activeGraph = CAREER_GRAPHS.find((p) => p.key === activeKey)!;

  const { positioned, width, height, byId } = useMemo(
    () => layoutGraph(activeGraph),
    [activeGraph],
  );

  const highlighted = useMemo(
    () => (highlightId ? collectDownstream(activeGraph, highlightId) : null),
    [activeGraph, highlightId],
  );

  // Build edges with computed pixel coordinates
  const edges = useMemo(() => {
    const list: { from: PositionedNode; to: PositionedNode }[] = [];
    for (const node of positioned) {
      if (!node.next) continue;
      for (const childId of node.next) {
        const child = byId.get(childId);
        if (child) list.push({ from: node, to: child });
      }
    }
    return list;
  }, [positioned, byId]);

  const isDimmed = (id: string) => highlighted !== null && !highlighted.has(id);
  const isEdgeDimmed = (fromId: string, toId: string) =>
    highlighted !== null && !(highlighted.has(fromId) && highlighted.has(toId));

  const handleNodeClick = (node: RoadmapNode) => {
    setHighlightId((prev) => (prev === node.id ? null : node.id));
    setSelected(node);
  };

  return (
    <div className="space-y-6">
      {/* Career selector */}
      <div className="flex flex-wrap gap-2">
        {CAREER_GRAPHS.map((path) => {
          const isActive = path.key === activeKey;
          const isTech = path.domain === "Tech";
          return (
            <button
              key={path.key}
              onClick={() => {
                setActiveKey(path.key);
                setHighlightId(null);
              }}
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
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              activeGraph.domain === "Tech" ? "bg-primary/15 text-primary" : "bg-secondary/15 text-secondary"
            }`}
          >
            {activeGraph.domain}
          </span>
          <h3 className="font-display text-lg font-bold text-foreground">{activeGraph.title}</h3>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{activeGraph.tagline}</p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
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
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-foreground/80 text-background">
              <GitBranch className="h-2.5 w-2.5" />
            </span>
            Decision
          </span>
        </div>

        {highlightId && (
          <button
            onClick={() => setHighlightId(null)}
            className="mt-3 inline-flex items-center gap-1 rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-foreground/10"
          >
            Clear path highlight
          </button>
        )}
      </div>

      {/* Graph canvas — horizontally scrollable on small screens */}
      <div
        key={activeKey}
        className="relative overflow-x-auto rounded-2xl border border-border bg-gradient-to-b from-card/40 to-background p-6 animate-in fade-in slide-in-from-bottom-2 duration-300"
      >
        <div className="relative mx-auto" style={{ width, height }}>
          {/* SVG edges */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width={width}
            height={height}
            aria-hidden
          >
            {edges.map(({ from, to }) => {
              const x1 = from.x + NODE_W / 2;
              const y1 = from.y + NODE_H;
              const x2 = to.x + NODE_W / 2;
              const y2 = to.y;
              const midY = (y1 + y2) / 2;
              // Cubic curve for nicer branching look
              const path = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
              const dimmed = isEdgeDimmed(from.id, to.id);
              const fromIsDecision = from.kind === "decision";
              return (
                <path
                  key={`${from.id}->${to.id}`}
                  d={path}
                  stroke="currentColor"
                  strokeWidth={dimmed ? 1.5 : 2}
                  fill="none"
                  strokeDasharray={fromIsDecision ? "5 4" : undefined}
                  className={`transition-opacity duration-300 ${
                    dimmed ? "text-border opacity-40" : "text-primary/60"
                  }`}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {positioned.map((node) => {
            const styles = STATUS_STYLES[node.status];
            const Icon = styles.icon;
            const isDecision = node.kind === "decision";
            const dimmed = isDimmed(node.id);
            const isHighlightRoot = highlightId === node.id;

            return (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node)}
                style={{
                  left: node.x,
                  top: node.y,
                  width: NODE_W,
                  height: NODE_H,
                }}
                className={`group absolute rounded-2xl border-2 px-3 py-2 text-left transition-all hover:scale-[1.03] hover:shadow-lg hover:ring-4 ${
                  styles.card
                } ${styles.ring} ${
                  isDecision ? "border-dashed bg-foreground/[0.04]" : ""
                } ${dimmed ? "opacity-40" : "opacity-100"} ${
                  isHighlightRoot ? "ring-4 ring-primary/40 shadow-xl scale-[1.02]" : ""
                }`}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                      isDecision ? "bg-foreground text-background" : styles.badge
                    }`}
                  >
                    {isDecision ? <GitBranch className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-[13px] font-bold leading-tight line-clamp-2">
                      {node.title}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px]">
                      {!isDecision && (
                        <span className={`rounded-full px-1.5 py-0.5 font-medium ${DIFFICULTY_STYLES[node.difficulty]}`}>
                          {node.difficulty}
                        </span>
                      )}
                      {!isDecision && (
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-2.5 w-2.5" />
                          {node.duration}
                        </span>
                      )}
                      {isDecision && (
                        <span className="rounded-full bg-foreground/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                          Choose
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          Tap any node to see details and highlight its downstream path. Tap again to clear.
        </p>
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-md">
          {selected && (
            <>
              <DialogHeader>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[selected.status].badge}`}>
                    {(() => {
                      const I = STATUS_STYLES[selected.status].icon;
                      return <I className="h-2.5 w-2.5" />;
                    })()}
                    {STATUS_STYLES[selected.status].label}
                  </span>
                  {selected.kind === "decision" ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-foreground text-background px-2 py-0.5 text-[10px] font-semibold">
                      <GitBranch className="h-2.5 w-2.5" />
                      Decision Point
                    </span>
                  ) : (
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${DIFFICULTY_STYLES[selected.difficulty]}`}>
                      {selected.difficulty}
                    </span>
                  )}
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

                {selected.kind !== "decision" && (
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
                )}

                {selected.resources.length > 0 && (
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
                )}

                {selected.next && selected.next.length > 1 && (
                  <div className="rounded-xl border border-dashed border-foreground/20 bg-foreground/[0.03] p-3">
                    <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                      Branches from here
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This node opens {selected.next.length} different paths. Tap each branch in the map to compare.
                    </p>
                  </div>
                )}

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