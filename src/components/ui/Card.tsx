import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  title?: string;
  className?: string;
  hover?: boolean;
  premium?: boolean;
};

function Card({ title, children, className, hover = false, premium = false }: CardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300",
        "border-border/60",
        premium && "border-violet-500/20 shadow-[0_8px_32px_-12px_rgba(139,92,246,0.2)] dark:shadow-[0_8px_32px_-12px_rgba(139,92,246,0.3)]",
        hover && "hover:-translate-y-[1px] hover:border-border hover:shadow-md hover:shadow-violet-500/5",
        className
      )}
    >
      {premium && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/[0.04] via-transparent to-fuchsia-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <div className="relative">
        {title && (
          <h2 className="mb-1 text-[15px] font-semibold tracking-tight">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
}

export default Card;
