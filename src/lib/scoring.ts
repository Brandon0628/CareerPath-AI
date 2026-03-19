// ===== SCORING ENGINE =====
// Each skill/interest has a weight for each domain.
// Users rate themselves 0-5 on each skill.
// Final score = sum(userRating * weight) for each domain.

export interface Skill {
  id: string;
  label: string;
  description: string;
  weights: { tech: number; accounting: number };
}

export const SKILLS: Skill[] = [
  {
    id: "problem_solving",
    label: "Problem Solving",
    description: "Enjoy breaking down complex problems into steps",
    weights: { tech: 3, accounting: 2 },
  },
  {
    id: "coding",
    label: "Coding / Programming",
    description: "Interest in writing code or building software",
    weights: { tech: 5, accounting: 0 },
  },
  {
    id: "computers",
    label: "Working with Computers",
    description: "Comfortable using technology and learning new tools",
    weights: { tech: 4, accounting: 1 },
  },
  {
    id: "math",
    label: "Math & Numbers",
    description: "Good with calculations and numerical reasoning",
    weights: { tech: 2, accounting: 4 },
  },
  {
    id: "money_management",
    label: "Managing Money",
    description: "Interest in budgets, savings, or financial planning",
    weights: { tech: 0, accounting: 5 },
  },
  {
    id: "data_analysis",
    label: "Analyzing Data",
    description: "Enjoy looking at data to find patterns or insights",
    weights: { tech: 3, accounting: 3 },
  },
  {
    id: "attention_detail",
    label: "Attention to Detail",
    description: "Careful and precise in your work",
    weights: { tech: 2, accounting: 4 },
  },
  {
    id: "creativity",
    label: "Creative Thinking",
    description: "Like designing, inventing, or thinking outside the box",
    weights: { tech: 4, accounting: 1 },
  },
];

export interface DomainResult {
  domain: string;
  score: number;
  maxScore: number;
  percentage: number;
  skillGaps: { skill: string; currentRating: number; idealRating: number }[];
}

export function calculateScores(
  ratings: Record<string, number>
): { results: DomainResult[]; topDomain: string } {
  const domains = ["tech", "accounting"] as const;

  const results: DomainResult[] = domains.map((domain) => {
    let score = 0;
    let maxScore = 0;
    const skillGaps: DomainResult["skillGaps"] = [];

    SKILLS.forEach((skill) => {
      const weight = skill.weights[domain];
      const rating = ratings[skill.id] ?? 0;
      score += rating * weight;
      maxScore += 5 * weight; // max rating (5) * weight

      // A skill gap exists if the weight is >= 3 (important) and rating is <= 2 (low)
      if (weight >= 3 && rating <= 2) {
        skillGaps.push({
          skill: skill.label,
          currentRating: rating,
          idealRating: 5,
        });
      }
    });

    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    return {
      domain: domain === "tech" ? "Tech" : "Accounting",
      score,
      maxScore,
      percentage,
      skillGaps,
    };
  });

  // Sort by percentage descending
  results.sort((a, b) => b.percentage - a.percentage);

  return { results, topDomain: results[0].domain };
}
