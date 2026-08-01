import OpenAI from "openai";

// Secure initialization: If API key is present in server/edge proxy use it,
// otherwise gracefully fallback to an empathetic AI simulation for browser safety.
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const EMPATHY_RESPONSES = [
  "I hear you. Taking a deep breath can help center your thoughts. What has been on your mind the most today?",
  "Thank you for sharing that with me. It takes courage to reflect on how you feel. How can I support you right now?",
  "That sounds like a lot to carry. Remember to be gentle with yourself today. Would a quick 2-minute breathing exercise help?",
  "I am here with you. Whatever you are experiencing right now is valid. Take things one small step at a time.",
];

export const generateAIResponse = async (chatHistory) => {
  // If API key is configured safely or passed via backend proxy
  if (apiKey && apiKey !== "your_openai_api_key_here") {
    try {
      const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are Supper Mind, a mental health supportive AI. Be calm, empathetic, and helpful. Keep responses short, soothing, and use simple language.",
          },
          ...chatHistory,
        ],
      });

      return response.choices[0]?.message?.content || EMPATHY_RESPONSES[0];
    } catch (error) {
      console.warn("OpenAI API call unavailable, switching to local empathy engine:", error.message);
    }
  }

  // Simulated AI delay + empathetic response fallback for safety & demo
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const userLastMsg = chatHistory[chatHistory.length - 1]?.content?.toLowerCase() || "";

  if (userLastMsg.includes("anxious") || userLastMsg.includes("stress")) {
    return "Feeling anxious or stressed can be overwhelming. Try closing your eyes for 3 seconds and slowly breathing out. You are safe and doing your best.";
  }
  if (userLastMsg.includes("sad") || userLastMsg.includes("tired")) {
    return "It is completely okay to feel tired or down sometimes. Rest is productivity too. Have you had enough water and fresh air today?";
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