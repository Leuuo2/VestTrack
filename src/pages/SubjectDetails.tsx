import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Circle,
  ClipboardList,
  Target,
  Sparkles,
  BookOpen,
  StickyNote,
  Calendar,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import StatCard from "@/components/ui/StatCard";
import SubjectTasks from "@/components/SubjectTasks";
import TopicNotes from "@/components/subject/TopicNotes";
import MaterialsList from "@/components/subject/MaterialsList";
import StudyPlanner from "@/components/subject/StudyPlanner";
import {
  getSubjectById,
  loadTopics,
  saveTopics,
  type Subject,
  type Topic,
} from "@/data/subjects";
import { DEFAULT_TASKS, loadTasks } from "@/data/tasks";
import {
  formatDate,
  loadMockTests,
  subjectAverage,
  subjectScores,
} from "@/data/mockTests";
import { loadNotes } from "@/data/subjectNotes";
import { loadMaterials } from "@/data/materials";
import { loadPlanner } from "@/data/planner";
import { cn } from "@/lib/utils";

function SubjectDetails() {
  const { id } = useParams<{ id: string }>();
  const subject = id ? getSubjectById(id) : undefined;
  if (!subject) return <Navigate to="/app/subjects" replace />;
  return <SubjectDetailsContent key={subject.id} subject={subject} />;
}

function SubjectDetailsContent({ subject }: { subject: Subject }) {
  const [topics, setTopics] = useState<Topic[]>(() => loadTopics(subject.id, subject.topics));
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [notesVersion, setNotesVersion] = useState(0);

  useEffect(() => {
    saveTopics(subject.id, topics);
  }, [subject.id, topics]);

  function toggleTopic(topicId: string) {
    setTopics(current => current.map(t => t.id === topicId ? { ...t, done: !t.done } : t));
  }

  const completedTopics = topics.filter(t => t.done).length;
  const topicsProgress = topics.length ? Math.round((completedTopics / topics.length) * 100) : 0;

  const tasks = loadTasks(subject.id, DEFAULT_TASKS[subject.id] ?? []);
  const doneTasks = tasks.filter(t => t.done).length;

  const scores = subjectScores(loadMockTests(), subject.id);
  const averageScore = subjectAverage(loadMockTests(), subject.id);
  const materialsCount = loadMaterials(subject.id).length;
  const plannerCount = loadPlanner(subject.id).length;
  const notes = loadNotes(subject.id);
  const notesCount = Object.keys(notes).length;

  const Icon = subject.icon;

  // insights
  const weakestTopic = topics.find(t => !t.done);

  return (
    <>
      <Link
        to="/app/subjects"
        className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Voltar para matérias
      </Link>

      {/* HERO */}
      <div className="relative mt-6 overflow-hidden rounded-[20px] border border-border/60 bg-card p-[1px] shadow-sm">
        <div className={cn("relative overflow-hidden rounded-[19px] p-6 md:p-7", subject.accent.iconBg)}>
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/20 blur-2xl dark:bg-white/5" />
          <div className="absolute -bottom-20 left-20 h-40 w-40 rounded-full bg-white/10 blur-xl dark:bg-white/5" />
          
          <div className="relative flex flex-wrap items-start justify-between gap-6">
            <div className="flex gap-4">
              <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl bg-card shadow-sm ring-1 ring-border/50")}>
                <Icon className={cn("h-7 w-7", subject.accent.iconText)} />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{subject.name}</h1>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">{subject.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 text-xs font-medium shadow-sm ring-1 ring-border/50">
                    <BookOpen className="h-3 w-3" /> {topics.length} tópicos
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 text-xs font-medium shadow-sm ring-1 ring-border/50">
                    <StickyNote className="h-3 w-3" /> {notesCount} anotações
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 text-xs font-medium shadow-sm ring-1 ring-border/50">
                    <Calendar className="h-3 w-3" /> {plannerCount} no planner
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="rounded-2xl bg-card px-4 py-3 shadow-sm ring-1 ring-border/50">
                <p className="text-xs text-muted-foreground">Progresso</p>
                <p className="text-xl font-bold">{topicsProgress}%</p>
                <div className="mt-1.5 h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                  <div className={cn("h-full rounded-full", subject.accent.bar)} style={{ width: `${topicsProgress}%` }} />
                </div>
              </div>
              <div className="rounded-2xl bg-card px-4 py-3 shadow-sm ring-1 ring-border/50">
                <p className="text-xs text-muted-foreground">Média</p>
                <p className="text-xl font-bold">{averageScore}%</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{scores.length} simulados</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Tarefas" value={`${doneTasks}/${tasks.length}`} description={`${tasks.length - doneTasks} pendentes`} icon={<ClipboardList />} accent="violet" />
        <StatCard title="Tópicos" value={`${completedTopics}/${topics.length}`} description={`${topicsProgress}% concluído`} icon={<Target />} accent="emerald" />
        <StatCard title="Média" value={`${averageScore}%`} description={scores.length ? `${scores.length} provas` : "sem provas ainda"} icon={<Award />} accent="amber" />
        <StatCard title="Materiais" value={materialsCount} description={`${notesCount} anotações`} icon={<BookOpen />} accent="fuchsia" />
      </div>

      {/* MAIN GRID */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* LEFT */}
        <div className="space-y-6">
          <Card premium title={`Tópicos de estudo — ${completedTopics}/${topics.length}`}>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Clique para anotar · marque para concluir</p>
              {weakestTopic && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400">
                  <Lightbulb className="h-3 w-3" /> Próximo: {weakestTopic.name}
                </span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              {topics.map(topic => {
                const hasNote = !!notes[topic.id];
                const isSelected = selectedTopic?.id === topic.id;
                return (
                  <div key={topic.id} className={cn("group rounded-xl border transition-all", isSelected ? "border-violet-500/30 bg-violet-500/5 shadow-sm" : "border-border/60 bg-card hover:border-border hover:shadow-sm")}>
                    <div className="flex items-center gap-2 p-2.5">
                      <button
                        type="button"
                        onClick={() => toggleTopic(topic.id)}
                        className="shrink-0 rounded-full p-1 transition-colors hover:bg-muted"
                      >
                        {topic.done ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Circle className="h-5 w-5 text-muted-foreground/30" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedTopic(isSelected ? null : topic)}
                        className="min-w-0 flex-1 text-left"
                      >
                        <span className={cn("text-sm font-medium", topic.done && "text-muted-foreground line-through")}>{topic.name}</span>
                        {hasNote && <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400"><StickyNote className="h-3 w-3" /> anotado</span>}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTopic(topic);
                          setNotesVersion(v => v + 1);
                        }}
                        className={cn("rounded-lg p-1.5 transition-all", hasNote ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "text-muted-foreground/50 hover:bg-muted hover:text-foreground", isSelected && "bg-violet-500/10 text-violet-600")}
                      >
                        <StickyNote className="h-4 w-4" />
                      </button>
                    </div>

                    {isSelected && (
                      <div className="border-t border-border/60 p-3">
                        <TopicNotes
                          key={`${topic.id}-${notesVersion}`}
                          subjectId={subject.id}
                          topicId={topic.id}
                          topicName={topic.name}
                          onClose={() => setSelectedTopic(null)}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-xl bg-muted/40 p-3 ring-1 ring-border/50">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-muted-foreground">Progresso dos tópicos</span>
                <span className="font-bold tabular-nums">{topicsProgress}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div className={cn("h-full rounded-full transition-all duration-700", subject.accent.bar)} style={{ width: `${topicsProgress}%` }} />
              </div>
            </div>
          </Card>

          <Card title="Tarefas da matéria" hover>
            <div className="mt-4">
              <SubjectTasks subjectId={subject.id} />
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <StudyPlanner subjectId={subject.id} />
          <MaterialsList subjectId={subject.id} />

          <Card title="Simulados recentes" hover>
            <div className="mt-4">
              {scores.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/60 bg-muted/20 p-6 text-center">
                  <BarChart3 className="mx-auto h-5 w-5 text-muted-foreground/50" />
                  <p className="mt-2 text-sm font-medium">Sem notas ainda</p>
                  <p className="mt-1 text-xs text-muted-foreground">Registre um simulado com {subject.name} para ver sua evolução aqui</p>
                  <Link to="/app/mock-tests" className="mt-3 inline-flex rounded-xl bg-violet-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-500">Ir para simulados</Link>
                </div>
              ) : (
                <ul className="space-y-2.5">
                  {scores.slice(0,4).map(score => (
                    <li key={score.id} className="flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-muted/20 p-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{score.name}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(score.date)}</p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                          <div className={cn("h-full rounded-full", subject.accent.bar)} style={{ width: `${score.score}%` }} />
                        </div>
                        <span className="w-9 text-right text-sm font-bold tabular-nums">{score.score}%</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>

          <Card premium>
            <div className="flex gap-2.5">
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", subject.accent.iconBg)}>
                <Sparkles className={cn("h-4.5 w-4.5", subject.accent.iconText)} />
              </div>
              <div>
                <p className="text-sm font-semibold">Dica de estudo para {subject.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {topicsProgress < 50
                    ? `Foque nos tópicos pendentes — marque 1 por dia e use as anotações para resumir com suas palavras. Em 2 semanas você dobra o progresso.`
                    : averageScore < 60
                    ? `Seu progresso está ótimo (${topicsProgress}%), mas a média nos simulados está em ${averageScore}%. Revise as anotações e refaça exercícios errados.`
                    : `Você está mandando bem! ${topicsProgress}% de tópicos + ${averageScore}% de média. Use o planner para manter a revisão espaçada e não esquecer.`}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default SubjectDetails;
