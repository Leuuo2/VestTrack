import { notifyLocalChange } from "@/lib/syncBus";

export type PlannerType = "estudo" | "revisao" | "simulado" | "descanso";

export type PlannerEvent = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: PlannerType;
  done: boolean;
  topicId?: string;
};

function plannerKey(subjectId: string): string {
  return `vesttrack:planner:${subjectId}`;
}

export function loadPlanner(subjectId: string): PlannerEvent[] {
  try {
    const raw = localStorage.getItem(plannerKey(subjectId));
    if (raw) {
      const parsed = JSON.parse(raw) as PlannerEvent[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

export function savePlanner(subjectId: string, events: PlannerEvent[]) {
  try {
    localStorage.setItem(plannerKey(subjectId), JSON.stringify(events));
  } catch {}
  notifyLocalChange("tasks", subjectId);
}

export function getWeekDays(): { date: string; label: string; dayName: string }[] {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay()); // domingo

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return {
      date: d.toISOString().slice(0, 10),
      label: d.getDate().toString(),
      dayName: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][d.getDay()],
    };
  });
}
