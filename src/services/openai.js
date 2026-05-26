import OpenAI from 'openai';

// Initialize OpenAI instance (direct configuration)
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // For frontend-only development
});

/**
 * Sends the chat history to OpenAI and returns the AI's response.
 * @param {Array} chatHistory - Array of message objects { role, content }
 * @returns {Promise<string>} The AI response text
 */
export const generateAIResponse = async (chatHistory) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are Supper Mind, a mental health supportive AI. Be calm, empathetic, and helpful. Keep responses short, soothing, and use simple language.'
        },
        ...chatHistory
      ]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Service Error:', error);
    // Attach the original error as the cause to preserve the stack trace
    throw new Error('Failed to fetch AI response', { cause: error });
  }
};