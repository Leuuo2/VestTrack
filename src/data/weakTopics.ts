import { loadQuestions } from "./questions";

type Attempt = {
  questionId: string;
  correct: boolean;
  timestamp: string;
};

const STORAGE_KEY = "vesttrack:questionAttempts";

function loadAttempts(): Attempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Attempt[];
  } catch {}
  return [];
}

export type WeakTopic = {
  subjectId: string;
  topicId: string;
  topicName: string;
  total: number;
  correct: number;
  accuracy: number;
  level: "critical" | "weak" | "medium" | "good" | "excellent";
};

export function getWeakTopics(): WeakTopic[] {
  const attempts = loadAttempts();
  const questions = loadQuestions();
  
  const topicMap = new Map<string, { total: number; correct: number; subjectId: string; topicId: string }>();
  
  attempts.forEach(attempt => {
    const q = questions.find(q => q.id === attempt.questionId);
    if (!q || !q.topicId) return;
    
    const key = `${q.subjectId}-${q.topicId}`;
    const existing = topicMap.get(key) || { total: 0, correct: 0, subjectId: q.subjectId, topicId: q.topicId };
    existing.total++;
    if (attempt.correct) existing.correct++;
    topicMap.set(key, existing);
  });
  
  const weakTopics: WeakTopic[] = [];
  
  topicMap.forEach((data) => {
    const accuracy = data.total > 0 ? (data.correct / data.total) * 100 : 0;
    let level: WeakTopic["level"] = "medium";
    
    if (accuracy < 40) level = "critical";
    else if (accuracy < 60) level = "weak";
    else if (accuracy < 75) level = "medium";
    else if (accuracy < 90) level = "good";
    else level = "excellent";
    
    weakTopics.push({
      subjectId: data.subjectId,
      topicId: data.topicId,
      topicName: data.topicId,
      total: data.total,
      correct: data.correct,
      accuracy: Math.round(accuracy),
      level,
    });
  });
  
  return weakTopics.sort((a, b) => a.accuracy - b.accuracy);
}

export function getPredictedScore(): { score: number; level: string; feedback: string } {
  const attempts = loadAttempts();
  if (attempts.length === 0) return { score: 0, level: "Sem dados", feedback: "Responda questões para ver previsão" };
  
  const correct = attempts.filter(a => a.correct).length;
  const accuracy = (correct / attempts.length) * 100;
  
  // Simple prediction based on accuracy
  // ENEM 0-1000 scale approximation
  const enemScore = Math.round(300 + (accuracy / 100) * 600);
  
  let level = "";
  let feedback = "";
  
  if (enemScore < 500) {
    level = "Iniciante";
    feedback = "Foque nos fundamentos e revise pontos fracos";
  } else if (enemScore < 650) {
    level = "Intermediário";
    feedback = "Bom progresso, intensifique questões difíceis";
  } else if (enemScore < 800) {
    level = "Avançado";
    feedback = "Excelente! Foque em refinamento e simulados";
  } else {
    level = "Excelência";
    feedback = "Nível top! Mantenha ritmo e faça revisões";
  }
  
  return { score: enemScore, level, feedback };
}

export function getStudyRecommendations(): string[] {
  const weakTopics = getWeakTopics();
  const critical = weakTopics.filter(w => w.level === "critical" || w.level === "weak").slice(0, 3);
  
  if (critical.length === 0) return ["Continue revisando todas as matérias", "Faça simulados completos", "Pratique redação semanalmente"];
  
  return critical.map(topic => 
    `Revise ${topic.topicId} (${topic.subjectId}) - ${topic.accuracy}% de acerto`
  );
}
