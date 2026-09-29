import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Coffee, BookOpen, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import { addXp } from "@/data/achievements";
import { recordActivity } from "@/data/goals";

export default function Focus() {
 const [minutes, setMinutes] = useState(50);
 const [seconds, setSeconds] = useState(0);
 const [isActive, setIsActive] = useState(false);
 const [isBreak, setIsBreak] = useState(false);
 const [sessions, setSessions] = useState(0);
 const [totalFocus, setTotalFocus] = useState(() => {
 try {
  return JSON.parse(localStorage.getItem("vesttrack:focusTotal") || "0");
 } catch { return 0; }
 });
 
 const intervalRef = useRef<number | null>(null);
 
 useEffect(() => {
 if (isActive) {
  intervalRef.current = window.setInterval(() => {
  if (seconds > 0) {
   setSeconds(s => s - 1);
  } else if (minutes > 0) {
   setMinutes(m => m - 1);
   setSeconds(59);
  } else {
   // Finished
   setIsActive(false);
   if (!isBreak) {
   setSessions(s => s + 1);
   setTotalFocus((prev: number) => {
    const newTotal = prev + 50;
    localStorage.setItem("vesttrack:focusTotal", JSON.stringify(newTotal));
    return newTotal;
   });
   addXp(20);
   try { recordActivity("focus", 50, 20); } catch {}
   // Auto break
   setIsBreak(true);
   setMinutes(10);
   setSeconds(0);
   } else {
   setIsBreak(false);
   setMinutes(50);
   setSeconds(0);
   }
   
   if ("Notification" in window && Notification.permission === "granted") {
   new Notification(isBreak ? "Pausa acabou!" : "Sessão concluída!", {
    body: isBreak ? "Volta pro foco" : "Hora da pausa de 10min",
   });
   }
  }
  }, 1000);
 } else if (intervalRef.current) {
  clearInterval(intervalRef.current);
 }
 
 return () => {
  if (intervalRef.current) clearInterval(intervalRef.current);
 };
 }, [isActive, minutes, seconds, isBreak]);
 
 const toggle = () => {
 setIsActive(!isActive);
 if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
 }
 };
 
 const reset = () => {
 setIsActive(false);
 setIsBreak(false);
 setMinutes(50);
 setSeconds(0);
 };
 
 const progress = isBreak ? ((10 * 60 - (minutes * 60 + seconds)) / (10 * 60)) * 100 : ((50 * 60 - (minutes * 60 + seconds)) / (50 * 60)) * 100;
 
 return (
 <div className="space-y-6 max-w-md mx-auto">
  <div className="text-center">
  <h1 className="text-2xl font-bold tracking-tight">Modo foco</h1>
  <p className="text-sm text-muted-foreground">{isBreak ? "Pausa" : "Foco profundo"} · {sessions} sessões hoje</p>
  </div>
  
  <div ><Card className="p-8 ">
  <div className="relative mx-auto flex h-56 w-56 items-center justify-center">
   <svg className="absolute inset-0 h-full w-full -rotate-90">
   <circle cx="112" cy="112" r="100" fill="none" stroke="currentColor" className="text-muted/30" strokeWidth="8" />
   <circle
    cx="112"
    cy="112"
    r="100"
    fill="none"
    stroke="currentColor"
    className={isBreak ? "text-amber-500" : "text-violet-600"}
    strokeWidth="8"
    strokeLinecap="round"
    strokeDasharray={2 * Math.PI * 100}
    strokeDashoffset={2 * Math.PI * 100 * (1 - progress / 100)}
    style={{ transition: "stroke-dashoffset 1s linear" }}
   />
   </svg>
   
   <div className="text-center">
   <div className="flex items-center justify-center gap-1">
    {isBreak ? <Coffee className="h-5 w-5 text-amber-600" /> : <BookOpen className="h-5 w-5 text-violet-600" />}
   </div>
   <p className="mt-2 font-mono text-5xl font-bold tracking-tight">
    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
   </p>
   <p className="mt-1 text-xs text-muted-foreground">{isBreak ? "Pausa" : "Foco"}</p>
   </div>
  </div>
  
  <div className="mt-8 flex justify-center gap-3">
   <Button onClick={toggle} size="lg" className={`gap-2 rounded-full px-8 ${isBreak ? "bg-amber-600 hover:bg-amber-700" : ""}`}>
   {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
   {isActive ? "Pausar" : "Começar"}
   </Button>
   <Button onClick={reset} variant="outline" size="lg" className="rounded-full">
   <RotateCcw className="h-4 w-4" />
   </Button>
  </div>
  </Card></div>
  
  <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
  <Card className="p-3 text-center">
   <p className="text-lg font-bold">{sessions}</p>
   <p className="text-[11px] text-muted-foreground">Sessões hoje</p>
  </Card>
  <Card className="p-3 text-center">
   <p className="text-lg font-bold">{Math.floor(totalFocus / 60)}h {totalFocus % 60}m</p>
   <p className="text-[11px] text-muted-foreground">Total foco</p>
  </Card>
  <Card className="p-3 text-center">
   <p className="text-lg font-bold">{sessions * 20}</p>
   <p className="text-[11px] text-muted-foreground">XP ganho</p>
  </Card>
  </div>
  
  <div ><Card className="p-4">
  <h3 className="flex items-center gap-2 text-sm font-medium">
   <Check className="h-4 w-4 text-emerald-600" /> Como funciona
  </h3>
  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
   <li>• 50 min foco profundo + 10 min pausa (ciclo natural, não pomodoro)</li>
   <li>• Sem distrações, só você e o material</li>
   <li>• Cada sessão completa = 20 XP</li>
   <li>• Notificação quando acaba</li>
  </ul>
  </Card></div>
 </div>
 );
}
