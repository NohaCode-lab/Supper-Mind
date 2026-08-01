import { apiRequest } from "./client";
import { generateAIResponse } from "../services/aiService";

export const aiApi = {
  async sendChatMessage(messages, planTier = "free") {
    try {
      // Calls Supabase Edge Function endpoint /functions/v1/ai-chat
      return await apiRequest("ai-chat", {
        method: "POST",
        body: JSON.stringify({ messages, planTier }),
      });
    } catch (error) {
      // Fallback to local AI engine if Edge Function is in local offline mode
      const reply = await generateAIResponse(messages);
      return {
        role: "assistant",
        content: reply,
        usage: { daily_remaining: planTier === "premium" ? 999 : 5 },
      };
    }
  },
};
