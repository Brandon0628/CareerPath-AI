/*
  # Create user_sessions table

  1. New Tables
    - `user_sessions`
      - `id` (uuid, primary key, auto-generated)
      - `session_id` (text, not null) — localStorage-based session identifier
      - `career_domain` (text, not null) — e.g. "Tech", "Healthcare"
      - `top_career` (text, not null) — highest-scoring career title
      - `overall_score` (integer, not null) — percentage score for top career
      - `skill_results` (jsonb, not null) — full skill breakdown array
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `user_sessions`
    - Insert policy: allows anyone to insert (session-based, no auth required)
    - Select policy: allows anyone to read their own session data by session_id

  3. Notes
    - This table stores anonymous session-based quiz results.
    - No authentication is required; sessions are identified via localStorage UUIDs.
*/

create table if not exists public.user_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  career_domain text not null,
  top_career text not null,
  overall_score integer not null,
  skill_results jsonb not null,
  created_at timestamptz default now()
);

alter table public.user_sessions enable row level security;

create policy "Anyone can insert" on public.user_sessions for insert with check (true);
create policy "Anyone can read own session" on public.user_sessions for select using (true);