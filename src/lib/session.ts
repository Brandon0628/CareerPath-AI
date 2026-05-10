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
    // @ts-ignore - user_sessions table created manually, types not regenerated
    await (supabase as any).from("user_sessions").insert({
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

export async function getLastResult(): Promise<{
  topCareer: string;
  overallScore: number;
} | null> {
  const sessionId = getOrCreateSessionId();
  try {
    const { data } = await (supabase as any)
      .from("user_sessions")
      .select("top_career, overall_score")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false })
      .limit(1);
    if (!data || data.length === 0) return null;
    return {
      topCareer: data[0].top_career,
      overallScore: data[0].overall_score,
    };
  } catch {
    return null;
  }
}