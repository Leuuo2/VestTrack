import { useState, useEffect } from "react";
import { Plus, RotateCcw, Check, X, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import { loadFlashcards, getDueFlashcards, reviewFlashcard, addFlashcard, removeFlashcard } from "@/data/flashcards";
import { subjects } from "@/data/subjects";
import { addXp } from "@/data/achievements";

export default function Flashcards() {
 const [cards, setCards] = useState(loadFlashcards());
 const [dueCards, setDueCards] = useState(getDueFlashcards());
 const [currentIndex, setCurrentIndex] = useState(0);
 const [showBack, setShowBack] = useState(false);
 const [showAdd, setShowAdd] = useState(false);
 const [newFront, setNewFront] = useState("");
 const [newBack, setNewBack] = useState("");
 const [selectedSubject, setSelectedSubject] = useState("matematica");
 
 const currentCard = dueCards[currentIndex];
 
 useEffect(() => {
 setCards(loadFlashcards());
 setDueCards(getDueFlashcards());
 }, []);
 
 const handleReview = (quality: 0 | 1 | 2 | 3 | 4 | 5) => {
 if (!currentCard) return;
 
 reviewFlashcard(currentCard.id, quality);
 addXp(quality >= 3 ? 10 : 2);
 
 if (currentIndex + 1 < dueCards.length) {
  setCurrentIndex(currentIndex + 1);
  setShowBack(false);
 } else {
  setDueCards(getDueFlashcards());
  setCurrentIndex(0);
  setShowBack(false);
 }
 
 setCards(loadFlashcards());
 };
 
 const handleAdd = () => {
 if (!newFront.trim() || !newBack.trim()) return;
 
 addFlashcard({
  subjectId: selectedSubject,
  front: newFront,
  back: newBack,
  tags: [],
 });
 
 setNewFront("");
 setNewBack("");
 setShowAdd(false);
 setCards(loadFlashcards());
 setDueCards(getDueFlashcards());
 addXp(5);
 };
 
 const totalCards = cards.length;
 const dueCount = dueCards.length;
 const progress = totalCards > 0 ? ((totalCards - dueCount) / totalCards) * 100 : 0;
 
 return (
 <div className="space-y-6">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <div>
   <h1 className="text-xl md:text-2xl font-bold tracking-tight">Flashcards</h1>
   <p className="text-sm text-muted-foreground">Repetição espaçada pra memorizar de verdade</p>
  </div>
  <Button onClick={() => setShowAdd(!showAdd)} size="sm" className="gap-2">
   <Plus className="h-4 w-4" /> Novo card
  </Button>
  </div>
  
  {/* Stats */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
  <Card className="p-4">
   <div className="flex items-center gap-2">
   <div className="rounded-lg bg-violet-500/10 p-2">
    <BookOpen className="h-4 w-4 text-violet-600" />
   </div>
   <div>
    <p className="text-xs text-muted-foreground">Total</p>
    <p className="text-lg font-bold">{totalCards}</p>
   </div>
   </div>
  </Card>
  <Card className="p-4">
   <div className="flex items-center gap-2">
   <div className="rounded-lg bg-amber-500/10 p-2">
    <Clock className="h-4 w-4 text-amber-600" />
   </div>
   <div>
    <p className="text-xs text-muted-foreground">Pra hoje</p>
    <p className="text-lg font-bold">{dueCount}</p>
   </div>
   </div>
  </Card>
  <Card className="p-4">
   <div className="flex items-center gap-2">
   <div className="rounded-lg bg-emerald-500/10 p-2">
    <Check className="h-4 w-4 text-emerald-600" />
   </div>
   <div>
    <p className="text-xs text-muted-foreground">Progresso</p>
    <p className="text-lg font-bold">{Math.round(progress)}%</p>
   </div>
   </div>
  </Card>
  </div>
  
  {showAdd && (
  <Card className="p-4 space-y-3">
   <h3 className="font-medium">Novo flashcard</h3>
   <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm">
   {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
   </select>
   <input value={newFront} onChange={e => setNewFront(e.target.value)} placeholder="Pergunta (frente)" className="w-full rounded-lg border bg-background px-3 py-2 text-sm" />
   <textarea value={newBack} onChange={e => setNewBack(e.target.value)} placeholder="Resposta (verso)" className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[80px]" />
   <div className="flex gap-2">
   <Button onClick={handleAdd} size="sm">Salvar</Button>
   <Button onClick={() => setShowAdd(false)} variant="outline" size="sm">Cancelar</Button>
   </div>
  </Card>
  )}
  
  {/* Review */}
  {dueCount === 0 ? (
  <Card className="p-8 text-center">
   <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
   <Check className="h-6 w-6 text-emerald-600" />
   </div>
   <h3 className="mt-3 font-medium">Tudo revisado!</h3>
   <p className="mt-1 text-sm text-muted-foreground">Nenhum card pra hoje. Volta amanhã ou cria novos.</p>
  </Card>
  ) : currentCard ? (
  <Card className="p-6">
   <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
   <span>{currentIndex + 1} / {dueCards.length}</span>
   <span className="rounded-full bg-violet-500/10 px-2 py-1 text-violet-700">{currentCard.subjectId}</span>
   </div>
   
   <div className="min-h-[160px] rounded-xl border bg-card p-6">
   <p className="text-sm text-muted-foreground mb-2">{showBack ? "Resposta:" : "Pergunta:"}</p>
   <p className="text-lg font-medium leading-relaxed">{showBack ? currentCard.back : currentCard.front}</p>
   </div>
   
   <div className="mt-4">
   {!showBack ? (
    <Button onClick={() => setShowBack(true)} className="w-full">Ver resposta</Button>
   ) : (
    <div className="space-y-3">
    <p className="text-center text-sm text-muted-foreground">Como foi?</p>
    <div className="grid grid-cols-3 gap-2">
     <Button onClick={() => handleReview(1)} variant="outline" size="sm" className="flex-col h-auto py-3 gap-1 border-red-200 hover:bg-red-50">
     <X className="h-4 w-4 text-red-600" />
     <span className="text-xs">Errei</span>
     </Button>
     <Button onClick={() => handleReview(3)} variant="outline" size="sm" className="flex-col h-auto py-3 gap-1 border-amber-200 hover:bg-amber-50">
     <RotateCcw className="h-4 w-4 text-amber-600" />
     <span className="text-xs">Difícil</span>
     </Button>
     <Button onClick={() => handleReview(5)} variant="outline" size="sm" className="flex-col h-auto py-3 gap-1 border-emerald-200 hover:bg-emerald-50">
     <Check className="h-4 w-4 text-emerald-600" />
     <span className="text-xs">Fácil</span>
     </Button>
    </div>
    </div>
   )}
   </div>
  </Card>
  ) : null}
  
  {/* All cards list */}
  <div>
  <h3 className="mb-3 font-medium">Todos os cards</h3>
  <div className="space-y-2">
   {cards.slice(0, 10).map((card: any) => (
   <Card key={card.id} className="p-3 flex items-start justify-between gap-3">
    <div className="min-w-0 flex-1">
    <p className="truncate text-sm font-medium">{card.front}</p>
    <p className="truncate text-xs text-muted-foreground">{card.back}</p>
    </div>
    <Button onClick={() => { removeFlashcard(card.id); setCards(loadFlashcards()); }} variant="ghost" size="sm" className="h-7 w-7 p-0">
    <X className="h-3 w-3" />
    </Button>
   </Card>
   ))}
  </div>
  </div>
 </div>
 );
}
