export type Theme = "light" | "dark";

export const THEME_KEY = "vesttrack:theme";

/** Tema salvo pelo usuário; senão, a preferência do sistema. */
export function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage indisponível
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** Aplica o tema no <html> e persiste a escolha. */
export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignora falhas de persistência
  }
}
