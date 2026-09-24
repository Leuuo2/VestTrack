import { BookOpen, Sparkles } from "lucide-react";
import { loadMockTests } from "@/data/mockTests";
import SubjectCard from "@/components/ui/SubjectCard";
import { subjects } from "@/data/subjects";
import { DEFAULT_TASKS, loadTasks } from "@/data/tasks";

function Subjects() {
  const mockTests = loadMockTests();
  const totalPending = subjects.reduce((acc, s) => acc + loadTasks(s.id, DEFAULT_TASKS[s.id] ?? []).filter(t => !t.done).length, 0);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-600 dark:text-violet-400">
            <BookOpen className="h-3 w-3" /> {subjects.length} matérias · {totalPending} tarefas pendentes
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Matérias</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas tarefas e simulados por matéria — tudo com progresso visual premium.
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 text-xs text-muted-foreground md:flex">
          <Sparkles className="h-3.5 w-3.5 text-violet-500" /> Clique em uma matéria para detalhes e analytics
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            to={`/app/subjects/${subject.id}`}
            title={subject.name}
            icon={subject.icon}
            accent={subject.accent}
            tasks={loadTasks(subject.id, DEFAULT_TASKS[subject.id] ?? []).filter((t) => !t.done).length}
            progress={subject.progress}
            mockTests={mockTests.filter((t) => t.scores[subject.id] != null).length}
          />
        ))}
      </div>
    </>
  );
}

export default Subjects;
