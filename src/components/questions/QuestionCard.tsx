import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Clock, Lightbulb, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Question } from "@/data/questions";
import { subjects } from "@/data/subjects";
import { addAttempt } from "@/data/questionAttempts";

type Props = {
  question: Question;
  onAnswer?: (selectedIndex: number, timeSpent: number) => void;
  showResult?: { selectedIndex: number; correct: boolean };
  onDelete?: () => void;
  onEdit?: () => void;
  mode?: "practice" | "review";
};

function QuestionCard({ question, onAnswer, showResult, onDelete, onEdit, mode = "practice" }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [reviewResult, setReviewResult] = useState<{ selectedIndex: number; correct: boolean } | null>(null);
  const [startTime] = useState(() => Date.now());
  const subject = subjects.find(s => s.id === question.subjectId);

  useEffect(() => {
    setSelected(null);
    setReviewResult(null);
  }, [question.id]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (showResult || reviewResult) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      if (["1", "2", "3", "4", "a", "b", "c", "d", "A", "B", "C", "D"].includes(e.key)) {
        const map: Record<string, number> = { "1": 0, "2": 1, "3": 2, "4": 3, "a": 0, "b": 1, "c": 2, "d": 3, "A": 0, "B": 1, "C": 2, "D": 3 };
        const idx = map[e.key];
        if (idx < question.options.length) {
          e.preventDefault();
          handleSelect(idx);
        }
      } else if (e.key === "Enter" && mode === "review" && selected !== null) {
        e.preventDefault();
        handleVerify();
      } else if (e.key === "Escape" && selected !== null) {
        e.preventDefault();
        handleClear();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, showResult, reviewResult, mode, question.options.length, question.id]);

  const handleSelect = (idx: number) => {
    if (showResult || reviewResult) return;
    setSelected(idx);
    if (onAnswer && mode === "practice") {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      onAnswer(idx, timeSpent);
    }
  };

  const handleVerify = () => {
    if (selected === null) return;
    const correct = selected === question.correctIndex;
    setReviewResult({ selectedIndex: selected, correct });
    if (mode === "review") {
      try {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        addAttempt(question.id, selected, correct, timeSpent);
      } catch {}
    }
  };

  const handleClear = () => {
    setSelected(null);
    setReviewResult(null);
  };

  const isAnswered = !!(showResult || reviewResult);
  const currentResult = showResult || reviewResult;
  const correctIndex = question.correctIndex;

  return (
    <div className="group relative rounded-[20px] border border-border/60 bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {subject && (
            <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1", subject.accent.iconBg, subject.accent.iconText, subject.accent.checkedBorder)}>
              <subject.icon className="h-3.5 w-3.5" /> {subject.name}
            </span>
          )}
          <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium ring-1",
            question.difficulty === "facil" ? "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400" :
            question.difficulty === "medio" ? "bg-amber-500/10 text-amber-600 ring-amber-500/20 dark:text-amber-400" :
            "bg-rose-500/10 text-rose-600 ring-rose-500/20 dark:text-rose-400"
          )}>
            {question.difficulty === "facil" ? "Fácil" : question.difficulty === "medio" ? "Médio" : "Difícil"}
          </span>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground ring-1 ring-border/50">{question.source}</span>
          {question.isCustom && <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-600 ring-1 ring-violet-500/20 dark:text-violet-400">Minha</span>}
        </div>

        <div className="flex items-center gap-1">
          {onEdit && (
            <Button variant="ghost" size="icon-sm" onClick={onEdit} className="h-8 w-8 rounded-xl opacity-0 group-hover:opacity-100">
              <Edit3 className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="icon-sm" onClick={onDelete} className="h-8 w-8 rounded-xl text-destructive opacity-0 hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100">
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <p className="mt-5 text-[15px] font-medium leading-relaxed tracking-tight">{question.statement}</p>

      <div className="mt-5 space-y-2.5">
        {question.options.map((opt, idx) => {
          const isSelected = (currentResult ? currentResult.selectedIndex : selected) === idx;
          const isCorrect = idx === correctIndex;
          const showCorrect = isAnswered && isCorrect;
          const showWrong = isAnswered && isSelected && !isCorrect;

          return (
            <button
              key={idx}
              type="button"
              disabled={!!showResult}
              onClick={() => handleSelect(idx)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all",
                !isAnswered && "border-border/60 bg-card hover:border-violet-500/30 hover:bg-violet-500/5",
                !isAnswered && isSelected && "border-violet-500/40 bg-violet-500/10 ring-1 ring-violet-500/20",
                showCorrect && "border-emerald-500/30 bg-emerald-500/10 ring-1 ring-emerald-500/20",
                showWrong && "border-rose-500/30 bg-rose-500/10 ring-1 ring-rose-500/20",
                isAnswered && !showCorrect && !showWrong && "opacity-60"
              )}
            >
              <span className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-1",
                !isAnswered && !isSelected && "bg-muted text-muted-foreground ring-border/50",
                !isAnswered && isSelected && "bg-violet-600 text-white ring-violet-600",
                showCorrect && "bg-emerald-600 text-white ring-emerald-600",
                showWrong && "bg-rose-600 text-white ring-rose-600",
                isAnswered && !showCorrect && !showWrong && "bg-muted text-muted-foreground"
              )}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{opt}</span>
              {showCorrect && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />}
              {showWrong && <XCircle className="h-5 w-5 shrink-0 text-rose-600" />}
            </button>
          );
        })}
      </div>

      {isAnswered && currentResult && (
        <div className="mt-5 space-y-3">
          <div className={cn("rounded-xl p-4 ring-1", currentResult.correct ? "bg-emerald-500/10 ring-emerald-500/20" : "bg-rose-500/10 ring-rose-500/20")}>
            <p className={cn("flex items-center gap-1.5 text-sm font-semibold", currentResult.correct ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300")}>
              {currentResult.correct ? <><CheckCircle2 className="h-4 w-4" /> Acertou!</> : <><XCircle className="h-4 w-4" /> Errou — gabarito: {String.fromCharCode(65 + correctIndex)}</>}
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300"><Lightbulb className="h-3.5 w-3.5" /> Explicação</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{question.explanation}</p>
            {question.tags.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {question.tags.map(tag => (
                  <span key={tag} className="rounded-full bg-card px-2 py-0.5 text-[11px] text-muted-foreground ring-1 ring-border/50">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {!isAnswered && mode === "practice" && (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> Clique ou use 1-4 para responder</p>
      )}

      {!isAnswered && mode === "review" && (
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex gap-2">
            <Button
              onClick={handleVerify}
              disabled={selected === null}
              variant="outline"
              className="flex-1 rounded-xl border-transparent bg-transparent text-muted-foreground hover:border-emerald-500/20 hover:bg-emerald-500/10 hover:text-emerald-600 disabled:opacity-30 dark:hover:text-emerald-400"
            >
              <CheckCircle2 className="h-4 w-4" /> Check <span className="ml-1 hidden sm:inline text-[10px] opacity-60">(Enter)</span>
            </Button>
            <Button
              onClick={handleClear}
              disabled={selected === null}
              variant="outline"
              className="flex-1 rounded-xl disabled:opacity-30"
            >
              <XCircle className="h-4 w-4" /> Limpar <span className="ml-1 hidden sm:inline text-[10px] opacity-60">(Esc)</span>
            </Button>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> 1-4 para selecionar • Enter verifica • Esc limpa</p>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
