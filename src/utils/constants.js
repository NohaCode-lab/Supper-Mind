
/**
 * Application Constants
 * Direct, centralized variables for global configuration.
 */

// 1. Core Application Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  CHAT: '/chat',
  REGISTER: '/register',
  // Note: Login is permanently excluded from this architecture
};

// 2. OpenAI Configuration
export const AI_CONFIG = {
  MODEL: 'gpt-4o-mini',
  // Centralized system prompt so it can be updated easily
  SYSTEM_PROMPT: 'You are Supper Mind, a mental health supportive AI. Be calm, empathetic, and helpful. Keep responses short, soothing, and use simple language.',
};

// 3. User Interface Themes
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// 4. Default Fallback Messages
export const FALLBACK_MESSAGES = {
  ERROR_GENERIC: 'Something went wrong. Please try again.',
  NETWORK_ISSUE: 'We are having trouble connecting. Please check your internet.',
};