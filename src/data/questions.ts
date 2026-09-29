import { notifyLocalChange } from "@/lib/syncBus";

export type Difficulty = "facil" | "medio" | "dificil";

export type Question = {
  id: string;
  subjectId: string;
  topicId?: string;
  statement: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: Difficulty;
  source: string;
  tags: string[];
  createdAt: string;
  isCustom: boolean;
};

const STORAGE_KEY = "vesttrack:questions";

const SEED_QUESTIONS: Question[] = [
  {
    "id": "q-matematica-1",
    "subjectId": "matematica",
    "topicId": "matematica-funcoes",
    "statement": "TEXTO: Uma empresa de tecnologia observou que o número de usuários ativos cresce 20% ao mês. Em janeiro tinha 10.000 usuários. Modelo N(t)=N0*(1,2)^t, t meses após janeiro. Em quantos meses o número ultrapassará 20.000? (log1,2 2≈3,8)",
    "options": [
      "2 meses",
      "3 meses",
      "3,8 meses exatos para dobrar, precisa 4 meses inteiros para ultrapassar",
      "4 meses",
      "5 meses"
    ],
    "correctIndex": 2,
    "explanation": "10.000*1,2^t>20.000 =>1,2^t>2 =>t>log1,2 2≈3,8. Valor exato 3,8 meses para dobrar.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "exponencial",
      "log"
    ],
    "createdAt": "2025-05-12T18:50:30.214Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-2",
    "subjectId": "matematica",
    "topicId": "matematica-trigonometria",
    "statement": "Uma caixa d'água cilíndrica raio 1,5m altura 2m. Água ocupa 80% do volume. Quantos litros? (π=3, 1m³=1000L)",
    "options": [
      "3600L",
      "10800L",
      "9000L",
      "4500L",
      "13500L"
    ],
    "correctIndex": 1,
    "explanation": "V=πr²h=3*2,25*2=13,5m³. 80%=10,8m³=10800L.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "volume",
      "cilindro"
    ],
    "createdAt": "2025-05-22T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-3",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-analitica",
    "statement": "Em urna há 5 vermelhas, 3 azuis e 2 verdes. Retirando 2 sem reposição, probabilidade ambas vermelhas?",
    "options": [
      "25/100",
      "20/90=2/9",
      "10/45=2/9 também",
      "5/10*4/9=20/90",
      "1/4"
    ],
    "correctIndex": 1,
    "explanation": "P=5/10*4/9=20/90=2/9.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "probabilidade"
    ],
    "createdAt": "2025-06-01T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-4",
    "subjectId": "matematica",
    "topicId": "matematica-estatistica",
    "statement": "Função f(x)= -x²+6x-8 tem valor máximo igual a:",
    "options": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "Vértice x=3, y=-9+18-8=1. Máximo 1.",
    "difficulty": "medio",
    "source": "UNICAMP 2021 - Inspirada",
    "tags": [
      "função quadrática"
    ],
    "createdAt": "2025-06-11T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-5",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-espacial",
    "statement": "TEXTO: Pesquisa altura 100 pessoas: média 1,70m, mediana 1,72m, moda 1,75m. Assimetria?",
    "options": [
      "Simétrica",
      "Assimetria à esquerda (média<mediana<moda)",
      "Assimetria à direita",
      "Não há moda",
      "Média=mediana=moda"
    ],
    "correctIndex": 1,
    "explanation": "Média<mediana<moda indica cauda à esquerda.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "estatística"
    ],
    "createdAt": "2025-06-21T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-6",
    "subjectId": "matematica",
    "topicId": "matematica-funcoes",
    "statement": "Capital R$2000 rende R$400 juros simples em 4 meses, taxa mensal:",
    "options": [
      "2%",
      "5%",
      "4%",
      "10%",
      "8%"
    ],
    "correctIndex": 1,
    "explanation": "J=Cit =>400=2000*i*4 =>i=0,05=5%.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "juros simples"
    ],
    "createdAt": "2025-07-01T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-7",
    "subjectId": "matematica",
    "topicId": "matematica-trigonometria",
    "statement": "TEXTO: Terreno retangular perímetro 100m área 600m². Dimensões? 2x+2y=100, xy=600",
    "options": [
      "20x30",
      "10x40",
      "15x35",
      "25x25",
      "30x20 igual"
    ],
    "correctIndex": 0,
    "explanation": "x+y=50, xy=600 =>20 e 30.",
    "difficulty": "medio",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "sistema"
    ],
    "createdAt": "2025-07-11T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-8",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-analitica",
    "statement": "PG 3,6,12,... Soma 5 primeiros:",
    "options": [
      "93",
      "96",
      "90",
      "48",
      "60"
    ],
    "correctIndex": 0,
    "explanation": "Razão 2, S5=3*(32-1)=93.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "PG"
    ],
    "createdAt": "2025-07-21T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-9",
    "subjectId": "matematica",
    "topicId": "matematica-estatistica",
    "statement": "Triângulo retângulo catetos 9 e 12. Hipotenusa e área:",
    "options": [
      "15 e 54",
      "15 e 108",
      "18 e 54",
      "12 e 54",
      "15 e 27"
    ],
    "correctIndex": 0,
    "explanation": "Hip 15 (9-12-15), área 54.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "Pitágoras"
    ],
    "createdAt": "2025-07-31T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-10",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-espacial",
    "statement": "Se 3^x=81, log₃81 = x vale:",
    "options": [
      "3",
      "4",
      "2",
      "9",
      "27"
    ],
    "correctIndex": 1,
    "explanation": "3^4=81.",
    "difficulty": "facil",
    "source": "FUVEST 2018 - Inspirada",
    "tags": [
      "log"
    ],
    "createdAt": "2025-08-10T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-11",
    "subjectId": "matematica",
    "topicId": "matematica-funcoes",
    "statement": "TEXTO: Função afim passa por (0,2) e (2,8). Coeficientes angular e linear:",
    "options": [
      "3 e 2",
      "2 e 3",
      "4 e 2",
      "2 e 2",
      "3 e 3"
    ],
    "correctIndex": 0,
    "explanation": "a=(8-2)/2=3, b=2.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "função afim"
    ],
    "createdAt": "2025-08-20T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-12",
    "subjectId": "matematica",
    "topicId": "matematica-trigonometria",
    "statement": "Determinante [[2,3],[1,4]]:",
    "options": [
      "5",
      "8",
      "11",
      "10",
      "6"
    ],
    "correctIndex": 0,
    "explanation": "det=8-3=5.",
    "difficulty": "medio",
    "source": "UNICAMP 2020 - Inspirada",
    "tags": [
      "determinante"
    ],
    "createdAt": "2025-08-30T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-13",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-analitica",
    "statement": "TEXTO: Pesquisa 200 pessoas: 120 gostam A, 80 B, 30 ambos. Quantos nenhum?",
    "options": [
      "30",
      "50",
      "20",
      "200-(120+80-30)=30",
      "70"
    ],
    "correctIndex": 3,
    "explanation": "Gostam algum=170, nenhum=30.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "conjuntos"
    ],
    "createdAt": "2025-09-09T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-14",
    "subjectId": "matematica",
    "topicId": "matematica-estatistica",
    "statement": "Se f(x)=x³-3x, derivada f'(x):",
    "options": [
      "3x²-3",
      "x²-3",
      "3x²",
      "x³",
      "3x"
    ],
    "correctIndex": 0,
    "explanation": "Derivada x³=3x², -3x=-3.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "derivada"
    ],
    "createdAt": "2025-09-19T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-15",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-espacial",
    "statement": "Probabilidade 3 caras em 3 moedas:",
    "options": [
      "1/2",
      "1/4",
      "1/8",
      "3/8",
      "1/3"
    ],
    "correctIndex": 2,
    "explanation": "8 casos, 1 é CCC =>1/8.",
    "difficulty": "facil",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "probabilidade"
    ],
    "createdAt": "2025-09-29T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-16",
    "subjectId": "matematica",
    "topicId": "matematica-funcoes",
    "statement": "TEXTO: Reservatório perde 10% ao dia. Começa 1000L, após 2 dias resta: (0,9²=0,81)",
    "options": [
      "800L",
      "810L",
      "900L",
      "900L dia1, 810L dia2",
      "700L"
    ],
    "correctIndex": 3,
    "explanation": "Dia1 900, dia2 810.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "porcentagem"
    ],
    "createdAt": "2025-10-09T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-17",
    "subjectId": "matematica",
    "topicId": "matematica-trigonometria",
    "statement": "Área setor 60° raio 6 (π=3):",
    "options": [
      "18",
      "36",
      "9",
      "54",
      "12"
    ],
    "correctIndex": 0,
    "explanation": "Área setor=60/360*πr²=18.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "setor"
    ],
    "createdAt": "2025-10-19T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-18",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-analitica",
    "statement": "Se sen x=0,6 cos x=0,8 tg x:",
    "options": [
      "0,75",
      "1,33",
      "0,6",
      "0,8",
      "1"
    ],
    "correctIndex": 0,
    "explanation": "tg=sen/cos=0,75.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "trigonometria"
    ],
    "createdAt": "2025-10-29T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-19",
    "subjectId": "matematica",
    "topicId": "matematica-estatistica",
    "statement": "Equação x²-10x+21=0 produto raízes:",
    "options": [
      "10",
      "21",
      "-10",
      "-21",
      "7"
    ],
    "correctIndex": 1,
    "explanation": "Produto c/a=21.",
    "difficulty": "facil",
    "source": "FUVEST 2019",
    "tags": [
      "Girard"
    ],
    "createdAt": "2025-11-08T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-20",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-espacial",
    "statement": "Soma raízes x²-10x+21=0:",
    "options": [
      "10",
      "21",
      "-10",
      "7",
      "3"
    ],
    "correctIndex": 0,
    "explanation": "Soma -b/a=10.",
    "difficulty": "facil",
    "source": "FUVEST 2019",
    "tags": [
      "Girard"
    ],
    "createdAt": "2025-11-18T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-21",
    "subjectId": "matematica",
    "topicId": "matematica-funcoes",
    "statement": "Quadrado diagonal 8√2 lado:",
    "options": [
      "8",
      "4√2",
      "8√2",
      "16",
      "6"
    ],
    "correctIndex": 0,
    "explanation": "Diagonal lado√2 =>8.",
    "difficulty": "medio",
    "source": "ENEM 2022",
    "tags": [
      "quadrado"
    ],
    "createdAt": "2025-11-28T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-22",
    "subjectId": "matematica",
    "topicId": "matematica-trigonometria",
    "statement": "Volume cone raio3 altura4 (V=1/3πr²h, π=3):",
    "options": [
      "12",
      "24",
      "36",
      "48",
      "9"
    ],
    "correctIndex": 2,
    "explanation": "V=1/3*3*9*4=36.",
    "difficulty": "medio",
    "source": "ENEM 2021",
    "tags": [
      "cone"
    ],
    "createdAt": "2025-12-08T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-23",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-analitica",
    "statement": "TEXTO: Empresa custo fixo 500 variável 20/unid preço 50 lucro 100 unid:",
    "options": [
      "R$2500",
      "R$3000",
      "R$2000",
      "R$5000",
      "R$1000"
    ],
    "correctIndex": 0,
    "explanation": "Receita 5000 custo 2500 lucro 2500.",
    "difficulty": "medio",
    "source": "ENEM 2023",
    "tags": [
      "lucro"
    ],
    "createdAt": "2025-12-18T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-24",
    "subjectId": "matematica",
    "topicId": "matematica-estatistica",
    "statement": "Se a_n=2n+1 a_10:",
    "options": [
      "20",
      "21",
      "22",
      "19",
      "11"
    ],
    "correctIndex": 1,
    "explanation": "21.",
    "difficulty": "facil",
    "source": "ENEM 2018",
    "tags": [
      "sequência"
    ],
    "createdAt": "2025-12-28T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-25",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-espacial",
    "statement": "Probabilidade carta ouros 13/52:",
    "options": [
      "1/4",
      "1/13",
      "1/52",
      "13/52=1/4",
      "1/2"
    ],
    "correctIndex": 3,
    "explanation": "13/52=1/4.",
    "difficulty": "facil",
    "source": "ENEM 2020",
    "tags": [
      "probabilidade"
    ],
    "createdAt": "2026-01-07T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-26",
    "subjectId": "matematica",
    "topicId": "matematica-funcoes",
    "statement": "TEXTO: Gráfico pizza 40%A 30%B 20%C 10%D total 200 quantas B?",
    "options": [
      "40",
      "60",
      "20",
      "80",
      "30"
    ],
    "correctIndex": 1,
    "explanation": "30% de 200=60.",
    "difficulty": "facil",
    "source": "ENEM 2019",
    "tags": [
      "pizza"
    ],
    "createdAt": "2026-01-17T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-27",
    "subjectId": "matematica",
    "topicId": "matematica-trigonometria",
    "statement": "Se 2^x*2^y=2^10 e x+y=10 propriedade:",
    "options": [
      "Potência de potência",
      "Produto mesma base soma expoentes",
      "Divisão",
      "Raiz",
      "Log"
    ],
    "correctIndex": 1,
    "explanation": "a^m*a^n=a^(m+n).",
    "difficulty": "facil",
    "source": "FUVEST 2018",
    "tags": [
      "potências"
    ],
    "createdAt": "2026-01-27T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-28",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-analitica",
    "statement": "Área trapézio bases 8 e12 altura5:",
    "options": [
      "20",
      "50",
      "100",
      "40",
      "60"
    ],
    "correctIndex": 1,
    "explanation": "(20)*5/2=50.",
    "difficulty": "facil",
    "source": "ENEM 2020",
    "tags": [
      "trapézio"
    ],
    "createdAt": "2026-02-06T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-29",
    "subjectId": "matematica",
    "topicId": "matematica-estatistica",
    "statement": "Se divisível por 2 e3 divisível por:",
    "options": [
      "5",
      "6",
      "9",
      "4",
      "12"
    ],
    "correctIndex": 1,
    "explanation": "Por 6.",
    "difficulty": "facil",
    "source": "ENEM 2018",
    "tags": [
      "divisibilidade"
    ],
    "createdAt": "2026-02-16T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-30",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-espacial",
    "statement": "TEXTO: Escada 5m encosta parede 4m altura distância base-parede:",
    "options": [
      "3m",
      "4m",
      "5m",
      "1m",
      "6m"
    ],
    "correctIndex": 0,
    "explanation": "Pitágoras 3-4-5.",
    "difficulty": "facil",
    "source": "ENEM 2019",
    "tags": [
      "Pitágoras"
    ],
    "createdAt": "2026-02-26T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-31",
    "subjectId": "matematica",
    "topicId": "matematica-funcoes",
    "statement": "Se f(x)=2x²-8x+6 raízes:",
    "options": [
      "1 e3",
      "2 e3",
      "1 e2",
      "3 e4",
      "0 e3"
    ],
    "correctIndex": 0,
    "explanation": "2(x-1)(x-3).",
    "difficulty": "medio",
    "source": "FUVEST 2021",
    "tags": [
      "raízes"
    ],
    "createdAt": "2026-03-08T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-32",
    "subjectId": "matematica",
    "topicId": "matematica-trigonometria",
    "statement": "Soma PG infinita a1=1 q=0,5:",
    "options": [
      "2",
      "1",
      "0,5",
      "Infinito",
      "1,5"
    ],
    "correctIndex": 0,
    "explanation": "S=a1/(1-q)=2.",
    "difficulty": "dificil",
    "source": "UNICAMP 2022",
    "tags": [
      "PG infinita"
    ],
    "createdAt": "2026-03-18T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-33",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-analitica",
    "statement": "TEXTO: Mapa 1:100.000 distância real 5km no mapa:",
    "options": [
      "5cm",
      "50cm",
      "0,5cm",
      "5mm",
      "50mm=5cm"
    ],
    "correctIndex": 4,
    "explanation": "5km=500.000cm/100.000=5cm.",
    "difficulty": "medio",
    "source": "ENEM 2020",
    "tags": [
      "escala"
    ],
    "createdAt": "2026-03-28T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-34",
    "subjectId": "matematica",
    "topicId": "matematica-estatistica",
    "statement": "Ângulo 30° complemento 60° suplemento 30°:",
    "options": [
      "60°",
      "150°",
      "90°",
      "30°",
      "180°"
    ],
    "correctIndex": 1,
    "explanation": "Suplemento 180-ângulo.",
    "difficulty": "facil",
    "source": "ENEM 2019",
    "tags": [
      "complemento"
    ],
    "createdAt": "2026-04-07T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-35",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-espacial",
    "statement": "Anagramas CASA:",
    "options": [
      "24",
      "12",
      "6",
      "4",
      "8"
    ],
    "correctIndex": 1,
    "explanation": "4!/2!=12.",
    "difficulty": "medio",
    "source": "FUVEST 2020",
    "tags": [
      "anagramas"
    ],
    "createdAt": "2026-04-17T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-36",
    "subjectId": "matematica",
    "topicId": "matematica-funcoes",
    "statement": "TEXTO: Urna 100 bolas 1-100 prob múltiplo de5:",
    "options": [
      "1/5",
      "20/100=1/5",
      "1/10",
      "1/2",
      "1/4"
    ],
    "correctIndex": 1,
    "explanation": "20 múltiplos =>1/5.",
    "difficulty": "facil",
    "source": "ENEM 2021",
    "tags": [
      "múltiplos"
    ],
    "createdAt": "2026-04-27T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-37",
    "subjectId": "matematica",
    "topicId": "matematica-trigonometria",
    "statement": "Se y=2x+3 x=-1 y:",
    "options": [
      "1",
      "2",
      "3",
      "5",
      "-1"
    ],
    "correctIndex": 0,
    "explanation": "-2+3=1.",
    "difficulty": "facil",
    "source": "ENEM 2018",
    "tags": [
      "afim"
    ],
    "createdAt": "2026-05-07T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-38",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-analitica",
    "statement": "Área losango diagonais 6 e8:",
    "options": [
      "14",
      "24",
      "48",
      "12",
      "18"
    ],
    "correctIndex": 1,
    "explanation": "D*d/2=24.",
    "difficulty": "facil",
    "source": "ENEM 2020",
    "tags": [
      "losango"
    ],
    "createdAt": "2026-05-17T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-39",
    "subjectId": "matematica",
    "topicId": "matematica-estatistica",
    "statement": "Triângulo lados 5,5,6 é:",
    "options": [
      "Equilátero",
      "Isósceles",
      "Escaleno",
      "Retângulo",
      "Obtusângulo"
    ],
    "correctIndex": 1,
    "explanation": "Dois iguais isósceles.",
    "difficulty": "facil",
    "source": "ENEM 2019",
    "tags": [
      "triângulos"
    ],
    "createdAt": "2026-05-27T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-40",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-espacial",
    "statement": "Volume paralelepípedo 2x3x4:",
    "options": [
      "9",
      "14",
      "24",
      "12",
      "18"
    ],
    "correctIndex": 2,
    "explanation": "24.",
    "difficulty": "facil",
    "source": "ENEM 2018",
    "tags": [
      "paralelepípedo"
    ],
    "createdAt": "2026-06-06T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-41",
    "subjectId": "matematica",
    "topicId": "matematica-funcoes",
    "statement": "Se 10% de x é 50 x:",
    "options": [
      "50",
      "500",
      "5",
      "100",
      "250"
    ],
    "correctIndex": 1,
    "explanation": "0,1x=50 =>500.",
    "difficulty": "facil",
    "source": "ENEM 2018",
    "tags": [
      "porcentagem"
    ],
    "createdAt": "2026-06-16T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-42",
    "subjectId": "matematica",
    "topicId": "matematica-trigonometria",
    "statement": "TEXTO: Pesquisa eleitoral 1000 pessoas 600 votam A margem ±3% A tem entre:",
    "options": [
      "57% e63%",
      "60% exato",
      "50% e70%",
      "0% e100%",
      "30% e90%"
    ],
    "correctIndex": 0,
    "explanation": "60%±3% =>57-63%.",
    "difficulty": "dificil",
    "source": "ENEM 2023",
    "tags": [
      "margem erro"
    ],
    "createdAt": "2026-06-26T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-43",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-analitica",
    "statement": "Se sen²+cos²=1 sen=3/5 cos 1º quadrante:",
    "options": [
      "4/5",
      "3/5",
      "5/4",
      "1",
      "0"
    ],
    "correctIndex": 0,
    "explanation": "cos²=16/25 =>4/5.",
    "difficulty": "medio",
    "source": "FUVEST 2021",
    "tags": [
      "identidade"
    ],
    "createdAt": "2026-07-06T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-44",
    "subjectId": "matematica",
    "topicId": "matematica-estatistica",
    "statement": "Log 1000 base10:",
    "options": [
      "2",
      "3",
      "4",
      "10",
      "100"
    ],
    "correctIndex": 1,
    "explanation": "10³=1000.",
    "difficulty": "facil",
    "source": "ENEM 2019",
    "tags": [
      "log"
    ],
    "createdAt": "2026-07-16T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-45",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-espacial",
    "statement": "Se 2,4,8 PG razão:",
    "options": [
      "2",
      "4",
      "1/2",
      "6",
      "8"
    ],
    "correctIndex": 0,
    "explanation": "Razão 2.",
    "difficulty": "facil",
    "source": "ENEM 2018",
    "tags": [
      "PG"
    ],
    "createdAt": "2026-07-26T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-46",
    "subjectId": "matematica",
    "topicId": "matematica-funcoes",
    "statement": "TEXTO: Carro 12km/L para 240km precisa:",
    "options": [
      "10L",
      "20L",
      "12L",
      "24L",
      "30L"
    ],
    "correctIndex": 1,
    "explanation": "240/12=20.",
    "difficulty": "facil",
    "source": "ENEM 2020",
    "tags": [
      "regra três"
    ],
    "createdAt": "2026-08-05T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-47",
    "subjectId": "matematica",
    "topicId": "matematica-trigonometria",
    "statement": "Círculo diâmetro10 raio:",
    "options": [
      "5",
      "10",
      "20",
      "2,5",
      "100"
    ],
    "correctIndex": 0,
    "explanation": "Raio diâmetro/2.",
    "difficulty": "facil",
    "source": "ENEM 2018",
    "tags": [
      "círculo"
    ],
    "createdAt": "2026-08-15T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-48",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-analitica",
    "statement": "TEXTO: Função custo C(x)=0,1x²-20x+5000 mínimo: xv=-b/2a=100, Cmin?",
    "options": [
      "4000",
      "5000",
      "3000",
      "1000",
      "2000"
    ],
    "correctIndex": 0,
    "explanation": "C(100)=1000-2000+5000=4000.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "otimização"
    ],
    "createdAt": "2026-08-25T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-49",
    "subjectId": "matematica",
    "topicId": "matematica-estatistica",
    "statement": "Probabilidade soma 7 em dois dados:",
    "options": [
      "1/6",
      "1/12",
      "1/36",
      "7/36",
      "1/7"
    ],
    "correctIndex": 0,
    "explanation": "6 combinações em 36 =>1/6.",
    "difficulty": "medio",
    "source": "ENEM 2021",
    "tags": [
      "dados"
    ],
    "createdAt": "2026-09-04T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-matematica-50",
    "subjectId": "matematica",
    "topicId": "matematica-geometria-espacial",
    "statement": "TEXTO: Juros compostos 1000 a 10% a.a por 2 anos montante:",
    "options": [
      "1100",
      "1210",
      "1200",
      "1000",
      "1300"
    ],
    "correctIndex": 1,
    "explanation": "M=1000*1,1²=1210.",
    "difficulty": "medio",
    "source": "ENEM 2022",
    "tags": [
      "juros compostos"
    ],
    "createdAt": "2026-09-14T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-1",
    "subjectId": "fisica",
    "topicId": "fisica-cinematica",
    "statement": "TEXTO: Carro freia desaceleração 5m/s² a 20m/s distância até parar: v²=v0²+2aΔs",
    "options": [
      "20m",
      "40m",
      "80m",
      "10m",
      "100m"
    ],
    "correctIndex": 1,
    "explanation": "0=400-10Δs =>40m.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "MRUV"
    ],
    "createdAt": "2025-07-01T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-2",
    "subjectId": "fisica",
    "topicId": "fisica-dinamica",
    "statement": "TEXTO: Blocos A2kg B3kg fio força10N sem atrito aceleração e tração:",
    "options": [
      "2m/s² e4N",
      "2 e6N",
      "5 e10N",
      "2 e10N",
      "1 e2N"
    ],
    "correctIndex": 0,
    "explanation": "a=10/5=2 tração mA*a=4N.",
    "difficulty": "dificil",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "blocos"
    ],
    "createdAt": "2025-07-11T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-3",
    "subjectId": "fisica",
    "topicId": "fisica-eletromagnetismo",
    "statement": "TEXTO: Pêndulo T=2π√(L/g) se L dobra período:",
    "options": [
      "Dobra",
      "Aumenta √2",
      "Metade",
      "Não muda",
      "Quadruplica"
    ],
    "correctIndex": 1,
    "explanation": "T∝√L.",
    "difficulty": "medio",
    "source": "UNICAMP 2022 - Inspirada",
    "tags": [
      "pêndulo"
    ],
    "createdAt": "2025-07-21T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-4",
    "subjectId": "fisica",
    "topicId": "fisica-ondas",
    "statement": "Energia potencial 1kg a10m g10:",
    "options": [
      "10J",
      "100J",
      "1J",
      "1000J",
      "0J"
    ],
    "correctIndex": 1,
    "explanation": "Ep=100J.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "Ep"
    ],
    "createdAt": "2025-07-31T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-5",
    "subjectId": "fisica",
    "topicId": "fisica-termodinamica",
    "statement": "TEXTO: Carga 2C campo5N/C força:",
    "options": [
      "2,5N",
      "10N",
      "7N",
      "0,4N",
      "5N"
    ],
    "correctIndex": 1,
    "explanation": "F=qE=10N.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "força elétrica"
    ],
    "createdAt": "2025-08-10T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-6",
    "subjectId": "fisica",
    "topicId": "fisica-cinematica",
    "statement": "TEXTO: Espelho côncavo objeto além centro imagem real invertida. Objeto no centro (2f) imagem:",
    "options": [
      "No foco",
      "No centro mesmo tamanho invertida",
      "No infinito",
      "Virtual maior",
      "Não forma"
    ],
    "correctIndex": 1,
    "explanation": "Objeto no centro imagem no centro mesmo tamanho.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "espelhos"
    ],
    "createdAt": "2025-08-20T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-7",
    "subjectId": "fisica",
    "topicId": "fisica-dinamica",
    "statement": "1ª lei Newton:",
    "options": [
      "Ação reação",
      "Inércia",
      "Gravitação",
      "Coulomb",
      "Ohm"
    ],
    "correctIndex": 1,
    "explanation": "Inércia.",
    "difficulty": "facil",
    "source": "ENEM 2018 - Inspirada",
    "tags": [
      "1ª lei"
    ],
    "createdAt": "2025-08-30T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-8",
    "subjectId": "fisica",
    "topicId": "fisica-eletromagnetismo",
    "statement": "TEXTO: Transformador 100 espiras primário 200 secundário 110V primário secundário:",
    "options": [
      "55V",
      "110V",
      "220V",
      "440V",
      "0V"
    ],
    "correctIndex": 2,
    "explanation": "V2/V1=N2/N1 =>220V.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "transformador"
    ],
    "createdAt": "2025-09-09T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-9",
    "subjectId": "fisica",
    "topicId": "fisica-ondas",
    "statement": "Calor aquecer 1kg água 20-30°C c1cal/g°C:",
    "options": [
      "10kcal",
      "1kcal",
      "10cal",
      "100kcal",
      "10000cal=10kcal"
    ],
    "correctIndex": 4,
    "explanation": "Q=1000*1*10=10000cal=10kcal.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "calor"
    ],
    "createdAt": "2025-09-19T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-10",
    "subjectId": "fisica",
    "topicId": "fisica-termodinamica",
    "statement": "TEXTO: Onda f50Hz v340m/s λ:",
    "options": [
      "6,8m",
      "0,147m",
      "17000m",
      "390m",
      "50m"
    ],
    "correctIndex": 0,
    "explanation": "λ=v/f=6,8m.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "onda"
    ],
    "createdAt": "2025-09-29T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-11",
    "subjectId": "fisica",
    "topicId": "fisica-cinematica",
    "statement": "Unidade potência:",
    "options": [
      "Joule",
      "Watt",
      "Newton",
      "Pascal",
      "Coulomb"
    ],
    "correctIndex": 1,
    "explanation": "Watt.",
    "difficulty": "facil",
    "source": "ENEM 2018 - Inspirada",
    "tags": [
      "potência"
    ],
    "createdAt": "2025-10-09T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-12",
    "subjectId": "fisica",
    "topicId": "fisica-dinamica",
    "statement": "TEXTO: Resistores 2Ω e3Ω série Req:",
    "options": [
      "1,2Ω",
      "5Ω",
      "6Ω",
      "2,5Ω",
      "0,5Ω"
    ],
    "correctIndex": 1,
    "explanation": "Soma 5Ω.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "série"
    ],
    "createdAt": "2025-10-19T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-13",
    "subjectId": "fisica",
    "topicId": "fisica-eletromagnetismo",
    "statement": "Resistores 2Ω e3Ω paralelo Req:",
    "options": [
      "5Ω",
      "6Ω",
      "1,2Ω",
      "2,5Ω",
      "1Ω"
    ],
    "correctIndex": 2,
    "explanation": "1/Req=5/6 =>1,2Ω.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "paralelo"
    ],
    "createdAt": "2025-10-29T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-14",
    "subjectId": "fisica",
    "topicId": "fisica-ondas",
    "statement": "TEXTO: Gás expansão isobárica trabalho:",
    "options": [
      "Zero",
      "PΔV",
      "VΔP",
      "Q",
      "U"
    ],
    "correctIndex": 1,
    "explanation": "PΔV.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "trabalho"
    ],
    "createdAt": "2025-11-08T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-15",
    "subjectId": "fisica",
    "topicId": "fisica-termodinamica",
    "statement": "2ª lei termodinâmica entropia:",
    "options": [
      "Diminui sempre",
      "Aumenta ou constante isolado",
      "Zero",
      "Diminui isolado",
      "Não existe"
    ],
    "correctIndex": 1,
    "explanation": "Entropia aumenta/constante isolado.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "2ª lei"
    ],
    "createdAt": "2025-11-18T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-16",
    "subjectId": "fisica",
    "topicId": "fisica-cinematica",
    "statement": "TEXTO: Luz branca prisma dispersão:",
    "options": [
      "Pura",
      "Composta várias cores índices diferentes",
      "Prisma cria cores",
      "Não refrata",
      "Só vermelho"
    ],
    "correctIndex": 1,
    "explanation": "Branco composto n depende freq.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "dispersão"
    ],
    "createdAt": "2025-11-28T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-17",
    "subjectId": "fisica",
    "topicId": "fisica-dinamica",
    "statement": "Efeito Doppler ambulância aproximando som:",
    "options": [
      "Mais grave",
      "Mais agudo freq maior",
      "Mesma",
      "Sem som",
      "Mais baixo"
    ],
    "correctIndex": 1,
    "explanation": "Aproximação aumenta freq.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "Doppler"
    ],
    "createdAt": "2025-12-08T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-18",
    "subjectId": "fisica",
    "topicId": "fisica-eletromagnetismo",
    "statement": "TEXTO: Satélite órbita circular força centrípeta igual:",
    "options": [
      "Peso",
      "Gravitacional",
      "Normal",
      "Atrito",
      "Tração"
    ],
    "correctIndex": 1,
    "explanation": "Gravitacional=centrípeta.",
    "difficulty": "medio",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "satélite"
    ],
    "createdAt": "2025-12-18T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-19",
    "subjectId": "fisica",
    "topicId": "fisica-ondas",
    "statement": "3ª lei Kepler T² proporcional:",
    "options": [
      "R",
      "R²",
      "R³",
      "1/R",
      "R^1/2"
    ],
    "correctIndex": 2,
    "explanation": "T²∝R³.",
    "difficulty": "dificil",
    "source": "UNICAMP 2021 - Inspirada",
    "tags": [
      "Kepler"
    ],
    "createdAt": "2025-12-28T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-20",
    "subjectId": "fisica",
    "topicId": "fisica-termodinamica",
    "statement": "TEXTO: Fóton freq6×10¹⁴Hz E=hf h6,6×10⁻³⁴ E≈:",
    "options": [
      "4×10⁻¹⁹J",
      "10⁻³⁴J",
      "10⁻¹⁹J",
      "10⁻²⁰J",
      "10⁻¹⁸J"
    ],
    "correctIndex": 0,
    "explanation": "4e-19J.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "fóton"
    ],
    "createdAt": "2026-01-07T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-21",
    "subjectId": "fisica",
    "topicId": "fisica-cinematica",
    "statement": "Carga elétron:",
    "options": [
      "1,6×10⁻¹⁹C negativa",
      "1,6×10⁻¹⁹ positiva",
      "9,1×10⁻³¹C",
      "0",
      "1C"
    ],
    "correctIndex": 0,
    "explanation": "Elétron -1,6e-19.",
    "difficulty": "facil",
    "source": "ENEM 2018 - Inspirada",
    "tags": [
      "carga"
    ],
    "createdAt": "2026-01-17T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-22",
    "subjectId": "fisica",
    "topicId": "fisica-dinamica",
    "statement": "Massa elétron:",
    "options": [
      "9,1×10⁻³¹kg",
      "1,6×10⁻²⁷kg",
      "1kg",
      "0",
      "9,1×10⁻²⁷kg"
    ],
    "correctIndex": 0,
    "explanation": "9,1e-31kg.",
    "difficulty": "facil",
    "source": "FUVEST 2019 - Inspirada",
    "tags": [
      "massa"
    ],
    "createdAt": "2026-01-27T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-23",
    "subjectId": "fisica",
    "topicId": "fisica-eletromagnetismo",
    "statement": "TEXTO: Bateria12V resistor4Ω corrente:",
    "options": [
      "3A",
      "48A",
      "0,33A",
      "12A",
      "4A"
    ],
    "correctIndex": 0,
    "explanation": "I=3A.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "corrente"
    ],
    "createdAt": "2026-02-06T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-24",
    "subjectId": "fisica",
    "topicId": "fisica-ondas",
    "statement": "Potência dissipada resistor4Ω 3A:",
    "options": [
      "12W",
      "36W",
      "9W",
      "48W",
      "3W"
    ],
    "correctIndex": 1,
    "explanation": "RI²=36W.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "potência"
    ],
    "createdAt": "2026-02-16T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-25",
    "subjectId": "fisica",
    "topicId": "fisica-termodinamica",
    "statement": "TEXTO: Pessoa60kg sobe10m trabalho contra gravidade g10:",
    "options": [
      "600J",
      "6000J",
      "60J",
      "60000J",
      "6J"
    ],
    "correctIndex": 1,
    "explanation": "mgh=6000J.",
    "difficulty": "facil",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "trabalho"
    ],
    "createdAt": "2026-02-26T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-26",
    "subjectId": "fisica",
    "topicId": "fisica-cinematica",
    "statement": "Energia elástica mola k100N/m x0,1m:",
    "options": [
      "0,5J",
      "1J",
      "10J",
      "5J",
      "0,05J"
    ],
    "correctIndex": 0,
    "explanation": "kx²/2=0,5J.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "mola"
    ],
    "createdAt": "2026-03-08T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-27",
    "subjectId": "fisica",
    "topicId": "fisica-dinamica",
    "statement": "TEXTO: Colisão elástica conserva:",
    "options": [
      "Só momento",
      "Momento e energia cinética",
      "Só energia",
      "Nada",
      "Só massa"
    ],
    "correctIndex": 1,
    "explanation": "Elástica momento+Ec.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "elástica"
    ],
    "createdAt": "2026-03-18T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-28",
    "subjectId": "fisica",
    "topicId": "fisica-eletromagnetismo",
    "statement": "Colisão inelástica conserva:",
    "options": [
      "Momento+Ec",
      "Só momento",
      "Nada",
      "Só energia",
      "Só massa"
    ],
    "correctIndex": 1,
    "explanation": "Só momento.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "inelástica"
    ],
    "createdAt": "2026-03-28T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-29",
    "subjectId": "fisica",
    "topicId": "fisica-ondas",
    "statement": "TEXTO: Objeto MCU aceleração centrípeta:",
    "options": [
      "Zero",
      "v²/R para centro",
      "Tangencial",
      "Para fora",
      "Igual g"
    ],
    "correctIndex": 1,
    "explanation": "v²/R centro.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "MCU"
    ],
    "createdAt": "2026-04-07T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-30",
    "subjectId": "fisica",
    "topicId": "fisica-termodinamica",
    "statement": "Período pêndulo depende:",
    "options": [
      "Massa",
      "Comprimento e gravidade",
      "Amplitude pequenos ângulos",
      "Cor",
      "Material"
    ],
    "correctIndex": 1,
    "explanation": "L e g.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "pêndulo fatores"
    ],
    "createdAt": "2026-04-17T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-31",
    "subjectId": "fisica",
    "topicId": "fisica-cinematica",
    "statement": "TEXTO: Lei Coulomb cargas1C 1m vácuo k9×10⁹:",
    "options": [
      "9×10⁹N",
      "9×10⁶N",
      "1N",
      "0",
      "9×10³N"
    ],
    "correctIndex": 0,
    "explanation": "9e9N.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "Coulomb"
    ],
    "createdAt": "2026-04-27T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-32",
    "subjectId": "fisica",
    "topicId": "fisica-dinamica",
    "statement": "Campo elétrico carga pontual cai com:",
    "options": [
      "1/r",
      "1/r²",
      "r",
      "r²",
      "Constante"
    ],
    "correctIndex": 1,
    "explanation": "1/r².",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "campo"
    ],
    "createdAt": "2026-05-07T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-33",
    "subjectId": "fisica",
    "topicId": "fisica-eletromagnetismo",
    "statement": "Potencial carga pontual cai com:",
    "options": [
      "1/r",
      "1/r²",
      "r",
      "r²",
      "Constante"
    ],
    "correctIndex": 0,
    "explanation": "1/r.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "potencial"
    ],
    "createdAt": "2026-05-17T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-34",
    "subjectId": "fisica",
    "topicId": "fisica-ondas",
    "statement": "TEXTO: Onda EM vácuo velocidade:",
    "options": [
      "340m/s",
      "3×10⁸m/s",
      "0",
      "Infinita",
      "Depende freq"
    ],
    "correctIndex": 1,
    "explanation": "c=3e8.",
    "difficulty": "facil",
    "source": "ENEM 2018 - Inspirada",
    "tags": [
      "EM"
    ],
    "createdAt": "2026-05-27T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-35",
    "subjectId": "fisica",
    "topicId": "fisica-termodinamica",
    "statement": "Luz visível entre:",
    "options": [
      "Rádio e micro",
      "IR e UV",
      "Raios X e gama",
      "Som e ultrassom",
      "Não tem"
    ],
    "correctIndex": 1,
    "explanation": "Entre IR e UV.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "espectro"
    ],
    "createdAt": "2026-06-06T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-36",
    "subjectId": "fisica",
    "topicId": "fisica-cinematica",
    "statement": "TEXTO: Efeito estufa natural:",
    "options": [
      "Ruim sempre",
      "Essencial mantém Terra aquecida",
      "Inexistente",
      "Só humano",
      "Frio"
    ],
    "correctIndex": 1,
    "explanation": "Mantém ~15°C sem -18°C.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "estufa"
    ],
    "createdAt": "2026-06-16T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-37",
    "subjectId": "fisica",
    "topicId": "fisica-dinamica",
    "statement": "Aquecimento antropogênico intensifica por:",
    "options": [
      "Mais O2",
      "Mais CO2 CH4 N2O queima fóssil",
      "Mais N2",
      "Menos CO2",
      "Mais He"
    ],
    "correctIndex": 1,
    "explanation": "Queima fóssil.",
    "difficulty": "facil",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "aquecimento"
    ],
    "createdAt": "2026-06-26T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-38",
    "subjectId": "fisica",
    "topicId": "fisica-eletromagnetismo",
    "statement": "TEXTO: Usina nuclear usa:",
    "options": [
      "Fusão",
      "Fissão Urânio",
      "Combustão",
      "Queda d'água",
      "Vento"
    ],
    "correctIndex": 1,
    "explanation": "Fissão U-235.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "nuclear"
    ],
    "createdAt": "2026-07-06T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-39",
    "subjectId": "fisica",
    "topicId": "fisica-ondas",
    "statement": "TEXTO: Carro elétrico eficiência maior porque:",
    "options": [
      "Sem perdas",
      "Motor elétrico converte mais em movimento menos calor",
      "Mais pesado",
      "Mais caro",
      "Sem bateria"
    ],
    "correctIndex": 1,
    "explanation": "Elétrico ~85% combustão ~25%.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "eficiência"
    ],
    "createdAt": "2026-07-16T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-40",
    "subjectId": "fisica",
    "topicId": "fisica-termodinamica",
    "statement": "Unidade carga Coulomb corrente Ampère C/s 1A por2s transporta:",
    "options": [
      "1C",
      "2C",
      "0,5C",
      "3C",
      "0C"
    ],
    "correctIndex": 1,
    "explanation": "Q=It=2C.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "corrente"
    ],
    "createdAt": "2026-07-26T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-41",
    "subjectId": "fisica",
    "topicId": "fisica-cinematica",
    "statement": "TEXTO: Ímã quebrado ao meio gera:",
    "options": [
      "Um N e um S separados",
      "Dois ímãs completos N e S",
      "Perde magnetismo",
      "Só norte",
      "Só sul"
    ],
    "correctIndex": 1,
    "explanation": "Não existe monopolo.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "ímã"
    ],
    "createdAt": "2026-08-05T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-42",
    "subjectId": "fisica",
    "topicId": "fisica-dinamica",
    "statement": "TEXTO: Paraquedista atinge velocidade terminal quando:",
    "options": [
      "Peso maior que arrasto",
      "Peso igual arrasto resultante zero",
      "Só gravidade",
      "Sem ar",
      "Acelera infinito"
    ],
    "correctIndex": 1,
    "explanation": "Terminal peso=arrasto.",
    "difficulty": "medio",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "terminal"
    ],
    "createdAt": "2026-08-15T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-43",
    "subjectId": "fisica",
    "topicId": "fisica-eletromagnetismo",
    "statement": "TEXTO: Dois corpos mesma altura caem vácuo qual chega primeiro?",
    "options": [
      "Mais pesado",
      "Mais leve",
      "Mesmo tempo independe massa",
      "Depende forma no vácuo não",
      "Nenhum cai"
    ],
    "correctIndex": 2,
    "explanation": "Vácuo queda independe massa.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "queda livre"
    ],
    "createdAt": "2026-08-25T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-44",
    "subjectId": "fisica",
    "topicId": "fisica-ondas",
    "statement": "TEXTO: Princípio de Arquimedes empuxo igual a:",
    "options": [
      "Peso corpo",
      "Peso fluido deslocado",
      "Massa corpo",
      "Volume corpo",
      "Densidade corpo"
    ],
    "correctIndex": 1,
    "explanation": "Peso fluido deslocado.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "empuxo"
    ],
    "createdAt": "2026-09-04T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-45",
    "subjectId": "fisica",
    "topicId": "fisica-termodinamica",
    "statement": "TEXTO: Lente convergente objeto além 2f imagem:",
    "options": [
      "Virtual maior",
      "Real invertida menor entre f e2f",
      "No infinito",
      "Virtual menor",
      "Não forma"
    ],
    "correctIndex": 1,
    "explanation": "Além 2f imagem real invertida menor.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "lentes"
    ],
    "createdAt": "2026-09-14T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-46",
    "subjectId": "fisica",
    "topicId": "fisica-cinematica",
    "statement": "TEXTO: Som mais agudo tem:",
    "options": [
      "Maior amplitude",
      "Maior frequência",
      "Menor frequência",
      "Maior velocidade no ar",
      "Menor velocidade"
    ],
    "correctIndex": 1,
    "explanation": "Agudo alta frequência.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "som"
    ],
    "createdAt": "2026-09-24T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-47",
    "subjectId": "fisica",
    "topicId": "fisica-dinamica",
    "statement": "TEXTO: Usina hidrelétrica converte:",
    "options": [
      "Solar em elétrica",
      "Potencial gravitacional água em elétrica",
      "Eólica",
      "Nuclear",
      "Química"
    ],
    "correctIndex": 1,
    "explanation": "Potencial água -> elétrica.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "hidrelétrica"
    ],
    "createdAt": "2026-10-04T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-48",
    "subjectId": "fisica",
    "topicId": "fisica-eletromagnetismo",
    "statement": "TEXTO: Quando gelo derrete a 0°C temperatura fica constante porque energia vai para:",
    "options": [
      "Aquecer ar",
      "Romper ligações fusão calor latente",
      "Aumentar temperatura gelo",
      "Evaporar",
      "Nada"
    ],
    "correctIndex": 1,
    "explanation": "Calor latente fusão.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "fusão"
    ],
    "createdAt": "2026-10-14T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-49",
    "subjectId": "fisica",
    "topicId": "fisica-ondas",
    "statement": "TEXTO: Pressão aumenta com profundidade em líquido P=ρgh. A 10m água ρ1000 g10 pressão manométrica:",
    "options": [
      "1000Pa",
      "10000Pa",
      "100000Pa",
      "10Pa",
      "100Pa"
    ],
    "correctIndex": 2,
    "explanation": "P=1000*10*10=100kPa.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "hidrostática"
    ],
    "createdAt": "2026-10-24T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-fisica-50",
    "subjectId": "fisica",
    "topicId": "fisica-termodinamica",
    "statement": "TEXTO: Espelho plano imagem é:",
    "options": [
      "Real invertida",
      "Virtual mesma tamanho direita-esquerda invertida",
      "Real maior",
      "Virtual menor",
      "No infinito"
    ],
    "correctIndex": 1,
    "explanation": "Virtual mesma tamanho enantiomorfa.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "espelho plano"
    ],
    "createdAt": "2026-11-03T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-1",
    "subjectId": "quimica",
    "topicId": "quimica-funcoes",
    "statement": "TEXTO: Solução aquosa de HCl 0,01 mol/L totalmente dissociado. Qual pH? (pH=-log[H+])",
    "options": [
      "1",
      "2",
      "3",
      "12",
      "11"
    ],
    "correctIndex": 1,
    "explanation": "[H+]=0,01=10⁻² =>pH=2.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "pH",
      "ácido forte"
    ],
    "createdAt": "2025-08-20T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-2",
    "subjectId": "quimica",
    "topicId": "quimica-estequiometria",
    "statement": "TEXTO: Solução NaOH 0,001 mol/L. pOH e pH?",
    "options": [
      "pOH3 pH11",
      "pOH2 pH12",
      "pOH1 pH13",
      "pOH11 pH3",
      "pOH0 pH14"
    ],
    "correctIndex": 0,
    "explanation": "[OH-]=10⁻³ pOH3 pH11.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "pH base"
    ],
    "createdAt": "2025-08-30T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-3",
    "subjectId": "quimica",
    "topicId": "quimica-fisico",
    "statement": "TEXTO: Solução tampão ácido acético 0,1M e acetato 0,1M Ka=1,8×10⁻⁵ pH≈? (Henderson pH=pKa+log[base]/[ácido])",
    "options": [
      "2,7",
      "4,74",
      "7",
      "9",
      "3"
    ],
    "correctIndex": 1,
    "explanation": "pKa≈4,74 log1=0 pH≈4,74.",
    "difficulty": "dificil",
    "source": "UNICAMP 2022 - Inspirada",
    "tags": [
      "tampão"
    ],
    "createdAt": "2025-09-09T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-4",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-1",
    "statement": "TEXTO: Decomposição CaCO3 → CaO + CO2. 100g CaCO3 (100g/mol) produz quantos L CO2 CNTP (22,4L/mol)?",
    "options": [
      "11,2L",
      "22,4L",
      "44,8L",
      "2,24L",
      "100L"
    ],
    "correctIndex": 1,
    "explanation": "1 mol CaCO3 =>1 mol CO2 =>22,4L.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "estequiometria"
    ],
    "createdAt": "2025-09-19T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-5",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-2",
    "statement": "TEXTO: Reação termita Fe2O3+2Al→2Fe+Al2O3. 160g Fe2O3 (160g/mol) com Al suficiente produz Fe (56g/mol) quantos g?",
    "options": [
      "56g",
      "112g",
      "28g",
      "224g",
      "160g"
    ],
    "correctIndex": 1,
    "explanation": "1 mol Fe2O3 =>2 mol Fe =>112g.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "estequiometria"
    ],
    "createdAt": "2025-09-29T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-6",
    "subjectId": "quimica",
    "topicId": "quimica-funcoes",
    "statement": "TEXTO: Gás ideal PV=nRT. 1 mol a 273K 1atm 22,4L. Se T dobra a P constante, V?",
    "options": [
      "11,2L",
      "22,4L",
      "44,8L",
      "0L",
      "273L"
    ],
    "correctIndex": 2,
    "explanation": "V∝T =>dobra.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "gás ideal"
    ],
    "createdAt": "2025-10-09T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-7",
    "subjectId": "quimica",
    "topicId": "quimica-estequiometria",
    "statement": "TEXTO: Mistura gasosa 2 mol O2 e 3 mol N2 total 5 atm. Pressão parcial O2?",
    "options": [
      "2atm",
      "3atm",
      "5atm",
      "0,4atm",
      "2,5atm"
    ],
    "correctIndex": 0,
    "explanation": "Pparcial = fração molar * total =0,4*5=2atm.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "pressão parcial"
    ],
    "createdAt": "2025-10-19T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-8",
    "subjectId": "quimica",
    "topicId": "quimica-fisico",
    "statement": "TEXTO: Reação N2+3H2⇌2NH3 ΔH<0 exotérmica. Aumento de temperatura desloca equilíbrio para:",
    "options": [
      "Mais NH3",
      "Mais N2 e H2 (reagentes) endotérmico",
      "Não desloca",
      "Só catalisador",
      "Mais NH3 sempre"
    ],
    "correctIndex": 1,
    "explanation": "Aumento T favorece endotérmico (reagentes).",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "Le Chatelier"
    ],
    "createdAt": "2025-10-29T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-9",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-1",
    "statement": "TEXTO: Kc= [NH3]²/([N2][H2]³). Se Kc=0,5, [N2]=1, [H2]=1, [NH3] equilíbrio?",
    "options": [
      "√0,5≈0,7",
      "0,5",
      "1",
      "2",
      "0,25"
    ],
    "correctIndex": 0,
    "explanation": "[NH3]²=0,5 =>0,7.",
    "difficulty": "dificil",
    "source": "UNICAMP 2021 - Inspirada",
    "tags": [
      "Kc"
    ],
    "createdAt": "2025-11-08T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-10",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-2",
    "statement": "TEXTO: Cinética: reação 2A→B. Se dobra [A], velocidade quadruplica. Ordem em A?",
    "options": [
      "0",
      "1",
      "2",
      "3",
      "4"
    ],
    "correctIndex": 2,
    "explanation": "v=k[A]^n, dobra quadruplica =>n=2.",
    "difficulty": "medio",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "ordem reação"
    ],
    "createdAt": "2025-11-18T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-11",
    "subjectId": "quimica",
    "topicId": "quimica-funcoes",
    "statement": "TEXTO: Catalisador em reação:",
    "options": [
      "Aumenta ΔH",
      "Diminui energia de ativação, não altera equilíbrio",
      "Consome-se",
      "Diminui Kc",
      "Aumenta reagentes"
    ],
    "correctIndex": 1,
    "explanation": "Catalisador diminui Ea, não altera ΔH nem Kc.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "catalisador"
    ],
    "createdAt": "2025-11-28T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-12",
    "subjectId": "quimica",
    "topicId": "quimica-estequiometria",
    "statement": "TEXTO: Pilha Daniell Zn/Zn²+ // Cu²+/Cu E° Zn -0,76 Cu +0,34 ddp padrão:",
    "options": [
      "-0,42V",
      "1,10V",
      "0,34V",
      "-0,76V",
      "0V"
    ],
    "correctIndex": 1,
    "explanation": "E°cel=Ecátodo-Eânodo=0,34-(-0,76)=1,10V.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "pilha"
    ],
    "createdAt": "2025-12-08T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-13",
    "subjectId": "quimica",
    "topicId": "quimica-fisico",
    "statement": "TEXTO: Eletrólise da água 2H2O→2H2+O2. Quantos mol elétrons para 1 mol H2? (2H+ +2e- →H2)",
    "options": [
      "1",
      "2",
      "4",
      "0,5",
      "3"
    ],
    "correctIndex": 1,
    "explanation": "2e- por H2.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "eletrólise"
    ],
    "createdAt": "2025-12-18T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-14",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-1",
    "statement": "TEXTO: But-2-eno CH3-CH=CH-CH3 isomeria cis/trans ocorre porque:",
    "options": [
      "Rotação livre dupla",
      "Dupla impede rotação, substituintes diferentes",
      "Simples",
      "Não tem isomeria",
      "Só cadeia"
    ],
    "correctIndex": 1,
    "explanation": "Dupla impede rotação, cis/trans.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "isomeria geométrica"
    ],
    "createdAt": "2025-12-28T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-15",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-2",
    "statement": "TEXTO: Benzeno C6H6 ressonância explica:",
    "options": [
      "Ligações simples",
      "Ligações duplas fixas",
      "Deslocalização elétrons, ligações iguais intermediárias",
      "Não aromático",
      "Instável"
    ],
    "correctIndex": 2,
    "explanation": "Ressonância deslocalização.",
    "difficulty": "medio",
    "source": "UNICAMP 2020 - Inspirada",
    "tags": [
      "ressonância"
    ],
    "createdAt": "2026-01-07T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-16",
    "subjectId": "quimica",
    "topicId": "quimica-funcoes",
    "statement": "TEXTO: Reação esterificação ácido carboxílico + álcool → éster + água. Catalisador típico:",
    "options": [
      "Base forte",
      "Ácido sulfúrico concentrado",
      "Água",
      "NaCl",
      "O2"
    ],
    "correctIndex": 1,
    "explanation": "H2SO4 catalisa esterificação.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "esterificação"
    ],
    "createdAt": "2026-01-17T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-17",
    "subjectId": "quimica",
    "topicId": "quimica-estequiometria",
    "statement": "TEXTO: Polimerização do etileno CH2=CH2 → polietileno é de:",
    "options": [
      "Condensação",
      "Adição",
      "Eliminação",
      "Substituição",
      "Neutralização"
    ],
    "correctIndex": 1,
    "explanation": "Adição.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "polímero"
    ],
    "createdAt": "2026-01-27T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-18",
    "subjectId": "quimica",
    "topicId": "quimica-fisico",
    "statement": "TEXTO: Geometria VSEPR: CH4 4 pares ligantes sem livres, geometria:",
    "options": [
      "Linear",
      "Trigonal plana",
      "Tetraédrica 109,5°",
      "Angular",
      "Octaédrica"
    ],
    "correctIndex": 2,
    "explanation": "CH4 tetraédrica.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "VSEPR"
    ],
    "createdAt": "2026-02-06T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-19",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-1",
    "statement": "TEXTO: Hibridização carbono em CH4:",
    "options": [
      "sp",
      "sp2",
      "sp3",
      "sp3d",
      "Não hibridiza"
    ],
    "correctIndex": 2,
    "explanation": "4 sigma sp3.",
    "difficulty": "medio",
    "source": "UNICAMP 2021 - Inspirada",
    "tags": [
      "hibridização"
    ],
    "createdAt": "2026-02-16T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-20",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-2",
    "statement": "TEXTO: Combustão CH4 +2O2→CO2+2H2O ΔH -890kJ/mol. Queima 16g CH4 (16g/mol) libera:",
    "options": [
      "890kJ",
      "445kJ",
      "1780kJ",
      "89kJ",
      "8900kJ"
    ],
    "correctIndex": 0,
    "explanation": "16g=1mol =>890kJ.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "termoquímica"
    ],
    "createdAt": "2026-02-26T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-21",
    "subjectId": "quimica",
    "topicId": "quimica-funcoes",
    "statement": "TEXTO: Lei de Hess: C+O2→CO2 -393kJ, CO+1/2O2→CO2 -283kJ, C+1/2O2→CO ΔH?",
    "options": [
      "-110kJ",
      "-676kJ",
      "110kJ",
      "-393kJ",
      "-283kJ"
    ],
    "correctIndex": 0,
    "explanation": "C→CO2 -393 menos CO→CO2 -283 =>-110kJ.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "Hess"
    ],
    "createdAt": "2026-03-08T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-22",
    "subjectId": "quimica",
    "topicId": "quimica-estequiometria",
    "statement": "TEXTO: Solução 0,5M 200mL diluída para 1L nova molaridade:",
    "options": [
      "0,5M",
      "0,1M",
      "1M",
      "0,05M",
      "2,5M"
    ],
    "correctIndex": 1,
    "explanation": "M1V1=M2V2 =>0,5*0,2=M2*1 =>0,1M.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "diluição"
    ],
    "createdAt": "2026-03-18T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-23",
    "subjectId": "quimica",
    "topicId": "quimica-fisico",
    "statement": "TEXTO: Pressão osmótica π=iMRT. Solução 1M glicose (i=1) 27°C (300K) R0,082 π≈:",
    "options": [
      "24,6atm",
      "0,082atm",
      "1atm",
      "300atm",
      "0,5atm"
    ],
    "correctIndex": 0,
    "explanation": "π=1*1*0,082*300≈24,6atm.",
    "difficulty": "dificil",
    "source": "UNICAMP 2022 - Inspirada",
    "tags": [
      "osmose"
    ],
    "createdAt": "2026-03-28T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-24",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-1",
    "statement": "TEXTO: Meia-vida C-14 5730 anos. Amostra com 25% C-14 original idade:",
    "options": [
      "5730 anos",
      "11460 anos",
      "17190 anos",
      "2865 anos",
      "1000 anos"
    ],
    "correctIndex": 1,
    "explanation": "25%=1/4=2 meias-vidas =>11460.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "meia-vida"
    ],
    "createdAt": "2026-04-07T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-25",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-2",
    "statement": "TEXTO: Decaimento alfa: 238U92 → 234Th90 + alfa (4He2). Partícula alfa é:",
    "options": [
      "Elétron",
      "Núcleo He 2 prótons 2 nêutrons",
      "Próton",
      "Nêutron",
      "Fóton"
    ],
    "correctIndex": 1,
    "explanation": "Alfa núcleo He.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "alfa"
    ],
    "createdAt": "2026-04-17T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-26",
    "subjectId": "quimica",
    "topicId": "quimica-funcoes",
    "statement": "TEXTO: Ácido de Lewis é:",
    "options": [
      "Doa H+",
      "Recebe par elétrons",
      "Doa OH-",
      "Doa elétrons",
      "Sempre base"
    ],
    "correctIndex": 1,
    "explanation": "Lewis ácido receptor par elétrons.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "Lewis"
    ],
    "createdAt": "2026-04-27T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-27",
    "subjectId": "quimica",
    "topicId": "quimica-estequiometria",
    "statement": "TEXTO: Força ácidos HX: HF fraco, HCl forte, HBr forte, HI forte. Tendência:",
    "options": [
      "Aumenta com eletronegatividade",
      "Aumenta descendo grupo, H-I mais forte",
      "Todos iguais",
      "HF forte",
      "HCl fraco"
    ],
    "correctIndex": 1,
    "explanation": "Força aumenta descendo grupo.",
    "difficulty": "medio",
    "source": "UNICAMP 2020 - Inspirada",
    "tags": [
      "força ácida"
    ],
    "createdAt": "2026-05-07T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-28",
    "subjectId": "quimica",
    "topicId": "quimica-fisico",
    "statement": "TEXTO: Ligação metálica: metais conduzem porque:",
    "options": [
      "Elétrons presos",
      "Mar de elétrons livres deslocalizados",
      "Iônica",
      "Covalente",
      "Não conduzem"
    ],
    "correctIndex": 1,
    "explanation": "Mar de elétrons.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "metálica"
    ],
    "createdAt": "2026-05-17T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-29",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-1",
    "statement": "TEXTO: Crioscopia: adição soluto não volátil diminui ponto congelamento. Água 0°C com NaCl congela a:",
    "options": [
      "0°C",
      "<0°C",
      ">0°C",
      "100°C",
      "Não congela"
    ],
    "correctIndex": 1,
    "explanation": "Diminui PF <0°C.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "crioscopia"
    ],
    "createdAt": "2026-05-27T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-30",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-2",
    "statement": "TEXTO: Ebulioscopia: água com sal ferve a:",
    "options": [
      "100°C",
      ">100°C",
      "<100°C",
      "0°C",
      "50°C"
    ],
    "correctIndex": 1,
    "explanation": "Aumenta PE >100°C.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "ebulioscopia"
    ],
    "createdAt": "2026-06-06T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-31",
    "subjectId": "quimica",
    "topicId": "quimica-funcoes",
    "statement": "TEXTO: Isótopos têm mesmo Z diferente A. 12C e 14C são isótopos, diferem em:",
    "options": [
      "Prótons",
      "Nêutrons",
      "Elétrons",
      "Carga",
      "Z"
    ],
    "correctIndex": 1,
    "explanation": "Mesmo Z diferente nêutrons.",
    "difficulty": "facil",
    "source": "ENEM 2018 - Inspirada",
    "tags": [
      "isótopos"
    ],
    "createdAt": "2026-06-16T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-32",
    "subjectId": "quimica",
    "topicId": "quimica-estequiometria",
    "statement": "TEXTO: Reação exotérmica ΔH negativo libera calor. Endotérmica ΔH positivo absorve. Fusão gelo é:",
    "options": [
      "Exotérmica",
      "Endotérmica absorve calor",
      "Sem ΔH",
      "Combustão",
      "Neutralização sempre"
    ],
    "correctIndex": 1,
    "explanation": "Fusão endotérmica.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "exo endo"
    ],
    "createdAt": "2026-06-26T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-33",
    "subjectId": "quimica",
    "topicId": "quimica-fisico",
    "statement": "TEXTO: Número oxidação O em H2O2 peróxido:",
    "options": [
      "-2",
      "-1",
      "0",
      "+1",
      "-0,5"
    ],
    "correctIndex": 1,
    "explanation": "Peróxido O -1.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "NOX"
    ],
    "createdAt": "2026-07-06T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-34",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-1",
    "statement": "TEXTO: Balanceamento: C2H6+O2→CO2+H2O. Coeficientes mínimos inteiros:",
    "options": [
      "2,7,4,6",
      "1,3,2,3",
      "2,7/2,2,3 mas inteiros 2,7,4,6",
      "1,2,2,3",
      "2,3,2,3"
    ],
    "correctIndex": 0,
    "explanation": "C2H6+7/2O2→2CO2+3H2O =>2,7,4,6.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "balanceamento"
    ],
    "createdAt": "2026-07-16T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-35",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-2",
    "statement": "TEXTO: Solubilidade: polar dissolve polar. NaCl polar dissolve em:",
    "options": [
      "Hexano apolar",
      "Água polar",
      "Óleo apolar",
      "Gasolina apolar",
      "Não dissolve"
    ],
    "correctIndex": 1,
    "explanation": "Polar dissolve polar água.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "solubilidade"
    ],
    "createdAt": "2026-07-26T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-36",
    "subjectId": "quimica",
    "topicId": "quimica-funcoes",
    "statement": "TEXTO: Chuva ácida pH<5,6 causada por SO2 e NOx formando H2SO4 e HNO3. Fonte principal SO2:",
    "options": [
      "Queima carvão com enxofre",
      "Fotossíntese",
      "Respiração",
      "Água pura",
      "O2"
    ],
    "correctIndex": 0,
    "explanation": "Queima carvão libera SO2.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "chuva ácida"
    ],
    "createdAt": "2026-08-05T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-37",
    "subjectId": "quimica",
    "topicId": "quimica-estequiometria",
    "statement": "TEXTO: Efeito estufa gases CO2 CH4 N2O. Qual maior potencial aquecimento por molécula mas menor concentração que CO2?",
    "options": [
      "O2",
      "CH4",
      "N2",
      "Ar",
      "He"
    ],
    "correctIndex": 1,
    "explanation": "CH4 potencial ~28x CO2.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "gases estufa"
    ],
    "createdAt": "2026-08-15T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-38",
    "subjectId": "quimica",
    "topicId": "quimica-fisico",
    "statement": "TEXTO: Camada ozônio O3 protege UV. Destruição por CFCs libera Cl que catalisa: Cl+O3→ClO+O2. CFCs eram usados em:",
    "options": [
      "Spray e geladeira",
      "Água",
      "Comida",
      "Roupa",
      "Solo"
    ],
    "correctIndex": 0,
    "explanation": "CFC aerossol refrigeração.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "ozônio"
    ],
    "createdAt": "2026-08-25T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-39",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-1",
    "statement": "TEXTO: pH sangue 7,4 tamponado por H2CO3/HCO3-. Se pH cai acidose, corpo compensa:",
    "options": [
      "Diminui respiração retém CO2",
      "Aumenta respiração elimina CO2 diminui H2CO3",
      "Para de respirar",
      "Aumenta CO2",
      "Nada"
    ],
    "correctIndex": 1,
    "explanation": "Hiperventila elimina CO2 reduz ácido.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "tampão sangue"
    ],
    "createdAt": "2026-09-04T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-40",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-2",
    "statement": "TEXTO: Ligação peptídica entre aminoácidos forma proteína liberando:",
    "options": [
      "CO2",
      "H2O",
      "O2",
      "NH3",
      "H2"
    ],
    "correctIndex": 1,
    "explanation": "Condensação libera água.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "proteína"
    ],
    "createdAt": "2026-09-14T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-41",
    "subjectId": "quimica",
    "topicId": "quimica-funcoes",
    "statement": "TEXTO: Sabão é sal de ácido graxo. Limpa gordura porque tem parte:",
    "options": [
      "Só polar",
      "Só apolar",
      "Polar e apolar (anfifílico) micela",
      "Iônica só",
      "Metálica"
    ],
    "correctIndex": 2,
    "explanation": "Anfifílico forma micela.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "sabão"
    ],
    "createdAt": "2026-09-24T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-42",
    "subjectId": "quimica",
    "topicId": "quimica-estequiometria",
    "statement": "TEXTO: Número Avogadro 6×10²³. 2 mol H2O tem moléculas:",
    "options": [
      "6×10²³",
      "12×10²³",
      "3×10²³",
      "1×10²³",
      "2"
    ],
    "correctIndex": 1,
    "explanation": "2*Avogadro.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "mol"
    ],
    "createdAt": "2026-10-04T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-43",
    "subjectId": "quimica",
    "topicId": "quimica-fisico",
    "statement": "TEXTO: Densidade água 1g/mL. 500mL tem massa:",
    "options": [
      "500g",
      "1g",
      "1000g",
      "0,5g",
      "50g"
    ],
    "correctIndex": 0,
    "explanation": "d=m/V =>500g.",
    "difficulty": "facil",
    "source": "ENEM 2018 - Inspirada",
    "tags": [
      "densidade"
    ],
    "createdAt": "2026-10-14T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-44",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-1",
    "statement": "TEXTO: Reação ácido + base → sal + água é:",
    "options": [
      "Síntese",
      "Decomposição",
      "Neutralização",
      "Deslocamento",
      "Combustão"
    ],
    "correctIndex": 2,
    "explanation": "Neutralização.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "neutralização"
    ],
    "createdAt": "2026-10-24T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-45",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-2",
    "statement": "TEXTO: Em pilha, ânodo onde ocorre oxidação. Cátodo redução. Elétrons fluem:",
    "options": [
      "Cátodo para ânodo",
      "Ânodo para cátodo",
      "Não fluem",
      "Ambos para solução",
      "Ficam parados"
    ],
    "correctIndex": 1,
    "explanation": "Ânodo oxida libera e- para cátodo.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "pilha fluxo"
    ],
    "createdAt": "2026-11-03T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-46",
    "subjectId": "quimica",
    "topicId": "quimica-funcoes",
    "statement": "TEXTO: Ferro enferruja Fe→Fe2O3. É oxidação porque Fe perde elétrons, NOX aumenta 0 para +3. Agente oxidante é:",
    "options": [
      "Fe",
      "O2 que ganha elétrons",
      "H2O",
      "Fe2O3",
      "Nenhum"
    ],
    "correctIndex": 1,
    "explanation": "O2 oxidante ganha e-.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "oxidação"
    ],
    "createdAt": "2026-11-13T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-47",
    "subjectId": "quimica",
    "topicId": "quimica-estequiometria",
    "statement": "TEXTO: Álcool etílico CH3CH2OH grupo funcional:",
    "options": [
      "Ácido",
      "Hidroxila -OH ligada a carbono saturado",
      "Cetona",
      "Aldeído",
      "Éter"
    ],
    "correctIndex": 1,
    "explanation": "OH em carbono saturado álcool.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "álcool"
    ],
    "createdAt": "2026-11-23T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-48",
    "subjectId": "quimica",
    "topicId": "quimica-fisico",
    "statement": "TEXTO: Ácido acético CH3COOH grupo:",
    "options": [
      "Álcool",
      "Carboxila -COOH",
      "Cetona",
      "Amina",
      "Éter"
    ],
    "correctIndex": 1,
    "explanation": "COOH carboxila.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "ácido carboxílico"
    ],
    "createdAt": "2026-12-03T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-49",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-1",
    "statement": "TEXTO: Glicose C6H12O6 isomeria com frutose C6H12O6 é:",
    "options": [
      "Cadeia",
      "Função",
      "Posição",
      "Geométrica",
      "Óptica também mas principal função"
    ],
    "correctIndex": 1,
    "explanation": "Isômeros funcionais (aldose/cetose).",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "isomeria"
    ],
    "createdAt": "2026-12-13T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-quimica-50",
    "subjectId": "quimica",
    "topicId": "quimica-organtica-2",
    "statement": "TEXTO: Massa molar H2SO4 (H1 S32 O16):",
    "options": [
      "49g/mol",
      "98g/mol",
      "32g/mol",
      "100g/mol",
      "50g/mol"
    ],
    "correctIndex": 1,
    "explanation": "2+32+64=98.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "massa molar"
    ],
    "createdAt": "2026-12-23T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-1",
    "subjectId": "biologia",
    "topicId": "biologia-citologia",
    "statement": "TEXTO: O operon lac em E. coli é induzido por lactose. Sem lactose, repressor liga operador bloqueia transcrição. Com lactose, repressor inativado, transcrição ocorre. Isso é regulação:",
    "options": [
      "Positiva por ativador",
      "Negativa induzível",
      "Negativa reprimível",
      "Sem regulação",
      "Eucariótica"
    ],
    "correctIndex": 1,
    "explanation": "Operon lac regulação negativa induzível: repressor ativo sem indutor.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "operon",
      "regulação gênica"
    ],
    "createdAt": "2025-10-09T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-2",
    "subjectId": "biologia",
    "topicId": "biologia-genetica",
    "statement": "TEXTO: Ciclo celular: célula humana 46 cromossomos em G1. Após fase S (síntese DNA), quantos cromossomos e cromátides? (cromossomo conta centrômero)",
    "options": [
      "46 cromossomos 46 cromátides",
      "46 cromossomos 92 cromátides",
      "92 cromossomos 92 cromátides",
      "23 cromossomos 46 cromátides",
      "46 cromossomos 23 cromátides"
    ],
    "correctIndex": 1,
    "explanation": "Após S, ainda 46 cromossomos (centrômeros) mas 92 cromátides irmãs.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "ciclo celular",
      "cromátides"
    ],
    "createdAt": "2025-10-19T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-3",
    "subjectId": "biologia",
    "topicId": "biologia-ecologia",
    "statement": "TEXTO: Vacina de mRNA COVID entrega mRNA que codifica spike. Célula produz spike, apresenta via MHC I, ativa linfócitos T citotóxicos e B. Por que não altera DNA?",
    "options": [
      "mRNA entra núcleo e integra",
      "mRNA fica citoplasma, não entra núcleo, degradado, não integra genoma",
      "DNA é RNA",
      "Vacina tem DNA",
      "Integra sempre"
    ],
    "correctIndex": 1,
    "explanation": "mRNA citoplasma traduzido e degradado, não integra DNA.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "vacina mRNA",
      "imunologia"
    ],
    "createdAt": "2025-10-29T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-4",
    "subjectId": "biologia",
    "topicId": "biologia-evolucao",
    "statement": "TEXTO: Fotossíntese fase clara tilacoide produz ATP e NADPH; fase escura estroma ciclo Calvin fixa CO2 usando ATP/NADPH. Se falta luz, o que para primeiro?",
    "options": [
      "Calvin para depois porque depende ATP/NADPH da clara",
      "Clara para primeiro pois depende luz direta, Calvin usa produtos e para em seguida",
      "Ambas independentes",
      "Só Calvin precisa luz",
      "Nenhuma para"
    ],
    "correctIndex": 1,
    "explanation": "Fase clara depende luz, para primeiro, Calvin para por falta ATP/NADPH.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "fotossíntese"
    ],
    "createdAt": "2025-11-08T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-5",
    "subjectId": "biologia",
    "topicId": "biologia-fisiologia",
    "statement": "TEXTO: Código genético degenerado: 61 códons codificam 20 aminoácidos, vários códons mesmo aminoácido. Vantagem evolutiva:",
    "options": [
      "Aumenta mutações letais",
      "Reduz efeito mutações silenciosas, proteína igual",
      "Diminui aminoácidos",
      "Não tem vantagem",
      "Aumenta erros"
    ],
    "correctIndex": 1,
    "explanation": "Degeneração permite mutação silenciosa sem alterar proteína.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "código genético"
    ],
    "createdAt": "2025-11-18T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-6",
    "subjectId": "biologia",
    "topicId": "biologia-citologia",
    "statement": "TEXTO: Eutrofização: excesso nutrientes N e P causa proliferação algas, algas morrem, decompositores consomem O2, peixes morrem por hipoxia. Causa antrópica:",
    "options": [
      "Pesca",
      "Esgoto e fertilizantes agrícolas",
      "Vento",
      "Chuva ácida só",
      "Maré"
    ],
    "correctIndex": 1,
    "explanation": "Esgoto e fertilizantes levam N,P.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "eutrofização"
    ],
    "createdAt": "2025-11-28T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-7",
    "subjectId": "biologia",
    "topicId": "biologia-genetica",
    "statement": "TEXTO: Sucessão ecológica primária começa em rocha nua com liquens (pioneiros) que formam solo. Secundária começa com solo já formado. Diferença principal:",
    "options": [
      "Primária mais rápida",
      "Primária começa sem solo, lenta; secundária com solo, mais rápida",
      "Ambas iguais",
      "Primária sem pioneiros",
      "Secundária sem solo"
    ],
    "correctIndex": 1,
    "explanation": "Primária sem solo lenta, secundária com solo rápida.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "sucessão"
    ],
    "createdAt": "2025-12-08T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-8",
    "subjectId": "biologia",
    "topicId": "biologia-ecologia",
    "statement": "TEXTO: Lactase persiste em adultos europeus mutação regulatória gene LCT. É exemplo de:",
    "options": [
      "Deriva genética",
      "Seleção natural recente, vantagem digerir leite",
      "Mutação neutra",
      "Fluxo gênico só",
      "Efeito fundador"
    ],
    "correctIndex": 1,
    "explanation": "Seleção positiva para digerir leite.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "evolução humana",
      "seleção"
    ],
    "createdAt": "2025-12-18T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-9",
    "subjectId": "biologia",
    "topicId": "biologia-evolucao",
    "statement": "TEXTO: Clonagem Dolly transferência núcleo somático para óvulo anucleado. Clone geneticamente:",
    "options": [
      "Igual doadora óvulo",
      "Igual doadora núcleo somático, exceto mitocôndria óvulo",
      "Igual pai",
      "Diferente todos",
      "Igual 50% cada"
    ],
    "correctIndex": 1,
    "explanation": "Nuclear igual doadora núcleo, mitocondrial do óvulo.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "clonagem"
    ],
    "createdAt": "2025-12-28T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-10",
    "subjectId": "biologia",
    "topicId": "biologia-fisiologia",
    "statement": "TEXTO: Terapia gênica ex vivo: retira células paciente, corrige gene in vitro, reimplanta. Vantagem vs in vivo:",
    "options": [
      "Mais arriscado",
      "Controla correção fora, seleciona células corrigidas",
      "Não funciona",
      "Sempre in vivo melhor",
      "Não precisa vetor"
    ],
    "correctIndex": 1,
    "explanation": "Ex vivo controla e seleciona.",
    "difficulty": "dificil",
    "source": "UNICAMP 2022 - Inspirada",
    "tags": [
      "terapia gênica"
    ],
    "createdAt": "2026-01-07T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-11",
    "subjectId": "biologia",
    "topicId": "biologia-citologia",
    "statement": "TEXTO: Crossing over prófase I troca pedaços cromátides homólogas aumenta variabilidade porque:",
    "options": [
      "Cria cromossomos idênticos",
      "Recombina alelos maternos e paternos",
      "Diminui variabilidade",
      "Não afeta",
      "Só mutação"
    ],
    "correctIndex": 1,
    "explanation": "Recombinação alelos.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "crossing over"
    ],
    "createdAt": "2026-01-17T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-12",
    "subjectId": "biologia",
    "topicId": "biologia-genetica",
    "statement": "TEXTO: Deriva genética efeito mais forte em:",
    "options": [
      "Populações grandes",
      "Populações pequenas, alelos fixam/perdem ao acaso",
      "Só seleção",
      "Só mutação",
      "Infinitas"
    ],
    "correctIndex": 1,
    "explanation": "Pequenas deriva forte.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "deriva"
    ],
    "createdAt": "2026-01-27T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-13",
    "subjectId": "biologia",
    "topicId": "biologia-ecologia",
    "statement": "TEXTO: Mimetismo batesiano: espécie inofensiva imita venenosa para evitar predação. Exemplo:",
    "options": [
      "Coral verdadeira venenosa imita falsa",
      "Falsa coral inofensiva imita coral venenosa",
      "Camuflagem folha",
      "Aposematismo",
      "Mülleriano"
    ],
    "correctIndex": 1,
    "explanation": "Batesiano inofensiva imita venenosa.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "mimetismo"
    ],
    "createdAt": "2026-02-06T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-14",
    "subjectId": "biologia",
    "topicId": "biologia-evolucao",
    "statement": "TEXTO: Competição intraespecífica mais intensa quando:",
    "options": [
      "Recursos abundantes",
      "Recursos escassos, nicho igual",
      "Espécies diferentes",
      "Sem recursos",
      "Nunca intensa"
    ],
    "correctIndex": 1,
    "explanation": "Mesma espécie nicho idêntico escasso.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "competição"
    ],
    "createdAt": "2026-02-16T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-15",
    "subjectId": "biologia",
    "topicId": "biologia-fisiologia",
    "statement": "TEXTO: Curva crescimento logístico tem fase lag, log, estacionária (K). K é:",
    "options": [
      "Taxa natalidade",
      "Capacidade suporte ambiente",
      "Mortalidade",
      "Migração",
      "Nicho"
    ],
    "correctIndex": 1,
    "explanation": "K capacidade suporte.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "logístico"
    ],
    "createdAt": "2026-02-26T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-16",
    "subjectId": "biologia",
    "topicId": "biologia-citologia",
    "statement": "TEXTO: Bioluminescência vaga-lumes serve para:",
    "options": [
      "Fotossíntese",
      "Atrair parceiro sexual e presa, comunicação",
      "Respirar",
      "Comer",
      "Defesa só"
    ],
    "correctIndex": 1,
    "explanation": "Comunicação sexual.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "bioluminescência"
    ],
    "createdAt": "2026-03-08T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-17",
    "subjectId": "biologia",
    "topicId": "biologia-genetica",
    "statement": "TEXTO: Dormência sementes quebrada por estratificação fria, fogo, escarificação. Vantagem ecológica:",
    "options": [
      "Germinar em condição desfavorável",
      "Germinar em condição favorável após distúrbio",
      "Nunca germinar",
      "Morrer",
      "Sem vantagem"
    ],
    "correctIndex": 1,
    "explanation": "Garante germinação favorável.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "dormência"
    ],
    "createdAt": "2026-03-18T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-18",
    "subjectId": "biologia",
    "topicId": "biologia-ecologia",
    "statement": "TEXTO: Polinização cruzada vs autopolinização. Cruzada vantajosa porque:",
    "options": [
      "Menos variabilidade",
      "Mais variabilidade genética, evita depressão endogâmica",
      "Mais rápida",
      "Sem polinizador",
      "Sempre pior"
    ],
    "correctIndex": 1,
    "explanation": "Variabilidade.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "polinização"
    ],
    "createdAt": "2026-03-28T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-19",
    "subjectId": "biologia",
    "topicId": "biologia-evolucao",
    "statement": "TEXTO: Fixação nitrogênio bactérias Rhizobium convertem N2 em:",
    "options": [
      "O2",
      "NH3 amônia",
      "CO2",
      "H2O",
      "NO2"
    ],
    "correctIndex": 1,
    "explanation": "N2→NH3.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "nitrogênio"
    ],
    "createdAt": "2026-04-07T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-20",
    "subjectId": "biologia",
    "topicId": "biologia-fisiologia",
    "statement": "TEXTO: Osmose água de meio hipotônico para hipertônico? Na verdade água vai do menor soluto para maior soluto. Célula em meio hipotônico:",
    "options": [
      "Murcha",
      "Incha pode lisar",
      "Nada",
      "Plasmólise",
      "Crenação"
    ],
    "correctIndex": 1,
    "explanation": "Hipotônico entra água incha.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "osmose"
    ],
    "createdAt": "2026-04-17T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-21",
    "subjectId": "biologia",
    "topicId": "biologia-citologia",
    "statement": "TEXTO: Plasmólise célula vegetal meio hipertônico perde água membrana descola parede. Fenômeno:",
    "options": [
      "Turgidez",
      "Plasmólise",
      "Lise",
      "Crenação animal",
      "Deplasmólise"
    ],
    "correctIndex": 1,
    "explanation": "Plasmólise.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "plasmólise"
    ],
    "createdAt": "2026-04-27T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-22",
    "subjectId": "biologia",
    "topicId": "biologia-genetica",
    "statement": "TEXTO: Quimiosmose mitocôndria: cadeia transporta elétrons bombeia H+ para espaço intermembrana, gradiente volta via ATP sintase produz:",
    "options": [
      "Glicose",
      "ATP",
      "O2",
      "CO2",
      "NADH"
    ],
    "correctIndex": 1,
    "explanation": "ATP.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "quimiosmose"
    ],
    "createdAt": "2026-05-07T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-23",
    "subjectId": "biologia",
    "topicId": "biologia-ecologia",
    "statement": "TEXTO: Fermentação lática músculo sem O2 piruvato→lactato regenera NAD+. Causa dor?",
    "options": [
      "Lactato causa dor direto",
      "Acidose e microlesões, lactato reciclado fígado",
      "Sem efeito",
      "Só O2",
      "Sempre bom"
    ],
    "correctIndex": 1,
    "explanation": "Dor acidose microlesões, lactato reciclado.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "fermentação"
    ],
    "createdAt": "2026-05-17T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-24",
    "subjectId": "biologia",
    "topicId": "biologia-evolucao",
    "statement": "TEXTO: Anemia falciforme mutação Glu→Val hemoglobina HbS polimeriza baixa O2. Exemplo de:",
    "options": [
      "Mutação silenciosa",
      "Mutação pontual com efeito estrutural pleiotrópico",
      "Sem efeito",
      "Cromossômica",
      "Numérica"
    ],
    "correctIndex": 1,
    "explanation": "Pontual pleiotrópica.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "falciforme"
    ],
    "createdAt": "2026-05-27T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-25",
    "subjectId": "biologia",
    "topicId": "biologia-fisiologia",
    "statement": "TEXTO: Fibrose cística mutação CFTR canal Cl- afeta principalmente:",
    "options": [
      "Só cérebro",
      "Pulmões e pâncreas muco espesso",
      "Só coração",
      "Só rim",
      "Só pele"
    ],
    "correctIndex": 1,
    "explanation": "Muco espesso pulmões pâncreas.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "fibrose"
    ],
    "createdAt": "2026-06-06T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-26",
    "subjectId": "biologia",
    "topicId": "biologia-citologia",
    "statement": "TEXTO: Distrofia Duchenne ligada X recessiva. Mãe portadora X^D X^d pai normal X^D Y chance filho afetado:",
    "options": [
      "0%",
      "25% filhos 50% meninos afetados",
      "50% todos",
      "100%",
      "0% meninas afetadas mas 50% portadoras"
    ],
    "correctIndex": 1,
    "explanation": "50% meninos afetados (25% total).",
    "difficulty": "dificil",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "ligada X"
    ],
    "createdAt": "2026-06-16T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-27",
    "subjectId": "biologia",
    "topicId": "biologia-genetica",
    "statement": "TEXTO: Síndrome Turner 45,X (monossomia X) fenótipo:",
    "options": [
      "Homem alto",
      "Mulher baixa, disgenesia gonadal, pescoço alado",
      "Super fêmea",
      "Homem infértil alto",
      "Normal"
    ],
    "correctIndex": 1,
    "explanation": "Turner mulher 45,X.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "Turner"
    ],
    "createdAt": "2026-06-26T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-28",
    "subjectId": "biologia",
    "topicId": "biologia-ecologia",
    "statement": "TEXTO: Trissomia 18 Edwards:",
    "options": [
      "Viável leve",
      "Grave retardo, malformações, baixa sobrevida",
      "Só alta estatura",
      "Normal",
      "Só infertilidade"
    ],
    "correctIndex": 1,
    "explanation": "Edwards grave.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "Edwards"
    ],
    "createdAt": "2026-07-06T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-29",
    "subjectId": "biologia",
    "topicId": "biologia-evolucao",
    "statement": "TEXTO: Herança mitocondrial vem:",
    "options": [
      "Pai",
      "Mãe citoplasma óvulo",
      "Ambos",
      "Núcleo",
      "Acaso"
    ],
    "correctIndex": 1,
    "explanation": "Mitocôndria materna.",
    "difficulty": "facil",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "mitocondrial"
    ],
    "createdAt": "2026-07-16T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-30",
    "subjectId": "biologia",
    "topicId": "biologia-fisiologia",
    "statement": "TEXTO: Sistema nervoso simpático luta/fuga libera adrenalina:",
    "options": [
      "Diminui coração",
      "Aumenta coração, dilata pupila, inibe digestão",
      "Contrai pupila",
      "Estimula digestão",
      "Calmo"
    ],
    "correctIndex": 1,
    "explanation": "Simpático luta/fuga.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "simpático"
    ],
    "createdAt": "2026-07-26T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-31",
    "subjectId": "biologia",
    "topicId": "biologia-citologia",
    "statement": "TEXTO: Parassimpático repouso/digestão:",
    "options": [
      "Luta/fuga",
      "Repouso diminui coração contrai pupila estimula digestão",
      "Aumenta coração",
      "Inibe digestão",
      "Dilata pupila"
    ],
    "correctIndex": 1,
    "explanation": "Parassimpático repouso.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "parassimpático"
    ],
    "createdAt": "2026-08-05T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-32",
    "subjectId": "biologia",
    "topicId": "biologia-genetica",
    "statement": "TEXTO: Sinapse química usa:",
    "options": [
      "Elétrons diretos",
      "Neurotransmissores fenda sináptica",
      "Só elétrica",
      "Hormônios sangue",
      "Nada"
    ],
    "correctIndex": 1,
    "explanation": "Neurotransmissores.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "sinapse"
    ],
    "createdAt": "2026-08-15T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-33",
    "subjectId": "biologia",
    "topicId": "biologia-ecologia",
    "statement": "TEXTO: Potencial ação: despolarização Na+ entra, repolarização K+ sai. Período refratário:",
    "options": [
      "Não existe",
      "Impede novo potencial imediato, garante unidirecional",
      "Acelera",
      "Só em músculo",
      "Inverte"
    ],
    "correctIndex": 1,
    "explanation": "Refratário impede.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "potencial ação"
    ],
    "createdAt": "2026-08-25T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-34",
    "subjectId": "biologia",
    "topicId": "biologia-evolucao",
    "statement": "TEXTO: Contração muscular: Ca2+ libera, miosina liga actina, precisa ATP para:",
    "options": [
      "Ligar actina",
      "Desligar miosina e bombear Ca2+",
      "Só ligar",
      "Não precisa ATP",
      "Só relaxar sem ATP"
    ],
    "correctIndex": 1,
    "explanation": "ATP desliga e bombeia Ca.",
    "difficulty": "dificil",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "contração"
    ],
    "createdAt": "2026-09-04T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-35",
    "subjectId": "biologia",
    "topicId": "biologia-fisiologia",
    "statement": "TEXTO: Coagulação precisa cascata fatores, vitamina K, Ca2+, fibrinogênio→fibrina. Hemofilia falta fator:",
    "options": [
      "Plaquetas só",
      "Fator VIII ou IX coagulação",
      "Hemácias",
      "Leucócitos",
      "Ferro"
    ],
    "correctIndex": 1,
    "explanation": "VIII/IX.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "coagulação"
    ],
    "createdAt": "2026-09-14T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-36",
    "subjectId": "biologia",
    "topicId": "biologia-citologia",
    "statement": "TEXTO: Hemofilia ligada X recessiva. Homem hemofílico X^h Y casa mulher normal X^H X^H filhas:",
    "options": [
      "Todas hemofílicas",
      "Todas portadoras X^H X^h normais",
      "Todas normais não portadoras",
      "50% hemofílicas",
      "Nenhuma"
    ],
    "correctIndex": 1,
    "explanation": "Filhas X^H X^h portadoras normais.",
    "difficulty": "dificil",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "hemofilia"
    ],
    "createdAt": "2026-09-24T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-37",
    "subjectId": "biologia",
    "topicId": "biologia-genetica",
    "statement": "TEXTO: Sistema ABO alelos IA IB i. IA e IB codominantes, i recessivo. Genótipo IA i fenótipo:",
    "options": [
      "A",
      "B",
      "AB",
      "O",
      "ABO"
    ],
    "correctIndex": 0,
    "explanation": "IA i =>A.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "ABO"
    ],
    "createdAt": "2026-10-04T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-38",
    "subjectId": "biologia",
    "topicId": "biologia-ecologia",
    "statement": "TEXTO: Eritroblastose fetal: mãe Rh- filho Rh+ segunda gestação anticorpos anti-Rh atravessam placenta destroem hemácias. Prevenção:",
    "options": [
      "Transfusão fetal",
      "Soro anti-Rh (Rogam) após parto para mãe não sensibilizar",
      "Aborto",
      "Nada",
      "Vacina Rh+"
    ],
    "correctIndex": 1,
    "explanation": "Rogam anti-D.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "eritroblastose"
    ],
    "createdAt": "2026-10-14T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-39",
    "subjectId": "biologia",
    "topicId": "biologia-evolucao",
    "statement": "TEXTO: Seleção sexual Darwin: pavão cauda grande atrai fêmea mas custo predação. É seleção:",
    "options": [
      "Natural só sobrevivência",
      "Sexual por escolha parceiro",
      "Artificial",
      "Deriva",
      "Sem seleção"
    ],
    "correctIndex": 1,
    "explanation": "Sexual.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "seleção sexual"
    ],
    "createdAt": "2026-10-24T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-40",
    "subjectId": "biologia",
    "topicId": "biologia-fisiologia",
    "statement": "TEXTO: Coevolução: planta e polinizador evoluem juntos. Orquídea e mariposa probóscide longa:",
    "options": [
      "Evolução independente",
      "Coevolução mutualística",
      "Competição",
      "Predação",
      "Sem relação"
    ],
    "correctIndex": 1,
    "explanation": "Coevolução.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "coevolução"
    ],
    "createdAt": "2026-11-03T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-41",
    "subjectId": "biologia",
    "topicId": "biologia-citologia",
    "statement": "TEXTO: Especiação alopátrica ocorre por:",
    "options": [
      "Mesmo local sem barreira",
      "Barreira geográfica isolando populações",
      "Poliploidia instantânea",
      "Só mutação",
      "Sem isolamento"
    ],
    "correctIndex": 1,
    "explanation": "Barreira geográfica.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "alopátrica"
    ],
    "createdAt": "2026-11-13T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-42",
    "subjectId": "biologia",
    "topicId": "biologia-genetica",
    "statement": "TEXTO: Radiação adaptativa: tentilhões Galápagos bicos diferentes adaptados sementes diferentes a partir ancestral comum:",
    "options": [
      "Convergência",
      "Divergência adaptativa rápida",
      "Coevolução",
      "Extinção",
      "Sem evolução"
    ],
    "correctIndex": 1,
    "explanation": "Radiação adaptativa divergente.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "radiação adaptativa"
    ],
    "createdAt": "2026-11-23T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-43",
    "subjectId": "biologia",
    "topicId": "biologia-ecologia",
    "statement": "TEXTO: Mimetismo mülleriano: duas espécies venenosas se imitam reforçam aprendizado predador. Diferença batesiano:",
    "options": [
      "Batesiano ambas venenosas",
      "Mülleriano ambas venenosas batesiano só uma",
      "Iguais",
      "Batesiano sem mimetismo",
      "Mülleriano inofensivo"
    ],
    "correctIndex": 1,
    "explanation": "Mülleriano ambas venenosas.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "mülleriano"
    ],
    "createdAt": "2026-12-03T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-44",
    "subjectId": "biologia",
    "topicId": "biologia-evolucao",
    "statement": "TEXTO: Predação mantém equilíbrio, remove indivíduos doentes, controla população presa. Sem predadores presa:",
    "options": [
      "Diminui",
      "Cresce descontrolado depois colapsa por falta recurso",
      "Fica estável",
      "Extingue predador mas presa estável",
      "Nada"
    ],
    "correctIndex": 1,
    "explanation": "Cresce colapsa.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "predação"
    ],
    "createdAt": "2026-12-13T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-45",
    "subjectId": "biologia",
    "topicId": "biologia-fisiologia",
    "statement": "TEXTO: Mutualismo abelhas e flores: abelha alimento néctar, flor polinização. Tipo interação:",
    "options": [
      "Desarmônica -/-",
      "Harmônica +/+ interespecífica",
      "Intraespecífica",
      "Competição",
      "Parasitismo"
    ],
    "correctIndex": 1,
    "explanation": "Mutualismo +/+.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "mutualismo"
    ],
    "createdAt": "2026-12-23T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-46",
    "subjectId": "biologia",
    "topicId": "biologia-citologia",
    "statement": "TEXTO: Comensalismo: rêmora e tubarão rêmora ganha transporte e restos, tubarão não ganha nem perde. É:",
    "options": [
      "+ / -",
      "+ / 0",
      "- / -",
      "+ / +",
      "0/0"
    ],
    "correctIndex": 1,
    "explanation": "+/0.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "comensalismo"
    ],
    "createdAt": "2027-01-02T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-47",
    "subjectId": "biologia",
    "topicId": "biologia-genetica",
    "statement": "TEXTO: Parasitismo: carrapato e boi carrapato ganha sangue boi perde. É:",
    "options": [
      "+ / +",
      "+ / -",
      "- / -",
      "+ /0",
      "0/0"
    ],
    "correctIndex": 1,
    "explanation": "+/-.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "parasitismo"
    ],
    "createdAt": "2027-01-12T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-48",
    "subjectId": "biologia",
    "topicId": "biologia-ecologia",
    "statement": "TEXTO: Amensalismo (antibiose): fungo Penicillium produz penicilina mata bactéria, fungo não afetado. É:",
    "options": [
      "+ / -",
      "0 / -",
      "- / -",
      "+ / +",
      "+/0"
    ],
    "correctIndex": 1,
    "explanation": "0/-.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "amensalismo"
    ],
    "createdAt": "2027-01-22T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-49",
    "subjectId": "biologia",
    "topicId": "biologia-evolucao",
    "statement": "TEXTO: Protocooperação: anu e gado anu come carrapatos gado, ambos ganham mas podem viver separados. Diferença mutualismo obrigatório:",
    "options": [
      "Igual mutualismo",
      "Protocooperação facultativa pode viver separado, mutualismo obrigatório não",
      "Protocooperação prejudica",
      "Mutualismo facultativo",
      "Não existe"
    ],
    "correctIndex": 1,
    "explanation": "Protocooperação facultativa.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "protocooperação"
    ],
    "createdAt": "2027-02-01T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-biologia-50",
    "subjectId": "biologia",
    "topicId": "biologia-fisiologia",
    "statement": "TEXTO: Hormônio antidiurético ADH produzido hipotálamo liberado neuro-hipófise aumenta reabsorção água rins. Falta ADH causa:",
    "options": [
      "Diabetes mellitus",
      "Diabetes insipidus poliúria",
      "Hipertensão",
      "Nenhum",
      "Edema"
    ],
    "correctIndex": 1,
    "explanation": "Insipidus muita urina.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "ADH"
    ],
    "createdAt": "2027-02-11T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-historia-1",
    "subjectId": "historia",
    "topicId": "historia-idade-media",
    "statement": "TEXTO: 'A história dos hunos, que nos chegou através de romanos, os descreve como bárbaros. Mas arqueologia mostra sociedade complexa.' Essa crítica historiográfica sobre fonte romana indica:",
    "options": [
      "Fonte romana neutra",
      "Fonte romana etnocêntrica, deve ser cruzada com arqueologia",
      "Hunos não existiram",
      "Só romanos confiáveis",
      "Arqueologia inútil"
    ],
    "correctIndex": 1,
    "explanation": "Fonte romana etnocêntrica, precisa crítica e cruzamento.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "historiografia",
      "fonte"
    ],
    "createdAt": "2025-11-28T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-historia-2",
    "subjectId": "historia",
    "topicId": "historia-revolucao-francesa",
    "statement": "TEXTO: Feudalismo: suserania e vassalagem, benefício (feudo) em troca de fidelidade e auxílio militar. Relação baseada em:",
    "options": [
      "Dinheiro e salário",
      "Terra e laços pessoais de fidelidade",
      "Escravidão",
      "Capitalismo",
      "Estado central forte"
    ],
    "correctIndex": 1,
    "explanation": "Terra e fidelidade pessoal.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "feudalismo"
    ],
    "createdAt": "2025-12-08T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-historia-3",
    "subjectId": "historia",
    "topicId": "historia-brasil-colonia",
    "statement": "TEXTO: Reforma Protestante 1517 Lutero 95 teses critica venda indulgências. Contexto: crise Igreja, humanismo, imprensa. Consequência:",
    "options": [
      "Fortalecimento só catolicismo",
      "Ruptura cristandade, guerras religiosas, Contrarreforma",
      "Fim cristianismo",
      "União Igreja Estado",
      "Sem impacto"
    ],
    "correctIndex": 1,
    "explanation": "Ruptura e Contrarreforma.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "reforma"
    ],
    "createdAt": "2025-12-18T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-historia-4",
    "subjectId": "historia",
    "topicId": "historia-segundo-reinado",
    "statement": "TEXTO: Revolução Francesa 1789: Terceiro Estado (burguesia, povo) contra privilégios clero e nobreza, crise financeira. Queda Bastilha símbolo:",
    "options": [
      "Fim escravidão",
      "Fim Antigo Regime absolutista",
      "Independência EUA",
      "Reforma protestante",
      "Unificação Alemanha"
    ],
    "correctIndex": 1,
    "explanation": "Queda Bastilha fim Antigo Regime.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "revolução francesa"
    ],
    "createdAt": "2025-12-28T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-historia-5",
    "subjectId": "historia",
    "topicId": "historia-brasil-republica",
    "statement": "TEXTO: Napoleão Código Civil 1804 consolida igualdade jurídica, propriedade privada, fim feudalismo, mas autoritarismo. Representa:",
    "options": [
      "Volta feudalismo",
      "Ideais burgueses revolucionários com ordem autoritária",
      "Socialismo",
      "Anarquismo",
      "Monarquia absolutista"
    ],
    "correctIndex": 1,
    "explanation": "Burguês com autoritarismo.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "napoleão"
    ],
    "createdAt": "2026-01-07T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-historia-6",
    "subjectId": "historia",
    "topicId": "historia-idade-media",
    "statement": "TEXTO: Independência Brasil 1822: D. Pedro I, elite agrária mantém escravidão e latifúndio, evita ruptura social. Diferente independências hispânicas fragmentadas, Brasil mantém unidade territorial por:",
    "options": [
      "Guerra popular",
      "Monarquia como fator unidade e elite centralizadora",
      "Intervenção inglesa militar",
      "Sem elite",
      "Socialismo"
    ],
    "correctIndex": 1,
    "explanation": "Monarquia unidade.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "independência"
    ],
    "createdAt": "2026-01-17T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-historia-7",
    "subjectId": "historia",
    "topicId": "historia-revolucao-francesa",
    "statement": "TEXTO: Segundo Reinado (1840-1889) parlamentarismo às avessas: Poder Moderador D. Pedro II nomeia presidente Conselho. Significa:",
    "options": [
      "Parlamentarismo clássico inglês",
      "Imperador controla, inverte lógica: executivo cria legislativo",
      "República",
      "Ditadura militar",
      "Democracia direta"
    ],
    "correctIndex": 1,
    "explanation": "Às avessas imperador controla.",
    "difficulty": "dificil",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "segundo reinado"
    ],
    "createdAt": "2026-01-27T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-historia-8",
    "subjectId": "historia",
    "topicId": "historia-brasil-colonia",
    "statement": "TEXTO: Lei Áurea 1888 abole escravidão sem indenização nem reforma agrária. Ex-escravizados sem terra, educação, trabalho. Consequência:",
    "options": [
      "Inclusão total",
      "Marginalização e racismo estrutural, favelização",
      "Reforma agrária",
      "Fim racismo",
      "Igualdade imediata"
    ],
    "correctIndex": 1,
    "explanation": "Marginalização sem política inclusão.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "abolição"
    ],
    "createdAt": "2026-02-06T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-historia-9",
    "subjectId": "historia",
    "topicId": "historia-segundo-reinado",
    "statement": "TEXTO: Canudos (1896-97) sertanejos Antônio Conselheiro, messianismo, resistência à República. Estado vê como ameaça e destrói. Interpretação Euclides Cunha Os Sertões:",
    "options": [
      "Fanáticos apenas",
      "Conflito Brasil litoral moderno vs sertão esquecido, crítica República excludente",
      "Apoio total República",
      "Sem importância",
      "Canudos venceu"
    ],
    "correctIndex": 1,
    "explanation": "Euclides crítica exclusão.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "canudos"
    ],
    "createdAt": "2026-02-16T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-historia-10",
    "subjectId": "historia",
    "topicId": "historia-brasil-republica",
    "statement": "TEXTO: Revolução 1930: crise café, tenentismo, oligarquias dissidentes, Vargas poder. Fim República Velha, início Era Vargas centralizadora:",
    "options": [
      "Mantém oligarquias",
      "Centralização Estado, trabalhismo, industrialização",
      "Volta monarquia",
      "Socialismo",
      "Sem mudança"
    ],
    "correctIndex": 1,
    "explanation": "Centralização trabalhismo.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "revolução 1930"
    ],
    "createdAt": "2026-02-26T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-historia-11",
    "subjectId": "historia",
    "topicId": "historia-idade-media",
    "statement": "TEXTO: Estado Novo 1937-45 Vargas ditadura, DIP propaganda, CLT 1943. Trabalhismo concede direitos mas controla sindicatos (peleguismo). Significa:",
    "options": [
      "Autonomia operária total",
      "Concessão direitos com controle e cooptação, evita autonomia",
      "Sem direitos",
      "Anarquismo",
      "Liberalismo"
    ],
    "correctIndex": 1,
    "explanation": "Concessão com controle.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "estado novo"
    ],
    "createdAt": "2026-03-08T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-historia-12",
    "subjectId": "historia",
    "topicId": "historia-revolucao-francesa",
    "statement": "TEXTO: Ditadura Militar 1964-85: AI-5 1968 fecha Congresso, censura, tortura, milagre econômico concentrador. Oposição: luta armada, movimento estudantil, imprensa alternativa:",
    "options": [
      "Apoio total população",
      "Resistência apesar repressão",
      "Sem oposição",
      "Ditadura democrática",
      "Milagre para todos"
    ],
    "correctIndex": 1,
    "explanation": "Resistência apesar repressão.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "ditadura"
    ],
    "createdAt": "2026-03-18T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-historia-13",
    "subjectId": "historia",
    "topicId": "historia-brasil-colonia",
    "statement": "TEXTO: Diretas Já 1983-84 movimento massivo por eleições diretas presidente, emenda Dante Oliveira rejeitada, mas eleição indireta Tancredo 1985 e Constituição 1988. Representa:",
    "options": [
      "Fim ditadura por concessão militar apenas",
      "Pressão popular por redemocratização, cidadania",
      "Golpe",
      "Volta monarquia",
      "Sem importância"
    ],
    "correctIndex": 1,
    "explanation": "Pressão popular redemocratização.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "diretas já"
    ],
    "createdAt": "2026-03-28T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-historia-14",
    "subjectId": "historia",
    "topicId": "historia-segundo-reinado",
    "statement": "TEXTO: Iluminismo: razão, contrato social (Rousseau), separação poderes (Montesquieu), tolerância (Voltaire). Influência nas independências americanas:",
    "options": [
      "Defesa absolutismo",
      "Ideias liberdade e contrato contra absolutismo",
      "Defesa teocracia",
      "Sem influência",
      "Defesa feudalismo"
    ],
    "correctIndex": 1,
    "explanation": "Iluminismo base independências.",
    "difficulty": "medio",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "iluminismo"
    ],
    "createdAt": "2026-04-07T18:50:30.249Z",
    "isCustom": false
  },
  {
    "id": "q-historia-15",
    "subjectId": "historia",
    "topicId": "historia-brasil-republica",
    "statement": "TEXTO: Imperialismo século XIX: Europa domina África e Ásia, justificativa missão civilizadora, darwinismo social. Conferência Berlim 1884-85:",
    "options": [
      "Divisão pacífica sem disputa",
      "Partilha África entre potências europeias sem africanos",
      "Independência África",
      "Fim imperialismo",
      "África coloniza Europa"
    ],
    "correctIndex": 1,
    "explanation": "Partilha África.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "imperialismo"
    ],
    "createdAt": "2026-04-17T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-16",
    "subjectId": "historia",
    "topicId": "historia-idade-media",
    "statement": "TEXTO: Primeira Guerra 1914-18: imperialismo, nacionalismo, alianças, assassinato arquiduque. Guerra trincheiras, Tratado Versalhes punitivo Alemanha. Consequência:",
    "options": [
      "Paz duradoura",
      "Revanchismo alemão, crise Weimar, base nazismo",
      "Fim capitalismo",
      "União europeia imediata",
      "Sem consequência"
    ],
    "correctIndex": 1,
    "explanation": "Versalhes revanchismo.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "WWI"
    ],
    "createdAt": "2026-04-27T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-17",
    "subjectId": "historia",
    "topicId": "historia-revolucao-francesa",
    "statement": "TEXTO: Revolução Russa 1917: sovietes, Lênin Teses Abril, socialismo. NEP 1921 recuo capitalismo para recuperar economia. Significa:",
    "options": [
      "Socialismo puro imediato",
      "Pragmatismo Lênin recua para avançar, mistura",
      "Capitalismo total",
      "Sem mudança",
      "Fim revolução"
    ],
    "correctIndex": 1,
    "explanation": "NEP pragmatismo.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "revolução russa"
    ],
    "createdAt": "2026-05-07T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-18",
    "subjectId": "historia",
    "topicId": "historia-brasil-colonia",
    "statement": "TEXTO: Crise 1929 quebra Bolsa NY superprodução, crédito. New Deal Roosevelt intervencionismo Estado, Keynesianismo. Representa:",
    "options": [
      "Liberalismo total",
      "Fim liberalismo clássico, Estado regula economia",
      "Socialismo",
      "Sem Estado",
      "Fascismo EUA"
    ],
    "correctIndex": 1,
    "explanation": "Estado intervencionista.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "crise 1929"
    ],
    "createdAt": "2026-05-17T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-19",
    "subjectId": "historia",
    "topicId": "historia-segundo-reinado",
    "statement": "TEXTO: Nazismo: totalitarismo, racismo ariano, espaço vital, propaganda Goebbels, Gestapo. Ascensão por crise Weimar, medo comunismo, apoio elite. Explica:",
    "options": [
      "Só loucura Hitler",
      "Condições estruturais crise + ideologia + apoio social",
      "Sem apoio",
      "Só economia",
      "Só racismo sem contexto"
    ],
    "correctIndex": 1,
    "explanation": "Condições estruturais + ideologia.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "nazismo"
    ],
    "createdAt": "2026-05-27T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-20",
    "subjectId": "historia",
    "topicId": "historia-brasil-republica",
    "statement": "TEXTO: Segunda Guerra 1939-45: blitzkrieg, Holocausto, bomba atômica. ONU 1945 e Declaração Direitos Humanos 1948 tentam:",
    "options": [
      "Vingança",
      "Evitar novo conflito e garantir direitos após barbárie",
      "Dominação EUA",
      "Fim capitalismo",
      "Sem objetivo"
    ],
    "correctIndex": 1,
    "explanation": "Evitar barbárie garantir direitos.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "WWII"
    ],
    "createdAt": "2026-06-06T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-21",
    "subjectId": "historia",
    "topicId": "historia-idade-media",
    "statement": "TEXTO: Guerra Fria bipolar EUA x URSS, corrida armamentista, espacial, proxy wars Coreia Vietnã, sem confronto direto. Doutrina Truman e Plano Marshall:",
    "options": [
      "Apoio comunismo",
      "Contenção comunismo e influência EUA Europa",
      "Paz",
      "União EUA URSS",
      "Isolacionismo EUA"
    ],
    "correctIndex": 1,
    "explanation": "Contenção.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "guerra fria"
    ],
    "createdAt": "2026-06-16T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-22",
    "subjectId": "historia",
    "topicId": "historia-revolucao-francesa",
    "statement": "TEXTO: Descolonização África e Ásia 1950-70: Bandung 1955, não alinhados, neocolonialismo. Independências muitas vezes com fronteiras artificiais coloniais causam:",
    "options": [
      "Paz total",
      "Conflitos étnicos internos",
      "União imediata",
      "Fim pobreza",
      "Sem problema"
    ],
    "correctIndex": 1,
    "explanation": "Fronteiras artificiais conflitos.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "descolonização"
    ],
    "createdAt": "2026-06-26T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-23",
    "subjectId": "historia",
    "topicId": "historia-brasil-colonia",
    "statement": "TEXTO: Ditadura e milagre econômico Brasil 1968-73 crescimento com arrocho salarial, concentração renda, dívida externa. Milagre para quem?",
    "options": [
      "Todos",
      "Elite e classe média alta, base pirâmide excluída",
      "Pobres principalmente",
      "Sem crescimento",
      "Socialismo"
    ],
    "correctIndex": 1,
    "explanation": "Concentrador.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "milagre"
    ],
    "createdAt": "2026-07-06T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-24",
    "subjectId": "historia",
    "topicId": "historia-segundo-reinado",
    "statement": "TEXTO: Constituição 1988 cidadã: direitos sociais, SUS, educação, voto 16 anos, participação popular. Contexto:",
    "options": [
      "Ditadura",
      "Redemocratização, movimentos sociais, fim ditadura",
      "Império",
      "Colônia",
      "Estado Novo"
    ],
    "correctIndex": 1,
    "explanation": "Redemocratização.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "CF88"
    ],
    "createdAt": "2026-07-16T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-25",
    "subjectId": "historia",
    "topicId": "historia-brasil-republica",
    "statement": "TEXTO: Neoliberalismo 1990s: Consenso Washington, privatizações, abertura, Plano Real 1994 fim hiperinflação com URV. Críticas:",
    "options": [
      "Sem crítica",
      "Estabilização mas desindustrialização, desemprego, dependência externa",
      "Só positivo",
      "Hiperinflação continuou",
      "Sem privatização"
    ],
    "correctIndex": 1,
    "explanation": "Estabilização com custos sociais.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "neoliberalismo"
    ],
    "createdAt": "2026-07-26T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-26",
    "subjectId": "historia",
    "topicId": "historia-idade-media",
    "statement": "TEXTO: Movimento negro, feminista, LGBTQIA+ pós-88 pressionam por reconhecimento. Políticas afirmativas cotas 2012 STF constitucional por:",
    "options": [
      "Racismo não existe",
      "Igualdade material, reparar desigualdade histórica",
      "Privilégio",
      "Separação",
      "Sem base"
    ],
    "correctIndex": 1,
    "explanation": "Igualdade material.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "cotas"
    ],
    "createdAt": "2026-08-05T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-27",
    "subjectId": "historia",
    "topicId": "historia-revolucao-francesa",
    "statement": "TEXTO: História indígena: Pombal Diretório, SPI, FUNAI, Constituição 88 reconhece direito originário terra. Demarcação conflita com agronegócio. Questão central:",
    "options": [
      "Índios não têm direito",
      "Choque entre direito originário e propriedade privada capitalista",
      "Sem conflito",
      "Índios isolados sempre",
      "Fim demarcação"
    ],
    "correctIndex": 1,
    "explanation": "Choque direitos.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "indígena"
    ],
    "createdAt": "2026-08-15T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-28",
    "subjectId": "historia",
    "topicId": "historia-brasil-colonia",
    "statement": "TEXTO: Escravidão Brasil 300 anos, 4 milhões africanos. Resistência: quilombos, Palmares, Revolta Malês 1835 islâmica. Malês era:",
    "options": [
      "Escravos sem cultura",
      "Escravizados muçulmanos letrados em árabe, resistência organizada",
      "Senhorial",
      "Sem religião",
      "Apoio senhor"
    ],
    "correctIndex": 1,
    "explanation": "Muçulmanos letrados resistência.",
    "difficulty": "dificil",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "malês"
    ],
    "createdAt": "2026-08-25T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-29",
    "subjectId": "historia",
    "topicId": "historia-segundo-reinado",
    "statement": "TEXTO: Inconfidência Mineira 1789: elite mineira, Tiradentes, influência independência EUA, mas sem povo. Fracasso por:",
    "options": [
      "Apoio popular",
      "Delação, sem base popular, elite",
      "Sucesso",
      "Apoio Portugal",
      "Sem ideia"
    ],
    "correctIndex": 1,
    "explanation": "Sem base popular delação.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "inconfidência"
    ],
    "createdAt": "2026-09-04T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-30",
    "subjectId": "historia",
    "topicId": "historia-brasil-republica",
    "statement": "TEXTO: Revolução Industrial Inglaterra século XVIII: cercamentos, exército reserva, máquina vapor, carvão. Consequência social:",
    "options": [
      "Fim classes",
      "Proletarização, urbanização precária, mais-valia",
      "Igualdade",
      "Fim trabalho",
      "Campo fortalecido"
    ],
    "correctIndex": 1,
    "explanation": "Proletarização.",
    "difficulty": "medio",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "rev industrial"
    ],
    "createdAt": "2026-09-14T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-31",
    "subjectId": "historia",
    "topicId": "historia-idade-media",
    "statement": "TEXTO: Manifesto Comunista 1848 Marx e Engels: história luta classes, proletários de todos países uni-vos. Propõe:",
    "options": [
      "Reforma capitalista",
      "Fim propriedade privada meios produção, ditadura proletariado",
      "Manter burguesia",
      "Sem proposta",
      "Anarquismo"
    ],
    "correctIndex": 1,
    "explanation": "Fim propriedade privada.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "manifesto"
    ],
    "createdAt": "2026-09-24T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-32",
    "subjectId": "historia",
    "topicId": "historia-revolucao-francesa",
    "statement": "TEXTO: Absolutismo: rei poder divino (Bossuet), mercantilismo, centralização. Crise por:",
    "options": [
      "Força",
      "Contradição com burguesia emergente e iluminismo",
      "Apoio total",
      "Sem crise",
      "Fim comércio"
    ],
    "correctIndex": 1,
    "explanation": "Contradição burguesia.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "absolutismo"
    ],
    "createdAt": "2026-10-04T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-33",
    "subjectId": "historia",
    "topicId": "historia-brasil-colonia",
    "statement": "TEXTO: Renascimento: antropocentrismo, humanismo, perspectiva, mecenato. Não foi ruptura total medieval mas:",
    "options": [
      "Idade Média sem cultura",
      "Resgate antiguidade com inovação, transição",
      "Só cópia",
      "Sem religião",
      "Fim arte"
    ],
    "correctIndex": 1,
    "explanation": "Transição resgate e inovação.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "renascimento"
    ],
    "createdAt": "2026-10-14T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-34",
    "subjectId": "historia",
    "topicId": "historia-segundo-reinado",
    "statement": "TEXTO: Grandes Navegações: caravela, bússola, astrolábio, busca especiarias, expansão feitoria. Impacto para África:",
    "options": [
      "Desenvolvimento africano",
      "Tráfico atlântico, desestruturação sociedades, diáspora",
      "Sem impacto",
      "África coloniza Europa",
      "Fim escravidão"
    ],
    "correctIndex": 1,
    "explanation": "Tráfico desestruturação.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "navegações"
    ],
    "createdAt": "2026-10-24T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-35",
    "subjectId": "historia",
    "topicId": "historia-brasil-republica",
    "statement": "TEXTO: Colonização Brasil: plantation açúcar, latifúndio, monocultura, escravidão, pacto colonial. Sentido da colonização Caio Prado Jr:",
    "options": [
      "Desenvolvimento interno",
      "Voltada para fora, exportadora, dependente",
      "Autossuficiente",
      "Industrial",
      "Sem sentido"
    ],
    "correctIndex": 1,
    "explanation": "Voltada para fora.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "sentido colonização"
    ],
    "createdAt": "2026-11-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-36",
    "subjectId": "historia",
    "topicId": "historia-idade-media",
    "statement": "TEXTO: Entradas e bandeiras: apresamento indígena e busca ouro. Bandeirantes expandem território além Tordesilhas. Consequência indígena:",
    "options": [
      "Proteção",
      "Genocídio e escravização",
      "Inclusão",
      "Sem impacto",
      "Aliança igual"
    ],
    "correctIndex": 1,
    "explanation": "Genocídio.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "bandeirantes"
    ],
    "createdAt": "2026-11-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-37",
    "subjectId": "historia",
    "topicId": "historia-revolucao-francesa",
    "statement": "TEXTO: Mineração ouro século XVIII Minas: sociedade urbana, barroco Aleijadinho, tributação quinto, derrama. Inconfidência ligada a derrama porque:",
    "options": [
      "Imposto baixo",
      "Cobrança violenta atrasados",
      "Sem imposto",
      "Ouro abundante",
      "Portugal não cobrava"
    ],
    "correctIndex": 1,
    "explanation": "Derrama cobrança violenta.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "mineração"
    ],
    "createdAt": "2026-11-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-38",
    "subjectId": "historia",
    "topicId": "historia-brasil-colonia",
    "statement": "TEXTO: Transferência corte 1808: D. João VI foge Napoleão, abre portos 1808, Banco Brasil, eleva Brasil a Reino Unido 1815. Significa:",
    "options": [
      "Colônia igual",
      "Fim pacto colonial, Brasil centro império",
      "Independência imediata",
      "Sem mudança",
      "Volta feudalismo"
    ],
    "correctIndex": 1,
    "explanation": "Fim pacto colonial.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "1808"
    ],
    "createdAt": "2026-12-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-39",
    "subjectId": "historia",
    "topicId": "historia-segundo-reinado",
    "statement": "TEXTO: Regência 1831-40: após abdicação Pedro I, revoltas regenciais Balaiada, Sabinada, Farroupilha. Mostram:",
    "options": [
      "Unidade total",
      "Tensões sociais e regionais, risco fragmentação",
      "Paz",
      "Sem revolta",
      "Apoio regência"
    ],
    "correctIndex": 1,
    "explanation": "Tensões fragmentação.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "regência"
    ],
    "createdAt": "2026-12-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-40",
    "subjectId": "historia",
    "topicId": "historia-brasil-republica",
    "statement": "TEXTO: Guerra Paraguai 1864-70: Tríplice Aliança Brasil Argentina Uruguai vs Paraguai Solano López. Brasil usa escravizados com promessa alforria. Consequência Paraguai:",
    "options": [
      "Desenvolvimento",
      "Devastação, perda território e população",
      "Vitória",
      "Sem consequência",
      "Industrialização"
    ],
    "correctIndex": 1,
    "explanation": "Devastação.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "guerra paraguai"
    ],
    "createdAt": "2026-12-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-41",
    "subjectId": "historia",
    "topicId": "historia-idade-media",
    "statement": "TEXTO: Movimento operário Brasil início século XX: anarquismo, greve geral 1917 SP. Repressão e depois trabalhismo Vargas. Greve 1917 pedia:",
    "options": [
      "Fim trabalho",
      "8h, aumento salário, fim trabalho infantil",
      "Aumento jornada",
      "Apoio patrão",
      "Sem pauta"
    ],
    "correctIndex": 1,
    "explanation": "8h e melhorias.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "greve 1917"
    ],
    "createdAt": "2027-01-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-42",
    "subjectId": "historia",
    "topicId": "historia-revolucao-francesa",
    "statement": "TEXTO: Semana Arte Moderna 1922: Mário, Oswald, Tarsila, antropofagia. Propõe:",
    "options": [
      "Cópia Europa",
      "Arte nacional com vanguarda europeia, deglute estrangeiro cria original",
      "Fim arte",
      "Só passado",
      "Sem proposta"
    ],
    "correctIndex": 1,
    "explanation": "Antropofagia nacional + vanguarda.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "semana 22"
    ],
    "createdAt": "2027-01-12T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-43",
    "subjectId": "historia",
    "topicId": "historia-brasil-colonia",
    "statement": "TEXTO: Populismo 1945-64: Vargas, JK, Jango, carisma, massas urbanas, nacional-desenvolvimentismo. Crítica conceito populismo:",
    "options": [
      "Povo manipulado só",
      "Visão simplista que ignora agência popular e conquistas trabalhistas",
      "Sem crítica",
      "Povo sem consciência sempre",
      "Só elite"
    ],
    "correctIndex": 1,
    "explanation": "Crítica simplificação.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "populismo"
    ],
    "createdAt": "2027-01-22T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-44",
    "subjectId": "historia",
    "topicId": "historia-segundo-reinado",
    "statement": "TEXTO: Golpe 1964: Jango reformas base, medo comunismo, Marcha Família com Deus, apoio EUA Operação Brother Sam. Golpe civil-militar porque:",
    "options": [
      "Só militares",
      "Apoio civil elite, imprensa, Igreja, classe média",
      "Sem apoio civil",
      "Apoio operário",
      "Sem EUA"
    ],
    "correctIndex": 1,
    "explanation": "Civil-militar apoio elite.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "golpe 64"
    ],
    "createdAt": "2027-02-01T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-45",
    "subjectId": "historia",
    "topicId": "historia-brasil-republica",
    "statement": "TEXTO: Redemocratização e neoliberalismo: FHC privatiza Vale, Telebrás. Argumento favorável privatização:",
    "options": [
      "Eficiência e investimento",
      "Estado ineficiente, atrai investimento, moderniza",
      "Só negativo",
      "Sem argumento",
      "Aumenta Estado"
    ],
    "correctIndex": 1,
    "explanation": "Eficiência e investimento (argumento favorável, crítica existe).",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "privatização"
    ],
    "createdAt": "2027-02-11T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-46",
    "subjectId": "historia",
    "topicId": "historia-idade-media",
    "statement": "TEXTO: História tempo presente: 2013 jornadas junho, 2016 impeachment Dilma, 2018 eleição Bolsonaro. Desafio historiador presente:",
    "options": [
      "Distância total",
      "Falta distanciamento, fontes digitais abundantes, paixões políticas",
      "Sem fonte",
      "Fácil",
      "Sem desafio"
    ],
    "correctIndex": 1,
    "explanation": "Falta distanciamento e excesso fontes.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "tempo presente"
    ],
    "createdAt": "2027-02-21T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-47",
    "subjectId": "historia",
    "topicId": "historia-revolucao-francesa",
    "statement": "TEXTO: Quilombo dos Palmares século XVII, Zumbi, resistência escravidão, mosaico étnico. Palmares era:",
    "options": [
      "Só fuga",
      "Sociedade complexa com agricultura, política, militar",
      "Sem organização",
      "Apoio Portugal",
      "Fim rápido"
    ],
    "correctIndex": 1,
    "explanation": "Sociedade complexa.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "palmares"
    ],
    "createdAt": "2027-03-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-48",
    "subjectId": "historia",
    "topicId": "historia-brasil-colonia",
    "statement": "TEXTO: Revolta Vacina 1904 Rio: Pereira Passos bota-abaixo, Oswaldo Cruz vacinação obrigatória varíola. População reage porque:",
    "options": [
      "Não queria vacina só",
      "Medo Estado autoritário sem diálogo, desinformação, autoritarismo higienista",
      "Apoio vacina",
      "Sem motivo",
      "Só imposto"
    ],
    "correctIndex": 1,
    "explanation": "Autoritarismo higienista sem diálogo.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "revolta vacina"
    ],
    "createdAt": "2027-03-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-49",
    "subjectId": "historia",
    "topicId": "historia-segundo-reinado",
    "statement": "TEXTO: Cangaço Lampião: banditismo social? Hobsbawm: criminoso visto como herói pelo povo contra opressão. No sertão:",
    "options": [
      "Só bandido",
      "Resistência à opressão coronéis, ambíguo herói/bandido",
      "Sem apoio popular",
      "Apoio coronéis",
      "Sem contexto"
    ],
    "correctIndex": 1,
    "explanation": "Banditismo social ambíguo.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "cangaço"
    ],
    "createdAt": "2027-03-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-historia-50",
    "subjectId": "historia",
    "topicId": "historia-brasil-republica",
    "statement": "TEXTO: Era JK 1956-61 Plano Metas 50 anos em 5, Brasília, desenvolvimentismo, capital estrangeiro, endividamento. JK:",
    "options": [
      "Isolacionismo",
      "Nacional-desenvolvimentismo com abertura capital estrangeiro",
      "Socialismo",
      "Sem desenvolvimento",
      "Fim Brasília"
    ],
    "correctIndex": 1,
    "explanation": "Nacional-desenvolvimentismo.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "JK"
    ],
    "createdAt": "2027-04-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-1",
    "subjectId": "geografia",
    "topicId": "geografia-cartografia",
    "statement": "TEXTO: Mapa 1:50.000, distância entre pontos 4cm no mapa, real?",
    "options": [
      "200m",
      "2km",
      "2000m=2km",
      "20km",
      "200km"
    ],
    "correctIndex": 2,
    "explanation": "4cm*50.000=200.000cm=2km.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "escala"
    ],
    "createdAt": "2026-01-17T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-2",
    "subjectId": "geografia",
    "topicId": "geografia-climas",
    "statement": "TEXTO: Projeção Mercator cilíndrica conforme mantém forma mas distorce área, Eurocentrismo. Peters cilíndrica equivalente mantém área distorce forma, Terceiro Mundo. Escolha projeção é:",
    "options": [
      "Neutra técnica",
      "Política, intencionalidade, poder",
      "Aleatória",
      "Sem ideologia",
      "Só matemática"
    ],
    "correctIndex": 1,
    "explanation": "Projeção política.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "projeções"
    ],
    "createdAt": "2026-01-27T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-3",
    "subjectId": "geografia",
    "topicId": "geografia-urbanizacao",
    "statement": "TEXTO: Clima equatorial quente úmido o ano todo, sem estação seca, floresta latifoliada. Onde no Brasil?",
    "options": [
      "Sertão",
      "Amazônia",
      "Pampa",
      "Caatinga",
      "Mata Araucária"
    ],
    "correctIndex": 1,
    "explanation": "Amazônia equatorial.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "clima equatorial"
    ],
    "createdAt": "2026-02-06T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-4",
    "subjectId": "geografia",
    "topicId": "geografia-geopolitica",
    "statement": "TEXTO: El Niño aquecimento anormal Pacífico equatorial, altera circulação Walker, seca Norte/Nordeste Brasil e chuva Sul. La Niña oposto resfriamento. São:",
    "options": [
      "Locais só Peru",
      "Fenômenos oceano-atmosfera globais teleconexões",
      "Sem impacto Brasil",
      "Só vento",
      "Fictícios"
    ],
    "correctIndex": 1,
    "explanation": "Teleconexões globais.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "El Niño"
    ],
    "createdAt": "2026-02-16T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-5",
    "subjectId": "geografia",
    "topicId": "geografia-meio-ambiente",
    "statement": "TEXTO: Urbanização brasileira 1940 30% urbana, 2020 87% urbana, êxodo rural, metropolização, periferização, favelização. Causa principal 1950-80:",
    "options": [
      "Industrialização e mecanização campo expulsando",
      "Só natalidade urbana",
      "Imigração estrangeira",
      "Sem causa",
      "Clima"
    ],
    "correctIndex": 0,
    "explanation": "Industrialização + mecanização.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "urbanização"
    ],
    "createdAt": "2026-02-26T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-6",
    "subjectId": "geografia",
    "topicId": "geografia-cartografia",
    "statement": "TEXTO: Gentrificação: centro valorizado, expulsão pobres, chegada classe média alta, alta aluguel. Exemplo Pelourinho Salvador. Processo:",
    "options": [
      "Inclusão",
      "Segregação e valorização excludente",
      "Favelização",
      "Êxodo rural",
      "Desmetropolização"
    ],
    "correctIndex": 1,
    "explanation": "Segregação valorização.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "gentrificação"
    ],
    "createdAt": "2026-03-08T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-7",
    "subjectId": "geografia",
    "topicId": "geografia-climas",
    "statement": "TEXTO: Agronegócio Brasil: latifúndio, monocultura soja, exportação, alto uso agrotóxicos, conflitos terra. Complexo soja no Centro-Oeste ligado a:",
    "options": [
      "Agricultura familiar",
      "Fronteira agrícola, desmatamento Cerrado e Amazônia, logística exportação",
      "Sem impacto",
      "Só subsistência",
      "Reforma agrária"
    ],
    "correctIndex": 1,
    "explanation": "Fronteira agrícola desmatamento.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "agronegócio"
    ],
    "createdAt": "2026-03-18T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-8",
    "subjectId": "geografia",
    "topicId": "geografia-urbanizacao",
    "statement": "TEXTO: Reforma agrária: função social terra CF88. MST ocupa latifúndio improdutivo pressiona. Argumento contra latifúndio improdutivo:",
    "options": [
      "Produtivo",
      "Não cumpre função social, concentrador",
      "Sem argumento",
      "Sempre produtivo",
      "Reforma desnecessária"
    ],
    "correctIndex": 1,
    "explanation": "Não cumpre função social.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "reforma agrária"
    ],
    "createdAt": "2026-03-28T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-9",
    "subjectId": "geografia",
    "topicId": "geografia-geopolitica",
    "statement": "TEXTO: Fontes energia: matriz elétrica Brasil 60% hidrelétrica, mas crise hídrica 2021 acionou térmicas fósseis caras e poluentes. Desafio:",
    "options": [
      "Só hidrelétrica sempre",
      "Diversificar com solar eólica para segurança",
      "Só térmica",
      "Sem desafio",
      "Nuclear só"
    ],
    "correctIndex": 1,
    "explanation": "Diversificar.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "matriz energética"
    ],
    "createdAt": "2026-04-07T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-10",
    "subjectId": "geografia",
    "topicId": "geografia-meio-ambiente",
    "statement": "TEXTO: Ilha de calor urbano: cidade mais quente que rural por asfalto, concreto, pouca vegetação, poluição. Mitigação:",
    "options": [
      "Mais asfalto",
      "Mais áreas verdes, telhado verde, permeabilidade",
      "Mais carros",
      "Menos árvores",
      "Sem solução"
    ],
    "correctIndex": 1,
    "explanation": "Áreas verdes mitigam.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "ilha calor"
    ],
    "createdAt": "2026-04-17T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-11",
    "subjectId": "geografia",
    "topicId": "geografia-cartografia",
    "statement": "TEXTO: Demografia: transição demográfica Brasil: mortalidade cai, natalidade cai depois, envelhecimento. Bônus demográfico:",
    "options": [
      "Muitos idosos",
      "Muitos jovens em idade ativa, oportunidade crescimento",
      "Muitas crianças",
      "Sem bônus",
      "Só idosos"
    ],
    "correctIndex": 1,
    "explanation": "Bônus muitos em idade ativa.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "transição demográfica"
    ],
    "createdAt": "2026-04-27T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-12",
    "subjectId": "geografia",
    "topicId": "geografia-climas",
    "statement": "TEXTO: Pirâmide etária Brasil 2020 base estreita, meio largo, topo crescendo. Indica:",
    "options": [
      "População jovem",
      "Envelhecimento, queda fecundidade, aumento expectativa vida",
      "Alta natalidade",
      "Sem mudança",
      "Só mortalidade alta"
    ],
    "correctIndex": 1,
    "explanation": "Envelhecimento.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "pirâmide"
    ],
    "createdAt": "2026-05-07T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-13",
    "subjectId": "geografia",
    "topicId": "geografia-urbanizacao",
    "statement": "TEXTO: Globalização: fluxos financeiros, informação, mercadorias, mas desigual. Milton Santos globalização perversa. Exemplo:",
    "options": [
      "Igual para todos",
      "Ricos globalizam-se, pobres localizam-se, fragmentação",
      "Sem desigualdade",
      "Fim Estado",
      "Só positiva"
    ],
    "correctIndex": 1,
    "explanation": "Perversa desigual.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "globalização"
    ],
    "createdAt": "2026-05-17T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-14",
    "subjectId": "geografia",
    "topicId": "geografia-geopolitica",
    "statement": "TEXTO: Blocos econômicos: Mercosul união aduaneira imperfeita, UE integração profunda. Mercosul desafio:",
    "options": [
      "Integração total",
      "Assimetrias Brasil Argentina, tarifa externa comum furada, sem moeda única",
      "Sem desafio",
      "Moeda única",
      "Fim bloco"
    ],
    "correctIndex": 1,
    "explanation": "Assimetrias e TEC furada.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "Mercosul"
    ],
    "createdAt": "2026-05-27T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-15",
    "subjectId": "geografia",
    "topicId": "geografia-meio-ambiente",
    "statement": "TEXTO: Geopolítica petróleo: Oriente Médio 50% reservas, OPEP cartel controla preço. Choques 1973 e 1979 inflação e dívida países importadores como Brasil:",
    "options": [
      "Beneficiou Brasil",
      "Crise dívida, inflação, II PND",
      "Sem impacto",
      "Barateou petróleo",
      "Fim OPEP"
    ],
    "correctIndex": 1,
    "explanation": "Choques crise Brasil.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "petróleo"
    ],
    "createdAt": "2026-06-06T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-16",
    "subjectId": "geografia",
    "topicId": "geografia-cartografia",
    "statement": "TEXTO: Conflito Israel-Palestina: sionismo, partilha ONU 1947, guerras 1948 1967, ocupação Cisjordânia e Gaza, Intifadas. Questão central:",
    "options": [
      "Religião só",
      "Território, Estado, refugiados, ocupação",
      "Sem disputa",
      "Só petróleo",
      "Acordo total"
    ],
    "correctIndex": 1,
    "explanation": "Território Estado ocupação.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "Israel Palestina"
    ],
    "createdAt": "2026-06-16T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-17",
    "subjectId": "geografia",
    "topicId": "geografia-climas",
    "statement": "TEXTO: Migrações venezuelanos para Roraima 2018-24 por crise econômica e política. Brasil operação Acolhida interiorização. Tipo migração:",
    "options": [
      "Voluntária econômica rica",
      "Forçada por crise humanitária, refúgio",
      "Turismo",
      "Só climática",
      "Sem crise"
    ],
    "correctIndex": 1,
    "explanation": "Forçada humanitária.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "migração venezuelana"
    ],
    "createdAt": "2026-06-26T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-18",
    "subjectId": "geografia",
    "topicId": "geografia-urbanizacao",
    "statement": "TEXTO: Fronteira agrícola Amazônia: arco desmatamento Pará Mato Grosso Rondônia. Vetores: grilagem, madeira, pecuária, soja. Combate:",
    "options": [
      "Mais desmatamento",
      "Fiscalização IBAMA, demarcação terras indígenas e UCs, rastreabilidade",
      "Sem combate",
      "Só multa",
      "Incentivar"
    ],
    "correctIndex": 1,
    "explanation": "Fiscalização e demarcação.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "desmatamento"
    ],
    "createdAt": "2026-07-06T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-19",
    "subjectId": "geografia",
    "topicId": "geografia-geopolitica",
    "statement": "TEXTO: Cerrado segundo maior bioma, savana mais biodiversa mundo, 50% desmatado, berço águas. Ameaça principal:",
    "options": [
      "Preservado",
      "Agronegócio soja e pecuária, sem proteção legal como Amazônia",
      "Sem ameaça",
      "Só urbano",
      "Frio"
    ],
    "correctIndex": 1,
    "explanation": "Agronegócio sem proteção.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "Cerrado"
    ],
    "createdAt": "2026-07-16T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-20",
    "subjectId": "geografia",
    "topicId": "geografia-meio-ambiente",
    "statement": "TEXTO: Água: Brasil 12% água doce mundo mas distribuição desigual: Amazônia 70% água 10% população, Sudeste 10% água 40% população. Conflito Cantareira 2014-15:",
    "options": [
      "Excesso água",
      "Escassez por má gestão, desmatamento, ocupação mananciais",
      "Sem conflito",
      "Só natural",
      "Chuva demais"
    ],
    "correctIndex": 1,
    "explanation": "Escassez gestão.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "água"
    ],
    "createdAt": "2026-07-26T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-21",
    "subjectId": "geografia",
    "topicId": "geografia-cartografia",
    "statement": "TEXTO: Relevo Brasil: planaltos, planícies, depressões. Chapada Diamantina planalto com escarpa. Cuesta é:",
    "options": [
      "Planície",
      "Relevo assimétrico frente íngreme e reverso suave",
      "Vulcão",
      "Depressão",
      "Duna"
    ],
    "correctIndex": 1,
    "explanation": "Cuesta assimétrica.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "cuesta"
    ],
    "createdAt": "2026-08-05T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-22",
    "subjectId": "geografia",
    "topicId": "geografia-climas",
    "statement": "TEXTO: Solo: latossolo profundo bem drenado, pobre, Cerrado; massapê fértil Zona Mata Nordeste. Laterização:",
    "options": [
      "Acúmulo matéria orgânica frio",
      "Lixiviação nutrientes chuva quente, deixa Fe e Al",
      "Gelo",
      "Vento",
      "Sem processo"
    ],
    "correctIndex": 1,
    "explanation": "Laterização lixiviação.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "solo"
    ],
    "createdAt": "2026-08-15T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-23",
    "subjectId": "geografia",
    "topicId": "geografia-urbanizacao",
    "statement": "TEXTO: Indústria 4.0: automação, IoT, IA, desemprego estrutural. Brasil desindustrialização precoce: indústria perde PIB antes de ficar rico. Causa:",
    "options": [
      "Alta tecnologia",
      "Abertura, câmbio valorizado, falta inovação, concorrência China",
      "Só falta mão obra",
      "Excesso indústria",
      "Sem causa"
    ],
    "correctIndex": 1,
    "explanation": "Abertura e falta inovação.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "desindustrialização"
    ],
    "createdAt": "2026-08-25T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-24",
    "subjectId": "geografia",
    "topicId": "geografia-geopolitica",
    "statement": "TEXTO: Transporte Brasil: rodoviarismo 60% cargas, JK e FHC. Ferrovia sucateada. Problema rodovia:",
    "options": [
      "Barato e eficiente",
      "Caro, poluente, acidentes, dependência diesel",
      "Sem problema",
      "Melhor que ferrovia para longa distância",
      "Só vantagem"
    ],
    "correctIndex": 1,
    "explanation": "Caro poluente.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "transporte"
    ],
    "createdAt": "2026-09-04T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-25",
    "subjectId": "geografia",
    "topicId": "geografia-meio-ambiente",
    "statement": "TEXTO: Fuso horário Brasil: 4 fusos, Fernando Noronha -2, Brasília -3, Amazônia -4, Acre -5. Jogo 16h Brasília no Acre:",
    "options": [
      "16h",
      "14h",
      "15h",
      "13h",
      "18h"
    ],
    "correctIndex": 1,
    "explanation": "Acre -5, Brasília -3 diferença 2h atrás =>14h.",
    "difficulty": "medio",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "fuso"
    ],
    "createdAt": "2026-09-14T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-26",
    "subjectId": "geografia",
    "topicId": "geografia-cartografia",
    "statement": "TEXTO: Cartografia: curvas nível próximas indicam:",
    "options": [
      "Relevo plano",
      "Relevo íngreme",
      "Vale",
      "Rio",
      "Planície"
    ],
    "correctIndex": 1,
    "explanation": "Próximas íngreme.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "curvas nível"
    ],
    "createdAt": "2026-09-24T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-27",
    "subjectId": "geografia",
    "topicId": "geografia-climas",
    "statement": "TEXTO: Bacia hidrográfica: área drenada por rio principal e afluentes, divisor águas. Bacia Amazônica maior mundo mas hidrelétrica Belo Monte Xingu conflito com indígenas porque:",
    "options": [
      "Sem conflito",
      "Alaga terra indígena, impacta pesca, sem consulta prévia",
      "Beneficia indígena",
      "Sem impacto",
      "Só positivo"
    ],
    "correctIndex": 1,
    "explanation": "Impacta indígenas sem consulta.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "bacia"
    ],
    "createdAt": "2026-10-04T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-28",
    "subjectId": "geografia",
    "topicId": "geografia-urbanizacao",
    "statement": "TEXTO: Clima semiárido caatinga: chuva irregular, 500mm ano, evapotranspiração alta, intermitência rios. Adaptação caatinga:",
    "options": [
      "Folhas grandes",
      "Xerófitas folhas pequenas, caducifólias, cactos armazenam água",
      "Sem adaptação",
      "Floresta densa",
      "Só cactos"
    ],
    "correctIndex": 1,
    "explanation": "Xerófitas.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "caatinga"
    ],
    "createdAt": "2026-10-14T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-29",
    "subjectId": "geografia",
    "topicId": "geografia-geopolitica",
    "statement": "TEXTO: Aquecimento global: 1,2°C acima pré-industrial, metas Acordo Paris 1,5°C. Brasil emite por:",
    "options": [
      "Indústria só",
      "Desmatamento e pecuária (metano) principais",
      "Só transporte",
      "Sem emissão",
      "Só energia"
    ],
    "correctIndex": 1,
    "explanation": "Desmatamento e pecuária.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "aquecimento Brasil"
    ],
    "createdAt": "2026-10-24T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-30",
    "subjectId": "geografia",
    "topicId": "geografia-meio-ambiente",
    "statement": "TEXTO: Lixo: Brasil 80 milhões toneladas ano, lixões ainda, reciclagem 4%. Política Nacional Resíduos Sólidos 2010 prevê:",
    "options": [
      "Lixão",
      "Aterro sanitário, logística reversa, responsabilidade compartilhada",
      "Queima sem controle",
      "Sem política",
      "Só reciclagem"
    ],
    "correctIndex": 1,
    "explanation": "Aterro e logística reversa.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "lixo"
    ],
    "createdAt": "2026-11-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-31",
    "subjectId": "geografia",
    "topicId": "geografia-cartografia",
    "statement": "TEXTO: Segregação socioespacial: condomínios fechados Alphaville vs favela. Autossegregação elite por:",
    "options": [
      "Pobreza",
      "Medo violência e busca status, fragmentação",
      "Sem motivo",
      "Inclusão",
      "Só preço"
    ],
    "correctIndex": 1,
    "explanation": "Medo e status.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "segregação"
    ],
    "createdAt": "2026-11-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-32",
    "subjectId": "geografia",
    "topicId": "geografia-climas",
    "statement": "TEXTO: Metrópole: São Paulo cidade global, comando financeiro, Bovespa, mas desigualdade. Hierarquia urbana: metrópole > capital regional > centro sub-regional. Base IBGE REGIC:",
    "options": [
      "Tamanho população só",
      "Fluxos gestão território, serviços, empresas",
      "Área",
      "Idade",
      "Altura"
    ],
    "correctIndex": 1,
    "explanation": "Fluxos gestão.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "hierarquia urbana"
    ],
    "createdAt": "2026-11-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-33",
    "subjectId": "geografia",
    "topicId": "geografia-urbanizacao",
    "statement": "TEXTO: Geopolítica China: Belt and Road Iniciativa Cinturão Rota, investimentos porto, ferrovia, 5G. Objetivo:",
    "options": [
      "Caridade",
      "Hegemonia econômica, escoar excesso capacidade, influência",
      "Sem objetivo",
      "Isolamento",
      "Fim comércio"
    ],
    "correctIndex": 1,
    "explanation": "Hegemonia.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "China"
    ],
    "createdAt": "2026-12-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-34",
    "subjectId": "geografia",
    "topicId": "geografia-geopolitica",
    "statement": "TEXTO: Território: conceito Ratzel Estado espaço vital, Santos território usado. Diferença:",
    "options": [
      "Iguais",
      "Ratzel território dominação Estado, Santos território vivido, usado por todos",
      "Santos só Estado",
      "Ratzel sem Estado",
      "Sem diferença"
    ],
    "correctIndex": 1,
    "explanation": "Ratzel dominação, Santos usado.",
    "difficulty": "dificil",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "território"
    ],
    "createdAt": "2026-12-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-35",
    "subjectId": "geografia",
    "topicId": "geografia-meio-ambiente",
    "statement": "TEXTO: Escala geográfica: fenômeno local vs global. Queimada local afeta clima global por CO2. Isso é:",
    "options": [
      "Sem conexão",
      "Interescalaridade, local-global interligados",
      "Só local",
      "Só global",
      "Sem impacto"
    ],
    "correctIndex": 1,
    "explanation": "Interescalar.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "escala"
    ],
    "createdAt": "2026-12-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-36",
    "subjectId": "geografia",
    "topicId": "geografia-cartografia",
    "statement": "TEXTO: Domínios morfoclimáticos Ab'Sáber: Amazônia, Cerrado, Mares Morros, Caatinga, Araucária, Pradarias. Mares Morros:",
    "options": [
      "Cerrado",
      "Mata Atlântica, relevo mamelonar, chuvas orográficas",
      "Caatinga",
      "Amazônia",
      "Pampa"
    ],
    "correctIndex": 1,
    "explanation": "Mata Atlântica mamelonar.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "domínios"
    ],
    "createdAt": "2027-01-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-37",
    "subjectId": "geografia",
    "topicId": "geografia-climas",
    "statement": "TEXTO: Erosão: laminar, sulcos, voçorocas. Voçoroca grande fenda lençol freático. Causa antrópica:",
    "options": [
      "Vegetação",
      "Desmatamento, pisoteio gado, sem terraceamento",
      "Chuva só",
      "Vento só",
      "Sem causa humana"
    ],
    "correctIndex": 1,
    "explanation": "Desmatamento e manejo errado.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "erosão"
    ],
    "createdAt": "2027-01-12T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-38",
    "subjectId": "geografia",
    "topicId": "geografia-urbanizacao",
    "statement": "TEXTO: Urbanização e enchentes: impermeabilização, ocupação várzea, lixo bueiro, canalização rios. Solução baseada natureza:",
    "options": [
      "Mais canalização",
      "Parques lineares, piscinões naturais, permeabilidade",
      "Mais asfalto",
      "Mais prédio várzea",
      "Sem solução"
    ],
    "correctIndex": 1,
    "explanation": "SBN parques permeabilidade.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "enchentes"
    ],
    "createdAt": "2027-01-22T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-39",
    "subjectId": "geografia",
    "topicId": "geografia-geopolitica",
    "statement": "TEXTO: IDH: renda, educação, longevidade. IDH Brasil 0,76 alto mas desigual. IDH ajustado desigualdade cai. Mostra:",
    "options": [
      "Desigualdade não importa",
      "Média esconde desigualdade",
      "IDH perfeito",
      "Sem desigualdade",
      "Renda só"
    ],
    "correctIndex": 1,
    "explanation": "Média esconde.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "IDH"
    ],
    "createdAt": "2027-02-01T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-40",
    "subjectId": "geografia",
    "topicId": "geografia-meio-ambiente",
    "statement": "TEXTO: BRICS: Brasil Rússia Índia China África Sul, 40% população, 25% PIB, Novo Banco Desenvolvimento. Objetivo inicial:",
    "options": [
      "Militar",
      "Cooperação Sul-Sul, alternativa FMI",
      "Sem objetivo",
      "Dominação EUA",
      "Fim comércio"
    ],
    "correctIndex": 1,
    "explanation": "Sul-Sul alternativa.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "BRICS"
    ],
    "createdAt": "2027-02-11T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-41",
    "subjectId": "geografia",
    "topicId": "geografia-cartografia",
    "statement": "TEXTO: Agroecologia vs agronegócio: agroecologia produção sem veneno, biodiversa, familiar. Diferença paradigma:",
    "options": [
      "Iguais",
      "Agroecologia sustentabilidade e autonomia, agronegócio produtividade e lucro",
      "Agroecologia usa veneno",
      "Agronegócio familiar",
      "Sem diferença"
    ],
    "correctIndex": 1,
    "explanation": "Sustentabilidade vs lucro.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "agroecologia"
    ],
    "createdAt": "2027-02-21T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-42",
    "subjectId": "geografia",
    "topicId": "geografia-climas",
    "statement": "TEXTO: Fome Brasil 33 milhões 2022 insegurança alimentar grave, volta mapa fome. Causa não é falta produção mas:",
    "options": [
      "Falta comida",
      "Desigualdade, baixa renda, desmonte políticas, inflação alimentos",
      "Excesso comida",
      "Sem causa",
      "Só clima"
    ],
    "correctIndex": 1,
    "explanation": "Desigualdade e políticas.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "fome"
    ],
    "createdAt": "2027-03-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-43",
    "subjectId": "geografia",
    "topicId": "geografia-urbanizacao",
    "statement": "TEXTO: Mobilidade urbana: SP 7 milhões carros, 2h trânsito dia. Transporte público lotado. Solução sustentável:",
    "options": [
      "Mais carros",
      "Transporte público integrado, ciclovia, adensamento e uso misto",
      "Mais viaduto",
      "Sem solução",
      "Só carro elétrico"
    ],
    "correctIndex": 1,
    "explanation": "Público + bike + uso misto.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "mobilidade"
    ],
    "createdAt": "2027-03-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-44",
    "subjectId": "geografia",
    "topicId": "geografia-geopolitica",
    "statement": "TEXTO: Cartografia temática: mapa coroplético, isarítmico, pontos. Mapa anamorfose distorce área proporcional dado (população). Anamorfose de população Brasil SP e MG grandes, Acre pequeno. Mostra:",
    "options": [
      "Área real",
      "Peso populacional, concentração",
      "Relevo",
      "Clima",
      "Nada"
    ],
    "correctIndex": 1,
    "explanation": "Peso populacional.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "anamorfose"
    ],
    "createdAt": "2027-03-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-45",
    "subjectId": "geografia",
    "topicId": "geografia-meio-ambiente",
    "statement": "TEXTO: Conflito agrário: grilagem, pistoleiros, assassinatos Chico Mendes 1988 seringueiro. Reserva extrativista proposta Chico:",
    "options": [
      "Latifúndio",
      "Uso sustentável floresta por seringueiros, sem desmatar",
      "Desmatamento",
      "Mineração",
      "Sem proposta"
    ],
    "correctIndex": 1,
    "explanation": "Uso sustentável.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "Chico Mendes"
    ],
    "createdAt": "2027-04-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-46",
    "subjectId": "geografia",
    "topicId": "geografia-cartografia",
    "statement": "TEXTO: Geopolítica Ártico: degelo abre rota marítima e petróleo. Conflito entre Rússia, Canadá, EUA, Noruega por plataforma continental. Degelo causa:",
    "options": [
      "Sem impacto",
      "Oportunidade econômica mas risco climático e disputa territorial",
      "Só positivo",
      "Só negativo",
      "Fim petróleo"
    ],
    "correctIndex": 1,
    "explanation": "Oportunidade e risco disputa.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "Ártico"
    ],
    "createdAt": "2027-04-12T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-47",
    "subjectId": "geografia",
    "topicId": "geografia-climas",
    "statement": "TEXTO: Indústria cultural Adorno: cultura como mercadoria, padronização. Funk e sertanejo universitário na indústria cultural:",
    "options": [
      "Fora indústria",
      "Dentro indústria, padronizado, mas com resistência e apropriação",
      "Só erudito",
      "Sem indústria",
      "Só folclore"
    ],
    "correctIndex": 1,
    "explanation": "Dentro com resistência.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "indústria cultural"
    ],
    "createdAt": "2027-04-22T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-48",
    "subjectId": "geografia",
    "topicId": "geografia-urbanizacao",
    "statement": "TEXTO: Mapa 1:50.000, distância entre pontos 4cm no mapa, real? (variação)",
    "options": [
      "200m",
      "2km",
      "2000m=2km",
      "20km",
      "200km"
    ],
    "correctIndex": 2,
    "explanation": "4cm*50.000=200.000cm=2km.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "escala"
    ],
    "createdAt": "2027-05-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-49",
    "subjectId": "geografia",
    "topicId": "geografia-geopolitica",
    "statement": "TEXTO: Mapa 1:50.000, distância entre pontos 4cm no mapa, real? (variação)",
    "options": [
      "200m",
      "2km",
      "2000m=2km",
      "20km",
      "200km"
    ],
    "correctIndex": 2,
    "explanation": "4cm*50.000=200.000cm=2km.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "escala"
    ],
    "createdAt": "2027-05-12T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-geografia-50",
    "subjectId": "geografia",
    "topicId": "geografia-meio-ambiente",
    "statement": "TEXTO: Mapa 1:50.000, distância entre pontos 4cm no mapa, real? (variação)",
    "options": [
      "200m",
      "2km",
      "2000m=2km",
      "20km",
      "200km"
    ],
    "correctIndex": 2,
    "explanation": "4cm*50.000=200.000cm=2km.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "escala"
    ],
    "createdAt": "2027-05-22T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-1",
    "subjectId": "portugues",
    "topicId": "portugues-interpretacao",
    "statement": "TEXTO: 'No meio do caminho tinha uma pedra' (Drummond). Repetição e coloquialismo, modernismo 1922. Efeito?",
    "options": [
      "Só literal pedra",
      "Metáfora obstáculo existencial, ironia cotidiano, ruptura com parnasianismo",
      "Sem sentido",
      "Só paisagem",
      "Elogio pedra"
    ],
    "correctIndex": 1,
    "explanation": "Metáfora obstáculo existencial e ruptura parnasiana.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "Drummond",
      "modernismo"
    ],
    "createdAt": "2026-03-08T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-2",
    "subjectId": "portugues",
    "topicId": "portugues-gramatica",
    "statement": "TEXTO: 'Dom Casmurro' Machado: narrador Bentinho ciúme Capitu, olhos ressaca, não confiável. Questão central romance:",
    "options": [
      "Só adultério Capitu",
      "Dúvida e ciúme do narrador não confiável, ambiguidade",
      "História amor perfeito",
      "Sem dúvida",
      "Capitu culpada certo"
    ],
    "correctIndex": 1,
    "explanation": "Narrador não confiável ambiguidade.",
    "difficulty": "dificil",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "Machado",
      "narrador"
    ],
    "createdAt": "2026-03-18T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-3",
    "subjectId": "portugues",
    "topicId": "portugues-figuras",
    "statement": "TEXTO: 'I-Juca Pirama' Gonçalves Dias: guerreiro tupi capturado chora por pai, inimigos acham covarde. Tema indianismo romântico:",
    "options": [
      "Índio real",
      "Índio idealizado herói nacional, mas com valores cristãos europeus",
      "Crítica índio",
      "Sem idealização",
      "Só histórico"
    ],
    "correctIndex": 1,
    "explanation": "Indianismo idealizado.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "indianismo"
    ],
    "createdAt": "2026-03-28T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-4",
    "subjectId": "portugues",
    "topicId": "portugues-literatura",
    "statement": "TEXTO: 'Vidas Secas' Graciliano: Fabiano, Sinhá Vitória, sertão, seca, opressão, linguagem seca. Estilo:",
    "options": [
      "Prolixo",
      "Seco, conciso, discurso indireto livre, crítica social",
      "Romântico",
      "Barroco",
      "Sem estilo"
    ],
    "correctIndex": 1,
    "explanation": "Seco indireto livre crítica.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "Vidas Secas"
    ],
    "createdAt": "2026-04-07T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-5",
    "subjectId": "portugues",
    "topicId": "portugues-redacao",
    "statement": "TEXTO: 'A hora da estrela' Clarice: Macabéa nordestina pobre, invisibilidade. Narrador Rodrigo se questiona escrever sobre pobre. Metalinguagem:",
    "options": [
      "Só história Macabéa",
      "Questiona representação do outro, autor e pobreza",
      "Sem metalinguagem",
      "Só romance",
      "Elogio pobreza"
    ],
    "correctIndex": 1,
    "explanation": "Metalinguagem representação.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "Clarice"
    ],
    "createdAt": "2026-04-17T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-6",
    "subjectId": "portugues",
    "topicId": "portugues-interpretacao",
    "statement": "TEXTO: 'O cortiço' Aluísio Azevedo naturalismo: determinismo meio, João Romão, Rita Baiana, cortiço como personagem que animaliza. Tese naturalista:",
    "options": [
      "Livre arbítrio",
      "Meio determina comportamento, zoomorfização",
      "Idealismo",
      "Romantismo",
      "Sem tese"
    ],
    "correctIndex": 1,
    "explanation": "Determinismo meio.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "naturalismo"
    ],
    "createdAt": "2026-04-27T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-7",
    "subjectId": "portugues",
    "topicId": "portugues-gramatica",
    "statement": "TEXTO: 'Memórias Póstumas Brás Cubas' defunto autor, ironia, pessimismo, capítulo 0. Machado critica:",
    "options": [
      "Elogio elite",
      "Hipocrisia elite, cientificismo, progresso",
      "Sem crítica",
      "Só humor",
      "Elogio escravidão"
    ],
    "correctIndex": 1,
    "explanation": "Crítica elite e cientificismo.",
    "difficulty": "dificil",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "Brás Cubas"
    ],
    "createdAt": "2026-05-07T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-8",
    "subjectId": "portugues",
    "topicId": "portugues-figuras",
    "statement": "TEXTO: Concordância: 'Fazem dois anos' ou 'Faz dois anos'? Verbo fazer tempo impessoal:",
    "options": [
      "Fazem",
      "Faz (impessoal, não flexiona)",
      "Fazeram",
      "Fazem sempre",
      "Fazem dois anos correto"
    ],
    "correctIndex": 1,
    "explanation": "Fazer tempo impessoal singular.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "concordância"
    ],
    "createdAt": "2026-05-17T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-9",
    "subjectId": "portugues",
    "topicId": "portugues-literatura",
    "statement": "TEXTO: Crase: 'Vou a a escola' + 'a' artigo = à. Quando usar crase em 'Vou à escola'?",
    "options": [
      "Nunca",
      "Sempre que verbo exige a e nome feminino com artigo",
      "Só masculino",
      "Só plural",
      "Aleatório"
    ],
    "correctIndex": 1,
    "explanation": "Fusão preposição+artigo.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "crase"
    ],
    "createdAt": "2026-05-27T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-10",
    "subjectId": "portugues",
    "topicId": "portugues-redacao",
    "statement": "TEXTO: 'Ele viu o filme e chorou' vs 'Ele viu o filme chorando'. Diferença orações?",
    "options": [
      "Iguais",
      "Primeira coordenada aditiva, segunda subordinada adverbial modo ou adjetiva reduzida",
      "Ambas subordinadas",
      "Sem diferença",
      "Primeira subordinada"
    ],
    "correctIndex": 1,
    "explanation": "Coordenada vs reduzida.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "orações"
    ],
    "createdAt": "2026-06-06T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-11",
    "subjectId": "portugues",
    "topicId": "portugues-interpretacao",
    "statement": "TEXTO: Figuras: 'Choveu uma tempestade de likes' Hipérbole exagero. 'Estou morto de fome' também hipérbole. Diferença metáfora?",
    "options": [
      "Iguais",
      "Metáfora comparação implícita, hipérbole exagero",
      "Metáfora exagero",
      "Hipérbole comparação",
      "Sem diferença"
    ],
    "correctIndex": 1,
    "explanation": "Metáfora comparação implícita, hipérbole exagero.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "figuras"
    ],
    "createdAt": "2026-06-16T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-12",
    "subjectId": "portugues",
    "topicId": "portugues-gramatica",
    "statement": "TEXTO: 'O dia amanheceu triste' Prosopopeia atribui sentimento humano a dia. Também chamada:",
    "options": [
      "Metáfora",
      "Personificação",
      "Hipérbole",
      "Eufemismo",
      "Ironia"
    ],
    "correctIndex": 1,
    "explanation": "Prosopopeia=personificação.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "prosopopeia"
    ],
    "createdAt": "2026-06-26T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-13",
    "subjectId": "portugues",
    "topicId": "portugues-figuras",
    "statement": "TEXTO: 'Não foi feliz' para dizer infeliz. Eufemismo ou litote?",
    "options": [
      "Hipérbole",
      "Litote negação do contrário, atenua",
      "Metáfora",
      "Ironia",
      "Pleonasmo"
    ],
    "correctIndex": 1,
    "explanation": "Litote negação contrário.",
    "difficulty": "dificil",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "litote"
    ],
    "createdAt": "2026-07-06T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-14",
    "subjectId": "portugues",
    "topicId": "portugues-literatura",
    "statement": "TEXTO: 'Vozes veladas, veludosas vozes' aliteração v. Função poética Jakobson foca:",
    "options": [
      "Referente",
      "Mensagem e forma",
      "Emissor",
      "Receptor",
      "Canal"
    ],
    "correctIndex": 1,
    "explanation": "Poética foca mensagem forma.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "funções linguagem"
    ],
    "createdAt": "2026-07-16T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-15",
    "subjectId": "portugues",
    "topicId": "portugues-redacao",
    "statement": "TEXTO: Gênero textual: receita, bula, edital são injuntivos/instrucionais. Característica:",
    "options": [
      "Narrar",
      "Instruir como fazer",
      "Descrever",
      "Argumentar",
      "Expor"
    ],
    "correctIndex": 1,
    "explanation": "Injuntivo instrui.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "gênero injuntivo"
    ],
    "createdAt": "2026-07-26T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-16",
    "subjectId": "portugues",
    "topicId": "portugues-interpretacao",
    "statement": "TEXTO: Coesão: 'João saiu. Ele estava atrasado.' Ele retoma João anáfora. Catáfora antecipa: 'Isto me preocupa: sua falta'. Diferença:",
    "options": [
      "Iguais",
      "Anáfora retoma antes, catáfora antecipa depois",
      "Catáfora retoma",
      "Sem diferença",
      "Ambas antecipam"
    ],
    "correctIndex": 1,
    "explanation": "Anáfora retoma, catáfora antecipa.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "coesão"
    ],
    "createdAt": "2026-08-05T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-17",
    "subjectId": "portugues",
    "topicId": "portugues-gramatica",
    "statement": "TEXTO: Intertextualidade: 'No meio do caminho tinha um e-mail' parodia Drummond. Tipo:",
    "options": [
      "Citação",
      "Paródia transformação humorística",
      "Plágio",
      "Sem intertexto",
      "Epígrafe"
    ],
    "correctIndex": 1,
    "explanation": "Paródia.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "intertextualidade"
    ],
    "createdAt": "2026-08-15T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-18",
    "subjectId": "portugues",
    "topicId": "portugues-figuras",
    "statement": "TEXTO: Polissemia: 'banco' assento, instituição financeira, conjunto. Contexto define. Homonímia vs polissemia:",
    "options": [
      "Iguais",
      "Polissemia mesmo étimo sentidos relacionados, homonímia étimos diferentes",
      "Homonímia mesmo étimo",
      "Sem diferença",
      "Polissemia étimos diferentes"
    ],
    "correctIndex": 1,
    "explanation": "Polissemia mesmo étimo.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "polissemia"
    ],
    "createdAt": "2026-08-25T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-19",
    "subjectId": "portugues",
    "topicId": "portugues-literatura",
    "statement": "TEXTO: 'Moro em São Paulo, que é grande' vs 'Moro em São Paulo que é grande' vírgula restritiva. Com vírgula:",
    "options": [
      "Restritiva só SP que é grande",
      "Explicativa todas SP são grandes (explicação)",
      "Iguais",
      "Sem diferença",
      "Restritiva explica"
    ],
    "correctIndex": 1,
    "explanation": "Com vírgula explicativa.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "oração adjetiva"
    ],
    "createdAt": "2026-09-04T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-20",
    "subjectId": "portugues",
    "topicId": "portugues-redacao",
    "statement": "TEXTO: Regência: 'Assistir o filme' vs 'Assistir ao filme' no sentido ver. Norma culta:",
    "options": [
      "Assistir o filme",
      "Assistir ao filme (transitivo indireto)",
      "Ambos errados",
      "Assistir filme sem preposição sempre",
      "Assistir no filme"
    ],
    "correctIndex": 1,
    "explanation": "Assistir ver = VTI ao.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "regência"
    ],
    "createdAt": "2026-09-14T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-21",
    "subjectId": "portugues",
    "topicId": "portugues-interpretacao",
    "statement": "TEXTO: 'A gente vamos' concordância? Norma culta:",
    "options": [
      "A gente vamos correto",
      "A gente vai (a gente 3ª singular)",
      "A gente vão",
      "Vamos a gente",
      "A gente iremos"
    ],
    "correctIndex": 1,
    "explanation": "A gente 3ª singular vai.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "concordância"
    ],
    "createdAt": "2026-09-24T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-22",
    "subjectId": "portugues",
    "topicId": "portugues-gramatica",
    "statement": "TEXTO: Texto dissertativo-argumentativo ENEM precisa tese, argumentos, proposta intervenção. Competência 2:",
    "options": [
      "Só gramática",
      "Compreender tema e não fugir, usar repertório",
      "Só proposta",
      "Só criatividade",
      "Só linhas"
    ],
    "correctIndex": 1,
    "explanation": "C2 tema e repertório.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "redação C2"
    ],
    "createdAt": "2026-10-04T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-23",
    "subjectId": "portugues",
    "topicId": "portugues-figuras",
    "statement": "TEXTO: 'Escrever é cortar palavras' Graciliano. Princípio concisão. Pleonasmo vicioso:",
    "options": [
      "Subir para cima (redundante)",
      "Descer para baixo redundante, mas 'subir' já implica cima",
      "Sair para fora também",
      "Todos pleonasmos viciosos",
      "Nenhum pleonasmo"
    ],
    "correctIndex": 3,
    "explanation": "Subir para cima pleonasmo vicioso.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "pleonasmo"
    ],
    "createdAt": "2026-10-14T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-24",
    "subjectId": "portugues",
    "topicId": "portugues-literatura",
    "statement": "TEXTO: Barroco: antítese, paradoxo, cultismo e conceptismo. Gregório Matos boca do inferno crítica sociedade baiana. Característica:",
    "options": [
      "Equilíbrio",
      "Dualidade, conflito, exagero, religiosidade e mundanidade",
      "Simplicidade",
      "Objetividade",
      "Sem conflito"
    ],
    "correctIndex": 1,
    "explanation": "Barroco dualidade.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "barroco"
    ],
    "createdAt": "2026-10-24T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-25",
    "subjectId": "portugues",
    "topicId": "portugues-redacao",
    "statement": "TEXTO: Arcadismo: volta clássicos, bucolismo, carpe diem, pseudônimos árcades. Bocage x Gonzaga. Arcadismo propõe:",
    "options": [
      "Exagero barroco",
      "Simplicidade, natureza, razão",
      "Subjetividade romântica",
      "Crítica social realista",
      "Vanguarda"
    ],
    "correctIndex": 1,
    "explanation": "Simplicidade bucolismo.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "arcadismo"
    ],
    "createdAt": "2026-11-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-26",
    "subjectId": "portugues",
    "topicId": "portugues-interpretacao",
    "statement": "TEXTO: Romantismo: subjetivismo, nacionalismo, idealização, fuga. Iracema Alencar: índia virgem dos lábios de mel. Iracema anagrama:",
    "options": [
      "America",
      "America anagrama Iracema",
      "Sem anagrama",
      "Brasil",
      "América mesmo"
    ],
    "correctIndex": 1,
    "explanation": "Iracema anagrama America.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "Iracema"
    ],
    "createdAt": "2026-11-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-27",
    "subjectId": "portugues",
    "topicId": "portugues-gramatica",
    "statement": "TEXTO: Realismo vs naturalismo: realismo psicológico (Machado) naturalismo determinista (Aluísio). Diferença foco:",
    "options": [
      "Iguais",
      "Realismo caráter psicológico, naturalismo patologia social e biológica",
      "Realismo idealiza",
      "Naturalismo idealiza",
      "Sem diferença"
    ],
    "correctIndex": 1,
    "explanation": "Realismo psicológico, naturalismo determinista.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "realismo naturalismo"
    ],
    "createdAt": "2026-11-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-28",
    "subjectId": "portugues",
    "topicId": "portugues-figuras",
    "statement": "TEXTO: Parnasianismo: arte pela arte, forma perfeita, metrificação rígida, sem subjetividade. Olavo Bilac 'Ora direis ouvir estrelas'. Característica:",
    "options": [
      "Emoção",
      "Formalismo, impessoalidade",
      "Engajamento",
      "Livre",
      "Subjetivo"
    ],
    "correctIndex": 1,
    "explanation": "Formalismo.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "parnasianismo"
    ],
    "createdAt": "2026-12-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-29",
    "subjectId": "portugues",
    "topicId": "portugues-literatura",
    "statement": "TEXTO: Simbolismo: Cruz e Sousa, musicalidade, sinestesia, transcendência, vago. 'Vozes veladas' simbolismo:",
    "options": [
      "Clareza",
      "Sugestão, sinestesia, musicalidade, misticismo",
      "Objetividade",
      "Narrativa",
      "Sem musicalidade"
    ],
    "correctIndex": 1,
    "explanation": "Sugestão musicalidade.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "simbolismo"
    ],
    "createdAt": "2026-12-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-30",
    "subjectId": "portugues",
    "topicId": "portugues-redacao",
    "statement": "TEXTO: Modernismo 1ª geração 1922: ruptura, verso livre, nacionalismo crítico, antropofagia. Oswald 'Erro de português' brinca com coloquialismo:",
    "options": [
      "Defesa norma culta",
      "Valorização fala brasileira, coloquialismo como identidade",
      "Erro mesmo",
      "Sem proposta",
      "Elogio Portugal"
    ],
    "correctIndex": 1,
    "explanation": "Valorização coloquial brasileiro.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "modernismo"
    ],
    "createdAt": "2026-12-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-31",
    "subjectId": "portugues",
    "topicId": "portugues-interpretacao",
    "statement": "TEXTO: Concretismo 1956: poesia visual, verbivocovisual. Poema 'beba coca cola' Pignatari crítica:",
    "options": [
      "Elogio coca",
      "Crítica consumo e imperialismo, forma visual",
      "Sem crítica",
      "Só forma",
      "Elogio capitalismo"
    ],
    "correctIndex": 1,
    "explanation": "Crítica consumo forma visual.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "concretismo"
    ],
    "createdAt": "2027-01-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-32",
    "subjectId": "portugues",
    "topicId": "portugues-gramatica",
    "statement": "TEXTO: 'Grande Sertão: Veredas' Guimarães Rosa: Riobaldo, jagunço, Diadorim, sertão como mundo, neologismo. Rosa:",
    "options": [
      "Regionalista simples",
      "Regionalismo universal, linguagem inventiva, metafísica",
      "Sem invenção",
      "Só sertão",
      "Realismo simples"
    ],
    "correctIndex": 1,
    "explanation": "Regional universal linguagem inventiva.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "Rosa"
    ],
    "createdAt": "2027-01-12T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-33",
    "subjectId": "portugues",
    "topicId": "portugues-figuras",
    "statement": "TEXTO: Função metalinguística: linguagem fala dela mesma. Exemplo dicionário define palavra usando linguagem. Quando ocorre?",
    "options": [
      "Fala de outro",
      "Código explica código",
      "Emissor foca si",
      "Receptor",
      "Contato"
    ],
    "correctIndex": 1,
    "explanation": "Metalinguística código sobre código.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "metalinguística"
    ],
    "createdAt": "2027-01-22T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-34",
    "subjectId": "portugues",
    "topicId": "portugues-literatura",
    "statement": "TEXTO: Ironia: dizer contrário do que pensa. 'Que ótimo, mais um engarrafamento'. Para entender ironia precisa:",
    "options": [
      "Literal",
      "Contexto e entonação",
      "Só palavra",
      "Sem contexto",
      "Só dicionário"
    ],
    "correctIndex": 1,
    "explanation": "Ironia depende contexto entonação.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "ironia"
    ],
    "createdAt": "2027-02-01T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-35",
    "subjectId": "portugues",
    "topicId": "portugues-redacao",
    "statement": "TEXTO: Ambiguidade: 'Vi o menino com binóculo' quem está com binóculo? Eu ou menino? Ambiguidade é:",
    "options": [
      "Qualidade positiva sempre",
      "Duplo sentido pode ser evitada ou usada estilisticamente",
      "Sempre defeito",
      "Sem efeito",
      "Só erro"
    ],
    "correctIndex": 1,
    "explanation": "Duplo sentido pode ser recurso ou falha.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "ambiguidade"
    ],
    "createdAt": "2027-02-11T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-36",
    "subjectId": "portugues",
    "topicId": "portugues-interpretacao",
    "statement": "TEXTO: Denotação vs conotação: 'pé da mesa' conotação? Na verdade pé literal da mesa denotação, mas 'pé de moleque' doce conotação cultural. Denotação é:",
    "options": [
      "Figurado",
      "Literal dicionário",
      "Só metáfora",
      "Só gíria",
      "Sem sentido"
    ],
    "correctIndex": 1,
    "explanation": "Denotação literal.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "denotação"
    ],
    "createdAt": "2027-02-21T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-37",
    "subjectId": "portugues",
    "topicId": "portugues-gramatica",
    "statement": "TEXTO: Variação linguística: 'tu vai' vs 'você vai', 'mexerica' vs 'bergamota'. Preconceito linguístico Bagno:",
    "options": [
      "Existe falar errado",
      "Toda variedade tem lógica, preconceito é social não linguístico",
      "Só norma culta correta",
      "Variação é erro",
      "Sem variação"
    ],
    "correctIndex": 1,
    "explanation": "Preconceito social não linguístico.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "variação"
    ],
    "createdAt": "2027-03-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-38",
    "subjectId": "portugues",
    "topicId": "portugues-figuras",
    "statement": "TEXTO: Gênero argumentativo: tese, argumentos autoridade, exemplificação, causa consequência. Falácia ad hominem ataca pessoa não argumento. Exemplo falácia:",
    "options": [
      "Dado estatístico",
      "Ele está errado porque é feio",
      "Argumento lógico",
      "Exemplo",
      "Causa"
    ],
    "correctIndex": 1,
    "explanation": "Ad hominem ataca pessoa.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "falácia"
    ],
    "createdAt": "2027-03-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-39",
    "subjectId": "portugues",
    "topicId": "portugues-literatura",
    "statement": "TEXTO: Coerência: texto contraditório perde coerência. 'Estudo à noite, não estudo à noite' incoerente. Coerência vs coesão:",
    "options": [
      "Iguais",
      "Coerência sentido lógico, coesão ligação gramatical",
      "Coesão sentido",
      "Coerência ligação",
      "Sem diferença"
    ],
    "correctIndex": 1,
    "explanation": "Coerência sentido, coesão ligação.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "coerência"
    ],
    "createdAt": "2027-03-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-40",
    "subjectId": "portugues",
    "topicId": "portugues-redacao",
    "statement": "TEXTO: 'Canção do exílio' Gonçalves Dias 'Minha terra tem palmeiras'. Intertexto com 'Canto de regresso à pátria' Drummond 'Minha terra tem palmares'. Drummond faz:",
    "options": [
      "Cópia",
      "Paródia crítica, dessacraliza ufanismo",
      "Elogio igual",
      "Sem intertexto",
      "Plágio"
    ],
    "correctIndex": 1,
    "explanation": "Paródia crítica.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "intertexto"
    ],
    "createdAt": "2027-04-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-41",
    "subjectId": "portugues",
    "topicId": "portugues-interpretacao",
    "statement": "TEXTO: Texto injuntivo: 'Não pise na grama' imperativo negativo. Diferença injuntivo e prescritivo (lei)?",
    "options": [
      "Iguais",
      "Injuntivo instrui fazer, prescritivo ordena lei, ambos usam imperativo",
      "Injuntivo narra",
      "Prescritivo descreve",
      "Sem diferença"
    ],
    "correctIndex": 1,
    "explanation": "Ambos imperativo, injuntivo instrui, prescritivo ordena.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "injuntivo"
    ],
    "createdAt": "2027-04-12T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-42",
    "subjectId": "portugues",
    "topicId": "portugues-gramatica",
    "statement": "TEXTO: 'O povo está com fome' sujeito coletivo singular verbo singular. Concordância com coletivo:",
    "options": [
      "Sempre plural",
      "Singular, mas se especificado 'povo de...' pode plural",
      "Sempre plural",
      "Sem regra",
      "Só plural"
    ],
    "correctIndex": 1,
    "explanation": "Coletivo singular verbo singular.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "coletivo"
    ],
    "createdAt": "2027-04-22T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-43",
    "subjectId": "portugues",
    "topicId": "portugues-figuras",
    "statement": "TEXTO: 'Haja vista' vs 'haja vistas' expressão invariável? Norma:",
    "options": [
      "Haja vistas",
      "Haja vista invariável",
      "Hajam vista",
      "Haja visto",
      "Hajam vistas"
    ],
    "correctIndex": 1,
    "explanation": "Haja vista invariável.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "haja vista"
    ],
    "createdAt": "2027-05-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-44",
    "subjectId": "portugues",
    "topicId": "portugues-literatura",
    "statement": "TEXTO: 'Anexo' vs 'anexo' concordância: 'Segue anexo os documentos' ou 'anexos'? Anexo adjetivo concorda:",
    "options": [
      "Invariável",
      "Concorda: anexos os documentos",
      "Anexo sempre",
      "Anexa",
      "Anexos sempre errado"
    ],
    "correctIndex": 1,
    "explanation": "Anexo adjetivo concorda.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "anexo"
    ],
    "createdAt": "2027-05-12T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-45",
    "subjectId": "portugues",
    "topicId": "portugues-redacao",
    "statement": "TEXTO: 'Obrigado' concordância: homem diz obrigado, mulher obrigada. 'Obrigado' é:",
    "options": [
      "Invariável",
      "Adjetivo concorda com emissor",
      "Concorda com receptor",
      "Sempre obrigado",
      "Sempre obrigada"
    ],
    "correctIndex": 1,
    "explanation": "Concorda emissor.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "obrigado"
    ],
    "createdAt": "2027-05-22T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-46",
    "subjectId": "portugues",
    "topicId": "portugues-interpretacao",
    "statement": "TEXTO: Pontuação: 'Vamos comer, gente' vs 'Vamos comer gente' vírgula vocativo muda sentido canibal. Vírgula pode:",
    "options": [
      "Não mudar sentido",
      "Mudar sentido, salvar vidas",
      "Só enfeite",
      "Sempre igual",
      "Sem função"
    ],
    "correctIndex": 1,
    "explanation": "Vírgula muda sentido.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "pontuação"
    ],
    "createdAt": "2027-06-01T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-47",
    "subjectId": "portugues",
    "topicId": "portugues-gramatica",
    "statement": "TEXTO: Gênero digital: meme, thread, comentário. Meme combina imagem e texto, humor, intertextualidade, viral. Característica central:",
    "options": [
      "Só imagem",
      "Multimodal, humor, intertexto, rápida circulação",
      "Só texto",
      "Formal",
      "Sem humor"
    ],
    "correctIndex": 1,
    "explanation": "Multimodal humor intertexto viral.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "meme"
    ],
    "createdAt": "2027-06-11T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-48",
    "subjectId": "portugues",
    "topicId": "portugues-figuras",
    "statement": "TEXTO: 'No meio do caminho tinha uma pedra' (Drummond). Repetição e coloquialismo, modernismo 1922. Efeito? (variação)",
    "options": [
      "Só literal pedra",
      "Metáfora obstáculo existencial, ironia cotidiano, ruptura com parnasianismo",
      "Sem sentido",
      "Só paisagem",
      "Elogio pedra"
    ],
    "correctIndex": 1,
    "explanation": "Metáfora obstáculo existencial e ruptura parnasiana.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "Drummond",
      "modernismo"
    ],
    "createdAt": "2027-06-21T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-49",
    "subjectId": "portugues",
    "topicId": "portugues-literatura",
    "statement": "TEXTO: 'No meio do caminho tinha uma pedra' (Drummond). Repetição e coloquialismo, modernismo 1922. Efeito? (variação)",
    "options": [
      "Só literal pedra",
      "Metáfora obstáculo existencial, ironia cotidiano, ruptura com parnasianismo",
      "Sem sentido",
      "Só paisagem",
      "Elogio pedra"
    ],
    "correctIndex": 1,
    "explanation": "Metáfora obstáculo existencial e ruptura parnasiana.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "Drummond",
      "modernismo"
    ],
    "createdAt": "2027-07-01T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-portugues-50",
    "subjectId": "portugues",
    "topicId": "portugues-redacao",
    "statement": "TEXTO: 'No meio do caminho tinha uma pedra' (Drummond). Repetição e coloquialismo, modernismo 1922. Efeito? (variação)",
    "options": [
      "Só literal pedra",
      "Metáfora obstáculo existencial, ironia cotidiano, ruptura com parnasianismo",
      "Sem sentido",
      "Só paisagem",
      "Elogio pedra"
    ],
    "correctIndex": 1,
    "explanation": "Metáfora obstáculo existencial e ruptura parnasiana.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "Drummond",
      "modernismo"
    ],
    "createdAt": "2027-07-11T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-1",
    "subjectId": "ingles",
    "topicId": "ingles-reading",
    "statement": "TEXTO: 'Climate change is not just an environmental issue, but a social justice issue. Vulnerable communities suffer most despite contributing least.' Main idea:",
    "options": [
      "Climate change only environmental",
      "Climate change is social justice, vulnerable suffer most",
      "Only rich suffer",
      "No social impact",
      "Justice not related"
    ],
    "correctIndex": 1,
    "explanation": "Texto diz climate change é justiça social, vulneráveis sofrem mais.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "reading",
      "main idea"
    ],
    "createdAt": "2026-04-27T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-2",
    "subjectId": "ingles",
    "topicId": "ingles-tenses",
    "statement": "TEXTO: 'The Amazon rainforest, often called the lungs of the Earth, produces 6% of world's oxygen but its true value is biodiversity and carbon storage.' Lungs metaphor means:",
    "options": [
      "Amazon breathes",
      "Produces oxygen and regulates climate like lungs",
      "Only lungs",
      "No oxygen",
      "Lungs literal"
    ],
    "correctIndex": 1,
    "explanation": "Metáfora pulmões produz O2 regula clima.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "metaphor"
    ],
    "createdAt": "2026-05-07T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-3",
    "subjectId": "ingles",
    "topicId": "ingles-phrasal",
    "statement": "TEXTO: 'She has been studying English for 5 years.' Tense:",
    "options": [
      "Simple present",
      "Present perfect continuous",
      "Past simple",
      "Future",
      "Past perfect"
    ],
    "correctIndex": 1,
    "explanation": "Has been studying present perfect continuous.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "present perfect continuous"
    ],
    "createdAt": "2026-05-17T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-4",
    "subjectId": "ingles",
    "topicId": "ingles-vocabulario",
    "statement": "TEXTO: 'If I were you, I would study more.' Conditional:",
    "options": [
      "Zero conditional",
      "First conditional",
      "Second conditional unreal present",
      "Third conditional",
      "Mixed"
    ],
    "correctIndex": 2,
    "explanation": "Second conditional unreal.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "second conditional"
    ],
    "createdAt": "2026-05-27T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-5",
    "subjectId": "ingles",
    "topicId": "ingles-listening",
    "statement": "TEXTO: 'The book was written by Clarice.' Voice:",
    "options": [
      "Active",
      "Passive",
      "Active continuous",
      "Imperative",
      "Subjunctive"
    ],
    "correctIndex": 1,
    "explanation": "Was written passive.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "passive"
    ],
    "createdAt": "2026-06-06T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-6",
    "subjectId": "ingles",
    "topicId": "ingles-reading",
    "statement": "TEXTO: 'Look up, put off, give up, run out of' are:",
    "options": [
      "Phrasal verbs",
      "Prepositions only",
      "Adverbs",
      "Conjunctions",
      "Nouns"
    ],
    "correctIndex": 0,
    "explanation": "Phrasal verbs.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "phrasal verbs"
    ],
    "createdAt": "2026-06-16T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-7",
    "subjectId": "ingles",
    "topicId": "ingles-tenses",
    "statement": "TEXTO: 'Sustainable development meets present needs without compromising future generations.' (Brundtland). Sustainable means:",
    "options": [
      "Only economic growth",
      "Balancing economic, social, environmental for future",
      "Only environmental",
      "No development",
      "Only present"
    ],
    "correctIndex": 1,
    "explanation": "Sustainable balancing three pillars.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "sustainability"
    ],
    "createdAt": "2026-06-26T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-8",
    "subjectId": "ingles",
    "topicId": "ingles-phrasal",
    "statement": "TEXTO: 'Fake news spreads faster than true news, study shows, because it's more novel and emotional.' Why spreads faster?",
    "options": [
      "More boring",
      "More novel and emotional",
      "More true",
      "Less emotional",
      "No reason"
    ],
    "correctIndex": 1,
    "explanation": "Novel and emotional.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "fake news"
    ],
    "createdAt": "2026-07-06T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-9",
    "subjectId": "ingles",
    "topicId": "ingles-vocabulario",
    "statement": "TEXTO: 'She's used to waking up early.' Used to vs be used to:",
    "options": [
      "Same",
      "Used to past habit, be used to accustomed",
      "Both future",
      "Both past",
      "No difference"
    ],
    "correctIndex": 1,
    "explanation": "Used to past habit, be used to accustomed.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "used to"
    ],
    "createdAt": "2026-07-16T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-10",
    "subjectId": "ingles",
    "topicId": "ingles-listening",
    "statement": "TEXTO: 'Despite raining, we went out. Although it was raining, we went out.' Despite vs although:",
    "options": [
      "Same grammar",
      "Despite + noun/-ing, although + clause",
      "Despite + clause",
      "Although + noun",
      "No difference"
    ],
    "correctIndex": 1,
    "explanation": "Despite noun/ing, although clause.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "conjunctions"
    ],
    "createdAt": "2026-07-26T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-11",
    "subjectId": "ingles",
    "topicId": "ingles-reading",
    "statement": "TEXTO: 'The more you practice, the better you become.' Structure:",
    "options": [
      "Comparative only",
      "The more... the more... correlative comparative",
      "Superlative",
      "Positive",
      "No comparative"
    ],
    "correctIndex": 1,
    "explanation": "Correlative comparative.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "comparative"
    ],
    "createdAt": "2026-08-05T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-12",
    "subjectId": "ingles",
    "topicId": "ingles-tenses",
    "statement": "TEXTO: 'I have never been to Japan.' Present perfect with never indicates:",
    "options": [
      "Specific past time",
      "Experience up to now",
      "Future",
      "Habit",
      "Routine"
    ],
    "correctIndex": 1,
    "explanation": "Experience up to now.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "present perfect"
    ],
    "createdAt": "2026-08-15T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-13",
    "subjectId": "ingles",
    "topicId": "ingles-phrasal",
    "statement": "TEXTO: 'She said she was tired.' Reported speech: direct 'I am tired'. Change:",
    "options": [
      "No change",
      "Am→was, I→she",
      "Am→is",
      "Tired→tiring",
      "No reported"
    ],
    "correctIndex": 1,
    "explanation": "Am→was, I→she.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "reported speech"
    ],
    "createdAt": "2026-08-25T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-14",
    "subjectId": "ingles",
    "topicId": "ingles-vocabulario",
    "statement": "TEXTO: 'Must, should, might, could' are:",
    "options": [
      "Main verbs",
      "Modal verbs expressing possibility/obligation",
      "Nouns",
      "Adjectives",
      "Prepositions"
    ],
    "correctIndex": 1,
    "explanation": "Modals.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "modals"
    ],
    "createdAt": "2026-09-04T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-15",
    "subjectId": "ingles",
    "topicId": "ingles-listening",
    "statement": "TEXTO: 'The company laid off 100 employees due to automation.' Laid off means:",
    "options": [
      "Hired",
      "Dismissed",
      "Promoted",
      "Trained",
      "Paid"
    ],
    "correctIndex": 1,
    "explanation": "Laid off dismissed.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "phrasal verb"
    ],
    "createdAt": "2026-09-14T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-16",
    "subjectId": "ingles",
    "topicId": "ingles-reading",
    "statement": "TEXTO: 'Artificial intelligence will likely transform jobs, but human creativity remains irreplaceable.' Author's stance:",
    "options": [
      "AI will replace all",
      "AI transforms but creativity irreplaceable, balanced",
      "AI useless",
      "No opinion",
      "AI only negative"
    ],
    "correctIndex": 1,
    "explanation": "Balanced transforms but creativity remains.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "reading stance"
    ],
    "createdAt": "2026-09-24T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-17",
    "subjectId": "ingles",
    "topicId": "ingles-tenses",
    "statement": "TEXTO: 'If she had studied, she would have passed.' Third conditional:",
    "options": [
      "Unreal present",
      "Unreal past regret",
      "Real future",
      "Zero",
      "First"
    ],
    "correctIndex": 1,
    "explanation": "Third unreal past.",
    "difficulty": "dificil",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "third conditional"
    ],
    "createdAt": "2026-10-04T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-18",
    "subjectId": "ingles",
    "topicId": "ingles-phrasal",
    "statement": "TEXTO: 'The data is' vs 'The data are'. Data is plural of datum, but common usage singular. Formal academic:",
    "options": [
      "Always singular",
      "Plural are more formal",
      "Both wrong",
      "Always is",
      "No rule"
    ],
    "correctIndex": 1,
    "explanation": "Formal plural are.",
    "difficulty": "medio",
    "source": "UNICAMP 2021 - Inspirada",
    "tags": [
      "data"
    ],
    "createdAt": "2026-10-14T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-19",
    "subjectId": "ingles",
    "topicId": "ingles-vocabulario",
    "statement": "TEXTO: 'Biodiversity loss is accelerating. One million species threatened.' Threatened means:",
    "options": [
      "Safe",
      "At risk extinction",
      "Increasing",
      "New",
      "Discovered"
    ],
    "correctIndex": 1,
    "explanation": "Threatened at risk.",
    "difficulty": "facil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "vocabulary"
    ],
    "createdAt": "2026-10-24T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-20",
    "subjectId": "ingles",
    "topicId": "ingles-listening",
    "statement": "TEXTO: 'He speaks English fluently, albeit with an accent.' Albeit means:",
    "options": [
      "Because",
      "Although",
      "Therefore",
      "Moreover",
      "Instead"
    ],
    "correctIndex": 1,
    "explanation": "Albeit although.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "albeit"
    ],
    "createdAt": "2026-11-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-21",
    "subjectId": "ingles",
    "topicId": "ingles-reading",
    "statement": "TEXTO: 'The report, which was published yesterday, shows increase.' Which clause:",
    "options": [
      "Defining essential",
      "Non-defining extra with commas",
      "No clause",
      "Noun clause",
      "Adverbial"
    ],
    "correctIndex": 1,
    "explanation": "Non-defining extra commas.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "relative clause"
    ],
    "createdAt": "2026-11-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-22",
    "subjectId": "ingles",
    "topicId": "ingles-tenses",
    "statement": "TEXTO: 'I wish I were taller.' Wish + past subjunctive:",
    "options": [
      "Real present",
      "Unreal present wish",
      "Past fact",
      "Future",
      "No wish"
    ],
    "correctIndex": 1,
    "explanation": "Unreal present wish.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "wish"
    ],
    "createdAt": "2026-11-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-23",
    "subjectId": "ingles",
    "topicId": "ingles-phrasal",
    "statement": "TEXTO: 'She stopped smoking' vs 'She stopped to smoke'. Difference:",
    "options": [
      "Same",
      "Stopped smoking quit, stopped to smoke paused to smoke",
      "Both quit",
      "Both paused",
      "No difference"
    ],
    "correctIndex": 1,
    "explanation": "Stop +ing quit, stop to infinitive pause to do.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "gerund infinitive"
    ],
    "createdAt": "2026-12-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-24",
    "subjectId": "ingles",
    "topicId": "ingles-vocabulario",
    "statement": "TEXTO: 'The more, the merrier.' Means:",
    "options": [
      "Less better",
      "More people/things more fun",
      "Less fun",
      "No meaning",
      "Merrier less"
    ],
    "correctIndex": 1,
    "explanation": "More merrier.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "proverb"
    ],
    "createdAt": "2026-12-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-25",
    "subjectId": "ingles",
    "topicId": "ingles-listening",
    "statement": "TEXTO: 'Social media can both connect and isolate.' Both... and is:",
    "options": [
      "Correlative conjunction",
      "Subordinating",
      "Preposition",
      "Adverb",
      "Noun"
    ],
    "correctIndex": 0,
    "explanation": "Correlative.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "correlative"
    ],
    "createdAt": "2026-12-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-26",
    "subjectId": "ingles",
    "topicId": "ingles-reading",
    "statement": "TEXTO: 'He is said to be rich.' Structure:",
    "options": [
      "Active",
      "Passive with infinitive",
      "Active perfect",
      "Imperative",
      "Gerund"
    ],
    "correctIndex": 1,
    "explanation": "Passive with to be rich.",
    "difficulty": "dificil",
    "source": "UNICAMP 2022 - Inspirada",
    "tags": [
      "passive infinitive"
    ],
    "createdAt": "2027-01-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-27",
    "subjectId": "ingles",
    "topicId": "ingles-tenses",
    "statement": "TEXTO: 'No matter how hard he tries, he fails.' No matter =:",
    "options": [
      "Because",
      "Regardless",
      "Therefore",
      "Although as concessive",
      "If"
    ],
    "correctIndex": 1,
    "explanation": "No matter regardless concessive.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "no matter"
    ],
    "createdAt": "2027-01-12T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-28",
    "subjectId": "ingles",
    "topicId": "ingles-phrasal",
    "statement": "TEXTO: 'The book is worth reading.' Worth + gerund:",
    "options": [
      "Worth + infinitive",
      "Worth + gerund",
      "Worth + past",
      "Worth + noun only",
      "No gerund"
    ],
    "correctIndex": 1,
    "explanation": "Worth gerund.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "worth"
    ],
    "createdAt": "2027-01-22T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-29",
    "subjectId": "ingles",
    "topicId": "ingles-vocabulario",
    "statement": "TEXTO: 'I look forward to hearing from you.' Look forward to +:",
    "options": [
      "Infinitive",
      "Gerund",
      "Past",
      "Base",
      "Future"
    ],
    "correctIndex": 1,
    "explanation": "To is preposition + gerund.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "look forward to"
    ],
    "createdAt": "2027-02-01T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-30",
    "subjectId": "ingles",
    "topicId": "ingles-listening",
    "statement": "TEXTO: 'The climate crisis demands urgent action. Governments must act now.' Must indicates:",
    "options": [
      "Possibility",
      "Obligation necessity",
      "Past",
      "No obligation",
      "Question"
    ],
    "correctIndex": 1,
    "explanation": "Must obligation.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "must"
    ],
    "createdAt": "2027-02-11T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-31",
    "subjectId": "ingles",
    "topicId": "ingles-reading",
    "statement": "TEXTO: 'She has a lot of work, doesn't she?' Tag question:",
    "options": [
      "Doesn't she? for positive sentence",
      "Does she?",
      "Has she?",
      "Isn't she?",
      "Don't she?"
    ],
    "correctIndex": 0,
    "explanation": "Positive statement negative tag.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "tag question"
    ],
    "createdAt": "2027-02-21T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-32",
    "subjectId": "ingles",
    "topicId": "ingles-tenses",
    "statement": "TEXTO: 'The city was built in 1900.' In 1900 preposition for year:",
    "options": [
      "On 1900",
      "In 1900",
      "At 1900",
      "By 1900",
      "For 1900"
    ],
    "correctIndex": 1,
    "explanation": "In year.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "preposition time"
    ],
    "createdAt": "2027-03-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-33",
    "subjectId": "ingles",
    "topicId": "ingles-phrasal",
    "statement": "TEXTO: 'He arrived at the station' vs 'arrived in London'. At vs in:",
    "options": [
      "Same",
      "At small place station, in large city/country",
      "At large, in small",
      "No difference",
      "Both at"
    ],
    "correctIndex": 1,
    "explanation": "At small, in large.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "preposition place"
    ],
    "createdAt": "2027-03-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-34",
    "subjectId": "ingles",
    "topicId": "ingles-vocabulario",
    "statement": "TEXTO: 'The movie was so boring that I fell asleep.' So... that result:",
    "options": [
      "Cause only",
      "Result clause",
      "Purpose",
      "Condition",
      "Time"
    ],
    "correctIndex": 1,
    "explanation": "So that result.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "so that"
    ],
    "createdAt": "2027-03-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-35",
    "subjectId": "ingles",
    "topicId": "ingles-listening",
    "statement": "TEXTO: 'I have been to London' vs 'I have gone to London'. Been vs gone:",
    "options": [
      "Same",
      "Been went and returned, gone went and still there",
      "Gone returned",
      "Been still there",
      "No difference"
    ],
    "correctIndex": 1,
    "explanation": "Been returned, gone still there.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "been gone"
    ],
    "createdAt": "2027-04-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-36",
    "subjectId": "ingles",
    "topicId": "ingles-reading",
    "statement": "TEXTO: 'The less you spend, the more you save.' The less... the more is:",
    "options": [
      "Comparative correlative inverse",
      "Superlative",
      "Positive",
      "No comparative",
      "Past"
    ],
    "correctIndex": 0,
    "explanation": "Correlative comparative inverse.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "correlative comparative"
    ],
    "createdAt": "2027-04-12T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-37",
    "subjectId": "ingles",
    "topicId": "ingles-tenses",
    "statement": "TEXTO: 'She is interested in learning.' Interested in + gerund, interesting describes thing. -ed vs -ing adjectives:",
    "options": [
      "Same",
      "-ed person feeling, -ing thing causing feeling",
      "-ed thing",
      "-ing person",
      "No difference"
    ],
    "correctIndex": 1,
    "explanation": "-ed feeling, -ing causing.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "-ed -ing"
    ],
    "createdAt": "2027-04-22T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-38",
    "subjectId": "ingles",
    "topicId": "ingles-phrasal",
    "statement": "TEXTO: 'The government is to announce new measures.' Be to + infinitive indicates:",
    "options": [
      "Past",
      "Future plan/official",
      "Possibility",
      "No future",
      "Past habit"
    ],
    "correctIndex": 1,
    "explanation": "Be to future official.",
    "difficulty": "dificil",
    "source": "UNICAMP 2021 - Inspirada",
    "tags": [
      "be to"
    ],
    "createdAt": "2027-05-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-39",
    "subjectId": "ingles",
    "topicId": "ingles-vocabulario",
    "statement": "TEXTO: 'Many people, especially young ones, suffer anxiety due to social media comparison.' Especially means:",
    "options": [
      "In general",
      "Particularly",
      "Never",
      "Always",
      "No meaning"
    ],
    "correctIndex": 1,
    "explanation": "Especially particularly.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "especially"
    ],
    "createdAt": "2027-05-12T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-40",
    "subjectId": "ingles",
    "topicId": "ingles-listening",
    "statement": "TEXTO: 'The Amazon deforestation reached 10,000 km² last year.' Reached indicates:",
    "options": [
      "Decrease",
      "Achieved level",
      "No level",
      "Future",
      "Past only"
    ],
    "correctIndex": 1,
    "explanation": "Reached achieved level.",
    "difficulty": "facil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "reached"
    ],
    "createdAt": "2027-05-22T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-41",
    "subjectId": "ingles",
    "topicId": "ingles-reading",
    "statement": "TEXTO: 'We need to take action on climate change.' Take action on means:",
    "options": [
      "Ignore",
      "Act about",
      "Watch",
      "Forget",
      "No action"
    ],
    "correctIndex": 1,
    "explanation": "Take action act.",
    "difficulty": "facil",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "take action"
    ],
    "createdAt": "2027-06-01T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-42",
    "subjectId": "ingles",
    "topicId": "ingles-tenses",
    "statement": "TEXTO: 'The study was carried out by researchers.' Carried out means:",
    "options": [
      "Canceled",
      "Conducted",
      "Carried",
      "Ignored",
      "Delayed"
    ],
    "correctIndex": 1,
    "explanation": "Carried out conducted.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "phrasal verb"
    ],
    "createdAt": "2027-06-11T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-43",
    "subjectId": "ingles",
    "topicId": "ingles-phrasal",
    "statement": "TEXTO: 'The results were rather surprising.' Rather means:",
    "options": [
      "Very, quite",
      "No",
      "Never",
      "Always",
      "Not"
    ],
    "correctIndex": 0,
    "explanation": "Rather quite.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "rather"
    ],
    "createdAt": "2027-06-21T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-44",
    "subjectId": "ingles",
    "topicId": "ingles-vocabulario",
    "statement": "TEXTO: 'The policy aims at reducing inequality.' Aims at + gerund means:",
    "options": [
      "Ignores",
      "Targets",
      "Finishes",
      "Starts",
      "No aim"
    ],
    "correctIndex": 1,
    "explanation": "Aims at targets.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "aim at"
    ],
    "createdAt": "2027-07-01T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-45",
    "subjectId": "ingles",
    "topicId": "ingles-listening",
    "statement": "TEXTO: 'The city has a population of 12 million.' Has a population of means:",
    "options": [
      "No people",
      "Contains number inhabitants",
      "Future",
      "Past",
      "No population"
    ],
    "correctIndex": 1,
    "explanation": "Has population contains.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "population"
    ],
    "createdAt": "2027-07-11T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-46",
    "subjectId": "ingles",
    "topicId": "ingles-reading",
    "statement": "TEXTO: 'The book deals with environmental issues.' Deals with means:",
    "options": [
      "Ignores",
      "Addresses, is about",
      "Sells",
      "Buys",
      "No deal"
    ],
    "correctIndex": 1,
    "explanation": "Deals with addresses.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "deal with"
    ],
    "createdAt": "2027-07-21T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-47",
    "subjectId": "ingles",
    "topicId": "ingles-tenses",
    "statement": "TEXTO: 'The students were able to solve the problem.' Were able to =:",
    "options": [
      "Could always",
      "Managed to, succeeded",
      "Could not",
      "Will be able",
      "No ability"
    ],
    "correctIndex": 1,
    "explanation": "Managed to.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "be able to"
    ],
    "createdAt": "2027-07-31T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-48",
    "subjectId": "ingles",
    "topicId": "ingles-phrasal",
    "statement": "TEXTO: 'The lecture was given by a renowned professor.' Renowned means:",
    "options": [
      "Unknown",
      "Famous respected",
      "Poor",
      "Young",
      "Old"
    ],
    "correctIndex": 1,
    "explanation": "Renowned famous.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "renowned"
    ],
    "createdAt": "2027-08-10T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-49",
    "subjectId": "ingles",
    "topicId": "ingles-vocabulario",
    "statement": "TEXTO: 'The project was put forward by the committee.' Put forward means:",
    "options": [
      "Canceled",
      "Proposed",
      "Delayed",
      "Ignored",
      "Finished"
    ],
    "correctIndex": 1,
    "explanation": "Put forward proposed.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "put forward"
    ],
    "createdAt": "2027-08-20T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-ingles-50",
    "subjectId": "ingles",
    "topicId": "ingles-listening",
    "statement": "TEXTO: 'The team came up with a solution.' Came up with means:",
    "options": [
      "Ignored",
      "Created, thought of",
      "Destroyed",
      "Forgot",
      "Lost"
    ],
    "correctIndex": 1,
    "explanation": "Came up with created.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "come up with"
    ],
    "createdAt": "2027-08-30T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-1",
    "subjectId": "filosofia",
    "topicId": "filosofia-gregos",
    "statement": "TEXTO: 'Só sei que nada sei' (Sócrates). Método socrático ironia e maiêutica. Significa:",
    "options": [
      "Ignorância total",
      "Consciência da própria ignorância como início sabedoria, questiona",
      "Sabe tudo",
      "Ceticismo absoluto sem busca",
      "Sem método"
    ],
    "correctIndex": 1,
    "explanation": "Sócrates consciência ignorância início busca.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "Sócrates"
    ],
    "createdAt": "2026-06-16T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-2",
    "subjectId": "filosofia",
    "topicId": "filosofia-idade-media",
    "statement": "TEXTO: Platão: mundo sensível cópia imperfeita mundo inteligível Ideias. Mito caverna: prisioneiros veem sombras, filósofo sai vê sol (Ideia Bem). Conhecimento é:",
    "options": [
      "Só sentidos",
      "Reminiscência Ideias, razão",
      "Só opinião",
      "Impossível",
      "Só sombras"
    ],
    "correctIndex": 1,
    "explanation": "Platão reminiscência Ideias razão.",
    "difficulty": "dificil",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "Platão",
      "caverna"
    ],
    "createdAt": "2026-06-26T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-3",
    "subjectId": "filosofia",
    "topicId": "filosofia-etica",
    "statement": "TEXTO: Aristóteles: homem animal político, pólis anterior indivíduo, eudaimonia felicidade por virtude hábito. Ética a Nicômaco virtude meio-termo entre vícios. Exemplo coragem meio-termo entre:",
    "options": [
      "Covardia e temeridade",
      "Generosidade e avareza",
      "Verdade e mentira",
      "Sem meio-termo",
      "Só extremos"
    ],
    "correctIndex": 0,
    "explanation": "Coragem meio covardia temeridade.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "Aristóteles",
      "virtude"
    ],
    "createdAt": "2026-07-06T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-4",
    "subjectId": "filosofia",
    "topicId": "filosofia-epistemologia",
    "statement": "TEXTO: Agostinho: Cidade Deus vs Cidade Homens, tempo interior, mal ausência bem. Concilia fé e razão platônica:",
    "options": [
      "Razão sem fé",
      "Fé ilumina razão, platonismo cristão",
      "Fé contra razão",
      "Sem conciliação",
      "Só razão"
    ],
    "correctIndex": 1,
    "explanation": "Agostinho fé ilumina razão.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "Agostinho"
    ],
    "createdAt": "2026-07-16T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-5",
    "subjectId": "filosofia",
    "topicId": "filosofia-politica",
    "statement": "TEXTO: Tomás Aquino: 5 vias prova Deus, fé e razão aristotélica compatíveis, razão pode provar Deus. Diferença Agostinho:",
    "options": [
      "Iguais",
      "Aquino aristotelismo razão mais autônoma, Agostinho platonismo fé ilumina",
      "Aquino sem razão",
      "Agostinho aristotélico",
      "Sem diferença"
    ],
    "correctIndex": 1,
    "explanation": "Aquino aristotélico razão autônoma.",
    "difficulty": "dificil",
    "source": "UNICAMP 2021 - Inspirada",
    "tags": [
      "Aquino"
    ],
    "createdAt": "2026-07-26T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-6",
    "subjectId": "filosofia",
    "topicId": "filosofia-gregos",
    "statement": "TEXTO: Descartes: dúvida metódica duvida tudo até cogito 'Penso logo existo' indubitável. Método: evidência, análise, síntese, enumeração. Objetivo:",
    "options": [
      "Ceticismo total",
      "Fundar ciência segura com base indubitável",
      "Fé",
      "Sem método",
      "Só dúvida"
    ],
    "correctIndex": 1,
    "explanation": "Fundar ciência segura.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "Descartes"
    ],
    "createdAt": "2026-08-05T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-7",
    "subjectId": "filosofia",
    "topicId": "filosofia-idade-media",
    "statement": "TEXTO: Bacon: ídolos mente (tribo, caverna, foro, teatro) atrapalham conhecimento, método indutivo experimentação. Idolos tribo:",
    "options": [
      "Pessoais",
      "Da natureza humana comum a todos",
      "Linguagem",
      "Filosofia",
      "Sem ídolo"
    ],
    "correctIndex": 1,
    "explanation": "Tribo natureza humana.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "Bacon"
    ],
    "createdAt": "2026-08-15T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-8",
    "subjectId": "filosofia",
    "topicId": "filosofia-etica",
    "statement": "TEXTO: Locke: tábula rasa, conhecimento vem experiência, qualidades primárias objetivas (extensão) secundárias subjetivas (cor). Empirismo:",
    "options": [
      "Ideias inatas",
      "Mente vazia experiência",
      "Só razão",
      "Inatismo",
      "Sem experiência"
    ],
    "correctIndex": 1,
    "explanation": "Tábula rasa experiência.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "Locke"
    ],
    "createdAt": "2026-08-25T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-9",
    "subjectId": "filosofia",
    "topicId": "filosofia-epistemologia",
    "statement": "TEXTO: Hume: hábito e costume, causalidade não é racional mas hábito, ceticismo. Crítica causalidade:",
    "options": [
      "Causa racional evidente",
      "Não vemos causa só conjunção constante, hábito",
      "Causa inata",
      "Sem crítica",
      "Causa divina"
    ],
    "correctIndex": 1,
    "explanation": "Hume conjunção constante hábito.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "Hume"
    ],
    "createdAt": "2026-09-04T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-10",
    "subjectId": "filosofia",
    "topicId": "filosofia-politica",
    "statement": "TEXTO: Kant: revolução copernicana, mente estrutura experiência com formas a priori espaço tempo e categorias. Fenômeno vs coisa em si (númeno). Conhecemos:",
    "options": [
      "Coisa em si direto",
      "Fenômeno estruturado pela mente, coisa em si incognoscível",
      "Nada",
      "Só coisa em si",
      "Só sentidos sem mente"
    ],
    "correctIndex": 1,
    "explanation": "Kant fenômeno sim coisa em si não.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "Kant"
    ],
    "createdAt": "2026-09-14T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-11",
    "subjectId": "filosofia",
    "topicId": "filosofia-gregos",
    "statement": "TEXTO: Kant ética: imperativo categórico 'Age só segundo máxima que possas querer lei universal'. Ética deontológica dever, não consequência. Diferente utilitarismo que foca consequência. Kant foca:",
    "options": [
      "Consequência",
      "Dever e intenção universalizável",
      "Prazer",
      "Utilidade",
      "Emoção"
    ],
    "correctIndex": 1,
    "explanation": "Kant dever intenção.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "Kant ética"
    ],
    "createdAt": "2026-09-24T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-12",
    "subjectId": "filosofia",
    "topicId": "filosofia-idade-media",
    "statement": "TEXTO: Rousseau: estado natureza bom selvagem, sociedade corrompe com propriedade privada, contrato social vontade geral. Vontade geral vs vontade todos:",
    "options": [
      "Iguais",
      "Vontade geral interesse comum, vontade todos soma interesses particulares",
      "Vontade todos comum",
      "Geral particular",
      "Sem diferença"
    ],
    "correctIndex": 1,
    "explanation": "Geral comum, todos soma particulares.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "Rousseau"
    ],
    "createdAt": "2026-10-04T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-13",
    "subjectId": "filosofia",
    "topicId": "filosofia-etica",
    "statement": "TEXTO: Maquiavel: política autonomia, virtù (habilidade) e fortuna (sorte), fins justificam meios, príncipe deve parecer virtuoso mas ser flexível. Quebra:",
    "options": [
      "Política moral cristã",
      "Tradição política moral cristã, seculariza política",
      "Sem quebra",
      "Moral igual política",
      "Só moral"
    ],
    "correctIndex": 1,
    "explanation": "Seculariza política.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "Maquiavel"
    ],
    "createdAt": "2026-10-14T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-14",
    "subjectId": "filosofia",
    "topicId": "filosofia-epistemologia",
    "statement": "TEXTO: Hobbes: estado natureza guerra todos contra todos, vida solitária pobre brutal curta, contrato Leviatã Estado absoluto segurança. Medo:",
    "options": [
      "Amor",
      "Medo morte violenta leva contrato",
      "Sem medo",
      "Só amor",
      "Só razão sem medo"
    ],
    "correctIndex": 1,
    "explanation": "Medo morte violenta.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "Hobbes"
    ],
    "createdAt": "2026-10-24T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-15",
    "subjectId": "filosofia",
    "topicId": "filosofia-politica",
    "statement": "TEXTO: Locke político: estado natureza liberdade mas inseguro propriedade, contrato liberal direitos naturais vida liberdade propriedade, direito resistência. Diferente Hobbes:",
    "options": [
      "Iguais absolutos",
      "Locke liberal resistência, Hobbes absoluto sem resistência",
      "Hobbes liberal",
      "Locke absoluto",
      "Sem diferença"
    ],
    "correctIndex": 1,
    "explanation": "Locke liberal resistência.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "Locke político"
    ],
    "createdAt": "2026-11-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-16",
    "subjectId": "filosofia",
    "topicId": "filosofia-gregos",
    "statement": "TEXTO: Montesquieu: separação poderes Executivo Legislativo Judiciário freios contrapesos evita tirania. Influência:",
    "options": [
      "Absolutismo",
      "Constituições modernas EUA 1787 Brasil 1988",
      "Sem influência",
      "Monarquia absoluta",
      "Ditadura"
    ],
    "correctIndex": 1,
    "explanation": "Influência constituições.",
    "difficulty": "medio",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "Montesquieu"
    ],
    "createdAt": "2026-11-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-17",
    "subjectId": "filosofia",
    "topicId": "filosofia-idade-media",
    "statement": "TEXTO: Nietzsche: 'Deus está morto', crítica moral escrava ressentimento, além-homem, vontade potência, eterno retorno. Deus morto significa:",
    "options": [
      "Deus morreu literal",
      "Fim valores absolutos metafísicos, niilismo, precisa criar valores",
      "Deus vivo",
      "Sem sentido",
      "Só ateísmo simples"
    ],
    "correctIndex": 1,
    "explanation": "Fim valores absolutos niilismo.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "Nietzsche"
    ],
    "createdAt": "2026-11-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-18",
    "subjectId": "filosofia",
    "topicId": "filosofia-etica",
    "statement": "TEXTO: Marx: infraestrutura (forças produtivas + relações produção) determina superestrutura (ideologia, Estado). Ideologia mascara dominação. Materialismo histórico:",
    "options": [
      "Ideia determina matéria",
      "Matéria, economia determina ideias",
      "Sem determinação",
      "Ideia pura",
      "Sem materialismo"
    ],
    "correctIndex": 1,
    "explanation": "Infra determina super.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "Marx"
    ],
    "createdAt": "2026-12-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-19",
    "subjectId": "filosofia",
    "topicId": "filosofia-epistemologia",
    "statement": "TEXTO: Marx mais-valia: trabalhador produz valor maior que salário, diferença mais-valia apropriada burguês. Exploração. Mais-valia absoluta vs relativa:",
    "options": [
      "Iguais",
      "Absoluta aumenta jornada, relativa aumenta produtividade tecnologia",
      "Absoluta tecnologia",
      "Relativa jornada",
      "Sem diferença"
    ],
    "correctIndex": 1,
    "explanation": "Absoluta jornada, relativa produtividade.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "mais-valia"
    ],
    "createdAt": "2026-12-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-20",
    "subjectId": "filosofia",
    "topicId": "filosofia-politica",
    "statement": "TEXTO: Escola Frankfurt: Adorno e Horkheimer crítica razão instrumental que domina natureza e homem, indústria cultural padroniza. Razão instrumental vs emancipatória:",
    "options": [
      "Iguais",
      "Instrumental dominação, emancipatória libertação",
      "Instrumental liberta",
      "Sem diferença",
      "Só instrumental"
    ],
    "correctIndex": 1,
    "explanation": "Instrumental domina, emancipatória liberta.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "Frankfurt"
    ],
    "createdAt": "2026-12-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-21",
    "subjectId": "filosofia",
    "topicId": "filosofia-gregos",
    "statement": "TEXTO: Foucault: poder não só repressivo mas produtivo, microfísica, disciplina corpos (vigiar e punir), biopolítica controla população. Poder para Foucault:",
    "options": [
      "Só Estado",
      "Difuso, em toda relação, produz saber",
      "Só repressivo",
      "Não existe",
      "Só econômico"
    ],
    "correctIndex": 1,
    "explanation": "Poder difuso produtivo.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "Foucault"
    ],
    "createdAt": "2027-01-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-22",
    "subjectId": "filosofia",
    "topicId": "filosofia-idade-media",
    "statement": "TEXTO: Sartre existencialismo: existência precede essência, homem condenado livre, angústia escolha, má-fé fugir liberdade. Exemplo má-fé:",
    "options": [
      "Assumir liberdade",
      "Garçom age como coisa, finge não ter escolha",
      "Ser autêntico",
      "Liberdade total assumida",
      "Sem má-fé"
    ],
    "correctIndex": 1,
    "explanation": "Má-fé fugir liberdade.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "Sartre"
    ],
    "createdAt": "2027-01-12T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-23",
    "subjectId": "filosofia",
    "topicId": "filosofia-etica",
    "statement": "TEXTO: Simone de Beauvoir: 'Não se nasce mulher, torna-se', gênero construção social, segundo sexo. Feminismo existencialista:",
    "options": [
      "Biologia determina",
      "Gênero social, opressão histórica",
      "Sem opressão",
      "Biologia destino",
      "Sem construção"
    ],
    "correctIndex": 1,
    "explanation": "Gênero construção social.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "Beauvoir"
    ],
    "createdAt": "2027-01-22T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-24",
    "subjectId": "filosofia",
    "topicId": "filosofia-epistemologia",
    "statement": "TEXTO: Hannah Arendt: banalidade mal Eichmann burocrata cumpre ordens sem pensar, vita activa labor obra ação, espaço público. Banalidade mal:",
    "options": [
      "Mal demoníaco",
      "Mal por falta pensamento, burocracia sem reflexão",
      "Mal inexistente",
      "Só ódio",
      "Mal natural"
    ],
    "correctIndex": 1,
    "explanation": "Mal falta pensamento.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "Arendt"
    ],
    "createdAt": "2027-02-01T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-25",
    "subjectId": "filosofia",
    "topicId": "filosofia-politica",
    "statement": "TEXTO: Habermas: agir comunicativo vs estratégico, esfera pública debate racional busca consenso. Crise esfera pública quando:",
    "options": [
      "Debate racional",
      "Mídia manipulada, dinheiro e poder colonizam",
      "Sem crise",
      "Só consenso",
      "Sem mídia"
    ],
    "correctIndex": 1,
    "explanation": "Colonização por dinheiro poder.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "Habermas"
    ],
    "createdAt": "2027-02-11T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-26",
    "subjectId": "filosofia",
    "topicId": "filosofia-gregos",
    "statement": "TEXTO: Ética utilitarista Bentham e Mill: maior felicidade maior número, consequencialista. Crítica:",
    "options": [
      "Sem crítica",
      "Pode justificar sacrificar minoria por maioria",
      "Sempre justo",
      "Sem consequência",
      "Deontológica"
    ],
    "correctIndex": 1,
    "explanation": "Crítica sacrificar minoria.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "utilitarismo"
    ],
    "createdAt": "2027-02-21T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-27",
    "subjectId": "filosofia",
    "topicId": "filosofia-idade-media",
    "statement": "TEXTO: Bioética: principialismo Beauchamp Childress autonomia, beneficência, não maleficência, justiça. Autonomia paciente:",
    "options": [
      "Médico decide tudo",
      "Paciente decide informado, consentimento",
      "Família decide sempre",
      "Sem autonomia",
      "Só beneficência"
    ],
    "correctIndex": 1,
    "explanation": "Autonomia consentimento informado.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "bioética"
    ],
    "createdAt": "2027-03-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-28",
    "subjectId": "filosofia",
    "topicId": "filosofia-etica",
    "statement": "TEXTO: Epistemologia: ceticismo pirrônico suspende juízo. Dogmatismo afirma verdade. Pirro epoché:",
    "options": [
      "Afirma verdade",
      "Suspende juízo para tranquilidade ataraxia",
      "Nega tudo",
      "Afirma tudo",
      "Sem suspensão"
    ],
    "correctIndex": 1,
    "explanation": "Epoché suspensão.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "ceticismo"
    ],
    "createdAt": "2027-03-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-29",
    "subjectId": "filosofia",
    "topicId": "filosofia-epistemologia",
    "statement": "TEXTO: Lógica: silogismo 'Todo homem mortal, Sócrates homem, logo Sócrates mortal' válido. Falácia 'Todo brasileiro feliz, João feliz logo brasileiro' inválida porque:",
    "options": [
      "Válida",
      "Afirmação consequente, meio termo não distribuído",
      "Válida sempre",
      "Sem falácia",
      "Correta"
    ],
    "correctIndex": 1,
    "explanation": "Falácia afirmação consequente.",
    "difficulty": "dificil",
    "source": "UNICAMP 2021 - Inspirada",
    "tags": [
      "lógica"
    ],
    "createdAt": "2027-03-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-30",
    "subjectId": "filosofia",
    "topicId": "filosofia-politica",
    "statement": "TEXTO: Estética: belo para Platão Ideia, para Kant subjetivo universal sem conceito, para Adorno crítica social. Kant belo:",
    "options": [
      "Objetivo Ideia",
      "Subjetivo universal, desinteressado",
      "Só agradável",
      "Só útil",
      "Sem subjetividade"
    ],
    "correctIndex": 1,
    "explanation": "Kant subjetivo universal desinteressado.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "estética"
    ],
    "createdAt": "2027-04-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-31",
    "subjectId": "filosofia",
    "topicId": "filosofia-gregos",
    "statement": "TEXTO: Filosofia africana: etnofilosofia, sage philosophy, Ubuntu 'sou porque nós somos'. Ubuntu:",
    "options": [
      "Individualismo",
      "Comunalismo, interdependência",
      "Sem filosofia",
      "Só ocidental",
      "Individual"
    ],
    "correctIndex": 1,
    "explanation": "Ubuntu comunal.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "Ubuntu"
    ],
    "createdAt": "2027-04-12T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-32",
    "subjectId": "filosofia",
    "topicId": "filosofia-idade-media",
    "statement": "TEXTO: Filosofia indígena: bem viver, Pachamama, sumak kawsay. Diferente desenvolvimento ocidental porque:",
    "options": [
      "Igual desenvolvimento",
      "Harmonia natureza, não crescimento infinito",
      "Só crescimento",
      "Sem natureza",
      "Desenvolvimento infinito"
    ],
    "correctIndex": 1,
    "explanation": "Harmonia não crescimento infinito.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "bem viver"
    ],
    "createdAt": "2027-04-22T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-33",
    "subjectId": "filosofia",
    "topicId": "filosofia-etica",
    "statement": "TEXTO: Wittgenstein: Tractatus linguagem figura mundo, depois jogos linguagem, significado uso. Virada linguística:",
    "options": [
      "Linguagem espelho fixo",
      "Significado uso, jogos linguagem",
      "Sem virada",
      "Só Tractatus",
      "Linguagem sem uso"
    ],
    "correctIndex": 1,
    "explanation": "Significado uso.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "Wittgenstein"
    ],
    "createdAt": "2027-05-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-34",
    "subjectId": "filosofia",
    "topicId": "filosofia-epistemologia",
    "statement": "TEXTO: Popper: falseabilidade critério demarcação ciência, não verificabilidade. Teoria científica deve ser:",
    "options": [
      "Verificável sempre",
      "Falseável, pode ser refutada",
      "Não falseável",
      "Metafísica",
      "Sem critério"
    ],
    "correctIndex": 1,
    "explanation": "Falseável.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "Popper"
    ],
    "createdAt": "2027-05-12T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-35",
    "subjectId": "filosofia",
    "topicId": "filosofia-politica",
    "statement": "TEXTO: Kuhn: paradigma, ciência normal, anomalia, crise, revolução, incomensurabilidade. Paradigma:",
    "options": [
      "Só teoria",
      "Conjunto crenças, valores, técnicas comunidade científica",
      "Sem paradigma",
      "Só método",
      "Anomalia"
    ],
    "correctIndex": 1,
    "explanation": "Paradigma conjunto.",
    "difficulty": "dificil",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "Kuhn"
    ],
    "createdAt": "2027-05-22T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-36",
    "subjectId": "filosofia",
    "topicId": "filosofia-gregos",
    "statement": "TEXTO: Descartes dualismo mente corpo res cogitans vs extensa. Problema interação. Espinosa monismo:",
    "options": [
      "Dualismo também",
      "Uma substância Deus/natureza, mente e corpo atributos mesma substância",
      "Sem monismo",
      "Só mente",
      "Só corpo"
    ],
    "correctIndex": 1,
    "explanation": "Espinosa monismo.",
    "difficulty": "dificil",
    "source": "UNICAMP 2022 - Inspirada",
    "tags": [
      "Espinosa"
    ],
    "createdAt": "2027-06-01T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-37",
    "subjectId": "filosofia",
    "topicId": "filosofia-idade-media",
    "statement": "TEXTO: Estoicismo: ataraxia, apatia, viver segundo natureza, controle sobre o que depende de nós. Sêneca carta:",
    "options": [
      "Buscar prazer",
      "Aceitar destino, focar no que controla",
      "Revoltar",
      "Sem controle",
      "Hedonismo"
    ],
    "correctIndex": 1,
    "explanation": "Estoicismo controle interno.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "estoicismo"
    ],
    "createdAt": "2027-06-11T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-38",
    "subjectId": "filosofia",
    "topicId": "filosofia-etica",
    "statement": "TEXTO: Epicurismo: prazer ausência dor, amizade, cálculo prazeres, não hedonismo vulgar. Jardim Epicuro:",
    "options": [
      "Orgasmo",
      "Prazeres simples, amizade, ataraxia",
      "Excesso",
      "Sem prazer",
      "Dor"
    ],
    "correctIndex": 1,
    "explanation": "Prazeres simples.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "epicurismo"
    ],
    "createdAt": "2027-06-21T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-39",
    "subjectId": "filosofia",
    "topicId": "filosofia-epistemologia",
    "statement": "TEXTO: Cínicos: Diógenes lanterna procura homem honesto, vida simples, crítica convenções. Cínico:",
    "options": [
      "Luxo",
      "Vida simples, autarquia, crítica hipocrisia",
      "Riqueza",
      "Poder",
      "Sem crítica"
    ],
    "correctIndex": 1,
    "explanation": "Vida simples autarquia.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "cínicos"
    ],
    "createdAt": "2027-07-01T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-40",
    "subjectId": "filosofia",
    "topicId": "filosofia-politica",
    "statement": "TEXTO: Sofistas: Protágoras 'homem medida todas coisas', relativismo, retórica. Sócrates vs sofistas:",
    "options": [
      "Iguais",
      "Sócrates busca verdade universal, sofistas relativismo e retórica paga",
      "Sócrates relativista",
      "Sofistas buscam verdade",
      "Sem diferença"
    ],
    "correctIndex": 1,
    "explanation": "Sócrates universal vs relativismo.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "sofistas"
    ],
    "createdAt": "2027-07-11T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-41",
    "subjectId": "filosofia",
    "topicId": "filosofia-gregos",
    "statement": "TEXTO: Pré-socráticos: Tales água arché, Heráclito fogo devir, Parmênides ser. Arché significa:",
    "options": [
      "Fim",
      "Princípio originário",
      "Deus",
      "Nada",
      "Caos"
    ],
    "correctIndex": 1,
    "explanation": "Arché princípio.",
    "difficulty": "facil",
    "source": "ENEM 2019 - Inspirada",
    "tags": [
      "pré-socráticos"
    ],
    "createdAt": "2027-07-21T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-42",
    "subjectId": "filosofia",
    "topicId": "filosofia-idade-media",
    "statement": "TEXTO: Heráclito 'ninguém se banha duas vezes mesmo rio' devir, logos. Parmênides ser imóvel. Oposição:",
    "options": [
      "Iguais",
      "Devir vs ser",
      "Ambos devir",
      "Ambos ser",
      "Sem oposição"
    ],
    "correctIndex": 1,
    "explanation": "Devir vs ser.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "Heráclito Parmênides"
    ],
    "createdAt": "2027-07-31T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-43",
    "subjectId": "filosofia",
    "topicId": "filosofia-etica",
    "statement": "TEXTO: Democracia ateniense direta, excluía mulheres escravos estrangeiros. Democracia moderna representativa inclui universal mas com crise representação. Diferença central:",
    "options": [
      "Iguais",
      "Atenas direta restrita, moderna representativa universal mas crise",
      "Atenas universal",
      "Moderna direta",
      "Sem diferença"
    ],
    "correctIndex": 1,
    "explanation": "Direta restrita vs representativa universal.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "democracia"
    ],
    "createdAt": "2027-08-10T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-44",
    "subjectId": "filosofia",
    "topicId": "filosofia-epistemologia",
    "statement": "TEXTO: Contratualistas: Hobbes segurança, Locke propriedade, Rousseau vontade geral. Todos partem estado natureza e contrato, mas diferem sobre:",
    "options": [
      "Contrato igual",
      "Natureza humana e tipo Estado resultante",
      "Sem diferença",
      "Só Hobbes contrato",
      "Só Rousseau"
    ],
    "correctIndex": 1,
    "explanation": "Natureza e Estado.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "contratualistas"
    ],
    "createdAt": "2027-08-20T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-45",
    "subjectId": "filosofia",
    "topicId": "filosofia-politica",
    "statement": "TEXTO: Liberalismo econômico Adam Smith mão invisível mercado auto-regula. Crítica Marx:",
    "options": [
      "Sem crítica",
      "Mercado gera desigualdade e exploração, precisa crítica",
      "Mercado perfeito",
      "Sem exploração",
      "Mão invisível divina"
    ],
    "correctIndex": 1,
    "explanation": "Crítica desigualdade exploração.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "Smith Marx"
    ],
    "createdAt": "2027-08-30T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-46",
    "subjectId": "filosofia",
    "topicId": "filosofia-gregos",
    "statement": "TEXTO: Justiça Rawls véu ignorância posição original, princípios liberdade igual e diferença beneficia menos favorecidos. Justiça como:",
    "options": [
      "Utilidade",
      "Equidade",
      "Caridade",
      "Sorte",
      "Mérito só"
    ],
    "correctIndex": 1,
    "explanation": "Equidade.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "Rawls"
    ],
    "createdAt": "2027-09-09T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-47",
    "subjectId": "filosofia",
    "topicId": "filosofia-idade-media",
    "statement": "TEXTO: Nozick libertário crítica Rawls: justiça entitlement, Estado mínimo, tributação é trabalho forçado. Estado para Nozick:",
    "options": [
      "Máximo",
      "Mínimo protetor vida liberdade propriedade",
      "Sem Estado",
      "Social",
      "Welfare"
    ],
    "correctIndex": 1,
    "explanation": "Mínimo.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "Nozick"
    ],
    "createdAt": "2027-09-19T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-48",
    "subjectId": "filosofia",
    "topicId": "filosofia-etica",
    "statement": "TEXTO: Feminismo interseccional Kimberlé Crenshaw: opressão não só gênero mas raça classe. Mulher negra sofre:",
    "options": [
      "Só gênero",
      "Intersecção racismo e sexismo",
      "Só raça",
      "Sem opressão",
      "Só classe"
    ],
    "correctIndex": 1,
    "explanation": "Intersecção.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "interseccionalidade"
    ],
    "createdAt": "2027-09-29T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-49",
    "subjectId": "filosofia",
    "topicId": "filosofia-epistemologia",
    "statement": "TEXTO: 'Só sei que nada sei' (Sócrates). Método socrático ironia e maiêutica. Significa: (variação)",
    "options": [
      "Ignorância total",
      "Consciência da própria ignorância como início sabedoria, questiona",
      "Sabe tudo",
      "Ceticismo absoluto sem busca",
      "Sem método"
    ],
    "correctIndex": 1,
    "explanation": "Sócrates consciência ignorância início busca.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "Sócrates"
    ],
    "createdAt": "2027-10-09T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-filosofia-50",
    "subjectId": "filosofia",
    "topicId": "filosofia-politica",
    "statement": "TEXTO: 'Só sei que nada sei' (Sócrates). Método socrático ironia e maiêutica. Significa: (variação)",
    "options": [
      "Ignorância total",
      "Consciência da própria ignorância como início sabedoria, questiona",
      "Sabe tudo",
      "Ceticismo absoluto sem busca",
      "Sem método"
    ],
    "correctIndex": 1,
    "explanation": "Sócrates consciência ignorância início busca.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "Sócrates"
    ],
    "createdAt": "2027-10-19T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-1",
    "subjectId": "sociologia",
    "topicId": "sociologia-metodo",
    "statement": "TEXTO: Durkheim: fato social exterior, coercitivo, geral. Suicídio estudo mostra taxa varia com integração social (egoísta baixa integração). Método:",
    "options": [
      "Compreensivo",
      "Funcionalista, tratar fato social como coisa, estatística",
      "Dialético",
      "Fenomenológico",
      "Sem método"
    ],
    "correctIndex": 1,
    "explanation": "Durkheim funcionalista coisa estatística.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "Durkheim",
      "fato social"
    ],
    "createdAt": "2026-08-05T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-2",
    "subjectId": "sociologia",
    "topicId": "sociologia-cultura",
    "statement": "TEXTO: Durkheim anomia falta normas, desregulação, ex: crise econômica ou crescimento rápido. Anomia causa:",
    "options": [
      "Integração alta",
      "Falta normas, desorientação",
      "Integração baixa só",
      "Sem causa",
      "Excesso normas"
    ],
    "correctIndex": 1,
    "explanation": "Anomia falta normas.",
    "difficulty": "medio",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "anomia"
    ],
    "createdAt": "2026-08-15T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-3",
    "subjectId": "sociologia",
    "topicId": "sociologia-trabalho",
    "statement": "TEXTO: Weber: ação social com sentido, tipos racional fins, valores, afetiva, tradicional. Método compreensivo Verstehen e tipo ideal. Tipo ideal é:",
    "options": [
      "Realidade",
      "Construção mental exagerada para comparar realidade",
      "Média",
      "Ideal moral",
      "Sem tipo"
    ],
    "correctIndex": 1,
    "explanation": "Tipo ideal construção mental.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "Weber",
      "tipo ideal"
    ],
    "createdAt": "2026-08-25T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-4",
    "subjectId": "sociologia",
    "topicId": "sociologia-estado",
    "statement": "TEXTO: Weber ética protestante e espírito capitalismo: calvinismo predestinação leva trabalho árduo e poupança como sinal salvação, acumulação capital. Relação:",
    "options": [
      "Causa direta",
      "Afinidade eletiva entre ética e capitalismo",
      "Sem relação",
      "Capitalismo causa protestantismo",
      "Só economia"
    ],
    "correctIndex": 1,
    "explanation": "Afinidade eletiva.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "Weber",
      "ética protestante"
    ],
    "createdAt": "2026-09-04T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-5",
    "subjectId": "sociologia",
    "topicId": "sociologia-globalizacao",
    "statement": "TEXTO: Marx: infraestrutura determina superestrutura, luta classes motor história, proletariado vs burguesia. Alienação trabalho: trabalhador não se reconhece produto. Alienação ocorre porque:",
    "options": [
      "Trabalho criativo",
      "Trabalhador não controla processo nem produto, estranhamento",
      "Sem alienação",
      "Só salário baixo",
      "Sem divisão trabalho"
    ],
    "correctIndex": 1,
    "explanation": "Não controla processo produto.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "Marx",
      "alienação"
    ],
    "createdAt": "2026-09-14T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-6",
    "subjectId": "sociologia",
    "topicId": "sociologia-metodo",
    "statement": "TEXTO: Bourdieu: habitus disposições incorporadas, capital econômico, cultural, social, simbólico, violência simbólica imposição cultura dominante como legítima. Escola reproduz desigualdade porque:",
    "options": [
      "Meritocracia pura",
      "Valoriza capital cultural dominante, exclui popular",
      "Igual para todos",
      "Sem reprodução",
      "Só econômica"
    ],
    "correctIndex": 1,
    "explanation": "Valoriza capital dominante.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "Bourdieu"
    ],
    "createdAt": "2026-09-24T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-7",
    "subjectId": "sociologia",
    "topicId": "sociologia-cultura",
    "statement": "TEXTO: Bauman modernidade líquida: relações fluidas, incerteza, consumo, amor líquido. Sólido vs líquido:",
    "options": [
      "Iguais",
      "Sólido estável duradouro, líquido fluido instável",
      "Líquido estável",
      "Sólido fluido",
      "Sem diferença"
    ],
    "correctIndex": 1,
    "explanation": "Sólido estável líquido fluido.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "Bauman"
    ],
    "createdAt": "2026-10-04T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-8",
    "subjectId": "sociologia",
    "topicId": "sociologia-trabalho",
    "statement": "TEXTO: Giddens modernidade reflexiva: tradição questionada, eu reflexivo, risco fabricado. Risco fabricado ex: aquecimento global criado pela própria modernidade. Diferente risco externo (terremoto). Fabricado é:",
    "options": [
      "Natural",
      "Criado pela ação humana modernidade",
      "Sem risco",
      "Só externo",
      "Sem diferença"
    ],
    "correctIndex": 1,
    "explanation": "Criado ação humana.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "Giddens"
    ],
    "createdAt": "2026-10-14T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-9",
    "subjectId": "sociologia",
    "topicId": "sociologia-estado",
    "statement": "TEXTO: Indústria cultural Adorno: cultura mercadoria padronizada, pseudo-individuação, conformismo. Funk ostentação na indústria cultural é:",
    "options": [
      "Fora indústria",
      "Dentro mas com contradição, resistência e cooptação",
      "Só resistência",
      "Só cooptação",
      "Sem indústria"
    ],
    "correctIndex": 1,
    "explanation": "Dentro com contradição.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "indústria cultural"
    ],
    "createdAt": "2026-10-24T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-10",
    "subjectId": "sociologia",
    "topicId": "sociologia-globalizacao",
    "statement": "TEXTO: Florestan Fernandes: mito democracia racial Freyre, mas racismo estrutural persiste. Brasil racismo dissimulado vs EUA segregado explícito. Florestan mostra:",
    "options": [
      "Democracia racial real",
      "Desigualdade racial persiste, mito mascara",
      "Sem racismo",
      "Racismo só EUA",
      "Igualdade total"
    ],
    "correctIndex": 1,
    "explanation": "Mito mascara desigualdade.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "Florestan",
      "racismo"
    ],
    "createdAt": "2026-11-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-11",
    "subjectId": "sociologia",
    "topicId": "sociologia-metodo",
    "statement": "TEXTO: Patriarcado: sistema dominação masculina, divisão sexual trabalho, violência gênero. Lei Maria Penha 2006 protege mulher violência doméstica. Base sociológica:",
    "options": [
      "Violência individual só",
      "Estrutura patriarcal histórica",
      "Sem patriarcado",
      "Biologia",
      "Sem estrutura"
    ],
    "correctIndex": 1,
    "explanation": "Patriarcado estrutura.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "patriarcado"
    ],
    "createdAt": "2026-11-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-12",
    "subjectId": "sociologia",
    "topicId": "sociologia-cultura",
    "statement": "TEXTO: Trabalho uberização: app sem vínculo, pejotização, empreendedor de si, precarização. Conceito Standing precariado:",
    "options": [
      "Proletariado estável",
      "Classe precária sem segurança, flexível",
      "Burguesia",
      "Sem classe",
      "Elite"
    ],
    "correctIndex": 1,
    "explanation": "Precariado sem segurança.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "uberização",
      "precariado"
    ],
    "createdAt": "2026-11-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-13",
    "subjectId": "sociologia",
    "topicId": "sociologia-trabalho",
    "statement": "TEXTO: Globalização Milton Santos: globalização perversa, fábula (mundo como nos fazem crer), perversidade (real desigual), possibilidade (outra globalização). Outra globalização seria:",
    "options": [
      "Mesma perversa",
      "Solidária, com tecnologia a serviço humano",
      "Sem globalização",
      "Só fábula",
      "Impossível"
    ],
    "correctIndex": 1,
    "explanation": "Solidária.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "Milton Santos"
    ],
    "createdAt": "2026-12-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-14",
    "subjectId": "sociologia",
    "topicId": "sociologia-estado",
    "statement": "TEXTO: Movimentos sociais novos vs velhos: velhos trabalho classe, novos identidade (feminista, negro, ambiental). Novos focam:",
    "options": [
      "Só economia",
      "Cultura, identidade, reconhecimento, além redistribuição",
      "Só salário",
      "Sem cultura",
      "Só classe"
    ],
    "correctIndex": 1,
    "explanation": "Identidade reconhecimento.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "movimentos sociais"
    ],
    "createdAt": "2026-12-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-15",
    "subjectId": "sociologia",
    "topicId": "sociologia-globalizacao",
    "statement": "TEXTO: Cidadania Marshall: civil (liberdade), política (voto), social (bem-estar). Brasil cidadania regulada (Santos) ligada a profissão reconhecida Estado Vargas. Significa:",
    "options": [
      "Universal",
      "Só quem tem profissão reconhecida tem direitos",
      "Todos têm",
      "Sem cidadania",
      "Só civil"
    ],
    "correctIndex": 1,
    "explanation": "Regulada profissão.",
    "difficulty": "dificil",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "cidadania regulada"
    ],
    "createdAt": "2026-12-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-16",
    "subjectId": "sociologia",
    "topicId": "sociologia-metodo",
    "statement": "TEXTO: Estado: Weber monopólio legítimo violência física território. Estado moderno:",
    "options": [
      "Sem violência",
      "Monopólio legítimo violência",
      "Violência ilegítima só",
      "Sem monopólio",
      "Só consenso"
    ],
    "correctIndex": 1,
    "explanation": "Monopólio legítimo.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "Estado Weber"
    ],
    "createdAt": "2027-01-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-17",
    "subjectId": "sociologia",
    "topicId": "sociologia-cultura",
    "statement": "TEXTO: Democracia: Schumpeter minimalista competição elites, Dahl poliarquia, Pateman participativa. Poliarquia Dahl é:",
    "options": [
      "Democracia total",
      "Democracia real imperfeita com competição e participação",
      "Ditadura",
      "Sem democracia",
      "Direta"
    ],
    "correctIndex": 1,
    "explanation": "Poliarquia democracia real imperfeita.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "poliarquia"
    ],
    "createdAt": "2027-01-12T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-18",
    "subjectId": "sociologia",
    "topicId": "sociologia-trabalho",
    "statement": "TEXTO: Cultura: Laraia cultura lente vê mundo, aprendida não biológica. Etnocentrismo julga outra cultura com valores própria. Relativismo cultural:",
    "options": [
      "Julga com própria",
      "Entende outra em seus termos, sem hierarquia",
      "Etnocentrismo igual",
      "Sem cultura",
      "Hierarquia"
    ],
    "correctIndex": 1,
    "explanation": "Relativismo entende em seus termos.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "relativismo"
    ],
    "createdAt": "2027-01-22T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-19",
    "subjectId": "sociologia",
    "topicId": "sociologia-estado",
    "statement": "TEXTO: Ideologia: Marx falsa consciência que mascara dominação, Althusser aparelhos ideológicos Estado (escola, mídia). Escola como AIE:",
    "options": [
      "Repressivo",
      "Ideológico reproduz ideologia dominante",
      "Neutro",
      "Sem ideologia",
      "Só repressivo"
    ],
    "correctIndex": 1,
    "explanation": "AIE ideológico.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "Aparelhos ideológicos"
    ],
    "createdAt": "2027-02-01T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-20",
    "subjectId": "sociologia",
    "topicId": "sociologia-globalizacao",
    "statement": "TEXTO: Desigualdade: estratificação aberta (classe mobilidade) vs fechada (casta, estamento sem mobilidade). Brasil estratificação:",
    "options": [
      "Fechada casta",
      "Aberta classe com mobilidade mas baixa",
      "Fechada estamento",
      "Sem estratificação",
      "Casta"
    ],
    "correctIndex": 1,
    "explanation": "Aberta classe baixa mobilidade.",
    "difficulty": "medio",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "estratificação"
    ],
    "createdAt": "2027-02-11T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-21",
    "subjectId": "sociologia",
    "topicId": "sociologia-metodo",
    "statement": "TEXTO: Mobilidade social: intergeracional filho vs pai, intrageracional carreira. Brasil mobilidade baixa por:",
    "options": [
      "Mérito",
      "Desigualdade educacional, capital cultural, racismo",
      "Sem barreira",
      "Só esforço",
      "Alta mobilidade"
    ],
    "correctIndex": 1,
    "explanation": "Barreiras estruturais.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "mobilidade"
    ],
    "createdAt": "2027-02-21T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-22",
    "subjectId": "sociologia",
    "topicId": "sociologia-cultura",
    "statement": "TEXTO: Secularização Weber desencantamento mundo, ciência substitui religião explicação, mas religião persiste privada. Brasil pentecostalismo cresce porque:",
    "options": [
      "Secularização total",
      "Modernidade gera incerteza, religião oferece comunidade e sentido",
      "Fim religião",
      "Sem secularização",
      "Só tradição"
    ],
    "correctIndex": 1,
    "explanation": "Incerteza busca sentido comunidade.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "secularização"
    ],
    "createdAt": "2027-03-03T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-23",
    "subjectId": "sociologia",
    "topicId": "sociologia-trabalho",
    "statement": "TEXTO: Redes sociais: Castells sociedade rede, capital social Putnam laços, mas fake news e bolhas. Bolha filtro algoritmo mostra só concorda, polariza. Solução:",
    "options": [
      "Mais bolha",
      "Educação midiática, pluralidade, regulação",
      "Sem solução",
      "Censura total",
      "Sem bolha"
    ],
    "correctIndex": 1,
    "explanation": "Educação midiática pluralidade.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "bolha filtro"
    ],
    "createdAt": "2027-03-13T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-24",
    "subjectId": "sociologia",
    "topicId": "sociologia-estado",
    "statement": "TEXTO: Trabalho infantil: 1,9 milhão Brasil, ilegal <14, aprendiz 14-16. Causa estrutural:",
    "options": [
      "Preguiça",
      "Pobreza, desigualdade, falta escola qualidade",
      "Cultura só",
      "Sem causa",
      "Escolha"
    ],
    "correctIndex": 1,
    "explanation": "Pobreza desigualdade.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "trabalho infantil"
    ],
    "createdAt": "2027-03-23T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-25",
    "subjectId": "sociologia",
    "topicId": "sociologia-globalizacao",
    "statement": "TEXTO: Cotas raciais: ação afirmativa igualdade material, corrige desigualdade histórica. STF 2012 constitucional. Argumento favorável:",
    "options": [
      "Privilégio",
      "Repara desigualdade histórica, diversidade",
      "Sem argumento",
      "Discrimina",
      "Inconstitucional"
    ],
    "correctIndex": 1,
    "explanation": "Repara desigualdade.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "cotas"
    ],
    "createdAt": "2027-04-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-26",
    "subjectId": "sociologia",
    "topicId": "sociologia-metodo",
    "statement": "TEXTO: Gênero e trabalho: mulheres ganham 20% menos mesmo cargo, dupla jornada. Divisão sexual trabalho:",
    "options": [
      "Natural",
      "Social, construída, desvaloriza trabalho reprodutivo",
      "Biológica",
      "Sem divisão",
      "Igualdade total"
    ],
    "correctIndex": 1,
    "explanation": "Social construída.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "divisão sexual trabalho"
    ],
    "createdAt": "2027-04-12T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-27",
    "subjectId": "sociologia",
    "topicId": "sociologia-cultura",
    "statement": "TEXTO: Meio ambiente: Beck sociedade risco, riscos fabricados globais (clima, nuclear). Justiça ambiental: pobres sofrem mais impactos. Exemplo:",
    "options": [
      "Igual para todos",
      "Lixão e poluição perto periferia pobre",
      "Ricos sofrem mais",
      "Sem injustiça",
      "Sem risco"
    ],
    "correctIndex": 1,
    "explanation": "Periferia sofre mais.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "justiça ambiental"
    ],
    "createdAt": "2027-04-22T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-28",
    "subjectId": "sociologia",
    "topicId": "sociologia-trabalho",
    "statement": "TEXTO: Consumo: Veblen consumo conspícuo ostentação status, Bauman consumo identidade. No Brasil ostentação funk:",
    "options": [
      "Sem status",
      "Busca reconhecimento e pertencimento via consumo em contexto exclusão",
      "Só futilidade",
      "Sem identidade",
      "Só pobreza"
    ],
    "correctIndex": 1,
    "explanation": "Reconhecimento pertencimento.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "consumo conspícuo"
    ],
    "createdAt": "2027-05-02T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-29",
    "subjectId": "sociologia",
    "topicId": "sociologia-estado",
    "statement": "TEXTO: Escola: Durkheim socialização, Bourdieu reprodução, Freire libertadora. Freire educação bancária vs problematizadora. Bancária:",
    "options": [
      "Libertadora",
      "Deposita conhecimento, aluno passivo",
      "Problematizadora",
      "Dialógica",
      "Crítica"
    ],
    "correctIndex": 1,
    "explanation": "Bancária deposita passivo.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "Freire"
    ],
    "createdAt": "2027-05-12T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-30",
    "subjectId": "sociologia",
    "topicId": "sociologia-globalizacao",
    "statement": "TEXTO: Mídia: Chomsky manufatura consentimento, agenda setting mídia pauta o que pensar. No Brasil concentração mídia Globo. Consequência:",
    "options": [
      "Pluralidade",
      "Pouca pluralidade, agenda dominante",
      "Sem influência",
      "Democracia total",
      "Sem concentração"
    ],
    "correctIndex": 1,
    "explanation": "Pouca pluralidade.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "mídia"
    ],
    "createdAt": "2027-05-22T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-31",
    "subjectId": "sociologia",
    "topicId": "sociologia-metodo",
    "statement": "TEXTO: Violência: Wieviorka violência instrumental, expressiva, simbólica. Violência urbana Brasil ligada a:",
    "options": [
      "Só individual",
      "Desigualdade, falta Estado, tráfico, exclusão",
      "Só pobreza",
      "Sem causa",
      "Só genética"
    ],
    "correctIndex": 1,
    "explanation": "Desigualdade falta Estado tráfico.",
    "difficulty": "medio",
    "source": "ENEM 2021 - Inspirada",
    "tags": [
      "violência urbana"
    ],
    "createdAt": "2027-06-01T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-32",
    "subjectId": "sociologia",
    "topicId": "sociologia-cultura",
    "statement": "TEXTO: Cidade: Lefebvre direito à cidade, Harvey acumulação por espoliação. Remoções favela para obra Copa/Olimpíada:",
    "options": [
      "Direito cidade",
      "Espoliação, gentrificação, cidade para capital não morador",
      "Inclusão",
      "Sem remoção",
      "Benefício morador"
    ],
    "correctIndex": 1,
    "explanation": "Espoliação.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "direito à cidade"
    ],
    "createdAt": "2027-06-11T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-33",
    "subjectId": "sociologia",
    "topicId": "sociologia-trabalho",
    "statement": "TEXTO: Pandemia: Durkheim fato social, mas pandemia mostra interdependência global e desigualdade acesso vacina. Sociologia pandemia estuda:",
    "options": [
      "Só vírus",
      "Impactos sociais desiguais, negacionismo, políticas públicas",
      "Sem sociologia",
      "Só biologia",
      "Sem desigualdade"
    ],
    "correctIndex": 1,
    "explanation": "Impactos sociais desiguais.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "pandemia"
    ],
    "createdAt": "2027-06-21T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-34",
    "subjectId": "sociologia",
    "topicId": "sociologia-estado",
    "statement": "TEXTO: Interseccionalidade Crenshaw: opressões cruzadas raça gênero classe. Mulher negra pobre sofre:",
    "options": [
      "Só gênero",
      "Tripla opressão",
      "Só raça",
      "Sem opressão",
      "Só classe"
    ],
    "correctIndex": 1,
    "explanation": "Tripla.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "interseccionalidade"
    ],
    "createdAt": "2027-07-01T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-35",
    "subjectId": "sociologia",
    "topicId": "sociologia-globalizacao",
    "statement": "TEXTO: Democracia e internet: potencial participativo mas desinformação, ódio, cancelamento. Cultura cancelamento é:",
    "options": [
      "Debate",
      "Boicote coletivo online por atitude reprovável, justiça com linchamento virtual",
      "Elogio",
      "Sem cultura",
      "Só positivo"
    ],
    "correctIndex": 1,
    "explanation": "Boicote coletivo.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "cancelamento"
    ],
    "createdAt": "2027-07-11T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-36",
    "subjectId": "sociologia",
    "topicId": "sociologia-metodo",
    "statement": "TEXTO: Trabalho remoto pós-pandemia: home office, flexível mas invasão vida privada, burnout. Limite trabalho-vida:",
    "options": [
      "Sem limite",
      "Flexível mas borra fronteira, precisa direito desconexão",
      "Só positivo",
      "Sem burnout",
      "Só negativo"
    ],
    "correctIndex": 1,
    "explanation": "Borra fronteira direito desconexão.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "home office"
    ],
    "createdAt": "2027-07-21T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-37",
    "subjectId": "sociologia",
    "topicId": "sociologia-cultura",
    "statement": "TEXTO: Juventude: Mannheim geração, Pais culturas juvenis. Nem-nem jovem que não estuda nem trabalha 20% Brasil por:",
    "options": [
      "Preguiça",
      "Falta oportunidade, desigualdade, desemprego estrutural",
      "Escolha",
      "Sem causa",
      "Só cultural"
    ],
    "correctIndex": 1,
    "explanation": "Falta oportunidade.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "juventude nem-nem"
    ],
    "createdAt": "2027-07-31T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-38",
    "subjectId": "sociologia",
    "topicId": "sociologia-trabalho",
    "statement": "TEXTO: Religião e política: bancada evangélica Congresso defende pauta moral. Laicidade Estado:",
    "options": [
      "Estado confessional",
      "Estado neutro, sem religião oficial, mas com influência religiosa na prática",
      "Estado ateu",
      "Sem laicidade",
      "Teocracia"
    ],
    "correctIndex": 1,
    "explanation": "Neutro mas influência prática.",
    "difficulty": "dificil",
    "source": "FUVEST 2022 - Inspirada",
    "tags": [
      "laicidade"
    ],
    "createdAt": "2027-08-10T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-39",
    "subjectId": "sociologia",
    "topicId": "sociologia-estado",
    "statement": "TEXTO: Etnocentrismo: julgar outra cultura com valores própria. Exemplo europeus chamarem indígenas preguiçosos porque não acumulavam. Relativismo critica:",
    "options": [
      "Relativismo etnocêntrico",
      "Etnocentrismo, propõe entender em seus termos",
      "Etnocentrismo correto",
      "Sem crítica",
      "Hierarquia"
    ],
    "correctIndex": 1,
    "explanation": "Relativismo critica etnocentrismo.",
    "difficulty": "facil",
    "source": "ENEM 2020 - Inspirada",
    "tags": [
      "etnocentrismo"
    ],
    "createdAt": "2027-08-20T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-40",
    "subjectId": "sociologia",
    "topicId": "sociologia-globalizacao",
    "statement": "TEXTO: Poder: Foucault capilar, Bourdieu simbólico. Violência simbólica escola impõe cultura dominante como superior, aluno pobre sente inferior. Exemplo:",
    "options": [
      "Violência física",
      "Professor desvaloriza sotaque e cultura popular",
      "Sem violência",
      "Só física",
      "Igualdade"
    ],
    "correctIndex": 1,
    "explanation": "Desvaloriza cultura popular.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "violência simbólica"
    ],
    "createdAt": "2027-08-30T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-41",
    "subjectId": "sociologia",
    "topicId": "sociologia-metodo",
    "statement": "TEXTO: Desenvolvimento: Furtado subdesenvolvimento não etapa mas estrutura, centro-periferia. Brasil subdesenvolvido por:",
    "options": [
      "Falta recurso",
      "História colonial, dependência, desigualdade",
      "Sem causa",
      "Só cultura",
      "Falta trabalho"
    ],
    "correctIndex": 1,
    "explanation": "História colonial dependência.",
    "difficulty": "dificil",
    "source": "FUVEST 2021 - Inspirada",
    "tags": [
      "Furtado"
    ],
    "createdAt": "2027-09-09T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-42",
    "subjectId": "sociologia",
    "topicId": "sociologia-cultura",
    "statement": "TEXTO: Sociologia digital: algoritmo reproduz viés racista (reconhecimento facial erra mais negro). Viés algoritmo vem:",
    "options": [
      "Neutro",
      "Dados enviesados e programadores enviesados",
      "Sem viés",
      "Só técnico",
      "Imparcial"
    ],
    "correctIndex": 1,
    "explanation": "Dados e programadores enviesados.",
    "difficulty": "dificil",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "viés algoritmo"
    ],
    "createdAt": "2027-09-19T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-43",
    "subjectId": "sociologia",
    "topicId": "sociologia-trabalho",
    "statement": "TEXTO: Anomia e suicídio: Durkheim suicídio anômico crise econômica rápida, falta normas. Hoje ansiedade e depressão ligadas a:",
    "options": [
      "Só biologia",
      "Anomia moderna, pressão desempenho, falta sentido",
      "Sem anomia",
      "Só individual",
      "Sem sociedade"
    ],
    "correctIndex": 1,
    "explanation": "Anomia pressão desempenho.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "anomia contemporânea"
    ],
    "createdAt": "2027-09-29T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-44",
    "subjectId": "sociologia",
    "topicId": "sociologia-estado",
    "statement": "TEXTO: Coletivo vs individual: Tönnies Gemeinschaft comunidade laços afetivos e Gesellschaft sociedade impessoal. Modernidade transição:",
    "options": [
      "Gesellschaft para Gemeinschaft",
      "Gemeinschaft para Gesellschaft",
      "Sem transição",
      "Só comunidade",
      "Só sociedade"
    ],
    "correctIndex": 1,
    "explanation": "Comunidade para sociedade.",
    "difficulty": "medio",
    "source": "FUVEST 2020 - Inspirada",
    "tags": [
      "Tönnies"
    ],
    "createdAt": "2027-10-09T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-45",
    "subjectId": "sociologia",
    "topicId": "sociologia-globalizacao",
    "statement": "TEXTO: Meritocracia: ideia esforço individual leva sucesso, ignora estrutura. Crítica sociológica:",
    "options": [
      "Justa total",
      "Mascara desigualdade, culpa indivíduo por fracasso estrutural",
      "Sem crítica",
      "Igualdade",
      "Só mérito"
    ],
    "correctIndex": 1,
    "explanation": "Mascara desigualdade.",
    "difficulty": "medio",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "meritocracia"
    ],
    "createdAt": "2027-10-19T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-46",
    "subjectId": "sociologia",
    "topicId": "sociologia-metodo",
    "statement": "TEXTO: Espaço público: Habermas esfera pública debate racional, mas exclusão mulheres e pobres. Fraser contra-públicos subalternos criam:",
    "options": [
      "Sem espaço",
      "Espaços alternativos para debater e resistir",
      "Só esfera dominante",
      "Sem resistência",
      "Só público burguês"
    ],
    "correctIndex": 1,
    "explanation": "Contra-públicos.",
    "difficulty": "dificil",
    "source": "FUVEST 2023 - Inspirada",
    "tags": [
      "contra-públicos"
    ],
    "createdAt": "2027-10-29T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-47",
    "subjectId": "sociologia",
    "topicId": "sociologia-cultura",
    "statement": "TEXTO: Identidade: Hall identidade pós-moderna fragmentada, não fixa. Identidade negra, LGBTQIA+ construída politicamente. Hall:",
    "options": [
      "Essencial fixa",
      "Construída, fragmentada, posicional",
      "Sem identidade",
      "Fixa biológica",
      "Única"
    ],
    "correctIndex": 1,
    "explanation": "Construída fragmentada.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "Hall identidade"
    ],
    "createdAt": "2027-11-08T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-48",
    "subjectId": "sociologia",
    "topicId": "sociologia-trabalho",
    "statement": "TEXTO: Fake news impacta democracia porque:",
    "options": [
      "Informa",
      "Desinforma, polariza, mina confiança instituições",
      "Sem impacto",
      "Só diverte",
      "Ajuda democracia sempre"
    ],
    "correctIndex": 1,
    "explanation": "Desinforma polariza mina confiança.",
    "difficulty": "medio",
    "source": "ENEM 2023 - Inspirada",
    "tags": [
      "fake news"
    ],
    "createdAt": "2027-11-18T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-49",
    "subjectId": "sociologia",
    "topicId": "sociologia-estado",
    "statement": "TEXTO: Uberização trabalho por app sem vínculo flexível precarizado. Conceito:",
    "options": [
      "CLT",
      "Trabalho por app sem vínculo",
      "Industrial",
      "Fim trabalho",
      "Voluntário"
    ],
    "correctIndex": 1,
    "explanation": "App sem vínculo.",
    "difficulty": "facil",
    "source": "ENEM 2024 - Inspirada",
    "tags": [
      "uberização"
    ],
    "createdAt": "2027-11-28T18:50:30.250Z",
    "isCustom": false
  },
  {
    "id": "q-sociologia-50",
    "subjectId": "sociologia",
    "topicId": "sociologia-globalizacao",
    "statement": "TEXTO: Durkheim: fato social exterior, coercitivo, geral. Suicídio estudo mostra taxa varia com integração social (egoísta baixa integração). Método: (variação)",
    "options": [
      "Compreensivo",
      "Funcionalista, tratar fato social como coisa, estatística",
      "Dialético",
      "Fenomenológico",
      "Sem método"
    ],
    "correctIndex": 1,
    "explanation": "Durkheim funcionalista coisa estatística.",
    "difficulty": "dificil",
    "source": "ENEM 2022 - Inspirada",
    "tags": [
      "Durkheim",
      "fato social"
    ],
    "createdAt": "2027-12-08T18:50:30.250Z",
    "isCustom": false
  }
];

export function loadQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Question[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        const custom = parsed.filter(q => q.isCustom);
        const seedIds = new Set(SEED_QUESTIONS.map(q => q.id));
        const nonCustomFromStorage = parsed.filter(q => !q.isCustom && seedIds.has(q.id));
        const storedIds = new Set(parsed.map(q => q.id));
        const missingSeeds = SEED_QUESTIONS.filter(q => !storedIds.has(q.id));
        return [...nonCustomFromStorage, ...custom, ...missingSeeds];
      }
    }
  } catch {}
  return SEED_QUESTIONS;
}

export function saveQuestions(questions: Question[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch {}
  notifyLocalChange("tasks");
}

export function addQuestion(q: Omit<Question, "id" | "createdAt" | "isCustom">) {
  const all = loadQuestions();
  const newQ: Question = {
    ...q,
    id: `q-custom-${Date.now()}`,
    createdAt: new Date().toISOString(),
    isCustom: true,
  };
  saveQuestions([newQ, ...all]);
  return newQ;
}

export function removeQuestion(id: string) {
  const all = loadQuestions();
  saveQuestions(all.filter(q => q.id !== id));
}

export function updateQuestion(id: string, patch: Partial<Question>) {
  const all = loadQuestions();
  saveQuestions(all.map(q => q.id === id ? { ...q, ...patch } : q));
}

export function getQuestionById(id: string): Question | undefined {
  return loadQuestions().find(q => q.id === id);
}
