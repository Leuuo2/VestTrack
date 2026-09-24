import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import { subjects } from "@/data/subjects";
import { loadMockTests, subjectAverage } from "@/data/mockTests";
import { cn } from "@/lib/utils";

function SubjectComparisonChart() {
  const tests = loadMockTests();
  const data = subjects
    .map(s => ({
      subject: s,
      avg: subjectAverage(tests, s.id),
    }))
    .filter(d => d.avg > 0)
    .sort((a,b) => b.avg - a.avg);

  if (data.length === 0) {
    return (
      <Card title="Comparativo por matéria">
        <p className="mt-3 rounded-xl bg-muted/40 px-4 py-8 text-center text-sm text-muted-foreground">
          Faça simulados com notas por matéria para ver o comparativo aqui.
        </p>
      </Card>
    );
  }

  const max = Math.max(...data.map(d => d.avg), 100);

  return (
    <Card premium title="Comparativo por matéria" className="overflow-hidden">
      <p className="mt-1 text-xs text-muted-foreground">Média nos simulados — clique para estudar a matéria</p>
      <div className="mt-5 space-y-3">
        {data.map(({ subject, avg }) => {
          const Icon = subject.icon;
          const pct = (avg / max) * 100;
          return (
            <Link key={subject.id} to={`/app/subjects/${subject.id}`} className="group flex items-center gap-3">
              <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", subject.accent.iconBg)}>
                <Icon className={cn("h-4 w-4", subject.accent.iconText)} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="truncate text-[13px] font-medium group-hover:underline">{subject.name}</span>
                  <span className="text-[13px] font-bold tabular-nums">{avg}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn("h-full rounded-full transition-all duration-700", subject.accent.bar)}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}

export default SubjectComparisonChart;
