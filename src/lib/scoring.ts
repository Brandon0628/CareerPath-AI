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

// ===== LEARNING RESOURCES =====

export interface LearningResource {
  title: string;
  type: "course" | "tutorial" | "tool" | "roadmap";
  url: string;
  description: string;
}

export interface CareerResources {
  careerTitle: string;
  resources: LearningResource[];
}

export const CAREER_RESOURCES: CareerResources[] = [
  {
    careerTitle: "Software Developer",
    resources: [
      { title: "freeCodeCamp", type: "course", url: "https://freecodecamp.org", description: "Full-stack web development curriculum" },
      { title: "The Odin Project", type: "course", url: "https://theodinproject.com", description: "Open-source full-stack curriculum" },
      { title: "LeetCode", type: "tool", url: "https://leetcode.com", description: "Practice coding interview problems" },
      { title: "JavaScript.info", type: "tutorial", url: "https://javascript.info", description: "Modern JavaScript tutorial" },
      { title: "roadmap.sh/frontend", type: "roadmap", url: "https://roadmap.sh/frontend", description: "Frontend developer roadmap" },
    ],
  },
  {
    careerTitle: "Data Analyst",
    resources: [
      { title: "Kaggle Learn", type: "course", url: "https://kaggle.com/learn", description: "Free data science micro-courses" },
      { title: "Mode SQL Tutorial", type: "tutorial", url: "https://mode.com/sql-tutorial", description: "Interactive SQL tutorial" },
      { title: "Google Data Analytics", type: "course", url: "https://grow.google/certificates/data-analytics", description: "Professional certificate program" },
      { title: "Excel Easy", type: "tutorial", url: "https://www.excel-easy.com", description: "Step-by-step Excel tutorials" },
      { title: "Statistics by Khan Academy", type: "course", url: "https://khanacademy.org/math/statistics-probability", description: "Statistics fundamentals" },
    ],
  },
  {
    careerTitle: "Cybersecurity Analyst",
    resources: [
      { title: "TryHackMe", type: "tool", url: "https://tryhackme.com", description: "Hands-on cybersecurity training" },
      { title: "Hack The Box", type: "tool", url: "https://hackthebox.com", description: "Penetration testing labs" },
      { title: "CompTIA Security+", type: "course", url: "https://comptia.org/certifications/security", description: "Entry-level security certification" },
      { title: "OWASP Top 10", type: "tutorial", url: "https://owasp.org/www-project-top-ten", description: "Web application security risks" },
      { title: "Cybrary", type: "course", url: "https://cybrary.it", description: "Free cybersecurity courses" },
    ],
  },
  {
    careerTitle: "Accountant",
    resources: [
      { title: "Khan Academy Accounting", type: "course", url: "https://khanacademy.org/economics-finance-domain", description: "Free accounting and finance courses" },
      { title: "AccountingCoach", type: "tutorial", url: "https://accountingcoach.com", description: "Free accounting tutorials & explanations" },
      { title: "QuickBooks Training", type: "tool", url: "https://quickbooks.intuit.com/tutorials", description: "Learn QuickBooks accounting software" },
      { title: "Coursera Financial Accounting", type: "course", url: "https://coursera.org/learn/wharton-accounting", description: "Wharton financial accounting course" },
      { title: "IRS Free File", type: "tool", url: "https://irs.gov/filing/free-file-do-your-federal-taxes-for-free", description: "Practice with real tax filing tools" },
    ],
  },
];

// ===== CAREER PROGRESSION PATHS =====

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  skills: string[];
  level: "entry" | "mid" | "senior" | "lead";
}

export interface CareerRoadmap {
  careerTitle: string;
  domain: "Tech" | "Accounting";
  nodes: RoadmapNode[];
}

export const CAREER_ROADMAPS: CareerRoadmap[] = [
  {
    careerTitle: "Software Developer",
    domain: "Tech",
    nodes: [
      { id: "sd-1", title: "Junior Developer", description: "Learn fundamentals, write basic code, fix bugs", skills: ["HTML/CSS", "JavaScript Basics", "Git"], level: "entry" },
      { id: "sd-2", title: "Mid-Level Developer", description: "Build features independently, design APIs, mentor juniors", skills: ["React/Vue/Angular", "REST APIs", "Testing", "SQL"], level: "mid" },
      { id: "sd-3", title: "Senior Developer", description: "Architect systems, lead code reviews, drive technical decisions", skills: ["System Design", "CI/CD", "Cloud (AWS/GCP)", "Performance Optimization"], level: "senior" },
      { id: "sd-4", title: "Tech Lead / Architect", description: "Define technical strategy, lead teams, own system reliability", skills: ["Architecture Patterns", "Team Leadership", "Stakeholder Communication", "DevOps"], level: "lead" },
    ],
  },
  {
    careerTitle: "Data Analyst",
    domain: "Tech",
    nodes: [
      { id: "da-r1", title: "Junior Analyst", description: "Clean data, create reports, learn SQL & Excel", skills: ["Excel", "SQL Basics", "Data Cleaning"], level: "entry" },
      { id: "da-r2", title: "Data Analyst", description: "Build dashboards, run analyses, present insights", skills: ["Tableau/Power BI", "Advanced SQL", "Statistics", "Python/R"], level: "mid" },
      { id: "da-r3", title: "Senior Analyst", description: "Design metrics frameworks, lead analytics projects", skills: ["A/B Testing", "Predictive Modeling", "Stakeholder Management"], level: "senior" },
      { id: "da-r4", title: "Analytics Manager / Data Scientist", description: "Lead analytics teams, build ML models, drive data strategy", skills: ["Machine Learning", "Team Leadership", "Data Strategy", "Big Data Tools"], level: "lead" },
    ],
  },
  {
    careerTitle: "Cybersecurity Analyst",
    domain: "Tech",
    nodes: [
      { id: "cs-r1", title: "SOC Analyst (Tier 1)", description: "Monitor alerts, triage incidents, document findings", skills: ["SIEM Tools", "Log Analysis", "Network Basics"], level: "entry" },
      { id: "cs-r2", title: "Security Analyst", description: "Investigate incidents, perform vulnerability assessments", skills: ["Pen Testing Basics", "Threat Intelligence", "Firewall Management"], level: "mid" },
      { id: "cs-r3", title: "Senior Security Engineer", description: "Design security architecture, lead incident response", skills: ["Cloud Security", "Incident Response", "Security Automation", "Compliance"], level: "senior" },
      { id: "cs-r4", title: "CISO / Security Architect", description: "Define org security strategy, manage risk at executive level", skills: ["Risk Management", "Policy & Governance", "Executive Communication", "Team Leadership"], level: "lead" },
    ],
  },
  {
    careerTitle: "Accountant",
    domain: "Accounting",
    nodes: [
      { id: "ac-r1", title: "Junior Accountant / Bookkeeper", description: "Record transactions, reconcile accounts, file reports", skills: ["Bookkeeping", "Excel", "Accounting Software"], level: "entry" },
      { id: "ac-r2", title: "Staff Accountant", description: "Prepare financial statements, assist with audits", skills: ["Financial Reporting", "Tax Preparation", "GAAP/IFRS Basics"], level: "mid" },
      { id: "ac-r3", title: "Senior Accountant / CPA", description: "Lead audits, manage complex tax situations, advise clients", skills: ["Advanced Tax", "Audit Management", "Financial Analysis", "CPA Certification"], level: "senior" },
      { id: "ac-r4", title: "Controller / CFO", description: "Oversee all financial operations, strategic financial planning", skills: ["Strategic Planning", "Team Leadership", "Regulatory Compliance", "Financial Strategy"], level: "lead" },
    ],
  },
];

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
  type?: "mcq" | "fill-blank";
  codeSnippet?: string;
  blankAnswer?: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Software Developer - MCQ
  {
    id: "sd-1", careerTitle: "Software Developer", skill: "JavaScript", type: "mcq",
    text: "What is the output of: console.log(typeof null)?",
    options: [
      { label: '"null"', isCorrect: false },
      { label: '"object"', isCorrect: true },
      { label: '"undefined"', isCorrect: false },
      { label: '"boolean"', isCorrect: false },
    ],
  },
  {
    id: "sd-2", careerTitle: "Software Developer", skill: "JavaScript", type: "mcq",
    text: "Which keyword declares a block-scoped variable in JavaScript?",
    options: [
      { label: "var", isCorrect: false },
      { label: "let", isCorrect: true },
      { label: "define", isCorrect: false },
      { label: "dim", isCorrect: false },
    ],
  },
  {
    id: "sd-3", careerTitle: "Software Developer", skill: "Data Structures", type: "mcq",
    text: "Which data structure operates on a Last-In, First-Out (LIFO) principle?",
    options: [
      { label: "Queue", isCorrect: false },
      { label: "Stack", isCorrect: true },
      { label: "Linked List", isCorrect: false },
      { label: "Tree", isCorrect: false },
    ],
  },
  {
    id: "sd-4", careerTitle: "Software Developer", skill: "Data Structures", type: "mcq",
    text: "What is the time complexity of searching in a balanced binary search tree?",
    options: [
      { label: "O(n)", isCorrect: false },
      { label: "O(log n)", isCorrect: true },
      { label: "O(1)", isCorrect: false },
      { label: "O(n²)", isCorrect: false },
    ],
  },
  // Software Developer - Fill in the Blank
  {
    id: "sd-5", careerTitle: "Software Developer", skill: "Coding", type: "fill-blank",
    text: "Complete the function that reverses a string:",
    codeSnippet: `function reverseString(str) {\n  return str.split('').______().join('');\n}`,
    blankAnswer: "reverse",
    options: [
      { label: "reverse", isCorrect: true },
      { label: "sort", isCorrect: false },
      { label: "flip", isCorrect: false },
      { label: "invert", isCorrect: false },
    ],
  },
  {
    id: "sd-6", careerTitle: "Software Developer", skill: "Coding", type: "fill-blank",
    text: "Complete the loop that sums all elements in an array:",
    codeSnippet: `let total = 0;\nfor (let i = 0; i < arr.______; i++) {\n  total += arr[i];\n}`,
    blankAnswer: "length",
    options: [
      { label: "length", isCorrect: true },
      { label: "size", isCorrect: false },
      { label: "count", isCorrect: false },
      { label: "max", isCorrect: false },
    ],
  },
  {
    id: "sd-7", careerTitle: "Software Developer", skill: "Debugging", type: "mcq",
    text: "What does a '404' HTTP status code mean?",
    options: [
      { label: "Server Error", isCorrect: false },
      { label: "Unauthorized", isCorrect: false },
      { label: "Not Found", isCorrect: true },
      { label: "Bad Request", isCorrect: false },
    ],
  },
  {
    id: "sd-8", careerTitle: "Software Developer", skill: "Version Control", type: "mcq",
    text: "Which Git command creates a new branch?",
    options: [
      { label: "git branch new-branch", isCorrect: true },
      { label: "git new new-branch", isCorrect: false },
      { label: "git create new-branch", isCorrect: false },
      { label: "git fork new-branch", isCorrect: false },
    ],
  },

  // Data Analyst
  {
    id: "da-1", careerTitle: "Data Analyst", skill: "Spreadsheets", type: "mcq",
    text: "In Excel, which function counts cells that meet a condition?",
    options: [
      { label: "COUNT", isCorrect: false },
      { label: "SUMIF", isCorrect: false },
      { label: "COUNTIF", isCorrect: true },
      { label: "COUNTA", isCorrect: false },
    ],
  },
  {
    id: "da-2", careerTitle: "Data Analyst", skill: "Spreadsheets", type: "mcq",
    text: "What does a pivot table do?",
    options: [
      { label: "Formats cells automatically", isCorrect: false },
      { label: "Summarizes and groups data", isCorrect: true },
      { label: "Creates macros", isCorrect: false },
      { label: "Protects the worksheet", isCorrect: false },
    ],
  },
  {
    id: "da-3", careerTitle: "Data Analyst", skill: "SQL", type: "mcq",
    text: "Which SQL clause filters rows after grouping?",
    options: [
      { label: "WHERE", isCorrect: false },
      { label: "HAVING", isCorrect: true },
      { label: "ORDER BY", isCorrect: false },
      { label: "GROUP BY", isCorrect: false },
    ],
  },
  {
    id: "da-4", careerTitle: "Data Analyst", skill: "SQL", type: "fill-blank",
    text: "Complete the SQL query to get unique department names:",
    codeSnippet: `SELECT ______ department\nFROM employees;`,
    blankAnswer: "DISTINCT",
    options: [
      { label: "DISTINCT", isCorrect: true },
      { label: "UNIQUE", isCorrect: false },
      { label: "DIFFERENT", isCorrect: false },
      { label: "SINGLE", isCorrect: false },
    ],
  },
  {
    id: "da-5", careerTitle: "Data Analyst", skill: "Statistics", type: "mcq",
    text: "What is the median of: 3, 7, 9, 15, 21?",
    options: [
      { label: "7", isCorrect: false },
      { label: "9", isCorrect: true },
      { label: "11", isCorrect: false },
      { label: "15", isCorrect: false },
    ],
  },
  {
    id: "da-6", careerTitle: "Data Analyst", skill: "Data Visualization", type: "mcq",
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
    id: "cs-1", careerTitle: "Cybersecurity Analyst", skill: "Network Protocols", type: "mcq",
    text: "Which protocol provides secure, encrypted web browsing?",
    options: [
      { label: "HTTP", isCorrect: false },
      { label: "FTP", isCorrect: false },
      { label: "HTTPS", isCorrect: true },
      { label: "SMTP", isCorrect: false },
    ],
  },
  {
    id: "cs-2", careerTitle: "Cybersecurity Analyst", skill: "Network Protocols", type: "mcq",
    text: "What does DNS stand for?",
    options: [
      { label: "Data Network System", isCorrect: false },
      { label: "Domain Name System", isCorrect: true },
      { label: "Digital Network Service", isCorrect: false },
      { label: "Dynamic Node Server", isCorrect: false },
    ],
  },
  {
    id: "cs-3", careerTitle: "Cybersecurity Analyst", skill: "Threat Analysis", type: "mcq",
    text: "What type of attack tricks users into revealing sensitive information via fake emails?",
    options: [
      { label: "DDoS", isCorrect: false },
      { label: "Phishing", isCorrect: true },
      { label: "SQL Injection", isCorrect: false },
      { label: "Brute Force", isCorrect: false },
    ],
  },
  {
    id: "cs-4", careerTitle: "Cybersecurity Analyst", skill: "Threat Analysis", type: "mcq",
    text: "What is ransomware?",
    options: [
      { label: "Software that speeds up your computer", isCorrect: false },
      { label: "A firewall tool", isCorrect: false },
      { label: "Malware that encrypts files and demands payment", isCorrect: true },
      { label: "An antivirus program", isCorrect: false },
    ],
  },
  {
    id: "cs-5", careerTitle: "Cybersecurity Analyst", skill: "Security Tools", type: "mcq",
    text: "What is the primary purpose of a firewall?",
    options: [
      { label: "Speed up internet", isCorrect: false },
      { label: "Filter network traffic based on rules", isCorrect: true },
      { label: "Store passwords", isCorrect: false },
      { label: "Compress data", isCorrect: false },
    ],
  },
  {
    id: "cs-6", careerTitle: "Cybersecurity Analyst", skill: "Risk Assessment", type: "mcq",
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
    id: "ac-1", careerTitle: "Accountant", skill: "Bookkeeping", type: "mcq",
    text: "In double-entry bookkeeping, every transaction affects at least how many accounts?",
    options: [
      { label: "1", isCorrect: false },
      { label: "2", isCorrect: true },
      { label: "3", isCorrect: false },
      { label: "4", isCorrect: false },
    ],
  },
  {
    id: "ac-2", careerTitle: "Accountant", skill: "Bookkeeping", type: "mcq",
    text: "Which journal entry records a cash sale?",
    options: [
      { label: "Debit Sales, Credit Cash", isCorrect: false },
      { label: "Debit Cash, Credit Sales", isCorrect: true },
      { label: "Debit Inventory, Credit Cash", isCorrect: false },
      { label: "Debit Sales, Credit Inventory", isCorrect: false },
    ],
  },
  {
    id: "ac-3", careerTitle: "Accountant", skill: "Financial Statements", type: "mcq",
    text: "If expenses increase and revenue stays the same, net income will:",
    options: [
      { label: "Increase", isCorrect: false },
      { label: "Decrease", isCorrect: true },
      { label: "Stay the same", isCorrect: false },
      { label: "Double", isCorrect: false },
    ],
  },
  {
    id: "ac-4", careerTitle: "Accountant", skill: "Financial Statements", type: "mcq",
    text: "Which financial statement shows a company's assets, liabilities, and equity?",
    options: [
      { label: "Income Statement", isCorrect: false },
      { label: "Cash Flow Statement", isCorrect: false },
      { label: "Balance Sheet", isCorrect: true },
      { label: "Trial Balance", isCorrect: false },
    ],
  },
  {
    id: "ac-5", careerTitle: "Accountant", skill: "Tax Knowledge", type: "mcq",
    text: "What is a tax deduction?",
    options: [
      { label: "Money added to your tax bill", isCorrect: false },
      { label: "An expense that reduces taxable income", isCorrect: true },
      { label: "A government fine", isCorrect: false },
      { label: "A type of tax return", isCorrect: false },
    ],
  },
  {
    id: "ac-6", careerTitle: "Accountant", skill: "Accounting Software", type: "fill-blank",
    text: "Complete the Excel formula to sum cells A1 through A10:",
    codeSnippet: `=______(A1:A10)`,
    blankAnswer: "SUM",
    options: [
      { label: "SUM", isCorrect: true },
      { label: "ADD", isCorrect: false },
      { label: "TOTAL", isCorrect: false },
      { label: "PLUS", isCorrect: false },
    ],
  },
];

export function getQuizQuestionsForCareers(careerTitles: string[]): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter((q) => careerTitles.includes(q.careerTitle));
}

export function getQuizQuestionsForDomain(domain: "Tech" | "Accounting"): QuizQuestion[] {
  const domainCareers = CAREERS.filter((c) => c.domain === domain).map((c) => c.title);
  return QUIZ_QUESTIONS.filter((q) => domainCareers.includes(q.careerTitle));
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

export function calculateStage1Results(answers: Record<number, number>): {
  domains: DomainScore[];
  topDomain: string;
  topCareers: CareerMatch[];
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

  const allCareers = [...careerMatches].sort((a, b) => b.percentage - a.percentage);
  const topPercentage = allCareers[0].percentage;
  const topCareers = allCareers.filter((c) => c.percentage >= topPercentage - 10);

  return { domains, topDomain: domains[0].domain, topCareers };
}

// Stage 2 results

export interface SkillResult {
  skill: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface CareerQuizResult {
  careerTitle: string;
  skillResults: SkillResult[];
  overallScore: number;
  weakSkills: SkillResult[];
}

export function calculateStage2Results(
  quizAnswers: Record<string, string>,
  careerTitles: string[]
): CareerQuizResult[] {
  return careerTitles.map((title) => {
    const questions = QUIZ_QUESTIONS.filter((q) => q.careerTitle === title);

    const skillMap: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q) => {
      if (!skillMap[q.skill]) skillMap[q.skill] = { correct: 0, total: 0 };
      skillMap[q.skill].total++;
      const selected = quizAnswers[q.id];
      const correctOption = q.options.find((o) => o.isCorrect);
      if (selected && correctOption && selected === correctOption.label) {
        skillMap[q.skill].correct++;
      }
    });

    const skillResults: SkillResult[] = Object.entries(skillMap).map(([skill, data]) => ({
      skill,
      correct: data.correct,
      total: data.total,
      percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
    }));

    const totalCorrect = skillResults.reduce((s, r) => s + r.correct, 0);
    const totalQ = skillResults.reduce((s, r) => s + r.total, 0);
    const overallScore = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;

    const weakSkills = skillResults.filter((r) => r.percentage < 100);

    return { careerTitle: title, skillResults, overallScore, weakSkills };
  });
}

export function calculateDomainQuizResults(
  quizAnswers: Record<string, string>,
  domain: "Tech" | "Accounting"
): CareerQuizResult[] {
  const domainCareers = CAREERS.filter((c) => c.domain === domain).map((c) => c.title);
  return calculateStage2Results(quizAnswers, domainCareers);
}
