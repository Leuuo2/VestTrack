import { AlertTriangle, ArrowUpRight, Lightbulb, Target, TrendingUp, Trophy } from "lucide-react";
import Card from "@/components/ui/Card";
import { subjects } from "@/data/subjects";
import { loadMockTests, overallScore, subjectAverage } from "@/data/mockTests";
import { loadTopics } from "@/data/subjects";
import { cn } from "@/lib/utils";

type Insight = {
  icon: React.ElementType;
  color: string;
  title: string;
  text: string;
};

function InsightsCard() {
  const tests = loadMockTests();
  const averages = subjects.map(s => ({
    subject: s,
    avg: subjectAverage(tests, s.id),
    progress: s.progress,
  }));

  const sortedByAvg = [...averages].sort((a,b) => b.avg - a.avg);
  const strongest = sortedByAvg[0];
  const weakest = [...sortedByAvg].reverse()[0];

  const progressSorted = [...averages].sort((a,b) => a.progress - b.progress);
  const leastProgress = progressSorted[0];

  const overallTrend = (() => {
    if (tests.length < 2) return null;
    const sorted = [...tests].sort((a,b) => a.date.localeCompare(b.date));
    const last = overallScore(sorted[sorted.length-1]);
    const prev = overallScore(sorted[sorted.length-2]);
    return last - prev;
  })();

  const topicsPending = subjects.reduce((acc, s) => {
    const t = loadTopics(s.id, s.topics).filter(x => !x.done).length;
    return acc + t;
  }, 0);

  const insights: Insight[] = [];

  if (strongest && strongest.avg > 0) {
    insights.push({
      icon: Trophy,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20",
      title: "Seu ponto forte",
      text: `${strongest.subject.name} está com ${strongest.avg}% de média — continue usando como âncora de confiança.`,
    });
  }

  if (weakest && weakest.avg > 0 && weakest.subject.id !== strongest?.subject.id) {
    insights.push({
      icon: Target,
      color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/20",
      title: "Foco de crescimento",
      text: `${weakest.subject.name} está em ${weakest.avg}% — 30 min extras por dia aqui podem subir +8% na média geral.`,
    });
  }

  if (overallTrend !== null) {
    insights.push({
      icon: TrendingUp,
      color: overallTrend >= 0 ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20" : "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20",
      title: overallTrend >= 0 ? "Em ascensão" : "Atenção na curva",
      text: overallTrend >= 0 ? `+${overallTrend}% vs último simulado — mantenha o ritmo, sua consistência está pagando.` : `${overallTrend}% vs último simulado — revise o que mudou e volte ao plano base.`,
    });
  }

  if (leastProgress) {
    insights.push({
      icon: AlertTriangle,
      color: "bg-violet-500/10 text-violet-600 dark:text-violet-400 ring-violet-500/20",
      title: "Tópico travado",
      text: `${leastProgress.subject.name} tem só ${leastProgress.progress}% de tópicos concluídos — próximo foco sugerido.`,
    });
  }

  if (topicsPending > 15) {
    insights.push({
      icon: Lightbulb,
      color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 ring-sky-500/20",
      title: "Estratégia",
      text: `Você tem ${topicsPending} tópicos pendentes. Divida em blocos de 3 por dia — em 5 dias você limpa o backlog.`,
    });
  }

  if (insights.length === 0) {
    insights.push({
      icon: Lightbulb,
      color: "bg-violet-500/10 text-violet-600 dark:text-violet-400 ring-violet-500/20",
      title: "Começando bem",
      text: "Registre seu primeiro simulado e marque alguns tópicos — o VestTrack vai gerar insights personalizados aqui.",
    });
  }

  return (
    <Card premium title="Insights inteligentes">
      <div className="mt-4 space-y-3">
        {insights.slice(0,4).map((ins, i) => {
          const Icon = ins.icon;
          return (
            <div key={i} className="group flex gap-3 rounded-xl border border-border/50 bg-muted/30 p-3.5 transition-colors hover:bg-muted/60 hover:border-border">
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1", ins.color)}>
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold tracking-tight flex items-center gap-1.5">{ins.title} <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" /></p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{ins.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default InsightsCard;
