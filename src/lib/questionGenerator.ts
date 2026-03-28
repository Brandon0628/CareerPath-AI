import { CAREERS, type QuizQuestion } from "./scoring";

// Large question bank per career, used for randomized mock generation
const QUESTION_BANK: Record<string, Array<Omit<QuizQuestion, "id">>> = {
  "Software Developer": [
    { careerTitle: "Software Developer", skill: "JavaScript", type: "fill-blank", text: "Complete the code to declare a constant array:", codeSnippet: "______ colors = ['red', 'blue'];", blankAnswer: "const", options: [{ label: "const", isCorrect: true }, { label: "var", isCorrect: false }, { label: "let", isCorrect: false }, { label: "def", isCorrect: false }] },
    { careerTitle: "Software Developer", skill: "JavaScript", type: "mcq", text: "What does Array.prototype.map() return?", options: [{ label: "A new array", isCorrect: true }, { label: "undefined", isCorrect: false }, { label: "The original array", isCorrect: false }, { label: "A boolean", isCorrect: false }] },
    { careerTitle: "Software Developer", skill: "Debugging", type: "mcq", text: "Which tool is used to set breakpoints in browser?", options: [{ label: "DevTools Debugger", isCorrect: true }, { label: "Terminal", isCorrect: false }, { label: "Notepad", isCorrect: false }, { label: "File Explorer", isCorrect: false }] },
    { careerTitle: "Software Developer", skill: "Problem-solving", type: "mcq", text: "What data structure uses FIFO ordering?", options: [{ label: "Queue", isCorrect: true }, { label: "Stack", isCorrect: false }, { label: "Tree", isCorrect: false }, { label: "Graph", isCorrect: false }] },
    { careerTitle: "Software Developer", skill: "JavaScript", type: "fill-blank", text: "Complete the arrow function syntax:", codeSnippet: "const add = (a, b) ______ a + b;", blankAnswer: "=>", options: [{ label: "=>", isCorrect: true }, { label: "->", isCorrect: false }, { label: "::", isCorrect: false }, { label: "==", isCorrect: false }] },
    { careerTitle: "Software Developer", skill: "Coding", type: "mcq", text: "Which HTTP method is used to update a resource?", options: [{ label: "PUT", isCorrect: true }, { label: "GET", isCorrect: false }, { label: "DELETE", isCorrect: false }, { label: "HEAD", isCorrect: false }] },
    { careerTitle: "Software Developer", skill: "JavaScript", type: "fill-blank", text: "Complete the loop to iterate over an array:", codeSnippet: "for (let i = 0; i ______ arr.length; i++) {}", blankAnswer: "<", options: [{ label: "<", isCorrect: true }, { label: ">", isCorrect: false }, { label: "==", isCorrect: false }, { label: "!=", isCorrect: false }] },
    { careerTitle: "Software Developer", skill: "Debugging", type: "mcq", text: "What does a 404 HTTP status code mean?", options: [{ label: "Not Found", isCorrect: true }, { label: "Server Error", isCorrect: false }, { label: "Unauthorized", isCorrect: false }, { label: "Success", isCorrect: false }] },
    { careerTitle: "Software Developer", skill: "Problem-solving", type: "mcq", text: "What is the time complexity of binary search?", options: [{ label: "O(log n)", isCorrect: true }, { label: "O(n)", isCorrect: false }, { label: "O(n²)", isCorrect: false }, { label: "O(1)", isCorrect: false }] },
    { careerTitle: "Software Developer", skill: "Coding", type: "fill-blank", text: "Complete the function declaration:", codeSnippet: "______ greet(name) { return `Hello ${name}`; }", blankAnswer: "function", options: [{ label: "function", isCorrect: true }, { label: "def", isCorrect: false }, { label: "func", isCorrect: false }, { label: "method", isCorrect: false }] },
    { careerTitle: "Software Developer", skill: "JavaScript", type: "mcq", text: "Which method converts JSON string to an object?", options: [{ label: "JSON.parse()", isCorrect: true }, { label: "JSON.stringify()", isCorrect: false }, { label: "JSON.convert()", isCorrect: false }, { label: "JSON.decode()", isCorrect: false }] },
    { careerTitle: "Software Developer", skill: "Debugging", type: "mcq", text: "What does 'NaN' stand for in JavaScript?", options: [{ label: "Not a Number", isCorrect: true }, { label: "No assigned name", isCorrect: false }, { label: "Null and None", isCorrect: false }, { label: "Negative and Null", isCorrect: false }] },
  ],
  "Data Analyst": [
    { careerTitle: "Data Analyst", skill: "SQL", type: "fill-blank", text: "Complete the SQL query to select all rows:", codeSnippet: "SELECT * ______ employees;", blankAnswer: "FROM", options: [{ label: "FROM", isCorrect: true }, { label: "IN", isCorrect: false }, { label: "AT", isCorrect: false }, { label: "OF", isCorrect: false }] },
    { careerTitle: "Data Analyst", skill: "Excel", type: "mcq", text: "Which Excel function finds the average of a range?", options: [{ label: "AVERAGE()", isCorrect: true }, { label: "MEAN()", isCorrect: false }, { label: "AVG()", isCorrect: false }, { label: "MEDIAN()", isCorrect: false }] },
    { careerTitle: "Data Analyst", skill: "SQL", type: "mcq", text: "Which SQL clause filters grouped results?", options: [{ label: "HAVING", isCorrect: true }, { label: "WHERE", isCorrect: false }, { label: "FILTER", isCorrect: false }, { label: "GROUP", isCorrect: false }] },
    { careerTitle: "Data Analyst", skill: "Problem-solving", type: "mcq", text: "What chart type is best for showing trends over time?", options: [{ label: "Line chart", isCorrect: true }, { label: "Pie chart", isCorrect: false }, { label: "Bar chart", isCorrect: false }, { label: "Scatter plot", isCorrect: false }] },
    { careerTitle: "Data Analyst", skill: "SQL", type: "fill-blank", text: "Complete the query to sort results descending:", codeSnippet: "SELECT name FROM users ORDER BY name ______;", blankAnswer: "DESC", options: [{ label: "DESC", isCorrect: true }, { label: "ASC", isCorrect: false }, { label: "DOWN", isCorrect: false }, { label: "REVERSE", isCorrect: false }] },
    { careerTitle: "Data Analyst", skill: "Excel", type: "mcq", text: "What does VLOOKUP stand for?", options: [{ label: "Vertical Lookup", isCorrect: true }, { label: "Value Lookup", isCorrect: false }, { label: "Variable Lookup", isCorrect: false }, { label: "Visual Lookup", isCorrect: false }] },
    { careerTitle: "Data Analyst", skill: "SQL", type: "fill-blank", text: "Complete the JOIN clause:", codeSnippet: "SELECT * FROM orders ______ JOIN customers ON orders.cid = customers.id;", blankAnswer: "INNER", options: [{ label: "INNER", isCorrect: true }, { label: "OUTER", isCorrect: false }, { label: "CROSS", isCorrect: false }, { label: "SELF", isCorrect: false }] },
    { careerTitle: "Data Analyst", skill: "Problem-solving", type: "mcq", text: "What is a 'null hypothesis' in data analysis?", options: [{ label: "Assumption of no effect", isCorrect: true }, { label: "A missing value", isCorrect: false }, { label: "An empty dataset", isCorrect: false }, { label: "A zero result", isCorrect: false }] },
    { careerTitle: "Data Analyst", skill: "Excel", type: "fill-blank", text: "Complete the Excel formula to count non-empty cells:", codeSnippet: "=______(A1:A10)", blankAnswer: "COUNTA", options: [{ label: "COUNTA", isCorrect: true }, { label: "COUNT", isCorrect: false }, { label: "SUM", isCorrect: false }, { label: "LEN", isCorrect: false }] },
    { careerTitle: "Data Analyst", skill: "SQL", type: "mcq", text: "Which SQL keyword removes duplicate rows?", options: [{ label: "DISTINCT", isCorrect: true }, { label: "UNIQUE", isCorrect: false }, { label: "DIFFERENT", isCorrect: false }, { label: "SEPARATE", isCorrect: false }] },
  ],
  "Cybersecurity Analyst": [
    { careerTitle: "Cybersecurity Analyst", skill: "Networking", type: "mcq", text: "What port does HTTPS use by default?", options: [{ label: "443", isCorrect: true }, { label: "80", isCorrect: false }, { label: "22", isCorrect: false }, { label: "8080", isCorrect: false }] },
    { careerTitle: "Cybersecurity Analyst", skill: "Risk Analysis", type: "mcq", text: "What does 'phishing' refer to?", options: [{ label: "Deceptive emails to steal info", isCorrect: true }, { label: "A type of firewall", isCorrect: false }, { label: "Network scanning", isCorrect: false }, { label: "Data encryption", isCorrect: false }] },
    { careerTitle: "Cybersecurity Analyst", skill: "Networking", type: "fill-blank", text: "Complete the command to check network connectivity:", codeSnippet: "______ google.com", blankAnswer: "ping", options: [{ label: "ping", isCorrect: true }, { label: "send", isCorrect: false }, { label: "check", isCorrect: false }, { label: "test", isCorrect: false }] },
    { careerTitle: "Cybersecurity Analyst", skill: "Problem-solving", type: "mcq", text: "What is a 'zero-day' vulnerability?", options: [{ label: "An unknown unpatched flaw", isCorrect: true }, { label: "A virus from day one", isCorrect: false }, { label: "A fixed bug", isCorrect: false }, { label: "A test exploit", isCorrect: false }] },
    { careerTitle: "Cybersecurity Analyst", skill: "Risk Analysis", type: "mcq", text: "What does a firewall primarily do?", options: [{ label: "Filters network traffic", isCorrect: true }, { label: "Encrypts files", isCorrect: false }, { label: "Backs up data", isCorrect: false }, { label: "Scans for viruses", isCorrect: false }] },
    { careerTitle: "Cybersecurity Analyst", skill: "Networking", type: "mcq", text: "What does DNS stand for?", options: [{ label: "Domain Name System", isCorrect: true }, { label: "Data Network Service", isCorrect: false }, { label: "Direct Node System", isCorrect: false }, { label: "Digital Name Server", isCorrect: false }] },
    { careerTitle: "Cybersecurity Analyst", skill: "Problem-solving", type: "mcq", text: "What type of attack floods a server with requests?", options: [{ label: "DDoS", isCorrect: true }, { label: "Phishing", isCorrect: false }, { label: "SQL Injection", isCorrect: false }, { label: "Keylogging", isCorrect: false }] },
    { careerTitle: "Cybersecurity Analyst", skill: "Networking", type: "fill-blank", text: "Complete the protocol for secure shell access:", codeSnippet: "______ user@server.com", blankAnswer: "ssh", options: [{ label: "ssh", isCorrect: true }, { label: "ftp", isCorrect: false }, { label: "http", isCorrect: false }, { label: "telnet", isCorrect: false }] },
    { careerTitle: "Cybersecurity Analyst", skill: "Risk Analysis", type: "mcq", text: "What is the principle of least privilege?", options: [{ label: "Give minimum access needed", isCorrect: true }, { label: "Block all access", isCorrect: false }, { label: "Give admin to everyone", isCorrect: false }, { label: "Rotate passwords daily", isCorrect: false }] },
  ],
  "Accountant": [
    { careerTitle: "Accountant", skill: "Numbers", type: "mcq", text: "Which financial statement shows a company's profitability?", options: [{ label: "Income Statement", isCorrect: true }, { label: "Balance Sheet", isCorrect: false }, { label: "Cash Flow Statement", isCorrect: false }, { label: "Equity Statement", isCorrect: false }] },
    { careerTitle: "Accountant", skill: "Analytical Thinking", type: "mcq", text: "What is the accounting equation?", options: [{ label: "Assets = Liabilities + Equity", isCorrect: true }, { label: "Revenue - Expenses = Profit", isCorrect: false }, { label: "Assets = Revenue + Equity", isCorrect: false }, { label: "Liabilities = Assets - Revenue", isCorrect: false }] },
    { careerTitle: "Accountant", skill: "Attention to Detail", type: "fill-blank", text: "Complete the journal entry for a cash sale:", codeSnippet: "Debit: Cash\nCredit: ______", blankAnswer: "Revenue", options: [{ label: "Revenue", isCorrect: true }, { label: "Expenses", isCorrect: false }, { label: "Assets", isCorrect: false }, { label: "Liabilities", isCorrect: false }] },
    { careerTitle: "Accountant", skill: "Numbers", type: "mcq", text: "If expenses increase, net income:", options: [{ label: "Decreases", isCorrect: true }, { label: "Increases", isCorrect: false }, { label: "Stays the same", isCorrect: false }, { label: "Doubles", isCorrect: false }] },
    { careerTitle: "Accountant", skill: "Analytical Thinking", type: "mcq", text: "What does 'depreciation' represent?", options: [{ label: "Asset value decrease over time", isCorrect: true }, { label: "Increase in liability", isCorrect: false }, { label: "Revenue growth", isCorrect: false }, { label: "Tax payment", isCorrect: false }] },
    { careerTitle: "Accountant", skill: "Attention to Detail", type: "fill-blank", text: "Complete: Total Assets = Total Liabilities + ______", codeSnippet: "Total Assets = Total Liabilities + ______", blankAnswer: "Owner's Equity", options: [{ label: "Owner's Equity", isCorrect: true }, { label: "Revenue", isCorrect: false }, { label: "Net Income", isCorrect: false }, { label: "Cash", isCorrect: false }] },
    { careerTitle: "Accountant", skill: "Numbers", type: "mcq", text: "Which account type normally has a debit balance?", options: [{ label: "Assets", isCorrect: true }, { label: "Revenue", isCorrect: false }, { label: "Liabilities", isCorrect: false }, { label: "Equity", isCorrect: false }] },
    { careerTitle: "Accountant", skill: "Analytical Thinking", type: "mcq", text: "What is a 'trial balance' used for?", options: [{ label: "Verify debits equal credits", isCorrect: true }, { label: "Calculate taxes", isCorrect: false }, { label: "Record transactions", isCorrect: false }, { label: "Issue invoices", isCorrect: false }] },
    { careerTitle: "Accountant", skill: "Numbers", type: "fill-blank", text: "Complete: Gross Profit = Revenue - ______", codeSnippet: "Gross Profit = Revenue - ______", blankAnswer: "Cost of Goods Sold", options: [{ label: "Cost of Goods Sold", isCorrect: true }, { label: "Tax", isCorrect: false }, { label: "Depreciation", isCorrect: false }, { label: "Interest", isCorrect: false }] },
    { careerTitle: "Accountant", skill: "Attention to Detail", type: "mcq", text: "In double-entry bookkeeping, every transaction affects:", options: [{ label: "At least two accounts", isCorrect: true }, { label: "Only one account", isCorrect: false }, { label: "Three accounts", isCorrect: false }, { label: "The cash account only", isCorrect: false }] },
    { careerTitle: "Accountant", skill: "Analytical Thinking", type: "mcq", text: "What does 'accrual accounting' record?", options: [{ label: "Revenue when earned, not received", isCorrect: true }, { label: "Only cash transactions", isCorrect: false }, { label: "Future predictions", isCorrect: false }, { label: "Tax obligations only", isCorrect: false }] },
  ],
};

/** Shuffle array in place (Fisher-Yates) */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Generate `count` random questions for a domain, avoiding previously used question texts.
 * Options within each question are also shuffled for variety.
 */
export function generateMockQuestions(
  domain: "Tech" | "Accounting",
  count: number = 5,
  usedTexts: Set<string> = new Set()
): QuizQuestion[] {
  const domainCareers = CAREERS.filter((c) => c.domain === domain).map((c) => c.title);

  // Gather all available questions for the domain
  const pool = domainCareers.flatMap((career) => QUESTION_BANK[career] ?? []);

  // Filter out previously used questions
  const available = pool.filter((q) => !usedTexts.has(q.text));

  // If not enough unique questions, allow reuse from full pool
  const source = available.length >= count ? available : pool;

  const selected = shuffle(source).slice(0, count);

  return selected.map((q, i) => ({
    ...q,
    id: `mock-${Date.now()}-${i}`,
    options: shuffle(q.options), // randomize option order
  }));
}
