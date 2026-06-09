// Re-export core AI capabilities
export { generateAIResponse } from './openai';

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
      return "";
  }
};