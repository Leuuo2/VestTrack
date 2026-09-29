import { BookOpen, Sparkles } from "lucide-react";
import { loadMockTests } from "@/data/mockTests";
import SubjectCard from "@/components/ui/SubjectCard";
import { subjects } from "@/data/subjects";
import { DEFAULT_TASKS, loadTasks } from "@/data/tasks";

function Subjects() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-600 dark:text-violet-400">
            <BookOpen className="h-3 w-3" /> {subjects.length} matérias · 150 tópicos
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Matérias</h1>
          <p className="text-sm text-muted-foreground">15 tópicos por matéria, progresso visual premium</p>
        </div>
        <div className="hidden items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 text-xs text-muted-foreground md:flex">
          <Sparkles className="h-3.5 w-3.5 text-violet-500" /> Clique para detalhes
        </div>
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:gap-5">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            to={`/app/subjects/${subject.id}`}
            title={subject.name}
            icon={subject.icon}
            accent={subject.accent}
            tasks={loadTasks(subject.id, DEFAULT_TASKS[subject.id] ?? []).filter(t => !t.done).length}
            mockTests={loadMockTests().filter(t => t.scores[subject.id] != null).length}
            progress={subject.progress}
          />
        ))}
      </div>
    </>
  );
}

export default Subjects;
