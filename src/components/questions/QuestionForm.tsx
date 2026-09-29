import { useState } from "react";
import { Plus, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import { subjects } from "@/data/subjects";
import { addQuestion, type Difficulty, type Question } from "@/data/questions";
import { cn } from "@/lib/utils";

type Props = {
  onCreated?: (q: Question) => void;
  onCancel?: () => void;
};

function QuestionForm({ onCreated, onCancel }: Props) {
  const [subjectId, setSubjectId] = useState("matematica");
  const [statement, setStatement] = useState("");
  const [options, setOptions] = useState(["", "", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("medio");
  const [source, setSource] = useState("Minha questão");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  function setOption(idx: number, value: string) {
    setOptions(prev => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!statement.trim()) { setError("Escreva o enunciado."); return; }
    if (options.some(o => !o.trim())) { setError("Preencha todas as 5 alternativas."); return; }
    if (!explanation.trim()) { setError("Adicione uma explicação."); return; }

    const q = addQuestion({
      subjectId,
      statement: statement.trim(),
      options: options.map(o => o.trim()),
      correctIndex,
      explanation: explanation.trim(),
      difficulty,
      source: source.trim() || "Minha questão",
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
    });

    setStatement("");
    setOptions(["", "", "", "", ""]);
    setExplanation("");
    setTags("");
    onCreated?.(q);
  }

  return (
    <Card premium title="Nova questão">
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Matéria</label>
            <select value={subjectId} onChange={e => setSubjectId(e.target.value)} className="mt-1.5 w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium">Dificuldade</label>
              <select value={difficulty} onChange={e => setDifficulty(e.target.value as Difficulty)} className="mt-1.5 w-full rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="facil">Fácil</option>
                <option value="medio">Médio</option>
                <option value="dificil">Difícil</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Fonte</label>
              <input value={source} onChange={e => setSource(e.target.value)} placeholder="Ex: ENEM 2023" className="mt-1.5 w-full rounded-xl border border-input bg-card px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Enunciado</label>
          <textarea value={statement} onChange={e => setStatement(e.target.value)} placeholder="Digite o enunciado da questão..." className="mt-1.5 min-h-[90px] w-full resize-none rounded-xl border border-input bg-card px-3.5 py-3 text-sm leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        <div>
          <label className="block text-sm font-medium">Alternativas (A-E) — marque o gabarito</label>
          <div className="mt-2 space-y-2">
            {options.map((opt, idx) => (
              <div key={idx} className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCorrectIndex(idx)}
                  className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ring-1 transition-all", correctIndex === idx ? "bg-violet-600 text-white ring-violet-600 shadow-sm" : "bg-muted text-muted-foreground ring-border/50 hover:bg-violet-500/10")}
                >
                  {String.fromCharCode(65 + idx)}
                </button>
                <input value={opt} onChange={e => setOption(idx, e.target.value)} placeholder={`Alternativa ${String.fromCharCode(65 + idx)}`} className="flex-1 rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Explicação (por que essa é a correta?)</label>
          <textarea value={explanation} onChange={e => setExplanation(e.target.value)} placeholder="Explique o raciocínio..." className="mt-1.5 min-h-[70px] w-full resize-none rounded-xl border border-input bg-card px-3.5 py-3 text-sm leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        <div>
          <label className="block text-sm font-medium">Tags (separadas por vírgula)</label>
          <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Ex: funções, vértice, ENEM" className="mt-1.5 w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        {error && <p className="rounded-xl bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive ring-1 ring-destructive/20">{error}</p>}

        <div className="flex gap-2">
          <Button type="submit" className="h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-[0_4px_12px_-2px_rgba(139,92,246,0.4)]"><Plus className="h-4 w-4" /> Salvar questão</Button>
          {onCancel && <Button type="button" variant="ghost" onClick={onCancel} className="h-10 rounded-xl"><X className="h-4 w-4" /> Cancelar</Button>}
        </div>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><Sparkles className="h-3 w-3 text-violet-500" /> Dica: use questões do seu caderno ou provas antigas — revisar criando questão fixa 2x mais!</p>
      </form>
    </Card>
  );
}

export default QuestionForm;
