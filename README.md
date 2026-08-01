# 🧠 Supper-Mind

[![React 18](https://img.shields.io/badge/React-18.3-61DAFB.svg?logo=react)](https://reactjs.org/)
[![Vite 5](https://img.shields.io/badge/Vite-5.4-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-purple.svg)](https://github.com/pmndrs/zustand)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.62-FF4154.svg?logo=react-query)](https://tanstack.com/query)
[![Supabase](https://img.shields.io/badge/Supabase-Database%2FAuth-3ECF8E.svg?logo=supabase)](https://supabase.com/)
[![Vitest](https://img.shields.io/badge/Vitest-2.1-yellow.svg?logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **A multilingual productivity and self-improvement platform built with modern React architecture, secure authentication, and personalized user experiences.**

---

## 📌 Project Overview

**Supper-Mind** is a full-stack mental wellness and habit-tracking SaaS application engineered for high reliability, multilingual accessibility, and real-time user personalization. It addresses the challenge of maintaining mental clarity and consistent daily routines by combining habit analytics, emotional journaling, guided box breathing, and a context-aware AI wellness coach.

Designed according to professional production standards, Supper-Mind demonstrates:
- **Clean Component Architecture**: Decoupled layout structures, reusable UI primitives, and feature-based modularization.
- **Robust Client & Server State**: Reactive atomic state management with Zustand paired with TanStack Query for asynchronous data caching.
- **Enterprise-Grade i18n & RTL**: Seamless real-time language switching across English, German, and Arabic (RTL) with dynamic document layout adjustment.
- **Strict Authentication Lifecycle**: Multi-layered session rehydration protection, route guards, and zero client-side credential exposure.

---

## 🚀 Live Demo

- **Live Application:** [https://supper-mind.vercel.app](https://supper-mind.vercel.app)
- **GitHub Repository:** [https://github.com/NohaCode-lab/Supper-Mind](https://github.com/NohaCode-lab/Supper-Mind)

### Demo Credentials
To explore the application as a registered user:
- **Email:** `demo@suppermind.com`
- **Password:** `Demo1234!`
*(Or click **Sign In** / **Create Account** to register a custom account instantly.)*

---

## ✨ Features

### Authentication & User Management
- **User Registration & Login:** Form validation via Zod schemas and integration with authentication APIs.
- **Session Persistence:** Persistent authentication state rehydrated securely via Zustand middleware.
- **Storage Rehydration Safeguards:** Automated sanitization purging stale or legacy mock data upon app mount.
- **Protected Route Guards:** Route-level authentication barriers redirecting unauthenticated users to `/login`.
- **Guest Mode Handling:** Fully functional guest experience with localized guest indicators and instant access to public views.
- **Dynamic Identity Rendering:** Reactive user identity display updating headers, badges, and greetings without page reloads.

### User Experience
- **Responsive Navigation Header:** Dynamic top bar featuring theme toggles, interactive language switchers, upgrade modals, and user profile badges.
- **Mobile Menu Drawer:** Off-canvas navigation drawer with touch backdrop dismissal.
- **Error Boundary & Observability:** Production `ErrorBoundary` wrapping the React tree to capture unhandled exceptions gracefully.
- **Theme System:** Persistent Dark / Light color modes with smooth transitions.

### Application Features
- **🔥 Daily Habit Tracker & Streaks:** Habit CRUD operations with automated daily streak counters and completion tracking.
- **📊 Mood Analytics & Timeline:** Visual mood logs with customized palette indicators and historical reflections.
- **🌬️ Guided Box Breathing Visualizer:** Interactive 4-4-4 rhythm visualizer for anxiety relief and stress check-ins.
- **📔 Reflections & Daily Journaling:** Private journaling module with tag metadata and relative timestamp formatting.
- **🤖 Context-Aware AI Companion:** AI wellness assistant integrating user progress, goals, and persona preferences into prompt context.
- **💳 Subscription Entitlements (Stripe):** Starter vs. Pro plan comparison modal and entitlement management.

---

## 🌐 Internationalization (i18n)

Supper-Mind provides first-class localization across three major international locales:

- 🇺🇸 **English (LTR)** — Default language
- 🇩🇪 **German (LTR)** — German locale with context-accurate vocabulary
- 🇸🇦 **Arabic (RTL)** — Full Right-to-Left layout adaptation (`document.documentElement.dir = 'rtl'`)

### Localization Engineering:
- **Dynamic Translation System:** Powered by `i18next` and `react-i18next`.
- **Literal Name Preservation:** Authenticated user display names (`John`, `أحمد`, `Johannes`) are preserved verbatim and never machine-translated.
- **Localized UI Labels:** UI text, buttons, and greetings dynamically translate to match active language settings:

| User State | English | Arabic (RTL) | German |
| :--- | :--- | :--- | :--- |
| **Authenticated** | `Welcome back, Alex` | `مرحباً بعودتك، Alex` | `Willkommen zurück, Alex` |
| **Guest State** | `Guest` / `Guest Account` | `ضيف` / `حساب ضيف` | `Gast` / `Gastkonto` |

- **Layout & Typography Handling:** CSS rules (`whitespace-nowrap`, `rtl:items-start`) eliminate text wrapping and visual truncation in RTL viewports.

---

## 🛠 Tech Stack

### Frontend
- **React 18**: UI component library leveraging functional components and hooks.
- **Vite 5**: High-performance frontend build tool and dev server.
- **JavaScript (ES6+)**: Modern JavaScript syntax.
- **Tailwind CSS v3**: Utility-first CSS framework with Dark Mode support.
- **Framer Motion**: Smooth micro-animations and modal transitions.
- **React Icons**: Iconography suite.

### State Management
- **Zustand 5**: Atomic client-state management with local storage persistence middleware.

### Data & Backend
- **TanStack Query v5 (React Query)**: Asynchronous state management, query caching, and optimistic mutations.
- **Supabase**: PostgreSQL database, Row Level Security (RLS), and authentication services.
- **OpenAI API**: Context-aware AI companion engine (`gpt-4o-mini`).

### Development & Tooling
- **Vitest & React Testing Library**: Automated testing framework.
- **ESLint 9 (Flat Config)**: Static code analysis and code quality enforcement.
- **PostCSS & Autoprefixer**: CSS processing pipelines.
- **Git & GitHub**: Version control and automated repository integration.

---

## 🏗 Architecture Overview

### Component Architecture
```text
┌─────────────────────────────────────────────────────────────┐
│                      src/App.jsx                            │
│ ┌──────────────────────┐           ┌──────────────────────┐ │
│ │    Sidebar.jsx       │           │     Navbar.jsx       │ │
│ └──────────────────────┘           └──────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │               AppRoutes.jsx (React Router)              │ │
│ │  Public Routes (/)   │  Protected Routes (/dashboard)   │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Authentication & Data Flow
```text
User Credentials
       │
       ▼
Auth API / Supabase Auth Gateway
       │
       ▼
Zustand Store (useAuthStore) ──► localStorage (Rehydration Guard)
       │
       ▼
ProtectedRoute Guard & Navigation Header
       │
       ▼
Application Views & Server Data Hooks (TanStack Query)
```

1. **State Hydration:** On initial load, `useAuthStore` reads stored sessions while executing a rehydration check to eliminate stale mock entries.
2. **Route Authorization:** `ProtectedRoute` validates `currentUser`. Unauthenticated attempts to access protected routes (`/dashboard`, `/settings`) trigger an immediate redirect to `/login`.
3. **Data Isolation:** TanStack Query hooks (`useHabitStore`, `useJournal`, `useMood`) execute server queries only when `currentUser?.id` is validated, preventing null pointer crashes.

---

## 🔐 Security & Authentication

- **Zero Secret Exposure:** Client-side storage contains only safe user profile metadata (`email`, `full_name`). Passwords, access tokens, and private keys are never stored in `localStorage`.
- **Environment Isolation:** API keys (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_OPENAI_API_KEY`) are managed strictly through environment variables.
- **Rehydration Protection:** Automated store rehydration callback purges legacy mock user references (`guest-user-123`, `guest@suppermind.com`) automatically on boot.
- **Protected Routing:** Defensive route guards ensure private application endpoints remain unaccessible without valid authentication.

---

## 📂 Project Structure

```text
Supper-Mind/
├── src/
│   ├── api/              # API clients & authentication endpoints (authApi.js, client.js)
│   ├── components/       # Reusable UI primitives & layout components
│   │   ├── layouts/      # Layout containers (Navbar.jsx, Sidebar.jsx)
│   │   ├── shared/       # Language switcher & shared components
│   │   └── ui/           # Atomic UI elements (Button.jsx, Input.jsx, Card.jsx)
│   ├── features/         # Modular domain feature components
│   │   ├── habits/       # Habit tracking feature module
│   │   ├── onboarding/   # Onboarding wizard modal
│   │   ├── stress/       # Breathing exercise & stress check-in
│   │   └── subscription/ # Stripe pricing modal
│   ├── hooks/            # Custom React & data fetching hooks (useAuth.js, useHabitStore.js)
│   ├── i18n/             # i18n setup & fallback configurations
│   ├── locales/          # Localization JSON dictionaries (en.json, de.json, ar.json)
│   ├── pages/            # View components (Home, Dashboard, Login, Register, Settings)
│   ├── routes/           # Routing configuration & route guards (AppRoutes.jsx, ProtectedRoute.jsx)
│   ├── services/         # Third-party integrations (supabase.js, aiService.js, sentry.js)
│   ├── stores/           # Zustand global state stores (useAuthStore.js, useAppStore.js)
│   ├── test/             # Automated unit and component tests
│   └── utils/            # Helper functions & validators (helper.js, validators.js)
├── public/               # Static web assets
├── eslint.config.js      # ESLint 9 Flat Config
├── index.html            # Application HTML entry point
├── package.json          # Dependencies & project scripts
├── tailwind.config.js    # Tailwind CSS design system configuration
└── vite.config.js        # Vite bundler configuration
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 1. Clone the Repository
```bash
git clone https://github.com/NohaCode-lab/Supper-Mind.git
cd Supper-Mind
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_OPENAI_API_KEY=your-openai-api-key
```

### 4. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 5. Run Automated Tests
```bash
npm run test
```

### 6. Build for Production
```bash
npm run build
```

---

## 🤝 License

Distributed under the **MIT License**. Created by [NohaCode-lab](https://github.com/NohaCode-lab).
