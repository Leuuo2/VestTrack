// bus simples pra desacoplar dados locais do sync
// tasks.ts etc chamam notify, sync.ts escuta

export type DataScope = "topics" | "tasks" | "mockTests" | "profile" | "xp" | "achievements" | "essays" | "flashcards" | "goals" | "activity" | "streak";

type Handler = (subjectId?: string) => void;
const handlers = new Map<DataScope, Set<Handler>>();

export function onDataChange(scope: DataScope, handler: Handler) {
  const set = handlers.get(scope) ?? new Set<Handler>();
  set.add(handler);
  handlers.set(scope, set);
  return () => set.delete(handler);
}

export function notifyLocalChange(scope: DataScope, subjectId?: string) {
  handlers.get(scope)?.forEach((h) => {
    try { h(subjectId); } catch (err) {
      console.error(`[sync] erro ${scope}:`, err);
    }
  });
}
