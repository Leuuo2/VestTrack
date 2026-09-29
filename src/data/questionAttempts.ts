import { notifyLocalChange } from "@/lib/syncBus";
import { recordActivity } from "@/data/goals";

export type Attempt = {
  id: string;
  questionId: string;
  selectedIndex: number;
  correct: boolean;
  timeSpent?: number; // seconds
  attemptedAt: string;
};

const STORAGE_KEY = "vesttrack:question-attempts";

export function loadAttempts(): Attempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Attempt[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

export function saveAttempts(attempts: Attempt[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
  } catch {}
  notifyLocalChange("tasks");
}

export function addAttempt(questionId: string, selectedIndex: number, correct: boolean, timeSpent?: number) {
  const all = loadAttempts();
  const attempt: Attempt = {
    id: `att-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,
    questionId,
    selectedIndex,
    correct,
    timeSpent,
    attemptedAt: new Date().toISOString(),
  };
  saveAttempts([attempt, ...all]);
  try { recordActivity("questions", 1, correct ? 10 : 3); } catch {}
  return attempt;
}

export function getAttemptsForQuestion(questionId: string): Attempt[] {
  return loadAttempts().filter(a => a.questionId === questionId);
}

export function getStats() {
  const attempts = loadAttempts();
  if (attempts.length === 0) return null;

  const total = attempts.length;
  const correct = attempts.filter(a => a.correct).length;
  const accuracy = Math.round((correct / total) * 100);

  const byDate = attempts.reduce((acc, a) => {
    const date = a.attemptedAt.slice(0, 10);
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const avgTime = (() => {
    const withTime = attempts.filter(a => a.timeSpent != null) as (Attempt & { timeSpent: number })[];
    if (withTime.length === 0) return null;
    return Math.round(withTime.reduce((s, a) => s + a.timeSpent, 0) / withTime.length);
  })();

  return { total, correct, accuracy, byDate, avgTime, attempts };
}

export function getStatsBySubject(questions: { id: string; subjectId: string }[]) {
  const attempts = loadAttempts();
  const qMap = new Map(questions.map(q => [q.id, q.subjectId]));

  const bySubject: Record<string, { total: number; correct: number }> = {};

  attempts.forEach(a => {
    const subj = qMap.get(a.questionId);
    if (!subj) return;
    if (!bySubject[subj]) bySubject[subj] = { total: 0, correct: 0 };
    bySubject[subj].total++;
    if (a.correct) bySubject[subj].correct++;
  });

  return Object.entries(bySubject).map(([subjectId, { total, correct }]) => ({
    subjectId,
    total,
    correct,
    accuracy: Math.round((correct / total) * 100),
  }));
}

export function clearAttempts() {
  saveAttempts([]);
}
