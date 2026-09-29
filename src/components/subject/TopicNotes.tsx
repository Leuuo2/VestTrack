import { useState } from "react";
import { StickyNote, Save, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadNotes, setNoteContent, type TopicNote } from "@/data/subjectNotes";

type Props = {
  subjectId: string;
  topicId: string;
  topicName: string;
  onClose?: () => void;
};

function TopicNotes({ subjectId, topicId, topicName, onClose }: Props) {
  const [notes, setNotes] = useState(() => loadNotes(subjectId));
  const [content, setContent] = useState(() => notes[topicId]?.content ?? "");
  const [saved, setSaved] = useState(false);

  const existing = notes[topicId] as TopicNote | undefined;

  function handleSave() {
    const updated = setNoteContent(subjectId, topicId, content);
    setNotes(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-400">
            <StickyNote className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">{topicName}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              {existing ? (
                <>
                  <Clock className="h-3 w-3" /> Editado {new Date(existing.updatedAt).toLocaleDateString("pt-BR")}
                </>
              ) : (
                "Sem anotações ainda"
              )}
            </p>
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon-sm" onClick={onClose} className="rounded-xl">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="mt-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escreva seu resumo, fórmula, dúvida ou insight sobre este tópico..."
          className="min-h-[120px] w-full resize-none rounded-xl border border-input bg-transparent px-3.5 py-3 text-sm leading-relaxed shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{content.length} caracteres</p>
          <div className="flex items-center gap-2">
            {saved && <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">✓ Salvo</span>}
            <Button size="sm" onClick={handleSave} className="h-8 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600">
              <Save className="h-3.5 w-3.5" /> Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicNotes;
