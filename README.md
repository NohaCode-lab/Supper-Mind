# 🧘 Supper Mind — Full-Stack AI Mental Wellness & Habit SaaS Platform

[![React 18](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)](https://reactjs.org/)
[![Vite 5](https://img.shields.io/badge/Vite-5.4-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS v3](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand 5](https://img.shields.io/badge/Zustand-5.0-purple.svg)](https://github.com/pmndrs/zustand)
[![TanStack Query v5](https://img.shields.io/badge/TanStack_Query-5.62-FF4154.svg?logo=react-query)](https://tanstack.com/query)
[![Supabase](https://img.shields.io/badge/Supabase-Database%2FAuth-3ECF8E.svg?logo=supabase)](https://supabase.com/)
[![Vitest](https://img.shields.io/badge/Vitest-2.1-yellow.svg?logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Supper Mind** is a production-ready, full-stack AI mental wellness and habit tracking SaaS application engineered for the European tech market. It features interactive onboarding, daily habit streak management, mood history analytics, box breathing relaxation exercises, a context-aware AI wellness coach, Stripe subscription tiers, and Supabase RLS security.

---

## 🚀 Live Demo & Preview

* 🔗 **Live Demo Application:** [https://supper-mind.vercel.app](https://supper-mind.vercel.app)
* ⚡ **Production Status:** Fully Functional (CI/CD Automated)

---

## 🌟 Key Features

* **🧘 Context-Aware AI Companion:** Real-time AI coach that injects user name, daily habit streaks, and active goals into OpenAI system prompts.
* **🔥 Daily Habit Tracker & Streaks:** Interactive habit CRUD with automatic streak calculations and completion badges.
* **📊 Mood Analytics & Timeline:** Visual breakdown of mood patterns with customized palette indicators and historical note logging.
* **🌬️ Guided Box Breathing Widget:** Interactive 4-4-4 rhythm visualizer for stress reduction and anxiety check-ins.
* **📔 Reflections & Daily Journaling:** Private journal logging with emotional tags, Zod validation, and relative timestamps.
* **✨ First-Time Onboarding Wizard:** 3-step interactive onboarding modal guiding goal alignment and starter habits.
* **💳 Subscription System (Stripe):** Free ($0) vs Pro ($9.99/mo) plan tiers with daily rate-limiting enforcement.
* **🌐 Multi-Language (i18n):** Multi-language UI switching (English & German) powered by `react-i18next`.
* **🌙 Dark / Light Mode:** Class-based theme system with local storage persistence.

---

## 🏗️ Full-Stack SaaS Architecture

```text
               ┌──────────────────────────────────────────────┐
               │          React 18 Frontend App               │
               │ (Vite + Tailwind + Zustand + Query + Router) │
               └──────────────────────┬───────────────────────┘
                                      │
                         [ Centralized API Client ]
                            src/api/client.js
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         │                            │                            │
         ▼                            ▼                            ▼
┌──────────────────┐       ┌──────────────────────┐       ┌──────────────────┐
│  Supabase Auth   │       │ Supabase Edge Funcs  │       │  Stripe Payments │
│  & PostgreSQL DB │       │ (ai-chat, analytics) │       │  (Checkout &     │
│ (RLS Data Isolation)     └──────────┬───────────┘       │   Entitlements)  │
└──────────────────┘                  │                   └──────────────────┘
                                      ▼
                             ┌──────────────────┐
                             │  OpenAI API      │
                             │ (GPT-4o-Mini)    │
                             └──────────────────┘
```

---

## 🛠️ Tech Stack & Technologies

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite 5, Tailwind CSS | UI Framework, Bundler, & Styling System |
| **Client State** | Zustand 5 | Atomic global state (Theme, Habits, Onboarding, Auth) |
| **Server State** | TanStack Query v5 | API data fetching, caching, and optimistic mutations |
| **Database** | Supabase (PostgreSQL + RLS) | Tenant data isolation and relational storage |
| **Serverless** | Supabase Edge Functions | Secure API proxies, rate-limiting & telemetry |
| **AI Integration** | OpenAI GPT-4o-mini | Context-aware empathetic AI companion |
| **Validation** | Zod | Form & payload schema validation |
| **Observability** | Sentry & Telemetry API | Production error tracking & event logging |
| **Testing** | Vitest + React Testing Library | Unit and component testing suite |

---

## 📸 Application Screenshots

> *Placeholder previews representing product views*

* **Dashboard Overview:** Displays habit streaks, AI sessions, and mood log history.
* **AI Companion Chat:** Context-aware AI coach responding to personal wellness goals.
* **Onboarding Setup Wizard:** Step-by-step goal setup modal for first-time users.
* **Pricing & Stripe Checkout:** Plan comparison modal for Free vs Pro tiers.

---

## ⚙️ Quick Start Guide

### 1. Clone & Install
```bash
git clone https://github.com/NohaCode-lab/Supper-Mind.git
cd Supper-Mind
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_OPENAI_API_KEY=your-openai-api-key
```

### 3. Run Development Server & Tests
```bash
# Run local dev server
npm run dev

# Run Vitest test suite
npm run test

# Run production build
npm run build
```

---

## 🔒 Security & Privacy

- **Row Level Security (RLS):** All PostgreSQL tables enforce `auth.uid() = user_id` policies so users can strictly only access their own data.
- **Key Isolation:** API calls to OpenAI are routed through Deno/Supabase Edge Functions, keeping keys private.
- **Observability:** Centralized `ErrorBoundary` and Sentry layer prevent unhandled UI crashes.

---

## 🤝 License

Distributed under the **MIT License**. Created by [NohaCode-lab](https://github.com/NohaCode-lab).
