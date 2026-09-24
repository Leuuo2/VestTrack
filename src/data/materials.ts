import { notifyLocalChange } from "@/lib/syncBus";

export type MaterialType = "video" | "pdf" | "site" | "book" | "exercicio";

export type Material = {
  id: string;
  title: string;
  url?: string;
  type: MaterialType;
  createdAt: string;
  done?: boolean;
};

export const MATERIAL_LABEL: Record<MaterialType, string> = {
  video: "Vídeo",
  pdf: "PDF",
  site: "Site",
  book: "Livro",
  exercicio: "Exercícios",
};

export const MATERIAL_ICON: Record<MaterialType, string> = {
  video: "🎬",
  pdf: "📄",
  site: "🔗",
  book: "📚",
  exercicio: "✍️",
};

function materialsKey(subjectId: string): string {
  return `vesttrack:materials:${subjectId}`;
}

const DEFAULT_MATERIALS: Record<string, Material[]> = {
  matematica: [
    { id: "mat-m1", title: "Ferretto - Funções (playlist)", type: "video", url: "https://youtube.com", createdAt: new Date().toISOString() },
    { id: "mat-m2", title: "Lista FUVEST - Geometria Analítica", type: "exercicio", createdAt: new Date().toISOString(), done: true },
  ],
  fisica: [
    { id: "fis-m1", title: "Boa prova - Eletromagnetismo", type: "video", createdAt: new Date().toISOString() },
  ],
};

export function loadMaterials(subjectId: string): Material[] {
  try {
    const raw = localStorage.getItem(materialsKey(subjectId));
    if (raw) {
      const parsed = JSON.parse(raw) as Material[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return DEFAULT_MATERIALS[subjectId] ?? [];
}

export function saveMaterials(subjectId: string, materials: Material[]) {
  try {
    localStorage.setItem(materialsKey(subjectId), JSON.stringify(materials));
  } catch {}
  notifyLocalChange("tasks", subjectId);
}
