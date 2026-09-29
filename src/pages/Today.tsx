import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, CheckCircle2, Circle, Clock, Target, Flame, BookOpen, Brain, Sparkles, ArrowRight, Award, TrendingUp, Play } from "lucide-react";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { getTodayString, getDailyProgress, getTodayPlanner, getPendingTasks, getNextTopics, getQuestionsToReview, loadDailyTargets, saveDailyTargets, type DailyTargets } from "@/data/daily";
import { subjects } from "@/data/subjects";
import { cn } from "@/lib/utils";
import type { Question } from "@/data/questions";

function Today() {
  const [targets, setTargets] = useState<DailyTargets>(() => loadDailyTargets());
  const [showTargets, setShowTargets] = useState(false);

  const progress = getDailyProgress();
  const todayPlanner = getTodayPlanner();
  const pendingTasks = getPendingTasks(6);
  const nextTopics = getNextTopics(5);
  const toReview = getQuestionsToReview(5) as Question[];

  const todayLabel = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
  const todayFormatted = todayLabel.charAt(0).toUpperCase() + todayLabel.slice(1);

  function updateTarget(key: keyof DailyTargets, value: number) {
    const next = { ...targets, [key]: Math.max(0, value) };
    setTargets(next);
    saveDailyTargets(next);
  }

  const tasksPct = targets.tasks ? Math.min(100, Math.round((progress.tasksDone / Math.max(1, targets.tasks)) * 100)) : 0;
  const questionsPct = targets.questions ? Math.min(100, Math.round((progress.questionsDoneToday / targets.questions) * 100)) : 0;
  const plannerPct = targets.planner ? Math.min(100, Math.round((progress.plannerDone / Math.max(1, targets.planner)) * 100)) : 0;
  const overallPct = Math.round((tasksPct + questionsPct + plannerPct) / 3);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-600 dark:text-violet-400">
            <Calendar className="h-3 w-3" /> {getTodayString()} · {todayFormatted}
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">Hoje</h1>
          <p className="mt-1 text-sm text-muted-foreground">Seu plano do dia — tudo que importa em um lugar só. Bora gabaritar?</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowTargets(v => !v)} className="h-9 rounded-xl border-border/70">
            <Target className="h-4 w-4" /> {showTargets ? "Fechar metas" : "Editar metas"}
          </Button>
          <Button asChild size="sm" className="h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-[0_4px_12px_-2px_rgba(139,92,246,0.4)]">
            <Link to="/app/questions"><Play className="h-4 w-4" /> Praticar hoje</Link>
          </Button>
        </div>
      </div>

      {showTargets && (
        <Card premium className="mt-6" title="Metas diárias">
          <p className="mt-1 text-xs text-muted-foreground">Defina o que quer completar hoje — o app calcula seu progresso</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-4">
            {(Object.keys(targets) as (keyof DailyTargets)[]).map(key => (
              <div key={key}>
                <label className="block text-xs font-medium capitalize">{key === "planner" ? "Planner" : key === "tasks" ? "Tarefas" : key === "topics" ? "Tópicos" : "Questões"}</label>
                <input type="number" min={0} max={100} value={targets[key]} onChange={e => updateTarget(key, Number(e.target.value))} className="mt-1.5 w-full rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="relative mt-6 overflow-hidden rounded-[20px] bg-gradient-to-br from-violet-600 via-violet-500 to-fuchsia-500 p-[1px] shadow-[0_16px_40px_-16px_rgba(139,92,246,0.5)]">
        <div className="relative overflow-hidden rounded-[19px] bg-gradient-to-br from-violet-600 via-violet-500 to-fuchsia-500 p-6 text-white md:p-7">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-white/10 blur-xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur"><Flame className="h-3.5 w-3.5" /> Progresso de hoje</p>
              <p className="mt-3 text-5xl font-bold tracking-tight">{overallPct}%</p>
              <p className="mt-1 text-sm text-white/80">{progress.plannerDone}/{progress.plannerTotal} do planner · {progress.questionsDoneToday}/{targets.questions} questões · {pendingTasks.length} tarefas pendentes</p>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur ring-1 ring-white/10">
                <p className="text-xs text-white/80">Planner</p>
                <p className="mt-1 text-xl font-bold">{progress.plannerDone}/{todayPlanner.length || targets.planner}</p>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/20"><div className="h-full bg-white" style={{ width: `${plannerPct}%` }} /></div>
              </div>
              <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur ring-1 ring-white/10">
                <p className="text-xs text-white/80">Questões</p>
                <p className="mt-1 text-xl font-bold">{progress.questionsDoneToday}/{targets.questions}</p>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/20"><div className="h-full bg-white" style={{ width: `${questionsPct}%` }} /></div>
              </div>
              <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur ring-1 ring-white/10">
                <p className="text-xs text-white/80">Tarefas</p>
                <p className="mt-1 text-xl font-bold">{progress.tasksDone}/{targets.tasks}</p>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/20"><div className="h-full bg-white" style={{ width: `${tasksPct}%` }} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Card premium title={`Planner de hoje · ${todayPlanner.length} itens`}>
            <p className="mt-1 text-xs text-muted-foreground">O que você planejou para hoje em todas as matérias</p>
            <div className="mt-4 space-y-2">
              {todayPlanner.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/60 bg-muted/20 p-6 text-center">
                  <Calendar className="mx-auto h-5 w-5 text-muted-foreground/50" />
                  <p className="mt-2 text-sm font-medium">Nada planejado para hoje</p>
                  <p className="mt-1 text-xs text-muted-foreground">Vá em uma matéria e adicione eventos no planner com data de hoje</p>
                  <Link to="/app/subjects" className="mt-3 inline-flex rounded-xl bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-500">Ver matérias</Link>
                </div>
              ) : (
                todayPlanner.map(ev => (
                  <div key={ev.id} className={cn("flex items-center gap-3 rounded-xl border p-3", ev.done ? "border-emerald-500/20 bg-emerald-500/5" : "border-border/60 bg-card")}>
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", ev.subject.accent.iconBg)}>
                      <ev.subject.icon className={cn("h-4.5 w-4.5", ev.subject.accent.iconText)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={cn("truncate text-sm font-medium", ev.done && "line-through text-muted-foreground")}>{ev.title}</p>
                      <p className="text-xs text-muted-foreground">{ev.subject.name} · {ev.type}</p>
                    </div>
                    {ev.done ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Circle className="h-5 w-5 text-muted-foreground/30" />}
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card title="Tarefas pendentes — faça hoje" hover>
            <div className="mt-4 space-y-2">
              {pendingTasks.length === 0 ? (
                <div className="rounded-xl bg-emerald-500/10 p-4 text-center ring-1 ring-emerald-500/20">
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Tudo em dia! 🎉</p>
                </div>
              ) : (
                pendingTasks.map(task => (
                  <Link key={task.id} to={`/app/subjects/${task.subjectId}`} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3 transition-colors hover:bg-muted/50">
                    <Circle className="h-5 w-5 text-muted-foreground/30" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.subject.name}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))
              )}
            </div>
            <Link to="/app/subjects" className="mt-4 inline-flex text-xs font-medium text-violet-600 hover:underline dark:text-violet-400">Ver todas as matérias →</Link>
          </Card>
        </div>

        <div className="space-y-6">
          <Card premium title="Próximo foco">
            <p className="mt-1 text-xs text-muted-foreground">Tópicos que você ainda não concluiu — comece por aqui</p>
            <div className="mt-4 space-y-2">
              {nextTopics.map(t => (
                <Link key={t.id} to={`/app/subjects/${t.subjectId}`} className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/20 p-3 hover:bg-muted/40">
                  <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", t.subject.accent.iconBg)}>
                    <t.subject.icon className={cn("h-4 w-4", t.subject.accent.iconText)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.subject.name}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </Card>

          <Card title="Revisar — questões que errou" hover>
            <p className="mt-1 text-xs text-muted-foreground">Foque onde mais precisa — revisão espaçada</p>
            <div className="mt-4 space-y-2">
              {toReview.length === 0 ? (
                <div className="rounded-xl bg-emerald-500/10 p-4 text-center ring-1 ring-emerald-500/20">
                  <Award className="mx-auto h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <p className="mt-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">Nenhum erro pra revisar! 🎯</p>
                  <p className="mt-1 text-xs text-emerald-600/80 dark:text-emerald-400/80">Continue praticando para manter 100%</p>
                </div>
              ) : (
                toReview.map(q => {
                  const s = subjects.find(sub => sub.id === q.subjectId);
                  return (
                    <Link key={q.id} to="/app/questions" className="block rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 hover:bg-rose-500/10">
                      <p className="line-clamp-2 text-sm font-medium">{q.statement}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{s?.name} · {q.difficulty} · {q.source}</p>
                    </Link>
                  );
                })
              )}
            </div>
            {toReview.length > 0 && (
              <Button asChild size="sm" className="mt-4 h-8 w-full rounded-xl bg-gradient-to-br from-rose-600 to-orange-600">
                <Link to="/app/questions"><Brain className="h-4 w-4" /> Revisar {toReview.length} questões</Link>
              </Button>
            )}
          </Card>

          <Card>
            <div className="flex gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/20 dark:text-violet-400"><Sparkles className="h-4.5 w-4.5" /></div>
              <div>
                <p className="text-sm font-semibold">Dica do dia</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {progress.plannerTotal === 0
                    ? "Planeje 3 coisas para hoje: 1 tópico, 1 tarefa e 10 questões. Marcar no planner cria compromisso e aumenta 40% sua chance de concluir."
                    : progress.questionsDoneToday === 0
                    ? "Você já planejou hoje, mas ainda não praticou questões. 10 minutos de questões valem mais que 1h de leitura passiva."
                    : overallPct >= 80
                    ? "Você está voando hoje! 🚀 Finalize o planner e revise uma anotação antiga para fechar o dia com 100%."
                    : "Bom progresso! Foque no que falta do planner — cada item concluído libera dopamina e mantém o streak vivo."}
                </p>
              </div>
            </div>
          </Card>

          <Card hover title="Atalhos rápidos">
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link to="/app/subjects" className="flex items-center gap-2 rounded-xl border border-border/60 bg-card p-3 text-sm font-medium hover:bg-muted"><BookOpen className="h-4 w-4" /> Matérias</Link>
              <Link to="/app/questions" className="flex items-center gap-2 rounded-xl border border-border/60 bg-card p-3 text-sm font-medium hover:bg-muted"><Brain className="h-4 w-4" /> Questões</Link>
              <Link to="/app/mock-tests" className="flex items-center gap-2 rounded-xl border border-border/60 bg-card p-3 text-sm font-medium hover:bg-muted"><TrendingUp className="h-4 w-4" /> Simulados</Link>
              <Link to="/app/subjects/matematica" className="flex items-center gap-2 rounded-xl border border-border/60 bg-card p-3 text-sm font-medium hover:bg-muted"><Clock className="h-4 w-4" /> Estudar agora</Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Today;
