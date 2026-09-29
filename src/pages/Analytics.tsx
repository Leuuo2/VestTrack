import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Clock, Brain, Target, Calendar, Award, Activity } from "lucide-react";
import Card from "@/components/ui/Card";
import { getAnalytics } from "@/data/analytics";

export default function Analytics() {
  const [data, setData] = useState<ReturnType<typeof getAnalytics> | null>(null);

  useEffect(() => {
    setData(getAnalytics());
  }, []);

  if (!data) return <div className="p-6 text-sm text-muted-foreground">Carregando analytics...</div>;

  const maxHeat = Math.max(...data.heatmap.map(h => h.count), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight">
          <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-violet-600" /> Analytics
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">Sua evolução detalhada</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Brain className="h-4 w-4" />
            <span className="text-xs">Total questões</span>
          </div>
          <p className="mt-1 text-xl font-bold">{data.totalAttempts}</p>
          <p className="text-[11px] text-muted-foreground">{data.totalCorrect} corretas • {data.overallAccuracy}%</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Target className="h-4 w-4" />
            <span className="text-xs">Taxa acerto</span>
          </div>
          <p className="mt-1 text-xl font-bold">{data.overallAccuracy}%</p>
          <p className={`text-[11px] ${data.weeklyGrowth >= 0 ? "text-emerald-600" : "text-red-500"}`}>{data.weeklyGrowth >= 0 ? "+" : ""}{data.weeklyGrowth}% semana</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Activity className="h-4 w-4" />
            <span className="text-xs">Esta semana</span>
          </div>
          <p className="mt-1 text-xl font-bold">{data.thisWeekAttempts}</p>
          <p className="text-[11px] text-muted-foreground">{data.lastWeekAttempts} passada</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-xs">Foco total</span>
          </div>
          <p className="mt-1 text-xl font-bold">{Math.floor(data.totalFocus / 60)}h {data.totalFocus % 60}m</p>
          <p className="text-[11px] text-muted-foreground">90 dias</p>
        </Card>
      </div>

      <Card className="p-4 md:p-6">
        <h3 className="flex items-center gap-2 font-medium text-sm"><TrendingUp className="h-4 w-4 text-violet-600" /> Evolução 30 dias</h3>
        <div className="mt-6 flex items-end gap-1 h-28">
          {data.last30Days.map(d => {
            const maxTotal = Math.max(...data.last30Days.map(x => x.total), 1);
            const h = d.total ? Math.max((d.total / maxTotal) * 100, 10) : 2;
            return (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-full max-w-[14px] rounded-t-md transition-all ${d.total ? "bg-violet-600" : "bg-muted"}`} style={{ height: `${h}%` }} title={`${d.date}: ${d.total}q ${d.accuracy}%`} />
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex justify-between text-[11px] text-muted-foreground">
          <span>{data.last30Days[0]?.date}</span>
          <span>{data.last30Days[29]?.date}</span>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-4 md:p-6">
          <h3 className="font-medium text-sm">Desempenho por matéria</h3>
          <div className="mt-4 space-y-3">
            {data.bySubject.slice(0, 8).map(s => (
              <div key={s.subject.id} className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold ${s.subject.accent.iconBg} ${s.subject.accent.iconText}`}>
                  {s.subject.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium truncate">{s.subject.name}</span>
                    <span className="text-muted-foreground">{s.accuracy}% • {s.total}q</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-violet-600" style={{ width: `${s.accuracy}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-4 md:p-6">
            <h3 className="font-medium text-sm flex items-center gap-2"><Award className="h-4 w-4" /> Simulados</h3>
            {data.mockEvolution.length === 0 ? (
              <p className="mt-3 text-xs text-muted-foreground">Nenhum simulado ainda. Adicione em Simulados.</p>
            ) : (
              <div className="mt-4 space-y-2">
                {data.mockEvolution.slice(-5).map((m, i, arr) => {
                  const prev = arr[i - 1];
                  const diff = prev ? m.score - prev.score : 0;
                  return (
                    <div key={m.name + m.date} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                      <div>
                        <p className="text-sm font-medium">{m.name}</p>
                        <p className="text-[11px] text-muted-foreground">{m.date}</p>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <span className="font-bold">{m.score}%</span>
                        {prev && <span className={`text-xs px-2 py-0.5 rounded-full ${diff >= 0 ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}`}>{diff >= 0 ? "+" : ""}{diff}%</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          <Card className="p-4 md:p-6">
            <h3 className="font-medium text-sm flex items-center gap-2"><Clock className="h-4 w-4" /> Quando estuda</h3>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: "Manhã", key: "manhã" },
                { label: "Tarde", key: "tarde" },
                { label: "Noite", key: "noite" },
              ].map(p => (
                <div key={p.key} className="rounded-xl bg-muted p-3 text-center">
                  <p className="text-xs text-muted-foreground">{p.label}</p>
                  <p className="mt-1 text-lg font-bold">{data.byPeriod[p.key] || 0}</p>
                  <p className="text-[11px] text-muted-foreground">questões</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-4 md:p-6">
        <h3 className="font-medium text-sm flex items-center gap-2"><Calendar className="h-4 w-4" /> Heatmap 90 dias</h3>
        <div className="mt-4 grid grid-cols-[repeat(18,1fr)] md:grid-cols-[repeat(30,1fr)] gap-1">
          {data.heatmap.map(h => {
            const intensity = h.count / maxHeat;
            return (
              <div key={h.date} title={`${h.date}: ${h.count} questões`} className={`aspect-square rounded-sm ${h.count === 0 ? "bg-muted" : intensity < 0.3 ? "bg-violet-200" : intensity < 0.6 ? "bg-violet-400" : intensity < 0.9 ? "bg-violet-600" : "bg-violet-800"}`} />
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>Menos</span>
          <div className="flex gap-1">
            <div className="h-3 w-3 rounded-sm bg-muted" />
            <div className="h-3 w-3 rounded-sm bg-violet-200" />
            <div className="h-3 w-3 rounded-sm bg-violet-400" />
            <div className="h-3 w-3 rounded-sm bg-violet-600" />
            <div className="h-3 w-3 rounded-sm bg-violet-800" />
          </div>
          <span>Mais</span>
        </div>
      </Card>
    </div>
  );
}
