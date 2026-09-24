import { notifyLocalChange } from "@/lib/syncBus";

export type Task = {
  id: string;
  title: string;
  done: boolean;
};

/**
 * Tarefas padrão por matéria (seed de demonstração).
 * O que o usuário alterar fica no localStorage — mesmo padrão dos tópicos.
 */
export const DEFAULT_TASKS: Record<string, Task[]> = {
  matematica: [
    { id: "mat-t1", title: "Fazer 20 exercícios de funções quadráticas", done: true },
    { id: "mat-t2", title: "Resolver lista de geometria analítica", done: false },
    { id: "mat-t3", title: "Revisar probabilidade antes do simulado", done: false },
  ],
  geografia: [
    { id: "geo-t1", title: "Resumo de geopolítica mundial", done: true },
    { id: "geo-t2", title: "Exercícios de cartografia", done: true },
    { id: "geo-t3", title: "Revisar climas do Brasil", done: false },
  ],
  historia: [
    { id: "his-t1", title: "Cronologia da Idade Média", done: true },
    { id: "his-t2", title: "Ficha da Revolução Francesa", done: false },
    { id: "his-t3", title: "Questões sobre Brasil Colônia", done: false },
  ],
  fisica: [
    { id: "fis-t1", title: "Lista de cinemática", done: true },
    { id: "fis-t2", title: "Exercícios de dinâmica", done: true },
    { id: "fis-t3", title: "Anotar fórmulas de eletromagnetismo", done: false },
  ],
  quimica: [
    { id: "qui-t1", title: "Decorar a tabela periódica", done: false },
    { id: "qui-t2", title: "Exercícios de estequiometria", done: false },
    { id: "qui-t3", title: "Revisar funções inorgânicas", done: true },
  ],
  biologia: [
    { id: "bio-t1", title: "Mapa mental de genética", done: true },
    { id: "bio-t2", title: "Exercícios de ecologia", done: false },
    { id: "bio-t3", title: "Revisar fisiologia humana", done: false },
  ],
  portugues: [
    { id: "por-t1", title: "Análise sintática de texto", done: true },
    { id: "por-t2", title: "Exercícios de crase", done: false },
    { id: "por-t3", title: "Resumo de figuras de linguagem", done: false },
  ],
  ingles: [
    { id: "ing-t1", title: "Phrasal verbs — lista 1", done: true },
    { id: "ing-t2", title: "Reading comprehension 2x na semana", done: false },
    { id: "ing-t3", title: "Revisar verb tenses", done: false },
  ],
  filosofia: [
    { id: "fil-t1", title: "Resumo: Sócrates, Platão e Aristóteles", done: false },
    { id: "fil-t2", title: "Ficha sobre o Iluminismo", done: false },
    { id: "fil-t3", title: "Exercícios de ética", done: false },
  ],
  sociologia: [
    { id: "soc-t1", title: "Resumo de cultura e globalização", done: true },
    { id: "soc-t2", title: "Exercícios de trabalho e produção", done: false },
    { id: "soc-t3", title: "Revisar Estado e poder", done: false },
  ],
};

export function tasksKey(id: string): string {
  return `vesttrack:tasks:${id}`;
}

export function loadTasks(id: string, fallback: Task[]): Task[] {
  try {
    const raw = localStorage.getItem(tasksKey(id));
    if (raw) {
      const parsed = JSON.parse(raw) as Task[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // localStorage indisponível — usa as tarefas padrão
  }
  return fallback;
}

export function saveTasks(id: string, tasks: Task[]): void {
  try {
    localStorage.setItem(tasksKey(id), JSON.stringify(tasks));
  } catch {
    // ignora falhas de persistência
  }
  // Avisa a camada de sync (nuvem) — não faz nada se o usuário não tem conta.
  notifyLocalChange("tasks", id);
}
