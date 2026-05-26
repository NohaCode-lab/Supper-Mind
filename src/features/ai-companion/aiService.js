
const AI_API_URL = "https://your-api-endpoint.com/chat"; 
// 🔴 لاحقاً تستبدله بـ OpenAI / Supabase / backend

/**
 * 🤖 Send message to AI
 * @param {string} message - User input message
 * @param {Array} history - Chat history (optional future use)
 * @returns {Promise<string>} AI response
 */
export async function sendMessageToAI(message, history = []) {
  try {
    // 🧪 MOCK MODE (currently active)
    // Replace this with real API call later
    return await mockAIResponse(message);

    /*
    // 🚀 REAL API VERSION (future)
    const response = await fetch(AI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        history,
      }),
    });

    if (!response.ok) {
      throw new Error("AI request failed");
    }

    const data = await response.json();
    return data.reply;
    */
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Sorry, something went wrong with the AI service.";
  }
}

/**
 * 🧪 Mock AI (for development)
 * Replace later with real AI API
 */
function mockAIResponse(message) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`🤖 AI Response: I received your message -> "${message}"`);
    }, 1000);
  });
}