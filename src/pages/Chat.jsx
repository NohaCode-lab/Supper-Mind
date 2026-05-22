
import { useState } from "react"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi 👋 I'm Supper Mind. How are you feeling today?"
    }
  ])

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = {
      role: "user",
      content: input
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a mental health supportive AI. Be calm, empathetic, and helpful. Keep responses short and soothing."
          },
          ...updatedMessages
        ]
      })

      const aiMessage = {
        role: "assistant",
        content: res.choices[0].message.content
      }

      setMessages([...updatedMessages, aiMessage])
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  return (
    <div className="h-screen flex flex-col bg-[#0f172a] text-white">

      {/* Header */}
      <div className="p-4 border-b border-gray-800 text-center font-bold">
        Supper Mind AI
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-md p-3 rounded-xl ${
              msg.role === "user"
                ? "ml-auto bg-blue-600"
                : "mr-auto bg-gray-800"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="text-gray-400">Thinking...</div>
        )}

      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800 flex gap-2">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write how you feel..."
          className="flex-1 p-3 rounded-xl bg-gray-900 border border-gray-700 outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 px-5 rounded-xl hover:bg-blue-600 transition"
        >
          Send
        </button>

      </div>

    </div>
  )
}

export default Chat