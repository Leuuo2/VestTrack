import { useState, useEffect } from "react";
import { X, BookOpen, Brain, Target, Calendar, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "vesttrack_onboarded";

const steps = [
  {
    icon: BookOpen,
    title: "Bem-vindo ao VestTrack!",
    desc: "Seu companheiro pra passar no vestibular. Tudo salvo local, sem conta.",
    color: "bg-violet-500",
  },
  {
    icon: Target,
    title: "Metas diárias",
    desc: "Defina quantas questões, tópicos e minutos quer fazer hoje. O app calcula seu progresso.",
    color: "bg-orange-500",
  },
  {
    icon: Brain,
    title: "Questões com atalho",
    desc: "Use 1-4 pra selecionar, Enter pra verificar e Esc pra limpar. Muito mais rápido!",
    color: "bg-emerald-500",
  },
  {
    icon: Calendar,
    title: "Planner e streak",
    desc: "Planeje no calendário, mantenha sequência e veja analytics. Bora começar?",
    color: "bg-blue-500",
  },
];

export default function Onboarding() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let done = null; try { done = localStorage.getItem(STORAGE_KEY); } catch {}
    if (!done) {
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const handleClose = () => {
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
    setOpen(false);
  };

  const handleNext = () => {
    if (step < steps.length - 1) setStep(s => s + 1);
    else handleClose();
  };

  if (!open) return null;

  const current = steps[step];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[380px] rounded-[20px] bg-card p-6 shadow-2xl ring-1 ring-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" /> {step + 1}/{steps.length}
          </div>
          <Button variant="ghost" size="icon-sm" onClick={handleClose} className="h-8 w-8 rounded-xl">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-5 flex justify-center">
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow ${current.color}`}>
            <Icon className="h-8 w-8" />
          </div>
        </div>

        <h3 className="mt-5 text-center text-lg font-bold tracking-tight">{current.title}</h3>
        <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">{current.desc}</p>

        <div className="mt-5 flex justify-center gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-violet-600" : "w-1.5 bg-muted"}`} />
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          {step > 0 && (
            <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setStep(s => s - 1)}>
              Voltar
            </Button>
          )}
          <Button className="flex-1 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 gap-2" onClick={handleNext}>
            {step === steps.length - 1 ? <><CheckCircle2 className="h-4 w-4" /> Começar</> : <>Próximo <ArrowRight className="h-4 w-4" /></>}
          </Button>
        </div>

        <button onClick={handleClose} className="mt-3 w-full text-center text-xs text-muted-foreground hover:text-foreground">
          Pular tutorial
        </button>
      </div>
    </div>
  );
}
