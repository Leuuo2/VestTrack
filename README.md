# VestTrack 🚀

**Transforme sua rotina de estudos em progresso real.**

VestTrack é uma plataforma premium para organizar seus estudos pro vestibular. 10 matérias, 150 tópicos, 500 questões, flashcards, resumos, tutor IA, metas e analytics — tudo em um painel que motiva de verdade.

![VestTrack](https://img.shields.io/badge/VestTrack-v1.0-violet?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-purple?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan?style=flat-square&logo=tailwindcss)

## ✨ O que tem

- **📚 10 matérias organizadas** — Matemática, Linguagens, Ciências e Humanas com progresso visual
- **📊 Analytics premium** — Evolução em gráfico, comparativo por matéria, insights automáticos
- **🧠 500 questões** — ENEM/FUVEST/UNICAMP/UNESP 2018-2026, com explicação, tags e modo prática/quiz
- **🃏 Flashcards & Resumos** — Revisão espaçada com SRS
- **🎯 Metas & Streaks** — Sequência de estudos, metas diárias/semanais/mensais, XP e níveis
- **📅 Planner & Calendário** — Planeje por data, veja heatmap 90 dias
- **🤖 Tutor IA** — Dúvidas por matéria com contexto dos seus tópicos
- **⌨️ Atalhos** — 1-4 pra selecionar, Enter verifica, Esc limpa, ? mostra ajuda
- **💾 Offline-first** — Funciona 100% sem login, salva no navegador. Nuvem opcional com Supabase

## 🎨 Design

- **Premium moderno** — Estilo Apple/Linear, gradientes violet→fuchsia, glassmorphism sutil
- **Clean sem animações intensas** — Foco no conteúdo, sem distração
- **Sidebar fixa** — Acompanha toda página, sticky
- **Mobile first** — Touch targets 44px, grid responsivo, PWA-ready

## 🚀 Stack

- **Frontend:** React 18 + TypeScript + Vite 8 + Tailwind 4 + shadcn/ui
- **Roteamento:** React Router
- **Ícones:** Lucide
- **Gráficos:** Recharts + custom SVG
- **Backend opcional:** Supabase (auth + DB)
- **Deploy:** Vercel

## 📦 Rodar local

```bash
git clone https://github.com/Leuuo2/VestTrack.git
cd VestTrack
npm install
npm run dev
```

Abra http://localhost:5173

## 🏗️ Build

```bash
npm run build
```

Gera `dist/` com 540kB main + chunks separados. Pronto pra Vercel.

## 🌐 Deploy Vercel

1. Importe `Leuuo2/VestTrack` na Vercel
2. Build: `npm run build` / Output: `dist`
3. `vercel.json` já configurado com SPA rewrites

## 📁 Estrutura

```
src/
├── components/  # ui, layout, questions, etc
├── pages/       # Landing, Dashboard, Subjects, Questions, Goals, Analytics...
├── data/        # subjects, questions, goals, analytics, mockTests
├── lib/         # storage, supabase, utils
└── layouts/     # MainLayout com sidebar fixa
```

## 🎯 Roadmap

- [x] 10 matérias + 150 tópicos
- [x] 500 questões com verificação
- [x] Flashcards + resumos
- [x] Metas & streaks + analytics
- [x] Tutor IA + atalhos teclado
- [x] Onboarding + shortcuts help
- [x] Site deploy Vercel
- [ ] Redação ENEM (temas, C1-C5, histórico)
- [ ] Supabase sync completo
- [ ] PWA opcional

## 💜 Feito por

**Leonardo** — 2024/2025  
Projeto pessoal pra organizar meus estudos e ajudar quem tá no vestibular.

---

**VestTrack — organize seus estudos, gabarite sua prova.**
