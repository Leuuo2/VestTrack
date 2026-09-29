import { notifyLocalChange } from "@/lib/syncBus";

export type Summary = {
  id: string;
  subjectId: string;
  topicId?: string;
  title: string;
  content: string; // markdown
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = "vesttrack:summaries";

export function loadSummaries(): Summary[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Summary[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

export function saveSummaries(summaries: Summary[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(summaries));
  } catch {}
  notifyLocalChange("summaries" as any);
}

export function addSummary(s: Omit<Summary, "id" | "createdAt" | "updatedAt">) {
  const all = loadSummaries();
  const newSummary: Summary = {
    ...s,
    id: `sum-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  saveSummaries([newSummary, ...all]);
  return newSummary;
}

export function removeSummary(id: string) {
  saveSummaries(loadSummaries().filter(s => s.id !== id));
}

export function updateSummary(id: string, patch: Partial<Summary>) {
  const all = loadSummaries();
  const updated = all.map(s => s.id === id ? { ...s, ...patch, updatedAt: new Date().toISOString() } : s);
  saveSummaries(updated);
}

export function getSummariesBySubject(subjectId: string) {
  return loadSummaries().filter(s => s.subjectId === subjectId);
}

export function getSummaryById(id: string) {
  return loadSummaries().find(s => s.id === id);
}
