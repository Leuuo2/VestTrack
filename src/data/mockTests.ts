import { notifyLocalChange } from "@/lib/syncBus";

export type MockTest = {
  id: string;
  name: string;
  date: string; // yyyy-mm-dd
  scores: Record<string, number>; // materia -> nota
};

export const MOCK_TESTS_KEY = "vesttrack:mock-tests";
export const defaultMockTests: MockTest[] = [];

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${day}/${month}/${year}`;
}

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

export function subjectAverage(tests: MockTest[], subjectId: string): number {
  const scores = subjectScores(tests, subjectId);
  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length);
}

export function loadMockTests(): MockTest[] {
  try {
    const raw = localStorage.getItem(MOCK_TESTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as MockTest[];
      if (Array.isArray(parsed)) {
        // limpa dados fake antigos que tinha antes
        const isFakeData = parsed.some(t => ["simulado-12", "simulado-13", "simulado-14"].includes(t.id));
        if (isFakeData) {
          localStorage.removeItem(MOCK_TESTS_KEY);
          return [];
        }
        return parsed;
      }
    }
  } catch {}
  return defaultMockTests;
}

export function saveMockTests(tests: MockTest[]): void {
  try {
    localStorage.setItem(MOCK_TESTS_KEY, JSON.stringify(tests));
  } catch {}
  notifyLocalChange("mockTests");
}
