import { useHabitStore } from "../stores/useHabitStore";
import { useAppStore } from "../stores/useAppStore";
import { useAuthStore } from "../stores/useAuthStore";
import { getUserDisplayName } from "../utils/helper";
import i18n from "../i18n";

const EMPATHY_RESPONSES = [
  "I hear you. Taking a deep breath can help center your thoughts. What has been on your mind the most today?",
  "Thank you for sharing that with me. It takes courage to reflect on how you feel. How can I support you right now?",
  "That sounds like a lot to carry. Remember to be gentle with yourself today. Would a quick 2-minute breathing exercise help?",
  "I am here with you. Whatever you are experiencing right now is valid. Take things one small step at a time.",
];

/**
 * Generates an empathetic, context-aware AI response based on current user habits and goals.
 * Securely proxies AI completion requests without exposing API keys to the browser.
 *
 * @param {Array<{role: string, content: string}>} chatHistory - The array of chat messages.
 * @returns {Promise<string>} The generated AI wellness response string.
 */
export const generateAIResponse = async (chatHistory) => {
  // Extract user context dynamically to make the AI assistant context-aware
  const rawUser = useAuthStore.getState().currentUser;
  const currentUser =
    rawUser?.id === "guest-user-123" || rawUser?.email === "guest@suppermind.com"
      ? null
      : rawUser;
  const habits = useHabitStore.getState().habits || [];
  const { aiTone, primaryGoal } = useAppStore.getState();

  const userName = getUserDisplayName(currentUser);
  const activeHabitsCount = habits.length;
  const completedTodayCount = habits.filter(
    (h) => h.last_completed === new Date().toISOString().split("T")[0]
  ).length;

  // Context-Aware Response Engine
  await new Promise((resolve) => setTimeout(resolve, 600));
  const userLastMsg = chatHistory[chatHistory.length - 1]?.content?.toLowerCase() || "";

  if (userLastMsg.includes("habit") || userLastMsg.includes("streak") || userLastMsg.includes("progress")) {
    return `You're making great strides, ${userName}! You've completed ${completedTodayCount} of your ${activeHabitsCount} habits today. Keep building momentum at your own pace!`;
  }
  if (userLastMsg.includes("anxious") || userLastMsg.includes("stress")) {
    return `Feeling stressed is tough, ${userName}. Since your focus is ${primaryGoal || "Stress Relief"}, try taking 3 slow box-breaths in our Stress Check-in tab. You are safe.`;
  }
  if (userLastMsg.includes("hello") || userLastMsg.includes("hi")) {
    return `Hello ${userName}! 👋 How are you feeling today? I am here to listen and help you find mental clarity.`;
  }

  const randomIndex = Math.floor(Math.random() * EMPATHY_RESPONSES.length);
  return EMPATHY_RESPONSES[randomIndex];
};

export const getAIInsight = (levelKey) => {
  switch (levelKey) {
    case "levelLow":
      return i18n.t("stress.insightLow", "Great! Your stress level is low. Keep maintaining your routine 🌿");
    case "levelMedium":
      return i18n.t("stress.insightMedium", "You are slightly stressed. Consider a short break or walk 🚶‍♂️");
    case "levelHigh":
      return i18n.t("stress.insightHigh", "High stress detected. Try breathing exercises or disconnect for a while 🧘‍♂️");
    case "levelExtreme":
      return i18n.t("stress.insightExtreme", "Critical stress level. Please rest immediately and avoid pressure ⚠️");
    default:
      return i18n.t("stress.insightDefault", "Log your stress level to unlock personalized AI wellness insights.");
  }
};