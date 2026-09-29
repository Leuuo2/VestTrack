import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import { loadTutorChat, clearTutorChat, getTutorResponse } from "@/data/tutor";
import type { TutorMessage } from "@/data/tutor";
import { subjects } from "@/data/subjects";

export default function Tutor() {
 const [messages, setMessages] = useState<TutorMessage[]>(loadTutorChat());
 const [input, setInput] = useState("");
 const [selectedSubject, setSelectedSubject] = useState<string>("");
 const messagesEndRef = useRef<HTMLDivElement>(null);
 
 useEffect(() => {
 messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
 }, [messages]);
 
 const handleSend = () => {
 if (!input.trim()) return;
 
 const userMsg: TutorMessage = {
  id: `user-${Date.now()}`,
  role: "user",
  content: input,
  timestamp: new Date().toISOString(),
  subjectId: selectedSubject || undefined,
 };
 
 const updatedWithUser = [...messages, userMsg];
 setMessages(updatedWithUser);
 localStorage.setItem("vesttrack:tutorChat", JSON.stringify(updatedWithUser.slice(-50)));
 
 const question = input;
 setInput("");
 
 setTimeout(() => {
  const response = getTutorResponse(question, selectedSubject || undefined);
  const assistantMsg: TutorMessage = {
  id: `assistant-${Date.now()}`,
  role: "assistant",
  content: response,
  timestamp: new Date().toISOString(),
  subjectId: selectedSubject || undefined,
  };
  
  const updatedWithAssistant = [...updatedWithUser, assistantMsg];
  setMessages(updatedWithAssistant);
  localStorage.setItem("vesttrack:tutorChat", JSON.stringify(updatedWithAssistant.slice(-50)));
 }, 600);
 };
 
 const handleClear = () => {
 clearTutorChat();
 setMessages(loadTutorChat());
 };
 
 return (
 <div className="flex flex-col gap-4 min-h-[calc(100vh-200px)] md:h-[calc(100vh-140px)]">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <div className="min-w-0">
   <h1 className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight">
   <Bot className="h-5 w-5 md:h-6 md:w-6 text-violet-600" /> Tutor IA
   </h1>
   <p className="text-xs md:text-sm text-muted-foreground">Tira dúvidas de qualquer matéria</p>
  </div>
  <Button variant="outline" size="sm" onClick={handleClear} className="gap-2 self-start sm:self-auto">
   <Trash2 className="h-4 w-4" /> Limpar
  </Button>
  </div>
  
  <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:px-0">
  <button onClick={() => setSelectedSubject("")} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${!selectedSubject ? "bg-violet-600 text-white border-violet-600" : "bg-card hover:bg-muted"}`}>Todas</button>
  {subjects.map(s => (
   <button key={s.id} onClick={() => setSelectedSubject(s.id)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${selectedSubject === s.id ? "bg-violet-600 text-white border-violet-600" : "bg-card hover:bg-muted"}`}>{s.name}</button>
  ))}
  </div>
  
  <div className="flex flex-1 min-h-0"><Card className="flex flex-1 min-h-0 flex-col overflow-hidden p-0 w-full">
  <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
   {messages.map((msg) => (
   <div key={msg.id} className={`flex gap-2 md:gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
    {msg.role === "assistant" && (
    <div className="flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full bg-violet-500 text-white">
     <Bot className="h-3.5 w-3.5 md:h-4 md:w-4" />
    </div>
    )}
    
    <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-3 py-2.5 md:px-4 md:py-3 text-sm leading-relaxed break-words ${msg.role === "user" ? "bg-violet-600 text-white" : "bg-muted"}`}>
    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
    <p className={`mt-1 text-[10px] md:text-[11px] ${msg.role === "user" ? "text-violet-100" : "text-muted-foreground"}`}>{new Date(msg.timestamp).toLocaleTimeString()} {msg.subjectId ? `· ${msg.subjectId}` : ""}</p>
    </div>
    
    {msg.role === "user" && (
    <div className="flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full bg-muted">
     <User className="h-3.5 w-3.5 md:h-4 md:w-4" />
    </div>
    )}
   </div>
   ))}
   <div ref={messagesEndRef} />
  </div>
  
  <div className="border-t p-2.5 md:p-3 bg-card">
   <div className="flex gap-2 items-end">
   <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} placeholder={selectedSubject ? `Pergunte sobre ${selectedSubject}...` : "Digite sua dúvida..."} className="flex-1 min-w-0 rounded-2xl md:rounded-full border bg-background px-3.5 py-2.5 md:px-4 text-sm outline-none focus:ring-2 focus:ring-violet-500/20" />
   <Button onClick={handleSend} size="sm" className="rounded-full h-10 w-10 p-0 shrink-0">
    <Send className="h-4 w-4" />
   </Button>
   </div>
   <div className="mt-2 flex items-center gap-2 text-[10px] md:text-[11px] text-muted-foreground">
   <Sparkles className="h-3 w-3 shrink-0" /> <span className="truncate">Dica: "explique mitose" ou "como resolver logaritmo?"</span>
   </div>
  </div>
  </Card></div>
 </div>
 );
}
