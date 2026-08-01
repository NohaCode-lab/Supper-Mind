export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  primary_goal?: 'stress' | 'habits' | 'mood' | 'mindfulness';
  ai_tone?: string;
  created_at?: string;
}

export interface Habit {
  id: string;
  user_id?: string;
  name: string;
  streak: number;
  last_completed: string;
  created_at?: string;
}

export interface MoodEntry {
  id: string;
  user_id?: string;
  mood_score: 'Rad' | 'Good' | 'Meh' | 'Bad' | 'Awful';
  note?: string;
  created_at: string;
}

export interface JournalEntry {
  id: string;
  user_id?: string;
  title: string;
  content: string;
  mood: string;
  created_at: string;
}

export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at?: string;
}

export interface Subscription {
  plan_tier: 'free' | 'premium';
  status: 'active' | 'canceled' | 'past_due';
  current_period_end?: string;
  ai_daily_limit: number;
}

export interface ApiErrorResponse {
  message: string;
  status: number;
  code: string;
}
