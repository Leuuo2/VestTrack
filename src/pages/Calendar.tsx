import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import { loadStudyPlan } from "@/data/studyPlan";

export default function CalendarPage() {
 const [currentDate, setCurrentDate] = useState(new Date());
 const plan = loadStudyPlan();
 
 const year = currentDate.getFullYear();
 const month = currentDate.getMonth();
 
 const firstDay = new Date(year, month, 1);
 const lastDay = new Date(year, month + 1, 0);
 const startDate = new Date(firstDay);
 startDate.setDate(startDate.getDate() - firstDay.getDay());
 const endDate = new Date(lastDay);
 endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
 
 const days = [];
 const current = new Date(startDate);
 while (current <= endDate) {
  days.push(new Date(current));
  current.setDate(current.getDate() + 1);
 }
 
 const getDayData = (date: Date) => {
  const dateStr = date.toISOString().split("T")[0];
  const planItems = plan?.items.filter(i => i.date === dateStr) || [];
  return { planItems, total: planItems.length };
 };
 
 const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
 
 return (
  <div className="space-y-6">
   <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div>
     <h1 className="text-2xl font-bold tracking-tight">Calendário</h1>
     <p className="text-sm text-muted-foreground capitalize">{monthName}</p>
    </div>
    <div className="flex gap-1">
     <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
      <ChevronLeft className="h-4 w-4" />
     </Button>
     <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>Hoje</Button>
     <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
      <ChevronRight className="h-4 w-4" />
     </Button>
    </div>
   </div>
   
   <Card className="p-4">
    <div className="grid grid-cols-7 gap-px">
     {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(day => (
      <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">{day}</div>
     ))}
     
     {days.map((date, idx) => {
      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.toDateString() === new Date().toDateString();
      const { total, planItems } = getDayData(date);
      
      return (
       <div
        key={idx}
        className={`min-h-[80px] p-1.5 border border-border/40 ${!isCurrentMonth ? "bg-muted/30 opacity-50" : "bg-card"} ${isToday ? "ring-1 ring-violet-500 ring-inset" : ""}`}
       >
        <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${isToday ? "bg-violet-600 text-white font-bold" : ""}`}>
         {date.getDate()}
        </div>
        
        <div className="mt-1 space-y-0.5">
         {planItems.slice(0, 2).map(item => (
          <div key={item.id} className={`truncate rounded px-1 py-0.5 text-[10px] ${item.completed ? "bg-emerald-500/20 text-emerald-700 line-through" : "bg-violet-500/10 text-violet-700"}`}>
           {item.subjectId}
          </div>
         ))}
         {total > 2 && (
          <div className="text-[10px] text-muted-foreground">+{total - 2}</div>
         )}
        </div>
       </div>
      );
     })}
    </div>
   </Card>
   
   <div className="grid gap-3 sm:grid-cols-2">
    <Card className="p-4">
     <h3 className="flex items-center gap-2 text-sm font-medium">
      <BookOpen className="h-4 w-4 text-violet-600" /> Legenda
     </h3>
     <div className="mt-3 space-y-2 text-xs">
      <div className="flex items-center gap-2">
       <div className="h-3 w-3 rounded bg-violet-500/10" />
       <span>Plano de estudos</span>
      </div>
      <div className="flex items-center gap-2">
       <div className="h-3 w-3 rounded bg-amber-500/10" />
       <span>Tarefas</span>
      </div>
      <div className="flex items-center gap-2">
       <div className="h-3 w-3 rounded bg-emerald-500/20" />
       <span>Concluído</span>
      </div>
     </div>
    </Card>
    
    <Card className="p-4">
     <h3 className="flex items-center gap-2 text-sm font-medium">
      <Clock className="h-4 w-4 text-violet-600" /> Resumo do mês
     </h3>
     <div className="mt-3 space-y-1 text-xs text-muted-foreground">
      <p>{plan?.items.filter(i => { const d = new Date(i.date); return d.getMonth() === month && d.getFullYear() === year; }).length || 0} sessões planejadas</p>
      <p>{plan?.items.filter(i => { const d = new Date(i.date); return d.getMonth() === month && d.getFullYear() === year && i.completed; }).length || 0} concluídas</p>
     </div>
    </Card>
   </div>
  </div>
 );
}
