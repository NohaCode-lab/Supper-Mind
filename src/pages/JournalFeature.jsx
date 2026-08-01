import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiBookOpen, FiPlus, FiTrash2, FiCalendar, FiSmile } from "react-icons/fi";
import { formatRelativeTime } from "../utils/helper";

const INITIAL_ENTRIES = [
  {
    id: "j-1",
    title: "Reflecting on Progress",
    content:
      "Today was a really grounding day. Focused on completing my core tasks early and spent 20 minutes meditating in the evening.",
    mood: "Good",
    created_at: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
  },
  {
    id: "j-2",
    title: "Overcoming Mid-Week Stress",
    content:
      "Felt a bit overwhelmed during the morning standup, but taking a short walk and using the box breathing feature helped reset my mind.",
    mood: "Meh",
    created_at: new Date(Date.now() - 3600 * 1000 * 29).toISOString(),
  },
];

export default function JournalFeature() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("Good");

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newEntry = {
      id: `journal-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      mood,
      created_at: new Date().toISOString(),
    };

    setEntries([newEntry, ...entries]);
    setTitle("");
    setContent("");
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
          <FiBookOpen className="text-teal-600 dark:text-teal-400" />
          {t("journal.title", "Daily Journal & Reflections")}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          {t("journal.subtitle", "Unpack your thoughts, track your mental milestones, and build clarity.")}
        </p>
      </header>

      {/* Entry Form */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          {t("journal.newEntryTitle", "Write New Entry")}
        </h2>

        <form onSubmit={handleAddEntry} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("journal.titlePlaceholder", "Entry title...")}
              className="md:col-span-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm transition-all"
            />

            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm transition-all"
            >
              <option value="Rad">🤩 Rad</option>
              <option value="Good">🙂 Good</option>
              <option value="Meh">😐 Meh</option>
              <option value="Bad">😞 Bad</option>
              <option value="Awful">😭 Awful</option>
            </select>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder={t("journal.contentPlaceholder", "Express what is on your mind today...")}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm transition-all resize-none"
          />

          <button
            type="submit"
            disabled={!title.trim() || !content.trim()}
            className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-xs flex items-center gap-2"
          >
            <FiPlus />
            {t("journal.saveBtn", "Save Journal Entry")}
          </button>
        </form>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <FiCalendar className="text-teal-600 dark:text-teal-400" />
          {t("journal.pastEntries", "Past Entries")}
        </h2>

        {entries.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t("journal.empty", "No journal entries recorded yet. Start writing today!")}
            </p>
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">
                    {entry.title}
                  </h3>
                  <span className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full flex items-center gap-1 font-medium">
                    <FiSmile /> {entry.mood}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">
                    {formatRelativeTime(entry.created_at)}
                  </span>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    aria-label={t("common.delete", "Delete")}
                    className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                {entry.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}