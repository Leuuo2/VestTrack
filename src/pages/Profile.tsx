import { useState } from "react";
import {
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  ListChecks,
  Save,
  Trash2,
  Sparkles,
  User,
} from "lucide-react";
import Card from "@/components/ui/Card";
import StatCard from "@/components/ui/StatCard";
import { Button } from "@/components/ui/button";
import { completedTopicsCount, subjects } from "@/data/subjects";
import { loadMockTests } from "@/data/mockTests";
import { loadProfile, saveProfile, type StudentProfile } from "@/lib/profile";
import { resetAllData } from "@/lib/storage";

function Profile() {
  const [form, setForm] = useState<StudentProfile>(() => loadProfile());
  const [saved, setSaved] = useState(false);

  const mockTestsCount = loadMockTests().length;
  const completedTopics = completedTopicsCount();

  function handleSave() {
    saveProfile(form);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  function handleReset() {
    if (
      window.confirm(
        "Apagar todos os dados do VestTrack neste navegador? (tópicos concluídos, simulados registrados e perfil). Essa ação não pode ser desfeita.",
      )
    ) {
      resetAllData();
      window.location.reload();
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-600 dark:text-violet-400">
            <User className="h-3 w-3" /> Perfil do estudante
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
          <p className="text-sm text-muted-foreground">Seus dados, metas e preferências de estudo.</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Matérias" value={subjects.length} description="cadastradas" icon={<BookOpen />} accent="violet" />
        <StatCard title="Simulados" value={mockTestsCount} description="registrados" icon={<CalendarCheck />} accent="emerald" />
        <StatCard title="Tópicos" value={completedTopics} description="concluídos no total" icon={<ListChecks />} accent="amber" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card premium title="Dados do estudante">
          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="profile-name" className="block text-sm font-medium">Nome</label>
              <input
                id="profile-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-input bg-transparent px-3.5 py-2.5 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label htmlFor="profile-goal" className="block text-sm font-medium">Objetivo</label>
              <input
                id="profile-goal"
                value={form.goal}
                onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))}
                className="mt-1.5 w-full rounded-xl border border-input bg-transparent px-3.5 py-2.5 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Ex.: ENEM 2026 — Medicina"
              />
            </div>
            <div>
              <label htmlFor="profile-hours" className="block text-sm font-medium">Meta semanal de estudo (horas)</label>
              <input
                id="profile-hours"
                type="number"
                min={0}
                max={168}
                value={form.weeklyHours}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setForm((f) => ({ ...f, weeklyHours: Number.isNaN(value) ? 0 : value }));
                }}
                className="mt-1.5 w-full rounded-xl border border-input bg-transparent px-3.5 py-2.5 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <p className="mt-1.5 text-xs text-muted-foreground">Usada para calcular seu progresso e streak semanal.</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button onClick={handleSave} className="h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-[0_4px_12px_-2px_rgba(139,92,246,0.4)] hover:from-violet-500 hover:to-fuchsia-500">
                <Save className="h-4 w-4" /> Salvar
              </Button>
              {saved && (
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> Salvo!
                </span>
              )}
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card hover title="Sobre o VestTrack">
            <div className="mt-4 space-y-3">
              <div className="flex gap-2.5 rounded-xl bg-violet-500/10 p-3 ring-1 ring-violet-500/15">
                <Sparkles className="h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  O VestTrack centraliza matérias, tópicos, simulados e metas em um só lugar — feito para transformar rotina espalhada em progresso mensurável.
                </p>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Seus dados ficam salvos neste navegador — funciona sem cadastro. Crie uma conta opcional em “Sincronizar” para backup na nuvem e usar em outros dispositivos.
              </p>
            </div>
          </Card>

          <Card title="Zona de perigo">
            <div className="mt-4 space-y-3">
              <p className="text-sm text-muted-foreground">Remove tópicos concluídos, simulados registrados e os dados do perfil neste navegador. Não afeta a nuvem.</p>
              <Button variant="destructive" onClick={handleReset} className="h-10 rounded-xl">
                <Trash2 className="h-4 w-4" /> Apagar todos os dados locais
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Profile;
