import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Circle, Plus, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEFAULT_TASKS, loadTasks, saveTasks, type Task } from "@/data/tasks";
import { cn } from "@/lib/utils";

type SubjectTasksProps = {
  subjectId: string;
};

function SubjectTasks({ subjectId }: SubjectTasksProps) {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks(subjectId, DEFAULT_TASKS[subjectId] ?? []));
  const [title, setTitle] = useState("");

  useEffect(() => {
    saveTasks(subjectId, tasks);
  }, [subjectId, tasks]);

  function addTask(event: FormEvent) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setTasks(current => [...current, { id: `task-${Date.now()}`, title: trimmed, done: false }]);
    setTitle("");
  }

  function toggleTask(id: string) {
    setTasks(current => current.map(task => (task.id === id ? { ...task, done: !task.done } : task)));
  }

  function removeTask(id: string) {
    setTasks(current => current.filter(task => task.id !== id));
  }

  const done = tasks.filter(t => t.done).length;

  return (
    <div>
      <form onSubmit={addTask} className="flex gap-2">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Nova tarefa... Ex: Fazer 20 exercícios"
          aria-label="Nova tarefa"
          className="flex-1 rounded-xl border border-input bg-transparent px-3.5 py-2.5 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Button type="submit" size="sm" className="h-[42px] rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 px-4 shadow-[0_4px_12px_-2px_rgba(139,92,246,0.3)] hover:from-violet-500 hover:to-fuchsia-500">
          <Plus className="h-4 w-4" /> Adicionar
        </Button>
      </form>

      <ul className="mt-4 space-y-2">
        {tasks.map(task => (
          <li key={task.id} className={cn("group flex items-center gap-3 rounded-xl border p-2.5 transition-all", task.done ? "border-emerald-500/20 bg-emerald-500/5" : "border-border/60 bg-card hover:border-border hover:shadow-sm")}>
            <button type="button" onClick={() => toggleTask(task.id)} aria-label={task.done ? "Desmarcar tarefa" : "Concluir tarefa"} className="shrink-0 rounded-full p-1 hover:bg-muted">
              {task.done ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Circle className="h-5 w-5 text-muted-foreground/30" />}
            </button>
            <span className={cn("flex-1 truncate text-sm", task.done && "text-muted-foreground line-through")}>{task.title}</span>
            <button type="button" onClick={() => removeTask(task.id)} aria-label="Apagar tarefa" className="rounded-lg p-1.5 text-muted-foreground/50 opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100">
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-border/60 bg-muted/20 p-6 text-center">
          <Sparkles className="mx-auto h-5 w-5 text-violet-500/60" />
          <p className="mt-2 text-sm font-medium">Nenhuma tarefa ainda</p>
          <p className="text-xs text-muted-foreground">Adicione sua primeira tarefa de estudo para esta matéria</p>
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-between rounded-xl bg-muted/40 px-3 py-2 text-xs ring-1 ring-border/50">
          <span className="text-muted-foreground">{done} de {tasks.length} concluídas</span>
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${tasks.length ? (done / tasks.length) * 100 : 0}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SubjectTasks;
