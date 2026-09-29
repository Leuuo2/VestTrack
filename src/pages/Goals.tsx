import { useState, useEffect } from "react";
import { Target, Flame, Trophy, Plus, Trash2, CheckCircle2, Calendar, Zap, BookOpen, Brain, Timer, Layers } from "lucide-react";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { loadGoals, saveGoals, getStreakStats, addCustomGoal, removeGoal, type Goal } from "@/data/goals";
import { addXp } from "@/data/achievements";

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>(loadGoals());
  const [stats, setStats] = useState(getStreakStats());
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<Goal["type"]>("questions");
  const [newTarget, setNewTarget] = useState(10);
  const [newPeriod, setNewPeriod] = useState<Goal["period"]>("daily");

  useEffect(() => {
    setGoals(loadGoals());
    setStats(getStreakStats());
  }, []);

  const handleAdd = () => {
    if (!newTitle.trim() || newTarget <= 0) return;
    addCustomGoal(newTitle, newType, newTarget, newPeriod);
    setGoals(loadGoals());
    setNewTitle("");
    setShowAdd(false);
    addXp(10);
  };

  const handleRemove = (id: string) => {
    removeGoal(id);
    setGoals(loadGoals());
  };

  const handleComplete = (id: string) => {
    const updated = goals.map(g => {
      if (g.id === id && g.current < g.target) {
        return { ...g, current: g.target, completedAt: new Date().toISOString() };
      }
      return g;
    });
    saveGoals(updated);
    setGoals(updated);
    addXp(20);
  };

  const dailyGoals = goals.filter(g => g.period === "daily");
  const weeklyGoals = goals.filter(g => g.period === "weekly");
  const monthlyGoals = goals.filter(g => g.period === "monthly");
  const completionRate = goals.length ? Math.round((goals.filter(g => g.current >= g.target).length / goals.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight">
            <Target className="h-5 w-5 md:h-6 md:w-6 text-violet-600" /> Metas & Streaks
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">Defina metas e mantenha a constância</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} size="sm" className="gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" /> Nova meta
        </Button>
      </div>

      <Card className="p-0 overflow-hidden border-0 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white">
        <div className="p-5 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                <Flame className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm opacity-80">Sequência atual</p>
                <p className="text-3xl md:text-4xl font-bold">{stats.streak.currentStreak} dias</p>
                <p className="text-xs opacity-80 mt-1">Recorde: {stats.streak.longestStreak} dias • {stats.totalQuestions30} questões nos últimos 30d</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur text-center min-w-[80px]">
                <p className="text-2xl font-bold">{stats.totalXp30}</p>
                <p className="text-[11px] opacity-80">XP 30d</p>
              </div>
              <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur text-center min-w-[80px]">
                <p className="text-2xl font-bold">{completionRate}%</p>
                <p className="text-[11px] opacity-80">Metas</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-xs opacity-80 mb-2 flex items-center gap-1"><Calendar className="h-3 w-3" /> Últimos 7 dias</p>
            <div className="grid grid-cols-7 gap-2">
              {stats.last7.map((day, idx) => {
                const hasActivity = (day.total || 0) > 0;
                const intensity = day.total ? Math.min(day.total / 10, 1) : 0;
                return (
                  <div key={idx} className="text-center">
                    <div className={`h-10 w-full rounded-xl transition-all flex items-center justify-center text-xs font-bold ${hasActivity ? "bg-white text-orange-600 shadow" : "bg-white/20 text-white/60"}`} style={{ opacity: hasActivity ? 0.6 + intensity * 0.4 : 1 }}>
                      {hasActivity ? "✓" : ""}
                    </div>
                    <span className="mt-1 block text-[10px] opacity-70">{new Date(day.date).toLocaleDateString("pt-BR", { weekday: "narrow" })}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {showAdd && (
        <Card className="p-4 space-y-3">
          <h3 className="font-medium text-sm">Nova meta personalizada</h3>
          <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Ex: 15 questões de matemática" className="w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-500/20" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <select value={newType} onChange={e => setNewType(e.target.value as Goal["type"])} className="rounded-xl border bg-background px-3 py-2.5 text-sm">
              <option value="questions">Questões</option>
              <option value="topics">Tópicos</option>
              <option value="flashcards">Flashcards</option>
              <option value="focus">Minutos foco</option>
              <option value="custom">Custom</option>
            </select>
            <select value={newPeriod} onChange={e => setNewPeriod(e.target.value as Goal["period"])} className="rounded-xl border bg-background px-3 py-2.5 text-sm">
              <option value="daily">Diária</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensal</option>
            </select>
            <input type="number" value={newTarget} onChange={e => setNewTarget(Number(e.target.value))} min={1} placeholder="Meta" className="rounded-xl border bg-background px-3 py-2.5 text-sm" />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAdd} size="sm">Salvar</Button>
            <Button onClick={() => setShowAdd(false)} variant="outline" size="sm">Cancelar</Button>
          </div>
        </Card>
      )}

      <div>
        <h3 className="mb-3 flex items-center gap-2 font-medium text-sm"><Zap className="h-4 w-4 text-amber-500" /> Hoje</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {dailyGoals.map(goal => <GoalCard key={goal.id} goal={goal} onComplete={handleComplete} onRemove={handleRemove} />)}
        </div>
      </div>

      {weeklyGoals.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-medium text-sm"><Trophy className="h-4 w-4 text-violet-500" /> Esta semana</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {weeklyGoals.map(goal => <GoalCard key={goal.id} goal={goal} onComplete={handleComplete} onRemove={handleRemove} />)}
          </div>
        </div>
      )}

      {monthlyGoals.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-medium text-sm"><Calendar className="h-4 w-4 text-emerald-500" /> Este mês</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {monthlyGoals.map(goal => <GoalCard key={goal.id} goal={goal} onComplete={handleComplete} onRemove={handleRemove} />)}
          </div>
        </div>
      )}

      <Card className="p-4 bg-violet-500/5 border-violet-500/20">
        <p className="text-sm font-medium">💡 Como manter streak?</p>
        <ul className="mt-2 text-xs text-muted-foreground space-y-1 list-disc pl-4">
          <li>Faça pelo menos 1 atividade por dia (questão, tópico ou flashcard)</li>
          <li>Metas diárias resetam à meia-noite — complete antes!</li>
          <li>Ganhe +20 XP ao completar meta manualmente</li>
          <li>Seu recorde fica salvo mesmo se quebrar a sequência</li>
        </ul>
      </Card>
    </div>
  );
}

function GoalCard({ goal, onComplete, onRemove }: { goal: Goal; onComplete: (id: string) => void; onRemove: (id: string) => void }) {
  const progress = goal.target > 0 ? Math.min((goal.current / goal.target) * 100, 100) : 0;
  const isDone = goal.current >= goal.target;
  const Icon = goal.type === "questions" ? Brain : goal.type === "topics" ? BookOpen : goal.type === "flashcards" ? Layers : goal.type === "focus" ? Timer : Target;

  return (
    <Card className={`p-4 transition-all ${isDone ? "bg-emerald-500/5 ring-1 ring-emerald-500/20" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3 min-w-0 flex-1">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${isDone ? "bg-emerald-500 text-white" : "bg-violet-500/10 text-violet-600"}`}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{goal.title}</p>
            <p className="text-[11px] text-muted-foreground capitalize">{goal.type} • {goal.period === "daily" ? "diária" : goal.period === "weekly" ? "semanal" : "mensal"}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div className={`h-full rounded-full transition-all ${isDone ? "bg-emerald-500" : "bg-violet-600"}`} style={{ width: `${progress}%` }} />
              </div>
              <span className="text-[11px] text-muted-foreground">{goal.current}/{goal.target}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {!isDone && (
            <Button onClick={() => onComplete(goal.id)} variant="ghost" size="sm" className="h-7 w-7 p-0">
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
          {isDone && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
          {!goal.id.startsWith("daily-") && (
            <Button onClick={() => onRemove(goal.id)} variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-red-500">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
