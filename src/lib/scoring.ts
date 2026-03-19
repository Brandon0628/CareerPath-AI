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

// ===== STAGE 2: MCQ QUIZ QUESTIONS =====

export interface QuizOption {
  label: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  careerTitle: string;
  skill: string;
  text: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Software Developer
  {
    id: "sd-1", careerTitle: "Software Developer", skill: "JavaScript",
    text: "What is the output of: console.log(typeof null)?",
    options: [
      { label: '"null"', isCorrect: false },
      { label: '"object"', isCorrect: true },
      { label: '"undefined"', isCorrect: false },
      { label: '"boolean"', isCorrect: false },
    ],
  },
  {
    id: "sd-2", careerTitle: "Software Developer", skill: "JavaScript",
    text: "Which keyword declares a block-scoped variable in JavaScript?",
    options: [
      { label: "var", isCorrect: false },
      { label: "let", isCorrect: true },
      { label: "define", isCorrect: false },
      { label: "dim", isCorrect: false },
    ],
  },
  {
    id: "sd-3", careerTitle: "Software Developer", skill: "Data Structures",
    text: "Which data structure operates on a Last-In, First-Out (LIFO) principle?",
    options: [
      { label: "Queue", isCorrect: false },
      { label: "Stack", isCorrect: true },
      { label: "Linked List", isCorrect: false },
      { label: "Tree", isCorrect: false },
    ],
  },
  {
    id: "sd-4", careerTitle: "Software Developer", skill: "Data Structures",
    text: "What is the time complexity of searching in a balanced binary search tree?",
    options: [
      { label: "O(n)", isCorrect: false },
      { label: "O(log n)", isCorrect: true },
      { label: "O(1)", isCorrect: false },
      { label: "O(n²)", isCorrect: false },
    ],
  },
  {
    id: "sd-5", careerTitle: "Software Developer", skill: "Version Control",
    text: "Which Git command creates a new branch?",
    options: [
      { label: "git branch new-branch", isCorrect: true },
      { label: "git new new-branch", isCorrect: false },
      { label: "git create new-branch", isCorrect: false },
      { label: "git fork new-branch", isCorrect: false },
    ],
  },
  {
    id: "sd-6", careerTitle: "Software Developer", skill: "Debugging",
    text: "What does a '404' HTTP status code mean?",
    options: [
      { label: "Server Error", isCorrect: false },
      { label: "Unauthorized", isCorrect: false },
      { label: "Not Found", isCorrect: true },
      { label: "Bad Request", isCorrect: false },
    ],
  },

  // Data Analyst
  {
    id: "da-1", careerTitle: "Data Analyst", skill: "Spreadsheets",
    text: "In Excel, which function counts cells that meet a condition?",
    options: [
      { label: "COUNT", isCorrect: false },
      { label: "SUMIF", isCorrect: false },
      { label: "COUNTIF", isCorrect: true },
      { label: "COUNTA", isCorrect: false },
    ],
  },
  {
    id: "da-2", careerTitle: "Data Analyst", skill: "Spreadsheets",
    text: "What does a pivot table do?",
    options: [
      { label: "Formats cells automatically", isCorrect: false },
      { label: "Summarizes and groups data", isCorrect: true },
      { label: "Creates macros", isCorrect: false },
      { label: "Protects the worksheet", isCorrect: false },
    ],
  },
  {
    id: "da-3", careerTitle: "Data Analyst", skill: "SQL",
    text: "Which SQL clause filters rows after grouping?",
    options: [
      { label: "WHERE", isCorrect: false },
      { label: "HAVING", isCorrect: true },
      { label: "ORDER BY", isCorrect: false },
      { label: "GROUP BY", isCorrect: false },
    ],
  },
  {
    id: "da-4", careerTitle: "Data Analyst", skill: "SQL",
    text: "What does SELECT DISTINCT do?",
    options: [
      { label: "Selects the first row only", isCorrect: false },
      { label: "Removes duplicate rows from results", isCorrect: true },
      { label: "Orders results alphabetically", isCorrect: false },
      { label: "Joins two tables", isCorrect: false },
    ],
  },
  {
    id: "da-5", careerTitle: "Data Analyst", skill: "Statistics",
    text: "What is the median of: 3, 7, 9, 15, 21?",
    options: [
      { label: "7", isCorrect: false },
      { label: "9", isCorrect: true },
      { label: "11", isCorrect: false },
      { label: "15", isCorrect: false },
    ],
  },
  {
    id: "da-6", careerTitle: "Data Analyst", skill: "Data Visualization",
    text: "Which chart type is best for showing proportions of a whole?",
    options: [
      { label: "Line chart", isCorrect: false },
      { label: "Scatter plot", isCorrect: false },
      { label: "Pie chart", isCorrect: true },
      { label: "Histogram", isCorrect: false },
    ],
  },

  // Cybersecurity Analyst
  {
    id: "cs-1", careerTitle: "Cybersecurity Analyst", skill: "Network Protocols",
    text: "Which protocol provides secure, encrypted web browsing?",
    options: [
      { label: "HTTP", isCorrect: false },
      { label: "FTP", isCorrect: false },
      { label: "HTTPS", isCorrect: true },
      { label: "SMTP", isCorrect: false },
    ],
  },
  {
    id: "cs-2", careerTitle: "Cybersecurity Analyst", skill: "Network Protocols",
    text: "What does DNS stand for?",
    options: [
      { label: "Data Network System", isCorrect: false },
      { label: "Domain Name System", isCorrect: true },
      { label: "Digital Network Service", isCorrect: false },
      { label: "Dynamic Node Server", isCorrect: false },
    ],
  },
  {
    id: "cs-3", careerTitle: "Cybersecurity Analyst", skill: "Threat Analysis",
    text: "What type of attack tricks users into revealing sensitive information via fake emails?",
    options: [
      { label: "DDoS", isCorrect: false },
      { label: "Phishing", isCorrect: true },
      { label: "SQL Injection", isCorrect: false },
      { label: "Brute Force", isCorrect: false },
    ],
  },
  {
    id: "cs-4", careerTitle: "Cybersecurity Analyst", skill: "Threat Analysis",
    text: "What is ransomware?",
    options: [
      { label: "Software that speeds up your computer", isCorrect: false },
      { label: "A firewall tool", isCorrect: false },
      { label: "Malware that encrypts files and demands payment", isCorrect: true },
      { label: "An antivirus program", isCorrect: false },
    ],
  },
  {
    id: "cs-5", careerTitle: "Cybersecurity Analyst", skill: "Security Tools",
    text: "What is the primary purpose of a firewall?",
    options: [
      { label: "Speed up internet", isCorrect: false },
      { label: "Filter network traffic based on rules", isCorrect: true },
      { label: "Store passwords", isCorrect: false },
      { label: "Compress data", isCorrect: false },
    ],
  },
  {
    id: "cs-6", careerTitle: "Cybersecurity Analyst", skill: "Risk Assessment",
    text: "In risk management, what does 'vulnerability' mean?",
    options: [
      { label: "A type of malware", isCorrect: false },
      { label: "A weakness that can be exploited", isCorrect: true },
      { label: "An encrypted connection", isCorrect: false },
      { label: "A backup strategy", isCorrect: false },
    ],
  },

  // Accountant
  {
    id: "ac-1", careerTitle: "Accountant", skill: "Bookkeeping",
    text: "In double-entry bookkeeping, every transaction affects at least how many accounts?",
    options: [
      { label: "1", isCorrect: false },
      { label: "2", isCorrect: true },
      { label: "3", isCorrect: false },
      { label: "4", isCorrect: false },
    ],
  },
  {
    id: "ac-2", careerTitle: "Accountant", skill: "Bookkeeping",
    text: "Which journal entry records a cash sale?",
    options: [
      { label: "Debit Sales, Credit Cash", isCorrect: false },
      { label: "Debit Cash, Credit Sales", isCorrect: true },
      { label: "Debit Inventory, Credit Cash", isCorrect: false },
      { label: "Debit Sales, Credit Inventory", isCorrect: false },
    ],
  },
  {
    id: "ac-3", careerTitle: "Accountant", skill: "Financial Statements",
    text: "If expenses increase and revenue stays the same, net income will:",
    options: [
      { label: "Increase", isCorrect: false },
      { label: "Decrease", isCorrect: true },
      { label: "Stay the same", isCorrect: false },
      { label: "Double", isCorrect: false },
    ],
  },
  {
    id: "ac-4", careerTitle: "Accountant", skill: "Financial Statements",
    text: "Which financial statement shows a company's assets, liabilities, and equity?",
    options: [
      { label: "Income Statement", isCorrect: false },
      { label: "Cash Flow Statement", isCorrect: false },
      { label: "Balance Sheet", isCorrect: true },
      { label: "Trial Balance", isCorrect: false },
    ],
  },
  {
    id: "ac-5", careerTitle: "Accountant", skill: "Tax Knowledge",
    text: "What is a tax deduction?",
    options: [
      { label: "Money added to your tax bill", isCorrect: false },
      { label: "An expense that reduces taxable income", isCorrect: true },
      { label: "A government fine", isCorrect: false },
      { label: "A type of tax return", isCorrect: false },
    ],
  },
  {
    id: "ac-6", careerTitle: "Accountant", skill: "Accounting Software",
    text: "Which of the following is a popular accounting software?",
    options: [
      { label: "Photoshop", isCorrect: false },
      { label: "QuickBooks", isCorrect: true },
      { label: "AutoCAD", isCorrect: false },
      { label: "Blender", isCorrect: false },
    ],
  },
];

export function getQuizQuestionsForCareers(careerTitles: string[]): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter((q) => careerTitles.includes(q.careerTitle));
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
