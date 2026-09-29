import { useState, useEffect } from "react";
import { Keyboard, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShortcutsHelp() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "?" && !open) {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        setOpen(true);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  if (typeof window === "undefined" || !open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-lg ring-1 ring-border/50 hover:shadow-xl md:bottom-6 md:right-6"
        title="Atalhos (?)"
      >
        <Keyboard className="h-5 w-5 text-muted-foreground" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-end bg-black/20 p-4 backdrop-blur-sm sm:items-center sm:justify-center">
      <div className="w-full max-w-[360px] rounded-[20px] bg-card p-5 shadow-2xl ring-1 ring-border/50">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-medium"><Keyboard className="h-4 w-4" /> Atalhos</h3>
          <Button variant="ghost" size="icon-sm" onClick={() => setOpen(false)} className="h-8 w-8 rounded-xl">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between rounded-xl bg-muted/50 px-3 py-2.5">
            <span className="text-muted-foreground">Selecionar alternativa</span>
            <span className="font-mono font-medium">1-4 ou A-D</span>
          </div>
          <div className="flex justify-between rounded-xl bg-muted/50 px-3 py-2.5">
            <span className="text-muted-foreground">Verificar (modo lista)</span>
            <span className="font-mono font-medium">Enter</span>
          </div>
          <div className="flex justify-between rounded-xl bg-muted/50 px-3 py-2.5">
            <span className="text-muted-foreground">Limpar seleção</span>
            <span className="font-mono font-medium">Esc</span>
          </div>
          <div className="flex justify-between rounded-xl bg-muted/50 px-3 py-2.5">
            <span className="text-muted-foreground">Abrir atalhos</span>
            <span className="font-mono font-medium">?</span>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">Pressione Esc ou clique fora pra fechar</p>
      </div>
    </div>
  );
}
