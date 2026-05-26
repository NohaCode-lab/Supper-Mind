
import { useState, useRef, useEffect } from "react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello 👋 I am your AI assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // 📌 Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 📌 Simulated AI response (replace later with real API)
  const generateAIResponse = async (userMessage) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("This is a simulated AI response to: " + userMessage);
      }, 1000);
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const aiResponse = await generateAIResponse(input);

      const assistantMessage = {
        role: "assistant",
        content: aiResponse,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 text-center text-xl font-bold">
        AI Chat
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-600"
                  : "bg-gray-700"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 text-sm">AI is typing...</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded bg-gray-800 text-white outline-none"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}