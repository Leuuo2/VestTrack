export type StudyPlanItem = {
  id: string;
  subjectId: string;
  topicId?: string;
  title: string;
  duration: number; // minutes
  type: "theory" | "questions" | "review" | "essay" | "flashcards";
  date: string; // YYYY-MM-DD
  completed: boolean;
};

export type StudyPlan = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  items: StudyPlanItem[];
  createdAt: string;
};

const STORAGE_KEY = "vesttrack:studyPlan";

export function loadStudyPlan(): StudyPlan | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StudyPlan;
  } catch {}
  return null;
}

export function saveStudyPlan(plan: StudyPlan) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  } catch {}
}

export function generateStudyPlan(
  subjects: { id: string; name: string; difficulty: "easy" | "medium" | "hard"; hoursPerWeek: number }[],
  days: number = 30,
  hoursPerDay: number = 4
): StudyPlan {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + days);
  
  const items: StudyPlanItem[] = [];
  const types: StudyPlanItem["type"][] = ["theory", "questions", "review", "flashcards", "essay"];
  
  // Distribute subjects by difficulty and hours
  
  for (let d = 0; d < days; d++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + d);
    const dateStr = currentDate.toISOString().split("T")[0];
    
    // Skip Sundays for rest? No, keep light
    const isSunday = currentDate.getDay() === 0;
    const dailyHours = isSunday ? Math.floor(hoursPerDay / 2) : hoursPerDay;
    const sessionsPerDay = Math.floor((dailyHours * 60) / 50); // 50min sessions
    
    for (let s = 0; s < sessionsPerDay; s++) {
      // Pick subject weighted by difficulty and remaining hours
      const subjectIndex = (d + s) % subjects.length;
      const subject = subjects[subjectIndex];
      
      const type = types[(d + s) % types.length];
      const duration = type === "essay" ? 90 : 50;
      
      items.push({
        id: `plan-${d}-${s}`,
        subjectId: subject.id,
        title: `${type === "theory" ? "Teoria" : type === "questions" ? "Questões" : type === "review" ? "Revisão" : type === "flashcards" ? "Flashcards" : "Redação"} - ${subject.name}`,
        duration,
        type,
        date: dateStr,
        completed: false,
      });
    }
  }
  
  return {
    id: `plan-${Date.now()}`,
    name: `Plano ${days} dias - ${hoursPerDay}h/dia`,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    items,
    createdAt: new Date().toISOString(),
  };
}

export function getTodayPlanItems(): StudyPlanItem[] {
  const plan = loadStudyPlan();
  if (!plan) return [];
  const today = new Date().toISOString().split("T")[0];
  return plan.items.filter(item => item.date === today);
}

export function getWeekPlanItems(): StudyPlanItem[] {
  const plan = loadStudyPlan();
  if (!plan) return [];
  const today = new Date();
  const weekFromNow = new Date();
  weekFromNow.setDate(today.getDate() + 7);
  
  return plan.items.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= today && itemDate <= weekFromNow;
  });
}

export function togglePlanItem(id: string) {
  const plan = loadStudyPlan();
  if (!plan) return;
  
  plan.items = plan.items.map(item => 
    item.id === id ? { ...item, completed: !item.completed } : item
  );
  
  saveStudyPlan(plan);
  return plan;
}
