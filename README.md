# 🚀 CareerCraft (AI-Powered Career Assistant)

An AI-powered SaaS platform that helps users build professional CVs, generate cover letters, match jobs, and interact with an intelligent AI assistant.

---

# 🌍 English Version

## ✨ Overview

CareerCraft is a modern AI-driven career platform built with React.  
It helps users improve their job applications using AI tools such as:

- CV Builder (ATS-friendly templates)
- AI Chat Assistant
- Job Matching System
- Cover Letter Generator (coming soon)

---

## 🛠️ Tech Stack

- React (Vite)
- JavaScript (ES6+)
- Context API
- Tailwind CSS (or CSS Modules)
- LocalStorage (temporary auth system)
- AI Service Layer (mock / extensible)

---

## 📁 Project Structure
src/
├── assets/          # Images / Icons / Fonts
├── components/      # UI components
│   ├── ui/          # Buttons, Inputs, Cards
│   ├── layout/      # Navbar, Sidebar, Footer
│   └── common/      # Loader, Modal
├── pages/           # Application pages
├── context/         # Global state (AuthContext)
├── services/        # API / AI logic
├── hooks/           # Custom hooks
├── utils/           # Helper functions
├── routes/          # Routing system
├── styles/          # Global styles
├── App.jsx
└── main.jsx

---

## ⚙️ Features

### 🔐 Authentication
- Simple login/logout system
- Persistent user state (localStorage)

### 🤖 AI Chat
- Interactive AI assistant
- Ready for OpenAI / Claude integration

### 📄 CV Builder
- ATS-friendly CV templates
- Editable sections

### 💼 Job Tools (Planned)
- AI job matching
- Cover letter generator

---

## 🚀 Getting Started

```bash
npm install
npm run dev
