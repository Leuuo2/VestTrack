import { ArrowUpRight, type LucideIcon } from "lucide-react";
import Card from "./Card";

type SubjectCardProps = {
  title: string;
  icon: LucideIcon;
  tasks: number;
  mockTests: number;
  progress: number;
};
function SubjectCard({
  title,
  icon: Icon,
  tasks,
  mockTests,
  progress,
}: SubjectCardProps) {
  return (
    <Card>
      <div className="group relative overflow-hidden border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5">
              <Icon className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">
                Acompanhe seu desempenho
              </p>
            </div>
          </div>

          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-muted/50 p-3">
            <p className="text-2xl font-bold">{tasks}</p>
            <p className="text-xs text-muted-foreground">Tarefas</p>
          </div>

          <div className="rounded-xl bg-muted/50 p-3">
            <p className="text-2xl font-bold">{mockTests}</p>
            <p className="text-xs text-muted-foreground">Simulados</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-muted-foreground">Progresso semanal</span>
            <span className="font-medium">{progress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
    className="h-full rounded-full bg-primary transition-all duration-500"
    style={{ width: `${progress}%` }}
/>
          </div>
        </div>
      </div>
    </Card>
  );
}
export default SubjectCard;
