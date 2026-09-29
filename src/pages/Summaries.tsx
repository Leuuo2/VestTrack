import { useState } from "react";
import { BookOpen, Plus, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import { loadSummaries, addSummary, removeSummary, updateSummary } from "@/data/summaries";
import { subjects } from "@/data/subjects";
import { addXp } from "@/data/achievements";

export default function Summaries() {
 const [summaries, setSummaries] = useState(loadSummaries());
 const [showAdd, setShowAdd] = useState(false);
 const [title, setTitle] = useState("");
 const [content, setContent] = useState("");
 const [selectedSubject, setSelectedSubject] = useState("matematica");
 const [search, setSearch] = useState("");
 const [editingId, setEditingId] = useState<string | null>(null);
 
 const filtered = summaries.filter(s => {
 const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.content.toLowerCase().includes(search.toLowerCase());
 return matchSearch;
 });
 
 const handleAdd = () => {
 if (!title.trim() || !content.trim()) return;
 
 if (editingId) {
  updateSummary(editingId, { title, content, subjectId: selectedSubject });
  setEditingId(null);
 } else {
  addSummary({ subjectId: selectedSubject, title, content, tags: [] });
  addXp(10);
 }
 
 setSummaries(loadSummaries());
 setTitle("");
 setContent("");
 setShowAdd(false);
 };
 
 const handleEdit = (id: string) => {
 const summary = summaries.find(s => s.id === id);
 if (!summary) return;
 setTitle(summary.title);
 setContent(summary.content);
 setSelectedSubject(summary.subjectId);
 setEditingId(id);
 setShowAdd(true);
 };
 
 return (
 <div className="space-y-6">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <div>
   <h1 className="text-2xl font-bold tracking-tight">Resumos</h1>
   <p className="text-sm text-muted-foreground">{summaries.length} resumos · organizados por matéria</p>
  </div>
  <Button onClick={() => setShowAdd(!showAdd)} size="sm" className="gap-2">
   <Plus className="h-4 w-4" /> Novo resumo
  </Button>
  </div>
  
  <div className="flex gap-2">
  <div className="relative flex-1">
   <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
   <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar resumos..." className="w-full rounded-full border bg-background pl-10 pr-4 py-2 text-sm" />
  </div>
  </div>
  
  <div className="flex gap-2 overflow-x-auto pb-1">
  {subjects.map(s => {
   const count = summaries.filter(sum => sum.subjectId === s.id).length;
   return (
   <div key={s.id} className="shrink-0 rounded-full border bg-card px-3 py-1 text-xs">
    {s.name} <span className="ml-1 text-muted-foreground">{count}</span>
   </div>
   );
  })}
  </div>
  
  {showAdd && (
  <Card className="p-4 space-y-3">
   <h3 className="font-medium">{editingId ? "Editar resumo" : "Novo resumo"}</h3>
   <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm">
   {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
   </select>
   <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título (ex: Mitose e Meiose)" className="w-full rounded-lg border bg-background px-3 py-2 text-sm" />
   <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Conteúdo do resumo... suporta markdown: **negrito**, *itálico*, - lista" className="w-full min-h-[160px] rounded-lg border bg-background px-3 py-2 text-sm font-mono" />
   <div className="flex gap-2">
   <Button onClick={handleAdd} size="sm">{editingId ? "Atualizar" : "Salvar"}</Button>
   <Button onClick={() => { setShowAdd(false); setEditingId(null); setTitle(""); setContent(""); }} variant="outline" size="sm">Cancelar</Button>
   </div>
  </Card>
  )}
  
  <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
  {filtered.map(summary => (
   <Card key={summary.id} className="p-4 hover:shadow-md transition-shadow">
   <div className="flex items-start justify-between gap-2">
    <div className="min-w-0 flex-1">
    <div className="flex items-center gap-2">
     <BookOpen className="h-4 w-4 text-violet-600 shrink-0" />
     <h3 className="truncate font-medium text-sm">{summary.title}</h3>
    </div>
    <p className="mt-1 text-xs text-muted-foreground">{summary.subjectId} · {new Date(summary.updatedAt).toLocaleDateString()}</p>
    <p className="mt-2 line-clamp-3 text-sm leading-relaxed whitespace-pre-wrap">{summary.content.slice(0, 200)}{summary.content.length > 200 ? "..." : ""}</p>
    </div>
    <div className="flex gap-1">
    <Button variant="ghost" size="sm" onClick={() => handleEdit(summary.id)} className="h-7 w-7 p-0">✏️</Button>
    <Button variant="ghost" size="sm" onClick={() => { removeSummary(summary.id); setSummaries(loadSummaries()); }} className="h-7 w-7 p-0">
     <Trash2 className="h-3 w-3" />
    </Button>
    </div>
   </div>
   </Card>
  ))}
  </div>
  
  {filtered.length === 0 && (
  <Card className="p-8 text-center">
   <BookOpen className="mx-auto h-8 w-8 text-muted-foreground" />
   <p className="mt-2 text-sm text-muted-foreground">{search ? "Nenhum resumo encontrado" : "Nenhum resumo ainda. Crie seu primeiro!"}</p>
  </Card>
  )}
 </div>
 );
}
