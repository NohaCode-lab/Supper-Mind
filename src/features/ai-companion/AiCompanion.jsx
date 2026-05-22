
import { useState } from "react";
import { sendMessageToAI } from "../../services/aiService";

const AiCompanion = () => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi 👋 I’m your Supper Mind assistant" },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    const aiResponse = await sendMessageToAI(userMessage);

    setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">

      <div className="space-y-3 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg text-sm ${
              msg.role === "user"
                ? "bg-indigo-600 ml-auto w-fit"
                : "bg-slate-800 w-fit"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 text-sm">Thinking...</div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 bg-slate-800 rounded-lg"
          placeholder="Talk to AI..."
        />

        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-indigo-600 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AiCompanion;