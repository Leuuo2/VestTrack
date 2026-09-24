import { Download, FileSpreadsheet, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadMockTests, overallScore } from "@/data/mockTests";
import { subjects, loadTopics } from "@/data/subjects";
import { loadProfile } from "@/lib/profile";

function ExportActions() {
  function exportCSV() {
    const tests = [...loadMockTests()].sort((a,b) => a.date.localeCompare(b.date));
    const header = ["Data","Simulado","Média Geral", ...subjects.map(s => s.name)];
    const rows = tests.map(t => [
      t.date,
      `"${t.name.replace(/"/g, '""')}"`,
      overallScore(t),
      ...subjects.map(s => t.scores[s.id] ?? "")
    ]);
    const csv = [header.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vesttrack-simulados-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function copySummary() {
    const profile = loadProfile();
    const tests = loadMockTests();
    const avg = tests.length ? Math.round(tests.reduce((s,t) => s + overallScore(t), 0)/tests.length) : 0;
    const done = subjects.reduce((acc,s) => acc + loadTopics(s.id, s.topics).filter(x=>x.done).length, 0);
    const total = subjects.reduce((acc,s) => acc + s.topics.length, 0);
    const text = `🎯 VestTrack — ${profile.name}
📚 ${done}/${total} tópicos concluídos
📝 ${tests.length} simulados · média ${avg}%
🚀 Objetivo: ${profile.goal}
Gerado em ${new Date().toLocaleDateString("pt-BR")} — vesttrack.app`;

    navigator.clipboard.writeText(text).then(() => {
      alert("Resumo copiado! Cole onde quiser compartilhar 🚀");
    }).catch(() => {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      alert("Resumo copiado! 🚀");
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={exportCSV} className="h-9 gap-1.5 rounded-xl border-border/70 bg-card hover:bg-muted">
        <FileSpreadsheet className="h-4 w-4" /> Exportar CSV
      </Button>
      <Button variant="outline" size="sm" onClick={copySummary} className="h-9 gap-1.5 rounded-xl border-border/70 bg-card hover:bg-muted">
        <Share2 className="h-4 w-4" /> Copiar resumo
      </Button>
      <Button variant="ghost" size="sm" className="h-9 gap-1.5 rounded-xl text-muted-foreground" onClick={() => window.print()}>
        <Download className="h-4 w-4" /> Imprimir
      </Button>
    </div>
  );
}

export default ExportActions;
