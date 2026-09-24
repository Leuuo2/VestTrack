import { notifyLocalChange } from "./syncBus";

export type StudentProfile = {
  name: string;
  goal: string;
  /** Horas de estudo por semana. */
  weeklyHours: number;
};

export const PROFILE_KEY = "vesttrack:profile";

export const defaultProfile: StudentProfile = {
  name: "Estudante",
  goal: "ENEM 2026",
  weeklyHours: 7,
};

export function loadProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) {
      return { ...defaultProfile, ...(JSON.parse(raw) as Partial<StudentProfile>) };
    }
  } catch {
    // localStorage indisponível — usa o perfil padrão
  }
  return defaultProfile;
}

export function saveProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // ignora falhas de persistência
  }
  // Avisa a camada de sync (nuvem) — não faz nada se o usuário não tem conta.
  notifyLocalChange("profile");
}
