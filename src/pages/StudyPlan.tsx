import { useState } from "react";
import { Calendar, Clock, Check, Plus, Target, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import { loadStudyPlan, generateStudyPlan, togglePlanItem, saveStudyPlan, getTodayPlanItems, getWeekPlanItems } from "@/data/studyPlan";
import { subjects } from "@/data/subjects";
import { addXp } from "@/data/achievements";

export default function StudyPlan() {
 const [plan, setPlan] = useState(loadStudyPlan());
 const [showGenerator, setShowGenerator] = useState(false);
 const [days, setDays] = useState(30);
 const [hours, setHours] = useState(4);
 
 const todayItems = getTodayPlanItems();
 const weekItems = getWeekPlanItems();
 const completedToday = todayItems.filter(i => i.completed).length;
 const progressToday = todayItems.length > 0 ? (completedToday / todayItems.length) * 100 : 0;
 
 const handleGenerate = () => {
  const newPlan = generateStudyPlan(
   subjects.map((s: any) => ({
    id: s.id,
    name: s.name,
    difficulty: "medium",
    hoursPerWeek: 5,
   })),
   days,
   hours
  );
  saveStudyPlan(newPlan);
  setPlan(newPlan);
  setShowGenerator(false);
 };
 
 const handleToggle = (id: string) => {
  const updated = togglePlanItem(id);
  if (updated) {
   setPlan(updated);
   const item = updated.items.find(i => i.id === id);
   if (item?.completed) addXp(15);
  }
 };
 
 return (
  <div className="space-y-6">
   <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
     <h1 className="text-2xl font-bold tracking-tight">Plano de estudos</h1>
     <p className="text-sm text-muted-foreground">Cronograma automático baseado nas suas matérias</p>
    </div>
    <Button onClick={() => setShowGenerator(!showGenerator)} size="sm" className="gap-2">
     <Plus className="h-4 w-4" /> Gerar plano
    </Button>
   </div>
   
   {showGenerator && (
    <Card className="p-4 space-y-4">
     <h3 className="font-medium">Gerar novo plano</h3>
     <div className="grid grid-cols-2 gap-3">
      <div>
       <label className="text-xs text-muted-foreground">Dias</label>
       <input type="number" value={days} onChange={e => setDays(Number(e.target.value))} className="w-full rounded-lg border bg-background px-3 py-2 text-sm" />
      </div>
      <div>
       <label className="text-xs text-muted-foreground">Horas por dia</label>
       <input type="number" value={hours} onChange={e => setHours(Number(e.target.value))} className="w-full rounded-lg border bg-background px-3 py-2 text-sm" />
      </div>
     </div>
     <p className="text-xs text-muted-foreground">{subjects.length} matérias · {days * hours}h total · {Math.floor((days * hours * 60) / 50)} sessões de 50min</p>
     <Button onClick={handleGenerate} size="sm">Gerar</Button>
    </Card>
   )}
   
   {plan ? (
    <>
     <Card className="p-4 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 ring-1 ring-violet-500/20">
      <div className="flex items-center gap-3">
       <div className="rounded-xl bg-violet-600 p-2.5 text-white">
        <Target className="h-5 w-5" />
       </div>
       <div className="flex-1">
        <h3 className="font-medium">{plan.name}</h3>
        <p className="text-xs text-muted-foreground">{plan.items.length} sessões · {new Date(plan.startDate).toLocaleDateString()} até {new Date(plan.endDate).toLocaleDateString()}</p>
       </div>
       <div className="text-right">
        <p className="text-sm font-bold">{plan.items.filter(i => i.completed).length}/{plan.items.length}</p>
        <p className="text-xs text-muted-foreground">concluídas</p>
       </div>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-violet-500/10">
       <div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${(plan.items.filter(i => i.completed).length / plan.items.length) * 100}%` }} />
      </div>
     </Card>
     
     <div>
      <h3 className="mb-3 flex items-center gap-2 font-medium">
       <Clock className="h-4 w-4" /> Hoje · {completedToday}/{todayItems.length}
       <span className="ml-auto text-xs text-muted-foreground">{Math.round(progressToday)}%</span>
      </h3>
      <div className="space-y-2">
       {todayItems.length === 0 ? (
        <Card className="p-4 text-center text-sm text-muted-foreground">Nenhuma sessão hoje. Gere um plano!</Card>
       ) : (
        todayItems.map(item => (
         <Card key={item.id} className={`p-3 flex items-center gap-3 ${item.completed ? "bg-emerald-500/5 ring-1 ring-emerald-500/20" : ""}`}>
          <button onClick={() => handleToggle(item.id)} className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${item.completed ? "border-emerald-500 bg-emerald-500 text-white" : "border-muted-foreground/30"}`}>
           {item.completed && <Check className="h-3 w-3" />}
          </button>
          <div className="min-w-0 flex-1">
           <p className={`truncate text-sm ${item.completed ? "line-through text-muted-foreground" : "font-medium"}`}>{item.title}</p>
           <p className="text-xs text-muted-foreground">{item.duration}min · {item.type}</p>
          </div>
          <span className="rounded-full bg-violet-500/10 px-2 py-1 text-[11px] text-violet-700">{item.subjectId}</span>
         </Card>
        ))
       )}
      </div>
     </div>
     
     <div>
      <h3 className="mb-3 flex items-center gap-2 font-medium">
       <Calendar className="h-4 w-4" /> Próximos 7 dias · {weekItems.length} sessões
      </h3>
      <div className="space-y-2">
       {weekItems.slice(0, 10).map(item => (
        <Card key={item.id} className="p-3 flex items-center gap-3 opacity-80">
         <div className="flex h-8 w-8 shrink-0 flex-col items-center justify-center rounded-lg bg-muted text-[10px]">
          <span className="font-bold">{new Date(item.date).getDate()}</span>
          <span>{new Date(item.date).toLocaleDateString('pt-BR', { month: 'short' })}</span>
         </div>
         <div className="min-w-0 flex-1">
          <p className="truncate text-sm">{item.title}</p>
          <p className="text-xs text-muted-foreground">{item.date} · {item.duration}min</p>
         </div>
         <BookOpen className="h-4 w-4 text-muted-foreground" />
        </Card>
       ))}
      </div>
     </div>
    </>
   ) : (
    <Card className="p-8 text-center">
     <Calendar className="mx-auto h-8 w-8 text-muted-foreground" />
     <h3 className="mt-3 font-medium">Nenhum plano ainda</h3>
     <p className="mt-1 text-sm text-muted-foreground">Gere um plano automático baseado nas suas matérias e horas disponíveis.</p>
     <Button onClick={() => setShowGenerator(true)} size="sm" className="mt-3">Gerar plano</Button>
    </Card>
   )}
  </div>
 );
}
