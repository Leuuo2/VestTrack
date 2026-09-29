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
    description: "Funções, geometria, álgebra e estatística para o ENEM e vestibulares.",
    icon: Sigma,
    accent: {
      iconBg: "bg-violet-500/15 dark:bg-violet-400/15",
      iconText: "text-violet-600 dark:text-violet-400",
      bar: "bg-violet-500 dark:bg-violet-400",
      checkbox: "accent-violet-500",
      checkedBorder: "border-violet-500/40 dark:border-violet-400/40",
    },
    progress: 0,
    topics: [
      { id: "matematica-funcoes", name: "Funções quadráticas", done: false },
      { id: "matematica-trigonometria", name: "Trigonometria", done: false },
      { id: "matematica-geometria-analitica", name: "Geometria analítica", done: false },
      { id: "matematica-estatistica", name: "Estatística e probabilidade", done: false },
      { id: "matematica-geometria-espacial", name: "Geometria espacial", done: false },
      { id: "matematica-algebra", name: "Álgebra e equações", done: false },
      { id: "matematica-pa-pg", name: "PA e PG", done: false },
      { id: "matematica-matrizes", name: "Matrizes e determinantes", done: false },
      { id: "matematica-logaritmos", name: "Logaritmos e exponencial", done: false },
      { id: "matematica-combinatoria", name: "Análise combinatória", done: false },
      { id: "matematica-numeros-complexos", name: "Números complexos", done: false },
      { id: "matematica-polinomios", name: "Polinômios", done: false },
      { id: "matematica-inequacoes", name: "Inequações", done: false },
      { id: "matematica-financeira", name: "Matemática financeira", done: false },
      { id: "matematica-razao-proporcao", name: "Razão, proporção e regra de três", done: false },
    ],
  },
  {
    id: "geografia",
    name: "Geografia",
    description: "Cartografia, climas, geopolítica e questões ambientais do Brasil e do mundo.",
    icon: Compass,
    accent: {
      iconBg: "bg-emerald-500/15 dark:bg-emerald-400/15",
      iconText: "text-emerald-600 dark:text-emerald-400",
      bar: "bg-emerald-500 dark:bg-emerald-400",
      checkbox: "accent-emerald-500",
      checkedBorder: "border-emerald-500/40 dark:border-emerald-400/40",
    },
    progress: 0,
    topics: [
      { id: "geografia-cartografia", name: "Cartografia e fusos horários", done: false },
      { id: "geografia-climas", name: "Climas do Brasil", done: false },
      { id: "geografia-urbanizacao", name: "Urbanização e regiões metropolitanas", done: false },
      { id: "geografia-geopolitica", name: "Geopolítica mundial", done: false },
      { id: "geografia-meio-ambiente", name: "Questões ambientais", done: false },
      { id: "geografia-relevo", name: "Relevo e geomorfologia", done: false },
      { id: "geografia-populacao", name: "População e demografia", done: false },
      { id: "geografia-industria", name: "Industrialização e energia", done: false },
      { id: "geografia-agro", name: "Agropecuária e agronegócio", done: false },
      { id: "geografia-globalizacao", name: "Globalização e blocos econômicos", done: false },
      { id: "geografia-hidrografia", name: "Hidrografia e recursos hídricos", done: false },
      { id: "geografia-biomas", name: "Biomas e domínios morfoclimáticos", done: false },
      { id: "geografia-migracoes", name: "Migrações e conflitos", done: false },
      { id: "geografia-transporte", name: "Transportes e logística", done: false },
      { id: "geografia-questao-agraria", name: "Questão agrária e urbana", done: false },
    ],
  },
  {
    id: "historia",
    name: "História",
    description: "Da Antiguidade ao Brasil Republicano, com foco nas questões de ENEM.",
    icon: ScrollText,
    accent: {
      iconBg: "bg-amber-500/15 dark:bg-amber-400/15",
      iconText: "text-amber-600 dark:text-amber-400",
      bar: "bg-amber-500 dark:bg-amber-400",
      checkbox: "accent-amber-500",
      checkedBorder: "border-amber-500/40 dark:border-amber-400/40",
    },
    progress: 0,
    topics: [
      { id: "historia-idade-media", name: "Idade Média", done: false },
      { id: "historia-revolucao-francesa", name: "Revolução Francesa", done: false },
      { id: "historia-brasil-colonia", name: "Brasil Colônia", done: false },
      { id: "historia-segundo-reinado", name: "Segundo Reinado", done: false },
      { id: "historia-brasil-republica", name: "Brasil Republicano", done: false },
      { id: "historia-antiguidade", name: "Antiguidade Clássica", done: false },
      { id: "historia-brasil-imperio", name: "Brasil Império e Independência", done: false },
      { id: "historia-era-vargas", name: "Era Vargas", done: false },
      { id: "historia-ditadura", name: "Ditadura Militar", done: false },
      { id: "historia-guerras-mundiais", name: "Guerras Mundiais", done: false },
      { id: "historia-guerra-fria", name: "Guerra Fria e descolonização", done: false },
      { id: "historia-iluminismo", name: "Iluminismo e Revolução Industrial", done: false },
      { id: "historia-reforma", name: "Reforma e Contrarreforma", done: false },
      { id: "historia-nazismo", name: "Nazismo e fascismo", done: false },
      { id: "historia-redemocratizacao", name: "Redemocratização e CF 88", done: false },
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
    progress: 0,
    topics: [
      { id: "fisica-cinematica", name: "Cinemática", done: false },
      { id: "fisica-dinamica", name: "Dinâmica", done: false },
      { id: "fisica-eletromagnetismo", name: "Eletromagnetismo", done: false },
      { id: "fisica-ondas", name: "Ondas e óptica", done: false },
      { id: "fisica-termodinamica", name: "Termodinâmica", done: false },
      { id: "fisica-optica", name: "Óptica geométrica", done: false },
      { id: "fisica-hidrostatica", name: "Hidrostática e hidrodinâmica", done: false },
      { id: "fisica-gravitacao", name: "Gravitação universal", done: false },
      { id: "fisica-eletricidade", name: "Eletricidade e circuitos", done: false },
      { id: "fisica-magnetismo", name: "Magnetismo", done: false },
      { id: "fisica-energia", name: "Trabalho e energia", done: false },
      { id: "fisica-quantica", name: "Física moderna e quântica", done: false },
      { id: "fisica-acustica", name: "Acústica", done: false },
      { id: "fisica-dilatacao", name: "Dilatação térmica", done: false },
      { id: "fisica-leis-newton", name: "Leis de Newton", done: false },
    ],
  },
  {
    id: "quimica",
    name: "Química",
    description: "Físico-química, orgânica, inorgânica e bioquímica com foco em ENEM.",
    icon: FlaskConical,
    accent: {
      iconBg: "bg-fuchsia-500/15 dark:bg-fuchsia-400/15",
      iconText: "text-fuchsia-600 dark:text-fuchsia-400",
      bar: "bg-fuchsia-500 dark:bg-fuchsia-400",
      checkbox: "accent-fuchsia-500",
      checkedBorder: "border-fuchsia-500/40 dark:border-fuchsia-400/40",
    },
    progress: 0,
    topics: [
      { id: "quimica-funcoes", name: "Funções inorgânicas", done: false },
      { id: "quimica-estequiometria", name: "Estequiometria", done: false },
      { id: "quimica-fisico", name: "Físico-química", done: false },
      { id: "quimica-organtica-1", name: "Química orgânica I", done: false },
      { id: "quimica-organtica-2", name: "Química orgânica II", done: false },
      { id: "quimica-tabela", name: "Tabela periódica", done: false },
      { id: "quimica-ligacoes", name: "Ligações químicas", done: false },
      { id: "quimica-termoquimica", name: "Termoquímica", done: false },
      { id: "quimica-cinetica", name: "Cinética química", done: false },
      { id: "quimica-equilibrio", name: "Equilíbrio químico", done: false },
      { id: "quimica-eletroquimica", name: "Eletroquímica", done: false },
      { id: "quimica-isomeria", name: "Isomeria", done: false },
      { id: "quimica-solucoes", name: "Soluções e coloides", done: false },
      { id: "quimica-radioatividade", name: "Radioatividade", done: false },
      { id: "quimica-polimeros", name: "Polímeros e bioquímica", done: false },
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
    progress: 0,
    topics: [
      { id: "biologia-citologia", name: "Citologia e biologia molecular", done: false },
      { id: "biologia-genetica", name: "Genética", done: false },
      { id: "biologia-ecologia", name: "Ecologia", done: false },
      { id: "biologia-evolucao", name: "Evolução", done: false },
      { id: "biologia-fisiologia", name: "Fisiologia humana", done: false },
      { id: "biologia-micro", name: "Microbiologia e vírus", done: false },
      { id: "biologia-botanica", name: "Botânica", done: false },
      { id: "biologia-zoologia", name: "Zoologia", done: false },
      { id: "biologia-embriologia", name: "Embriologia", done: false },
      { id: "biologia-histologia", name: "Histologia", done: false },
      { id: "biologia-imunologia", name: "Imunologia", done: false },
      { id: "biologia-bioquimica", name: "Bioquímica", done: false },
      { id: "biologia-parasitologia", name: "Parasitologia", done: false },
      { id: "biologia-genetica-molecular", name: "Genética molecular", done: false },
      { id: "biologia-biotecnologia", name: "Biotecnologia", done: false },
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
    progress: 0,
    topics: [
      { id: "portugues-interpretacao", name: "Interpretação de texto", done: false },
      { id: "portugues-gramatica", name: "Gramática e concordância", done: false },
      { id: "portugues-figuras", name: "Figuras de linguagem", done: false },
      { id: "portugues-literatura", name: "Literatura brasileira", done: false },
      { id: "portugues-redacao", name: "Redação e argumentação", done: false },
      { id: "portugues-concordancia", name: "Concordância verbal e nominal", done: false },
      { id: "portugues-regencia", name: "Regência e crase", done: false },
      { id: "portugues-pontuacao", name: "Pontuação", done: false },
      { id: "portugues-ortografia", name: "Ortografia e acentuação", done: false },
      { id: "portugues-coesao", name: "Coesão e coerência", done: false },
      { id: "portugues-generos", name: "Gêneros textuais", done: false },
      { id: "portugues-modernismo", name: "Modernismo", done: false },
      { id: "portugues-realismo", name: "Realismo e naturalismo", done: false },
      { id: "portugues-romantismo", name: "Romantismo", done: false },
      { id: "portugues-funcoes-linguagem", name: "Funções da linguagem", done: false },
    ],
  },
  {
    id: "ingles",
    name: "Inglês",
    description: "Reading, listening e gramática para a prova de língua estrangeira.",
    icon: Languages,
    accent: {
      iconBg: "bg-blue-500/15 dark:bg-blue-400/15",
      iconText: "text-blue-600 dark:text-blue-400",
      bar: "bg-blue-500 dark:bg-blue-400",
      checkbox: "accent-blue-500",
      checkedBorder: "border-blue-500/40 dark:border-blue-400/40",
    },
    progress: 0,
    topics: [
      { id: "ingles-reading", name: "Reading comprehension", done: false },
      { id: "ingles-tenses", name: "Verb tenses", done: false },
      { id: "ingles-phrasal", name: "Phrasal verbs", done: false },
      { id: "ingles-vocabulario", name: "Vocabulary", done: false },
      { id: "ingles-listening", name: "Listening", done: false },
      { id: "ingles-conditionals", name: "Conditionals", done: false },
      { id: "ingles-passive", name: "Passive voice", done: false },
      { id: "ingles-modals", name: "Modal verbs", done: false },
      { id: "ingles-reported", name: "Reported speech", done: false },
      { id: "ingles-relative", name: "Relative clauses", done: false },
      { id: "ingles-articles", name: "Articles and prepositions", done: false },
      { id: "ingles-linking", name: "Linking words", done: false },
      { id: "ingles-pronouns", name: "Pronouns", done: false },
      { id: "ingles-comparatives", name: "Comparatives and superlatives", done: false },
      { id: "ingles-interpretation", name: "Text interpretation strategies", done: false },
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
    progress: 0,
    topics: [
      { id: "filosofia-gregos", name: "Filosofia grega", done: false },
      { id: "filosofia-idade-media", name: "Idade Média e moderna", done: false },
      { id: "filosofia-etica", name: "Ética", done: false },
      { id: "filosofia-epistemologia", name: "Epistemologia", done: false },
      { id: "filosofia-politica", name: "Filosofia política e estética", done: false },
      { id: "filosofia-moderna", name: "Filosofia moderna", done: false },
      { id: "filosofia-contemporanea", name: "Filosofia contemporânea", done: false },
      { id: "filosofia-existencialismo", name: "Existencialismo", done: false },
      { id: "filosofia-logica", name: "Lógica", done: false },
      { id: "filosofia-estetica", name: "Estética", done: false },
      { id: "filosofia-fenomenologia", name: "Fenomenologia", done: false },
      { id: "filosofia-marx", name: "Marx e Escola de Frankfurt", done: false },
      { id: "filosofia-nietzsche", name: "Nietzsche", done: false },
      { id: "filosofia-kant", name: "Kant", done: false },
      { id: "filosofia-foucault", name: "Foucault e pós-estruturalismo", done: false },
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
    progress: 0,
    topics: [
      { id: "sociologia-metodo", name: "Sociologia e método", done: false },
      { id: "sociologia-cultura", name: "Cultura e subcultura", done: false },
      { id: "sociologia-trabalho", name: "Trabalho e produção", done: false },
      { id: "sociologia-estado", name: "Estado e poder", done: false },
      { id: "sociologia-globalizacao", name: "Globalização", done: false },
      { id: "sociologia-desigualdade", name: "Desigualdade e estratificação", done: false },
      { id: "sociologia-movimentos", name: "Movimentos sociais", done: false },
      { id: "sociologia-midia", name: "Mídia e indústria cultural", done: false },
      { id: "sociologia-violencia", name: "Violência e segurança", done: false },
      { id: "sociologia-cidadania", name: "Cidadania e direitos", done: false },
      { id: "sociologia-familia", name: "Família e gênero", done: false },
      { id: "sociologia-juventude", name: "Juventude e identidade", done: false },
      { id: "sociologia-religiao", name: "Religião e secularização", done: false },
      { id: "sociologia-meio-ambiente", name: "Meio ambiente e sociedade", done: false },
      { id: "sociologia-tecnologia", name: "Tecnologia e redes sociais", done: false },
    ],
  },
];

export function getSubjectById(id: string): Subject | undefined {
  return subjects.find((subject) => subject.id === id);
}

export function topicsKey(id: string): string {
  return `vesttrack:topics:${id}`;
}

export function loadTopics(id: string, fallback: Topic[]): Topic[] {
  try {
    const raw = localStorage.getItem(topicsKey(id));
    if (raw) {
      const parsed = JSON.parse(raw) as Topic[];
      if (Array.isArray(parsed)) {
        // Merge new topics if fallback has more than stored
        if (parsed.length < fallback.length) {
          const existingIds = new Set(parsed.map(t => t.id));
          const newTopics = fallback.filter(t => !existingIds.has(t.id));
          return [...parsed, ...newTopics];
        }
        return parsed;
      }
    }
  } catch {}
  return fallback;
}

export function saveTopics(id: string, topics: Topic[]): void {
  try {
    localStorage.setItem(topicsKey(id), JSON.stringify(topics));
  } catch {}
  notifyLocalChange("topics", id);
}

export function completedTopicsCount(): number {
  return subjects.reduce(
    (total, subject) =>
      total + loadTopics(subject.id, subject.topics).filter((t) => t.done).length,
    0,
  );
}
