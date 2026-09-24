/**
 * "Bus" de eventos minúsculo que desacopla a camada de dados local
 * (localStorage) da sincronização com a nuvem (Supabase).
 *
 * Por que um bus? Os arquivos de dados (tasks.ts, mockTests.ts...) chamam
 * `notifyLocalChange` toda vez que salvam algo; o `sync.ts` registra um
 * handler para enviar para a nuvem. Se eles importassem um do outro
 * diretamente, teríamos importação circular.
 */
export type DataScope = "topics" | "tasks" | "mockTests" | "profile";

type Handler = (subjectId?: string) => void;

const handlers = new Map<DataScope, Set<Handler>>();

/** Registra um handler para um escopo. Retorna a função de des-registrar. */
export function onDataChange(scope: DataScope, handler: Handler): () => void {
  const set = handlers.get(scope) ?? new Set<Handler>();
  set.add(handler);
  handlers.set(scope, set);
  return () => {
    set.delete(handler);
  };
}

/** Dispara os handlers de um escopo (síncrono — o handler cuida do async). */
export function notifyLocalChange(scope: DataScope, subjectId?: string): void {
  handlers.get(scope)?.forEach((handler) => {
    try {
      handler(subjectId);
    } catch (err) {
      console.error(`[sync] erro no handler de "${scope}":`, err);
    }
  });
}
