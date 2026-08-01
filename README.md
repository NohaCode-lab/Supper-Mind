# 🧘 Supper Mind — AI-Powered Mental Wellness & Habit SaaS Platform

[![React 18](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)](https://reactjs.org/)
[![Vite 5](https://img.shields.io/badge/Vite-5.4-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS v3](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-purple.svg)](https://github.com/pmndrs/zustand)
[![TanStack Query v5](https://img.shields.io/badge/TanStack_Query-5.62-FF4154.svg?logo=react-query)](https://tanstack.com/query)
[![Vitest](https://img.shields.io/badge/Vitest-2.1-yellow.svg?logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Supper Mind** is a production-grade, AI-assisted SaaS wellness and productivity application built with a modern React architecture. It empowers users to build healthy daily habits, track mental wellness trends over time, run guided box-breathing exercises, and interact with an empathetic AI wellness companion.

---

## 🌟 Key Features

* **🧘 Empathetic AI Companion:** Real-time conversational AI trained on soothing, supportive system prompts for emotional reflection and clarity.
* **🔥 Daily Habit Tracker & Streak Analytics:** Interactive habit management with automatic daily streak calculation, completion toggling, and persistence.
* **📊 Mood Analytics & Timeline:** Visual breakdown of mood patterns with customized palette indicators and historical note logging.
* **🌬️ Guided Box Breathing Widget:** Interactive 4-4-4 rhythm visualizer for instant stress check-in and anxiety reduction.
* **📔 Daily Journaling & Reflections:** Private journal entry logging with emotional tagging and relative timestamp formatting.
* **🌐 Internationalization (i18n):** Multi-language UI switching (English & German) powered by `react-i18next`.
* **🌙 Dynamic Theme System:** Full light & dark mode support with automatic system preference detection.

---

## 🏗️ Production Architecture

The application is structured using a **Feature-Sliced / Layered Domain Architecture** to maximize modularity, separation of concerns, and maintainability.

```text
src/
 ├── app/                      # Application entry, providers, global QueryClient setup
 ├── components/               # Design system reusable UI elements & layouts
 │    ├── ui/                  # Button, Card, Input, Loader (Atomic UI components)
 │    └── layouts/             # Navbar, Sidebar, Footer, MainLayout
 ├── features/                 # Modular domain features
 │    ├── habits/              # HabitTracker, HabitItem, habit state integration
 │    ├── mood/                # MoodSelector, MoodHistory analytics breakdown
 │    ├── journal/             # JournalFeature, reflection entry forms
 │    ├── stress/              # BreathingExercise box-breathing widget
 │    └── ai-chat/             # AIChat companion window
 ├── hooks/                    # Reusable React custom hooks (useAuth, useMood, etc.)
 ├── services/                 # External SDK & API integration (Supabase, OpenAI proxy)
 ├── stores/                   # Global Zustand client state modules (useAppStore, useHabitStore)
 ├── test/                     # Vitest unit & component test suite
 ├── routes/                   # AppRoutes router definitions & ProtectedRoute guards
 └── utils/                    # Helper functions, formatters, and constants
```

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 18 + Vite 5 | Core UI library & fast module bundling |
| **Client State** | Zustand 5 | Atomic global UI, theme, and habit persistence |
| **Server State** | TanStack Query v5 | Data fetching, caching, and optimistic mutations |
| **Styling** | Tailwind CSS v3 + Framer Motion | Responsive UI system & fluid micro-animations |
| **Backend & Auth** | Supabase JS Client | User session management & relational database |
| **AI Integration** | OpenAI GPT-4o-mini | Empathetic chat service layer with browser fallback |
| **Testing** | Vitest + React Testing Library | Unit and component testing |
| **i18n** | i18next + react-i18next | Localization engine |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js `^18.18.0` or `>=20.0.0`
- npm `^9.0.0` or pnpm `^8.0.0`

### 1. Clone & Install
```bash
git clone https://github.com/NohaCode-lab/Supper-Mind.git
cd Supper-Mind
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_OPENAI_API_KEY=your-openai-api-key
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Run Unit & Component Tests
```bash
npm run test
```

### 5. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 🔒 Security & Privacy Best Practices

- **API Protection:** OpenAI service calls are decoupled into a dedicated service layer with safe error fallbacks and server-proxy preparation.
- **Session Persistence:** Supabase Auth handles JWT refresh tokens securely without raw token exposure.
- **Sanitized Inputs:** All form inputs use strict validation and controlled components.

---

## 🤝 Contributing & License

Distributed under the **MIT License**. Created by [NohaCode-lab](https://github.com/NohaCode-lab).
