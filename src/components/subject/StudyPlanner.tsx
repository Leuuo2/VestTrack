import { useState } from "react";
import { Plus, CheckCircle2, Circle, Trash2, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import { loadPlanner, savePlanner, getWeekDays, type PlannerEvent, type PlannerType } from "@/data/planner";
import { cn } from "@/lib/utils";

const TYPE_STYLES: Record<PlannerType, { label: string; color: string; dot: string }> = {
  estudo: { label: "Estudo", color: "bg-violet-500/10 text-violet-600 dark:text-violet-400 ring-violet-500/20", dot: "bg-violet-500" },
  revisao: { label: "Revisão", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20", dot: "bg-amber-500" },
  simulado: { label: "Simulado", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20", dot: "bg-emerald-500" },
  descanso: { label: "Descanso", color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 ring-sky-500/20", dot: "bg-sky-500" },
};

function StudyPlanner({ subjectId }: { subjectId: string }) {
  const [events, setEvents] = useState<PlannerEvent[]>(() => loadPlanner(subjectId));
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [type, setType] = useState<PlannerType>("estudo");
  const [showForm, setShowForm] = useState(false);

  const weekDays = getWeekDays();

  function persist(next: PlannerEvent[]) {
    setEvents(next);
    savePlanner(subjectId, next);
  }

  function addEvent() {
    if (!title.trim()) return;
    const ev: PlannerEvent = {
      id: `plan-${Date.now()}`,
      title: title.trim(),
      date,
      type,
      done: false,
    };
    persist([...events, ev].sort((a,b) => a.date.localeCompare(b.date)));
    setTitle("");
    setShowForm(false);
  }

  function toggle(id: string) {
    persist(events.map(e => e.id === id ? { ...e, done: !e.done } : e));
  }

  function remove(id: string) {
    persist(events.filter(e => e.id !== id));
  }

  const eventsByDate = weekDays.map(d => ({
    ...d,
    events: events.filter(e => e.date === d.date),
  }));

  const todayStr = new Date().toISOString().slice(0, 10);

  return (
    <Card title="Planner semanal" premium>
      <p className="mt-1 text-xs text-muted-foreground">Planeje o que estudar cada dia — visão de semana</p>

      <div className="mt-4">
        <div className="grid grid-cols-7 gap-1.5">
          {eventsByDate.map(day => {
            const isToday = day.date === todayStr;
            const hasEvents = day.events.length > 0;
            return (
              <div
                key={day.date}
                className={cn(
                  "rounded-xl border p-2 text-center transition-all",
                  isToday ? "border-violet-500/30 bg-violet-500/10 ring-1 ring-violet-500/20" : "border-border/60 bg-card",
                  hasEvents && !isToday && "bg-muted/30"
                )}
              >
                <p className={cn("text-[10px] font-medium uppercase", isToday ? "text-violet-600 dark:text-violet-400" : "text-muted-foreground")}>{day.dayName}</p>
                <p className={cn("mt-1 text-sm font-bold", isToday && "text-violet-700 dark:text-violet-300")}>{day.label}</p>
                <div className="mt-1.5 flex justify-center gap-0.5">
                  {day.events.slice(0,3).map(ev => (
                    <span key={ev.id} className={cn("h-1.5 w-1.5 rounded-full", TYPE_STYLES[ev.type].dot)} />
                  ))}
                  {day.events.length > 3 && <span className="text-[8px] text-muted-foreground">+{day.events.length - 3}</span>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowForm(v => !v)} className="h-8 rounded-xl">
            <Plus className="h-4 w-4" /> {showForm ? "Fechar" : "Planejar"}
          </Button>
          <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> Semana atual</span>
        </div>

        {showForm && (
          <div className="mt-4 rounded-xl border border-border/60 bg-muted/20 p-4">
            <div className="grid gap-3">
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="O que vai estudar? Ex: Revisar funções"
                className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <select
                  value={type}
                  onChange={e => setType(e.target.value as PlannerType)}
                  className="rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="estudo">📚 Estudo</option>
                  <option value="revisao">🔁 Revisão</option>
                  <option value="simulado">📝 Simulado</option>
                  <option value="descanso">☕ Descanso</option>
                </select>
              </div>
              <Button onClick={addEvent} size="sm" className="h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600">
                <Plus className="h-4 w-4" /> Adicionar ao planner
              </Button>
            </div>
          </div>
        )}

        <div className="mt-5 space-y-2">
          {events.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/60 bg-muted/20 p-5 text-center">
              <Clock className="mx-auto h-5 w-5 text-muted-foreground/50" />
              <p className="mt-2 text-sm font-medium">Sem planos ainda</p>
              <p className="mt-1 text-xs text-muted-foreground">Planeje sua semana e veja tudo no calendário acima</p>
            </div>
          ) : (
            events
              .slice()
              .sort((a,b) => a.date.localeCompare(b.date))
              .slice(0, 6)
              .map(ev => (
                <div key={ev.id} className={cn("group flex items-center gap-3 rounded-xl border p-3 transition-all", ev.done ? "border-emerald-500/20 bg-emerald-500/5" : "border-border/60 bg-card hover:border-border")}>
                  <button onClick={() => toggle(ev.id)} className="shrink-0">
                    {ev.done ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Circle className="h-5 w-5 text-muted-foreground/30" />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className={cn("truncate text-sm font-medium", ev.done && "line-through text-muted-foreground")}>{ev.title}</p>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className={cn("inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-medium ring-1", TYPE_STYLES[ev.type].color)}>{TYPE_STYLES[ev.type].label}</span>
                      {new Date(ev.date + "T12:00:00").toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <button onClick={() => remove(ev.id)} className="rounded-lg p-1.5 text-muted-foreground/60 opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
          )}
          {events.length > 6 && <p className="text-xs text-muted-foreground">+{events.length - 6} eventos planejados · role para ver todos</p>}
        </div>
      </div>
    </Card>
  );
}

export default StudyPlanner;
