import { Flame, Calendar } from "lucide-react";
import Card from "@/components/ui/Card";
import { loadMockTests } from "@/data/mockTests";
import { subjects, loadTopics } from "@/data/subjects";

function StudyStreak() {
  const tests = loadMockTests();
  const totalDone = subjects.reduce((acc, s) => acc + loadTopics(s.id, s.topics).filter(t => t.done).length, 0);
  const totalTopics = subjects.reduce((acc, s) => acc + s.topics.length, 0);

  // mock streak based on data density — rule-based, no backend yet
  const streak = Math.min( Math.floor(totalDone * 0.8 + tests.length * 1.2), 21);
  const thisWeek = Math.min(tests.length + Math.floor(totalDone / 3), 7);

  const days = ["D","S","T","Q","Q","S","S"];
  const activity = Array.from({ length: 7 }, (_, i) => {
    if (i < thisWeek) return Math.random() > 0.2 ? 2 : 1;
    return 0;
  });

  return (
    <Card hover title="Constância">
      <div className="mt-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20">
            <Flame className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-bold tracking-tight">{streak} dias</p>
            <p className="text-xs text-muted-foreground">de atividade · {totalDone}/{totalTopics} tópicos</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Esta semana</span>
            <span>{thisWeek}/7 dias</span>
          </div>
          <div className="mt-2.5 grid grid-cols-7 gap-1.5">
            {days.map((d, i) => (
              <div key={i} className="text-center">
                <div className={`mx-auto h-8 w-full rounded-lg transition-all ${
                  activity[i] === 2 ? "bg-violet-500 dark:bg-violet-400 shadow-sm" :
                  activity[i] === 1 ? "bg-violet-500/30 dark:bg-violet-400/30" :
                  "bg-muted"
                }`} />
                <span className="mt-1 block text-[10px] font-medium text-muted-foreground">{d}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-muted/50 p-3 text-[12px] leading-relaxed text-muted-foreground">
          💡 Dica: marcar 1 tópico por dia mantém o streak vivo — mesmo sem simulado.
        </div>
      </div>
    </Card>
  );
}

export default StudyStreak;
