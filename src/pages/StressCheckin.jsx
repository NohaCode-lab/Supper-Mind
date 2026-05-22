
import { useState } from "react";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";

function StressCheckin() {
  const [level, setLevel] = useState(null);
  const [history, setHistory] = useState([]);

  const levels = [
    "Low 😌",
    "Medium 😐",
    "High 😰",
    "Extreme 😵",
  ];

  const save = (value) => {
    setLevel(value);

    setHistory([
      { value, date: new Date().toLocaleString() },
      ...history,
    ]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">

      <h1 className="text-2xl font-bold mb-4 text-white">
        😰 Stress Check-in
      </h1>

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