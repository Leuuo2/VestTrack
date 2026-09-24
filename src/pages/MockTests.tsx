import { useEffect, useState, type FormEvent } from "react";
import {
  Award,
  CalendarDays,
  Gauge,
  Layers,
  Plus,
  Trash2,
  TrendingUp,
  X,
  BarChart3,
  Sparkles,
  Target,
} from "lucide-react";
import Card from "@/components/ui/Card";
import StatCard from "@/components/ui/StatCard";
import { Button } from "@/components/ui/button";
import { subjects } from "@/data/subjects";
import {
  formatDate,
  loadMockTests,
  overallScore,
  saveMockTests,
  subjectAverage,
  type MockTest,
} from "@/data/mockTests";
import ScoreTrendChart from "@/components/ScoreTrendChart";
import ExportActions from "@/components/analytics/ExportActions";
import { cn } from "@/lib/utils";

function MockTests() {
  const [tests, setTests] = useState<MockTest[]>(() => loadMockTests());
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    saveMockTests(tests);
  }, [tests]);

  const sorted = [...tests].sort((a, b) => b.date.localeCompare(a.date));
  const sortedAsc = [...tests].sort((a, b) => a.date.localeCompare(b.date));
  const overall = sorted.length
    ? Math.round(sorted.reduce((sum, t) => sum + overallScore(t), 0) / sorted.length)
    : 0;
  const best = sorted.length ? Math.max(...sorted.map(overallScore)) : 0;
  const [latest, previous] = sorted;
  const delta = latest && previous ? overallScore(latest) - overallScore(previous) : null;

  const consistency = (() => {
    if (sortedAsc.length < 3) return null;
    const scores = sortedAsc.map(overallScore);
    const avg = scores.reduce((a,b)=>a+b,0)/scores.length;
    const variance = scores.reduce((acc,s)=>acc+Math.pow(s-avg,2),0)/scores.length;
    const std = Math.sqrt(variance);
    return Math.max(0, Math.round(100 - std * 2));
  })();

  function addTest(test: MockTest) {
    setTests((current) => [...current, test]);
    setShowForm(false);
  }

  function removeTest(id: string, name: string) {
    if (window.confirm(`Excluir "${name}"? Essa ação não pode ser desfeita.`)) {
      setTests((current) => current.filter((t) => t.id !== id));
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-600 dark:text-violet-400">
            <BarChart3 className="h-3 w-3" /> Analytics de simulados
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Simulados</h1>
          <p className="text-sm text-muted-foreground">
            Registre suas provas, veja evolução, comparativos e exporte seus dados.
          </p>
        </div>
        <ExportActions />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Simulados" value={tests.length} description="registrados" icon={<Layers />} accent="violet" />
        <StatCard title="Média geral" value={`${overall}%`} description="em todos os simulados" icon={<Gauge />} accent="emerald" trend={delta != null ? { value: delta, label: "vs anterior" } : undefined} />
        <StatCard title="Melhor média" value={`${best}%`} description="no seu melhor dia" icon={<Award />} accent="amber" />
        <StatCard title="Consistência" value={consistency == null ? "—" : `${consistency}%`} description={consistency == null ? "faça 3 simulados" : "estabilidade nas notas"} icon={<Target />} accent="fuchsia" />
      </div>

      {tests.length >= 2 && (
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card premium className="lg:col-span-2" title="Evolução premium">
            <div className="mt-4">
              <ScoreTrendChart
                points={sortedAsc.map((t) => ({
                  label: t.name.length > 10 ? `${t.name.slice(0, 9)}…` : t.name,
                  value: overallScore(t),
                }))}
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl bg-muted/50 p-2.5">
                <p className="text-muted-foreground">Primeiro</p>
                <p className="mt-1 text-sm font-bold">{sortedAsc.length ? overallScore(sortedAsc[0]) : 0}%</p>
              </div>
              <div className="rounded-xl bg-violet-500/10 p-2.5 ring-1 ring-violet-500/20">
                <p className="text-violet-600 dark:text-violet-400">Média</p>
                <p className="mt-1 text-sm font-bold text-violet-700 dark:text-violet-300">{overall}%</p>
              </div>
              <div className="rounded-xl bg-emerald-500/10 p-2.5 ring-1 ring-emerald-500/20">
                <p className="text-emerald-600 dark:text-emerald-400">Melhor</p>
                <p className="mt-1 text-sm font-bold text-emerald-700 dark:text-emerald-300">{best}%</p>
              </div>
            </div>
          </Card>

          <Card title="Distribuição por matéria" className="overflow-hidden">
            <p className="mt-1 text-xs text-muted-foreground">Média de todas as provas</p>
            <div className="mt-4 space-y-2.5">
              {subjects
                .map(s => ({ subject: s, avg: subjectAverage(tests, s.id) }))
                .filter(x => x.avg > 0)
                .sort((a,b) => b.avg - a.avg)
                .slice(0,6)
                .map(({ subject, avg }) => (
                  <div key={subject.id} className="flex items-center gap-2.5">
                    <div className={cn("h-2 w-2 rounded-full", subject.accent.bar)} />
                    <span className="w-20 truncate text-xs font-medium">{subject.name}</span>
                    <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className={cn("h-full rounded-full", subject.accent.bar)} style={{ width: `${avg}%` }} />
                    </div>
                    <span className="w-8 text-right text-xs font-bold tabular-nums">{avg}%</span>
                  </div>
                ))}
            </div>
            {tests.length > 0 && (
              <div className="mt-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 p-3 ring-1 ring-violet-500/10">
                <p className="flex items-center gap-1.5 text-xs font-semibold"><Sparkles className="h-3 w-3" /> Insight</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {(() => {
                    const avgs = subjects.map(s => ({ s, avg: subjectAverage(tests, s.id) })).filter(x=>x.avg>0).sort((a,b)=>b.avg-a.avg);
                    if (avgs.length < 2) return "Continue registrando matérias para ver comparativos.";
                    return `${avgs[0].s.name} lidera com ${avgs[0].avg}% · ${avgs[avgs.length-1].s.name} precisa de atenção com ${avgs[avgs.length-1].avg}%`;
                  })()}
                </p>
              </div>
            )}
          </Card>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">
          Histórico {sorted.length > 0 && <span className="ml-2 rounded-full bg-muted px-2.5 py-0.5 text-sm font-medium">{sorted.length}</span>}
        </h2>
        <Button onClick={() => setShowForm((v) => !v)} className="h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-[0_4px_12px_-2px_rgba(139,92,246,0.4)] hover:from-violet-500 hover:to-fuchsia-500">
          {showForm ? (
            <>
              <X className="h-4 w-4" /> Fechar
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Novo simulado
            </>
          )}
        </Button>
      </div>

      {showForm && (
        <div className="mt-4">
          <NewMockTestForm
            existingCount={tests.length}
            onSubmit={addTest}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {sorted.map((test) => (
          <MockTestCard
            key={test.id}
            test={test}
            onRemove={() => removeTest(test.id, test.name)}
          />
        ))}
      </div>

      {sorted.length === 0 && (
        <Card className="mt-6 border-dashed">
          <div className="py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <TrendingUp className="h-6 w-6" />
            </div>
            <p className="mt-4 text-sm font-medium">Nenhum simulado registrado ainda</p>
            <p className="mx-auto mt-1 max-w-[32ch] text-sm text-muted-foreground">Clique em "Novo simulado" para começar e ver gráficos premium de evolução.</p>
          </div>
        </Card>
      )}
    </>
  );
}

type ScoreEntry = {
  included: boolean;
  value: number;
};

function NewMockTestForm({
  existingCount,
  onSubmit,
  onCancel,
}: {
  existingCount: number;
  onSubmit: (test: MockTest) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(`Simulado ${existingCount + 1}`);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [entries, setEntries] = useState<Record<string, ScoreEntry>>(() => {
    const latest = [...loadMockTests()].sort((a, b) => b.date.localeCompare(a.date))[0];
    return Object.fromEntries(
      subjects.map((s) => {
        const has = latest?.scores[s.id] != null;
        return [s.id, { included: latest ? has : true, value: latest?.scores[s.id] ?? 50 }];
      }),
    );
  });
  const [error, setError] = useState("");

  function setEntry(id: string, patch: Partial<ScoreEntry>) {
    setEntries((current) => ({
      ...current,
      [id]: { ...current[id], ...patch },
    }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!name.trim()) { setError("Dê um nome para o simulado."); return; }
    if (!date) { setError("Escolha a data do simulado."); return; }
    const scores: Record<string, number> = {};
    for (const subject of subjects) {
      if (entries[subject.id].included) scores[subject.id] = entries[subject.id].value;
    }
    if (Object.keys(scores).length === 0) { setError("Marque ao menos uma matéria que você fez."); return; }
    onSubmit({ id: `simulado-${Date.now()}`, name: name.trim(), date, scores });
  }

  return (
    <Card premium title="Registrar novo simulado">
      <form onSubmit={handleSubmit} className="mt-4 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="mock-name" className="block text-sm font-medium">Nome</label>
            <input id="mock-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 w-full rounded-xl border border-input bg-transparent px-3.5 py-2.5 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Simulado 15" />
          </div>
          <div>
            <label htmlFor="mock-date" className="block text-sm font-medium">Data</label>
            <input id="mock-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1.5 w-full rounded-xl border border-input bg-transparent px-3.5 py-2.5 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium">Notas por matéria</p>
          <p className="text-xs text-muted-foreground mt-1">Marque as matérias que você fez e arraste o controle até a nota (0 a 100).</p>
          <div className="mt-3 grid gap-2.5 lg:grid-cols-2">
            {subjects.map((subject) => {
              const entry = entries[subject.id];
              return (
                <label key={subject.id} className={cn("group flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 transition-all", entry.included ? cn(subject.accent.iconBg, subject.accent.checkedBorder, "shadow-sm") : "border-border/60 hover:bg-muted/40 hover:border-border")}>
                  <input type="checkbox" checked={entry.included} onChange={(e) => setEntry(subject.id, { included: e.target.checked })} aria-label={`Incluir ${subject.name}`} className={cn("h-5 w-5 shrink-0 cursor-pointer rounded-md", subject.accent.checkbox)} />
                  <span className={cn("w-24 truncate text-sm sm:w-28", entry.included ? "font-medium" : "text-muted-foreground")}>{subject.name}</span>
                  <input type="range" min={0} max={100} step={1} value={entry.value} disabled={!entry.included} onChange={(e) => setEntry(subject.id, { value: Number(e.target.value) })} aria-label={`Nota de ${subject.name}`} className={cn("flex-1 accent-primary", entry.included ? "cursor-pointer" : "cursor-not-allowed opacity-40")} />
                  <span className="w-10 text-right text-sm font-bold tabular-nums">{entry.included ? entry.value : "—"}</span>
                </label>
              );
            })}
          </div>
        </div>

        {error && <p className="rounded-xl bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive ring-1 ring-destructive/20">{error}</p>}

        <div className="flex gap-2">
          <Button type="submit" className="h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-[0_4px_12px_-2px_rgba(139,92,246,0.4)]"><Plus className="h-4 w-4" /> Salvar simulado</Button>
          <Button type="button" variant="ghost" onClick={onCancel} className="h-10 rounded-xl">Cancelar</Button>
        </div>
      </form>
    </Card>
  );
}

function MockTestCard({ test, onRemove }: { test: MockTest; onRemove: () => void }) {
  const entries = subjects.filter((subject) => test.scores[subject.id] != null);

  return (
    <Card hover title={test.name}>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4" />{formatDate(test.date)}</p>
        <Button variant="ghost" size="icon-sm" onClick={onRemove} aria-label={`Excluir ${test.name}`} className="rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {entries.map((subject) => (
          <div key={subject.id} className="group rounded-xl border border-border/50 bg-muted/30 p-3 transition-colors hover:bg-muted/60">
            <div className="mb-2 flex items-center justify-between gap-2 text-xs">
              <span className="truncate text-muted-foreground group-hover:text-foreground">{subject.name}</span>
              <span className="font-bold tabular-nums">{test.scores[subject.id]}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div className={cn("h-full rounded-full transition-all duration-700", subject.accent.bar)} style={{ width: `${test.scores[subject.id]}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-muted/50 px-3.5 py-2.5 text-sm ring-1 ring-border/50">
        <span className="text-muted-foreground">Média geral</span>
        <span className="text-base font-bold">{overallScore(test)}%</span>
      </div>
    </Card>
  );
}

export default MockTests;
