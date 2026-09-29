import { notifyLocalChange } from "@/lib/syncBus";

export type Task = {
  id: string;
  title: string;
  done: boolean;
};

export const DEFAULT_TASKS: Record<string, Task[]> = {
  matematica: [
    { id: "mat-1", title: "Resolver 10 exercícios de função", done: false },
    { id: "mat-2", title: "Revisar trigonometria", done: false },
  ],
  fisica: [
    { id: "fis-1", title: "Fazer lista de cinemática", done: false },
  ],
  quimica: [
    { id: "qui-1", title: "Revisar estequiometria", done: false },
  ],
  biologia: [
    { id: "bio-1", title: "Resumo de genética", done: false },
  ],
  historia: [
    { id: "his-1", title: "Ler sobre Revolução Francesa", done: false },
  ],
  geografia: [
    { id: "geo-1", title: "Mapa mental de climas", done: false },
  ],
  portugues: [
    { id: "por-1", title: "Escrever redação", done: false },
  ],
  ingles: [
    { id: "ing-1", title: "10 questões de reading", done: false },
  ],
  filosofia: [
    { id: "fil-1", title: "Resumo de ética", done: false },
  ],
  sociologia: [
    { id: "soc-1", title: "Ler sobre Durkheim", done: false },
  ],
};

function key(subjectId: string) {
  return `vesttrack:tasks:${subjectId}`;
}

export function loadTasks(subjectId: string, fallback: Task[]): Task[] {
  try {
    const raw = localStorage.getItem(key(subjectId));
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return fallback;
}

export function saveTasks(subjectId: string, tasks: Task[]) {
  try {
    localStorage.setItem(key(subjectId), JSON.stringify(tasks));
  } catch {}
  notifyLocalChange("tasks", subjectId);
}
