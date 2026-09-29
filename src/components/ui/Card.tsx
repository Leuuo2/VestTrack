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
        premium && "border-violet-500/20 shadow-[0_8px_32px_-12px_rgba(139,92,246,0.2)]",
        hover && "hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      <div className="relative">
        {title && <h2 className="mb-1 text-[15px] font-semibold tracking-tight">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export default Card;
