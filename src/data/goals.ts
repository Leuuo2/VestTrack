import { notifyLocalChange } from "@/lib/syncBus";

export type Goal = {
  id: string;
  title: string;
  type: "questions" | "topics" | "flashcards" | "focus" | "custom";
  target: number;
  current: number;
  period: "daily" | "weekly" | "monthly";
  subjectId?: string;
  createdAt: string;
  completedAt?: string;
};

export type StreakData = {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  history: Record<string, number>;
};

export type DailyActivity = {
  date: string;
  questions: number;
  topics: number;
  flashcards: number;
  focusMinutes: number;
  xp: number;
};

const GOALS_KEY = "vesttrack:goals";
const STREAK_KEY = "vesttrack:streak";
const ACTIVITY_KEY = "vesttrack:activity";

const DEFAULT_GOALS: Omit<Goal, "current" | "createdAt">[] = [
  { id: "daily-questions", title: "10 questões por dia", type: "questions", target: 10, period: "daily" },
  { id: "daily-topics", title: "2 tópicos por dia", type: "topics", target: 2, period: "daily" },
  { id: "weekly-focus", title: "10h de foco na semana", type: "focus", target: 600, period: "weekly" },
  { id: "daily-flash", title: "20 flashcards", type: "flashcards", target: 20, period: "daily" },
];

export function loadGoals(): Goal[] {
  try {
    const raw = localStorage.getItem(GOALS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Goal[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return DEFAULT_GOALS.map(g => ({ ...g, current: 0, createdAt: new Date().toISOString() }));
}

export function saveGoals(goals: Goal[]) {
  try { localStorage.setItem(GOALS_KEY, JSON.stringify(goals)); } catch {}
  notifyLocalChange("goals");
}

export function loadStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StreakData;
      if (parsed && typeof parsed.currentStreak === "number") return parsed;
    }
  } catch {}
  return { currentStreak: 0, longestStreak: 0, lastActiveDate: "", history: {} };
}

export function saveStreak(streak: StreakData) {
  try { localStorage.setItem(STREAK_KEY, JSON.stringify(streak)); } catch {}
}

export function loadActivity(): DailyActivity[] {
  try {
    const raw = localStorage.getItem(ACTIVITY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DailyActivity[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

export function saveActivity(activities: DailyActivity[]) {
  try { localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activities.slice(-90))); } catch {}
}

export function recordActivity(type: "questions" | "topics" | "flashcards" | "focus", amount: number = 1, xp: number = 0) {
  const today = new Date().toISOString().slice(0, 10);
  const activities = loadActivity();
  let todayAct = activities.find(a => a.date === today);
  if (!todayAct) {
    todayAct = { date: today, questions: 0, topics: 0, flashcards: 0, focusMinutes: 0, xp: 0 };
    activities.push(todayAct);
  }
  if (type === "questions") todayAct.questions += amount;
  if (type === "topics") todayAct.topics += amount;
  if (type === "flashcards") todayAct.flashcards += amount;
  if (type === "focus") todayAct.focusMinutes += amount;
  todayAct.xp += xp;
  saveActivity(activities);
  updateStreak(today);
  updateGoalsProgress(type, amount);
}

function updateStreak(today: string) {
  const streak = loadStreak();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (streak.lastActiveDate === today) return;
  if (streak.lastActiveDate === yesterday) {
    streak.currentStreak += 1;
  } else {
    const lastDate = streak.lastActiveDate ? new Date(streak.lastActiveDate) : null;
    const todayDate = new Date(today);
    const diff = lastDate ? Math.floor((todayDate.getTime() - lastDate.getTime()) / 86400000) : 999;
    if (diff === 1) streak.currentStreak += 1;
    else if (diff > 1) streak.currentStreak = 1;
    else if (!streak.lastActiveDate) streak.currentStreak = 1;
  }
  if (streak.currentStreak > streak.longestStreak) streak.longestStreak = streak.currentStreak;
  streak.lastActiveDate = today;
  streak.history[today] = (streak.history[today] || 0) + 1;
  const cutoff = new Date(Date.now() - 90 * 86400000).toISOString().slice(0, 10);
  Object.keys(streak.history).forEach(d => { if (d < cutoff) delete streak.history[d]; });
  saveStreak(streak);
}

function updateGoalsProgress(type: Goal["type"], amount: number) {
  const goals = loadGoals();
  const today = new Date().toISOString().slice(0, 10);
  goals.forEach(g => {
    if (g.type !== type && g.type !== "custom") return;
    if (g.period === "daily") {
      const lastReset = localStorage.getItem(`vesttrack:goal-reset:${g.id}`);
      if (lastReset !== today) {
        if (g.completedAt?.slice(0, 10) !== today) {
          g.current = 0;
          g.completedAt = undefined;
        }
        localStorage.setItem(`vesttrack:goal-reset:${g.id}`, today);
      }
    }
    g.current += amount;
    if (g.current >= g.target && !g.completedAt) g.completedAt = new Date().toISOString();
  });
  saveGoals(goals);
}

export function addCustomGoal(title: string, type: Goal["type"], target: number, period: Goal["period"], subjectId?: string) {
  const goals = loadGoals();
  const newGoal: Goal = {
    id: `goal-${Date.now()}`,
    title, type, target, current: 0, period, subjectId,
    createdAt: new Date().toISOString(),
  };
  goals.push(newGoal);
  saveGoals(goals);
  return newGoal;
}

export function removeGoal(id: string) {
  const filtered = loadGoals().filter(g => g.id !== id);
  saveGoals(filtered);
}

export function getStreakStats() {
  const streak = loadStreak();
  const activities = loadActivity();
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    const act = activities.find(a => a.date === d);
    return { date: d, total: act ? act.questions + act.topics + act.flashcards : 0, ...act };
  }).reverse();
  const last30 = activities.slice(-30);
  const totalXp30 = last30.reduce((s, a) => s + a.xp, 0);
  const totalQuestions30 = last30.reduce((s, a) => s + a.questions, 0);
  return { streak, last7, last30, totalXp30, totalQuestions30 };
}
