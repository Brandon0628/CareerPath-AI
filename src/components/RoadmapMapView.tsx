import { useState } from "react";
import { CAREER_ROADMAPS, type RoadmapNode } from "@/lib/scoring";

const LEVEL_COLORS: Record<string, { bg: string; border: string; ring: string }> = {
  entry: { bg: "bg-primary/10", border: "border-primary/40", ring: "ring-primary/30" },
  mid: { bg: "bg-secondary/10", border: "border-secondary/40", ring: "ring-secondary/30" },
  senior: { bg: "bg-accent/10", border: "border-accent/40", ring: "ring-accent/30" },
  lead: { bg: "bg-destructive/10", border: "border-destructive/40", ring: "ring-destructive/30" },
};

const LEVEL_LABELS: Record<string, string> = {
  entry: "Entry",
  mid: "Mid",
  senior: "Senior",
  lead: "Lead",
};

export function RoadmapMapView() {
  const [selectedNode, setSelectedNode] = useState<{ career: string; node: RoadmapNode } | null>(null);

  const techCareers = CAREER_ROADMAPS.filter((r) => r.domain === "Tech");
  const accountingCareers = CAREER_ROADMAPS.filter((r) => r.domain === "Accounting");

  const renderCareerTrack = (roadmap: typeof CAREER_ROADMAPS[0]) => {
    const isTech = roadmap.domain === "Tech";
    return (
      <div key={roadmap.careerTitle} className="flex flex-col items-center gap-1">
        {/* Career title */}
        <div className={`rounded-lg px-3 py-1.5 text-xs font-bold ${isTech ? "bg-primary/15 text-primary" : "bg-secondary/15 text-secondary"}`}>
          {roadmap.careerTitle}
        </div>

        {/* Nodes */}
        {roadmap.nodes.map((node, i) => {
          const colors = LEVEL_COLORS[node.level];
          const isSelected = selectedNode?.node.id === node.id;
          const isLast = i === roadmap.nodes.length - 1;

          return (
            <div key={node.id} className="flex flex-col items-center">
              {/* Connector line */}
              <div className="h-4 w-0.5 bg-border" />

              {/* Node */}
              <button
                onClick={() =>
                  setSelectedNode(isSelected ? null : { career: roadmap.careerTitle, node })
                }
                className={`relative w-40 rounded-xl border-2 px-3 py-2.5 text-center transition-all hover:shadow-md ${colors.bg} ${colors.border} ${
                  isSelected ? `ring-2 ${colors.ring} shadow-lg scale-105` : ""
                }`}
              >
                <span className="block text-xs font-semibold text-foreground leading-tight">
                  {node.title}
                </span>
                <span className="mt-0.5 block text-[10px] text-muted-foreground">
                  {LEVEL_LABELS[node.level]}
                </span>
              </button>

              {/* Arrow */}
              {!isLast && (
                <div className="flex flex-col items-center">
                  <div className="h-2 w-0.5 bg-border" />
                  <div className="h-0 w-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-border" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Tech Domain */}
      <div>
        <h3 className="mb-4 text-center font-display text-sm font-bold uppercase tracking-wider text-primary">
          Tech Domain
        </h3>
        <div className="flex flex-wrap justify-center gap-8 overflow-x-auto pb-4">
          {techCareers.map(renderCareerTrack)}
        </div>
      </div>

      {/* Accounting Domain */}
      <div>
        <h3 className="mb-4 text-center font-display text-sm font-bold uppercase tracking-wider text-secondary">
          Accounting Domain
        </h3>
        <div className="flex flex-wrap justify-center gap-8 overflow-x-auto pb-4">
          {accountingCareers.map(renderCareerTrack)}
        </div>
      </div>

      {/* Detail Panel */}
      {selectedNode && (
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-5 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="mb-1 flex items-center justify-between">
            <h4 className="font-display text-base font-bold text-card-foreground">
              {selectedNode.node.title}
            </h4>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {selectedNode.career}
            </span>
          </div>
          <p className="mb-3 text-sm text-muted-foreground">{selectedNode.node.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {selectedNode.node.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
          <button
            onClick={() => setSelectedNode(null)}
            className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
