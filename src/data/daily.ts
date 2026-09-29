import { loadTasks, DEFAULT_TASKS } from "@/data/tasks";
import { subjects, loadTopics } from "@/data/subjects";
import { loadPlanner } from "@/data/planner";
import { loadAttempts } from "@/data/questionAttempts";
import { loadQuestions } from "@/data/questions";

export type DailyProgress = {
  date: string;
  tasksTotal: number;
  tasksDone: number;
  topicsTotal: number;
  topicsDone: number;
  plannerTotal: number;
  plannerDone: number;
  questionsTotal: number;
  questionsDoneToday: number;
};

export function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getDailyProgress(): DailyProgress {
  const today = getTodayString();
  const allTasks = subjects.flatMap(s => loadTasks(s.id, DEFAULT_TASKS[s.id] ?? []));
  const allTopics = subjects.flatMap(s => loadTopics(s.id, s.topics));
  const allPlanner = subjects.flatMap(s => loadPlanner(s.id));
  const todayPlanner = allPlanner.filter(e => e.date === today);
  const attemptsToday = loadAttempts().filter(a => a.attemptedAt.slice(0, 10) === today);
  const questions = loadQuestions();

  return {
    date: today,
    tasksTotal: allTasks.length,
    tasksDone: allTasks.filter(t => t.done).length,
    topicsTotal: allTopics.length,
    topicsDone: allTopics.filter(t => t.done).length,
    plannerTotal: todayPlanner.length,
    plannerDone: todayPlanner.filter(e => e.done).length,
    questionsTotal: questions.length,
    questionsDoneToday: attemptsToday.length,
  };
}

export function getTodayPlanner() {
  const today = getTodayString();
  return subjects.flatMap(s => {
    const events = loadPlanner(s.id).filter(e => e.date === today);
    return events.map(ev => ({ ...ev, subjectId: s.id, subject: s }));
  }).sort((a, b) => a.title.localeCompare(b.title));
}

export function getPendingTasks(limit = 5) {
  return subjects.flatMap(s => {
    const tasks = loadTasks(s.id, DEFAULT_TASKS[s.id] ?? []).filter(t => !t.done);
    return tasks.map(t => ({ ...t, subjectId: s.id, subject: s }));
  }).slice(0, limit);
}

export function getNextTopics(limit = 5) {
  return subjects.flatMap(s => {
    const topics = loadTopics(s.id, s.topics).filter(t => !t.done).slice(0, 2);
    return topics.map(t => ({ ...t, subjectId: s.id, subject: s }));
  }).slice(0, limit);
}

export function getQuestionsToReview(limit = 5) {
  const attempts = loadAttempts();
  const wrongIds = new Set(attempts.filter(a => !a.correct).map(a => a.questionId));
  const questions = loadQuestions().filter(q => wrongIds.has(q.id));
  return questions.slice(0, limit);
}

export type DailyTargets = {
  tasks: number;
  topics: number;
  questions: number;
  planner: number;
};

const TARGETS_KEY = "vesttrack:daily-targets";

export function loadDailyTargets(): DailyTargets {
  try {
    const raw = localStorage.getItem(TARGETS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DailyTargets;
      if (parsed && typeof parsed.tasks === "number") return parsed;
    }
  } catch {}
  return { tasks: 3, topics: 2, questions: 10, planner: 3 };
}

export function saveDailyTargets(targets: DailyTargets) {
  try {
    localStorage.setItem(TARGETS_KEY, JSON.stringify(targets));
  } catch {}
}
