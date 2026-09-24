import {
  Brain,
  Compass,
  Dna,
  FlaskConical,
  Languages,
  Orbit,
  PenLine,
  ScrollText,
  Sigma,
  Users,
  type LucideIcon,
} from "lucide-react";
import { notifyLocalChange } from "@/lib/syncBus";

export type Topic = {
  id: string;
  name: string;
  done: boolean;
};

/**
 * Cores de acento por matéria. As classes Tailwind precisam estar
 * COMPLETAS (assim) para o compilador gerar o CSS.
 */
export type SubjectAccent = {
  iconBg: string;
  iconText: string;
  bar: string;
  checkbox: string;
  checkedBorder: string;
};

export type Subject = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  accent: SubjectAccent;
  progress: number;
  topics: Topic[];
};

export const subjects: Subject[] = [
  {
    id: "matematica",
    name: "Matemática",
    description:
      "Funções, geometria, álgebra e estatística para o ENEM e vestibulares.",
    icon: Sigma,
    accent: {
      iconBg: "bg-violet-500/15 dark:bg-violet-400/15",
      iconText: "text-violet-600 dark:text-violet-400",
      bar: "bg-violet-500 dark:bg-violet-400",
      checkbox: "accent-violet-500",
      checkedBorder: "border-violet-500/40 dark:border-violet-400/40",
    },
    progress: 85,
    topics: [
      { id: "matematica-funcoes", name: "Funções quadráticas", done: true },
      { id: "matematica-trigonometria", name: "Trigonometria", done: true },
      {
        id: "matematica-geometria-analitica",
        name: "Geometria analítica",
        done: true,
      },
      {
        id: "matematica-estatistica",
        name: "Estatística e probabilidade",
        done: true,
      },
      {
        id: "matematica-geometria-espacial",
        name: "Geometria espacial",
        done: false,
      },
    ],
  },
  {
    id: "geografia",
    name: "Geografia",
    description:
      "Cartografia, climas, geopolítica e questões ambientais do Brasil e do mundo.",
    icon: Compass,
    accent: {
      iconBg: "bg-emerald-500/15 dark:bg-emerald-400/15",
      iconText: "text-emerald-600 dark:text-emerald-400",
      bar: "bg-emerald-500 dark:bg-emerald-400",
      checkbox: "accent-emerald-500",
      checkedBorder: "border-emerald-500/40 dark:border-emerald-400/40",
    },
    progress: 100,
    topics: [
      { id: "geografia-cartografia", name: "Cartografia e fusos horários", done: true },
      { id: "geografia-climas", name: "Climas do Brasil", done: true },
      {
        id: "geografia-urbanizacao",
        name: "Urbanização e regiões metropolitanas",
        done: true,
      },
      { id: "geografia-geopolitica", name: "Geopolítica mundial", done: true },
      { id: "geografia-meio-ambiente", name: "Questões ambientais", done: true },
    ],
  },
  {
    id: "historia",
    name: "História",
    description:
      "Da Antiguidade ao Brasil Republicano, com foco nas questões de ENEM.",
    icon: ScrollText,
    accent: {
      iconBg: "bg-amber-500/15 dark:bg-amber-400/15",
      iconText: "text-amber-600 dark:text-amber-400",
      bar: "bg-amber-500 dark:bg-amber-400",
      checkbox: "accent-amber-500",
      checkedBorder: "border-amber-500/40 dark:border-amber-400/40",
    },
    progress: 27,
    topics: [
      { id: "historia-idade-media", name: "Idade Média", done: true },
      { id: "historia-revolucao-francesa", name: "Revolução Francesa", done: false },
      { id: "historia-brasil-colonia", name: "Brasil Colônia", done: false },
      { id: "historia-segundo-reinado", name: "Segundo Reinado", done: false },
      { id: "historia-brasil-republica", name: "Brasil Republicano", done: false },
    ],
  },
  {
    id: "fisica",
    name: "Física",
    description: "Mecânica, eletromagnetismo, ondas e termodinâmica.",
    icon: Orbit,
    accent: {
      iconBg: "bg-sky-500/15 dark:bg-sky-400/15",
      iconText: "text-sky-600 dark:text-sky-400",
      bar: "bg-sky-500 dark:bg-sky-400",
      checkbox: "accent-sky-500",
      checkedBorder: "border-sky-500/40 dark:border-sky-400/40",
    },
    progress: 50,
    topics: [
      { id: "fisica-cinematica", name: "Cinemática", done: true },
      { id: "fisica-dinamica", name: "Dinâmica", done: true },
      { id: "fisica-eletromagnetismo", name: "Eletromagnetismo", done: false },
      { id: "fisica-ondas", name: "Ondas e óptica", done: false },
      { id: "fisica-termodinamica", name: "Termodinâmica", done: false },
    ],
  },
  {
    id: "quimica",
    name: "Química",
    description:
      "Físico-química, orgânica, inorgânica e bioquímica com foco em ENEM.",
    icon: FlaskConical,
    accent: {
      iconBg: "bg-fuchsia-500/15 dark:bg-fuchsia-400/15",
      iconText: "text-fuchsia-600 dark:text-fuchsia-400",
      bar: "bg-fuchsia-500 dark:bg-fuchsia-400",
      checkbox: "accent-fuchsia-500",
      checkedBorder: "border-fuchsia-500/40 dark:border-fuchsia-400/40",
    },
    progress: 35,
    topics: [
      { id: "quimica-funcoes", name: "Funções inorgânicas", done: true },
      { id: "quimica-estequiometria", name: "Estequiometria", done: true },
      { id: "quimica-fisico", name: "Físico-química", done: false },
      { id: "quimica-organtica-1", name: "Química orgânica I", done: false },
      { id: "quimica-organtica-2", name: "Química orgânica II", done: false },
    ],
  },
  {
    id: "biologia",
    name: "Biologia",
    description: "Citologia, genética, ecologia e fisiologia humana.",
    icon: Dna,
    accent: {
      iconBg: "bg-green-500/15 dark:bg-green-400/15",
      iconText: "text-green-600 dark:text-green-400",
      bar: "bg-green-500 dark:bg-green-400",
      checkbox: "accent-green-500",
      checkedBorder: "border-green-500/40 dark:border-green-400/40",
    },
    progress: 60,
    topics: [
      { id: "biologia-citologia", name: "Citologia e biologia molecular", done: true },
      { id: "biologia-genetica", name: "Genética", done: true },
      { id: "biologia-ecologia", name: "Ecologia", done: true },
      { id: "biologia-evolucao", name: "Evolução", done: false },
      { id: "biologia-fisiologia", name: "Fisiologia humana", done: false },
    ],
  },
  {
    id: "portugues",
    name: "Português",
    description: "Interpretação, gramática, literatura e redação.",
    icon: PenLine,
    accent: {
      iconBg: "bg-orange-500/15 dark:bg-orange-400/15",
      iconText: "text-orange-600 dark:text-orange-400",
      bar: "bg-orange-500 dark:bg-orange-400",
      checkbox: "accent-orange-500",
      checkedBorder: "border-orange-500/40 dark:border-orange-400/40",
    },
    progress: 70,
    topics: [
      { id: "portugues-interpretacao", name: "Interpretação de texto", done: true },
      { id: "portugues-gramatica", name: "Gramática e concordância", done: true },
      { id: "portugues-figuras", name: "Figuras de linguagem", done: true },
      { id: "portugues-literatura", name: "Literatura brasileira", done: false },
      { id: "portugues-redacao", name: "Redação e argumentação", done: false },
    ],
  },
  {
    id: "ingles",
    name: "Inglês",
    description:
      "Reading, listening e gramática para a prova de língua estrangeira.",
    icon: Languages,
    accent: {
      iconBg: "bg-blue-500/15 dark:bg-blue-400/15",
      iconText: "text-blue-600 dark:text-blue-400",
      bar: "bg-blue-500 dark:bg-blue-400",
      checkbox: "accent-blue-500",
      checkedBorder: "border-blue-500/40 dark:border-blue-400/40",
    },
    progress: 85,
    topics: [
      { id: "ingles-reading", name: "Reading comprehension", done: true },
      { id: "ingles-tenses", name: "Verb tenses", done: true },
      { id: "ingles-phrasal", name: "Phrasal verbs", done: true },
      { id: "ingles-vocabulario", name: "Vocabulary", done: false },
      { id: "ingles-listening", name: "Listening", done: false },
    ],
  },
  {
    id: "filosofia",
    name: "Filosofia",
    description: "Dos gregos ao século XX, com foco nas questões de ENEM.",
    icon: Brain,
    accent: {
      iconBg: "bg-indigo-500/15 dark:bg-indigo-400/15",
      iconText: "text-indigo-600 dark:text-indigo-400",
      bar: "bg-indigo-500 dark:bg-indigo-400",
      checkbox: "accent-indigo-500",
      checkedBorder: "border-indigo-500/40 dark:border-indigo-400/40",
    },
    progress: 20,
    topics: [
      { id: "filosofia-gregos", name: "Filosofia grega", done: true },
      { id: "filosofia-idade-media", name: "Idade Média e moderna", done: false },
      { id: "filosofia-etica", name: "Ética", done: false },
      { id: "filosofia-epistemologia", name: "Epistemologia", done: false },
      { id: "filosofia-politica", name: "Filosofia política e estética", done: false },
    ],
  },
  {
    id: "sociologia",
    name: "Sociologia",
    description: "Cultura, trabalho, poder e globalização.",
    icon: Users,
    accent: {
      iconBg: "bg-rose-500/15 dark:bg-rose-400/15",
      iconText: "text-rose-600 dark:text-rose-400",
      bar: "bg-rose-500 dark:bg-rose-400",
      checkbox: "accent-rose-500",
      checkedBorder: "border-rose-500/40 dark:border-rose-400/40",
    },
    progress: 45,
    topics: [
      { id: "sociologia-metodo", name: "Sociologia e método", done: true },
      { id: "sociologia-cultura", name: "Cultura e subcultura", done: true },
      { id: "sociologia-trabalho", name: "Trabalho e produção", done: false },
      { id: "sociologia-estado", name: "Estado e poder", done: false },
      { id: "sociologia-globalizacao", name: "Globalização", done: false },
    ],
  },
];

export function getSubjectById(id: string): Subject | undefined {
  return subjects.find((subject) => subject.id === id);
}

/**
 * Persistência dos tópicos (marcados/desmarcados) por matéria.
 * A fonte única de tópicos padrão é `subjects` — o localStorage só guarda
 * o que o usuário mudou.
 */
export function topicsKey(id: string): string {
  return `vesttrack:topics:${id}`;
}

export function loadTopics(id: string, fallback: Topic[]): Topic[] {
  try {
    const raw = localStorage.getItem(topicsKey(id));
    if (raw) {
      const parsed = JSON.parse(raw) as Topic[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // localStorage indisponível — usa os tópicos padrão
  }
  return fallback;
}

export function saveTopics(id: string, topics: Topic[]): void {
  try {
    localStorage.setItem(topicsKey(id), JSON.stringify(topics));
  } catch {
    // ignora falhas de persistência
  }
  // Avisa a camada de sync (nuvem) — não faz nada se o usuário não tem conta.
  notifyLocalChange("topics", id);
}

export function completedTopicsCount(): number {
  return subjects.reduce(
    (total, subject) =>
      total + loadTopics(subject.id, subject.topics).filter((t) => t.done).length,
    0,
  );
}
