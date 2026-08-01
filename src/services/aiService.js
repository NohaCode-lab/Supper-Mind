import OpenAI from "openai";
import { useHabitStore } from "../stores/useHabitStore";
import { useAppStore } from "../stores/useAppStore";
import { useAuthStore } from "../stores/useAuthStore";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const EMPATHY_RESPONSES = [
  "I hear you. Taking a deep breath can help center your thoughts. What has been on your mind the most today?",
  "Thank you for sharing that with me. It takes courage to reflect on how you feel. How can I support you right now?",
  "That sounds like a lot to carry. Remember to be gentle with yourself today. Would a quick 2-minute breathing exercise help?",
  "I am here with you. Whatever you are experiencing right now is valid. Take things one small step at a time.",
];

export const generateAIResponse = async (chatHistory) => {
  // Extract user context dynamically to make the AI assistant context-aware
  const currentUser = useAuthStore.getState().currentUser;
  const habits = useHabitStore.getState().habits || [];
  const { aiTone, primaryGoal } = useAppStore.getState();

  const userName = currentUser?.user_metadata?.full_name?.split(" ")[0] || "Friend";
  const activeHabitsCount = habits.length;
  const completedTodayCount = habits.filter(
    (h) => h.last_completed === new Date().toISOString().split("T")[0]
  ).length;

  const systemPrompt = `You are Supper Mind, a personal SaaS mental wellness coach speaking to ${userName}.
User Context:
- Current Active Habits: ${activeHabitsCount} habits (${completedTodayCount} completed today).
- Primary Focus: ${primaryGoal || "Stress Relief & Habits"}.
- Preferred Conversation Tone: ${aiTone || "Empathetic & Soothing"}.

Guidelines:
1. Be calm, empathetic, and encouraging.
2. Refer to their current daily progress subtly if relevant.
3. Keep responses concise (2-4 sentences max).`;

  if (apiKey && apiKey !== "your_openai_api_key_here") {
    try {
      const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: systemPrompt }, ...chatHistory],
      });

      return response.choices[0]?.message?.content || EMPATHY_RESPONSES[0];
    } catch (error) {
      console.warn("OpenAI API call unavailable, using context-aware simulation:", error.message);
    }
  }

  // Simulated Context-Aware Response Engine
  await new Promise((resolve) => setTimeout(resolve, 800));
  const userLastMsg = chatHistory[chatHistory.length - 1]?.content?.toLowerCase() || "";

  if (userLastMsg.includes("habit") || userLastMsg.includes("streak") || userLastMsg.includes("progress")) {
    return `You're making great strides, ${userName}! You've completed ${completedTodayCount} of your ${activeHabitsCount} habits today. Keep building momentum at your own pace!`;
  }
  if (userLastMsg.includes("anxious") || userLastMsg.includes("stress")) {
    return `Feeling stressed is tough, ${userName}. Since your focus is ${primaryGoal}, try taking 3 slow box-breaths in our Stress Check-in tab. You are safe.`;
  }
  if (userLastMsg.includes("hello") || userLastMsg.includes("hi")) {
    return `Hello ${userName}! 👋 How are you feeling today? I am here to listen and help you find mental clarity.`;
  }

  const randomIndex = Math.floor(Math.random() * EMPATHY_RESPONSES.length);
  return EMPATHY_RESPONSES[randomIndex];
};

export const getAIInsight = (level) => {
  switch (level) {
    case "Low 😌":
      return "Great! Your stress level is low. Keep maintaining your routine 🌿";
    case "Medium 😐":
      return "You're slightly stressed. Consider a short break or walk 🚶‍♂️";
    case "High 😰":
      return "High stress detected. Try breathing exercises or disconnect for a while 🧘‍♂️";
    case "Extreme 😵":
      return "Critical stress level. Please rest immediately and avoid pressure ⚠️";
    default:
      return "Log your mood and stress levels to unlock personalized AI wellness insights.";
  }
};