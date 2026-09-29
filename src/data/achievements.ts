import { notifyLocalChange } from "@/lib/syncBus";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  unlockedAt?: string;
  progress: number;
  total: number;
};

export type UserLevel = {
  level: number;
  xp: number;
  totalXp: number;
  nextLevelXp: number;
};

const STORAGE_KEY_XP = "vesttrack:xp";
const STORAGE_KEY_ACHIEVEMENTS = "vesttrack:achievements";

const ACHIEVEMENTS_SEED: Omit<Achievement, "unlockedAt" | "progress">[] = [
  { id: "first-task", title: "Primeira tarefa", description: "Conclua sua primeira tarefa", icon: "🎯", xp: 10, total: 1 },
  { id: "10-tasks", title: "Focado", description: "Conclua 10 tarefas", icon: "🔥", xp: 50, total: 10 },
  { id: "50-tasks", title: "Imparável", description: "Conclua 50 tarefas", icon: "⚡", xp: 200, total: 50 },
  { id: "first-question", title: "Primeira questão", description: "Responda sua primeira questão", icon: "🧠", xp: 10, total: 1 },
  { id: "50-questions", title: "Questionador", description: "Responda 50 questões", icon: "📚", xp: 100, total: 50 },
  { id: "100-questions", title: "Mestre das questões", description: "Responda 100 questões", icon: "🏆", xp: 300, total: 100 },
  { id: "streak-3", title: "3 dias seguidos", description: "Estude 3 dias seguidos", icon: "📅", xp: 30, total: 3 },
  { id: "streak-7", title: "Uma semana", description: "Estude 7 dias seguidos", icon: "🗓️", xp: 100, total: 7 },
  { id: "streak-30", title: "Mês de foco", description: "Estude 30 dias seguidos", icon: "💎", xp: 500, total: 30 },
  { id: "all-subjects", title: "Generalista", description: "Estude todas as 10 matérias", icon: "🌟", xp: 100, total: 10 },
  { id: "mock-first", title: "Primeiro simulado", description: "Registre seu primeiro simulado", icon: "📝", xp: 20, total: 1 },
  { id: "flash-10", title: "Memória boa", description: "Revise 10 flashcards", icon: "🃏", xp: 50, total: 10 },
  { id: "redacao-1", title: "Primeira redação", description: "Escreva sua primeira redação", icon: "✍️", xp: 30, total: 1 },
];

export function loadXp(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_XP);
    if (raw) return JSON.parse(raw) as number;
  } catch {}
  return 0;
}

export function saveXp(xp: number) {
  try {
    localStorage.setItem(STORAGE_KEY_XP, JSON.stringify(xp));
  } catch {}
  notifyLocalChange("xp");
}

export function addXp(amount: number) {
  const current = loadXp();
  const newXp = current + amount;
  saveXp(newXp);
  checkAchievements();
  return newXp;
}

export function getUserLevel(): UserLevel {
  const totalXp = loadXp();
  // Level formula: 100 * level^1.5
  let level = 1;
  let xpForNext = 100;
  let accumulated = 0;
  
  while (totalXp >= accumulated + xpForNext) {
    accumulated += xpForNext;
    level++;
    xpForNext = Math.floor(100 * Math.pow(level, 1.5));
  }
  
  return {
    level,
    xp: totalXp - accumulated,
    totalXp,
    nextLevelXp: xpForNext,
  };
}

export function loadAchievements(): Achievement[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
    if (raw) {
      const parsed = JSON.parse(raw) as Achievement[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return ACHIEVEMENTS_SEED.map(a => ({ ...a, progress: 0 }));
}

export function saveAchievements(achs: Achievement[]) {
  try {
    localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(achs));
  } catch {}
  notifyLocalChange("achievements");
}

export function checkAchievements() {
  // This will be called from various places, for now just load and save
  const achievements = loadAchievements();
  
  // Check tasks
  try {
    const tasksRaw = localStorage.getItem("vesttrack:tasks");
    if (tasksRaw) {
      const tasks = JSON.parse(tasksRaw) as any[];
      const completed = tasks.filter((t: any) => t.completed).length;
      
      achievements.forEach(ach => {
        if (ach.id === "first-task") ach.progress = Math.min(completed, 1);
        if (ach.id === "10-tasks") ach.progress = Math.min(completed, 10);
        if (ach.id === "50-tasks") ach.progress = Math.min(completed, 50);
        
        if (ach.progress >= ach.total && !ach.unlockedAt) {
          ach.unlockedAt = new Date().toISOString();
          addXp(ach.xp);
        }
      });
    }
  } catch {}
  
  // Check questions
  try {
    const attemptsRaw = localStorage.getItem("vesttrack:questionAttempts");
    if (attemptsRaw) {
      const attempts = JSON.parse(attemptsRaw) as any[];
      const count = attempts.length;
      
      achievements.forEach(ach => {
        if (ach.id === "first-question") ach.progress = Math.min(count, 1);
        if (ach.id === "50-questions") ach.progress = Math.min(count, 50);
        if (ach.id === "100-questions") ach.progress = Math.min(count, 100);
        
        if (ach.progress >= ach.total && !ach.unlockedAt) {
          ach.unlockedAt = new Date().toISOString();
        }
      });
    }
  } catch {}
  
  saveAchievements(achievements);
  return achievements;
}

export function getUnlockedAchievements() {
  return loadAchievements().filter(a => a.unlockedAt);
}

export function getLockedAchievements() {
  return loadAchievements().filter(a => !a.unlockedAt);
}
