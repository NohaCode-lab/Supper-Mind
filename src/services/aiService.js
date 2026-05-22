
export async function sendMessageToAI(message) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are Supper Mind, a supportive mental wellness AI assistant.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response.";
  } catch (err) {
    console.error(err);
    return "AI error occurred.";
  }
}