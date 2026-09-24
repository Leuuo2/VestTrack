import { notifyLocalChange } from "@/lib/syncBus";

export type MockTest = {
  id: string;
  name: string;
  /** Data em formato ISO (yyyy-mm-dd) — ordena corretamente em string. */
  date: string;
  /** subjectId -> nota (0-100). Somente as matérias feitas no simulado. */
  scores: Record<string, number>;
};

export const MOCK_TESTS_KEY = "vesttrack:mock-tests";

export const defaultMockTests: MockTest[] = [
  {
    id: "simulado-14",
    name: "Simulado 14",
    date: "2026-09-10",
    scores: {
      matematica: 72,
      geografia: 91,
      historia: 42,
      fisica: 55,
      quimica: 48,
      biologia: 66,
      portugues: 74,
      ingles: 81,
      filosofia: 52,
      sociologia: 60,
    },
  },
  {
    id: "simulado-13",
    name: "Simulado 13",
    date: "2026-08-27",
    scores: {
      matematica: 64,
      geografia: 88,
      historia: 38,
      fisica: 61,
      quimica: 41,
      biologia: 62,
      portugues: 70,
      ingles: 77,
      filosofia: 47,
      sociologia: 57,
    },
  },
  {
    id: "simulado-12",
    name: "Simulado 12",
    date: "2026-08-13",
    scores: {
      matematica: 58,
      geografia: 84,
      historia: 35,
      fisica: 49,
      quimica: 38,
      biologia: 59,
      portugues: 68,
      ingles: 74,
      filosofia: 44,
      sociologia: 53,
    },
  },
];

/** "2026-09-10" -> "10/09/2026" */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${day}/${month}/${year}`;
}

/** Média geral de um simulado (média das matérias feitas). */
export function overallScore(test: MockTest): number {
  const values = Object.values(test.scores);
  if (values.length === 0) return 0;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

export type SubjectScore = {
  id: string;
  name: string;
  date: string;
  score: number;
};

/** Simulados que incluem a matéria, do mais recente para o mais antigo. */
export function subjectScores(tests: MockTest[], subjectId: string): SubjectScore[] {
  return tests
    .filter((test) => test.scores[subjectId] != null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((test) => ({
      id: test.id,
      name: test.name,
      date: test.date,
      score: test.scores[subjectId],
    }));
}

/** Média da matéria em todos os simulados em que ela apareceu. */
export function subjectAverage(tests: MockTest[], subjectId: string): number {
  const scores = subjectScores(tests, subjectId);
  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length);
}

/**
 * Fonte única de simulados: lista padrão + o que o usuário adicionou
 * (a lista inteira é persistida no localStorage).
 */
export function loadMockTests(): MockTest[] {
  try {
    const raw = localStorage.getItem(MOCK_TESTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as MockTest[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // localStorage indisponível — usa os simulados padrão
  }
  return defaultMockTests;
}

export function saveMockTests(tests: MockTest[]): void {
  try {
    localStorage.setItem(MOCK_TESTS_KEY, JSON.stringify(tests));
  } catch {
    // ignora falhas de persistência
  }
  // Avisa a camada de sync (nuvem) — não faz nada se o usuário não tem conta.
  notifyLocalChange("mockTests");
}
