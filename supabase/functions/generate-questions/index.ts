const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface RequestBody {
  domain: "Tech" | "Accounting";
  count?: number;
  pastQuestions?: string[];
}

const CAREERS_BY_DOMAIN: Record<string, string[]> = {
  Tech: ["Software Developer", "Data Analyst", "Cybersecurity Analyst"],
  Accounting: ["Accountant"],
};

const SKILLS_BY_CAREER: Record<string, string[]> = {
  "Software Developer": ["Coding", "Problem-solving", "Debugging", "JavaScript"],
  "Data Analyst": ["Excel", "SQL", "Problem-solving"],
  "Cybersecurity Analyst": ["Networking", "Risk Analysis", "Problem-solving"],
  Accountant: ["Numbers", "Analytical Thinking", "Attention to Detail"],
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = (await req.json()) as RequestBody;
    const domain = body.domain;
    const count = Math.min(Math.max(body.count ?? 20, 1), 30);
    const pastQuestions = (body.pastQuestions ?? []).slice(-50);

    if (domain !== "Tech" && domain !== "Accounting") {
      return new Response(
        JSON.stringify({ error: "Invalid domain. Must be 'Tech' or 'Accounting'." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const careers = CAREERS_BY_DOMAIN[domain];
    const seed = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    const careerSkillBrief = careers
      .map((c) => `- ${c}: skills = [${SKILLS_BY_CAREER[c].join(", ")}]`)
      .join("\n");

    const avoidBlock =
      pastQuestions.length > 0
        ? `\n\nDO NOT reuse, paraphrase, or rephrase any of these previously asked questions:\n${pastQuestions
            .map((q, i) => `${i + 1}. ${q}`)
            .join("\n")}`
        : "";

    const systemPrompt = `You are an expert quiz generator producing technical assessment questions for early-career students. Always return STRICT JSON that conforms to the requested schema. No markdown, no commentary.`;

    const userPrompt = `Generate exactly ${count} UNIQUE multiple-choice and fill-in-the-blank quiz questions for the "${domain}" career domain.

Distribute questions across these careers and their skills:
${careerSkillBrief}

Requirements:
- Mix of "mcq" and "fill-blank" question types (roughly 50/50).
- For "fill-blank", include a short codeSnippet (code, SQL, formula, or journal entry) with "______" marking the blank, and a blankAnswer string.
- Each question MUST have exactly 4 options; exactly ONE option has isCorrect: true.
- Questions must be practical, beginner-to-intermediate difficulty, and clearly worded.
- Every question must be DIFFERENT from each other (no duplicates, no near-duplicates).
- Vary topics, wording, and difficulty between questions.
- Randomization seed (use to vary output): ${seed}${avoidBlock}

Return STRICT JSON in this exact shape:
{
  "questions": [
    {
      "careerTitle": "<one of: ${careers.join(" | ")}>",
      "skill": "<one of the skills listed for that career>",
      "type": "mcq" | "fill-blank",
      "text": "<question text>",
      "codeSnippet": "<only if type is fill-blank, else omit or empty string>",
      "blankAnswer": "<only if type is fill-blank, the correct fill string>",
      "options": [
        { "label": "<option text>", "isCorrect": true },
        { "label": "<option text>", "isCorrect": false },
        { "label": "<option text>", "isCorrect": false },
        { "label": "<option text>", "isCorrect": false }
      ]
    }
  ]
}`;

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.9,
      }),
    });

    if (!aiResp.ok) {
      const errText = await aiResp.text();
      console.error("AI gateway error", aiResp.status, errText);
      if (aiResp.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (aiResp.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      return new Response(
        JSON.stringify({ error: `AI gateway failed: ${aiResp.status}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const aiData = await aiResp.json();
    const content = aiData?.choices?.[0]?.message?.content;
    if (!content) {
      return new Response(
        JSON.stringify({ error: "Empty AI response" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(content);
    } catch (_e) {
      return new Response(
        JSON.stringify({ error: "AI returned invalid JSON" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const rawQs = (parsed as { questions?: unknown[] })?.questions;
    if (!Array.isArray(rawQs) || rawQs.length === 0) {
      return new Response(
        JSON.stringify({ error: "AI response missing 'questions' array" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Validate + normalize
    const validCareerSet = new Set(careers);
    const validQuestions = rawQs
      .filter((q): q is Record<string, unknown> => !!q && typeof q === "object")
      .map((q, i) => {
        const careerTitle = String(q.careerTitle ?? "");
        const skill = String(q.skill ?? "");
        const type = q.type === "fill-blank" ? "fill-blank" : "mcq";
        const text = String(q.text ?? "").trim();
        const codeSnippet = type === "fill-blank" ? String(q.codeSnippet ?? "") : undefined;
        const blankAnswer = type === "fill-blank" ? String(q.blankAnswer ?? "") : undefined;
        const options = Array.isArray(q.options)
          ? q.options
              .filter((o: unknown): o is Record<string, unknown> => !!o && typeof o === "object")
              .map((o) => ({
                label: String(o.label ?? ""),
                isCorrect: Boolean(o.isCorrect),
              }))
          : [];

        if (
          !validCareerSet.has(careerTitle) ||
          !text ||
          options.length !== 4 ||
          options.filter((o) => o.isCorrect).length !== 1
        ) {
          return null;
        }

        return {
          id: `ai-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 8)}`,
          careerTitle,
          skill: skill || SKILLS_BY_CAREER[careerTitle][0],
          type,
          text,
          ...(codeSnippet !== undefined ? { codeSnippet } : {}),
          ...(blankAnswer !== undefined ? { blankAnswer } : {}),
          options,
        };
      })
      .filter((q): q is NonNullable<typeof q> => q !== null);

    if (validQuestions.length === 0) {
      return new Response(
        JSON.stringify({ error: "No valid questions parsed from AI response" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ questions: validQuestions }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("generate-questions error", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});