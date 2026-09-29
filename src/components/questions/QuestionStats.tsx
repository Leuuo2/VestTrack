import { Award, Clock, TrendingUp, BarChart3, Flame } from "lucide-react";
import Card from "@/components/ui/Card";
import { getStats, getStatsBySubject } from "@/data/questionAttempts";
import { subjects } from "@/data/subjects";
import { loadQuestions } from "@/data/questions";
import { cn } from "@/lib/utils";

function QuestionStats() {
  const stats = getStats();
  const questions = loadQuestions();
  const bySubject = getStatsBySubject(questions);

  if (!stats) {
    return (
      <Card title="Seu desempenho" className="border-dashed">
        <div className="py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <BarChart3 className="h-6 w-6" />
          </div>
          <p className="mt-4 text-sm font-medium">Nenhuma tentativa ainda</p>
          <p className="mx-auto mt-1 max-w-[32ch] text-sm text-muted-foreground">Responda questões para ver taxa de acerto, tempo médio e evolução.</p>
        </div>
      </Card>
    );
  }

  const sortedByAccuracy = [...bySubject].sort((a,b) => b.accuracy - a.accuracy);
  const strongest = sortedByAccuracy[0];
  const weakest = [...sortedByAccuracy].sort((a,b) => a.accuracy - b.accuracy)[0];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card premium title="Resumo geral">
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-muted/50 p-3 text-center ring-1 ring-border/50">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="mt-1 text-xl font-bold">{stats.total}</p>
          </div>
          <div className="rounded-xl bg-emerald-500/10 p-3 text-center ring-1 ring-emerald-500/20">
            <p className="text-xs text-emerald-600 dark:text-emerald-400">Acertos</p>
            <p className="mt-1 text-xl font-bold text-emerald-700 dark:text-emerald-300">{stats.correct}</p>
          </div>
          <div className="rounded-xl bg-violet-500/10 p-3 text-center ring-1 ring-violet-500/20">
            <p className="text-xs text-violet-600 dark:text-violet-400">Taxa</p>
            <p className="mt-1 text-xl font-bold text-violet-700 dark:text-violet-300">{stats.accuracy}%</p>
          </div>
        </div>

        <div className="mt-4 space-y-2.5">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Tempo médio:</span>
            <span className="font-medium">{stats.avgTime != null ? `${stats.avgTime}s` : "—"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-muted-foreground">Dias ativos:</span>
            <span className="font-medium">{Object.keys(stats.byDate).length}</span>
          </div>
          {strongest && (
            <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-violet-500/10 p-3 ring-1 ring-border/50">
              <p className="flex items-center gap-1.5 text-xs font-semibold"><Award className="h-3.5 w-3.5" /> Destaque</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Melhor: <span className="font-medium text-foreground">{subjects.find(s => s.id === strongest.subjectId)?.name}</span> com {strongest.accuracy}% ({strongest.correct}/{strongest.total})
                {weakest && weakest.subjectId !== strongest.subjectId && (
                  <> · Foco: <span className="font-medium text-foreground">{subjects.find(s => s.id === weakest.subjectId)?.name}</span> com {weakest.accuracy}%</>
                )}
              </p>
            </div>
          )}
        </div>
      </Card>

      <Card title="Desempenho por matéria">
        <div className="mt-4 space-y-2.5">
          {bySubject.length === 0 ? (
            <p className="text-sm text-muted-foreground">Responda questões de matérias diferentes para ver o comparativo.</p>
          ) : (
            bySubject
              .sort((a,b) => b.total - a.total)
              .map(item => {
                const subj = subjects.find(s => s.id === item.subjectId);
                if (!subj) return null;
                return (
                  <div key={item.subjectId} className="flex items-center gap-2.5">
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", subj.accent.iconBg)}>
                      <subj.icon className={cn("h-4 w-4", subj.accent.iconText)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="truncate text-xs font-medium">{subj.name}</span>
                        <span className="text-xs font-bold tabular-nums">{item.accuracy}% · {item.correct}/{item.total}</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className={cn("h-full rounded-full", subj.accent.bar)} style={{ width: `${item.accuracy}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>

        {bySubject.length > 0 && (
          <div className="mt-4 rounded-xl bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground ring-1 ring-border/50">
            <span className="flex items-center gap-1 font-medium text-foreground"><TrendingUp className="h-3 w-3" /> Insight</span>
            {(() => {
              const low = [...bySubject].sort((a,b) => a.accuracy - b.accuracy)[0];
              if (!low) return "Continue praticando!";
              const subj = subjects.find(s => s.id === low.subjectId);
              return `${subj?.name} está com ${low.accuracy}% — revise as explicações e refaça as que errou. Taxa acima de 80% indica domínio.`;
            })()}
          </div>
        )}
      </Card>
    </div>
  );
}

export default QuestionStats;
