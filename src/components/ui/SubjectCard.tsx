import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import type { SubjectAccent } from "@/data/subjects";
import { cn } from "@/lib/utils";

type SubjectCardProps = {
  to?: string;
  title: string;
  icon: LucideIcon;
  accent: SubjectAccent;
  tasks: number;
  mockTests: number;
  progress: number;
};

function SubjectCard({ to, title, icon: Icon, accent, tasks, mockTests, progress }: SubjectCardProps) {
  const content = (
    <div className="group relative overflow-hidden rounded-[20px] border border-border/60 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.15)] hover:border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.02] to-fuchsia-500/[0.02] opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl ring-1 transition-transform group-hover:scale-105", accent.iconBg, accent.checkedBorder)}>
              <Icon className={cn("h-5 w-5", accent.iconText)} />
            </div>
            <div>
              <h3 className="font-semibold tracking-tight">{title}</h3>
              <p className="text-xs text-muted-foreground">Acompanhe seu desempenho</p>
            </div>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted/60 text-muted-foreground transition-all group-hover:bg-violet-500/10 group-hover:text-violet-600 dark:group-hover:text-violet-400">
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-muted/50 p-3 ring-1 ring-border/50">
            <p className="text-xl font-bold tracking-tight">{tasks}</p>
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Tarefas</p>
          </div>
          <div className="rounded-xl bg-muted/50 p-3 ring-1 ring-border/50">
            <p className="text-xl font-bold tracking-tight">{mockTests}</p>
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">Simulados</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex justify-between text-xs">
            <span className="font-medium text-muted-foreground">Progresso</span>
            <span className="font-bold tabular-nums">{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className={cn("h-full rounded-full transition-all duration-700", accent.bar)} style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );

  if (to) {
    return <Link to={to} className="block">{content}</Link>;
  }
  return content;
}

export default SubjectCard;
