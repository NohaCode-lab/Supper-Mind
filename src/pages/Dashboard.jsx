import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { day: "Mon", mood: 4 },
  { day: "Tue", mood: 6 },
  { day: "Wed", mood: 5 },
  { day: "Thu", mood: 7 },
  { day: "Fri", mood: 8 },
  { day: "Sat", mood: 6 },
  { day: "Sun", mood: 9 },
]

function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          Mental Wellness Dashboard
        </h1>

        <p className="text-gray-400 mt-2 text-lg">
          Track your emotions, AI sessions, and stress balance.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Mood Score */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition duration-300">

          <h2 className="text-gray-400 text-sm uppercase tracking-wide">
            Mood Score
          </h2>

          <p className="text-4xl font-bold mt-3">
            82%
          </p>

          <p className="text-green-400 mt-2">
            Improved this week
          </p>

        </div>

        {/* AI Sessions */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition duration-300">

          <h2 className="text-gray-400 text-sm uppercase tracking-wide">
            AI Sessions
          </h2>

          <p className="text-4xl font-bold mt-3">
            128
          </p>

          <p className="text-blue-400 mt-2">
            Active conversations
          </p>

        </div>

        {/* Stress Level */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition duration-300">

          <h2 className="text-gray-400 text-sm uppercase tracking-wide">
            Stress Level
          </h2>

          <p className="text-4xl font-bold mt-3">
            Low
          </p>

          <p className="text-purple-400 mt-2">
            Stable emotional balance
          </p>

        </div>

      </div>

      {/* Analytics Chart */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg">

        <div className="mb-6">
          <h2 className="text-2xl font-semibold">
            Weekly Mood Analytics
          </h2>

          <p className="text-gray-400 mt-1">
            Monitor your emotional wellness over time.
          </p>
        </div>

        <div className="h-[350px]">

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>

              <XAxis dataKey="day" stroke="#94a3b8" />

              <YAxis stroke="#94a3b8" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="mood"
                stroke="#3b82f6"
                strokeWidth={4}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  )
}

export default Dashboard