import { loadAttempts } from "@/data/questionAttempts";
import { loadQuestions } from "@/data/questions";
import { subjects, loadTopics } from "@/data/subjects";
import { loadMockTests, overallScore } from "@/data/mockTests";
import { loadActivity } from "@/data/goals";

export function getAnalytics() {
  const attempts = loadAttempts();
  const questions = loadQuestions();
  const qMap = new Map(questions.map(q => [q.id, q]));
  const tests = loadMockTests().sort((a, b) => a.date.localeCompare(b.date));
  const activities = loadActivity();

  // Accuracy over time (last 30 days)
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(Date.now() - (29 - i) * 86400000).toISOString().slice(0, 10);
    const dayAttempts = attempts.filter(a => a.attemptedAt.slice(0, 10) === d);
    const correct = dayAttempts.filter(a => a.correct).length;
    const total = dayAttempts.length;
    const acc = total ? Math.round((correct / total) * 100) : 0;
    return { date: d, total, correct, accuracy: acc };
  });

  // By subject
  const bySubject = subjects.map(s => {
    const subjAttempts = attempts.filter(a => {
      const q = qMap.get(a.questionId);
      return q?.subjectId === s.id;
    });
    const correct = subjAttempts.filter(a => a.correct).length;
    const total = subjAttempts.length;
    const accuracy = total ? Math.round((correct / total) * 100) : 0;
    const topics = loadTopics(s.id, s.topics);
    const doneTopics = topics.filter(t => t.done).length;
    const avgTime = (() => {
      const withTime = subjAttempts.filter(a => a.timeSpent) as any[];
      if (!withTime.length) return 0;
      return Math.round(withTime.reduce((sum, a) => sum + a.timeSpent, 0) / withTime.length);
    })();
    return {
      subject: s,
      total,
      correct,
      accuracy,
      doneTopics,
      totalTopics: topics.length,
      avgTime,
    };
  }).sort((a, b) => b.total - a.total);

  // Mock evolution
  const mockEvolution = tests.map(t => ({
    name: t.name,
    date: t.date,
    score: overallScore(t),
  }));

  // Time distribution
  const totalFocus = activities.reduce((s, a) => s + a.focusMinutes, 0);
  const byPeriod: Record<string, number> = {};
  attempts.forEach(a => {
    const hour = new Date(a.attemptedAt).getHours();
    const period = hour < 12 ? "manhã" : hour < 18 ? "tarde" : "noite";
    byPeriod[period] = (byPeriod[period] || 0) + 1;
  });

  // Weekly stats
  const thisWeekAttempts = attempts.filter(a => {
    const d = new Date(a.attemptedAt);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / 86400000;
    return diff <= 7;
  });

  const lastWeekAttempts = attempts.filter(a => {
    const d = new Date(a.attemptedAt);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / 86400000;
    return diff > 7 && diff <= 14;
  });

  const weeklyGrowth = lastWeekAttempts.length ? Math.round(((thisWeekAttempts.length - lastWeekAttempts.length) / lastWeekAttempts.length) * 100) : 0;

  // Heatmap last 90 days
  const heatmap = Array.from({ length: 90 }, (_, i) => {
    const d = new Date(Date.now() - (89 - i) * 86400000).toISOString().slice(0, 10);
    const count = attempts.filter(a => a.attemptedAt.slice(0, 10) === d).length;
    return { date: d, count };
  });

  return {
    last30Days,
    bySubject,
    mockEvolution,
    totalFocus,
    byPeriod,
    thisWeekAttempts: thisWeekAttempts.length,
    lastWeekAttempts: lastWeekAttempts.length,
    weeklyGrowth,
    heatmap,
    totalAttempts: attempts.length,
    totalCorrect: attempts.filter(a => a.correct).length,
    overallAccuracy: attempts.length ? Math.round((attempts.filter(a => a.correct).length / attempts.length) * 100) : 0,
  };
}
