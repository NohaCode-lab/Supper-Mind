# 🧘 Supper Mind (AI-Powered Wellness & Productivity)

An AI-powered SaaS wellness and productivity platform designed to help users track mental wellness, build healthy daily habits, monitor streaks, and use AI chat for emotional support and guidance.

---

## ✨ Overview

Supper Mind is a modern, calm digital space built with React.  
It focuses on calm UX, productivity, and mental clarity, using features such as:

- Mental Wellness & Mood Tracking
- Healthy Habit Building & Streak Monitoring
- Empathetic AI Chat Assistant (Emotional Support)
- Personalized Dashboards and Insights

---

## 🛠️ Tech Stack

- React 19 + Vite (JavaScript only)
- Tailwind CSS v4
- Zustand (State Management)
- React Router
- TanStack Query
- AI Integration (Gemini / OpenAI / Claude)
- Local storage + optional backend integration

---

## 📁 Project Structure

```text
src/
├── assets/          # Images, Icons, and global assets
├── components/      # Reusable UI components
├── features/        # Feature-slice architecture
│   ├── habits/      # Example domain/feature
│   │   ├── api/     # Feature-specific API calls
│   │   ├── components/  # Feature-specific UI components
│   │   └── stores/  # Feature-specific local state
│   └── journal/     # Example domain/feature
├── pages/           # Route-level components
├── stores/          # Zustand state modules
├── services/        # AI and Backend service abstraction layers
├── utils/           # Helper functions
├── App.jsx          # Root component
└── main.jsx         # Entry point
```

---

## ⚙️ Features

### 🧘 Wellness Tracking

- Track mood and emotional trends over time (AI Mood analysis)
- Minimal, calm, and uncluttered UI

### 🤖 AI Empathy Chat

- Supportive AI assistant for mental clarity
- Powered by Gemini / OpenAI / Claude

### 🌱 Productivity & Habits

- Daily habit tracker
- Streak monitoring for consistency
- Productivity insights and AI summaries

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```
