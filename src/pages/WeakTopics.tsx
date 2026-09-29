import { AlertTriangle, TrendingUp, Target, BookOpen, Brain } from "lucide-react";
import Card from "@/components/ui/Card";
import { getWeakTopics, getPredictedScore, getStudyRecommendations } from "@/data/weakTopics";

export default function WeakTopics() {
 const weakTopics = getWeakTopics();
 const predicted = getPredictedScore();
 const recommendations = getStudyRecommendations();
 
 const critical = weakTopics.filter(w => w.level === "critical");
 const weak = weakTopics.filter(w => w.level === "weak");
 const good = weakTopics.filter(w => w.level === "good" || w.level === "excellent");
 
 return (
  <div className="space-y-6">
   <div>
    <h1 className="text-2xl font-bold tracking-tight">Pontos fracos</h1>
    <p className="text-sm text-muted-foreground">Onde focar pra subir nota</p>
   </div>
   
   <Card className="p-6 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white border-0">
    <div className="flex items-start justify-between">
     <div>
      <p className="text-sm opacity-80">Nota prevista ENEM</p>
      <p className="text-3xl font-bold">{predicted.score}</p>
      <p className="mt-1 text-sm opacity-90">{predicted.level}</p>
     </div>
     <div className="rounded-full bg-white/20 p-3">
      <TrendingUp className="h-6 w-6" />
     </div>
    </div>
    <p className="mt-3 text-sm opacity-90">{predicted.feedback}</p>
   </Card>
   
   <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
    <Card className="p-4 border-red-200 bg-red-50/50 dark:bg-red-950/20">
     <div className="flex items-center gap-2">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <p className="text-sm font-medium">Críticos</p>
     </div>
     <p className="mt-1 text-2xl font-bold text-red-600">{critical.length}</p>
    </Card>
    <Card className="p-4 border-amber-200 bg-amber-50/50 dark:bg-amber-950/20">
     <div className="flex items-center gap-2">
      <Target className="h-4 w-4 text-amber-600" />
      <p className="text-sm font-medium">Fracos</p>
     </div>
     <p className="mt-1 text-2xl font-bold text-amber-600">{weak.length}</p>
    </Card>
    <Card className="p-4 border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20">
     <div className="flex items-center gap-2">
      <BookOpen className="h-4 w-4 text-emerald-600" />
      <p className="text-sm font-medium">Bons</p>
     </div>
     <p className="mt-1 text-2xl font-bold text-emerald-600">{good.length}</p>
    </Card>
   </div>
   
   <Card className="p-4">
    <h3 className="font-medium">Recomendações</h3>
    <ul className="mt-3 space-y-2">
     {recommendations.map((rec, idx) => (
      <li key={idx} className="flex gap-2 text-sm">
       <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-xs text-violet-700">{idx + 1}</span>
       <span>{rec}</span>
      </li>
     ))}
    </ul>
   </Card>
   
   <div>
    <h3 className="mb-3 font-medium">Todos os tópicos por desempenho</h3>
    <div className="space-y-2">
     {weakTopics.length === 0 ? (
      <Card className="p-6 text-center">
       <Brain className="mx-auto h-8 w-8 text-muted-foreground" />
       <p className="mt-2 text-sm text-muted-foreground">Responda questões pra ver seus pontos fracos</p>
      </Card>
     ) : (
      weakTopics.map(topic => (
       <Card key={`${topic.subjectId}-${topic.topicId}`} className="p-3 flex items-center gap-3">
        <div className={`h-2 w-2 rounded-full shrink-0 ${topic.level === "critical" ? "bg-red-500" : topic.level === "weak" ? "bg-amber-500" : topic.level === "medium" ? "bg-yellow-500" : "bg-emerald-500"}`} />
        <div className="min-w-0 flex-1">
         <p className="truncate text-sm font-medium">{topic.topicId}</p>
         <p className="text-xs text-muted-foreground">{topic.subjectId} · {topic.correct}/{topic.total} acertos</p>
        </div>
        <div className="text-right">
         <p className={`text-sm font-bold ${topic.level === "critical" ? "text-red-600" : topic.level === "weak" ? "text-amber-600" : topic.level === "medium" ? "text-yellow-600" : "text-emerald-600"}`}>{topic.accuracy}%</p>
         <p className="text-[11px] text-muted-foreground capitalize">{topic.level}</p>
        </div>
       </Card>
      ))
     )}
    </div>
   </div>
  </div>
 );
}
