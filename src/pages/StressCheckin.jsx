import { useState } from "react";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";

/* 🤖 AI Logic داخل نفس الملف */
const getAIInsight = (level) => {
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

function StressCheckin() {
  const [level, setLevel] = useState(null);
  const [history, setHistory] = useState([]);

  const levels = ["Low 😌", "Medium 😐", "High 😰", "Extreme 😵"];

  const save = (value) => {
    setLevel(value);

    setHistory((prev) => [
      { value, date: new Date().toLocaleString() },
      ...prev,
    ]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 text-white">
        😰 Stress Check-in
      </h1>

      {/* Current Level */}
      {level && (
        <>
          <div className="mb-4 p-3 bg-white/5 border border-white/10 rounded-lg text-white">
            Current Stress Level:
            <span className="font-bold ml-2">{level}</span>
          </div>

          {/* 🤖 AI Insight */}
          <div className="mb-4 p-3 bg-indigo-600/10 border border-indigo-500/30 rounded-lg text-white">
            <p className="font-semibold">AI Insight 🤖</p>
            <p className="text-sm text-gray-300 mt-1">
              {getAIInsight(level)}
            </p>
          </div>
        </>
      )}

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {levels.map((l) => (
          <Button
            key={l}
            onClick={() => save(l)}
            className="w-full"
          >
            {l}
          </Button>
        ))}
      </div>

      {/* History */}
      <div className="space-y-3">
        {history.map((h, i) => (
          <Card key={i}>
            <p className="text-white">{h.value}</p>
            <p className="text-xs text-gray-400">{h.date}</p>
          </Card>
        ))}
      </div>

    </div>
  );
}

export default StressCheckin;