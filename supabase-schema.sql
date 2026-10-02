-- VestTrack Supabase Schema - Enhanced for Goals, Analytics, Flashcards, Summaries
-- Run this in Supabase SQL Editor

-- Enable RLS
-- Existing tables (if not exists)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  goal text,
  weekly_hours int default 10,
  created_at timestamptz default now()
);

create table if not exists topic_progress (
  user_id uuid references auth.users(id) on delete cascade,
  subject_id text,
  topic_id text,
  done boolean default false,
  primary key (user_id, subject_id, topic_id)
);

create table if not exists tasks (
  id text,
  user_id uuid references auth.users(id) on delete cascade,
  subject_id text,
  title text,
  done boolean default false,
  primary key (user_id, id)
);

create table if not exists mock_tests (
  id text,
  user_id uuid references auth.users(id) on delete cascade,
  name text,
  test_date date,
  scores jsonb default '{}',
  primary key (user_id, id)
);

-- NEW TABLES

create table if not exists question_attempts (
  id text,
  user_id uuid references auth.users(id) on delete cascade,
  question_id text,
  selected_index int,
  correct boolean,
  time_spent int,
  attempted_at timestamptz default now(),
  primary key (user_id, id)
);

create table if not exists goals (
  id text,
  user_id uuid references auth.users(id) on delete cascade,
  title text,
  type text,
  target int,
  current int default 0,
  period text,
  subject_id text,
  created_at timestamptz default now(),
  completed_at timestamptz,
  primary key (user_id, id)
);

create table if not exists streaks (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_streak int default 0,
  longest_streak int default 0,
  last_active_date date,
  history jsonb default '{}',
  updated_at timestamptz default now()
);

create table if not exists daily_activity (
  user_id uuid references auth.users(id) on delete cascade,
  date date,
  questions int default 0,
  topics int default 0,
  flashcards int default 0,
  focus_minutes int default 0,
  xp int default 0,
  primary key (user_id, date)
);

create table if not exists flashcards_progress (
  id text,
  user_id uuid references auth.users(id) on delete cascade,
  subject_id text,
  front text,
  back text,
  next_review date,
  interval int default 0,
  ease float default 2.5,
  primary key (user_id, id)
);

create table if not exists summaries (
  id text,
  user_id uuid references auth.users(id) on delete cascade,
  subject_id text,
  topic_id text,
  title text,
  content text,
  tags text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (user_id, id)
);

-- RLS
alter table profiles enable row level security;
alter table topic_progress enable row level security;
alter table tasks enable row level security;
alter table mock_tests enable row level security;
alter table question_attempts enable row level security;
alter table goals enable row level security;
alter table streaks enable row level security;
alter table daily_activity enable row level security;
alter table flashcards_progress enable row level security;
alter table summaries enable row level security;

-- Policies (drop existing if any, then create)
drop policy if exists "Users can manage own profile" on profiles;
create policy "Users can manage own profile" on profiles for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "Users can manage own topics" on topic_progress;
create policy "Users can manage own topics" on topic_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can manage own tasks" on tasks;
create policy "Users can manage own tasks" on tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can manage own mocks" on mock_tests;
create policy "Users can manage own mocks" on mock_tests for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can manage own attempts" on question_attempts;
create policy "Users can manage own attempts" on question_attempts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can manage own goals" on goals;
create policy "Users can manage own goals" on goals for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can manage own streaks" on streaks;
create policy "Users can manage own streaks" on streaks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can manage own activity" on daily_activity;
create policy "Users can manage own activity" on daily_activity for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can manage own flashcards" on flashcards_progress;
create policy "Users can manage own flashcards" on flashcards_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can manage own summaries" on summaries;
create policy "Users can manage own summaries" on summaries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Analytics - page views (public insert, only admin can read)
create table if not exists page_views (
  id uuid primary key default gen_random_uuid(),
  path text,
  referrer text,
  user_agent text,
  timestamp timestamptz default now(),
  session_id text
);

alter table page_views enable row level security;

drop policy if exists "Anyone can insert page views" on page_views;
create policy "Anyone can insert page views" on page_views for insert with check (true);

drop policy if exists "Only authenticated can read page views" on page_views;
create policy "Only authenticated can read page views" on page_views for select using (auth.role() = 'authenticated');

