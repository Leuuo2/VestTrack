-- =============================================================
-- VestTrack — Schema do banco (Supabase / Postgres)
-- Como usar: abra o SQL Editor no dashboard do Supabase,
-- cole este arquivo inteiro e clique em RUN (uma vez só).
-- =============================================================

-- 1) PERFIL: uma linha por usuário (estende auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  goal text not null default '',
  weekly_hours integer not null default 7,
  created_at timestamptz not null default now()
);

-- 2) PROGRESSO DE TÓPICOS: uma linha por (usuário, tópico).
--    subject_id/topic_id são ids fixos definidos no código do app.
create table if not exists public.topic_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  subject_id text not null,
  topic_id text not null,
  done boolean not null default false,
  primary key (user_id, topic_id)
);

-- 3) TAREFAS
create table if not exists public.tasks (
  id text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  subject_id text not null,
  title text not null,
  done boolean not null default false,
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);

-- 4) SIMULADOS: scores = jsonb {subjectId: nota 0-100}
create table if not exists public.mock_tests (
  id text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  test_date date not null,
  scores jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);

-- 5) SEGURANÇA (RLS): cada usuário só lê/edita os PRÓPRIOS dados.
--    Sem isso, qualquer pessoa com a anon key veria tudo.
alter table public.profiles enable row level security;
alter table public.topic_progress enable row level security;
alter table public.tasks enable row level security;
alter table public.mock_tests enable row level security;

drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "own topic progress" on public.topic_progress;
create policy "own topic progress" on public.topic_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own tasks" on public.tasks;
create policy "own tasks" on public.tasks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own mock tests" on public.mock_tests;
create policy "own mock tests" on public.mock_tests
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 5b) PERMISSÕES: projetos novos do Supabase não dão acesso às tabelas
--     automaticamente. O app usa o papel `anon` (sem login) e
--     `authenticated` (com login) — ambos precisam das permissões.
--     (A segurança continua sendo o RLS acima.)
GRANT SELECT, INSERT, UPDATE, DELETE ON
  public.profiles,
  public.topic_progress,
  public.tasks,
  public.mock_tests
TO anon, authenticated;

-- 5b) PERMISSÕES: projetos novos do Supabase não dão acesso às tabelas
--     automaticamente. O app usa o papel `anon` (sem login) e
--     `authenticated` (com login) — os dois precisam das permissões.
--     (A segurança continua sendo o RLS acima.)
GRANT SELECT, INSERT, UPDATE, DELETE ON
  public.profiles,
  public.topic_progress,
  public.tasks,
  public.mock_tests
TO anon, authenticated;

-- 6) TRIGGER: cria a linha de perfil automaticamente no cadastro
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
