import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  Circle,
  ListChecks,
  Target,
  TrendingDown,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import StatCard from "@/components/ui/StatCard";
import { Button } from "@/components/ui/button";
import ScoreTrendChart from "@/components/ScoreTrendChart";
import InsightsCard from "@/components/analytics/InsightsCard";
import SubjectComparisonChart from "@/components/analytics/SubjectComparisonChart";
import StudyStreak from "@/components/analytics/StudyStreak";
import ExportActions from "@/components/analytics/ExportActions";
import { loadTopics, subjects } from "@/data/subjects";
import { DEFAULT_TASKS, loadTasks } from "@/data/tasks";
import {
  formatDate,
  loadMockTests,
  overallScore,
  subjectAverage,
} from "@/data/mockTests";
import { loadProfile } from "@/lib/profile";
import { cn } from "@/lib/utils";

function Dashboard() {
  const profile = loadProfile();
  const tests = [...loadMockTests()].sort((a, b) => a.date.localeCompare(b.date));
  const overall = tests.length
    ? Math.round(tests.reduce((sum, t) => sum + overallScore(t), 0) / tests.length)
    : 0;

  const loadedTopics = subjects.map((s) => ({
    subject: s,
    topics: loadTopics(s.id, s.topics),
  }));
  const topicsDone = loadedTopics.reduce(
    (n, { topics }) => n + topics.filter((t) => t.done).length,
    0,
  );
  const topicsTotal = loadedTopics.reduce((n, { topics }) => n + topics.length, 0);

  const pendingTasks = loadedTopics.flatMap(({ subject }) =>
    loadTasks(subject.id, DEFAULT_TASKS[subject.id] ?? [])
      .filter((t) => !t.done)
      .map((task) => ({ subject, task })),
  );

  const weakSubject = [...subjects].sort(
    (a, b) => subjectAverage(loadMockTests(), a.id) - subjectAverage(loadMockTests(), b.id),
  )[0];

  const progressBySubject = [...subjects].sort((a, b) => b.progress - a.progress);

  const pendingFocus = loadedTopics.flatMap(({ subject, topics }) =>
    topics
      .filter((t) => !t.done)
      .slice(0, 2)
      .map((topic) => ({ subject, topic })),
  ).slice(0, 5);

  const recentTests = tests
    .map((test, i) => ({ test, prev: i > 0 ? tests[i - 1] : null }))
    .slice(-3)
    .reverse();

  const rawDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const dateLabel = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);

  const stats = [
    {
      title: "Matérias",
      value: subjects.length,
      description: "cadastradas",
      icon: <BookOpen />,
      accent: "violet" as const,
    },
    {
      title: "Simulados",
      value: tests.length,
      description: "registrados",
      icon: <CalendarCheck />,
      accent: "emerald" as const,
      trend: tests.length >= 2 ? { value: tests.length - 1, label: "este mês" } : undefined,
    },
    {
      title: "Tópicos",
      value: `${topicsDone}/${topicsTotal}`,
      description: "concluídos",
      icon: <ListChecks />,
      accent: "amber" as const,
    },
    {
      title: "Meta da semana",
      value: `${profile.weeklyHours}h`,
      description: "definida no perfil",
      icon: <Target />,
      accent: "fuchsia" as const,
    },
  ];

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-600 dark:text-violet-400">
            <Sparkles className="h-3 w-3" /> Dashboard premium
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Olá, {profile.name}! 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{dateLabel} · Pronto para avançar?</p>
        </div>
        <div className="flex items-center gap-2">
          <ExportActions />
          <Button asChild className="h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-[0_4px_12px_-2px_rgba(139,92,246,0.4)] hover:from-violet-500 hover:to-fuchsia-500">
            <Link to="/app/subjects">
              Ver matérias <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-[20px] bg-gradient-to-br from-violet-600 via-violet-500 to-fuchsia-500 p-[1px] shadow-[0_16px_40px_-16px_rgba(139,92,246,0.5)]">
        <div className="relative overflow-hidden rounded-[19px] bg-gradient-to-br from-violet-600 via-violet-500 to-fuchsia-500 p-6 text-white md:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 right-32 h-56 w-56 rounded-full bg-white/10 blur-xl" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl" />

          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> Prontidão geral
              </p>
              <p className="mt-3 text-6xl font-bold tracking-tight">{overall}%</p>
              <p className="mt-1.5 text-sm text-white/80">
                média nos seus simulados · {tests.length} provas registradas
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <HeroMini
                icon={<ListChecks className="h-4 w-4" />}
                label="Tópicos"
                value={`${topicsDone}/${topicsTotal}`}
              />
              <HeroMini
                icon={<Circle className="h-4 w-4" />}
                label="Pendentes"
                value={String(pendingTasks.length)}
              />
              <HeroMini
                icon={<CalendarCheck className="h-4 w-4" />}
                label="Simulados"
                value={String(tests.length)}
              />
            </div>
          </div>

          {weakSubject && (
            <Link
              to={`/app/subjects/${weakSubject.id}`}
              className="group relative mt-6 inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold backdrop-blur transition-all hover:bg-white/25 hover:shadow-lg"
            >
              Reforçar {weakSubject.name} — sua matéria em desenvolvimento
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            accent={stat.accent}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <Card premium title="Evolução nas notas">
            <div className="mt-4">
              <ScoreTrendChart
                points={tests.map((t) => ({
                  label: t.name.length > 9 ? `${t.name.slice(0, 8)}…` : t.name,
                  value: overallScore(t),
                }))}
              />
            </div>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card title="Progresso por matéria">
              <div className="mt-4 space-y-3">
                {progressBySubject.slice(0,6).map((subject) => (
                  <Link key={subject.id} to={`/app/subjects/${subject.id}`} className="group block">
                    <div className="mb-1.5 flex justify-between text-xs">
                      <span className="font-medium group-hover:underline">{subject.name}</span>
                      <span className="tabular-nums text-muted-foreground">{subject.progress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full transition-all duration-700", subject.accent.bar)}
                        style={{ width: `${subject.progress}%` }}
                      />
                    </div>
                  </Link>
                ))}
                {progressBySubject.length > 6 && (
                  <Link to="/app/subjects" className="block pt-1 text-xs font-medium text-violet-600 hover:underline dark:text-violet-400">
                    Ver todas as {progressBySubject.length} matérias →
                  </Link>
                )}
              </div>
            </Card>

            <Card title="Próximo foco">
              <div className="mt-4">
                {pendingFocus.length === 0 ? (
                  <div className="rounded-xl bg-emerald-500/10 p-4 text-center ring-1 ring-emerald-500/20">
                    <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Todos os tópicos concluídos! 🎉</p>
                    <p className="mt-1 text-xs text-emerald-600/80 dark:text-emerald-400/80">Bora revisar tudo?</p>
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {pendingFocus.map(({ subject, topic }) => {
                      const Icon = subject.icon;
                      return (
                        <li key={topic.id}>
                          <Link
                            to={`/app/subjects/${subject.id}`}
                            className="flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition-colors hover:bg-muted/60"
                          >
                            <div className={cn("rounded-xl p-2", subject.accent.iconBg)}>
                              <Icon className={cn("h-4 w-4", subject.accent.iconText)} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium">{topic.name}</p>
                              <p className="text-xs text-muted-foreground">{subject.name}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <InsightsCard />
          <StudyStreak />
          <SubjectComparisonChart />
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card hover title="Simulados recentes">
          <div className="mt-4">
            <ul className="divide-y divide-border/50">
              {recentTests.length === 0 ? (
                <li className="py-6 text-center text-sm text-muted-foreground">Nenhum simulado ainda — registre o primeiro! 🎯</li>
              ) : (
                recentTests.map(({ test, prev }) => {
                  const score = overallScore(test);
                  const delta = prev ? score - overallScore(prev) : null;
                  return (
                    <li key={test.id} className="flex items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium">{test.name}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(test.date)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {delta != null && (
                          <span
                            className={cn(
                              "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
                              delta >= 0
                                ? "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400"
                                : "bg-rose-500/10 text-rose-600 ring-rose-500/20 dark:text-rose-400",
                            )}
                          >
                            {delta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {delta >= 0 ? "+" : ""}
                            {delta}%
                          </span>
                        )}
                        <span className="w-12 text-right text-lg font-bold tabular-nums">{score}%</span>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </Card>

        <Card hover title="Tarefas pendentes">
          <div className="mt-4">
            {pendingTasks.length === 0 ? (
              <div className="rounded-xl bg-emerald-500/10 p-4 text-center ring-1 ring-emerald-500/20">
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Tudo em dia! 🎉</p>
              </div>
            ) : (
              <>
                <ul className="divide-y divide-border/50">
                  {pendingTasks.slice(0, 5).map(({ subject, task }) => (
                    <li key={task.id}>
                      <Link
                        to={`/app/subjects/${subject.id}`}
                        className="flex items-center gap-3 rounded-xl px-2.5 py-3 transition-colors hover:bg-muted/60"
                      >
                        <Circle className="h-5 w-5 shrink-0 text-muted-foreground/30" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{task.title}</p>
                          <p className="text-xs text-muted-foreground">{subject.name}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
                {pendingTasks.length > 5 && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    +{pendingTasks.length - 5} outras em {subjects.length} matérias · <Link to="/app/subjects" className="font-medium text-violet-600 hover:underline dark:text-violet-400">ver todas</Link>
                  </p>
                )}
              </>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

function HeroMini({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/15 px-4 py-3.5 backdrop-blur ring-1 ring-white/10">
      <div className="flex items-center gap-1.5 text-white/80">
        {icon}
        <span className="text-xs font-medium tracking-wide">{label}</span>
      </div>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}

export default Dashboard;
