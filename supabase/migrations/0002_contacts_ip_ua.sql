-- Track submitter IP + User-Agent per lead, for spotting bot patterns.
alter table public.contacts add column if not exists ip text;
alter table public.contacts add column if not exists user_agent text;
