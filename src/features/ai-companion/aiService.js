/**
 * 🤖 Send message to AI
 * @param {string} message - User input message
 * @param {Array} _history - Chat history (optional future use)
 * @returns {Promise<string>} AI response
 */
export async function sendMessageToAI(message, _history = []) {
  try {
    return await mockAIResponse(message);
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Sorry, something went wrong with the AI service.";
  }
}

/**
 * 🧪 Mock AI (for development)
 */
function mockAIResponse(message) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`🤖 AI Response: I received your message -> "${message}"`);
    }, 1000);
  });
}