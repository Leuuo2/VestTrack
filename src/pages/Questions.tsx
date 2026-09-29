import { useState, useMemo } from "react";
import { BookOpen, Brain, Filter, Plus, Search, Shuffle, Trophy, Target, X, Play, RotateCcw, CheckCircle2, XCircle, Clock } from "lucide-react";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { subjects } from "@/data/subjects";
import { loadQuestions, removeQuestion, type Question } from "@/data/questions";
import { addAttempt, loadAttempts, getStats } from "@/data/questionAttempts";
import QuestionCard from "@/components/questions/QuestionCard";
import QuestionForm from "@/components/questions/QuestionForm";
import QuestionStats from "@/components/questions/QuestionStats";
import { cn } from "@/lib/utils";

type Mode = "list" | "practice" | "quiz";
type FilterState = {
 subject: string; // all or subjectId
 difficulty: string; // all or Difficulty
 search: string;
 onlyWrong: boolean;
 onlyCustom: boolean;
 onlyUnattempted: boolean;
};

function Questions() {
 const [questions, setQuestions] = useState<Question[]>(() => loadQuestions());
 const [mode, setMode] = useState<Mode>("list");
 const [showForm, setShowForm] = useState(false);
 const [filter, setFilter] = useState<FilterState>({
 subject: "all",
 difficulty: "all",
 search: "",
 onlyWrong: false,
 onlyCustom: false,
 onlyUnattempted: false,
 });

 // Practice state
 const [practiceQueue, setPracticeQueue] = useState<Question[]>([]);
 const [practiceIndex, setPracticeIndex] = useState(0);
 const [currentResult, setCurrentResult] = useState<{ selectedIndex: number; correct: boolean } | null>(null);

 // Quiz state
 const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
 const [quizAnswers, setQuizAnswers] = useState<Record<string, { selected: number; timeSpent: number }>>({});
 const [quizFinished, setQuizFinished] = useState(false);
 const [quizResults, setQuizResults] = useState<{ selectedIndex: number; correct: boolean } | null>(null);
 const [quizCurrentIdx, setQuizCurrentIdx] = useState(0);

 const attempts = loadAttempts();
 const stats = getStats();

 const filtered = useMemo(() => {
 let list = [...questions];

 if (filter.subject !== "all") list = list.filter(q => q.subjectId === filter.subject);
 if (filter.difficulty !== "all") list = list.filter(q => q.difficulty === filter.difficulty);
 if (filter.search) {
  const s = filter.search.toLowerCase();
  list = list.filter(q => q.statement.toLowerCase().includes(s) || q.tags.some(t => t.toLowerCase().includes(s)) || q.source.toLowerCase().includes(s));
 }
 if (filter.onlyCustom) list = list.filter(q => q.isCustom);
 if (filter.onlyWrong) {
  const wrongIds = new Set(attempts.filter(a => !a.correct).map(a => a.questionId));
  list = list.filter(q => wrongIds.has(q.id));
 }
 if (filter.onlyUnattempted) {
  const attemptedIds = new Set(attempts.map(a => a.questionId));
  list = list.filter(q => !attemptedIds.has(q.id));
 }

 return list;
 }, [questions, filter, attempts]);

 function refresh() {
 setQuestions(loadQuestions());
 }

 function startPractice() {
 if (filtered.length === 0) return;
 const shuffled = [...filtered].sort(() => Math.random() - 0.5);
 setPracticeQueue(shuffled);
 setPracticeIndex(0);
 setCurrentResult(null);
 setMode("practice");
 }

 function handlePracticeAnswer(selectedIndex: number, timeSpent: number) {
 const q = practiceQueue[practiceIndex];
 const correct = selectedIndex === q.correctIndex;
 addAttempt(q.id, selectedIndex, correct, timeSpent);
 setCurrentResult({ selectedIndex, correct });
 }

 function nextPractice() {
 if (practiceIndex + 1 >= practiceQueue.length) {
  // finished
  setMode("list");
  refresh();
 } else {
  setPracticeIndex(i => i + 1);
  setCurrentResult(null);
 }
 }

 function startQuiz(count: number) {
 if (filtered.length === 0) return;
 const shuffled = [...filtered].sort(() => Math.random() - 0.5).slice(0, Math.min(count, filtered.length));
 setQuizQuestions(shuffled);
 setQuizAnswers({});
 setQuizCurrentIdx(0);
 setQuizFinished(false);
 setQuizResults(null);
 setMode("quiz");
 }

 function handleQuizAnswer(selectedIndex: number, timeSpent: number) {
 const q = quizQuestions[quizCurrentIdx];
 const correct = selectedIndex === q.correctIndex;
 setQuizAnswers(prev => ({ ...prev, [q.id]: { selected: selectedIndex, timeSpent } }));
 setQuizResults({ selectedIndex, correct });
 addAttempt(q.id, selectedIndex, correct, timeSpent);
 }

 function nextQuiz() {
 if (quizCurrentIdx + 1 >= quizQuestions.length) {
  setQuizFinished(true);
 } else {
  setQuizCurrentIdx(i => i + 1);
  setQuizResults(null);
 }
 }

 function quizScore() {
 let correct = 0;
 quizQuestions.forEach(q => {
  const ans = quizAnswers[q.id];
  if (ans && ans.selected === q.correctIndex) correct++;
 });
 return { correct, total: quizQuestions.length, accuracy: quizQuestions.length ? Math.round((correct / quizQuestions.length) * 100) : 0 };
 }

 const currentPracticeQuestion = practiceQueue[practiceIndex];
 const currentQuizQuestion = quizQuestions[quizCurrentIdx];

 return (
 <>
  <div className="flex flex-wrap items-end justify-between gap-4">
  <div className="space-y-1">
   <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-600 dark:text-violet-400">
   <Brain className="h-3 w-3" /> Banco de questões · {questions.length} questões
   </div>
   <h1 className="text-3xl font-bold tracking-tight">Questões</h1>
   <p className="text-sm text-muted-foreground">Pratique por matéria, dificuldade ou só as que você errou — com estatísticas premium.</p>
  </div>

  <div className="flex flex-wrap gap-2">
   <Button variant="outline" size="sm" onClick={() => setShowForm(v => !v)} className="h-9 rounded-xl border-border/70">
   {showForm ? <><X className="h-4 w-4" /> Fechar</> : <><Plus className="h-4 w-4" /> Nova questão</>}
   </Button>
   <Button size="sm" onClick={startPractice} disabled={filtered.length === 0} className="h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-[0_4px_12px_-2px_rgba(139,92,246,0.4)]">
   <Play className="h-4 w-4" /> Praticar ({filtered.length})
   </Button>
  </div>
  </div>

  <div className="mt-6 grid gap-4 sm:grid-cols-3">
  <Card hover className="sm:col-span-1">
   <div className="flex items-center gap-2.5">
   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/20 dark:text-violet-400"><BookOpen className="h-5 w-5" /></div>
   <div>
    <p className="text-sm font-semibold">{questions.length} questões</p>
    <p className="text-xs text-muted-foreground">{questions.filter(q => q.isCustom).length} suas · {questions.filter(q => !q.isCustom).length} do banco</p>
   </div>
   </div>
  </Card>
  <Card hover className="sm:col-span-1">
   <div className="flex items-center gap-2.5">
   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400"><Trophy className="h-5 w-5" /></div>
   <div>
    <p className="text-sm font-semibold">{stats ? `${stats.accuracy}% de acerto` : "Comece a praticar"}</p>
    <p className="text-xs text-muted-foreground">{stats ? `${stats.correct}/${stats.total} acertos` : "0 tentativas ainda"}</p>
   </div>
   </div>
  </Card>
  <Card hover className="sm:col-span-1">
   <div className="flex items-center gap-2.5">
   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400"><Target className="h-5 w-5" /></div>
   <div>
    <p className="text-sm font-semibold">{filtered.length} filtradas</p>
    <p className="text-xs text-muted-foreground">{attempts.filter(a => !a.correct).length} pra revisar</p>
   </div>
   </div>
  </Card>
  </div>

  {showForm && (
  <div className="mt-6">
   <QuestionForm
   onCreated={(q) => {
    setQuestions(prev => [q, ...prev]);
    setShowForm(false);
   }}
   onCancel={() => setShowForm(false)}
   />
  </div>
  )}

  {mode === "practice" && currentPracticeQuestion ? (
  <div className="mt-6 space-y-4">
   <div className="flex items-center justify-between">
   <div className="flex items-center gap-3">
    <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600 ring-1 ring-violet-500/20 dark:text-violet-400">
    Prática {practiceIndex + 1}/{practiceQueue.length}
    </span>
    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
    <div className="h-full bg-violet-500 transition-all" style={{ width: `${((practiceIndex + 1) / practiceQueue.length) * 100}%` }} />
    </div>
   </div>
   <Button variant="ghost" size="sm" onClick={() => setMode("list")} className="h-8 rounded-xl"><X className="h-4 w-4" /> Sair</Button>
   </div>

   <QuestionCard
   question={currentPracticeQuestion}
   onAnswer={currentResult ? undefined : handlePracticeAnswer}
   showResult={currentResult ?? undefined}
   />

   {currentResult && (
   <div className="flex justify-end">
    <Button onClick={nextPractice} className="h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600">
    {practiceIndex + 1 >= practiceQueue.length ? "Finalizar" : "Próxima"} <Target className="h-4 w-4" />
    </Button>
   </div>
   )}
  </div>
  ) : mode === "quiz" && currentQuizQuestion ? (
  <div className="mt-6 space-y-4">
   {!quizFinished ? (
   <>
    <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
     <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
     Simulado {quizCurrentIdx + 1}/{quizQuestions.length}
     </span>
     <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
     <div className="h-full bg-emerald-500 transition-all" style={{ width: `${((quizCurrentIdx + 1) / quizQuestions.length) * 100}%` }} />
     </div>
    </div>
    <Button variant="ghost" size="sm" onClick={() => setMode("list")} className="h-8 rounded-xl"><X className="h-4 w-4" /> Sair</Button>
    </div>

    <QuestionCard
    question={currentQuizQuestion}
    onAnswer={quizResults ? undefined : handleQuizAnswer}
    showResult={quizResults ?? undefined}
    />

    {quizResults && (
    <div className="flex justify-end">
     <Button onClick={nextQuiz} className="h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600">
     {quizCurrentIdx + 1 >= quizQuestions.length ? "Ver resultado" : "Próxima"} <Target className="h-4 w-4" />
     </Button>
    </div>
    )}
   </>
   ) : (
   <Card premium title="Resultado do simulado">
    <div className="mt-4 text-center">
    {(() => {
     const { correct, total, accuracy } = quizScore();
     return (
     <>
      <div className={cn("mx-auto flex h-20 w-20 items-center justify-center rounded-full text-3xl font-bold", accuracy >= 70 ? "bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400" : accuracy >= 50 ? "bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400" : "bg-rose-500/10 text-rose-600 ring-1 ring-rose-500/20 dark:text-rose-400")}>
      {accuracy}%
      </div>
      <p className="mt-4 text-lg font-semibold">{accuracy >= 80 ? "Excelente! 🎉" : accuracy >= 60 ? "Mandou bem! 💪" : "Continue praticando! 📚"}</p>
      <p className="mt-1 text-sm text-muted-foreground">{correct} de {total} corretas</p>

      <div className="mt-6 grid grid-cols-3 gap-2">
      <div className="rounded-xl bg-muted/50 p-3 ring-1 ring-border/50">
       <p className="text-xs text-muted-foreground">Acertos</p>
       <p className="mt-1 flex items-center justify-center gap-1 text-lg font-bold text-emerald-600 dark:text-emerald-400"><CheckCircle2 className="h-4 w-4" /> {correct}</p>
      </div>
      <div className="rounded-xl bg-muted/50 p-3 ring-1 ring-border/50">
       <p className="text-xs text-muted-foreground">Erros</p>
       <p className="mt-1 flex items-center justify-center gap-1 text-lg font-bold text-rose-600 dark:text-rose-400"><XCircle className="h-4 w-4" /> {total - correct}</p>
      </div>
      <div className="rounded-xl bg-muted/50 p-3 ring-1 ring-border/50">
       <p className="text-xs text-muted-foreground">Tempo</p>
       <p className="mt-1 flex items-center justify-center gap-1 text-lg font-bold"><Clock className="h-4 w-4" /> {Object.values(quizAnswers).reduce((s, a) => s + (a.timeSpent || 0), 0)}s</p>
      </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
      <Button variant="outline" onClick={() => setMode("list")} className="h-10 rounded-xl"><RotateCcw className="h-4 w-4" /> Voltar</Button>
      <Button onClick={() => startQuiz(total)} className="h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600"><Shuffle className="h-4 w-4" /> Refazer</Button>
      </div>
     </>
     );
    })()}
    </div>
   </Card>
   )}
  </div>
  ) : (
  <>
   <div className="mt-6">
   <QuestionStats />
   </div>

   <Card className="mt-6" title="Filtros e simulados">
   <div className="mt-4 space-y-4">
    <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr]">
    <div className="relative">
     <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
     <input value={filter.search} onChange={e => setFilter(f => ({ ...f, search: e.target.value }))} placeholder="Buscar: funções, ENEM, fotossíntese..." className="w-full rounded-xl border border-input bg-card py-2.5 pl-10 pr-3.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
    </div>
    <select value={filter.subject} onChange={e => setFilter(f => ({ ...f, subject: e.target.value }))} className="rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
     <option value="all">Todas matérias</option>
     {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
    </select>
    <select value={filter.difficulty} onChange={e => setFilter(f => ({ ...f, difficulty: e.target.value }))} className="rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
     <option value="all">Todas dificuldades</option>
     <option value="facil">Fácil</option>
     <option value="medio">Médio</option>
     <option value="dificil">Difícil</option>
    </select>
    </div>

    <div className="flex flex-wrap gap-2">
    <label className="flex cursor-pointer items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs hover:bg-muted">
     <input type="checkbox" checked={filter.onlyWrong} onChange={e => setFilter(f => ({ ...f, onlyWrong: e.target.checked }))} className="rounded" /> Só erradas
    </label>
    <label className="flex cursor-pointer items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs hover:bg-muted">
     <input type="checkbox" checked={filter.onlyUnattempted} onChange={e => setFilter(f => ({ ...f, onlyUnattempted: e.target.checked }))} className="rounded" /> Não tentadas
    </label>
    <label className="flex cursor-pointer items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs hover:bg-muted">
     <input type="checkbox" checked={filter.onlyCustom} onChange={e => setFilter(f => ({ ...f, onlyCustom: e.target.checked }))} className="rounded" /> Minhas questões
    </label>
    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground"><Filter className="h-3 w-3" /> {filtered.length} de {questions.length}</span>
    </div>

    <div className="flex flex-wrap gap-2 border-t border-border/50 pt-4">
    <span className="text-xs font-medium text-muted-foreground">Simulado rápido:</span>
    {[5, 10, 20].map(n => (
     <Button key={n} variant="outline" size="sm" onClick={() => startQuiz(n)} disabled={filtered.length === 0} className="h-8 rounded-xl">
     <Trophy className="h-3.5 w-3.5" /> {n} questões
     </Button>
    ))}
    <Button variant="ghost" size="sm" onClick={() => setFilter({ subject: "all", difficulty: "all", search: "", onlyWrong: false, onlyCustom: false, onlyUnattempted: false })} className="h-8 rounded-xl">
     <RotateCcw className="h-3.5 w-3.5" /> Limpar filtros
    </Button>
    </div>
   </div>
   </Card>

   <div className="mt-6 space-y-4">
   {filtered.length === 0 ? (
    <Card className="border-dashed">
    <div className="py-10 text-center">
     <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground"><Search className="h-6 w-6" /></div>
     <p className="mt-4 text-sm font-medium">Nenhuma questão encontrada</p>
     <p className="mt-1 text-sm text-muted-foreground">Ajuste os filtros ou adicione uma nova questão.</p>
    </div>
    </Card>
   ) : (
    filtered.slice(0, 20).map(q => (
    <QuestionCard
     key={q.id}
     question={q}
     onDelete={() => {
     if (confirm(`Excluir "${q.statement.slice(0, 50)}..."?`)) {
      removeQuestion(q.id);
      refresh();
     }
     }}
     mode="review"
    />
    ))
   )}
   {filtered.length > 20 && (
    <p className="text-center text-xs text-muted-foreground">Mostrando 20 de {filtered.length} — use filtros ou modo prática para ver todas em sequência.</p>
   )}
   </div>
  </>
  )}
 </>
 );
}

export default Questions;
