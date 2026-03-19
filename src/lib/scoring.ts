// ===== CAREER DATASET =====
// Domain → Career → Skills mapping from user's dataset

export interface Career {
  title: string;
  domain: "Tech" | "Accounting";
  skills: string[];
}

export const CAREERS: Career[] = [
  { title: "Software Developer", domain: "Tech", skills: ["Coding", "Problem-solving", "Debugging"] },
  { title: "Data Analyst", domain: "Tech", skills: ["Excel", "SQL", "Problem-solving"] },
  { title: "Cybersecurity Analyst", domain: "Tech", skills: ["Networking", "Risk Analysis", "Problem-solving"] },
  { title: "Accountant", domain: "Accounting", skills: ["Numbers", "Analytical Thinking", "Attention to Detail"] },
];

// All unique skills extracted from dataset
export const ALL_SKILLS = [
  "Coding",
  "Problem-solving",
  "Debugging",
  "Excel",
  "SQL",
  "Networking",
  "Risk Analysis",
  "Numbers",
  "Analytical Thinking",
  "Attention to Detail",
] as const;

export type SkillName = (typeof ALL_SKILLS)[number];

// ===== MBTI-STYLE QUESTIONS =====
// Each question maps to one or more skills.
// Rating 1-4 (no neutral): 1=Strongly Disagree, 2=Disagree, 3=Agree, 4=Strongly Agree
// Each answer directly contributes to skill scores.

export interface Question {
  id: number;
  text: string;
  skillMap: { skill: SkillName; weight: number }[];
  // Explanation of how answers affect scores (for display)
  scoringNote: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "I enjoy writing code or building things with programming languages.",
    skillMap: [
      { skill: "Coding", weight: 3 },
      { skill: "Debugging", weight: 1 },
    ],
    scoringNote: "High → boosts Coding (+3×) & Debugging (+1×) → Software Dev",
  },
  {
    id: 2,
    text: "When something breaks, I like figuring out exactly what went wrong.",
    skillMap: [
      { skill: "Debugging", weight: 3 },
      { skill: "Problem-solving", weight: 2 },
    ],
    scoringNote: "High → boosts Debugging (+3×) & Problem-solving (+2×) → Software Dev, all Tech",
  },
  {
    id: 3,
    text: "I'm comfortable using spreadsheets to organize and analyze data.",
    skillMap: [
      { skill: "Excel", weight: 3 },
      { skill: "Numbers", weight: 1 },
    ],
    scoringNote: "High → boosts Excel (+3×) → Data Analyst, Numbers (+1×) → Accountant",
  },
  {
    id: 4,
    text: "I like writing queries or commands to pull information from databases.",
    skillMap: [
      { skill: "SQL", weight: 3 },
      { skill: "Problem-solving", weight: 1 },
    ],
    scoringNote: "High → boosts SQL (+3×) → Data Analyst",
  },
  {
    id: 5,
    text: "I'm interested in how computer networks and the internet work.",
    skillMap: [
      { skill: "Networking", weight: 3 },
      { skill: "Risk Analysis", weight: 1 },
    ],
    scoringNote: "High → boosts Networking (+3×) & Risk Analysis (+1×) → Cybersecurity",
  },
  {
    id: 6,
    text: "I think about what could go wrong in a system and how to prevent it.",
    skillMap: [
      { skill: "Risk Analysis", weight: 3 },
      { skill: "Problem-solving", weight: 1 },
      { skill: "Attention to Detail", weight: 1 },
    ],
    scoringNote: "High → boosts Risk Analysis (+3×) → Cybersecurity, also Attention to Detail → Accountant",
  },
  {
    id: 7,
    text: "I enjoy working with numbers, calculations, and financial figures.",
    skillMap: [
      { skill: "Numbers", weight: 3 },
      { skill: "Analytical Thinking", weight: 1 },
    ],
    scoringNote: "High → boosts Numbers (+3×) & Analytical Thinking (+1×) → Accountant",
  },
  {
    id: 8,
    text: "I'm very careful and precise — I double-check my work for errors.",
    skillMap: [
      { skill: "Attention to Detail", weight: 3 },
      { skill: "Debugging", weight: 1 },
    ],
    scoringNote: "High → boosts Attention to Detail (+3×) → Accountant, Debugging (+1×) → Software Dev",
  },
  {
    id: 9,
    text: "I enjoy breaking down complex problems into smaller, logical steps.",
    skillMap: [
      { skill: "Problem-solving", weight: 3 },
      { skill: "Analytical Thinking", weight: 2 },
    ],
    scoringNote: "High → boosts Problem-solving (+3×) → all Tech careers, Analytical Thinking (+2×) → Accountant",
  },
  {
    id: 10,
    text: "I like analyzing information to find trends, patterns, or insights.",
    skillMap: [
      { skill: "Analytical Thinking", weight: 3 },
      { skill: "Excel", weight: 1 },
      { skill: "Risk Analysis", weight: 1 },
    ],
    scoringNote: "High → boosts Analytical Thinking (+3×) → Accountant, Excel → Data Analyst, Risk Analysis → Cybersecurity",
  },
];

// ===== SCORING ENGINE =====

export interface SkillScore {
  skill: SkillName;
  score: number;
  maxScore: number;
}

export interface CareerMatch {
  career: Career;
  score: number;
  maxScore: number;
  percentage: number;
  skillBreakdown: SkillScore[];
  skillGaps: { skill: string; score: number; maxScore: number }[];
}

export interface DomainScore {
  domain: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  careers: CareerMatch[];
}

export function calculateResults(answers: Record<number, number>): {
  domains: DomainScore[];
  topDomain: string;
  topCareer: CareerMatch;
} {
  // Step 1: Calculate raw skill scores from answers
  const skillScores: Record<string, { score: number; maxScore: number }> = {};
  ALL_SKILLS.forEach((s) => (skillScores[s] = { score: 0, maxScore: 0 }));

  QUESTIONS.forEach((q) => {
    const answer = answers[q.id] ?? 1;
    q.skillMap.forEach(({ skill, weight }) => {
      skillScores[skill].score += answer * weight;
      skillScores[skill].maxScore += 4 * weight; // max answer is 4
    });
  });

  // Step 2: Score each career based on its required skills
  const careerMatches: CareerMatch[] = CAREERS.map((career) => {
    let score = 0;
    let maxScore = 0;
    const skillBreakdown: SkillScore[] = [];
    const skillGaps: CareerMatch["skillGaps"] = [];

    career.skills.forEach((skillName) => {
      const s = skillScores[skillName] || { score: 0, maxScore: 0 };
      score += s.score;
      maxScore += s.maxScore;
      skillBreakdown.push({ skill: skillName as SkillName, score: s.score, maxScore: s.maxScore });

      // Gap: skill is below 50% of its max
      if (s.maxScore > 0 && s.score / s.maxScore < 0.5) {
        skillGaps.push({ skill: skillName, score: s.score, maxScore: s.maxScore });
      }
    });

    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    return { career, score, maxScore, percentage, skillBreakdown, skillGaps };
  });

  // Step 3: Aggregate by domain
  const domainMap: Record<string, CareerMatch[]> = {};
  careerMatches.forEach((cm) => {
    const d = cm.career.domain;
    if (!domainMap[d]) domainMap[d] = [];
    domainMap[d].push(cm);
  });

  const domains: DomainScore[] = Object.entries(domainMap).map(([domain, careers]) => {
    const totalScore = careers.reduce((sum, c) => sum + c.score, 0);
    const maxScore = careers.reduce((sum, c) => sum + c.maxScore, 0);
    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
    // Sort careers within domain by percentage desc
    careers.sort((a, b) => b.percentage - a.percentage);
    return { domain, totalScore, maxScore, percentage, careers };
  });

  domains.sort((a, b) => b.percentage - a.percentage);

  const allCareers = [...careerMatches].sort((a, b) => b.percentage - a.percentage);

  return {
    domains,
    topDomain: domains[0].domain,
    topCareer: allCareers[0],
  };
}
