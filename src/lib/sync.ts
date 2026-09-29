import { loadMockTests, saveMockTests, type MockTest } from "@/data/mockTests";
import { DEFAULT_TASKS, loadTasks, saveTasks, type Task } from "@/data/tasks";
import { loadProfile, saveProfile } from "@/lib/profile";
import { subjects, loadTopics, saveTopics } from "@/data/subjects";
import { onDataChange } from "./syncBus";
import { isCloudConfigured, supabase } from "./supabase";
import { loadAttempts, saveAttempts } from "@/data/questionAttempts";
import { loadGoals, saveGoals, loadStreak, saveStreak, loadActivity, saveActivity } from "@/data/goals";

export type CloudUser = { id: string; email: string };

let currentUser: CloudUser | null = null;
const userListeners = new Set<(user: CloudUser | null) => void>();

export function getCloudUser() { return currentUser; }

export function onCloudUserChange(listener: (user: CloudUser | null) => void) {
  userListeners.add(listener);
  return () => userListeners.delete(listener);
}

function setUser(user: CloudUser | null) {
  currentUser = user;
  userListeners.forEach(l => l(user));
}

function friendlyAuthError(msg: string) {
  if (msg.includes("Invalid login credentials")) return "E-mail ou senha incorretos.";
  if (msg.includes("Email not confirmed")) return "Confirme seu e-mail antes de entrar.";
  if (msg.includes("already registered")) return "Este e-mail já tem conta.";
  if (msg.includes("at least 6 characters")) return "Senha precisa ter 6 caracteres.";
  if (msg.includes("rate limit")) return "Muitas tentativas, espera um pouco.";
  return msg;
}

export function cloudIsConfigured() { return isCloudConfigured; }

export async function cloudSignIn(email: string, password: string) {
  if (!supabase) throw new Error("Nuvem não configurada");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(friendlyAuthError(error.message));
  await pullAllFromCloud();
}

export async function cloudSignUp(email: string, password: string, name: string): Promise<"ok" | "confirm-email"> {
  if (!supabase) throw new Error("Nuvem não configurada");
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
  if (error) throw new Error(friendlyAuthError(error.message));
  if (!data.session) return "confirm-email";
  await pullAllFromCloud();
  return "ok";
}

export async function cloudSignOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

let pulling = false;

export async function pullAllFromCloud() {
  const user = currentUser;
  if (!supabase || !user) return;
  pulling = true;
  try { await pullInner(supabase, user.id); } finally { pulling = false; }
}

async function pullInner(client: NonNullable<typeof supabase>, userId: string) {
  const { data: profile } = await client.from("profiles").select("name, goal, weekly_hours").eq("id", userId).maybeSingle();
  if (profile) {
    const local = loadProfile();
    saveProfile({
      name: profile.name || local.name,
      goal: profile.goal || local.goal,
      weeklyHours: typeof profile.weekly_hours === "number" ? profile.weekly_hours : local.weeklyHours,
    });
  }

  const { data: topicRows } = await client.from("topic_progress").select("subject_id, topic_id, done").eq("user_id", userId);
  if (topicRows && topicRows.length > 0) {
    const bySubject = new Map<string, Record<string, boolean>>();
    for (const row of topicRows) {
      const map = bySubject.get(row.subject_id) ?? {};
      map[row.topic_id] = row.done;
      bySubject.set(row.subject_id, map);
    }
    bySubject.forEach((doneMap, subjectId) => {
      const subject = subjects.find((s) => s.id === subjectId);
      if (!subject) return;
      const local = loadTopics(subjectId, subject.topics);
      saveTopics(subjectId, local.map((topic) => doneMap[topic.id] != null ? { ...topic, done: doneMap[topic.id] } : topic));
    });
  }

  const { data: taskRows } = await client.from("tasks").select("id, subject_id, title, done").eq("user_id", userId);
  if (taskRows && taskRows.length > 0) {
    const bySubject = new Map<string, Task[]>();
    for (const row of taskRows) {
      const list = bySubject.get(row.subject_id) ?? [];
      list.push({ id: row.id, title: row.title, done: row.done });
      bySubject.set(row.subject_id, list);
    }
    bySubject.forEach((tasks, subjectId) => saveTasks(subjectId, tasks));
  }

  const { data: mockRows } = await client.from("mock_tests").select("id, name, test_date, scores").eq("user_id", userId).order("test_date", { ascending: false });
  if (mockRows && mockRows.length > 0) {
    const tests: MockTest[] = mockRows.map((row) => ({
      id: row.id, name: row.name, date: row.test_date, scores: (row.scores ?? {}) as Record<string, number>,
    }));
    saveMockTests(tests);
  }

  try {
    const { data: attRows } = await client.from("question_attempts").select("id, question_id, selected_index, correct, time_spent, attempted_at").eq("user_id", userId).order("attempted_at", { ascending: false }).limit(500);
    if (attRows && attRows.length > 0) {
      const attempts = attRows.map(r => ({
        id: r.id, questionId: r.question_id, selectedIndex: r.selected_index, correct: r.correct, timeSpent: r.time_spent, attemptedAt: r.attempted_at,
      }));
      saveAttempts(attempts as any);
    }
  } catch {}

  try {
    const { data: goalRows } = await client.from("goals").select("*").eq("user_id", userId);
    if (goalRows && goalRows.length > 0) {
      const goals = goalRows.map((r: any) => ({
        id: r.id, title: r.title, type: r.type, target: r.target, current: r.current, period: r.period, subjectId: r.subject_id, createdAt: r.created_at, completedAt: r.completed_at,
      }));
      saveGoals(goals as any);
    }
  } catch {}

  try {
    const { data: streakRow } = await client.from("streaks").select("*").eq("user_id", userId).maybeSingle();
    if (streakRow) {
      saveStreak({
        currentStreak: streakRow.current_streak,
        longestStreak: streakRow.longest_streak,
        lastActiveDate: streakRow.last_active_date || "",
        history: streakRow.history || {},
      });
    }
  } catch {}

  try {
    const { data: actRows } = await client.from("daily_activity").select("*").eq("user_id", userId).order("date", { ascending: false }).limit(90);
    if (actRows && actRows.length > 0) {
      const activities = actRows.map((r: any) => ({
        date: r.date, questions: r.questions, topics: r.topics, flashcards: r.flashcards, focusMinutes: r.focus_minutes, xp: r.xp,
      }));
      saveActivity(activities as any);
    }
  } catch {}
}

async function pushTopics(userId: string, subjectId: string) {
  if (pulling) return;
  const subject = subjects.find((s) => s.id === subjectId);
  if (!subject || !supabase) return;
  const topics = loadTopics(subjectId, subject.topics);
  const { error } = await supabase.from("topic_progress").upsert(
    topics.map((topic) => ({ user_id: userId, subject_id: subjectId, topic_id: topic.id, done: topic.done })),
    { onConflict: "user_id,subject_id,topic_id" },
  );
  if (error) console.warn("[sync] pushTopics", error.message);
}

async function pushTasks(userId: string, subjectId: string) {
  if (pulling || !supabase) return;
  const tasks = loadTasks(subjectId, DEFAULT_TASKS[subjectId] ?? []);
  const { error: delError } = await supabase.from("tasks").delete().eq("user_id", userId).eq("subject_id", subjectId);
  if (delError) { console.warn("[sync] pushTasks delete", delError.message); return; }
  if (tasks.length === 0) return;
  const { error } = await supabase.from("tasks").insert(tasks.map((task) => ({
    id: task.id, user_id: userId, subject_id: subjectId, title: task.title, done: task.done,
  })));
  if (error) console.warn("[sync] pushTasks insert", error.message);
}

async function pushMockTests(userId: string) {
  if (pulling || !supabase) return;
  const tests = loadMockTests();
  const localIds = new Set(tests.map((t) => t.id));
  const { data: cloudRows } = await supabase.from("mock_tests").select("id").eq("user_id", userId);
  const toDelete = (cloudRows ?? []).map((row) => row.id as string).filter((id) => !localIds.has(id));
  if (toDelete.length > 0) {
    const { error: delError } = await supabase.from("mock_tests").delete().eq("user_id", userId).in("id", toDelete);
    if (delError) { console.warn("[sync] pushMocks delete", delError.message); return; }
  }
  const { error } = await supabase.from("mock_tests").upsert(tests.map((test) => ({
    id: test.id, user_id: userId, name: test.name, test_date: test.date, scores: test.scores,
  })), { onConflict: "user_id,id" });
  if (error) console.warn("[sync] pushMocks", error.message);
}

async function pushProfile(userId: string) {
  if (pulling || !supabase) return;
  const profile = loadProfile();
  const { error } = await supabase.from("profiles").upsert({
    id: userId, name: profile.name, goal: profile.goal, weekly_hours: profile.weeklyHours,
  }, { onConflict: "id" });
  if (error) console.warn("[sync] pushProfile", error.message);
}

async function pushAttempts(userId: string) {
  if (pulling || !supabase) return;
  const attempts = loadAttempts().slice(0, 200);
  if (attempts.length === 0) return;
  try {
    const { error } = await supabase.from("question_attempts").upsert(attempts.map(a => ({
      id: a.id, user_id: userId, question_id: a.questionId, selected_index: a.selectedIndex, correct: a.correct, time_spent: a.timeSpent, attempted_at: a.attemptedAt,
    })), { onConflict: "user_id,id" });
    if (error) console.warn("[sync] attempts", error.message);
  } catch {}
}

async function pushGoals(userId: string) {
  if (pulling || !supabase) return;
  const goals = loadGoals();
  if (goals.length === 0) return;
  try {
    const { error } = await supabase.from("goals").upsert(goals.map(g => ({
      id: g.id, user_id: userId, title: g.title, type: g.type, target: g.target, current: g.current, period: g.period, subject_id: g.subjectId, created_at: g.createdAt, completed_at: g.completedAt,
    })), { onConflict: "user_id,id" });
    if (error) console.warn("[sync] goals", error.message);
  } catch {}
}

async function pushStreak(userId: string) {
  if (pulling || !supabase) return;
  const s = loadStreak();
  try {
    const { error } = await supabase.from("streaks").upsert({
      user_id: userId, current_streak: s.currentStreak, longest_streak: s.longestStreak, last_active_date: s.lastActiveDate || null, history: s.history, updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
    if (error) console.warn("[sync] streak", error.message);
  } catch {}
}

async function pushActivity(userId: string) {
  if (pulling || !supabase) return;
  const acts = loadActivity().slice(-30);
  if (acts.length === 0) return;
  try {
    const { error } = await supabase.from("daily_activity").upsert(acts.map(a => ({
      user_id: userId, date: a.date, questions: a.questions, topics: a.topics, flashcards: a.flashcards, focus_minutes: a.focusMinutes, xp: a.xp,
    })), { onConflict: "user_id,date" });
    if (error) console.warn("[sync] activity", error.message);
  } catch {}
}

let initialized = false;

export function initCloudSync() {
  if (!supabase || initialized) return;
  initialized = true;
  supabase.auth.onAuthStateChange((_event, session) => {
    const user = session?.user;
    setUser(user ? { id: user.id, email: user.email ?? "" } : null);
  });
  onDataChange("topics", (subjectId) => { if (currentUser && subjectId) void pushTopics(currentUser.id, subjectId); });
  onDataChange("tasks", (subjectId) => { if (currentUser && subjectId) void pushTasks(currentUser.id, subjectId); });
  onDataChange("mockTests", () => { if (currentUser) void pushMockTests(currentUser.id); });
  onDataChange("profile", () => { if (currentUser) void pushProfile(currentUser.id); });
  const pushAllNew = () => {
    if (!currentUser) return;
    void pushAttempts(currentUser.id);
    void pushGoals(currentUser.id);
    void pushStreak(currentUser.id);
    void pushActivity(currentUser.id);
  };
  onDataChange("goals" as any, pushAllNew);
  onDataChange("xp" as any, pushAllNew);
  onDataChange("tasks" as any, pushAllNew);
}
