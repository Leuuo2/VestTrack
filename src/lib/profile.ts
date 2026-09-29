import { notifyLocalChange } from "./syncBus";

export type StudentProfile = {
  name: string;
  goal: string;
  weeklyHours: number;
};

export type Profile = StudentProfile;

const KEY = "vesttrack:profile";

const DEFAULT: Profile = {
  name: "Estudante",
  goal: "Passar no vestibular",
  weeklyHours: 20,
};

export function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      if (p && typeof p.name === "string") return p;
    }
  } catch {}
  return DEFAULT;
}

export function saveProfile(p: Profile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {}
  notifyLocalChange("profile");
}
