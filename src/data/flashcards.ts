import { notifyLocalChange } from "@/lib/syncBus";
import { recordActivity } from "@/data/goals";

export type Flashcard = {
  id: string;
  subjectId: string;
  topicId?: string;
  front: string;
  back: string;
  tags: string[];
  // SM-2 spaced repetition
  interval: number; // days
  repetitions: number;
  easeFactor: number;
  dueDate: string; // ISO
  createdAt: string;
  lastReviewed?: string;
};

const STORAGE_KEY = "vesttrack:flashcards";

const SEED_FLASHCARDS: Flashcard[] = [];

export function loadFlashcards(): Flashcard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Flashcard[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return SEED_FLASHCARDS;
}

export function saveFlashcards(cards: Flashcard[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch {}
  notifyLocalChange("flashcards");
}

export function addFlashcard(fc: Omit<Flashcard, "id" | "createdAt" | "interval" | "repetitions" | "easeFactor" | "dueDate">) {
  const all = loadFlashcards();
  const newCard: Flashcard = {
    ...fc,
    id: `fc-${Date.now()}`,
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
  saveFlashcards([newCard, ...all]);
  return newCard;
}

export function removeFlashcard(id: string) {
  saveFlashcards(loadFlashcards().filter(c => c.id !== id));
}

// SM-2 algorithm
export function reviewFlashcard(id: string, quality: 0 | 1 | 2 | 3 | 4 | 5) {
  const all = loadFlashcards();
  const updated = all.map(card => {
    if (card.id !== id) return card;
    
    let { interval, repetitions, easeFactor } = card;
    
    if (quality < 3) {
      repetitions = 0;
      interval = 1;
    } else {
      if (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 6;
      else interval = Math.round(interval * easeFactor);
      repetitions++;
    }
    
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;
    
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + interval);
    
    return {
      ...card,
      interval,
      repetitions,
      easeFactor,
      dueDate: dueDate.toISOString(),
      lastReviewed: new Date().toISOString(),
    };
  });
  
  saveFlashcards(updated);
  try { recordActivity("flashcards", 1, 5); } catch {}
  return updated.find(c => c.id === id);
}

export function getDueFlashcards(): Flashcard[] {
  const now = new Date();
  return loadFlashcards().filter(c => new Date(c.dueDate) <= now).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
}

export function getFlashcardsBySubject(subjectId: string) {
  return loadFlashcards().filter(c => c.subjectId === subjectId);
}
