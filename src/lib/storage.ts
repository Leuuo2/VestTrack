import { subjects, topicsKey } from "@/data/subjects";
import { tasksKey } from "@/data/tasks";
import { MOCK_TESTS_KEY } from "@/data/mockTests";
import { PROFILE_KEY } from "@/lib/profile";

/** Apaga todos os dados locais do app (tópicos, tarefas, simulados e perfil). */
export function resetAllData(): void {
  try {
    subjects.forEach((subject) => {
      localStorage.removeItem(topicsKey(subject.id));
      localStorage.removeItem(tasksKey(subject.id));
    });
    localStorage.removeItem(MOCK_TESTS_KEY);
    localStorage.removeItem(PROFILE_KEY);
  } catch {
    // localStorage indisponível — nada a limpar
  }
}
