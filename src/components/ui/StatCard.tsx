import type { ReactNode } from "react";
import Card from "./Card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: ReactNode;
  description: string;
  icon: ReactNode;
  trend?: { value: number; label?: string };
  accent?: "violet" | "emerald" | "amber" | "fuchsia" | "sky";
};

const accentMap = {
  violet: "bg-violet-500/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400 ring-violet-500/20",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400 ring-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400 ring-amber-500/20",
  fuchsia: "bg-fuchsia-500/10 text-fuchsia-600 dark:bg-fuchsia-400/10 dark:text-fuchsia-400 ring-fuchsia-500/20",
  sky: "bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400 ring-sky-500/20",
};

function StatCard({ title, value, description, icon, trend, accent = "violet" }: StatCardProps) {
  return (
    <Card hover className="overflow-hidden">
      <div className="flex items-start justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl ring-1", accentMap[accent])}>
          <div className="h-5 w-5">{icon}</div>
        </div>
        {trend && (
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1",
              trend.value >= 0
                ? "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400"
                : "bg-rose-500/10 text-rose-600 ring-rose-500/20 dark:text-rose-400"
            )}
          >
            {trend.value >= 0 ? "+" : ""}
            {trend.value}% {trend.label ?? ""}
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
        <p className="mt-1 text-[13px] font-medium text-muted-foreground">
          <span className="font-semibold text-foreground/80">{title}</span> · {description}
        </p>
      </div>
    </Card>
  );
}

export default StatCard;
