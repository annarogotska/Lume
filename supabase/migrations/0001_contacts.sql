-- Contact-form leads. Writes happen only via the `contact` Edge Function
-- (service role), so RLS is enabled with NO public policies — fully locked down.
create table if not exists public.contacts (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  project_type text,
  budget       text,
  message      text
);

alter table public.contacts enable row level security;
