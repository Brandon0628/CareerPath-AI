import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "gg_session_id";

export function getOrCreateSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export async function saveResultsToSupabase(
  domain: string,
  topCareer: string,
  overallScore: number,
  skillResults: unknown[],
): Promise<void> {
  try {
    const sessionId = getOrCreateSessionId();
    await supabase.from("user_sessions").insert({
      session_id: sessionId,
      career_domain: domain,
      top_career: topCareer,
      overall_score: overallScore,
      skill_results: skillResults,
    });
  } catch (err) {
    console.error("Failed to save results to Supabase", err);
  }
}
