// ===== CAREER DATASET =====

export interface Career {
  title: string;
  domain: "Tech" | "Accounting" | "Healthcare" | "Creative" | "Business";
  skills: string[];
}

export const CAREERS: Career[] = [
  { title: "Software Developer", domain: "Tech", skills: ["Coding", "Problem-solving", "Debugging"] },
  { title: "Data Analyst", domain: "Tech", skills: ["Excel", "SQL", "Problem-solving"] },
  { title: "Cybersecurity Analyst", domain: "Tech", skills: ["Networking", "Risk Analysis", "Problem-solving"] },
  { title: "Accountant", domain: "Accounting", skills: ["Numbers", "Analytical Thinking", "Attention to Detail"] },
  // Healthcare
  { title: "Nurse", domain: "Healthcare", skills: ["Patient Care", "Medical Knowledge", "Critical Thinking", "Communication"] },
  { title: "Medical Lab Technologist", domain: "Healthcare", skills: ["Lab Techniques", "Analytical Thinking", "Attention to Detail", "Biology"] },
  { title: "Psychologist", domain: "Healthcare", skills: ["Empathy", "Communication", "Research", "Critical Thinking"] },
  // Creative
  { title: "UI/UX Designer", domain: "Creative", skills: ["Design Thinking", "Figma", "User Research", "Prototyping"] },
  { title: "Graphic Designer", domain: "Creative", skills: ["Visual Design", "Typography", "Color Theory", "Adobe Tools"] },
  { title: "Content Creator", domain: "Creative", skills: ["Writing", "Social Media", "Storytelling", "SEO"] },
  // Business
  { title: "Digital Marketer", domain: "Business", skills: ["SEO", "Social Media", "Analytics", "Copywriting"] },
  { title: "Business Analyst", domain: "Business", skills: ["Data Analysis", "Problem-solving", "Communication", "Excel"] },
  { title: "Entrepreneur", domain: "Business", skills: ["Leadership", "Risk-taking", "Financial Literacy", "Communication"] },
];

export const ALL_SKILLS = [
  "Coding", "Problem-solving", "Debugging", "Excel", "SQL",
  "Networking", "Risk Analysis", "Numbers", "Analytical Thinking", "Attention to Detail",
  "Patient Care", "Medical Knowledge", "Critical Thinking", "Communication",
  "Lab Techniques", "Biology", "Empathy", "Research",
  "Design Thinking", "Figma", "User Research", "Prototyping",
  "Visual Design", "Typography", "Color Theory", "Adobe Tools",
  "Writing", "Social Media", "Storytelling", "SEO",
  "Analytics", "Copywriting", "Data Analysis", "Leadership",
  "Risk-taking", "Financial Literacy",
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
  {
    careerTitle: "Nurse",
    resources: [
      { title: "Khan Academy Health & Medicine", type: "course", url: "https://khanacademy.org/science/health-and-medicine", description: "Free health and medicine courses" },
      { title: "Coursera Patient Safety", type: "course", url: "https://coursera.org/learn/patient-safety", description: "Patient safety and quality improvement" },
      { title: "Nurse.org Resources", type: "tutorial", url: "https://nurse.org/resources", description: "Nursing career guides and study materials" },
      { title: "Medscape Nursing", type: "tool", url: "https://medscape.com/nurses", description: "Clinical reference and drug information" },
    ],
  },
  {
    careerTitle: "Medical Lab Technologist",
    resources: [
      { title: "Coursera Clinical Lab Science", type: "course", url: "https://coursera.org/search?query=clinical+laboratory", description: "Lab science fundamentals" },
      { title: "Lab Tests Online", type: "tutorial", url: "https://labtestsonline.org", description: "Understanding lab tests and procedures" },
      { title: "Khan Academy Biology", type: "course", url: "https://khanacademy.org/science/biology", description: "Biology fundamentals" },
    ],
  },
  {
    careerTitle: "Psychologist",
    resources: [
      { title: "Coursera Psychology", type: "course", url: "https://coursera.org/browse/social-sciences/psychology", description: "Psychology courses from top universities" },
      { title: "Khan Academy Psychology", type: "course", url: "https://khanacademy.org/test-prep/mcat/society-and-culture", description: "Psychology and sociology fundamentals" },
      { title: "Simply Psychology", type: "tutorial", url: "https://simplypsychology.org", description: "Psychology study guides and explanations" },
      { title: "APA Resources", type: "tutorial", url: "https://apa.org/education-career", description: "American Psychological Association career resources" },
    ],
  },
  {
    careerTitle: "UI/UX Designer",
    resources: [
      { title: "Google UX Design Certificate", type: "course", url: "https://grow.google/certificates/ux-design", description: "Professional UX design certificate" },
      { title: "Figma Learn", type: "tutorial", url: "https://figma.com/resources/learn-design", description: "Official Figma tutorials" },
      { title: "Interaction Design Foundation", type: "course", url: "https://interaction-design.org", description: "UX design courses and literature" },
      { title: "Laws of UX", type: "tutorial", url: "https://lawsofux.com", description: "Key UX principles every designer should know" },
    ],
  },
  {
    careerTitle: "Graphic Designer",
    resources: [
      { title: "Canva Design School", type: "course", url: "https://canva.com/learn/design", description: "Free graphic design tutorials" },
      { title: "Coursera Graphic Design", type: "course", url: "https://coursera.org/specializations/graphic-design", description: "CalArts graphic design specialization" },
      { title: "Adobe Learn", type: "tutorial", url: "https://helpx.adobe.com/creative-cloud/tutorials-explore.html", description: "Official Adobe tool tutorials" },
      { title: "Typewolf", type: "tutorial", url: "https://typewolf.com", description: "Typography inspiration and resources" },
    ],
  },
  {
    careerTitle: "Content Creator",
    resources: [
      { title: "HubSpot Content Marketing", type: "course", url: "https://academy.hubspot.com/courses/content-marketing", description: "Free content marketing certification" },
      { title: "Google Digital Garage", type: "course", url: "https://learndigital.withgoogle.com/digitalgarage", description: "Free digital marketing courses" },
      { title: "Canva for Social Media", type: "tool", url: "https://canva.com/learn/social-media", description: "Social media design templates and guides" },
    ],
  },
  {
    careerTitle: "Digital Marketer",
    resources: [
      { title: "HubSpot Academy", type: "course", url: "https://academy.hubspot.com", description: "Free inbound marketing and SEO certifications" },
      { title: "Google Analytics Academy", type: "course", url: "https://analytics.google.com/analytics/academy", description: "Learn Google Analytics for free" },
      { title: "Moz SEO Learning Center", type: "tutorial", url: "https://moz.com/learn/seo", description: "Beginner to advanced SEO guides" },
      { title: "Meta Blueprint", type: "course", url: "https://facebook.com/business/learn", description: "Social media advertising training" },
    ],
  },
  {
    careerTitle: "Business Analyst",
    resources: [
      { title: "Coursera Business Analytics", type: "course", url: "https://coursera.org/specializations/business-analytics", description: "Business analytics specialization" },
      { title: "Khan Academy Economics", type: "course", url: "https://khanacademy.org/economics-finance-domain", description: "Economics and business fundamentals" },
      { title: "Excel Easy", type: "tutorial", url: "https://www.excel-easy.com", description: "Step-by-step Excel tutorials" },
      { title: "Kaggle Learn", type: "course", url: "https://kaggle.com/learn", description: "Free data analysis micro-courses" },
    ],
  },
  {
    careerTitle: "Entrepreneur",
    resources: [
      { title: "Coursera Entrepreneurship", type: "course", url: "https://coursera.org/specializations/wharton-entrepreneurship", description: "Wharton entrepreneurship specialization" },
      { title: "Khan Academy Finance", type: "course", url: "https://khanacademy.org/economics-finance-domain/core-finance", description: "Core finance and capital markets" },
      { title: "Y Combinator Startup School", type: "course", url: "https://startupschool.org", description: "Free startup curriculum from YC" },
      { title: "HubSpot Sales Training", type: "course", url: "https://academy.hubspot.com/courses/inbound-sales", description: "Free inbound sales certification" },
    ],
  },
];

export const MALAYSIA_CONTEXT: Record<string, {
  salaryRange: string;
  jobOutlook: string;
  topUniversities: string[];
  localPlatforms: string[];
}> = {
  "Software Developer": {
    salaryRange: "RM 3,500 – RM 10,000/month",
    jobOutlook: "High demand across fintech, e-commerce and government digital initiatives in Malaysia.",
    topUniversities: ["UTM", "UPM", "Asia Pacific University (APU)"],
    localPlatforms: ["JobStreet", "LinkedIn", "Hiredly"]
  },
  "Data Analyst": {
    salaryRange: "RM 3,000 – RM 8,000/month",
    jobOutlook: "Rapidly growing demand as Malaysian companies adopt data-driven decisions.",
    topUniversities: ["UM", "UPM", "Sunway University"],
    localPlatforms: ["JobStreet", "LinkedIn", "Glints"]
  },
  "Cybersecurity Analyst": {
    salaryRange: "RM 4,000 – RM 12,000/month",
    jobOutlook: "Critical shortage of cybersecurity talent in Malaysia — very high job security.",
    topUniversities: ["UTM", "MMU", "UiTM"],
    localPlatforms: ["JobStreet", "LinkedIn", "CyberSecurity Malaysia Jobs"]
  },
  "Accountant": {
    salaryRange: "RM 2,800 – RM 7,500/month",
    jobOutlook: "Stable demand across all industries; ACCA and ICAEW qualifications highly valued.",
    topUniversities: ["UTAR", "UiTM", "Taylor's University"],
    localPlatforms: ["JobStreet", "MauKerja", "LinkedIn"]
  },
  "Nurse": {
    salaryRange: "RM 2,200 – RM 5,500/month",
    jobOutlook: "Consistent demand in public hospitals (KKM) and growing private healthcare sector.",
    topUniversities: ["UKM", "UM", "International Medical University (IMU)"],
    localPlatforms: ["JobStreet", "KKM Careers Portal", "LinkedIn"]
  },
  "Medical Lab Technologist": {
    salaryRange: "RM 2,500 – RM 6,000/month",
    jobOutlook: "Steady demand in government labs, private hospitals and diagnostic centres.",
    topUniversities: ["UPM", "UKM", "MAHSA University"],
    localPlatforms: ["JobStreet", "KKM Careers Portal", "MauKerja"]
  },
  "Psychologist": {
    salaryRange: "RM 3,000 – RM 9,000/month",
    jobOutlook: "Growing awareness of mental health in Malaysia is driving demand for psychologists.",
    topUniversities: ["UM", "UKM", "HELP University"],
    localPlatforms: ["JobStreet", "LinkedIn", "Glints"]
  },
  "UI/UX Designer": {
    salaryRange: "RM 3,000 – RM 9,000/month",
    jobOutlook: "Strong demand from Malaysian tech startups and digital agencies.",
    topUniversities: ["LimKokWing University", "APU", "Sunway University"],
    localPlatforms: ["Hiredly", "LinkedIn", "Glints"]
  },
  "Graphic Designer": {
    salaryRange: "RM 2,200 – RM 6,000/month",
    jobOutlook: "Consistent demand in advertising, media and in-house creative teams.",
    topUniversities: ["LimKokWing University", "The One Academy", "NAFA"],
    localPlatforms: ["JobStreet", "Hiredly", "Freelancer.com"]
  },
  "Content Creator": {
    salaryRange: "RM 2,000 – RM 8,000/month",
    jobOutlook: "Booming in Malaysia with growth of social commerce and brand content budgets.",
    topUniversities: ["UiTM", "HELP University", "Sunway University"],
    localPlatforms: ["LinkedIn", "Hiredly", "Glints"]
  },
  "Digital Marketer": {
    salaryRange: "RM 2,800 – RM 8,000/month",
    jobOutlook: "Every Malaysian business going online needs digital marketers — demand is high.",
    topUniversities: ["Sunway University", "Taylor's University", "UiTM"],
    localPlatforms: ["JobStreet", "Hiredly", "LinkedIn"]
  },
  "Business Analyst": {
    salaryRange: "RM 4,000 – RM 10,000/month",
    jobOutlook: "High demand in banking, telco and consulting sectors in Malaysia.",
    topUniversities: ["UM", "UPM", "Monash University Malaysia"],
    localPlatforms: ["JobStreet", "LinkedIn", "Glints"]
  },
  "Entrepreneur": {
    salaryRange: "Variable — RM 0 to unlimited",
    jobOutlook: "Malaysia's startup ecosystem is growing fast with support from Cradle, MaGIC and MDEC.",
    topUniversities: ["UTM", "UM", "Monash University Malaysia"],
    localPlatforms: ["MaGIC", "Cradle Fund", "MDEC"]
  }
};

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
  domain: "Tech" | "Accounting" | "Healthcare" | "Creative" | "Business";
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
  // Healthcare
  {
    careerTitle: "Nurse",
    domain: "Healthcare",
    nodes: [
      { id: "nu-r1", title: "Student Nurse", description: "Complete nursing program, clinical rotations", skills: ["Basic Patient Care", "Anatomy", "Clinical Skills"], level: "entry" },
      { id: "nu-r2", title: "Registered Nurse", description: "Provide direct patient care, administer medications", skills: ["Patient Assessment", "Medication Administration", "Care Planning"], level: "mid" },
      { id: "nu-r3", title: "Specialist / Charge Nurse", description: "Specialize in area (ICU, ER, Pediatrics), lead shifts", skills: ["Advanced Clinical Skills", "Team Coordination", "Specialization"], level: "senior" },
      { id: "nu-r4", title: "Nurse Practitioner / Director", description: "Prescribe treatments, lead nursing departments", skills: ["Advanced Practice", "Leadership", "Policy & Research"], level: "lead" },
    ],
  },
  {
    careerTitle: "Medical Lab Technologist",
    domain: "Healthcare",
    nodes: [
      { id: "ml-r1", title: "Lab Assistant", description: "Prepare samples, maintain equipment, basic tests", skills: ["Sample Handling", "Lab Safety", "Basic Biology"], level: "entry" },
      { id: "ml-r2", title: "Medical Lab Technologist", description: "Run diagnostic tests, analyze results, quality control", skills: ["Diagnostic Testing", "QC Procedures", "Hematology/Chemistry"], level: "mid" },
      { id: "ml-r3", title: "Senior Lab Technologist", description: "Lead specialized testing, train staff, validate methods", skills: ["Method Validation", "Specialization", "Mentoring"], level: "senior" },
      { id: "ml-r4", title: "Lab Manager / Director", description: "Manage lab operations, accreditation, budgets", skills: ["Lab Management", "Regulatory Compliance", "Strategic Planning"], level: "lead" },
    ],
  },
  {
    careerTitle: "Psychologist",
    domain: "Healthcare",
    nodes: [
      { id: "ps-r1", title: "Psychology Student / Intern", description: "Complete coursework, assist in research, supervised practice", skills: ["Research Methods", "Counseling Basics", "Ethics"], level: "entry" },
      { id: "ps-r2", title: "Licensed Psychologist", description: "Conduct therapy, psychological assessments, diagnose", skills: ["Therapeutic Techniques", "Psychological Testing", "Case Management"], level: "mid" },
      { id: "ps-r3", title: "Senior Psychologist / Specialist", description: "Specialize (clinical, forensic, neuro), publish research", skills: ["Specialization", "Research Publication", "Supervision"], level: "senior" },
      { id: "ps-r4", title: "Department Head / Private Practice Owner", description: "Lead practice or department, shape policy", skills: ["Practice Management", "Leadership", "Program Development"], level: "lead" },
    ],
  },
  // Creative
  {
    careerTitle: "UI/UX Designer",
    domain: "Creative",
    nodes: [
      { id: "ux-r1", title: "Junior UI/UX Designer", description: "Create wireframes, assist with user research", skills: ["Figma Basics", "Wireframing", "User Flows"], level: "entry" },
      { id: "ux-r2", title: "UI/UX Designer", description: "Design full interfaces, conduct usability testing", skills: ["Prototyping", "Usability Testing", "Design Systems"], level: "mid" },
      { id: "ux-r3", title: "Senior UX Designer", description: "Lead design strategy, mentor juniors, stakeholder presentations", skills: ["Design Strategy", "User Research", "Accessibility"], level: "senior" },
      { id: "ux-r4", title: "Design Lead / Head of Design", description: "Define product design vision, build design teams", skills: ["Design Leadership", "Cross-functional Collaboration", "Design Ops"], level: "lead" },
    ],
  },
  {
    careerTitle: "Graphic Designer",
    domain: "Creative",
    nodes: [
      { id: "gd-r1", title: "Junior Graphic Designer", description: "Create basic layouts, assist with brand materials", skills: ["Adobe Illustrator", "Layout Design", "Color Theory"], level: "entry" },
      { id: "gd-r2", title: "Graphic Designer", description: "Design campaigns, branding, marketing collateral", skills: ["Brand Identity", "Print & Digital Design", "Typography"], level: "mid" },
      { id: "gd-r3", title: "Senior Graphic Designer", description: "Lead creative projects, develop brand guidelines", skills: ["Art Direction", "Brand Strategy", "Motion Graphics"], level: "senior" },
      { id: "gd-r4", title: "Creative Director", description: "Oversee all visual output, lead creative teams", skills: ["Creative Leadership", "Campaign Strategy", "Team Management"], level: "lead" },
    ],
  },
  {
    careerTitle: "Content Creator",
    domain: "Creative",
    nodes: [
      { id: "cc-r1", title: "Junior Content Creator", description: "Write blog posts, manage social accounts, basic SEO", skills: ["Copywriting", "Social Media Basics", "Content Planning"], level: "entry" },
      { id: "cc-r2", title: "Content Creator", description: "Produce multi-platform content, grow audiences", skills: ["Video Production", "Audience Growth", "Brand Partnerships"], level: "mid" },
      { id: "cc-r3", title: "Senior Content Strategist", description: "Define content strategy, lead editorial calendar", skills: ["Content Strategy", "Analytics", "SEO Optimization"], level: "senior" },
      { id: "cc-r4", title: "Head of Content / Media Director", description: "Oversee content teams, drive media strategy", skills: ["Media Strategy", "Team Leadership", "Revenue Models"], level: "lead" },
    ],
  },
  // Business
  {
    careerTitle: "Digital Marketer",
    domain: "Business",
    nodes: [
      { id: "dm-r1", title: "Marketing Intern / Assistant", description: "Assist campaigns, learn tools, create basic content", skills: ["Social Media Management", "Basic SEO", "Email Marketing"], level: "entry" },
      { id: "dm-r2", title: "Digital Marketer", description: "Run campaigns, analyze metrics, manage ad budgets", skills: ["Google Ads", "Analytics", "A/B Testing"], level: "mid" },
      { id: "dm-r3", title: "Senior Digital Marketer", description: "Develop marketing strategy, lead cross-channel campaigns", skills: ["Marketing Strategy", "CRO", "Attribution Modeling"], level: "senior" },
      { id: "dm-r4", title: "Marketing Director / CMO", description: "Define brand strategy, lead marketing department", skills: ["Brand Strategy", "Leadership", "Budget Management"], level: "lead" },
    ],
  },
  {
    careerTitle: "Business Analyst",
    domain: "Business",
    nodes: [
      { id: "ba-r1", title: "Junior Business Analyst", description: "Gather requirements, document processes, learn tools", skills: ["Requirements Gathering", "Excel", "Process Mapping"], level: "entry" },
      { id: "ba-r2", title: "Business Analyst", description: "Analyze workflows, recommend improvements, stakeholder communication", skills: ["Data Analysis", "SQL", "Stakeholder Management"], level: "mid" },
      { id: "ba-r3", title: "Senior Business Analyst", description: "Lead analysis projects, define metrics, mentor team", skills: ["Strategic Analysis", "KPI Frameworks", "Change Management"], level: "senior" },
      { id: "ba-r4", title: "Director of Business Analysis", description: "Shape org strategy, lead analytics teams", skills: ["Enterprise Strategy", "Leadership", "Digital Transformation"], level: "lead" },
    ],
  },
  {
    careerTitle: "Entrepreneur",
    domain: "Business",
    nodes: [
      { id: "en-r1", title: "Aspiring Entrepreneur", description: "Learn fundamentals, validate ideas, build MVP", skills: ["Lean Startup", "Market Research", "Basic Finance"], level: "entry" },
      { id: "en-r2", title: "Startup Founder", description: "Launch business, acquire customers, manage operations", skills: ["Sales", "Product Management", "Fundraising"], level: "mid" },
      { id: "en-r3", title: "Scaling Founder", description: "Grow team, optimize operations, expand markets", skills: ["Team Building", "Growth Strategy", "Financial Management"], level: "senior" },
      { id: "en-r4", title: "Serial Entrepreneur / CEO", description: "Lead multiple ventures, invest, mentor others", skills: ["Vision & Strategy", "Board Management", "M&A"], level: "lead" },
    ],
  },
];

// ===== STAGE 1: MBTI-STYLE QUESTIONS =====

export interface Question {
  id: number;
  text: string;
  dimension: "EI" | "SN" | "TF" | "JP";
  pole: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
  skillMap: { skill: SkillName; weight: number }[];
}

export const QUESTIONS: Question[] = [
  // ── E/I: EXTRAVERSION vs INTROVERSION ──
  { id:1, text:"I feel energized after spending time with a large group of people.", dimension:"EI", pole:"E", skillMap:[{skill:"Communication",weight:2},{skill:"Leadership",weight:1}] },
  { id:2, text:"I enjoy presenting my ideas to an audience.", dimension:"EI", pole:"E", skillMap:[{skill:"Communication",weight:2},{skill:"Leadership",weight:2}] },
  { id:3, text:"I prefer group projects over working alone.", dimension:"EI", pole:"E", skillMap:[{skill:"Communication",weight:2},{skill:"Leadership",weight:1}] },
  { id:4, text:"I find it easy to start conversations with people I don't know.", dimension:"EI", pole:"E", skillMap:[{skill:"Communication",weight:3}] },
  { id:5, text:"I like taking the lead in group discussions or activities.", dimension:"EI", pole:"E", skillMap:[{skill:"Leadership",weight:3},{skill:"Communication",weight:1}] },
  { id:6, text:"I prefer working alone where I can fully concentrate.", dimension:"EI", pole:"I", skillMap:[{skill:"Coding",weight:2},{skill:"Research",weight:2}] },
  { id:7, text:"I need quiet, uninterrupted time to do my best thinking.", dimension:"EI", pole:"I", skillMap:[{skill:"Analytical Thinking",weight:2},{skill:"Research",weight:1}] },
  { id:8, text:"I feel drained after long periods of socializing.", dimension:"EI", pole:"I", skillMap:[{skill:"Attention to Detail",weight:2},{skill:"Research",weight:1}] },
  { id:9, text:"I prefer to think things through carefully before speaking.", dimension:"EI", pole:"I", skillMap:[{skill:"Analytical Thinking",weight:2},{skill:"Risk Analysis",weight:1}] },
  { id:10, text:"I prefer one-on-one conversations over large group discussions.", dimension:"EI", pole:"I", skillMap:[{skill:"Empathy",weight:2},{skill:"Communication",weight:1}] },

  // ── S/N: SENSING vs INTUITION ──
  { id:11, text:"I prefer dealing with concrete facts and real-world details.", dimension:"SN", pole:"S", skillMap:[{skill:"Attention to Detail",weight:3},{skill:"Excel",weight:1}] },
  { id:12, text:"I like following established methods and proven procedures.", dimension:"SN", pole:"S", skillMap:[{skill:"Attention to Detail",weight:2},{skill:"Lab Techniques",weight:2}] },
  { id:13, text:"I enjoy hands-on, practical tasks more than abstract theories.", dimension:"SN", pole:"S", skillMap:[{skill:"Patient Care",weight:2},{skill:"Lab Techniques",weight:2}] },
  { id:14, text:"I trust direct experience and observation over gut instinct.", dimension:"SN", pole:"S", skillMap:[{skill:"Excel",weight:2},{skill:"Numbers",weight:1}] },
  { id:15, text:"I prefer step-by-step instructions when learning something new.", dimension:"SN", pole:"S", skillMap:[{skill:"Attention to Detail",weight:2},{skill:"Debugging",weight:2}] },
  { id:16, text:"I enjoy thinking about future possibilities and what could be.", dimension:"SN", pole:"N", skillMap:[{skill:"Design Thinking",weight:2},{skill:"Risk-taking",weight:1}] },
  { id:17, text:"I love brainstorming creative or unconventional solutions.", dimension:"SN", pole:"N", skillMap:[{skill:"Design Thinking",weight:3},{skill:"SEO",weight:1}] },
  { id:18, text:"I naturally think about the big picture rather than the fine details.", dimension:"SN", pole:"N", skillMap:[{skill:"Leadership",weight:2},{skill:"Financial Literacy",weight:1}] },
  { id:19, text:"I enjoy exploring abstract ideas, patterns, and theories.", dimension:"SN", pole:"N", skillMap:[{skill:"Research",weight:2},{skill:"Analytical Thinking",weight:2}] },
  { id:20, text:"I get bored quickly with repetitive, routine tasks.", dimension:"SN", pole:"N", skillMap:[{skill:"Storytelling",weight:2},{skill:"User Research",weight:1}] },

  // ── T/F: THINKING vs FEELING ──
  { id:21, text:"I make decisions based on logic rather than emotions.", dimension:"TF", pole:"T", skillMap:[{skill:"Analytical Thinking",weight:3},{skill:"Problem-solving",weight:2}] },
  { id:22, text:"I enjoy analyzing data to find the most efficient solution.", dimension:"TF", pole:"T", skillMap:[{skill:"SQL",weight:2},{skill:"Data Analysis",weight:2}] },
  { id:23, text:"I prefer objective feedback over emotional encouragement.", dimension:"TF", pole:"T", skillMap:[{skill:"Analytical Thinking",weight:2},{skill:"Debugging",weight:1}] },
  { id:24, text:"When solving a problem, I focus on facts and evidence.", dimension:"TF", pole:"T", skillMap:[{skill:"Problem-solving",weight:3},{skill:"Risk Analysis",weight:1}] },
  { id:25, text:"I value accuracy and correctness over keeping the peace.", dimension:"TF", pole:"T", skillMap:[{skill:"Attention to Detail",weight:2},{skill:"Numbers",weight:2}] },
  { id:26, text:"I care deeply about how my decisions affect other people.", dimension:"TF", pole:"F", skillMap:[{skill:"Empathy",weight:3},{skill:"Communication",weight:2}] },
  { id:27, text:"I often put others' needs before my own.", dimension:"TF", pole:"F", skillMap:[{skill:"Patient Care",weight:3},{skill:"Empathy",weight:2}] },
  { id:28, text:"I'm good at reading people's emotions and responding to them.", dimension:"TF", pole:"F", skillMap:[{skill:"Empathy",weight:3},{skill:"Communication",weight:2}] },
  { id:29, text:"Helping others and making a real difference motivates me.", dimension:"TF", pole:"F", skillMap:[{skill:"Patient Care",weight:2},{skill:"Empathy",weight:2},{skill:"Communication",weight:1}] },
  { id:30, text:"I prefer maintaining harmony in a team over pointing out flaws.", dimension:"TF", pole:"F", skillMap:[{skill:"Communication",weight:2},{skill:"Empathy",weight:2}] },

  // ── J/P: JUDGING vs PERCEIVING ──
  { id:31, text:"I prefer having a clear plan and sticking to it.", dimension:"JP", pole:"J", skillMap:[{skill:"Attention to Detail",weight:2},{skill:"Numbers",weight:1}] },
  { id:32, text:"I feel uncomfortable when things are disorganized or unclear.", dimension:"JP", pole:"J", skillMap:[{skill:"Attention to Detail",weight:3},{skill:"Risk Analysis",weight:1}] },
  { id:33, text:"I like to complete tasks well before the deadline.", dimension:"JP", pole:"J", skillMap:[{skill:"Attention to Detail",weight:2},{skill:"Financial Literacy",weight:1}] },
  { id:34, text:"I prefer structured environments with clear rules and expectations.", dimension:"JP", pole:"J", skillMap:[{skill:"Numbers",weight:2},{skill:"Analytical Thinking",weight:1}] },
  { id:35, text:"I make lists and schedules to stay organized.", dimension:"JP", pole:"J", skillMap:[{skill:"Excel",weight:2},{skill:"Attention to Detail",weight:2}] },
  { id:36, text:"I enjoy going with the flow and adapting to new situations.", dimension:"JP", pole:"P", skillMap:[{skill:"Risk-taking",weight:2},{skill:"Storytelling",weight:1}] },
  { id:37, text:"I like keeping my options open rather than committing too early.", dimension:"JP", pole:"P", skillMap:[{skill:"Risk-taking",weight:3},{skill:"Design Thinking",weight:1}] },
  { id:38, text:"I often do my best work under pressure or close to a deadline.", dimension:"JP", pole:"P", skillMap:[{skill:"Risk-taking",weight:2},{skill:"Copywriting",weight:1}] },
  { id:39, text:"I prefer flexible, open-ended tasks over rigid structured ones.", dimension:"JP", pole:"P", skillMap:[{skill:"Design Thinking",weight:2},{skill:"User Research",weight:2}] },
  { id:40, text:"I enjoy starting new projects, even if I don't always finish them.", dimension:"JP", pole:"P", skillMap:[{skill:"Risk-taking",weight:2},{skill:"Leadership",weight:1}] },
];

export const MBTI_PROFILES: Record<string, {
  nickname: string;
  workStyle: string;
  suitableRoles: string[];
}> = {
  "INTJ": { nickname: "The Architect", workStyle: "You work best independently with full autonomy. You prefer long-term strategy over day-to-day tasks and thrive in environments where your analytical mind is challenged.", suitableRoles: ["Data Analyst", "Cybersecurity Analyst", "Business Analyst"] },
  "INTP": { nickname: "The Thinker", workStyle: "You love exploring ideas and solving complex problems. You work best alone, prefer logic over routine, and need intellectual freedom to do your best work.", suitableRoles: ["Software Developer", "Data Analyst", "Cybersecurity Analyst"] },
  "ENTJ": { nickname: "The Commander", workStyle: "You are a natural leader who thrives on setting goals and driving results. You prefer structured environments where your decisiveness and vision can lead a team forward.", suitableRoles: ["Business Analyst", "Entrepreneur", "Digital Marketer"] },
  "ENTP": { nickname: "The Debater", workStyle: "You are energized by new ideas and love challenging the status quo. You thrive in fast-paced, creative environments and are great at spotting opportunities others miss.", suitableRoles: ["Entrepreneur", "Software Developer", "Digital Marketer"] },
  "INFJ": { nickname: "The Advocate", workStyle: "You are driven by a deep sense of purpose and empathy. You work best in meaningful roles where your insights and care for others can make a real difference.", suitableRoles: ["Psychologist", "Content Creator", "Nurse"] },
  "INFP": { nickname: "The Mediator", workStyle: "You are creative and deeply values-driven. You thrive in roles that allow personal expression and are motivated by helping others and contributing to something meaningful.", suitableRoles: ["Psychologist", "Graphic Designer", "Content Creator"] },
  "ENFJ": { nickname: "The Protagonist", workStyle: "You are a natural people person who inspires others. You thrive in roles involving communication, mentoring, and building connections.", suitableRoles: ["Psychologist", "Digital Marketer", "Nurse"] },
  "ENFP": { nickname: "The Campaigner", workStyle: "You are enthusiastic and creative with a talent for connecting with people. You thrive in dynamic roles where you can express ideas and motivate others.", suitableRoles: ["Digital Marketer", "Content Creator", "Entrepreneur"] },
  "ISTJ": { nickname: "The Inspector", workStyle: "You are dependable, precise and hardworking. You thrive in structured roles with clear responsibilities and take pride in delivering accurate, reliable work.", suitableRoles: ["Accountant", "Medical Lab Technologist", "Cybersecurity Analyst"] },
  "ISFJ": { nickname: "The Protector", workStyle: "You are caring, detail-oriented and deeply loyal. You work best in stable, supportive environments where your dedication and attention to others can shine.", suitableRoles: ["Nurse", "Accountant", "Medical Lab Technologist"] },
  "ESTJ": { nickname: "The Director", workStyle: "You are organized, decisive and value clear processes. You excel in structured environments where you can manage systems, lead teams, and deliver consistent results.", suitableRoles: ["Business Analyst", "Accountant", "Digital Marketer"] },
  "ESFJ": { nickname: "The Caregiver", workStyle: "You are warm, organized and love supporting others. You thrive in team environments where your ability to connect and care for people creates real impact.", suitableRoles: ["Nurse", "Digital Marketer", "Content Creator"] },
  "ISTP": { nickname: "The Craftsman", workStyle: "You are practical, observant and love understanding how things work. You prefer hands-on problem-solving and technical challenges over social or abstract tasks.", suitableRoles: ["Cybersecurity Analyst", "UI/UX Designer", "Software Developer"] },
  "ISFP": { nickname: "The Artist", workStyle: "You are gentle, creative and highly observant. You work best in flexible, visual environments where you can express your aesthetic sensibility and work at your own pace.", suitableRoles: ["UI/UX Designer", "Graphic Designer", "Content Creator"] },
  "ESTP": { nickname: "The Entrepreneur", workStyle: "You are bold, energetic and action-oriented. You thrive in fast-paced environments where you can take risks, think on your feet and make things happen quickly.", suitableRoles: ["Entrepreneur", "Digital Marketer", "Business Analyst"] },
  "ESFP": { nickname: "The Performer", workStyle: "You are spontaneous, energetic and love being in the moment. You thrive in creative, social roles where your energy, storytelling and charm can engage an audience.", suitableRoles: ["Content Creator", "Digital Marketer", "UI/UX Designer"] },
};

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

export function getQuizQuestionsForDomain(domain: "Tech" | "Accounting" | "Healthcare" | "Creative" | "Business"): QuizQuestion[] {
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
  mbtiType: string;
  mbtiNickname: string;
  mbtiWorkStyle: string;
  mbtiSuitableRoles: string[];
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

  // Calculate MBTI type from dimension scores
  const dimScores: Record<string, { left: number; right: number }> = {
    EI: { left: 0, right: 0 }, // left=E, right=I
    SN: { left: 0, right: 0 }, // left=S, right=N
    TF: { left: 0, right: 0 }, // left=T, right=F
    JP: { left: 0, right: 0 }, // left=J, right=P
  };
  const leftPoles = ["E","S","T","J"];
  QUESTIONS.forEach((q) => {
    const val = answers[q.id] ?? 0;
    if (val >= 3) {
      if (leftPoles.includes(q.pole)) dimScores[q.dimension].left += 1;
      else dimScores[q.dimension].right += 1;
    }
  });
  const mbtiType =
    (dimScores.EI.left >= dimScores.EI.right ? "E" : "I") +
    (dimScores.SN.left >= dimScores.SN.right ? "S" : "N") +
    (dimScores.TF.left >= dimScores.TF.right ? "T" : "F") +
    (dimScores.JP.left >= dimScores.JP.right ? "J" : "P");
  const mbtiProfile = MBTI_PROFILES[mbtiType];

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

  return {
    domains,
    topDomain: domains[0].domain,
    topCareers,
    mbtiType,
    mbtiNickname: mbtiProfile?.nickname ?? "",
    mbtiWorkStyle: mbtiProfile?.workStyle ?? "",
    mbtiSuitableRoles: mbtiProfile?.suitableRoles ?? [],
  };
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
  domain: "Tech" | "Accounting" | "Healthcare" | "Creative" | "Business"
): CareerQuizResult[] {
  const domainCareers = CAREERS.filter((c) => c.domain === domain).map((c) => c.title);
  return calculateStage2Results(quizAnswers, domainCareers);
}
