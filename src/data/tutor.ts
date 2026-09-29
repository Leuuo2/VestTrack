export type TutorMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  subjectId?: string;
};

const STORAGE_KEY = "vesttrack:tutorChat";

// Simple knowledge base for tutor - based on subjects
const KNOWLEDGE_BASE: Record<string, string[]> = {
  matematica: [
    "Função quadrática: f(x)=ax²+bx+c, vértice em x=-b/2a, delta=b²-4ac determina raízes.",
    "Probabilidade: P(A)=casos favoráveis/casos possíveis. Sem reposição multiplica frações.",
    "Logaritmo: log_a b = c significa a^c = b. log 1000 base 10 = 3 porque 10³=1000.",
    "Geometria: Pitágoras a²+b²=c², área triângulo base*altura/2, volume cilindro πr²h.",
  ],
  fisica: [
    "MRUV: v=v0+at, s=s0+v0t+at²/2, Torricelli v²=v0²+2aΔs.",
    "Leis de Newton: 1ª inércia, 2ª F=ma, 3ª ação e reação.",
    "Energia: cinética mv²/2, potencial mgh, elástica kx²/2. Conservação energia mecânica.",
    "Eletricidade: Lei Ohm V=RI, potência P=VI=RI², resistores série soma, paralelo 1/Req.",
  ],
  quimica: [
    "pH: -log[H+], ácido <7, básico >7, neutro 7. pH + pOH = 14.",
    "Estequiometria: balancear equação, usar mol, reagente limitante.",
    "Equilíbrio: Le Chatelier - temperatura, pressão, concentração deslocam equilíbrio.",
    "Orgânica: isomeria, funções, reações. Benzeno tem ressonância.",
  ],
  biologia: [
    "Mitose: 1 divisão, 2 células idênticas diploides. Meiose: 2 divisões, 4 haploides diferentes.",
    "Genética: 1ª lei Mendel segregação, 2ª segregação independente. ABO codominância.",
    "Ecologia: cadeias alimentares, sucessão, eutrofização, biomas.",
    "Fisiologia: sistema nervoso simpático luta/fuga, parassimpático repouso.",
  ],
  historia: [
    "Revolução Francesa: 1789, Terceiro Estado vs privilégios, Queda Bastilha, Declaração Direitos.",
    "Brasil Colônia: plantation, escravidão, pacto colonial. Independência 1822 mantém unidade via monarquia.",
    "Ditadura Militar 64-85: AI-5, milagre econômico concentrador, resistência, Diretas Já.",
  ],
  geografia: [
    "Escala: 1:100.000 significa 1cm no mapa = 1km real. Projeções: Mercator conforme, Peters equivalente.",
    "Climas: equatorial quente úmido, semiárido caatinga, tropical, subtropical.",
    "Urbanização: êxodo rural, metropolização, gentrificação, segregação.",
  ],
  portugues: [
    "Interpretação: denotação literal, conotação figurada. Funções linguagem: referencial, emotiva, poética.",
    "Gramática: crase a+a, concordância, regência. Vírgula muda sentido.",
    "Literatura: Barroco dualidade, Romantismo indianismo, Realismo crítica, Modernismo ruptura.",
  ],
  ingles: [
    "Tenses: present perfect have+past participle experiência, past simple ação acabada.",
    "Conditionals: 2nd if I were... unreal present, 3rd if had... unreal past.",
    "Phrasal verbs: look up procurar, give up desistir, run out acabar.",
  ],
  filosofia: [
    "Sócrates: só sei que nada sei, maiêutica. Platão: mundo Ideias, caverna. Aristóteles: eudaimonia, meio-termo.",
    "Descartes: penso logo existo, dúvida metódica. Kant: fenômeno vs coisa em si, imperativo categórico.",
    "Nietzsche: Deus está morto, além-homem. Marx: infraestrutura determina superestrutura, mais-valia.",
  ],
  sociologia: [
    "Durkheim: fato social exterior coercitivo geral, anomia falta normas, suicídio.",
    "Weber: ação social com sentido, tipo ideal, ética protestante e capitalismo afinidade eletiva.",
    "Bourdieu: habitus, capital cultural, violência simbólica escola reproduz desigualdade.",
  ],
};

export function loadTutorChat(): TutorMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as TutorMessage[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [
    {
      id: "welcome",
      role: "assistant",
      content: "Oi! Sou seu tutor do VestTrack. Pode perguntar sobre qualquer matéria - matemática, física, química, biologia, história, geografia, português, inglês, filosofia, sociologia. Também explico questões do banco de 500!",
      timestamp: new Date().toISOString(),
    },
  ];
}

export function saveTutorChat(messages: TutorMessage[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-50))); // keep last 50
  } catch {}
}

export function addTutorMessage(msg: Omit<TutorMessage, "id" | "timestamp">) {
  const all = loadTutorChat();
  const newMsg: TutorMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
  const updated = [...all, newMsg];
  saveTutorChat(updated);
  return updated;
}

export function clearTutorChat() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getTutorResponse(userQuestion: string, subjectId?: string): string {
  const lower = userQuestion.toLowerCase();
  
  // Try to detect subject from question
  let detectedSubject = subjectId;
  if (!detectedSubject) {
    if (lower.includes("matem") || lower.includes("função") || lower.includes("probabil") || lower.includes("logarit")) detectedSubject = "matematica";
    else if (lower.includes("físic") || lower.includes("newton") || lower.includes("energia") || lower.includes("elétric")) detectedSubject = "fisica";
    else if (lower.includes("químic") || lower.includes("ph") || lower.includes("ácido") || lower.includes("mol")) detectedSubject = "quimica";
    else if (lower.includes("biolog") || lower.includes("genét") || lower.includes("mitose") || lower.includes("ecolog")) detectedSubject = "biologia";
    else if (lower.includes("histór") || lower.includes("revolução") || lower.includes("brasil") || lower.includes("guerra")) detectedSubject = "historia";
    else if (lower.includes("geograf") || lower.includes("clima") || lower.includes("mapa") || lower.includes("urban")) detectedSubject = "geografia";
    else if (lower.includes("portugu") || lower.includes("gramát") || lower.includes("literatura") || lower.includes("interpretação")) detectedSubject = "portugues";
    else if (lower.includes("inglês") || lower.includes("english") || lower.includes("verb") || lower.includes("reading")) detectedSubject = "ingles";
    else if (lower.includes("filosof") || lower.includes("platão") || lower.includes("sócrates") || lower.includes("kant")) detectedSubject = "filosofia";
    else if (lower.includes("sociolog") || lower.includes("durkheim") || lower.includes("weber") || lower.includes("marx")) detectedSubject = "sociologia";
  }
  
  if (detectedSubject && KNOWLEDGE_BASE[detectedSubject]) {
    const knowledge = KNOWLEDGE_BASE[detectedSubject];
    // Pick most relevant based on keywords
    const relevant = knowledge.filter(k => 
      lower.split(" ").some(word => word.length > 3 && k.toLowerCase().includes(word))
    );
    
    const answer = relevant.length > 0 ? relevant[0] : knowledge[Math.floor(Math.random() * knowledge.length)];
    
    return `${answer}\n\nQuer que eu explique mais sobre ${detectedSubject} ou tem uma questão específica do banco?`;
  }
  
  // General responses
  if (lower.includes("enem") || lower.includes("vestibular") || lower.includes("prova")) {
    return "ENEM foca interpretação e aplicação, não decoreba. Dica: faça as 500 questões do banco com TEXTO, analise seus pontos fracos em /app/weak-topics e use flashcards pra memorizar. Quer um plano de estudos? Vai em /app/study-plan";
  }
  
  if (lower.includes("como estudar") || lower.includes("organizar") || lower.includes("plano")) {
    return "Organização: 1) Veja seus pontos fracos (/app/weak-topics), 2) Gere plano automático (/app/study-plan) com suas horas, 3) Use modo foco (/app/focus) 50min + 10min pausa, 4) Revise com flashcards (/app/flashcards) todo dia. Consistência > intensidade!";
  }
  
  return "Boa pergunta! Me diz qual matéria é (matemática, física, etc) ou cola uma questão do banco que eu explico passo a passo. Também posso gerar resumo ou plano de estudos pra você.";
}
