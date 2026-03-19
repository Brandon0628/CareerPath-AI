// ===== CAREER DATASET =====

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

export const ALL_SKILLS = [
  "Coding", "Problem-solving", "Debugging", "Excel", "SQL",
  "Networking", "Risk Analysis", "Numbers", "Analytical Thinking", "Attention to Detail",
] as const;

export type SkillName = (typeof ALL_SKILLS)[number];

// ===== STAGE 1: MBTI-STYLE QUESTIONS =====

export interface Question {
  id: number;
  text: string;
  skillMap: { skill: SkillName; weight: number }[];
  scoringNote: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "I enjoy writing code or building things with programming languages.",
    skillMap: [{ skill: "Coding", weight: 3 }, { skill: "Debugging", weight: 1 }],
    scoringNote: "High → boosts Coding (+3×) & Debugging (+1×) → Software Dev",
  },
  {
    id: 2,
    text: "When something breaks, I like figuring out exactly what went wrong.",
    skillMap: [{ skill: "Debugging", weight: 3 }, { skill: "Problem-solving", weight: 2 }],
    scoringNote: "High → boosts Debugging (+3×) & Problem-solving (+2×) → Software Dev, all Tech",
  },
  {
    id: 3,
    text: "I'm comfortable using spreadsheets to organize and analyze data.",
    skillMap: [{ skill: "Excel", weight: 3 }, { skill: "Numbers", weight: 1 }],
    scoringNote: "High → boosts Excel (+3×) → Data Analyst, Numbers (+1×) → Accountant",
  },
  {
    id: 4,
    text: "I like writing queries or commands to pull information from databases.",
    skillMap: [{ skill: "SQL", weight: 3 }, { skill: "Problem-solving", weight: 1 }],
    scoringNote: "High → boosts SQL (+3×) → Data Analyst",
  },
  {
    id: 5,
    text: "I'm interested in how computer networks and the internet work.",
    skillMap: [{ skill: "Networking", weight: 3 }, { skill: "Risk Analysis", weight: 1 }],
    scoringNote: "High → boosts Networking (+3×) & Risk Analysis (+1×) → Cybersecurity",
  },
  {
    id: 6,
    text: "I think about what could go wrong in a system and how to prevent it.",
    skillMap: [{ skill: "Risk Analysis", weight: 3 }, { skill: "Problem-solving", weight: 1 }, { skill: "Attention to Detail", weight: 1 }],
    scoringNote: "High → boosts Risk Analysis (+3×) → Cybersecurity, also Attention to Detail → Accountant",
  },
  {
    id: 7,
    text: "I enjoy working with numbers, calculations, and financial figures.",
    skillMap: [{ skill: "Numbers", weight: 3 }, { skill: "Analytical Thinking", weight: 1 }],
    scoringNote: "High → boosts Numbers (+3×) & Analytical Thinking (+1×) → Accountant",
  },
  {
    id: 8,
    text: "I'm very careful and precise — I double-check my work for errors.",
    skillMap: [{ skill: "Attention to Detail", weight: 3 }, { skill: "Debugging", weight: 1 }],
    scoringNote: "High → boosts Attention to Detail (+3×) → Accountant, Debugging (+1×) → Software Dev",
  },
  {
    id: 9,
    text: "I enjoy breaking down complex problems into smaller, logical steps.",
    skillMap: [{ skill: "Problem-solving", weight: 3 }, { skill: "Analytical Thinking", weight: 2 }],
    scoringNote: "High → boosts Problem-solving (+3×) → all Tech careers, Analytical Thinking (+2×) → Accountant",
  },
  {
    id: 10,
    text: "I like analyzing information to find trends, patterns, or insights.",
    skillMap: [{ skill: "Analytical Thinking", weight: 3 }, { skill: "Excel", weight: 1 }, { skill: "Risk Analysis", weight: 1 }],
    scoringNote: "High → boosts Analytical Thinking (+3×) → Accountant, Excel → Data Analyst, Risk Analysis → Cybersecurity",
  },
];

// ===== STAGE 2: SKILL ASSESSMENT QUESTIONS =====

export interface SkillQuestion {
  id: string;
  careerTitle: string;
  skill: string;
  text: string;
  maxRating: number; // 0–5
  requiredLevel: number; // expected proficiency (out of 5)
}

export const SKILL_QUESTIONS: SkillQuestion[] = [
  // Software Developer
  { id: "sd-1", careerTitle: "Software Developer", skill: "JavaScript", text: "Rate your JavaScript / TypeScript knowledge.", maxRating: 5, requiredLevel: 4 },
  { id: "sd-2", careerTitle: "Software Developer", skill: "Data Structures", text: "Rate your understanding of data structures and algorithms.", maxRating: 5, requiredLevel: 4 },
  { id: "sd-3", careerTitle: "Software Developer", skill: "Version Control", text: "Rate your experience with Git and version control.", maxRating: 5, requiredLevel: 3 },
  { id: "sd-4", careerTitle: "Software Developer", skill: "Debugging Tools", text: "Rate your ability to use debugging and dev tools.", maxRating: 5, requiredLevel: 3 },

  // Data Analyst
  { id: "da-1", careerTitle: "Data Analyst", skill: "Spreadsheets", text: "Rate your proficiency with Excel / Google Sheets (pivot tables, formulas).", maxRating: 5, requiredLevel: 4 },
  { id: "da-2", careerTitle: "Data Analyst", skill: "SQL Queries", text: "Rate your ability to write SQL queries (SELECT, JOIN, GROUP BY).", maxRating: 5, requiredLevel: 4 },
  { id: "da-3", careerTitle: "Data Analyst", skill: "Data Visualization", text: "Rate your experience creating charts and dashboards.", maxRating: 5, requiredLevel: 3 },
  { id: "da-4", careerTitle: "Data Analyst", skill: "Statistics", text: "Rate your understanding of basic statistics (mean, median, correlation).", maxRating: 5, requiredLevel: 3 },

  // Cybersecurity Analyst
  { id: "cs-1", careerTitle: "Cybersecurity Analyst", skill: "Network Protocols", text: "Rate your knowledge of TCP/IP, DNS, and HTTP protocols.", maxRating: 5, requiredLevel: 4 },
  { id: "cs-2", careerTitle: "Cybersecurity Analyst", skill: "Threat Analysis", text: "Rate your understanding of common cyber threats (phishing, malware, etc.).", maxRating: 5, requiredLevel: 4 },
  { id: "cs-3", careerTitle: "Cybersecurity Analyst", skill: "Security Tools", text: "Rate your experience with firewalls, antivirus, or penetration testing tools.", maxRating: 5, requiredLevel: 3 },
  { id: "cs-4", careerTitle: "Cybersecurity Analyst", skill: "Risk Assessment", text: "Rate your ability to assess and prioritize security risks.", maxRating: 5, requiredLevel: 3 },

  // Accountant
  { id: "ac-1", careerTitle: "Accountant", skill: "Bookkeeping", text: "Rate your knowledge of double-entry bookkeeping.", maxRating: 5, requiredLevel: 4 },
  { id: "ac-2", careerTitle: "Accountant", skill: "Financial Statements", text: "Rate your ability to read and prepare financial statements.", maxRating: 5, requiredLevel: 4 },
  { id: "ac-3", careerTitle: "Accountant", skill: "Tax Knowledge", text: "Rate your understanding of basic tax rules and regulations.", maxRating: 5, requiredLevel: 3 },
  { id: "ac-4", careerTitle: "Accountant", skill: "Accounting Software", text: "Rate your experience with accounting software (QuickBooks, Tally, etc.).", maxRating: 5, requiredLevel: 3 },
];

export function getSkillQuestionsForCareers(careerTitles: string[]): SkillQuestion[] {
  return SKILL_QUESTIONS.filter((sq) => careerTitles.includes(sq.careerTitle));
}

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

// Stage 1 results
export function calculateStage1Results(answers: Record<number, number>): {
  domains: DomainScore[];
  topDomain: string;
  topCareers: CareerMatch[]; // top 1-2 careers for Stage 2
} {
  const skillScores: Record<string, { score: number; maxScore: number }> = {};
  ALL_SKILLS.forEach((s) => (skillScores[s] = { score: 0, maxScore: 0 }));

  QUESTIONS.forEach((q) => {
    const answer = answers[q.id] ?? 1;
    q.skillMap.forEach(({ skill, weight }) => {
      skillScores[skill].score += answer * weight;
      skillScores[skill].maxScore += 4 * weight;
    });
  });

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
      if (s.maxScore > 0 && s.score / s.maxScore < 0.5) {
        skillGaps.push({ skill: skillName, score: s.score, maxScore: s.maxScore });
      }
    });

    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    return { career, score, maxScore, percentage, skillBreakdown, skillGaps };
  });

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
    careers.sort((a, b) => b.percentage - a.percentage);
    return { domain, totalScore, maxScore, percentage, careers };
  });

  domains.sort((a, b) => b.percentage - a.percentage);

  // Pick top 1-2 careers (top career + any within 10% of it)
  const allCareers = [...careerMatches].sort((a, b) => b.percentage - a.percentage);
  const topPercentage = allCareers[0].percentage;
  const topCareers = allCareers.filter((c) => c.percentage >= topPercentage - 10);

  return { domains, topDomain: domains[0].domain, topCareers };
}

// Stage 2 results
export interface SkillGapItem {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
}

export interface CareerSkillAssessment {
  careerTitle: string;
  skills: {
    skill: string;
    rating: number;
    requiredLevel: number;
    gap: number;
  }[];
  overallReadiness: number; // percentage
  gaps: SkillGapItem[];
}

export function calculateStage2Results(
  skillAnswers: Record<string, number>,
  careerTitles: string[]
): CareerSkillAssessment[] {
  return careerTitles.map((title) => {
    const questions = SKILL_QUESTIONS.filter((q) => q.careerTitle === title);
    const skills = questions.map((q) => {
      const rating = skillAnswers[q.id] ?? 0;
      const gap = Math.max(0, q.requiredLevel - rating);
      return { skill: q.skill, rating, requiredLevel: q.requiredLevel, gap };
    });

    const totalRating = skills.reduce((s, sk) => s + sk.rating, 0);
    const totalRequired = skills.reduce((s, sk) => s + sk.requiredLevel, 0);
    const overallReadiness = totalRequired > 0 ? Math.round((totalRating / totalRequired) * 100) : 0;

    const gaps = skills
      .filter((s) => s.gap > 0)
      .map((s) => ({ skill: s.skill, currentLevel: s.rating, requiredLevel: s.requiredLevel, gap: s.gap }));

    return { careerTitle: title, skills, overallReadiness, gaps };
  });
}
