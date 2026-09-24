import {
  loadMockTests,
  saveMockTests,
  type MockTest,
} from "@/data/mockTests";
import {
  DEFAULT_TASKS,
  loadTasks,
  saveTasks,
  type Task,
} from "@/data/tasks";
import { loadProfile, saveProfile } from "@/lib/profile";
import { subjects, loadTopics, saveTopics } from "@/data/subjects";
import { onDataChange } from "./syncBus";
import { isCloudConfigured, supabase } from "./supabase";

export type CloudUser = { id: string; email: string };

/* ----------------------------- Estado da sessão ---------------------------- */

let currentUser: CloudUser | null = null;
const userListeners = new Set<(user: CloudUser | null) => void>();

export function getCloudUser(): CloudUser | null {
  return currentUser;
}

/** Assina mudanças de login/logout. Retorna a função de des-assinar. */
export function onCloudUserChange(
  listener: (user: CloudUser | null) => void,
): () => void {
  userListeners.add(listener);
  return () => {
    userListeners.delete(listener);
  };
}

function setUser(user: CloudUser | null): void {
  currentUser = user;
  userListeners.forEach((listener) => listener(user));
}

/* ------------------------------- Ações de conta ---------------------------- */

function friendlyAuthError(message: string): string {
  if (message.includes("Invalid login credentials")) {
    return "E-mail ou senha incorretos.";
  }
  if (message.includes("Email not confirmed")) {
    return "Confirme seu e-mail antes de entrar (o link foi enviado para sua caixa de entrada).";
  }
  if (message.includes("already registered")) {
    return "Este e-mail já tem uma conta.";
  }
  if (message.includes("at least 6 characters")) {
    return "A senha precisa de pelo menos 6 caracteres.";
  }
  if (message.includes("rate limit")) {
    return "Muitas tentativas. Espere um minuto e tente de novo.";
  }
  return message;
}

export function cloudIsConfigured(): boolean {
  return isCloudConfigured;
}

/** Entra com e-mail + senha. Ao entrar, baixa os dados da nuvem. */
export async function cloudSignIn(email: string, password: string): Promise<void> {
  if (!supabase) throw new Error("A nuvem ainda não foi configurada.");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(friendlyAuthError(error.message));
  await pullAllFromCloud();
}

/**
 * Cria a conta. Se o Supabase exigir confirmação por e-mail,
 * retorna "confirm-email" (o usuário clica no link do e-mail e só
 * depois consegue entrar).
 */
export async function cloudSignUp(
  email: string,
  password: string,
  name: string,
): Promise<"ok" | "confirm-email"> {
  if (!supabase) throw new Error("A nuvem ainda não foi configurada.");
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) throw new Error(friendlyAuthError(error.message));
  if (!data.session) return "confirm-email";
  await pullAllFromCloud();
  return "ok";
}

export async function cloudSignOut(): Promise<void> {
  if (!supabase) return;
  await supabase.auth.signOut();
}

/* ----------------------------- Pull (nuvem → local) ------------------------ */

/**
 * Guard contra reentrância: enquanto o pull grava no localStorage, as
 * chamadas de save* disparam notifyLocalChange — sem este flag, o app
 * enviaria de volta para a nuvem exatamente o que acabou de baixar.
 */
let pulling = false;

/**
 * Baixa TUDO do Supabase e grava no localStorage.
 *
 * Regras de mescla (simples e previsíveis):
 *  - Perfil: campo vazio na nuvem mantém o valor local;
 *  - Tópicos: cada tópico com linha na nuvem adota o flag da nuvem;
 *  - Tarefas: matéria com tarefas na nuvem é substituída; sem linhas,
 *    o estado local é mantido;
 *  - Simulados: com linhas na nuvem, a nuvem é a fonte; sem linhas,
 *    mantém o local.
 */
export async function pullAllFromCloud(): Promise<void> {
  const user = currentUser;
  if (!supabase || !user) return;

  pulling = true;
  try {
    await pullInner(supabase, user.id);
  } finally {
    pulling = false;
  }
}

async function pullInner(
  client: NonNullable<typeof supabase>,
  userId: string,
): Promise<void> {

  // ---- Perfil ----
  const { data: profile } = await client
    .from("profiles")
    .select("name, goal, weekly_hours")
    .eq("id", userId)
    .maybeSingle();
  if (profile) {
    const local = loadProfile();
    saveProfile({
      name: profile.name || local.name,
      goal: profile.goal || local.goal,
      weeklyHours:
        typeof profile.weekly_hours === "number"
          ? profile.weekly_hours
          : local.weeklyHours,
    });
  }

  // ---- Tópicos ----
  const { data: topicRows } = await client
    .from("topic_progress")
    .select("subject_id, topic_id, done")
    .eq("user_id", userId);
  if (topicRows && topicRows.length > 0) {
    const bySubject = new Map<string, Record<string, boolean>>();
    for (const row of topicRows) {
      const map = bySubject.get(row.subject_id) ?? {};
      map[row.topic_id] = row.done;
      bySubject.set(row.subject_id, map);
    }
    bySubject.forEach((doneMap, subjectId) => {
      const subject = subjects.find((s) => s.id === subjectId);
      if (!subject) return; // matéria desconhecida — ignora
      const local = loadTopics(subjectId, subject.topics);
      saveTopics(
        subjectId,
        local.map((topic) =>
          doneMap[topic.id] != null ? { ...topic, done: doneMap[topic.id] } : topic,
        ),
      );
    });
  }

  // ---- Tarefas ----
  const { data: taskRows } = await client
    .from("tasks")
    .select("id, subject_id, title, done")
    .eq("user_id", userId);
  if (taskRows && taskRows.length > 0) {
    const bySubject = new Map<string, Task[]>();
    for (const row of taskRows) {
      const list = bySubject.get(row.subject_id) ?? [];
      list.push({ id: row.id, title: row.title, done: row.done });
      bySubject.set(row.subject_id, list);
    }
    bySubject.forEach((tasks, subjectId) => saveTasks(subjectId, tasks));
  }

  // ---- Simulados ----
  const { data: mockRows } = await client
    .from("mock_tests")
    .select("id, name, test_date, scores")
    .eq("user_id", userId)
    .order("test_date", { ascending: false });
  if (mockRows && mockRows.length > 0) {
    const tests: MockTest[] = mockRows.map((row) => ({
      id: row.id,
      name: row.name,
      date: row.test_date,
      scores: (row.scores ?? {}) as Record<string, number>,
    }));
    saveMockTests(tests);
  }
}

/* ------------------------------ Push (local → nuvem) ----------------------- */

async function pushTopics(userId: string, subjectId: string): Promise<void> {
  if (pulling) return;
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject || !supabase) return;
  const topics = loadTopics(subjectId, subject.topics);
  const { error } = await supabase
    .from("topic_progress")
    .upsert(
      topics.map((topic) => ({
        user_id: userId,
        subject_id: subjectId,
        topic_id: topic.id,
        done: topic.done,
      })),
      { onConflict: "user_id,subject_id,topic_id" },
    );
  if (error) console.warn("[sync] pushTopics falhou:", error.message);
}

async function pushTasks(userId: string, subjectId: string): Promise<void> {
  if (pulling || !supabase) return;
  const tasks = loadTasks(subjectId, DEFAULT_TASKS[subjectId] ?? []);
  // Substitui o conjunto da matéria — assim renomear/apagar também sincroniza.
  const { error: delError } = await supabase
    .from("tasks")
    .delete()
    .eq("user_id", userId)
    .eq("subject_id", subjectId);
  if (delError) {
    console.warn("[sync] pushTasks (delete) falhou:", delError.message);
    return;
  }
  if (tasks.length === 0) return;
  const { error } = await supabase
    .from("tasks")
    .insert(
      tasks.map((task) => ({
        id: task.id,
        user_id: userId,
        subject_id: subjectId,
        title: task.title,
        done: task.done,
      })),
    );
  if (error) console.warn("[sync] pushTasks (insert) falhou:", error.message);
}

async function pushMockTests(userId: string): Promise<void> {
  if (pulling || !supabase) return;
  const tests = loadMockTests();
  // Remove da nuvem simulados que não existem mais localmente.
  const localIds = new Set(tests.map((t) => t.id));
  const { data: cloudRows } = await supabase
    .from("mock_tests")
    .select("id")
    .eq("user_id", userId);
  const toDelete = (cloudRows ?? [])
    .map((row) => row.id as string)
    .filter((id) => !localIds.has(id));
  if (toDelete.length > 0) {
    const { error: delError } = await supabase
      .from("mock_tests")
      .delete()
      .eq("user_id", userId)
      .in("id", toDelete);
    if (delError) {
      console.warn("[sync] pushMockTests (delete) falhou:", delError.message);
      return;
    }
  }
  const { error } = await supabase
    .from("mock_tests")
    .upsert(
      tests.map((test) => ({
        id: test.id,
        user_id: userId,
        name: test.name,
        test_date: test.date,
        scores: test.scores,
      })),
      { onConflict: "user_id,id" },
    );
  if (error) console.warn("[sync] pushMockTests (upsert) falhou:", error.message);
}

async function pushProfile(userId: string): Promise<void> {
  if (pulling || !supabase) return;
  const profile = loadProfile();
  const { error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: userId,
        name: profile.name,
        goal: profile.goal,
        weekly_hours: profile.weeklyHours,
      },
      { onConflict: "id" },
    );
  if (error) console.warn("[sync] pushProfile falhou:", error.message);
}

/* -------------------------------- Inicialização ---------------------------- */

let initialized = false;

/**
 * Liga o sync: assina a sessão do Supabase e registra o push automático
 * para cada escopo de dados. Chamar UMA vez, no carregamento do app
 * (main.tsx). Sem configuração no .env, faz nada — o app segue só local.
 */
export function initCloudSync(): void {
  if (!supabase || initialized) return;
  initialized = true;

  supabase.auth.onAuthStateChange((_event, session) => {
    const user = session?.user;
    setUser(user ? { id: user.id, email: user.email ?? "" } : null);
  });

  // Toda gravação local dispara o push (fire-and-forget).
  onDataChange("topics", (subjectId) => {
    if (currentUser && subjectId) void pushTopics(currentUser.id, subjectId);
  });
  onDataChange("tasks", (subjectId) => {
    if (currentUser && subjectId) void pushTasks(currentUser.id, subjectId);
  });
  onDataChange("mockTests", () => {
    if (currentUser) void pushMockTests(currentUser.id);
  });
  onDataChange("profile", () => {
    if (currentUser) void pushProfile(currentUser.id);
  });
}
