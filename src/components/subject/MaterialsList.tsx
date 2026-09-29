import { useState } from "react";
import { Plus, Trash2, ExternalLink, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import { loadMaterials, saveMaterials, MATERIAL_LABEL, type Material, type MaterialType } from "@/data/materials";
import { cn } from "@/lib/utils";

const TYPES: MaterialType[] = ["video", "pdf", "site", "exercicio", "book"];

function MaterialsList({ subjectId }: { subjectId: string }) {
  const [materials, setMaterials] = useState<Material[]>(() => loadMaterials(subjectId));
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<MaterialType>("video");
  const [showForm, setShowForm] = useState(false);

  function persist(next: Material[]) {
    setMaterials(next);
    saveMaterials(subjectId, next);
  }

  function addMaterial() {
    if (!title.trim()) return;
    const mat: Material = {
      id: `mat-${Date.now()}`,
      title: title.trim(),
      url: url.trim() || undefined,
      type,
      createdAt: new Date().toISOString(),
    };
    persist([mat, ...materials]);
    setTitle("");
    setUrl("");
    setShowForm(false);
  }

  function toggleDone(id: string) {
    persist(materials.map(m => m.id === id ? { ...m, done: !m.done } : m));
  }

  function remove(id: string) {
    persist(materials.filter(m => m.id !== id));
  }

  return (
    <Card premium title={`Biblioteca · ${materials.length} materiais`}>
      <p className="mt-1 text-xs text-muted-foreground">Vídeos, PDFs, listas — tudo da matéria em um lugar</p>

      <div className="mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowForm(v => !v)}
          className="h-8 rounded-xl border-border/70"
        >
          <Plus className="h-4 w-4" /> {showForm ? "Fechar" : "Adicionar material"}
        </Button>

        {showForm && (
          <div className="mt-4 rounded-xl border border-border/60 bg-muted/20 p-4">
            <div className="grid gap-3">
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Título: Ex: Aula de Funções - Ferretto"
                className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <div className="grid grid-cols-[1fr_1.2fr] gap-2">
                <select
                  value={type}
                  onChange={e => setType(e.target.value as MaterialType)}
                  className="rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {TYPES.map(t => (
                    <option key={t} value={t}>{MATERIAL_LABEL[t]}</option>
                  ))}
                </select>
                <input
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="Link (opcional)"
                  className="rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <Button onClick={addMaterial} size="sm" className="h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600">
                <Plus className="h-4 w-4" /> Salvar material
              </Button>
            </div>
          </div>
        )}

        <div className="mt-4 space-y-2">
          {materials.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/60 bg-muted/20 p-6 text-center">
              <p className="text-sm font-medium">Nenhum material ainda</p>
              <p className="mt-1 text-xs text-muted-foreground">Adicione vídeos, PDFs ou listas que você usa pra estudar {subjectId}</p>
            </div>
          ) : (
            materials.map(mat => (
              <div
                key={mat.id}
                className={cn(
                  "group flex items-center gap-3 rounded-xl border bg-card p-3 transition-all hover:shadow-sm",
                  mat.done ? "border-emerald-500/20 bg-emerald-500/5" : "border-border/60 hover:border-border"
                )}
              >
                <button onClick={() => toggleDone(mat.id)} className="shrink-0">
                  {mat.done ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Circle className="h-5 w-5 text-muted-foreground/30" />}
                </button>

                <div className="min-w-0 flex-1">
                  <p className={cn("truncate text-sm font-medium", mat.done && "line-through text-muted-foreground")}>
                    <span className="mr-1.5">{MATERIAL_LABEL[mat.type]}</span>
                    {mat.title}
                  </p>
                  {mat.url && (
                    <a href={mat.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-violet-600 hover:underline dark:text-violet-400">
                      Abrir link <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => remove(mat.id)}
                  className="rounded-lg p-1.5 text-muted-foreground/60 opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}

export default MaterialsList;
