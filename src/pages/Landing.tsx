import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  ListChecks,
  Moon,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Zap,
  Users,
  FileSpreadsheet,
  NotebookPen,
  X,
  Clock,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/common/Logo";
import heroImage from "@/assets/landing-hero.webp";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: BookOpen,
    color: "bg-violet-500/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400 ring-violet-500/20",
    title: "10 matérias organizadas",
    text: "Matemática, redação, ciências e humanas — cada uma com seus tópicos e progresso visual.",
  },
  {
    icon: BarChart3,
    color: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400 ring-emerald-500/20",
    title: "Analytics premium",
    text: "Evolução em gráfico, comparativo por matéria, insights automáticos e exportação CSV.",
  },
  {
    icon: ListChecks,
    color: "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400 ring-amber-500/20",
    title: "Tarefas por matéria",
    text: "Adicione, conclua e sincronize — o painel mostra exatamente o que falta fazer.",
  },
  {
    icon: Target,
    color: "bg-fuchsia-500/10 text-fuchsia-600 dark:bg-fuchsia-400/10 dark:text-fuchsia-400 ring-fuchsia-500/20",
    title: "Metas e constância",
    text: "Streak de estudos, meta semanal, calendário de atividade e próximo foco inteligente.",
  },
  {
    icon: Sparkles,
    color: "bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400 ring-sky-500/20",
    title: "Insights que importam",
    text: "Seu ponto forte, matéria em desenvolvimento e sugestões práticas — sem achismo.",
  },
  {
    icon: ShieldCheck,
    color: "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400 ring-indigo-500/20",
    title: "Nuvem opcional",
    text: "Funciona 100% offline. Crie conta quando quiser e leve seus dados para qualquer dispositivo.",
  },
];

const steps = [
  {
    n: "01",
    title: "Monte seu perfil",
    text: "Nome, objetivo e meta semanal em 30 segundos — sem cadastro obrigatório.",
    icon: Users,
  },
  {
    n: "02",
    title: "Registre sua rotina",
    text: "Simulados com notas por matéria, tarefas e tópicos concluídos, tudo em um só lugar.",
    icon: NotebookPen,
  },
  {
    n: "03",
    title: "Acompanhe a evolução",
    text: "Gráficos premium, médias, insights e exportação — progresso que dá para medir e mostrar.",
    icon: TrendingUp,
  },
];

function Landing() {
  return (
    <div className="relative overflow-x-clip bg-background">
      {/* Background glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-transparent blur-[80px]" />
      <div className="pointer-events-none absolute top-[32rem] -right-32 h-[28rem] w-[28rem] rounded-full bg-violet-500/10 blur-[60px]" />
      <div className="pointer-events-none absolute top-[80rem] -left-32 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/10 blur-[60px]" />

      {/* Grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-[0.03] dark:opacity-[0.05]" />

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-[64px] max-w-6xl items-center justify-between px-6">
          <Logo to="/" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild className="h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 px-4 shadow-[0_4px_12px_-2px_rgba(139,92,246,0.4)] hover:from-violet-500 hover:to-fuchsia-500">
              <Link to="/app">Entrar</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-14 md:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600 ring-1 ring-violet-500/10 dark:text-violet-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
                </span>
                <Rocket className="h-3.5 w-3.5" />
                Novo: analytics premium + exportação
              </span>

              <h1 className="mt-6 text-[2.5rem] font-bold leading-[0.95] tracking-[-0.02em] md:text-[3.75rem]">
                Transforme sua rotina de estudos em
                <span className="relative ml-2 inline-block">
                  <span className="relative bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    progresso real
                  </span>
                  <span className="absolute -bottom-1 left-0 h-[6px] w-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 blur-[1px]" />
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
                O VestTrack centraliza matérias, tópicos, tarefas e simulados em um único painel premium.
                Pare de estudar no escuro e comece a medir cada ponto que você ganha — com gráficos que impressionam.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="h-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 px-7 text-[15px] shadow-[0_8px_20px_-4px_rgba(139,92,246,0.5)] hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-[0_10px_24px_-4px_rgba(139,92,246,0.6)]">
                  <Link to="/app">
                    Começar agora <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-xl border-border/70 bg-card px-6 text-[15px] hover:bg-muted">
                  <a href="#como-funciona">Como funciona</a>
                </Button>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {["Grátis para sempre", "Funciona sem cadastro", "Sincronize na nuvem"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    </span>
                    {item}
                  </span>
                ))}
              </div>

              {/* Mini stats */}
              <div className="mt-10 grid max-w-md grid-cols-3 gap-3">
                {[
                  { v: "10", l: "matérias" },
                  { v: "50+", l: "tópicos" },
                  { v: "100%", l: "offline" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl border border-border/60 bg-card/60 p-3.5 backdrop-blur">
                    <p className="text-xl font-bold tracking-tight">{s.v}</p>
                    <p className="text-xs text-muted-foreground">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:h-[560px]">
              <div className="absolute inset-0 -z-10 scale-90 rounded-[32px] bg-gradient-to-br from-violet-500/20 via-fuchsia-500/15 to-violet-500/10 blur-2xl" />
              
              <div className="relative">
                <img
                  src={heroImage}
                  alt="Painel do VestTrack com gráficos e progresso de estudos"
                  className="w-full rounded-[20px] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3),0_0_0_1px_rgba(0,0,0,0.05)] ring-1 ring-border/50"
                />

                {/* Floating cards */}
                <div className="absolute -left-4 top-[12%] hidden animate-[float_6s_ease-in-out_infinite] rounded-2xl border border-border/60 bg-card/90 p-3 shadow-xl backdrop-blur-xl md:flex">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Média geral</p>
                      <p className="text-sm font-bold">78% · +5%</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-3 top-[42%] hidden animate-[float_6s_ease-in-out_1s_infinite] rounded-2xl border border-border/60 bg-card/90 p-3 shadow-xl backdrop-blur-xl md:flex">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/20 dark:text-violet-400">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Tópicos</p>
                      <p className="text-sm font-bold">32/50 concluídos</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-6 bottom-[14%] hidden animate-[float_6s_ease-in-out_2s_infinite] rounded-2xl border border-border/60 bg-card/90 p-3 shadow-xl backdrop-blur-xl md:flex">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Streak</p>
                      <p className="text-sm font-bold">12 dias 🔥</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="recursos" className="relative border-t border-border/60 bg-muted/20 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium">
                <Zap className="h-3.5 w-3.5 text-violet-600" /> Tudo que você precisa
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Feito para quem quer <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">gabaritar de verdade</span>
              </h2>
              <p className="mt-3 text-muted-foreground">
                Menos apps, menos planilhas, menos caos. Um painel premium para a sua preparação — do jeito que os toppers estudam.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group relative rounded-[20px] border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(139,92,246,0.2)] hover:border-violet-500/20"
                  >
                    <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-violet-500/[0.03] to-fuchsia-500/[0.03] opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative">
                      <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl ring-1 transition-transform group-hover:scale-105", feature.color)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-semibold tracking-tight">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[20px] border border-border/60 bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <FileSpreadsheet className="h-4 w-4" /> Método antigo
              </div>
              <h3 className="mt-3 text-xl font-semibold">Planilha + caderno + 5 apps</h3>
              <ul className="mt-5 space-y-3">
                {[
                  "Notas perdidas em prints e rascunhos",
                  "Sem visão de evolução real",
                  "Sem comparativo por matéria",
                  "Motivação some em 2 semanas",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/10 ring-1 ring-rose-500/20"><X className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" /></span>{t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-[20px] border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.06] via-card to-fuchsia-500/[0.06] p-6 shadow-[0_8px_32px_-16px_rgba(139,92,246,0.3)]">
              <div className="flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-violet-400">
                <Sparkles className="h-4 w-4" /> VestTrack premium
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">Tudo em um painel que motiva</h3>
              <ul className="mt-5 space-y-3">
                {[
                  "Dashboard com prontidão geral e próximo foco",
                  "Gráficos premium de evolução + insights automáticos",
                  "Comparativo por matéria e exportação CSV",
                  "Streak, metas e sincronização na nuvem",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-sm">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /></span>{t}
                  </li>
                ))}
              </ul>
              <div className="absolute -right-6 -top-6 hidden h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg md:flex">✓</div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="como-funciona" className="border-y border-border/60 bg-muted/20 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Como funciona</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Três passos e a sua preparação vira um plano com dados de verdade.</p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.n} className="group relative rounded-[20px] border border-border/60 bg-card p-7 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-lg font-bold text-white shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-105">
                        {step.n}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-violet-600 via-violet-500 to-fuchsia-500 p-[1px] shadow-[0_20px_60px_-20px_rgba(139,92,246,0.6)]">
            <div className="relative overflow-hidden rounded-[27px] bg-gradient-to-br from-violet-600 via-violet-500 to-fuchsia-500 px-8 py-16 text-center text-white md:px-12 md:py-20">
              <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl" />

              <div className="relative">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-5xl">
                  Pronto para gabaritar?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-white/85">
                  Entre agora, configure seu perfil em 30 segundos e veja sua evolução aparecer no painel premium.
                  Grátis, sem pegadinhas, com exportação e nuvem opcional.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button asChild variant="secondary" className="h-12 rounded-xl bg-white px-8 text-base font-semibold text-violet-700 shadow-lg hover:bg-white/90">
                    <Link to="/app">
                      Começar agora <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="h-12 rounded-xl border border-white/20 bg-white/10 px-6 text-white backdrop-blur hover:bg-white/15 hover:text-white">
                    <a href="#recursos">Ver recursos</a>
                  </Button>
                </div>
                <p className="mt-6 text-xs text-white/60">React · TypeScript · Vite · Tailwind · Supabase · 100% offline-first</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
          <p>
            <span className="font-semibold text-foreground">VestTrack</span> — organize seus estudos, gabarite sua prova.
          </p>
          <p className="flex items-center gap-2"><Moon className="h-4 w-4" /> Tema claro & escuro · Feito com 💜 no Brasil</p>
          <p>© 2026 VestTrack</p>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

export default Landing;
